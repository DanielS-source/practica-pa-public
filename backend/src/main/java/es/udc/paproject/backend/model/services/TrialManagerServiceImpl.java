package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TrialManagerServiceImpl implements TrialManagerService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private InscriptionDao inscriptionDao;

    @Autowired
    private SportTestDao sportTestDao;

    @Autowired
    private UserDao userDao;

    public Inscription createSportTestInscription(Long userId, Long sportTestId, String creditCard) throws
            InstanceNotFoundException, DuplicateInstanceException, SportTestFullException,
            InscriptionPeriodClosedException {

        Optional<Inscription> foundInscription = inscriptionDao.findByUserIdAndSportTestId(userId, sportTestId);
        if(foundInscription.isPresent()) throw new DuplicateInstanceException("Duplicated exception", foundInscription);

        Optional<User> user = userDao.findById(userId);
        if(!user.isPresent()) throw new InstanceNotFoundException("project.entities.user", userId);

        Optional<SportTest> sportTest = sportTestDao.findById(sportTestId);
        if(!sportTest.isPresent()) throw new InstanceNotFoundException("project.entities.sportTest", sportTestId);

        SportTest foundSportTest = sportTest.get();
        if(foundSportTest.getParticipants() == foundSportTest.getMaxParticipants())
            throw new SportTestFullException();

        if(LocalDateTime.now().plusDays(1).isAfter(foundSportTest.getTestStart()))
            throw new InscriptionPeriodClosedException();

        foundSportTest.setParticipants(foundSportTest.getParticipants() + 1);
        int newDorsal = foundSportTest.getParticipants();
        Inscription inscription = new Inscription(creditCard, newDorsal, foundSportTest, user.get());
        inscription = inscriptionDao.save(inscription);

        sportTestDao.save(foundSportTest);

        return inscription;
    }

    public int deliverInscriptionDorsal(Long inscriptionId, String creditCard) throws InstanceNotFoundException,
            InvalidDataException, TooSoonToDeliverException, TestAlreadyStartedException, DorsalAlreadyDeliveredException {
        if (inscriptionDao.findById(inscriptionId).isPresent()) {
            Inscription inscription = inscriptionDao.findById(inscriptionId).get();
            if (inscription.isDorsalPicked()) throw new DorsalAlreadyDeliveredException();//posible devolver el dorsal con la excepcion igualmente(?)
            if (!inscription.getCreditCardNumber().equals(creditCard)) throw new InvalidDataException();
            if (inscription.getSportTest().getTestStart().plusHours(-12).isAfter(LocalDateTime.now())) throw new TooSoonToDeliverException();
            if (inscription.getSportTest().getTestStart().isBefore(LocalDateTime.now())) throw new TestAlreadyStartedException();
            inscription.setDorsalPicked(true);
            return inscription.getDorsal();
        } else throw new InstanceNotFoundException("project.entities.inscription", inscriptionId);
    }

    public List<Inscription> getUserInscriptions(Long userId) throws InstanceNotFoundException {

        Slice<Inscription> slice = inscriptionDao.findByUserId(userId);
        if (slice == null) {
            throw new InstanceNotFoundException("project.entities.inscription", userId);
        }
        return slice.getContent();
    }

    public void scoreSportTest(Long userId, Long inscriptionId, int score)
            throws InstanceNotFoundException, PermissionException,
            AlreadyScoredTestException, TestNotStartedException,
            TooLateToScoreException {


        Inscription inscription = permissionChecker.checkInscriptionExistsAndBelongsTo(inscriptionId, userId);

        if (inscription.getScore() != 0) throw new AlreadyScoredTestException();

        SportTest st = inscription.getSportTest();

        if (LocalDateTime.now().isBefore(st.getTestStart())) throw new TestNotStartedException();

        if (LocalDateTime.now().isAfter(st.getTestStart().plusDays(15))) throw new TooLateToScoreException();

        inscription.setScore(score);
        st.setTimesRated(st.getTimesRated() + 1);
        st.setAverageRating(st.getAverageRating() + (score - st.getAverageRating()) / st.getTimesRated());


    }
}

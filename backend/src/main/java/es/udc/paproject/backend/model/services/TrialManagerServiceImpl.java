package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
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

        Optional<Inscription> foundInscription = inscriptionDao.findById(userId);
        if(foundInscription.isPresent()) throw new DuplicateInstanceException("Duplicated exception", foundInscription);

        Optional<User> user = userDao.findById(userId);
        if(!user.isPresent()) throw new InstanceNotFoundException("project.entities.user", userId);

        Optional<SportTest> sportTest = sportTestDao.findById(sportTestId);
        if(!sportTest.isPresent()) throw new InstanceNotFoundException("project.entities.sportTest", sportTestId);

        SportTest foundSportTest = sportTest.get();
        if(foundSportTest.getParticipants() == foundSportTest.getMaxParticipants())
            throw new SportTestFullException();

        //Registry expiration date case, currently not working
        //Long timeDiff = Duration.between(foundSportTest.getTestStart(), LocalDateTime.now()).toMillis();
        //int secs = (int)TimeUnit.MILLISECONDS.toMinutes(timeDiff);
        //if(secs < 1440) throw new InscriptionPeriodClosedException();

        int newDorsal = foundSportTest.getParticipants() + 1;
        Inscription inscription = new Inscription(creditCard, newDorsal, foundSportTest, user.get());
        inscription = inscriptionDao.save(inscription);

        return inscription;
    }

    public Inscription deliverInscriptionDorsal(Long inscriptionId, String creditCard) throws InstanceNotFoundException,
            PermissionException, InvalidDataException {
        return null;
    }

    public List<Inscription> getUserInscriptions(Long userId) throws InstanceNotFoundException, PermissionException {
        return null;
    }

    public void scoreSportTest(Long userId, Long inscriptionId, int score)
            throws InstanceNotFoundException, PermissionException,
            AlreadyScoredTestException, TestNotStartedException {

        Optional<Inscription> inscription = inscriptionDao.findById(inscriptionId);

        if (inscription.isEmpty()) throw new InstanceNotFoundException("Inscription", Inscription.class);

        if (inscription.get().getScore() != -1) throw new AlreadyScoredTestException();

        SportTest st = inscription.get().getSportTest();

        if (LocalDateTime.now().isBefore(st.getTestStart())) throw new TestNotStartedException();


        inscription.get().setScore(score);

        st.setTimesRated(st.getTimesRated() + 1);
        st.setAverageRating(st.getAverageRating() + (score - st.getAverageRating()) / st.getTimesRated());


    }
}

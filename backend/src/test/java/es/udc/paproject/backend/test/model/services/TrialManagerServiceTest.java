package es.udc.paproject.backend.test.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.services.TrialManagerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TrialManagerServiceTest {

    @Autowired
    private UserDao userDao;

    @Autowired
    private SportTestDao sportTestDao;

    @Autowired
    private SportTestTypeDao sportTestTypeDao;

    @Autowired
    private ProvinceDao provinceDao;

    @Autowired
    private InscriptionDao inscriptionDao;

    @Autowired
    private TrialManagerService trialManagerService;

    private final Long NON_EXISTENT_ID = Long.valueOf(-1);
    private final String validCredCard = "validcreditcard";
    private final int VALID_SCORE = 5;

    private SportTest createSportTest(String name, Province province, SportTestType sportTestType, LocalDate time){
        return new SportTest(name, "Test test", time.atStartOfDay(), BigDecimal.valueOf(10.50), 50, "loc", province, sportTestType, 0, 0, 0);
    }

    private SportTest createSport(LocalDate fechaIni){
        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, fechaIni);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        SportTest newTest = sportTestDao.save(sportTest1);

        return newTest;
    }

    private User createUser(){
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        User newUser = userDao.save(user1);

        return newUser;
    }

    @Test
    public void testCreateInscription() throws SportTestFullException, DuplicateInstanceException,
            InscriptionPeriodClosedException, InstanceNotFoundException {
        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        SportTest newTest = sportTestDao.save(sportTest1);
        User newUser = userDao.save(user1);

        Inscription inscription = new Inscription(validCredCard, 1, newTest, newUser);
        Inscription implInsc = trialManagerService.createSportTestInscription(
                newUser.getId(), newTest.getId(), validCredCard);

        assertEquals(inscription.getUser(), implInsc.getUser());
        assertEquals(inscription.getDorsal(), implInsc.getDorsal());
        assertEquals(inscription.getCreditCardNumber(), implInsc.getCreditCardNumber());
        assertEquals(inscription.getSportTest(), implInsc.getSportTest());
    }

    @Test
    public void testCreateDuplicateInscription() throws SportTestFullException, DuplicateInstanceException,
            InscriptionPeriodClosedException, InstanceNotFoundException {
        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        SportTest newTest = sportTestDao.save(sportTest1);
        User newUser = userDao.save(user1);

        Inscription implInsc = trialManagerService.createSportTestInscription(
                newUser.getId(), newTest.getId(), validCredCard);

        assertThrows(DuplicateInstanceException.class, () ->
                trialManagerService.createSportTestInscription(newUser.getId(), newTest.getId(), validCredCard));
    }

    @Test
    public void testGetUserInscription() throws SportTestFullException, DuplicateInstanceException,
            InscriptionPeriodClosedException, InstanceNotFoundException, PermissionException {
        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        SportTest sportTest2 = createSportTest("sportTest2", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        SportTest newTest1 = sportTestDao.save(sportTest1);
        SportTest newTest2 = sportTestDao.save(sportTest2);
        User newUser = userDao.save(user1);

        Inscription inscription1 = new Inscription(validCredCard, 1, newTest1, newUser);
        trialManagerService.createSportTestInscription(
                newUser.getId(), newTest1.getId(), validCredCard);


        Inscription inscription2 = new Inscription(validCredCard, 1, newTest2, newUser);
        trialManagerService.createSportTestInscription(
                newUser.getId(), newTest2.getId(), validCredCard);

        List<Inscription> foundInsc = trialManagerService.getUserInscriptions(newUser.getId());

        Inscription implInsc = foundInsc.get(0);

        assertEquals(inscription1.getUser(), implInsc.getUser());
        assertEquals(inscription1.getDorsal(), implInsc.getDorsal());
        assertEquals(inscription1.getCreditCardNumber(), implInsc.getCreditCardNumber());
        assertEquals(inscription1.getSportTest(), implInsc.getSportTest());

        implInsc = foundInsc.get(1);

        assertEquals(inscription2.getUser(), implInsc.getUser());
        assertEquals(inscription2.getDorsal(), implInsc.getDorsal());
        assertEquals(inscription2.getCreditCardNumber(), implInsc.getCreditCardNumber());
        assertEquals(inscription2.getSportTest(), implInsc.getSportTest());
    }

    @Test
    public void testScoreTest () throws PermissionException, AlreadyScoredTestException,
            InstanceNotFoundException, TestNotStartedException, TooLateToScoreException {

        SportTest sportTest = createSport(LocalDate.now().minusDays(1));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);

        inscriptionDao.save(inscription);

        trialManagerService.scoreSportTest(user.getId(), inscription.getId(), VALID_SCORE);

        assertEquals(VALID_SCORE, inscription.getScore());
    }

    @Test
    public void testNotFoundScore () {

        SportTest sportTest = createSport(LocalDate.now().minusDays(1));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);

        inscriptionDao.save(inscription);

        assertThrows(InstanceNotFoundException.class, () -> trialManagerService.scoreSportTest(user.getId(), NON_EXISTENT_ID, VALID_SCORE));

    }

    @Test
    public void testEarlyScore () {

        SportTest sportTest = createSport(LocalDate.now().plusDays(1));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);

        inscriptionDao.save(inscription);

        assertThrows(TestNotStartedException.class, () -> trialManagerService.scoreSportTest(user.getId(), inscription.getId(), VALID_SCORE));

    }

    @Test
    public void testLateScore () {

        SportTest sportTest = createSport(LocalDate.now().minusDays(16));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);

        inscriptionDao.save(inscription);

        assertThrows(TooLateToScoreException.class, () -> trialManagerService.scoreSportTest(user.getId(), inscription.getId(), VALID_SCORE));

    }

    @Test
    public void testNonExistentUserScore () {

        SportTest sportTest = createSport(LocalDate.now().minusDays(1));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);

        inscriptionDao.save(inscription);

        assertThrows(PermissionException.class, () -> trialManagerService.scoreSportTest(NON_EXISTENT_ID, inscription.getId(), VALID_SCORE));

    }

    @Test
    public void testAlreadyScored ()
            throws PermissionException, TooLateToScoreException, AlreadyScoredTestException,
            InstanceNotFoundException, TestNotStartedException {

        SportTest sportTest = createSport(LocalDate.now().minusDays(1));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);

        inscriptionDao.save(inscription);

        trialManagerService.scoreSportTest(user.getId(), inscription.getId(), VALID_SCORE);

        assertThrows(AlreadyScoredTestException.class, () -> trialManagerService.scoreSportTest(user.getId(), inscription.getId(), VALID_SCORE));

    }

    @Test
    public void testDorsalDeliveryLateAndChecks () {
        SportTest sportTest = createSport(LocalDate.now().minusDays(1));
        assertThrows(InstanceNotFoundException.class, () -> trialManagerService.deliverInscriptionDorsal(697L, "ljiagf"));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest, user);
        inscriptionDao.save(inscription);
        assertThrows(InvalidDataException.class, () -> trialManagerService.deliverInscriptionDorsal(inscription.getId(),"akhdbgia"));
        assertThrows(TestAlreadyStartedException.class, () -> trialManagerService.deliverInscriptionDorsal(inscription.getId(),inscription.getCreditCardNumber()));
    }

    @Test
    public void tesDorsalDeliverySoon(){
        SportTest sportTest = createSport(LocalDate.now().plusDays(3));
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, sportTest,user);
        inscriptionDao.save(inscription);
        assertThrows(TooSoonToDeliverException.class, () -> trialManagerService.deliverInscriptionDorsal(inscription.getId(), inscription.getCreditCardNumber()));
    }

    @Test
    public void testDorsalDelivery() throws DorsalAlreadyDeliveredException, TooSoonToDeliverException, InvalidDataException, PermissionException, TestAlreadyStartedException, InstanceNotFoundException {
        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest = new SportTest("TestSport", "Test test", LocalDateTime.now().plusDays(3), BigDecimal.valueOf(10.50), 50, "loc", province1, sportTestType, 0, 0, 0);
        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        SportTest newTest = sportTestDao.save(sportTest);
        User user = createUser();
        Inscription inscription = new Inscription(validCredCard, 1, newTest, user);
        inscriptionDao.save(inscription);
        newTest.setTestStart(LocalDateTime.now().plusHours(8));
        assertTrue(trialManagerService.deliverInscriptionDorsal(inscription.getId(), inscription.getCreditCardNumber()) == inscription.getDorsal());
        assertThrows(DorsalAlreadyDeliveredException.class, () -> trialManagerService.deliverInscriptionDorsal(inscription.getId(), inscription.getCreditCardNumber()));

    }

}

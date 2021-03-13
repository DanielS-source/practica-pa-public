package es.udc.paproject.backend.test.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.services.TrialManagerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TrialManagerServiceTest {

    private final Long NON_EXISTENT_ID = Long.valueOf(-1);

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

    private String validCredCard = "validcreditcard";

    private SportTest createSportTest(String name, Province province, SportTestType sportTestType, LocalDate time){
        return new SportTest(name, "Test test", time.atStartOfDay(), BigDecimal.valueOf(10.50), 50, "loc", province, sportTestType, 0, 0, 0);
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

        assertEquals(inscription.getUser(), trialManagerService.createSportTestInscription(
                newUser.getId(), newTest.getId(), validCredCard).getUser());
    }

    @Test
    public void testScoreTest () throws PermissionException, AlreadyScoredTestException,
            InstanceNotFoundException, TestNotStartedException, TooLateToScoreException {

        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        Inscription inscription = new Inscription(validCredCard, 1, sportTest1, user1);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        userDao.save(user1);
        inscriptionDao.save(inscription);

        int score = 5;

        trialManagerService.scoreSportTest(user1.getId(), inscription.getId(), score);

        assertEquals(score, inscription.getScore());
    }

    @Test
    public void testNotFoundScore () {

        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        Inscription inscription = new Inscription(validCredCard, 1, sportTest1, user1);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        userDao.save(user1);
        inscriptionDao.save(inscription);

        assertThrows(InstanceNotFoundException.class, () -> trialManagerService.scoreSportTest(user1.getId(), inscription.getId(), 4));

    }

    @Test
    public void testEarlyScore () {

        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        Inscription inscription = new Inscription(validCredCard, 1, sportTest1, user1);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        userDao.save(user1);
        inscriptionDao.save(inscription);

        assertThrows(TestNotStartedException.class, () -> trialManagerService.scoreSportTest(user1.getId(), inscription.getId(), 4));

    }

    @Test
    public void testLateScore () {

        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        Inscription inscription = new Inscription(validCredCard, 1, sportTest1, user1);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        userDao.save(user1);
        inscriptionDao.save(inscription);

        assertThrows(TooLateToScoreException.class, () -> trialManagerService.scoreSportTest(user1.getId(), inscription.getId(), 4));

    }

    @Test
    public void testNonExistentUserScore () {

        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        Inscription inscription = new Inscription(validCredCard, 1, sportTest1, user1);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        userDao.save(user1);
        inscriptionDao.save(inscription);

        assertThrows(PermissionException.class, () -> trialManagerService.scoreSportTest(NON_EXISTENT_ID, inscription.getId(), 4));

    }

    @Test
    public void testAlreadyScored ()
            throws PermissionException, TooLateToScoreException, AlreadyScoredTestException,
            InstanceNotFoundException, TestNotStartedException {

        Province province1 = new Province("province1");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        User user1 = new User("PedroTester", "", "Pedro", "Tester", "pt@gmail.com");
        user1.setRole(User.RoleType.USER);
        Inscription inscription = new Inscription(validCredCard, 1, sportTest1, user1);

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        userDao.save(user1);
        inscriptionDao.save(inscription);

        trialManagerService.scoreSportTest(user1.getId(), inscription.getId(), 5);

        assertThrows(AlreadyScoredTestException.class, () -> trialManagerService.scoreSportTest(user1.getId(), inscription.getId(), 5));

    }

}

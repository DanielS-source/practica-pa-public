package es.udc.paproject.backend.test.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InscriptionPeriodClosedException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.SportTestFullException;
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
}

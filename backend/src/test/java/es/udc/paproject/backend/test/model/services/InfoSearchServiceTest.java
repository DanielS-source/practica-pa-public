package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.InfoSearchService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class InfoSearchServiceTest {

    @Autowired
    private SportTestDao sportTestDao;

    @Autowired
    private SportTestTypeDao sportTestTypeDao;

    @Autowired
    private ProvinceDao provinceDao;

    @Autowired
    private InfoSearchService infoSearchService;

    private SportTest createSportTest(String name, Province province, SportTestType sportTestType, LocalDate time){
        return new SportTest(name, "Test test", time.atStartOfDay(), BigDecimal.valueOf(10.50), 50, "loc", province, sportTestType, 0, 0, 0);
    }

    @Test
    public void testFindSportTestsByProvince() {
        Province province1 = new Province("province1");
        Province province2 = new Province("province2");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType, LocalDate.now().plusDays(2));
        SportTest sportTest2 = createSportTest("sportTest2", province2, sportTestType, LocalDate.now().plusDays(2));

        provinceDao.save(province1);
        provinceDao.save(province2);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        sportTestDao.save(sportTest2);

        Block<SportTest> expectedBlock = new Block<>(Arrays.asList(sportTest1), false);

        assertEquals(expectedBlock, infoSearchService.findSportTests(province1.getId(), null, null, null, 0 ,1));

    }

    @Test
    public void testFindSportTestsByType() {
        Province province = new Province("province");
        SportTestType sportTestType1 = new SportTestType("sportTestType1");
        SportTestType sportTestType2 = new SportTestType("sportTestType2");
        SportTest sportTest1 = createSportTest("sportTest1", province, sportTestType1, LocalDate.now().plusDays(2));
        SportTest sportTest2 = createSportTest("sportTest2", province, sportTestType2, LocalDate.now().plusDays(2));

        provinceDao.save(province);
        sportTestTypeDao.save(sportTestType1);
        sportTestTypeDao.save(sportTestType2);
        sportTestDao.save(sportTest1);
        sportTestDao.save(sportTest2);

        Block<SportTest> expectedBlock = new Block<>(Arrays.asList(sportTest1), false);

        assertEquals(expectedBlock, infoSearchService.findSportTests(null, sportTestType1.getId(), null, null, 0 ,1));

    }

    @Test
    public void testFindSportTestsByDate() {
        Province province = new Province("province");
        SportTestType sportTestType = new SportTestType("sportTestType");
        SportTest sportTest1 = createSportTest("sportTest1", province, sportTestType, LocalDate.now().plusDays(1));
        SportTest sportTest2 = createSportTest("sportTest2", province, sportTestType, LocalDate.now().plusDays(10));
        SportTest sportTest3 = createSportTest("sportTest3", province, sportTestType, LocalDate.now().plusDays(100));

        provinceDao.save(province);
        sportTestTypeDao.save(sportTestType);
        sportTestDao.save(sportTest1);
        sportTestDao.save(sportTest2);
        sportTestDao.save(sportTest3);

        Block<SportTest> expectedBlock1 = new Block<>(Arrays.asList(sportTest1), false);
        Block<SportTest> expectedBlock2 = new Block<>(Arrays.asList(sportTest2), false);
        Block<SportTest> expectedBlock3 = new Block<>(Arrays.asList(sportTest3), false);

        assertEquals(expectedBlock1, infoSearchService.findSportTests(null, null, null, LocalDate.now().plusDays(5), 0 ,1));
        assertEquals(expectedBlock2, infoSearchService.findSportTests(null, null, LocalDate.now().plusDays(5), LocalDate.now().plusDays(50), 0 ,1));
        assertEquals(expectedBlock3, infoSearchService.findSportTests(null, null, LocalDate.now().plusDays(50), null, 0 ,1));

    }

    @Test
    public void testFindSportTestsByAllCriteria() {
        Province province1 = new Province("province1");
        Province province2 = new Province("province2");
        SportTestType sportTestType1 = new SportTestType("sportTestType1");
        SportTestType sportTestType2 = new SportTestType("sportTestType2");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType1, LocalDate.now().plusDays(5));
        SportTest sportTest2 = createSportTest("sportTest2", province2, sportTestType2, LocalDate.now().plusDays(2));

        provinceDao.save(province1);
        provinceDao.save(province2);
        sportTestTypeDao.save(sportTestType1);
        sportTestTypeDao.save(sportTestType2);
        sportTestDao.save(sportTest1);
        sportTestDao.save(sportTest2);

        Block<SportTest> expectedBlock = new Block<>(Arrays.asList(sportTest1), false);

        assertEquals(expectedBlock ,infoSearchService.findSportTests(province1.getId(), sportTestType1.getId(), LocalDate.now().plusDays(1), LocalDate.now().plusDays(10), 0 ,1));

    }

    @Test
    public void testFindNoSportTests() {
        Province province1 = new Province("province1");
        SportTestType sportTestType1 = new SportTestType("sportTestType1");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType1, LocalDate.now().plusDays(5));

        provinceDao.save(province1);
        sportTestTypeDao.save(sportTestType1);
        sportTestDao.save(sportTest1);

        Block<SportTest> expectedBlock = new Block<>(new ArrayList<>(), false);
        assertEquals(expectedBlock ,infoSearchService.findSportTests(null, null, LocalDate.now().plusDays(10), null, 0 ,1));

    }

    @Test
    public void testFindSportTestsByPages() {
        Province province1 = new Province("province1");
        Province province2 = new Province("province2");
        SportTestType sportTestType1 = new SportTestType("sportTestType1");
        SportTestType sportTestType2 = new SportTestType("sportTestType2");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType1, LocalDate.now().plusDays(1));
        SportTest sportTest2 = createSportTest("sportTest2", province2, sportTestType2, LocalDate.now().plusDays(2));
        SportTest sportTest3 = createSportTest("sportTest3", province1, sportTestType2, LocalDate.now().plusDays(3));

        provinceDao.save(province1);
        provinceDao.save(province2);
        sportTestTypeDao.save(sportTestType1);
        sportTestTypeDao.save(sportTestType2);
        sportTestDao.save(sportTest1);
        sportTestDao.save(sportTest2);
        sportTestDao.save(sportTest3);

        Block<SportTest> expectedBlock = new Block<>(Arrays.asList(sportTest3, sportTest2), true);
        assertEquals(expectedBlock ,infoSearchService.findSportTests(null, null, null, null, 0,2));

        expectedBlock = new Block<>(Arrays.asList(sportTest1), false);
        assertEquals(expectedBlock ,infoSearchService.findSportTests(null, null, null, null, 1,2));

        expectedBlock = new Block<>(new ArrayList<>(), false);
        assertEquals(expectedBlock ,infoSearchService.findSportTests(null, null, null, null, 2,2));

    }

    @Test
    public void testFindSportTestById() throws InstanceNotFoundException {
        Long id = 47L;
        assertThrows(InstanceNotFoundException.class, () -> infoSearchService.findSportTestById(id));

        Province province1 = new Province("province1");
        Province province2 = new Province("province2");
        SportTestType sportTestType1 = new SportTestType("sportTestType1");
        SportTestType sportTestType2 = new SportTestType("sportTestType2");
        SportTest sportTest1 = createSportTest("sportTest1", province1, sportTestType1, LocalDate.now().plusDays(5));
        SportTest sportTest2 = createSportTest("sportTest2", province2, sportTestType2, LocalDate.now().plusDays(2));
        provinceDao.save(province1);
        provinceDao.save(province2);
        sportTestTypeDao.save(sportTestType1);
        sportTestTypeDao.save(sportTestType2);
        sportTestDao.save(sportTest1);
        sportTestDao.save(sportTest2);

        assertEquals(sportTest1, infoSearchService.findSportTestById(sportTest1.getId()));
        assertEquals(sportTest2, infoSearchService.findSportTestById(sportTest2.getId()));
    }

    @Test
    public void testFindAllProvinces(){
        Province province1 = new Province("province1");
        Province province2 = new Province("province2");
        provinceDao.save(province1);
        provinceDao.save(province2);
        assertTrue(infoSearchService.findAllProvinces().contains(province1) && infoSearchService.findAllProvinces().contains(province2) );
        }

    @Test
    public void testFindAllSportTestTypes(){

        SportTestType sportTestType1 = new SportTestType("sportTestType1");
        SportTestType sportTestType2 = new SportTestType("sportTestType2");
        sportTestTypeDao.save(sportTestType1);
        sportTestTypeDao.save(sportTestType2);
        assertTrue(infoSearchService.findAllSportTestTypes().contains(sportTestType1) && infoSearchService.findAllSportTestTypes().contains(sportTestType2));
    }


}

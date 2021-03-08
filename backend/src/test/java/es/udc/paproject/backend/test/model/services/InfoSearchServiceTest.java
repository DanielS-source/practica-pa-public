package es.udc.paproject.backend.test.model.services;

import es.udc.paproject.backend.model.entities.ProvinceDao;
import es.udc.paproject.backend.model.entities.SportTestDao;
import es.udc.paproject.backend.model.entities.SportTestTypeDao;
import es.udc.paproject.backend.model.services.InfoSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

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

}

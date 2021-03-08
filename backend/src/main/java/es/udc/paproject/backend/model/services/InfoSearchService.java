package es.udc.paproject.backend.model.services;

import java.time.LocalDate;
import java.util.List;

import es.udc.paproject.backend.model.entities.SportTest;
import es.udc.paproject.backend.model.entities.SportTestType;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.entities.Province;

public interface InfoSearchService {
    Block<SportTest> findSportTests(Long provinceId, Long testType, LocalDate startDate, LocalDate endDate, int page, int size);

    List<Province> findAllProvinces() throws InstanceNotFoundException;

    List<SportTestType> findAllSportTestTypes() throws InstanceNotFoundException;
}

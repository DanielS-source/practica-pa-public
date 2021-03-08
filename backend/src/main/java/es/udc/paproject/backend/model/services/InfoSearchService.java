package es.udc.paproject.backend.model.services;

import java.time.LocalDate;
import java.util.List;

import es.udc.paproject.backend.model.entities.SportTest;
import es.udc.paproject.backend.model.entities.SportTestType;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.entities.Province;

public interface InfoSearchService {
    Block<SportTest> getSportTestList(Long provinceId, Long testType, LocalDate startDate, LocalDate endDate, int page, int size)
            throws InstanceNotFoundException, InvalidDataException;

    List<Province> getProvinceList() throws InstanceNotFoundException;

    List<SportTestType> getSportTestTypeList() throws InstanceNotFoundException;
}

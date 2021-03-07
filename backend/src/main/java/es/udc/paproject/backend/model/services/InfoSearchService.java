package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.SportTest;
import es.udc.paproject.backend.model.entities.SportTestType;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.entities.Province;

public interface InfoSearchService {
    List<SportTest> getSportTestList(Long provinceId, Long testType, LocalDateTime startDate, LocalDateTime endDate)
            throws InstanceNotFoundException, InvalidDataException;

    List<Province> getProvinceList() throws InstanceNotFoundException;

    List<SportTestType> getSportTestTypeList() throws InstanceNotFoundException;
}

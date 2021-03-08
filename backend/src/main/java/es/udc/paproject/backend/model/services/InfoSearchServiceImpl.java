package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.InvalidDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly=true)
public class InfoSearchServiceImpl implements InfoSearchService{

    @Autowired
    private SportTestDao sportTestDao;

    @Autowired
    private ProvinceDao provinceDao;

    @Autowired
    private SportTestTypeDao sportTestTypeDao;

    @Override
    public List<SportTest> getSportTestList(Long provinceId, Long testType, LocalDate startDate, LocalDate endDate) throws InstanceNotFoundException, InvalidDataException {
        return null;
    }

    @Override
    public List<Province> getProvinceList() throws InstanceNotFoundException {
        return null;
    }

    @Override
    public List<SportTestType> getSportTestTypeList() throws InstanceNotFoundException {
        return null;
    }
}

package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.InvalidDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
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
    public Block<SportTest> getSportTestList(Long provinceId, Long testTypeId, LocalDate startDate, LocalDate endDate, int page, int size) throws InstanceNotFoundException, InvalidDataException {

        Slice<SportTest> slice = sportTestDao.find(provinceId, testTypeId, startDate, endDate, page, size);

        return new Block<>(slice.getContent(), slice.hasNext());
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

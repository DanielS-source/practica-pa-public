package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.InvalidDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Block<SportTest> findSportTests(Long provinceId, Long testTypeId, LocalDate startDate, LocalDate endDate, int page, int size){

        Slice<SportTest> slice = sportTestDao.find(provinceId, testTypeId, startDate, endDate, page, size);

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public List<Province> findAllProvinces() {
        Iterable<Province> provinces= provinceDao.findAll();
        List<Province> provinceList = new ArrayList<Province>();
        provinces.forEach(provinceList::add);
        return provinceList;
    }

    @Override
    public List<SportTestType> findAllSportTestTypes() {
        Iterable<SportTestType> sportTestTypes = sportTestTypeDao.findAll();
        List<SportTestType> sportTestTypeList = new ArrayList<SportTestType>();
        sportTestTypes.forEach(sportTestTypeList::add);
        return sportTestTypeList;
    }

    @Override
    public SportTest findSportTestById(Long id) throws InstanceNotFoundException {
        Optional<SportTest> sportTest = sportTestDao.findById(id);
        if (!sportTest.isPresent()) {
            throw new InstanceNotFoundException("project.entities.sportTest", id);
        }
        return sportTest.get();
    }


}

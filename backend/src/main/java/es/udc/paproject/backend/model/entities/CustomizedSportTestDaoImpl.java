package es.udc.paproject.backend.model.entities;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Query;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

public class CustomizedSportTestDaoImpl implements CustomizedSportTestDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Slice<SportTest> find(Long provinceId, Long sportTestTypeId, LocalDate startDate, LocalDate endDate, int page, int size) {

        String queryString = "SELECT st FROM SportTest st";

        if (provinceId != null || sportTestTypeId != null || startDate != null || endDate != null) {
            queryString += " WHERE ";
        }

        if (provinceId != null) {
            queryString += "st.province.id = :provinceId AND ";
        }

        if (sportTestTypeId != null) {
            queryString += "st.sportTestType.id = :sportTestTypeId AND ";
        }

        if (startDate != null) {
            queryString += "st.testStart > :startDate AND ";
        }

        if (endDate != null) {
            queryString += "st.testStart < :endDate AND ";
        }

        queryString = queryString.substring(0, queryString.lastIndexOf(" AND "));

        queryString += " ORDER BY st.testStart DESC";

        System.out.println(queryString);

        Query query = entityManager.createQuery(queryString).setFirstResult(page*size).setMaxResults(size+1);

        if (provinceId != null) {
            query.setParameter("provinceId", provinceId);
        }

        if (sportTestTypeId != null) {
            query.setParameter("sportTestTypeId", sportTestTypeId);
        }

        if (startDate != null) {
            query.setParameter("startDate", startDate.atStartOfDay());
        }

        if (endDate != null) {
            query.setParameter("endDate", endDate.atStartOfDay());
        }

        List<SportTest> sportTests = query.getResultList();
        boolean hasNext = sportTests.size() == (size+1);

        if (hasNext){
            sportTests.remove(sportTests.size()-1);
        }

        return new SliceImpl<>(sportTests, PageRequest.of(page, size), hasNext);
    }

}

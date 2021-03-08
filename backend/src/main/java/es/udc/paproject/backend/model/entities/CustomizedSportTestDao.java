package es.udc.paproject.backend.model.entities;

import org.springframework.data.domain.Slice;

import java.time.LocalDate;

public interface CustomizedSportTestDao {

    Slice<SportTest> find(Long provinceId, Long testTypeId, LocalDate startDate, LocalDate endDate, int page, int size);

}

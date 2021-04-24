package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.SportTest;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

public class SportTestConversor {

    private SportTestConversor() {}

    public final static SportTestSummaryDto toSportTestSummaryDto(SportTest sportTest) {

        return new SportTestSummaryDto(
                sportTest.getId(),
                sportTest.getName(),
                sportTest.getSportTestType().getId(),
                sportTest.getProvince().getId(),
                toMillis(sportTest.getTestStart()),
                sportTest.getAverageRating()
        );

    }

    public final static List<SportTestSummaryDto> toSportTestSummaryDtos(List<SportTest> sportTests) {
        return sportTests.stream().map(p -> toSportTestSummaryDto(p)).collect(Collectors.toList());
    }

    public final static SportTestDto toSportTestDto(SportTest sportTest){
        return new SportTestDto(
                sportTest.getId(),
                sportTest.getName(),sportTest.getDescription(),
                toMillis(sportTest.getTestStart()),
                sportTest.getPrice(),
                sportTest.getMaxParticipants(),
                sportTest.getLocation(),
                sportTest.getProvince().getId(),
                sportTest.getSportTestType().getId(),
                sportTest.getParticipants(),
                sportTest.getAverageRating());
    }

    private final static long toMillis(LocalDateTime date) {
        return date.truncatedTo(ChronoUnit.MINUTES).atZone(ZoneOffset.systemDefault()).toInstant().toEpochMilli();
    }
}

package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.SportTestType;

import java.util.List;
import java.util.stream.Collectors;

public class SportTestTypeConversor {
    private SportTestTypeConversor(){}

    public final static SportTestTypeDto toSportTestTypeDto(SportTestType sportTestType){
        return new SportTestTypeDto(sportTestType.getId(),sportTestType.getName());
    }

    public final static List<SportTestTypeDto> toSportTestTypeDtos(List<SportTestType> sportTestTypes){
        return sportTestTypes.stream().map(stt -> toSportTestTypeDto(stt)).collect(Collectors.toList());
    }
}

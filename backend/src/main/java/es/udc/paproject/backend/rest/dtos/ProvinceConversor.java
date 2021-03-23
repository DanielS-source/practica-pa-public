package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Province;

import java.util.List;
import java.util.stream.Collectors;

public class ProvinceConversor {
    private ProvinceConversor(){}

    public final static ProvinceDto toProvinceDto(Province province){
        return new ProvinceDto(province.getId(),province.getName());
    }

    public final static List<ProvinceDto> toProvinceDtos(List<Province> provinces){
        return provinces.stream().map(p -> toProvinceDto(p)).collect(Collectors.toList());
    }
}

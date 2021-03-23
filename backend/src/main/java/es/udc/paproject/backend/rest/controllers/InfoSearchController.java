package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.SportTest;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.InfoSearchService;
import es.udc.paproject.backend.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static es.udc.paproject.backend.rest.dtos.ProvinceConversor.toProvinceDtos;
import static es.udc.paproject.backend.rest.dtos.SportTestConversor.toSportTestDto;
import static es.udc.paproject.backend.rest.dtos.SportTestConversor.toSportTestSummaryDtos;
import static es.udc.paproject.backend.rest.dtos.SportTestTypeConversor.toSportTestTypeDtos;

@RestController
@RequestMapping("/search")
public class InfoSearchController {

    @Autowired
    private InfoSearchService infoSearchService;

    @GetMapping("/sportTests")
    public BlockDto<SportTestSummaryDto> findSportTests(
            @RequestParam(required = false) Long provinceId,
            @RequestParam(required = false) Long testTypeId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page){

        Block<SportTest> sportTestBlock = infoSearchService.findSportTests(provinceId, testTypeId, startDate, endDate, page, 10);

        return new BlockDto<>(toSportTestSummaryDtos(sportTestBlock.getItems()), sportTestBlock.getExistMoreItems());
    }

    @GetMapping("/provinces")
    public List<ProvinceDto> findAllProvinces(){
        return toProvinceDtos(infoSearchService.findAllProvinces());
    }

    @GetMapping("/sportTestTypes")
    public List<SportTestTypeDto> findAllSportTestTypes(){
        return toSportTestTypeDtos(infoSearchService.findAllSportTestTypes());
    }

    @GetMapping("/sportTests/{id}")
    public SportTestDto findSportTestById(@PathVariable Long id) throws InstanceNotFoundException{
        return toSportTestDto(infoSearchService.findSportTestById(id));
    }


}

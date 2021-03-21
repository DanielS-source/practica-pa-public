package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.SportTest;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.InfoSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/search")
public class InfoSearchController {

    @Autowired
    private InfoSearchService infoSearchService;

    //Por cada prueba deportiva que aparece como
    //resultado de la búsqueda se mostrará su nombre, el tipo, la provincia, la fecha y
    //hora de celebración y la puntuación media (o una indicación de que todavía no
            //ha recibido ninguna puntuación).

    @GetMapping("/sportTests")
    Block<SportTest> findSportTests(
            @RequestParam(required = false) Long provinceId,
            @RequestParam(required = false) Long testTypeId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page){
        //toSportTestDto
        Block<SportTest> sportTestBlock = infoSearchService.findSportTests(provinceId, testTypeId, startDate, endDate, page, 10);



        return sportTestBlock;
    }

}

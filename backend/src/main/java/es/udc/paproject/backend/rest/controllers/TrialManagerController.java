package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.services.InfoSearchService;
import es.udc.paproject.backend.model.services.TrialManagerService;
import es.udc.paproject.backend.model.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/catalog")
public class TrialManagerController {

    @Autowired
    private TrialManagerService trialManagerService;

}

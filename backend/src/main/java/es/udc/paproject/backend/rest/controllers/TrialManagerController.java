package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.services.TrialManagerService;
import es.udc.paproject.backend.rest.dtos.InscriptionConversor;
import es.udc.paproject.backend.rest.dtos.InscriptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trials")
public class TrialManagerController {

    @Autowired
    private TrialManagerService trialManagerService;

    @Autowired
    private InscriptionConversor inscriptionConversor;

    @PostMapping("/inscriptions/{inscriptionId}/score")
    private void scoreSportTest(
            @RequestBody Long userId,
            @PathVariable Long inscriptionId,
            @RequestBody int score)
            throws PermissionException, TooLateToScoreException,
            AlreadyScoredTestException, InstanceNotFoundException,
            TestNotStartedException {

        trialManagerService.scoreSportTest(userId, inscriptionId, score);

        return;
    }

    @PostMapping("/inscriptions/inscribe")
    private InscriptionDto createSportTestInscription(
            @RequestBody Long userId,
            @PathVariable Long sportTestId,
            @RequestBody String creditCard)
            throws InstanceNotFoundException, DuplicateInstanceException, SportTestFullException,
            InscriptionPeriodClosedException {

        Inscription newInsc = trialManagerService.createSportTestInscription(userId, sportTestId, creditCard);

        //toInscriptionDto
        return inscriptionConversor.toInscriptionDto(newInsc);
    }

    @PostMapping("/inscriptions/retrieve")
    private List<Inscription> retrieveInscriptionList(
            @RequestBody Long userId)
            throws InstanceNotFoundException, PermissionException {

        List<Inscription> foundInsc = trialManagerService.getUserInscriptions(userId);

        //toBlock<InscriptionDto>
        return foundInsc;
    }
}

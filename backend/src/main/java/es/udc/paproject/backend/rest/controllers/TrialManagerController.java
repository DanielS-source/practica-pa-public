package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.services.TrialManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trials")
public class TrialManagerController {

    @Autowired
    private TrialManagerService trialManagerService;

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

}

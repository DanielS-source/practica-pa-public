package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.services.TrialManagerService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/trials")
public class TrialManagerController {

    private final static String ALREADY_SCORED_TEST_EXCEPTION_CODE = "project.exceptions.AlreadyScoredTestException";
    private final static String TOO_LATE_TO_SCORE_EXCEPTION_CODE = "project.exceptions.TooLateToScoreException";
    private final static String TEST_NOT_STARTED_DECEPTION_CODE = "project.exceptions.AlreadyScoredTestException";

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private TrialManagerService trialManagerService;

    @ExceptionHandler(AlreadyScoredTestException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleAlreadyScoredTestException(AlreadyScoredTestException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(ALREADY_SCORED_TEST_EXCEPTION_CODE,
                null, ALREADY_SCORED_TEST_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(TooLateToScoreException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleTooLateToScoreException(TooLateToScoreException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(TOO_LATE_TO_SCORE_EXCEPTION_CODE,
                null, TOO_LATE_TO_SCORE_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(TestNotStartedException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleTestNotStartedException(TestNotStartedException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(TEST_NOT_STARTED_DECEPTION_CODE,
                null, TEST_NOT_STARTED_DECEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @PostMapping("/inscriptions/{inscriptionId}/score")
    private void scoreSportTest(
            @RequestAttribute Long userId,
            @PathVariable Long inscriptionId,
            @RequestBody ScoreParamsDto params)
            throws PermissionException, TooLateToScoreException,
            AlreadyScoredTestException, InstanceNotFoundException,
            TestNotStartedException {

        trialManagerService.scoreSportTest(userId, inscriptionId, params.getScore());

    }

    @PostMapping("/inscriptions/inscribe")
    private InscriptionDto createSportTestInscription(
            @RequestAttribute Long userId,
            @Validated @RequestBody InscriptionParamsDto params)
            throws InstanceNotFoundException, DuplicateInstanceException, SportTestFullException,
            InscriptionPeriodClosedException {

        Inscription newInsc = trialManagerService.createSportTestInscription(userId, params.getSportTestId(),
                params.getCreditCard());

        return InscriptionConversor.toInscriptionDto(newInsc);
    }

    @PostMapping("/inscriptions/retrieve")
    private List<InscriptionDto> retrieveInscriptionList(
            @RequestAttribute Long userId)
            throws InstanceNotFoundException, PermissionException {

        List<Inscription> foundInsc = trialManagerService.getUserInscriptions(userId);

        //toBlock<InscriptionDto>
        return InscriptionConversor.toInscriptionDtos(foundInsc);
    }

    @PostMapping("/dorsal/{inscriptionId}")
    private int deliverInscriptionDorsal(
            @RequestBody GetDorsalParamsDto params,
            @PathVariable Long inscriptionId
    )throws InstanceNotFoundException, InvalidDataException, TooSoonToDeliverException, TestAlreadyStartedException,
            DorsalAlreadyDeliveredException
    {
        return trialManagerService.deliverInscriptionDorsal(inscriptionId, params.getCreditCard(), params.getsportTestId());
    }
}

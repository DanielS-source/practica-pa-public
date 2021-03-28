package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.TrialManagerService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.*;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

import static es.udc.paproject.backend.rest.dtos.SportTestConversor.toSportTestSummaryDtos;

@RestController
@RequestMapping("/trials")
public class TrialManagerController {

    private final static String ALREADY_SCORED_TEST_EXCEPTION_CODE = "project.exceptions.AlreadyScoredTestException";
    private final static String TOO_LATE_TO_SCORE_EXCEPTION_CODE = "project.exceptions.TooLateToScoreException";
    private final static String TEST_NOT_STARTED_EXCEPTION_CODE = "project.exceptions.AlreadyScoredTestException";
    private final static String DUPLICATE_INSTANCE_EXCEPTION_CODE = "project.exceptions.DuplicateInstanceException";
    private final static String SPORTTEST_FULL_EXCEPTION_CODE = "project.exceptions.SportTestFullException";
    private final static String INSCRIPTION_PERIOD_CLOSED_EXCEPTION_CODE =
            "project.exceptions.InscriptionPeriodClosedException";
    private final static String INSTANCE_NOT_FOUND_EXCEPTION_CODE ="project.exceptions.InstanceNotFoundException";
    private final static String INVALID_DATA_EXCEPTION_CODE = "project.exceptions.InvalidDataException";
    private final static String TOO_SOON_TO_DELIVER_EXCEPTION_CODE = "project.exceptions.TooSoonToDeliverException";
    private final static String TEST_ALREADY_STARTED_EXCEPTION_CODE = "project.exceptions.TestAlreadyStartedException";
    private final static String DORSAL_ALREADY_DELIVERED_EXCEPTION_CODE = "project.exceptions.DorsalAlreadyDeliveredException";

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

        String errorMessage = messageSource.getMessage(TEST_NOT_STARTED_EXCEPTION_CODE,
                null, TEST_NOT_STARTED_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(DuplicateInstanceException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleDuplicateInstanceException(DuplicateInstanceException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(DUPLICATE_INSTANCE_EXCEPTION_CODE,
                null, DUPLICATE_INSTANCE_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(SportTestFullException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleSportTestFullException(SportTestFullException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(SPORTTEST_FULL_EXCEPTION_CODE,
                null, SPORTTEST_FULL_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(InscriptionPeriodClosedException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleInscriptionPeriodClosedException(InscriptionPeriodClosedException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(INSCRIPTION_PERIOD_CLOSED_EXCEPTION_CODE,
                null, INSCRIPTION_PERIOD_CLOSED_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleInstanceNotFoundException(InstanceNotFoundException exception, Locale locale){
        String errorMessage = messageSource.getMessage(INSTANCE_NOT_FOUND_EXCEPTION_CODE,
                null, INSTANCE_NOT_FOUND_EXCEPTION_CODE, locale);
        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(InvalidDataException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleInvalidDataException(InvalidDataException exception, Locale locale){
        String errorMessage = messageSource.getMessage(INVALID_DATA_EXCEPTION_CODE,
                null, INVALID_DATA_EXCEPTION_CODE, locale);
        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(TooSoonToDeliverException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ErrorsDto handleTooSoonToDeliverException(TooSoonToDeliverException exception, Locale locale){
        String errorMessage = messageSource.getMessage(TOO_SOON_TO_DELIVER_EXCEPTION_CODE,
                null, TOO_SOON_TO_DELIVER_EXCEPTION_CODE, locale);
        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(TestAlreadyStartedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ErrorsDto handleTestAlreadyStartedException(TestAlreadyStartedException exception, Locale locale){
        String errorMessage = messageSource.getMessage(TEST_ALREADY_STARTED_EXCEPTION_CODE,
                null, TEST_ALREADY_STARTED_EXCEPTION_CODE, locale);
        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(DorsalAlreadyDeliveredException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ErrorsDto handleDorsalAlreadyDeliveredException(DorsalAlreadyDeliveredException exception, Locale locale){
        String errorMessage = messageSource.getMessage(DORSAL_ALREADY_DELIVERED_EXCEPTION_CODE,
                null, DORSAL_ALREADY_DELIVERED_EXCEPTION_CODE, locale);
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

    @PostMapping("/inscriptions")
    private InscriptionDto createSportTestInscription(
            @RequestAttribute Long userId,
            @Validated @RequestBody InscriptionParamsDto params)
            throws InstanceNotFoundException, DuplicateInstanceException, SportTestFullException,
            InscriptionPeriodClosedException {

        Inscription newInsc = trialManagerService.createSportTestInscription(userId, params.getSportTestId(),
                params.getCreditCard());

        return InscriptionConversor.toInscriptionDto(newInsc);
    }

    @GetMapping("/inscriptions/retrieve")
    private BlockDto<InscriptionDto> retrieveInscriptionList(
            @RequestAttribute Long userId,
            @RequestParam(defaultValue = "0") int page)
            throws InstanceNotFoundException, PermissionException {

        Block<Inscription> inscriptionBlock = trialManagerService.getUserInscriptions(userId, page, 2);

        return new BlockDto<>(InscriptionConversor.toInscriptionDtos(inscriptionBlock.getItems()),
                inscriptionBlock.getExistMoreItems());
    }

    @PostMapping("/dorsal/{inscriptionId}")
    private DorsalDto deliverInscriptionDorsal(
            @RequestBody GetDorsalParamsDto params,
            @PathVariable Long inscriptionId
    )throws InstanceNotFoundException, InvalidDataException, TooSoonToDeliverException, TestAlreadyStartedException,
            DorsalAlreadyDeliveredException
    {
        return new DorsalDto(trialManagerService.deliverInscriptionDorsal(inscriptionId, params.getCreditCard(), params.getsportTestId()));
    }
}

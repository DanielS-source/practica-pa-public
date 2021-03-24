package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.entities.Inscription;


public interface TrialManagerService {
    Inscription createSportTestInscription(Long userId, Long sportTestId, String creditCard) throws
            InstanceNotFoundException, DuplicateInstanceException, SportTestFullException,
            InscriptionPeriodClosedException;

    int deliverInscriptionDorsal(Long inscriptionId, String creditCard, Long sportTestId) throws InstanceNotFoundException,
            InvalidDataException, TooSoonToDeliverException, TestAlreadyStartedException, DorsalAlreadyDeliveredException;

    List<Inscription> getUserInscriptions(Long userId) throws InstanceNotFoundException, PermissionException;

    void scoreSportTest(Long userId, Long inscriptionId, int score) throws InstanceNotFoundException,
            PermissionException, AlreadyScoredTestException, TestNotStartedException, TooLateToScoreException;
}

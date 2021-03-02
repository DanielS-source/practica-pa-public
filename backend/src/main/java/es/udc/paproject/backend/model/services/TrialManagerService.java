package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.SportTest;
import es.udc.paproject.backend.model.exceptions.*;
import es.udc.paproject.backend.model.entities.Inscription;


public interface TrialManagerService {
    List<SportTest> searchSportTestList(Long provinceId, Long testType, LocalDateTime startDate, LocalDateTime endDate)
            throws InstanceNotFoundException, InvalidDataException;

    Inscription createSportTestInscription(Long userId, Long sportTestId, String creditCard) throws
            InstanceNotFoundException, DuplicateInstanceException, SportTestFullException,
            InscriptionPeriodClosedException, InvalidDataException;

    Inscription deliverInscriptionDorsal(Long inscriptionId, String creditCard) throws InstanceNotFoundException,
            PermissionException, InvalidDataException;
}

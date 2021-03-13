package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.PermissionException;

public interface PermissionChecker {
	
	public void checkUserExists(Long userId) throws InstanceNotFoundException;
	
	public User checkUser(Long userId) throws InstanceNotFoundException;

	public Inscription checkInscriptionExistsAndBelongsTo(Long inscriptionId, Long userId)
			throws PermissionException, InstanceNotFoundException;
	
}

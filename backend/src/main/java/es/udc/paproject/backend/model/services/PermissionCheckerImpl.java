package es.udc.paproject.backend.model.services;

import java.util.Optional;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.entities.InscriptionDao;
import es.udc.paproject.backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.entities.UserDao;

@Service
@Transactional(readOnly=true)
public class PermissionCheckerImpl implements PermissionChecker {
	
	@Autowired
	private UserDao userDao;

	@Autowired
	private InscriptionDao inscriptionDao;
	
	@Override
	public void checkUserExists(Long userId) throws InstanceNotFoundException {
		
		if (!userDao.existsById(userId)) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		
	}

	@Override
	public User checkUser(Long userId) throws InstanceNotFoundException {

		Optional<User> user = userDao.findById(userId);
		
		if (!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		
		return user.get();
		
	}

	@Override
	public Inscription checkInscriptionExistsAndBelongsTo(Long inscriptionId, Long userId) throws PermissionException, InstanceNotFoundException {

		Optional<Inscription> inscription = inscriptionDao.findById(inscriptionId);

		if (!inscription.isPresent())
			throw new InstanceNotFoundException("project.entities.inscription", inscriptionId);

		if(!inscription.get().getUserId().equals(userId))
			throw new PermissionException();

		return inscription.get();

	}

}

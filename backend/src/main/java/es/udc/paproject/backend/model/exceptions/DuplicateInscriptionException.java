package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class DuplicateInscriptionException extends InstanceException {

    public DuplicateInscriptionException(String name, Object key) {
    	super(name, key); 	
    }
    
}

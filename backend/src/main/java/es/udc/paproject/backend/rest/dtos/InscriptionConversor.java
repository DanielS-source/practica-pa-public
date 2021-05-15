package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.entities.SportTest;
import org.springframework.cglib.core.Block;

import java.util.List;
import java.util.stream.Collectors;

public class InscriptionConversor {

    private InscriptionConversor() {}

    public static InscriptionDto toInscriptionDto(Inscription inscription) {
        return new InscriptionDto(inscription.getId(), inscription.getCreditCardNumber(), inscription.getDorsal(),
                inscription.isDorsalPicked(), inscription.getSportTest().getId(), inscription.getUser().getId(), inscription.getScore());
    }

    public final static List<InscriptionDto> toInscriptionDtos(List<Inscription> inscriptions) {
        return inscriptions.stream().map(p -> toInscriptionDto(p)).collect(Collectors.toList());
    }

    public static InscriptionReturnDto toInscriptionReturnDto(Inscription inscription){
        return new InscriptionReturnDto(inscription.getId(), inscription.getDorsal());
    }
}

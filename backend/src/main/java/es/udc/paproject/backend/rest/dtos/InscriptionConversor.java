package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Inscription;
import es.udc.paproject.backend.model.entities.SportTest;

import java.util.List;
import java.util.stream.Collectors;

public class InscriptionConversor {

    private InscriptionConversor() {}

    public static InscriptionDto toInscriptionDto(Inscription inscription) {
        return new InscriptionDto(inscription.getId(), inscription.getCreditCardNumber(), inscription.getDorsal(),
                inscription.isDorsalPicked(), inscription.getSportTest().getId(), inscription.getUser().getId());
    }

    public final static List<InscriptionDto> toInscriptionDtos(List<Inscription> inscriptions) {
        return inscriptions.stream().map(p -> toInscriptionDto(p)).collect(Collectors.toList());
    }
}

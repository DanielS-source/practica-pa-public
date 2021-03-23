package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Inscription;

public class InscriptionConversor {

    private InscriptionConversor() {}

    public static InscriptionDto toInscriptionDto(Inscription inscription) {
        return new InscriptionDto(inscription.getId(), inscription.getCreditCardNumber(), inscription.getDorsal(),
                inscription.isDorsalPicked(), inscription.getSportTest().getId(), inscription.getUser().getId());
    }

    /*
    public static Inscription toInscription(InscriptionDto inscriptionDto) {

        return new Inscription(inscriptionDto.getCreditCardNumber(), inscriptionDto.getDorsal(),
                inscriptionDto.isDorsalPicked(), inscriptionDto.getSportTest(),
                inscriptionDto.getUser());
    }

     */
}

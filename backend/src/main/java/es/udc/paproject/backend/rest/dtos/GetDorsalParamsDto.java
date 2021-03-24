package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class GetDorsalParamsDto {

    private Long inscriptionId;
    private String creditCard;

    @NotNull
    public Long getInscriptionId(){return inscriptionId;}

    public void setInscriptionId(Long id){this.inscriptionId = id;}

    @NotNull
    public String getCreditCard(){return creditCard;}

    public void setCreditCard(String card){this.creditCard = card;}
}

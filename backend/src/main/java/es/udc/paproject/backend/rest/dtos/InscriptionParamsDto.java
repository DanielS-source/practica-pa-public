package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.*;

public class InscriptionParamsDto {

    private String creditCard;
    private Long sportTestId;

    @NotNull
    public String getCreditCard(){ return creditCard; }

    public void setCreditCard(String creditCard){
        this.creditCard = creditCard;
    }

    @NotNull
    public Long getSportTestId(){ return sportTestId; }

    public void setSportTestId(Long sportTestId){
        this.sportTestId = sportTestId;
    }

}

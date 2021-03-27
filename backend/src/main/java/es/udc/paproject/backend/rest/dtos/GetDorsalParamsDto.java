package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class GetDorsalParamsDto {

    private Long sportTestId;
    private String creditCard;

    @NotNull
    public Long getsportTestId(){return sportTestId;}

    public void setsportTestId(Long id){this.sportTestId = id;}

    @NotNull
    public String getCreditCard(){return creditCard;}

    public void setCreditCard(String card){this.creditCard = card;}
}

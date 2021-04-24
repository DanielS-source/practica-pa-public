package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class InscriptionReturnDto {

    private Long id;
    private int dorsal;

    public InscriptionReturnDto(Long id, int dorsal) {
        this.id = id;
        this.dorsal = dorsal;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    @NotNull
    public int getDorsal() { return dorsal; }

    public void setDorsal(int dorsal) { this.dorsal = dorsal; }
}


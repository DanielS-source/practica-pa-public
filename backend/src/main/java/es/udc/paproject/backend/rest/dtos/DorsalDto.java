package es.udc.paproject.backend.rest.dtos;

public class DorsalDto {

    private int dorsal;

    public DorsalDto() {}

    public DorsalDto(int dorsal) {
        this.dorsal = dorsal;
    }

    public int getDorsal() {
        return dorsal;
    }

    public void setDorsal(int dorsal) {
        this.dorsal = dorsal;
    }
}

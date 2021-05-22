package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class InscriptionDto {

    private Long id;
    private String creditCardNumber;
    private int dorsal;
    private boolean dorsalPicked;
    private Long sportTestId;
    private String sportTestName;
    private Long userId;
    private int score;

    public InscriptionDto(Long id, String creditCardNumber, int dorsal, boolean dorsalPicked,
                          Long sportTestId, String sportTestName, Long userId, int score) {
        this.id = id;
        this.creditCardNumber = creditCardNumber;
        this.dorsal = dorsal;
        this.dorsalPicked = dorsalPicked;
        this.sportTestId = sportTestId;
        this.sportTestName = sportTestName;
        this.userId = userId;
        this.score = score;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    @NotNull
    public String getCreditCardNumber() { return creditCardNumber.substring(creditCardNumber.length() - 4); }

    public void setCreditCardNumber(String creditCardNumber) { this.creditCardNumber = creditCardNumber; }

    @NotNull
    public int getDorsal() { return dorsal; }

    public void setDorsal(int dorsal) { this.dorsal = dorsal; }

    @NotNull
    public Long getSportTestId() { return sportTestId; }

    public void setSportTestId(Long sportTestId) { this.sportTestId = sportTestId; }

    @NotNull
    public String getSportTestName() { return sportTestName; }

    public void setSportTestName(String sportTestName) { this.sportTestName = sportTestName; }

    @NotNull
    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    @NotNull
    public boolean isDorsalPicked() { return dorsalPicked;}

    public void setDorsalPicked(boolean dorsalPicked) { this.dorsalPicked = dorsalPicked;}

    @NotNull
    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }
}

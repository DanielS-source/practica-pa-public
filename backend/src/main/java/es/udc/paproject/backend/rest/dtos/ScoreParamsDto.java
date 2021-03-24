package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ScoreParamsDto {

    private int score;

    public ScoreParamsDto() {}

    @NotNull
    @Size(min=1, max=5)
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}

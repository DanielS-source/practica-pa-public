package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SportTestDto {

    private Long id;
    private String name;
    private String description;
    private Long testStart;
    private BigDecimal price;
    private int maxParticipants;
    private String location;
    private Long provinceId;
    private Long sportTestTypeId;
    private int participants;
    private int timesRated;
    private Long averageRating;

    public SportTestDto() {}

    public SportTestDto(Long id, String name, String description, Long testStart,
                        BigDecimal price, int maxParticipants, String location, Long provinceId,
                        Long sportTestTypeId, int participants, int timesRated, Long averageRating) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.testStart = testStart;
        this.price = price;
        this.maxParticipants = maxParticipants;
        this.location = location;
        this.provinceId = provinceId;
        this.sportTestTypeId = sportTestTypeId;
        this.participants = participants;
        this.timesRated = timesRated;
        this.averageRating = averageRating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull
    @Size(min=1, max=60)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull
    @Size(min=1, max=256)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @NotNull
    public Long getTestStart() {
        return testStart;
    }

    public void setTestStart(Long testStart) {
        this.testStart = testStart;
    }

    @NotNull
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @NotNull
    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    @NotNull
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @NotNull
    public Long getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }

    @NotNull
    public Long getSportTestTypeId() {
        return sportTestTypeId;
    }

    public void setSportTestTypeId(Long sportTestTypeId) {
        this.sportTestTypeId = sportTestTypeId;
    }

    @NotNull
    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }

    public int getTimesRated() {
        return timesRated;
    }

    public void setTimesRated(int timesRated) {
        this.timesRated = timesRated;
    }

    public Long getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Long averageRating) {
        this.averageRating = averageRating;
    }
}

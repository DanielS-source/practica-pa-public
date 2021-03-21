package es.udc.paproject.backend.rest.dtos;

public class SportTestSummaryDto {

    private Long id;
    private String name;
    private Long sportTestTypeId;
    private Long provinceId;
    private Long testStart;
    private Long averageRating;
    private int timesRated;

    public SportTestSummaryDto() {}

    public SportTestSummaryDto(Long id, String name, Long sportTestTypeId, Long provinceId,
                               Long testStart, Long averageRating, int timesRated) {
        this.id = id;
        this.name = name;
        this.sportTestTypeId = sportTestTypeId;
        this.provinceId = provinceId;
        this.testStart = testStart;
        this.averageRating = averageRating;
        this.timesRated = timesRated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSportTestTypeId() {
        return sportTestTypeId;
    }

    public void setSportTestTypeId(Long sportTestTypeId) {
        this.sportTestTypeId = sportTestTypeId;
    }

    public Long getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }

    public Long getTestStart() {
        return testStart;
    }

    public void setTestStart(Long testStart) {
        this.testStart = testStart;
    }

    public Long getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Long averageRating) {
        this.averageRating = averageRating;
    }

    public int getTimesRated() {
        return timesRated;
    }

    public void setTimesRated(int timesRated) {
        this.timesRated = timesRated;
    }
}

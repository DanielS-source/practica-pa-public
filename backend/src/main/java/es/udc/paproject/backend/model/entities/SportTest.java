package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class SportTest {

    private Long id;
    private String name;
    private String description;
    private LocalDateTime testStart;
    private BigDecimal price;
    private int maxParticipants;
    private String location;
    private Province province;
    private SportTestType sportTestType;
    private int participants;
    private int timesRated;
    private long averageRating;
    private long version;

    public SportTest() {}

    public SportTest(String name, String description, LocalDateTime testStart,
                     BigDecimal price, int maxParticipants, String location,
                     Province province, SportTestType sportTestType, int participants,
                     int timesRated, long averageRating) {
        this.name = name;
        this.description = description;
        this.testStart = testStart;
        this.price = price;
        this.maxParticipants = maxParticipants;
        this.location = location;
        this.province = province;
        this.sportTestType = sportTestType;
        this.participants = participants;
        this.timesRated = timesRated;
        this.averageRating = averageRating;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() { return id;}

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getTestStart() { return testStart; }

    public void setTestStart(LocalDateTime testStart) { this.testStart = testStart; }

    public BigDecimal getPrice() { return price; }

    public void setPrice(BigDecimal price) { this.price = price; }

    public int getMaxParticipants() { return maxParticipants; }

    public void setMaxParticipants(int maxParticipants) { this.maxParticipants = maxParticipants; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    @ManyToOne(optional=false, fetch= FetchType.LAZY)
    @JoinColumn(name="provinceId")
    public Province getProvince() { return province; }

    public void setProvince(Province province) { this.province = province; }

    @ManyToOne(optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="sportTestTypeId")
    public SportTestType getSportTestType() { return sportTestType; }

    public void setSportTestType(SportTestType sportTestType) { this.sportTestType = sportTestType; }

    public int getParticipants() { return participants; }

    public void setParticipants(int participants) { this.participants = participants; }

    public int getTimesRated() { return timesRated; }

    public void setTimesRated(int timesRated) { this.timesRated = timesRated; }

    public long getAverageRating() { return averageRating; }

    public void setAverageRating(long averageRating) { this.averageRating = averageRating; }

    @Version
    public long getVersion() { return version; }

    public void setVersion(long version) { this.version = version; }
}

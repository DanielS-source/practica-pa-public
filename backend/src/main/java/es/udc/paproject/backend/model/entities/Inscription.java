package es.udc.paproject.backend.model.entities;

import javax.persistence.*;

@Entity
public class Inscription {

    private Long id;
    private String creditCardNumber;
    private int dorsal;
    private boolean dorsalPicked;
    private Long sportTestId;
    private Long userId;
    private int score;
    private long version;

    public Inscription() {}

    public Inscription(String creditCardNumber, int dorsal, Long sportTestId, Long userId) {
        this.creditCardNumber = creditCardNumber;
        this.dorsal = dorsal;
        this.dorsalPicked = false;
        this.sportTestId = sportTestId;
        this.userId = userId;
    }

    public Inscription(String creditCardNumber, int dorsal, boolean dorsalPicked, Long sportTestId, Long userId) {
        this.creditCardNumber = creditCardNumber;
        this.dorsal = dorsal;
        this.dorsalPicked = dorsalPicked;
        this.sportTestId = sportTestId;
        this.userId = userId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getCreditCardNumber() { return creditCardNumber; }

    public void setCreditCardNumber(String creditCardNumber) { this.creditCardNumber = creditCardNumber; }

    public int getDorsal() { return dorsal; }

    public void setDorsal(int dorsal) { this.dorsal = dorsal; }

    @OneToOne(optional=false , fetch= FetchType.LAZY)
    @JoinColumn(name="sportTestId")
    public Long getSportTestId() { return sportTestId; }

    public void setSportTestId(Long sportTestId) { this.sportTestId = sportTestId; }

    @OneToOne(optional=false , fetch= FetchType.LAZY)
    @JoinColumn(name="userId")
    public Long getUserId() { return userId; }

    public void setUser(Long userId) { this.userId = userId; }

    public boolean isDorsalPicked() { return dorsalPicked;}

    public void setDorsalPicked(boolean dorsalPicked) { this.dorsalPicked = dorsalPicked;}

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }

    @Version
    public long getVersion() { return version; }

    public void setVersion(long version) { this.version = version; }
}

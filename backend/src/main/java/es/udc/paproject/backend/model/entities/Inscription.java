package es.udc.paproject.backend.model.entities;

import javax.persistence.*;

public class Inscription {

    private Long id;
    private String creditCardNumber;
    private int dorsal;
    private SportTest sportTest;
    private User user;

    public Inscription() {}

    public Inscription(String creditCardNumber, int dorsal, SportTest sportTest, User user) {
        this.creditCardNumber = creditCardNumber;
        this.dorsal = dorsal;
        this.sportTest = sportTest;
        this.user = user;
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
    public SportTest getSportTest() { return sportTest; }

    public void setSportTest(SportTest sportTest) { this.sportTest = sportTest; }

    @OneToOne(optional=false , fetch= FetchType.LAZY)
    @JoinColumn(name="userId")
    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

}

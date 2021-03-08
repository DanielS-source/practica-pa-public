DROP TABLE User;

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL, 
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    role TINYINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE SportTest (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(256) NOT NULL,
    testStart DATETIME NOT NULL,
    price DECIMAL(11, 2) NOT NULL,
    maxParticipants SMALLINT NOT NULL,
    location VARCHAR(60) NOT NULL,
    provinceId BIGINT NOT NULL,
    sportTestTypeId BIGINT NOT NULL,
    participants SMALLINT NOT NULL,
    timesRated SMALLINT NOT NULL,
    averageRating BIGINT NOT NULL,
    version BIGINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT nameUniqueKey UNIQUE (name),
    CONSTRAINT ProvinceFK FOREIGN KEY (provinceId)
        REFERENCES Province (id),
    CONSTRAINT SportTestTypeFK FOREIGN KEY (sportTestTypeId)
        REFERENCES SportTestType (id)
) ENGINE = InnoDB;

CREATE TABLE Province (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE SportTestType (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60)  NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE Inscription (
    id BIGINT NOT NULL AUTO_INCREMENT,
    creditCardNumber VARCHAR(60) NOT NULL,
    dorsal SMALLINT NOT NULL,
    dorsalPicked TINYINT NOT NULL,
    sportTestId VARCHAR(60) NOT NULL,
    userId VARCHAR(60) NOT NULL,
    score SMALLINT NOT NULL,
    version BIGINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT SportTestFK FOREIGN KEY (sportTestId)
        REFERENCES SportTest (id),
    CONSTRAINT UserFK FOREIGN KEY (userId)
        REFERENCES User (id)
) ENGINE = InnoDB;

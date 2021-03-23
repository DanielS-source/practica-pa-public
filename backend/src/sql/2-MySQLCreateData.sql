-- ----------------------------------------------------------------------------
-- Put here INSERT statements for inserting data required by the application
-- in the "pa-project" database.
-------------------------------------------------------------------------------

INSERT INTO Province (name) VALUES ('A CORUÑA');
INSERT INTO Province (name) VALUES ('Pontevedra');

INSERT INTO SportTestType (name) VALUES ('Running');
INSERT INTO SportTestType (name) VALUES ('Ciclismo');

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

INSERT INTO SportTest(name, description, testStart, price, maxParticipants, location, provinceId, sportTestTypeId, participants, timesRated, averageRating, version)
    VALUES ('Prueba 1', 'DescripcionP1', '01-07-2020 16:00:00', 6.99, 500, 'Micasa');

    • 4 pruebas deportivas (solamente se especifican algunos datos; para los demás puede especificarse
    cualquier valor válido):
    o “Prueba 1” de tipo Running celebrada en A Coruña el 1 de Julio de 2020 con un
    máximo de 500 participantes.
    o “Prueba 2” de tipo Ciclismo que se celebrará en A Coruña el 1 de Enero de 2022 con
    un máximo de 100 participantes.
    o “Prueba 3” de tipo Running que se celebrará en Pontevedra el 1 de Febrero de 2022
    con un máximo de 300 participantes.
    o “Prueba 4” de tipo Ciclismo que se celebrará en Pontevedra el 1 de Marzo de 2022
    con un máximo de 2 participantes.
    • 4 usuarios
    o 3 usuarios de tipo participante, “competitor1”, “competitor2” y “competitor3”, con
    contraseña “ficrunner”.
    o 1 usuario de tipo empleado, “employee”, con contraseña “ficrunner”.
    o Hay que tener en cuenta que las contraseñas se guardan cifradas (Bcrypt: hash con
    salt aleatorio) en la base de datos. Como contraseña cifrada correspondiente a
    “ficrunner” puede usarse:
    $2a$10$uicNGMO41KcyofyMPaCCwuQ89o1WM/wn5f9TGgCuFjZrfDLnECPyi
    Para evaluar el software, el profesor realizará los siguientes pasos:
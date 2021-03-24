-- ----------------------------------------------------------------------------
-- Put here INSERT statements for inserting data required by the application
-- in the "pa-project" database.
-------------------------------------------------------------------------------

INSERT INTO Province (name) VALUES ('A CORUÑA');
INSERT INTO Province (name) VALUES ('Pontevedra');

INSERT INTO SportTestType (name) VALUES ('Running');
INSERT INTO SportTestType (name) VALUES ('Ciclismo');

INSERT INTO SportTest (name, description, testStart, price, maxParticipants, location, provinceId, sportTestTypeId, participants, timesRated, averageRating, version)
    VALUES ('Prueba 1', 'DescripcionP1', '2020-07-01 16:00:00', 6.99, 500, 'Micasa', 1, 1, 0, 0, 0, 1);

INSERT INTO SportTest (name, description, testStart, price, maxParticipants, location, provinceId, sportTestTypeId, participants, timesRated, averageRating, version)
    VALUES ('Prueba 2', 'DescripcionP2', '2020-01-01 16:00:00', 6.99, 100, 'Micasa', 2, 1, 0, 0, 0, 1);

INSERT INTO SportTest (name, description, testStart, price, maxParticipants, location, provinceId, sportTestTypeId, participants, timesRated, averageRating, version)
    VALUES ('Prueba 3', 'DescripcionP3', '2020-02-01 16:00:00', 6.99, 300, 'Micasa', 1, 2, 0, 0, 0, 1);

INSERT INTO SportTest (name, description, testStart, price, maxParticipants, location, provinceId, sportTestTypeId, participants, timesRated, averageRating, version)
    VALUES ('Prueba 4', 'DescripcionP4', '2020-03-01 16:00:00', 6.99, 2,   'Micasa', 2, 2, 0, 0, 0, 1);

INSERT INTO User (userName, password, firstName, lastName, email, role)
    VALUES ('competitor1', '$2a$10$uicNGMO41KcyofyMPaCCwuQ89o1WM/wn5f9TGgCuFjZrfDLnECPyi', 'firstName', 'lastName', 'email@email.email', 0);

INSERT INTO User (userName, password, firstName, lastName, email, role)
    VALUES ('competitor2', '$2a$10$uicNGMO41KcyofyMPaCCwuQ89o1WM/wn5f9TGgCuFjZrfDLnECPyi', 'firstName', 'lastName', 'email@email.email', 0);

INSERT INTO User (userName, password, firstName, lastName, email, role)
    VALUES ('competitor3', '$2a$10$uicNGMO41KcyofyMPaCCwuQ89o1WM/wn5f9TGgCuFjZrfDLnECPyi', 'firstName', 'lastName', 'email@email.email', 0);

INSERT INTO User (userName, password, firstName, lastName, email, role)
    VALUES ('employee',    '$2a$10$uicNGMO41KcyofyMPaCCwuQ89o1WM/wn5f9TGgCuFjZrfDLnECPyi', 'firstName', 'lastName', 'email@email.email', 1);
BEGIN;
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    petName text NOT NULL,
    age integer NOT NULL,
    kind text NOT NULL
);
INSERT INTO pets (petName,age,kind)
VALUES 
('Fido', 6, 'Dog'),
('Patrick', 1, 'Cat'),
('Stevie', 1, 'Cat'),
('Buttons', 3, 'Snake');
COMMIT;
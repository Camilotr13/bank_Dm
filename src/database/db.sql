CREATE TABLE accounts (
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   balance NUMERIC DEFAULT 0
);


INSERT INTO accounts (name, balance)
VALUES ('test', 1000);
INSERT INTO accounts (name, balance)
VALUES ('Camilo', 500000);
INSERT INTO accounts (name, balance)
VALUES ('Omar', 50000);

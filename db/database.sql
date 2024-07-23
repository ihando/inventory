-- Active: 1711568351062@@127.0.0.1@5432@ihando
CREATE DATABASE inventory;

CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id INTEGER NOT NULL,
    level INTEGER DEFAULT 1,
    FOREIGN KEY (type_id) REFERENCES Types(id)
);

CREATE TABLE trainers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE trainerpokemon (
    trainer_id INTEGER NOT NULL,
    pokemon_id INTEGER NOT NULL,
    PRIMARY KEY (trainer_id, pokemon_id),
    FOREIGN KEY (trainer_id) REFERENCES trainers(id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);
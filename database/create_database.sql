CREATE DATABASE IF NOT EXISTS loja_26_1;

USE loja_26_1;

CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2),
    codCategoria INT,

    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (codCategoria)
        REFERENCES categoria(id)
);

INSERT INTO categoria(nome)
VALUES
('Bebidas'),
('Alimentos');

INSERT INTO produto(nome, preco, codCategoria)
VALUES
('Coca-Cola', 9.89, 1),
('Pepsi', 7.99, 1),
('Trakinas', 3.50, 2);
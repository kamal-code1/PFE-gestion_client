CREATE DATABASE gestion_clients;
USE gestion_clients;
CREATE TABLE Frss (
 	ID INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255),
    telephone VARCHAR(50),
    email VARCHAR(100)
);
+
CREATE TABLE Catalogue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    date_creation DATE DEFAULT CURRENT_DATE,
    frssID int,
    constraint FK_FrssId FOREIGN KEY(frssID) REFERENCES Frss(ID)
);


CREATE TABLE Produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2),
    image_url VARCHAR(500),
    catalogue_id INT,
    FOREIGN KEY (catalogue_id) REFERENCES Catalogue(id) ON DELETE CASCADE
);


CREATE TABLE Collection (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Collection_Produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collection_id INT,
    produit_id INT,
    FOREIGN KEY (collection_id) REFERENCES Collection(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES Produits(id) ON DELETE CASCADE
);







CREATE TABLE secteur_activite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ice varchar(15) not null UNIQUE,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    secteur_id INT,
    adresse TEXT,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (secteur_id) REFERENCES secteur_activite(id)
);

CREATE TABLE offres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    dateoffre DATE,
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);
CREATE TABLE LigneOffre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    offre_id INT,
    prix DECIMAL(10, 2),
    produit_id INT,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE,
    FOREIGN KEY (offre_id) REFERENCES offres(id) ON DELETE CASCADE
);

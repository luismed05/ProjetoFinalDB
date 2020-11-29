CREATE DATABASE IF NOT EXISTS CoronaHelpy;

use CoronaHelpy;

CREATE TABLE IF NOT EXISTS Usuario (
	email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    nome VARCHAR(45) NOT NULL,
    Ehadmin BIT DEFAULT 0,
    tokenAcesso VARCHAR(50) DEFAULT NULL,
PRIMARY KEY (email));

CREATE TABLE IF NOT EXISTS PlanoDeSaude (
	codigo INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
PRIMARY KEY (codigo));

#Falta uma Key de referencia ao plano de saude
CREATE TABLE IF NOT EXISTS Paciente (
	cpf BIGINT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    genero VARCHAR(45) NOT NULL,
    data_de_nascimento DATE NOT NULL,
    peso VARCHAR(45) NOT NULL,
    altura VARCHAR(45) NOT NULL,
    sintomas TEXT(150) NOT NULL,
PRIMARY KEY(cpf));

CREATE TABLE IF NOT EXISTS Localizacao (
    longitude_latitude VARCHAR(45) NOT NULL,
    endereço TEXT(150) NOT NULL,
PRIMARY KEY(Longitude_Latitude));

CREATE TABLE IF NOT EXISTS Hospital (
    id INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    Localizacao_Cod VARCHAR(45) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(Localizacao_Cod) REFERENCES Localizacao(longitude_latitude));

CREATE TABLE IF NOT EXISTS Hospital_aceita_plano (
    id INT NOT NULL,
    hospital_id INT NOT NULL,
    PlanoDeSaude_codigo INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(hospital_id) REFERENCES Hospital(id),
FOREIGN KEY(PlanoDeSaude_codigo) REFERENCES PlanoDeSaude(codigo));

CREATE TABLE IF NOT EXISTS Ala (
    id INT NOT NULL,
    urgencia_minima VARCHAR(45) NOT NULL,
    localizacao TEXT(150) NOT NULL,
    hospital_id int NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(hospital_id) REFERENCES Hospital(id));

CREATE TABLE IF NOT EXISTS Leito (
    Numero INT NOT NULL,
    disponivel TINYINT NOT NULL,
    Ala_id INT NOT NULL,
PRIMARY KEY(Numero),
FOREIGN KEY(Ala_id) REFERENCES Ala(id));

CREATE TABLE IF NOT EXISTS Ambulancia (
    placa VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    hospital_id INT NOT NULL,
    disponivel TINYINT NOT NULL,
PRIMARY KEY(placa),
FOREIGN KEY(hospital_id) REFERENCES Hospital(id));

CREATE TABLE IF NOT EXISTS Tecnico (
    matricula INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    hospital_id INT NOT NULL,
PRIMARY KEY(matricula),
FOREIGN KEY(hospital_id) REFERENCES Hospital(id));

CREATE TABLE IF NOT EXISTS Medico (
    matricula INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    especialidade VARCHAR(45) NOT NULL,
    hospital_id INT NOT NULL,
PRIMARY KEY(matricula),
FOREIGN KEY(hospital_id) REFERENCES Hospital(id));

CREATE TABLE IF NOT EXISTS Equipe (
    id INT NOT NULL,
    disponivel TINYINT NOT NULL,
    tecnico_matricula INT NOT NULL,
    medico_matricula INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(tecnico_matricula) REFERENCES Tecnico(matricula),
FOREIGN KEY(medico_matricula) REFERENCES Medico(matricula));

CREATE TABLE IF NOT EXISTS Atendimento (
    id INT NOT NULL AUTO_INCREMENT,
    Urgencia VARCHAR(45) NOT NULL,
    data_inicio DATETIME(6) NOT NULL,
    data_fim DATETIME(6) NOT NULL, 
    usuario_email VARCHAR(45) NOT NULL,
    equipe_id INT NOT NULL,
    paciente_cpf BIGINT NOT NULL,
    leito_numero INT NOT NULL,
    ambulancia_placa VARCHAR(45) NOT NULL,
    localizacao_Cod VARCHAR(45) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(usuario_email) REFERENCES Usuario(email),
FOREIGN KEY(equipe_id) REFERENCES Equipe(id),
FOREIGN KEY(paciente_cpf) REFERENCES Paciente(cpf),
FOREIGN KEY(leito_numero) REFERENCES Leito(numero),
FOREIGN KEY(ambulancia_placa) REFERENCES Ambulancia(placa),
FOREIGN KEY(localizacao_Cod) REFERENCES Localizacao(longitude_latitude));
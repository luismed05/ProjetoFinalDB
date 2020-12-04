USE CoronaHelpy;

INSERT INTO Usuario (email,senha,nome,Ehadmin)
VALUES 
    ('admin@admin','123456','Administrador',1),
    ('valentin@email.com','123456','Valentin Ferreira Paes',0),
    ('luis@email.com','123456','Luis Felipe de Assis Medeiros',0);
    ('joao@email.com','123456','Joao Assis Medeiros',0);
    ('pedro@email.com','123456','Pedro Henrique de Assis Medeiros',0);

INSERT INTO PlanoDeSaude (codigo,nome)
VALUES 
    (2569,'Amil 400'),
    (7845,'Unimed Nacional'),
    (0001,'SUS'),
    (7485,'TJDFT'),
    (8596,'STJ');

INSERT INTO Paciente (cpf,nome,genero,data_de_nascimento,peso,altura,sintomas)
VALUES 
    (09187511066,'Luis Felipe de Assis Medeiros', 'masculino','1996-05-26', '93,4', '1,72', 'Tosse Seca;Febre;Cansaço'),
    (07399078566,'Rosa Angelica de Assis Medeiros', 'Feminino','1973-05-26', '98,4', '1,72', 'Febre;Cansaço'),
    (07599074566,'Armindo Nunes de Medeiros Junior', 'masculino','1970-05-26', '93,4', '1,72', 'Tosse Seca;Febre;Cansaço');

INSERT INTO Hospital (id,nome,localizacao,endereco)
VALUES 
    (10001, 'Rede Sarah de Hospitais de Reabilitação','-15.7975293#-47.8908346','SMHS - Área Especial, Qd 501 - Asa Sul, Brasília - DF'),
    (10002, 'Hospital Santa Lúcia','-15.7975393#-47.8908396','SHLS - Asa Sul, Brasília - DF'),
    (10003, 'Hospital Santa Luzia','-15.7975893#-47.8908396','SHLS Conjunto E Lote 05 - Asa Sul, Brasília - DF');

INSERT INTO Hospital_aceita_plano (id,hospital_id,PlanoDeSaude_codigo)
VALUES 
    (8001,10001,0001),
    (8002,10002,7845),
    (8003,10003,2569);

INSERT INTO Ala (id,urgencia_minima,localizacao,hospital_id)
VALUES 
    (10011, 'baixa','1° andar, setor de quimioterapia', 10001),
    (10021, 'media','2° andar, setor de radiologia', 10001),
    (10031, 'alta','3° andar, setor de Cardiologia', 10001);

INSERT INTO Ala (id,urgencia_minima,localizacao,hospital_id)
VALUES 
    (10012, 'baixa','1° andar, setor de Clinicas medica', 10002),
    (10022, 'media','2° andar, setor de Patologia', 10002),
    (10032, 'alta','3° andar, setor da UTI', 10002);

INSERT INTO Ala (id,urgencia_minima,localizacao,hospital_id)
VALUES 
    (10013, 'baixa','1° andar, setor de quimioterapia', 10003),
    (10023, 'media','2° andar, setor de radiologia', 10003),
    (10033, 'alta','3° andar, setor de Cardiologia', 10003);


INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES 
    (10111,1,10011),
    (10221,1,10021),
    (10331,1,10031);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES 
    (10112,1,10012),
    (10222,1,10022),
    (10332,1,10032);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES 
    (10113,1,10013),
    (10223,1,10023),
    (10333,1,10033);

INSERT INTO Ambulancia (placa,modelo,hospital_id,disponivel)
VALUES 
    ('pww4023','Iveco – Daily',10001,1),
    ('itu7854','Fiorino',10002,1),
    ('iot8596','Sprinter',10003,1);

INSERT INTO Tecnico (matricula,nome,hospital_id)
VALUES 
    (1000101, 'João Silveria Cunha', 10001),
    (1000202, 'Danilo Mendonça de Morais', 10002),
    (1000303, 'Roberto Miguel Lemos', 10003);

INSERT INTO Medico (matricula,nome,especialidade,hospital_id)
VALUES 
    (1001102, 'José Silva Costa', 'Cardiologista', 10001),
    (1001202, 'Arnaldo Pinto da Silva', 'Urologista', 10002),
    (1001302, 'Joarez Torres Rodrigues', 'Clinico Geral', 10003);

INSERT INTO Equipe (id,disponivel,tecnico_matricula,medico_matricula)
VALUES 
    (10001001, 1, 1000101,1001102),
    (10002002, 1, 1000202,1001202),
    (10003003, 1, 1000303,1001302);

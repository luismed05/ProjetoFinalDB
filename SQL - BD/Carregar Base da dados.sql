USE coronahelpy;

INSERT INTO Usuario (email,senha,nome,Ehadmin)
VALUES ('admin@admin','123456','Administrador',1);

INSERT INTO PlanoDeSaude (codigo,nome)
VALUES (2569,'Amil 400');

INSERT INTO PlanoDeSaude (codigo,nome)
VALUES (7845,'Unimed Nacional');

INSERT INTO PlanoDeSaude (codigo,nome)
VALUES (0001,'SUS');

INSERT INTO Paciente (cpf,nome,genero,data_de_nascimento,peso,altura,sintomas)
VALUES (07199011466,'Luis Felipe de Assis Medeiros', 'masculino','1996-05-26', '93,4', '1,72', 
'Tosse Seca;Febre;Cansaço');

INSERT INTO Hospital (id,nome,localizacao,endereco)
VALUES (10001, 'Rede Sarah de Hospitais de Reabilitação','-15.7975293#-47.8908346','SMHS - Área Especial, Qd 501 - Asa Sul, Brasília - DF');

INSERT INTO Hospital_aceita_plano (id,hospital_id,PlanoDeSaude_codigo)
VALUES (8001,10001,0001);

INSERT INTO Hospital_aceita_plano (id,hospital_id,PlanoDeSaude_codigo)
VALUES (8002,10001,7845);

INSERT INTO Hospital_aceita_plano (id,hospital_id,PlanoDeSaude_codigo)
VALUES (8003,10001,2569);

INSERT INTO Ala (id,urgencia_minima,localizacao,hospital_id)
VALUES (10011, 'baixa','1° andar, setor de quimioterapia', 10001);

INSERT INTO Ala (id,urgencia_minima,localizacao,hospital_id)
VALUES (10021, 'media','2° andar, setor de radiologia', 10001);

INSERT INTO Ala (id,urgencia_minima,localizacao,hospital_id)
VALUES (10031, 'alta','3° andar, setor de Cardiologia', 10001);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10111,1,10011);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10211,1,10011);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10311,1,10011);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10121,1,10021);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10221,1,10021);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10321,1,10021);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10131,1,10031);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10231,1,10031);

INSERT INTO Leito (Numero,disponivel,Ala_id)
VALUES (10331,1,10031);

INSERT INTO Ambulancia (placa,modelo,hospital_id,disponivel)
VALUES ('pww4023','Iveco – Daily',10001,1);

INSERT INTO Tecnico (matricula,nome,hospital_id)
VALUES (1000101, 'João Silveria Cunha', 10001);

INSERT INTO Medico (matricula,nome,especialidade,hospital_id)
VALUES (1000102, 'José Silva Costa', 'Cardiologista', 10001);

INSERT INTO Equipe (id,disponivel,tecnico_matricula,medico_matricula)
VALUES (10001001, 1, 1000101,1000102);
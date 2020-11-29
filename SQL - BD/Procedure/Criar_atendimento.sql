USE `coronahelpy`;
DROP PROCEDURE IF EXISTS `Criar_Atendimento`;

DELIMITER $$
USE `coronahelpy`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Criar_Atendimento`(
	IN paciente_cpf BIGINT,
    IN localizacao_paciente VARCHAR(45),
    IN plano_saude_pacienteCod INT,
    IN Urgencia VARCHAR(45),
    IN email_user VARCHAR(45),
    IN data_inicio DATETIME(6),
    OUT Id_Atendimento INT
    )
BEGIN
	DECLARE leito_numero INT;
    DECLARE Hospital_id INT;
    DECLARE equipe_id INT;
    DECLARE ambulancia_placa VARCHAR(45);
    
    SET Hospital_id = (
		SELECT h.id 
        From Hospital as h
        JOIN Hospital_aceita_plano as hp ON h.id = hp.hospital_id
        JOIN PlanoDeSaude AS ps ON ps.codigo = hp.PlanoDeSaude_codigo
        WHERE (ps.codigo = plano_saude_pacienteCod) LIMIT 1
    ); 
    
    SET leito_numero = ( 
		SELECT l.Numero
		FROM Leito AS l
        JOIN Ala AS a ON a.id = l.Ala_id
		WHERE (l.disponivel = 1 AND Hospital_id = a.hospital_id) LIMIT 1
	);
    
    SET equipe_id = (
		SELECT e.id 
        FROM Medico as m
        JOIN Equipe as e ON m.matricula = e.medico_matricula
        WHERE (e.disponivel = 1) LIMIT 1
    );
    
    SET ambulancia_placa = (
		SELECT a.placa
        FROM Ambulancia as a
        WHERE (a.hospital_id = Hospital_id AND a.disponivel = 1) LIMIT 1
    );
    
    INSERT INTO Atendimento (
        Urgencia,
        data_inicio,
        usuario_email,
        equipe_id,
        paciente_cpf,
        leito_numero,
        ambulancia_placa,
        localizacao_Cod
	)
    VALUES (
		Urgencia,
		data_inicio,
        email_user,
        equipe_id,
        paciente_cpf,
        leito_numero,
        ambulancia_placa,
        localizacao_paciente
	);
    
    UPDATE Ambulancia SET disponivel = 0 WHERE placa = ambulancia_placa;
    
    UPDATE Equipe SET disponivel = 0 WHERE id = equipe_id;
    
    UPDATE Leito SET disponivel = 0 WHERE Numero = leito_numero;
     
    SET Id_Atendimento = LAST_INSERT_ID();
END$$

DELIMITER ;


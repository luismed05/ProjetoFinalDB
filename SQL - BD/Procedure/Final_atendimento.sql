USE `CoronaHelpy`;
DROP PROCEDURE IF EXISTS `final_atendimento`;

DELIMITER $$
USE `CoronaHelpy`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `final_atendimento`(IN atendimento_id INT)
BEGIN
	DECLARE equipe_id INT;
    DECLARE ambulancia_placa VARCHAR(45);
    DECLARE leito_numero INT;
    
    SET equipe_id = ( SELECT e.id FROM equipe AS e INNER JOIN Atendimento AS a ON e.id = a.equipe_id AND a.id = atendimento_id);
    SET ambulancia_placa = ( SELECT a.placa FROM Ambulancia AS a INNER JOIN Atendimento AS att ON a.placa = att.ambulancia_placa AND att.id = atendimento_id);
    SET leito_numero = ( SELECT l.numero FROM Leito AS l INNER JOIN Atendimento AS a ON a.leito_numero = l.numero AND a.id = atendimento_id);
    
    UPDATE Ambulancia SET disponivel = 1 WHERE placa = ambulancia_placa;
     
    UPDATE Equipe SET disponivel = 1 WHERE id = equipe_id;
    
    UPDATE Leito SET disponivel = 1 WHERE Numero = leito_numero;
    
    UPDATE Atendimento set data_fim = NOW() WHERE  Atendimento.id =  atendimento_id;
END$$

DELIMITER ;


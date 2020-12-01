USE `CoronaHelpy`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `show_hospitais` AS
    SELECT 
        `h`.`nome` AS `Nome do Hospital`,
        `h`.`endereco` AS `Endereço`,
        COUNT(`le`.`Numero`) AS `Leitos Disponiveis`
    FROM
        (((`Hospital` `h`)
        JOIN `ala` `a` ON ((`a`.`hospital_id` = `h`.`id`)))
        JOIN `leito` `le` ON ((`le`.`Ala_id` = `a`.`id`)))
    WHERE 
        (`le`.`disponivel` = 1);

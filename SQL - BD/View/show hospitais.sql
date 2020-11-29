USE `coronahelpy`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `show_hospitais` AS
    SELECT 
        `h`.`nome` AS `Nome do Hospital`,
        `l`.`endereço` AS `Endereço`,
        COUNT(`le`.`Numero`) AS `Leitos Disponiveis`
    FROM
        (((`hospital` `h`
        JOIN `localizacao` `l` ON ((`h`.`Localizacao_Cod` = `l`.`longitude_latitude`)))
        JOIN `ala` `a` ON ((`a`.`hospital_id` = `h`.`id`)))
        JOIN `leito` `le` ON ((`le`.`Ala_id` = `a`.`id`)))
    WHERE 
        (`le`.`disponivel` = 1);

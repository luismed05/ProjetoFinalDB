USE `coronahelpy`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `coronahelpy`.`atendimento_info` AS
    SELECT 
        `a`.`id` AS `Codigo do atendimento`,
        `am`.`placa` AS `Placa da Ambulancia`,
        `m`.`nome` AS `Medico Responsavel`,
        `a`.`Urgencia` AS `Urgencia de Atendimento`
    FROM
        (((`coronahelpy`.`atendimento` `a`
        JOIN `coronahelpy`.`ambulancia` `am` ON ((`a`.`ambulancia_placa` = `am`.`placa`)))
        JOIN `coronahelpy`.`equipe` `e` ON ((`a`.`equipe_id` = `e`.`id`)))
        JOIN `coronahelpy`.`medico` `m` ON ((`m`.`matricula` = `e`.`medico_matricula`)));;

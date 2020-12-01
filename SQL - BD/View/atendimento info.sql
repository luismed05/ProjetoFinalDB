USE `CoronaHelpy`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `CoronaHelpy`.`atendimento_info` AS
    SELECT 
        `a`.`id` AS `Codigo_do_atendimento`,
        `am`.`placa` AS `Placa_da_Ambulancia`,
        `m`.`nome` AS `Medico_Responsavel`,
        `a`.`Urgencia` AS `Urgencia_de_Atendimento`
    FROM
        (((`CoronaHelpy`.`Atendimento` `a`
        JOIN `CoronaHelpy`.`Ambulancia` `am` ON ((`a`.`ambulancia_placa` = `am`.`placa`)))
        JOIN `CoronaHelpy`.`Equipe` `e` ON ((`a`.`equipe_id` = `e`.`id`)))
        JOIN `CoronaHelpy`.`Medico` `m` ON ((`m`.`matricula` = `e`.`medico_matricula`)));

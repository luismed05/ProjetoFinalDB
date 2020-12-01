USE `CoronaHelpy`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `CoronaHelpy`.`atendimento_info` AS
    SELECT 
        `a`.`id` AS `Codigo do atendimento`,
        `am`.`placa` AS `Placa da Ambulancia`,
        `m`.`nome` AS `Medico Responsavel`,
        `a`.`Urgencia` AS `Urgencia de Atendimento`
    FROM
        (((`CoronaHelpy`.`Atendimento` `a`
        JOIN `CoronaHelpy`.`Ambulancia` `am` ON ((`a`.`ambulancia_placa` = `am`.`placa`)))
        JOIN `CoronaHelpy`.`Equipe` `e` ON ((`a`.`equipe_id` = `e`.`id`)))
        JOIN `CoronaHelpy`.`Medico` `m` ON ((`m`.`matricula` = `e`.`medico_matricula`)));;

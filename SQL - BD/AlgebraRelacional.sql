use CoronaHelpy;

SELECT nome as 'Nome do Hospital', 
	a.localizacao as 'Setor de localização', 
    l.Numero as 'codigo do leito'
FROM Hospital AS h
JOIN Ala AS a ON h.id = a.hospital_id
JOIN Leito AS l ON a.id = l.Ala_id
WHERE (l.disponivel = 1);

SELECT l.Numero
		FROM Leito AS l
        JOIN Ala AS a ON a.id = l.Ala_id
		WHERE (l.disponivel = 1 AND Hospital_id = a.hospital_id);

SELECT e.id as 'Codigo da Equipe', 
	m.nome as 'Nome do medico Responsavel' 
FROM Hospital AS h
INNER JOIN Medico AS m ON h.id = m.hospital_id
INNER JOIN Equipe AS e ON e.medico_matricula = m.matricula
WHERE (e.disponivel = 1);
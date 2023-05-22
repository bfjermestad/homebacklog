select * from dbo.todolist

CREATE USER webappdbuser WITH PASSWORD='KJHhyuhigy7676798!!'

EXECUTE sp_addrolemember db_datareader, "webappdbuser"
EXECUTE sp_addrolemember db_datawriter, "webappdbuser"

CREATE TABLE todolist
(
    id INT IDENTITY PRIMARY KEY,
    task VARCHAR(255),
    taskdate DATE,
    done BIT
);

SELECT * FROM todolist

INSERT INTO todolist (task, taskdate) VALUES ('Rette opp badedøra, slik at den ikke svinger opp', '2023.01.15')

INSERT INTO todolist (task, taskdate) VALUES ('Lakkere dørtokk verandadør', '2023.01.16')
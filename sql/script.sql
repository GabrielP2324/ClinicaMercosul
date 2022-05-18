-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS clinica;
CREATE DATABASE IF NOT EXISTS clinica DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE clinica;

CREATE TABLE IF NOT EXISTS `clinica`.`cadastro_p` (
  `PaciCod` INT NOT NULL AUTO_INCREMENT,
  `PaciNom` VARCHAR(40) NOT NULL,
  `PaciNum` VARCHAR(13) NOT NULL,
  `PaciEma` VARCHAR(45) NOT NULL,
  `PaciCon` VARCHAR(30) NULL,
  PRIMARY KEY (`PaciCod`));

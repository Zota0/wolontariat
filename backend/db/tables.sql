CREATE DATABASE IF NOT EXISTS Wolontariat;
USE Wolontariat;

CREATE TABLE Users (
	ID INT(6) NULL PRIMARY KEY AUTO_INCREMENT,
	FIRST_NAME VARCHAR(255) NOT NULL,
	LAST_NAME VARCHAR(255) NOT NULL,
	EMAIL VARCHAR(255) NOT NULL,
	PHONE INT(12) NOT NULL
);

CREATE TABLE Messages (
	ID INT(16) NULL PRIMARY KEY AUTO_INCREMENT,
	CONTENT VARCHAR(728) NOT NULL,
	GROUP_ID INT(8) NOT NULL UNIQUE,
	USER_ID INT(6) NULL UNIQUE,
    UPLOADED DATETIME NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE Access (
	USER_ID INT(6) NOT NULL UNIQUE,
	TYPE VARCHAR(1) NULL,
    GROUPS JSON
);

CREATE TABLE Groups (
	ID INT(8) NULL PRIMARY KEY AUTO_INCREMENT,
	GROUP_NAME VARCHAR(255) NULL UNIQUE,
	DESCRIPTION TEXT NULL,
	IMG TEXT NULL
);


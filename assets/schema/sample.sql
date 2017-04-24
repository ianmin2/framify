--- 
-- TABLES
---

-- ADMINS --
DROP TABLE IF EXISTS admins  CASCADE;
CREATE TABLE admins (
    admin_name      varchar(15) PRIMARY KEY NOT NULL,
    password        text NOT NULL,
    telephone       varchar(15) NOT NULL UNIQUE,
    email           varchar(30) NOT NULL UNIQUE,
    added           timestamp DEFAULT CURRENT_TIMESTAMP,
    name            varchar(30) NOT NULL,
    access          smallint DEFAULT 1,
    active          boolean DEFAULT true     
);
INSERT INTO admins (admin_name,password,telephone,email,name,access) VALUES ( 'root',MD5('ianmin2'),'0725678447','ianmin2@live.com','Main Administrator',0);
INSERT INTO admins (admin_name,password,telephone,email,name,access) VALUES ( 'userAdmin',MD5('ianmin2'),'0700000000','useradmin@bixbyte.io','User Affairs Administrator',0);



-- USERS --
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    username        varchar(15) PRIMARY KEY NOT NULL,
    password        text NOT NULL,
    name            varchar(30) NOT NULL,
    email           varchar(30) NOT NULL UNIQUE,
    telephone       varchar(15),
    account_number  varchar(30),
    active          boolean DEFAULT true
);
INSERT INTO users 
(username,password,name,email,telephone) 
VALUES 
('ianmin2',md5('ianmin2'),'Ian Innocent','ianmin2@live.com','0725678447');


-- MEMBER TYPE ENUMERATOR --
DROP TYPE IF EXISTS available_roles CASCADE;
CREATE TYPE available_roles AS ENUM ('admin','audit','client','manager');

-- MEMBERS --
DROP TABLE IF EXISTS members CASCADE;
CREATE TABLE members (
	member_id		bigserial 	    PRIMARY KEY,
	"name.first"    varchar(25) 	NOT NULL,
	"name.last"	    varchar(25),
    "account.name"  varchar(50)     UNIQUE NOT NULL,
    "account.balance" bigint        DEFAULT 0,
	email		    varchar(75) 	UNIQUE NOT NULL,
	password	    text		    NOT NULL,
	role		    available_roles NOT NULL,
	telephone	    varchar(15)	    NOT NULL,
	joined		    timestamp	    DEFAULT CURRENT_TIMESTAMP,
	active 		    boolean 	    DEFAULT true
);

INSERT INTO members 
( "name.first", "name.last","account.name",email, password, role, telephone ) 
VALUES
('User','Administrator','userAdmin','useradmin@bixbyte.io',MD5('bixbyte'),'admin', 0725678447);


-- --
-- AUDIT TABLES
-- --

-- AUD_ADMINS --
DROP TABLE IF EXISTS aud_admins  CASCADE;
CREATE TABLE aud_admins (
    admin_name      varchar(15) NOT NULL,
    password        text NOT NULL,
    telephone       varchar(15) NOT NULL,
    email           varchar(30) NOT NULL,
    added           timestamp DEFAULT CURRENT_TIMESTAMP,
    name            varchar(30) NOT NULL,
    access          smallint DEFAULT 1,
    active          boolean DEFAULT true,
    func            varchar(15)
);

-- AUD_USERS --
DROP TABLE IF EXISTS aud_users CASCADE;
CREATE TABLE aud_users (
    username        varchar(15) NOT NULL,
    password        text NOT NULL,
    name            varchar(30) NOT NULL,
    email           varchar(30) NOT NULL,
    telephone       varchar(15),
    account_number  varchar(30),
    active          boolean DEFAULT true,
    func            varchar(15)
);


-- AUD_MEMBERS --
DROP TABLE IF EXISTS aud_members CASCADE;
CREATE TABLE aud_members (
	member_id		bigserial,
	"name.first"    varchar(25) 	NOT NULL,
	"name.last"	    varchar(25),
    "account.name"  varchar(50),
    "account.balance"  bigint,
	email		    varchar(75)     NOT NULL,
	password	    text		    NOT NULL,
	role		    available_roles NOT NULL,
	telephone	    varchar(15)	    NOT NULL,
	joined		    timestamp	    DEFAULT CURRENT_TIMESTAMP,
	active 		    boolean 	    DEFAULT true,
    func            varchar(15)
);



-- -- 
-- TRIGGER FUNCTIONS
-- --


--- ADMINS
CREATE OR REPLACE FUNCTION audit_admins()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_admins (admin_name,password,telephone,email,added,name,access,active,func) 
        SELECT OLD.admin_name,OLD.password,OLD.telephone,OLD.email,OLD.added,OLD.name,OLD.access,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO aud_admins (admin_name,password,telephone,email,added,name,access,active,func) 
        SELECT NEW.admin_name,NEW.password,NEW.telephone,NEW.email,NEW.added,NEW.name,NEW.access,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_admins (admin_name,password,telephone,email,added,name,access,active,func) 
        SELECT OLD.admin_name,OLD.password,OLD.telephone,OLD.email,OLD.added,OLD.name,OLD.access,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


--- USERS
CREATE OR REPLACE FUNCTION audit_users()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        SELECT OLD.username,OLD.password,OLD.name,OLD.email,OLD.telephone,OLD.account_number,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        -- SELECT NEW.username,NEW.password,NEW.name,NEW.email,NEW.telephone,NEW.account_number,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        SELECT OLD.username,OLD.password,OLD.name,OLD.email,OLD.telephone,OLD.account_number,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


--- MEMBERS
CREATE OR REPLACE FUNCTION audit_members()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_members (member_id	,"name.first","name.last","account.name","account.balance",email,password,role,telephone,joined,active,func) 
        SELECT OLD.member_id,OLD."name.first",OLD."name.last",OLD."account.name",OLD."account.balance",OLD.email,OLD.password,OLD.role,OLD.telephone,OLD.joined,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO aud_members (member_id,"name.first","name.last","account.name","account.balance",email,password,role,telephone,joined,active,func) 
        SELECT NEW.member_id,NEW."name.first",NEW."name.last",NEW."account.name",NEW."account.balance",NEW.email,NEW.password,NEW.role,NEW.telephone,NEW.joined,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_members (member_id	,"name.first","name.last","account.name","account.balance",email,password,role,telephone,joined,active,func) 
        SELECT OLD.member_id,OLD."name.first",OLD."name.last",OLD."account.name",OLD."account.balance",OLD.email,OLD.password,OLD.role,OLD.telephone,OLD.joined,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- --
-- TRIGGERS
-- --

-- ADMINS
CREATE TRIGGER admins_audit BEFORE  UPDATE OR INSERT OR DELETE
   ON admins FOR EACH ROW
   EXECUTE PROCEDURE audit_admins();

-- USERS
CREATE TRIGGER users_audit BEFORE UPDATE OR INSERT OR DELETE
   ON users FOR EACH ROW
   EXECUTE PROCEDURE audit_users();


-- MEMBERS
CREATE TRIGGER members_audit BEFORE UPDATE OR INSERT OR DELETE
   ON members FOR EACH ROW
   EXECUTE PROCEDURE audit_members();

-- --
-- VIEWS --
-- --

-- VW_ADMINS --
DROP VIEW IF EXISTS vw_admins ;
CREATE OR REPLACE VIEW vw_admins AS 
SELECT admin_name,telephone,email,added,name,active,access
FROM admins;


--- VW_USERS ---
DROP VIEW IF EXISTS vw_users;
CREATE OR REPLACE VIEW vw_users AS 
SELECT username,users.name,users.email,users.telephone,account_number, users.active
FROM users;


--- VW_INVALID_USERS ---
DROP VIEW IF EXISTS vw_invalid_users;
CREATE OR REPLACE VIEW vw_invalid_users AS 
SELECT username,users.name,users.email,users.telephone,account_number
FROM users
WHERE users.active = false;


--- VW_MEMBERS ---
DROP VIEW IF EXISTS vw_members;
CREATE OR REPLACE VIEW vw_members AS 
SELECT "name.first","name.last","account.name",email,password,role,telephone,joined,active
FROM members;
--- TYPES
DROP TABLE IF EXISTS types CASCADE;
CREATE TABLE IF NOT EXISTS types (
    type_id      bigserial PRIMARY KEY,
    title        varchar(100) NOT NULL CONSTRAINT unique_type UNIQUE
);
INSERT INTO types (title) VALUES ('Hospital'),('Doctor'),('Dentist');

--- SUB_TYPES
DROP TABLE IF EXISTS sub_types CASCADE;
CREATE TABLE IF NOT EXISTS sub_types (
    sub_type_id      bigserial PRIMARY KEY,
    title            varchar(100) NOT NULL CONSTRAINT unique_sub_type UNIQUE,
    parent           bigint NOT NULL CONSTRAINT valid_parent_type REFERENCES types(type_id)
);
INSERT INTO sub_types(title,parent) VALUES ('Hospital',1),('General Practitioner',2),('Peridontist',3);

--- ENITITIES
DROP TABLE IF EXISTS entities CASCADE;
CREATE TABLE IF NOT EXISTS entities (
    entity_id   bigserial PRIMARY KEY,
    title       varchar(100) NOT NULL,
    type        bigint NOT NULL CONSTRAINT valid_type REFERENCES sub_types(sub_type_id),
    location    varchar(255),
    telephone   varchar(20) CONSTRAINT unique_telephone UNIQUE,
    office      varchar(20),
    landline    varchar(20),
    address     text,
    fax         varchar(100),
    email       varchar(50) CONSTRAINT unique_email UNIQUE,
    web         varchar(100),
    country     smallint DEFAULT '112',
    others      text
);
INSERT INTO entities 
 (title,type,location,telephone,office,landline,address,fax,email,web,others)
 VALUES
 ('Ian Innocent',3,'Chebarbar','0725678447','072345678','','Text Lane Off Limuru Road','','ianmin2@ianmin2.cf','http://ianmin2.cf',''),
 ('Jeremic Hospital',1,'Baraton, Kapsabet','0700100100','','','1 Jeremic Close University of Eastern Africa Baraton','','jeremic@ueab.ac.ke','http://jeremic.ueab.ac.ke',''),
 ('Chemundu Hospital',1,'Chemundu, Kapsabet','0700100101','','','1 Chemundu Drive; Chemundu','','chemundu@ueab.ac.ke','http://ueab.ac.ke/chemundu','');

---  ADMISSION_RIGHTS
DROP TABLE IF EXISTS admission_rights CASCADE;
CREATE TABLE IF NOT EXISTS admission_rights (
    doctor      bigint NOT NULL CONSTRAINT valid_doctor REFERENCES entities(entity_id),
    hospital    bigint NOT NULL CONSTRAINT valid_hospital REFERENCES entities(entity_id),
    note        text
);
INSERT INTO admission_rights 
(doctor,hospital,note)
VALUES 
(1,2,'Ask to see Naani'),
(1,3,'');


-- VIEWS
DROP VIEW IF EXISTS vw_entities CASCADE;
CREATE OR REPLACE VIEW vw_entities AS 
SELECT 
entity_id, entities.title as title,type,location,telephone,office,landline,address,fax,email,web,country,others,
sub_types.title as type_title, 
type_id as super_type, types.title as super_type_title
FROM entities
    LEFT JOIN sub_types
        ON entities.type     = sub_types.sub_type_id
    JOIN types  
        ON sub_types.parent  = types.type_id; 


DROP VIEW IF EXISTS vw_admission_rights CASCADE;
CREATE VIEW vw_admission_rights AS 
SELECT 
admission_rights.doctor,admission_rights.hospital,note
FROM admission_rights 
    INNER JOIN entities
        ON admission_rights.doctor = admission_rights.entity_id;
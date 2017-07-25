-- ORGANIZATIONS --
DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
    org_id          bigserial   PRIMARY KEY,
    org_name        text        NOT NULL CONSTRAINT organization_name_required UNIQUE,
    org_telephone   text        NOT NULL CONSTRAINT organization_telephone_required UNIQUE,
    org_code        varchar(25) NOT NULL CONSTRAINT organization_code_required UNIQUE,
    org_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP,
    org_active      boolean     DEFAULT true
);
INSERT INTO organizations 
( org_name,org_telephone,org_code) 
VALUES
('Bixbyte Solutions Limited','+254725678447','pm_bx_001');


-- AUD_ORGANIZATIONS --
-- DROP TABLE IF EXISTS aud_organizations CASCADE;
CREATE TABLE aud_organizations (
    org_id          bigint      ,
    org_name        text        ,
    org_telephone   text        ,
    org_code        varchar(25) ,
    org_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP,
    org_active      boolean     DEFAULT false,
    func            varchar(15)
);


--- ORGANIZATIONS
CREATE OR REPLACE FUNCTION audit_organizations()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_organizations (org_id,org_name,org_telephone,org_code,org_added,org_active,func) 
        SELECT OLD.org_id,OLD.org_name,OLD.org_telephone,OLD.org_code,OLD.org_added,OLD.org_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_organizations (org_id,org_name,org_telephone,org_code,org_added,org_active,func) 
        -- SELECT NEW.org_id,NEW.org_name,NEW.org_telephone,NEW.org_code,NEW.org_added,NEW.org_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_organizations (org_id,org_name,org_telephone,org_code,org_added,org_active,func) 
        SELECT OLD.org_id,OLD.org_name,OLD.org_telephone,OLD.org_code,OLD.org_added,OLD.org_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- ORGANIZATIONS
CREATE TRIGGER organizations_audit BEFORE UPDATE OR INSERT OR DELETE
   ON organizations FOR EACH ROW
EXECUTE PROCEDURE audit_organizations();

--- ORGANIZATIONS ---
DROP VIEW IF EXISTS vw_organizations;
CREATE OR REPLACE VIEW vw_organizations AS 
SELECT org_id,org_name,org_telephone,org_code,org_added,org_active
FROM organizations;

--==========================================================================================================


-- SERVICES --
DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services (
    service_id      bigserial   PRIMARY KEY,
    service_name    text        CONSTRAINT  unique_service_name_required UNIQUE NOT NULL,
    service_fee     bigint      CONSTRAINT  service_fee_required NOT NULL,
    service_code    text        CONSTRAINT  unique_service_coed_required UNIQUE NOT NULL,
    service_added   TIMESTAMP WITH TIME ZONE    DEFAULT     CURRENT_TIMESTAMP,
    service_active  boolean     DEFAULT     true
);
INSERT INTO services 
(service_name,service_fee,service_code)
VALUES
('TEST SERVICE',0,'BX_SRV_000');

-- AUD_SERVICES --
-- DROP TABLE IF EXISTS aud_services CASCADE;
CREATE TABLE aud_services (
    service_id      bigint      ,
    service_name    text        ,
    service_fee     bigint      ,
    service_code    text        ,
    service_added   TIMESTAMP WITH TIME ZONE    DEFAULT     CURRENT_TIMESTAMP,
    service_active  boolean     DEFAULT     true,
    func            varchar(15)
);


--- SERVICES 
CREATE OR REPLACE FUNCTION audit_services()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        SELECT OLD.service_id,OLD.service_name,OLD.service_fee,OLD.service_code,OLD.service_added,OLD.service_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        -- SELECT NEW.service_id,NEW.service_name,NEW.service_fee,NEW.service_code,NEW.service_added,NEW.service_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_services (service_id,service_name,service_fee,service_code,service_added,service_active,func) 
        SELECT OLD.service_id,OLD.service_name,OLD.service_fee,OLD.service_code,OLD.service_added,OLD.service_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;

-- SERVICES
CREATE TRIGGER services_audit BEFORE UPDATE OR INSERT OR DELETE
   ON services FOR EACH ROW
EXECUTE PROCEDURE audit_services();


--- SERVICES ---
DROP VIEW IF EXISTS vw_services;
CREATE OR REPLACE VIEW vw_services AS 
SELECT service_id,service_name,service_code,service_added,service_active
FROM services;




--==========================================================================================================

-- SUBSCRIPTIONS --
DROP TABLE IF EXISTS subscriptions CASCADE;
CREATE TABLE subscriptions (
    sub_id          bigserial       PRIMARY KEY,
    sub_org         bigint          NOT NULL CONSTRAINT organization_id_required        REFERENCES organizations( org_id ),
    sub_service     bigint          NOT NULL CONSTRAINT service_subscription_required   REFERENCES services( service_id ),
    sub_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    sub_active      boolean         DEFAULT  true
);

-- AUD_SUBSCRIPTIONS --
-- DROP TABLE IF EXISTS aud_subscriptions CASCADE;
CREATE TABLE aud_subscriptions (
    sub_id          bigint          ,
    sub_org         bigint          ,
    sub_service     bigint          ,
    sub_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    sub_active      boolean         DEFAULT  true,
    func            varchar(15)
);


--- SUBSCRIPTIONS
CREATE OR REPLACE FUNCTION audit_subscriptions()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_subscriptions (sub_id,sub_org,sub_service,sub_added,sub_active,func) 
        SELECT OLD.sub_id,OLD.sub_org,OLD.sub_service,OLD.sub_added,OLD.sub_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_subscriptions (sub_id,sub_org,sub_service,sub_added,sub_active,func) 
        -- SELECT NEW.sub_id,NEW.sub_org,NEW.sub_service,NEW.sub_added,NEW.sub_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_subscriptions (sub_id,sub_org,sub_service,sub_added,sub_active,func) 
        SELECT OLD.sub_id,OLD.sub_org,OLD.sub_service,OLD.sub_added,OLD.sub_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- SUBSCRIPTIONS
CREATE TRIGGER subscriptions_audit BEFORE UPDATE OR INSERT OR DELETE
   ON subscriptions FOR EACH ROW
EXECUTE PROCEDURE audit_subscriptions();


--- SUBSCRIPTIONS ---
DROP VIEW IF EXISTS vw_subscriptions;
CREATE OR REPLACE VIEW vw_subscriptions AS 
SELECT sub_id
,sub_org,organizations.org_name as sub_org_name,organizations.org_active
,sub_service,services.service_name as sub_service_name,services.service_active
,sub_added,sub_active
FROM subscriptions
    LEFT JOIN organizations 
        ON subscriptions.sub_org        = organizations.org_id
    LEFT JOIN services
ON subscriptions.sub_service    = services.service_id;

--==========================================================================================================

-- PAYMENT_METHODS --
DROP TABLE IF EXISTS payment_methods CASCADE;
CREATE TABLE payment_methods(
    pay_method_id          bigserial       PRIMARY KEY,
    pay_method_name        varchar(60)     NOT NULL,
    pay_method_fee         bigint          DEFAULT 0,
    pay_method_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    pay_method_active      boolean         DEFAULT true
);

-- AUD_PAYMENT_METHODS --
-- DROP TABLE IF EXISTS aud_payment_methods CASCADE;
CREATE TABLE aud_payment_methods(
    pay_method_id          bigint          ,
    pay_method_name        varchar(60)     ,
    pay_method_fee         bigint          DEFAULT 0,
    pay_method_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    pay_method_active      boolean         DEFAULT true,
    func            varchar(15)
);

--- PAYMENT_METHODS
CREATE OR REPLACE FUNCTION audit_payment_methods()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_payment_methods (pay_method_id,pay_method_name,pay_method_fee,pay_method_added,pay_method_active,func) 
        SELECT OLD.pay_method_id,OLD.pay_method_name,OLD.pay_method_fee,OLD.pay_method_added,OLD.pay_method_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_payment_methods (pay_method_id,pay_method_name,pay_method_fee,pay_method_added,pay_method_active,func) 
        -- SELECT NEW.pay_method_id,NEW.pay_method_name,NEW.pay_method_fee,NEW.pay_method_added,NEW.pay_method_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_payment_methods (pay_method_id,pay_method_name,pay_method_fee,pay_method_added,pay_method_active,func) 
        SELECT OLD.pay_method_id,OLD.pay_method_name,OLD.pay_method_fee,OLD.pay_method_added,OLD.pay_method_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;

-- PAYMENT_METHODS
CREATE TRIGGER payment_methods_audit BEFORE UPDATE OR INSERT OR DELETE
   ON payment_methods FOR EACH ROW
EXECUTE PROCEDURE audit_payment_methods();


--- PAYMENT_METHODS ---
DROP VIEW IF EXISTS vw_payment_methods;
CREATE OR REPLACE VIEW vw_payment_methods AS 
SELECT pay_method_id,pay_method_name,pay_method_fee,pay_method_added,pay_method_active
FROM payment_methods;


--==========================================================================================================

-- PAYMENTS --
DROP TABLE IF EXISTS payments CASCADE;
CREATE TABLE payments (
    pay_id          bigserial       PRIMARY KEY,
    pay_org         bigint          CONSTRAINT valid_organization_required REFERENCES organizations( org_id ),
    pay_amount      bigint          NOT NULL,
    pay_method      bigint          NOT NULL CONSTRAINT valid_pay_method_required REFERENCES payment_methods( pay_method_id ),
    pay_services    json            NOT NULL,
    pay_message     text,
    pay_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    pay_active      boolean         DEFAULT true
);


-- AUD_PAYMENTS --
-- DROP TABLE IF EXISTS aud_payments CASCADE;
CREATE TABLE aud_payments (
    pay_id          bigint       ,
    pay_org         bigint       ,
    pay_amount      bigint       ,
    pay_method      bigint       ,
    pay_services    json         ,
    pay_message     text,
    pay_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    pay_active      boolean,
    func            varchar(15)
);

--- PAYMENTS
CREATE OR REPLACE FUNCTION audit_payments()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_payments (pay_id,pay_org,pay_amount,pay_method,pay_services,pay_message,pay_added,pay_active,func) 
        SELECT OLD.pay_id,OLD.pay_org,OLD.pay_amount,OLD.pay_method,OLD.pay_services,OLD.pay_message,OLD.pay_added,pay_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_payments (pay_id,pay_org,pay_amount,pay_method,pay_services,pay_message,pay_added,pay_active,func) 
        -- SELECT NEW.pay_id,NEW.pay_org,NEW.pay_amount,NEW.pay_method,NEW.pay_services,NEW.pay_message,NEW.pay_added,pay_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_payments (pay_id,pay_org,pay_amount,pay_method,pay_services,pay_message,pay_added,pay_active,func) 
        SELECT OLD.pay_id,OLD.pay_org,OLD.pay_amount,OLD.pay_method,OLD.pay_services,OLD.pay_message,OLD.pay_added,pay_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;

-- PAYMENTS
CREATE TRIGGER payments_audit BEFORE UPDATE OR INSERT OR DELETE
   ON payments FOR EACH ROW
EXECUTE PROCEDURE audit_payments();



--- PAYMENTS ---
DROP VIEW IF EXISTS vw_payments;
CREATE OR REPLACE VIEW vw_payments AS 
SELECT pay_id
,pay_org,organizations.org_name as pay_org_name
,pay_services
,pay_message,pay_added
,pay_method,payment_methods.pay_method_name
,pay_active
FROM payments 
    LEFT JOIN organizations
        ON payments.pay_org    =  organizations.org_id
    LEFT JOIN payment_methods
ON payments.pay_method =  payment_methods.pay_method_id;


--==========================================================================================================


-- MEMBER TYPE ENUMERATOR --
DROP TYPE IF EXISTS available_roles CASCADE;
CREATE TYPE available_roles AS ENUM ('attendant','technician','admin');

-- MEMBERS --
DROP TABLE IF EXISTS members CASCADE;
CREATE TABLE members (
	member_id		bigserial 	    PRIMARY KEY,
	"name.first"    varchar(25) 	NOT NULL,
	"name.last"	    varchar(25),
    "account.name"  varchar(50)     UNIQUE NOT NULL,
    "account.balance" bigint        DEFAULT 0,
    organization    bigint          CONSTRAINT valid_member_organization_required REFERENCES organizations( org_id ),
	email		    varchar(75) 	UNIQUE NOT NULL,
	password	    text		    NOT NULL,
	role		    available_roles NOT NULL,
	telephone	    varchar(15)	    NOT NULL,
	joined		    TIMESTAMP WITH TIME ZONE	    DEFAULT CURRENT_TIMESTAMP,
	active 		    boolean 	    DEFAULT true
);

INSERT INTO members 
( "name.first", "name.last","account.name",email, password, role, telephone ) 
VALUES
('User','Administrator','userAdmin','useradmin@bixbyte.io',MD5('bixbyte'),'admin', 0725678447);


-- AUD_MEMBERS --
-- DROP TABLE IF EXISTS aud_members CASCADE;
CREATE TABLE aud_members (
	member_id		bigint,
	"name.first"    varchar(25) 	,
	"name.last"	    varchar(25),
    "account.name"  varchar(50),
    "account.balance"  bigint,
    organization    bigint,
	email		    varchar(75)     ,
	password	    text		    ,
	role		    available_roles ,
	telephone	    varchar(15)	    ,
	joined		    TIMESTAMP WITH TIME ZONE	    DEFAULT CURRENT_TIMESTAMP,
	active 		    boolean 	    DEFAULT true,
    func            varchar(15)
);


--- MEMBERS
CREATE OR REPLACE FUNCTION audit_members()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_members (member_id,"name.first","name.last","account.name","account.balance",email,password,role,telephone,joined,active,func) 
        SELECT OLD.member_id,OLD."name.first",OLD."name.last",OLD."account.name",OLD."account.balance",OLD.email,OLD.password,OLD.role,OLD.telephone,OLD.joined,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_members (member_id,"name.first","name.last","account.name","account.balance",email,password,role,telephone,joined,active,func) 
        -- SELECT NEW.member_id,NEW."name.first",NEW."name.last",NEW."account.name",NEW."account.balance",NEW.email,NEW.password,NEW.role,NEW.telephone,NEW.joined,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_members (member_id,"name.first","name.last","account.name","account.balance",email,password,role,telephone,joined,active,func) 
        SELECT OLD.member_id,OLD."name.first",OLD."name.last",OLD."account.name",OLD."account.balance",OLD.email,OLD.password,OLD.role,OLD.telephone,OLD.joined,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- MEMBERS
CREATE TRIGGER members_audit BEFORE UPDATE OR INSERT OR DELETE
   ON members FOR EACH ROW
EXECUTE PROCEDURE audit_members();

--- VW_MEMBERS ---
DROP VIEW IF EXISTS vw_members;
CREATE OR REPLACE VIEW vw_members AS 
SELECT "name.first","name.last","account.name",email,password,role,telephone,joined,active
,organization,organizations.org_name as organization_name
FROM members
    LEFT JOIN organizations
ON members.organization = organizations.org_id;
--==========================================================================================================

--- PASSWORD_RECOVERY --
DROP TABLE IF EXISTS password_recovery CASCADE;
CREATE TABLE IF NOT EXISTS password_recovery (
    password_recovery_id                    bigserial PRIMARY KEY
    ,member                                 bigint NOT NULL CONSTRAINT valid_member_required REFERENCES members(member_id)
    ,recovery_key                           text
    ,requested                              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    ,used                                   boolean DEFAULT false
    ,used_at                                TIMESTAMP WITH TIME ZONE
);

--- AUD_PASSWORD_RECOVERY --
DROP TABLE IF EXISTS aud_password_recovery CASCADE;
CREATE TABLE IF NOT EXISTS aud_password_recovery (
    password_recovery_id                    bigint
    ,member                                 bigint
    ,recovery_key                           text
    ,requested                              TIMESTAMP WITH TIME ZONE
    ,used                                   boolean
    ,used_at                                TIMESTAMP WITH TIME ZONE
    ,func                                   varchar(15)
);

--- PASSWORD_RECOVERY TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION audit_password_recovery()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
        SELECT OLD.password_recovery_id,OLD.member,OLD.recovery_key,OLD.requested,OLD.used,OLD.used_at,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
        -- SELECT NEW.password_recovery_id,NEW.member,NEW.recovery_key,NEW.requested,NEW.used,NEW.used_at,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_password_recovery (password_recovery_id,member,recovery_key,requested,used,used_at,func) 
        SELECT OLD.password_recovery_id,OLD.member,OLD.recovery_key,OLD.requested,OLD.used,OLD.used_at,TG_OP;
        NEW.used_at = now();
        NEW.used = true;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- PASSWORD_RECOVERY AUDIT TRIGGER
CREATE TRIGGER password_recovery_audit BEFORE UPDATE OR INSERT OR DELETE
   ON password_recovery FOR EACH ROW
EXECUTE PROCEDURE audit_password_recovery();

-- VW_PASSWORD_RECOVERY
DROP VIEW IF EXISTS vw_password_recovery CASCADE;
CREATE OR REPLACE VIEW vw_password_recovery AS 
SELECT password_recovery_id,recovery_key
,member ,members."name.first" AS member_first_name ,members."name.last" AS member_last_name ,members.telephone AS member_telephone ,members.email AS member_email ,members.role AS member_role
FROM password_recovery
    LEFT JOIN members
        ON password_recovery.member         = members.member_id
WHERE password_recovery.used = false;


--==========================================================================================================
--==========================================================================================================

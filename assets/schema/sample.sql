-- ORGANIZATIONS --
DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
    org_id          bigserial   PRIMARY KEY,
    org_name        text        NOT NULL CONSTRAINT unique_organization_name_required UNIQUE,
    org_telephone   text        NOT NULL CONSTRAINT unique_organization_telephone_required UNIQUE,
    org_email       text        NOT NULL CONSTRAINT unique_organization_email_required UNIQUE,
    org_code        varchar(25) NOT NULL CONSTRAINT unique_organization_code_required UNIQUE,
    org_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP,
    org_active      boolean     DEFAULT true
);
INSERT INTO organizations 
(org_id,org_name,org_telephone,org_email,org_code) 
VALUES
(1,'Bixbyte Solutions','+254725678447','info@bixbyte.io','pm_bx_001');


-- AUD_ORGANIZATIONS --
DROP TABLE IF EXISTS aud_organizations CASCADE;
CREATE TABLE aud_organizations (
    org_id          bigint      ,
    org_name        text        ,
    org_telephone   text        ,
    org_email       text        ,
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
        INSERT INTO aud_organizations (org_id,org_name,org_telephone,org_email,org_code,org_added,org_active,func) 
        SELECT OLD.org_id,OLD.org_name,OLD.org_telephone,OLD.org_email,OLD.org_code,OLD.org_added,OLD.org_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_organizations (org_id,org_name,org_telephone,org_email,org_code,org_added,org_active,func) 
        -- SELECT NEW.org_id,NEW.org_name,NEW.org_telephone,NEW.org_email,NEW.org_code,NEW.org_added,NEW.org_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_organizations (org_id,org_name,org_telephone,org_email,org_code,org_added,org_active,func) 
        SELECT OLD.org_id,OLD.org_name,OLD.org_telephone,OLD.org_email,OLD.org_code,now(),OLD.org_active,TG_OP;
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
DROP VIEW IF EXISTS vw_organizations CASCADE;
CREATE OR REPLACE VIEW vw_organizations AS 
SELECT org_id,org_name,org_telephone,org_email,org_code,org_added,org_active
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
(service_id,service_name,service_fee,service_code)
VALUES
(1,'SMS',0,'BX_SMS');

-- AUD_SERVICES --
DROP TABLE IF EXISTS aud_services CASCADE;
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
DROP VIEW IF EXISTS vw_services CASCADE;
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
INSERT INTO subscriptions
(sub_id,sub_org,sub_service)
VALUES
(1,1,1);

-- AUD_SUBSCRIPTIONS --
DROP TABLE IF EXISTS aud_subscriptions CASCADE;
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
DROP VIEW IF EXISTS vw_subscriptions CASCADE;
CREATE OR REPLACE VIEW vw_subscriptions AS 
SELECT sub_id
,sub_org,organizations.org_name as sub_org_name,organizations.org_active,organizations.org_email AS sub_org_email, organizations.org_telephone AS sub_org_telephone
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
INSERT INTO payment_methods 
(pay_method_id,pay_method_name) 
VALUES 
(1,'Card'),(2,'Mpesa'),(3,'Cash'),(4,'Cheque');


-- AUD_PAYMENT_METHODS --
DROP TABLE IF EXISTS aud_payment_methods CASCADE;
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
DROP VIEW IF EXISTS vw_payment_methods CASCADE;
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
    pay_services    jsonb           NOT NULL,
    pay_token       text            NOT NULL CONSTRAINT token_not_used UNIQUE,
    pay_message     text,
    pay_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    pay_active      boolean         DEFAULT true
);



-- AUD_PAYMENTS --
DROP TABLE IF EXISTS aud_payments CASCADE;
CREATE TABLE aud_payments (
    pay_id          bigint       ,
    pay_org         bigint       ,
    pay_amount      bigint       ,
    pay_method      bigint       ,
    pay_services    json         ,
    pay_token       text,
    pay_message     text,
    pay_added       TIMESTAMP WITH TIME ZONE        DEFAULT CURRENT_TIMESTAMP,
    pay_active      boolean,
    func            varchar(15)
);

--- PAYMENTS
CREATE OR REPLACE FUNCTION audit_payments()
    RETURNS trigger AS
$BODY$
DECLARE 
    _log_balance        bigint;
    _new_balance        bigint;
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_payments (pay_id,pay_org,pay_amount,pay_method,pay_services,pay_token,pay_message,pay_added,pay_active,func) 
        SELECT OLD.pay_id,OLD.pay_org,OLD.pay_amount,OLD.pay_method,OLD.pay_services,OLD.pay_token,OLD.pay_message,OLD.pay_added,OLD.pay_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
           SELECT log_balance INTO _log_balance FROM logs WHERE log_organization = NEW.pay_org ORDER BY log_id DESC;
           
            IF _log_balance IS NULL THEN
               INSERT INTO logs (log_summary,log_organization,log_balance,log_reference) VALUES ( NEW.pay_services,NEW.pay_org, NEW.pay_amount,NEW.pay_id );
            ELSE 
                INSERT INTO logs (log_summary,log_organization,log_balance,log_reference) VALUES ( NEW.pay_services,NEW.pay_org, _log_balance+NEW.pay_amount, NEW.pay_id );
            END IF;
        -- INSERT INTO aud_payments (pay_id,pay_org,pay_amount,pay_method,pay_services,pay_token,pay_message,pay_added,pay_active,func) 
        -- SELECT NEW.pay_id,NEW.pay_org,NEW.pay_amount,NEW.pay_method,NEW.pay_services,NEW.pay_token,NEW.pay_message,NEW.pay_added,NEW.pay_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_payments (pay_id,pay_org,pay_amount,pay_method,pay_services,pay_token,pay_message,pay_added,pay_active,func) 
        SELECT OLD.pay_id,OLD.pay_org,OLD.pay_amount,OLD.pay_method,OLD.pay_services,OLD.pay_token,OLD.pay_message,OLD.pay_added,OLD.pay_active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;

-- PAYMENTS
CREATE TRIGGER payments_audit BEFORE UPDATE OR INSERT OR DELETE
   ON payments FOR EACH ROW
EXECUTE PROCEDURE audit_payments();



--- VW_PAYMENTS ---
DROP VIEW IF EXISTS vw_payments CASCADE;
CREATE OR REPLACE VIEW vw_payments AS 
SELECT pay_id
,pay_org,organizations.org_name as pay_org_name, organizations.org_telephone AS pay_org_telephone, organizations.org_email AS pay_org_email
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
CREATE TYPE available_roles AS ENUM ('audit','client','admin');

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
( member_id,"name.first", "name.last","account.name",email, password, role, telephone,organization ) 
VALUES
(1,'User','Administrator','userAdmin','useradmin@bixbyte.io',MD5('bixbyte'),'admin', 0725678447, 1);


-- AUD_MEMBERS --
DROP TABLE IF EXISTS aud_members CASCADE;
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
SELECT member_id,"name.first","name.last","account.name",email,password,role,telephone,joined,active
,organization,organizations.org_name as organization_name,organizations.org_email AS organization_email,organizations.org_telephone AS organization_telephone
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

-- GROUPS --
DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE groups (
    group_id           bigserial   PRIMARY KEY
    ,group_name        text        NOT NULL CONSTRAINT unique_group_name_required UNIQUE
    ,group_organization bigint     NOT NULL  CONSTRAINT group_organization_reqired REFERENCES organizations(org_id)
    ,group_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    ,group_active      boolean     DEFAULT true
);
INSERT INTO groups 
( group_id,group_name,group_organization) 
VALUES
(1,'Members',1),(2,'Staff',1),(3,'Board Members',1);


-- AUD_GROUPS --
DROP TABLE IF EXISTS aud_groups CASCADE;
CREATE TABLE aud_groups (
    group_id           bigint      
    ,group_name        text   
    ,group_organization bigint     
    ,group_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    ,group_active      boolean     DEFAULT false
    ,func              varchar(15)
);


--- AUDIT_GROUPS
CREATE OR REPLACE FUNCTION audit_groups()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_groups (group_id,group_name,group_organization,group_added,group_active,func) 
        SELECT OLD.group_id,OLD.group_name,OLD.group_organization,OLD.group_added,OLD.group_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_groups (group_id,group_name,group_organization,group_added,group_active,func) 
        -- SELECT NEW.group_id,NEW.group_name,NEW.group_organization,NEW.group_added,NEW.group_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_groups (group_id,group_name,group_organization,group_added,group_active,func) 
        SELECT OLD.group_id,OLD.group_name,OLD.group_organization,OLD.group_added,OLD.group_active,TG_OP;
        NEW.group_added=now();
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- GROUPS_AUDIT
CREATE TRIGGER groups_audit BEFORE UPDATE OR INSERT OR DELETE
   ON groups FOR EACH ROW
EXECUTE PROCEDURE audit_groups();

--- VW_GROUPS ---
DROP VIEW IF EXISTS vw_groups CASCADE;
CREATE OR REPLACE VIEW vw_groups AS 
SELECT group_id,group_name,group_added,group_active
,group_organization ,organizations.org_name AS group_organization_name ,organizations.org_telephone AS group_organization_telephone ,organizations.org_email AS group_organization_email, organizations.org_active AS group_organization_active
FROM groups
    LEFT JOIN organizations 
        ON groups.group_organization  = organizations.org_id;


--==========================================================================================================

-- GROUP_MEMBERS --
DROP TABLE IF EXISTS group_members CASCADE;
CREATE TABLE group_members (
    mem_id              bigserial   PRIMARY KEY
    ,mem_name           varchar(55)        
    ,mem_user           text
    ,mem_phone          text  CONSTRAINT group_member_phone_required NOT NULL
    ,mem_email          varchar(50) -- CONSTRAINT group_member_email_required NOT NULL
    ,mem_group          bigint  NOT NULL  CONSTRAINT mem_group_reqired REFERENCES groups(group_id)
    ,mem_added          TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    ,mem_active         boolean     DEFAULT true
    -- ,CONSTRAINT unique_user_per_group UNIQUE(mem_user,mem_group)
    ,CONSTRAINT unique_email_per_group UNIQUE(mem_email,mem_group)
    ,CONSTRAINT unique_telephone_per_group UNIQUE(mem_phone,mem_group)
);
INSERT INTO group_members
( mem_id,mem_name,mem_group,mem_phone,mem_email,mem_user) 
VALUES
(1,'Ian Innocent',1,'0725678447','ianmin2@live.com','ianmin2');


-- AUD_GROUP_MEMBERS --
DROP TABLE IF EXISTS aud_group_members CASCADE;
CREATE TABLE aud_group_members (
    mem_id              bigint
    ,mem_name           varchar(55)        
    ,mem_user           text
    ,mem_phone          text -- CONSTRAINT group_member_phone_required NOT NULL
    ,mem_email          varchar(50) -- CONSTRAINT group_member_email_required NOT NULL
    ,mem_group          bigint
    ,mem_added          TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    ,mem_active         boolean    DEFAULT true
    ,func              varchar(15)
);

--- AUDIT_GROUP_MEMBERS
CREATE OR REPLACE FUNCTION audit_group_members()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_group_members (mem_id,mem_name,mem_user,mem_phone,mem_email,mem_group,mem_added,mem_active,func) 
        SELECT OLD.mem_id,OLD.mem_name,OLD.mem_user,OLD.mem_phone,OLD.mem_email,OLD.mem_group,OLD.mem_added,OLD.mem_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_group_members (mem_id,mem_name,mem_user,mem_phone,mem_email,mem_group,mem_added,mem_active,func) 
        -- SELECT NEW.mem_id,NEW.mem_name,NEW.mem_user,NEW.mem_phone,NEW.mem_email,NEW.mem_group,NEW.mem_added,NEW.mem_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_group_members (mem_id,mem_name,mem_user,mem_phone,mem_email,mem_group,mem_added,mem_active,func) 
        SELECT OLD.mem_id,OLD.mem_name,OLD.mem_user,OLD.mem_phone,OLD.mem_email,OLD.mem_group,OLD.mem_added,OLD.mem_active,TG_OP;
        NEW.mem_added = now();
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- GROUP_MEMBERS_AUDIT
CREATE TRIGGER group_members_audit BEFORE UPDATE OR INSERT OR DELETE
   ON group_members FOR EACH ROW
EXECUTE PROCEDURE audit_group_members();

--- VW_GROUP_MEMBERS ---
DROP VIEW IF EXISTS vw_group_members CASCADE;
CREATE OR REPLACE VIEW vw_group_members AS 
SELECT mem_id,mem_name,mem_user,mem_phone,mem_email,mem_added,mem_active
,mem_group ,groups.group_name AS mem_group_name ,groups.group_organization AS mem_organization
,organizations.org_name AS mem_organization_name ,organizations.org_telephone AS mem_organization_telephone ,organizations.org_email AS mem_organization_email, organizations.org_active AS mem_organization_active
FROM group_members
    LEFT JOIN groups 
        ON group_members.mem_group              = groups.group_id
    LEFT JOIN organizations 
        ON groups.group_organization            = organizations.org_id;


--- VW_GROUPED_MEMBERS ---
DROP VIEW IF EXISTS vw_grouped_members CASCADE;
CREATE OR REPLACE VIEW vw_grouped_members AS 
SELECT mem_group_name AS group_name, min(mem_group) AS group,  string_agg(mem_phone,',') AS group_members
FROM vw_group_members
WHERE       mem_active                  = true
AND         mem_organization_active     = true
GROUP BY    mem_group_name;


--==========================================================================================================


-- TEMPLATES --
DROP TABLE IF EXISTS templates CASCADE;
CREATE TABLE templates (
    t_id           bigserial   PRIMARY KEY
    ,t_name        text        NOT NULL CONSTRAINT unique_template_name_required UNIQUE
    ,t_organization bigint     NOT NULL CONSTRAINT valid_template_organization_reqired REFERENCES organizations(org_id)
    ,t_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    ,t_active      boolean     DEFAULT true
);

INSERT INTO templates
(t_id,t_name,t_organization)
VALUES 
(0,'The main bulk sms template  is this',1)
,(1,'This is but a sample SMS template. Edit me as you see fit',1);


-- AUD_TEMPLATES --
DROP TABLE IF EXISTS aud_templates CASCADE;
CREATE TABLE aud_templates (
    t_id           bigint      
    ,t_name        text   
    ,t_organization bigint     
    ,t_added       TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    ,t_active      boolean     DEFAULT false
    ,func              varchar(15)
);


--- AUDIT_TEMPLATES
CREATE OR REPLACE FUNCTION audit_templates()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_templates (t_id,t_name,t_organization,t_added,t_active,func) 
        SELECT OLD.t_id,OLD.t_name,OLD.t_organization,OLD.t_added,OLD.t_active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_templates (t_id,t_name,t_organization,t_added,t_active,func) 
        -- SELECT NEW.t_id,NEW.t_name,NEW.t_organization,NEW.t_added,NEW.t_active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_templates (t_id,t_name,t_organization,t_added,t_active,func) 
        SELECT OLD.t_id,OLD.t_name,OLD.t_organization,OLD.t_added,OLD.t_active,TG_OP;
        NEW.t_added = now();
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- TEMPLATES_AUDIT
CREATE TRIGGER templates_audit BEFORE UPDATE OR INSERT OR DELETE
   ON templates FOR EACH ROW
EXECUTE PROCEDURE audit_templates();

--- VW_TEMPLATES ---
DROP VIEW IF EXISTS vw_templates CASCADE;
CREATE OR REPLACE VIEW vw_templates AS 
SELECT t_id,t_name,t_added,t_active
,t_organization ,organizations.org_name AS t_organization_name ,organizations.org_telephone AS t_organization_telephone ,organizations.org_email AS organization_email, organizations.org_active AS t_organization_active
FROM templates
    LEFT JOIN organizations 
        ON templates.t_organization  = organizations.org_id;


--==========================================================================================================

-- LOGS --
DROP TABLE IF EXISTS logs;
CREATE TABLE logs (
    log_id              bigserial   PRIMARY KEY
    ,log_summary        jsonb
    ,log_organization   bigint  CONSTRAINT valid_organization_required REFERENCES organizations(org_id)
    ,log_reference      bigint  NOT NULL
    ,log_time           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    ,log_balance        bigint DEFAULT 0
);

-- AUD_LOGS --
DROP TABLE IF EXISTS aud_logs;
CREATE TABLE aud_logs (
    log_id              bigint
    ,log_summary        jsonb
    ,log_organization   bigint
    ,log_reference      bigint
    ,log_time           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    ,log_balance        bigint DEFAULT 0
);

--- AUDIT_LOGS
CREATE OR REPLACE FUNCTION audit_logs()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_logs (log_id,log_summary,log_organization,log_reference,log_time,log_balance,func) 
        SELECT OLD.log_id,OLD.log_summary,OLD.log_organization,OLD.log_reference,OLD.log_time,OLD.log_balance,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_logs (log_id,log_summary,log_organization,log_reference,log_time,log_balance,func) 
        -- SELECT NEW.log_id,NEW.log_summary,NEW.log_organization,NEW.log_reference,NEW.log_time,NEW.log_balance,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_logs (log_id,log_summary,log_organization,log_reference,log_time,log_balance,func) 
        SELECT OLD.log_id,OLD.log_summary,OLD.log_organization,OLD.log_reference,OLD.log_time,OLD.log_balance,TG_OP;
        NEW.log_time = now();
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- LOGS_AUDIT
CREATE TRIGGER logs_audit BEFORE UPDATE OR INSERT OR DELETE
   ON logs FOR EACH ROW
EXECUTE PROCEDURE audit_logs();

-- VW_LOGS --
DROP VIEW IF EXISTS vw_logs CASCADE;
CREATE OR REPLACE VIEW vw_logs AS 
SELECT log_id,log_summary,log_time,log_balance
,log_organization ,organizations.org_name AS log_organization_name ,organizations.org_telephone AS log_organization_telephone ,organizations.org_email AS organization_email, organizations.org_active AS log_organization_active
,log_reference
FROM logs
    LEFT JOIN organizations 
        ON logs.log_organization  = organizations.org_id
;


INSERT INTO payments 
(pay_id,pay_org,pay_amount,pay_method,pay_services,pay_message,pay_token)
VALUES
(1,1,10,1,'{"payments": [{"services":[1]}]}','10 Complementary SMS messages','bixbyte');

--==========================================================================================================
--==========================================================================================================
--==========================================================================================================

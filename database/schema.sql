CREATE TABLE `companies` (
  `id` CHAR(36) PRIMARY KEY NOT NULL,
  `cnpj` CHAR(14) NOT NULL UNIQUE,
  `responsible_cpf` CHAR(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `mobile_phone` VARCHAR(20),
  `email` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER `before_insert_companies` BEFORE INSERT ON `companies`
FOR EACH ROW
SET NEW.id = IFNULL(NULLIF(NEW.id, ''), UUID());

CREATE TABLE `company_addresses` (
  `id` CHAR(36) PRIMARY KEY NOT NULL,
  `company_id` CHAR(36) NOT NULL UNIQUE,
  `postal_code` CHAR(8) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `number` VARCHAR(10) NOT NULL,
  `complement` VARCHAR(255),
  `neighborhood` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `state` CHAR(2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
);

CREATE TRIGGER `before_insert_company_addresses` BEFORE INSERT ON `company_addresses`
FOR EACH ROW
SET NEW.id = IFNULL(NULLIF(NEW.id, ''), UUID());

CREATE TABLE `company_profiles` (
  `id` CHAR(36) PRIMARY KEY NOT NULL,
  `profile_category` ENUM('seller', 'buyer') NOT NULL, 
  `company_id` CHAR(36) NOT NULL UNIQUE,
  `terms_accepted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
);

CREATE TRIGGER `before_insert_company_profiles` BEFORE INSERT ON `company_profiles`
FOR EACH ROW
SET NEW.id = IFNULL(NULLIF(NEW.id, ''), UUID());

CREATE INDEX `idx_companies_name` ON `companies`(`name`);
CREATE INDEX `idx_companies_email` ON `companies`(`email`);
CREATE INDEX `idx_company_addresses_company_id` ON `company_addresses`(`company_id`);
CREATE INDEX `idx_company_addresses_postal_code` ON `company_addresses`(`postal_code`);
CREATE INDEX `idx_company_profiles_company_id` ON `company_profiles`(`company_id`);

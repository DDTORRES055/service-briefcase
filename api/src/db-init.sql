USE railway;

CREATE TABLE statuses (
  status_id INT(11) NOT NULL AUTO_INCREMENT,
  status_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (status_id)
);

CREATE TABLE departments (
  department_id INT(11) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  department_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (department_id)
);

CREATE TABLE environments (
  environment_id INT(11) NOT NULL AUTO_INCREMENT,
  environment_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (environment_id)
);

CREATE TABLE supporter_types (
  supporter_type_id INT(11) NOT NULL AUTO_INCREMENT,
  supporter_type_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (supporter_type_id)
);

CREATE TABLE supporters (
  supporter_id INT(11) NOT NULL AUTO_INCREMENT,
  supporter_type_id INT(11) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (supporter_id),
  FOREIGN KEY (supporter_type_id) REFERENCES supporter_types (supporter_type_id)
);

CREATE TABLE teams (
  team_id INT(11) NOT NULL,
  team_name VARCHAR(50) NOT NULL,
  team_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (team_id),
  FOREIGN KEY (team_id) REFERENCES supporters (supporter_id)
);

CREATE TABLE providers (
  provider_id INT(11) NOT NULL,
  provider_name VARCHAR(50) NOT NULL,
  provider_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (provider_id),
  FOREIGN KEY (provider_id) REFERENCES supporters (supporter_id)
);

CREATE TABLE hardware (
  hardware_id INT(11) NOT NULL AUTO_INCREMENT,
  hardware_name VARCHAR(50) NOT NULL,
  cpu_frecuency DECIMAL(8,4) NOT NULL,
  cpu_architecture VARCHAR(50) NOT NULL,
  cpu_cores INT(11) NOT NULL,
  ram_size INT(11) NOT NULL,
  storage_size INT(11) NOT NULL,
  ssd BOOLEAN NOT NULL,
  provider_id INT(11),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (hardware_id),
  FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE dbms (
  dbms_id INT(11) NOT NULL AUTO_INCREMENT,
  dbms_name VARCHAR(50) NOT NULL,
  dbms_version VARCHAR(20) NOT NULL,
  provider_id INT(11),

  PRIMARY KEY (dbms_id),
  FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE software (
  software_id INT(11) NOT NULL AUTO_INCREMENT,
  software_name VARCHAR(50) NOT NULL,
  software_version VARCHAR(20) NOT NULL,
  provider_id INT(11),

  PRIMARY KEY (software_id),
  FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE applications (
  application_id INT(11) NOT NULL AUTO_INCREMENT,
  application_name VARCHAR(50) NOT NULL,
  application_version VARCHAR(20) NOT NULL,
  provider_id INT(11),

  PRIMARY KEY (application_id),
  FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE network_components (
  network_component_id INT(11) NOT NULL AUTO_INCREMENT,
  network_component_name VARCHAR(50) NOT NULL,
  network_component_version VARCHAR(20) NOT NULL,
  provider_id INT(11),

  PRIMARY KEY (network_component_id),
  FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE networks (
  network_id INT(11) NOT NULL AUTO_INCREMENT,
  network_name VARCHAR(50) NOT NULL,
  provider_id INT(11),

  PRIMARY KEY (network_id),
  FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE network_component_assignations (
  network_component_id INT(11) NOT NULL,
  network_id INT(11) NOT NULL,

  PRIMARY KEY (network_component_id, network_id),
  FOREIGN KEY (network_component_id) REFERENCES network_components (network_component_id),
  FOREIGN KEY (network_id) REFERENCES networks (network_id)
);

CREATE TABLE services (
  service_id INT(11) NOT NULL AUTO_INCREMENT,
  service_name VARCHAR(50) NOT NULL,
  status_id INT(11) NOT NULL,
  owner_id INT(11) NOT NULL,
  environment_id INT(11) NOT NULL,
  hardware_id INT(11),
  dbms_id INT(11),
  software_id INT(11),
  application_id INT(11),
  service_data VARCHAR(100),
  service_sla BLOB NOT NULL,
  service_ola BLOB NOT NULL,
  service_sac BLOB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (service_id),
  FOREIGN KEY (status_id) REFERENCES statuses (status_id),
  FOREIGN KEY (owner_id) REFERENCES departments (department_id),
  FOREIGN KEY (environment_id) REFERENCES environments (environment_id),
  FOREIGN KEY (hardware_id) REFERENCES hardware (hardware_id),
  FOREIGN KEY (dbms_id) REFERENCES dbms (dbms_id),
  FOREIGN KEY (software_id) REFERENCES software (software_id),
  FOREIGN KEY (application_id) REFERENCES applications (application_id)
);

CREATE TABLE support_assignations (
  supporter_id INT(11) NOT NULL,
  service_id INT(11) NOT NULL,

  PRIMARY KEY (supporter_id, service_id),
  FOREIGN KEY (supporter_id) REFERENCES supporters (supporter_id),
  FOREIGN KEY (service_id) REFERENCES services (service_id)
);

CREATE TABLE network_assignations (
  network_id INT(11) NOT NULL,
  service_id INT(11) NOT NULL,

  PRIMARY KEY (network_id, service_id),
  FOREIGN KEY (network_id) REFERENCES networks (network_id),
  FOREIGN KEY (service_id) REFERENCES services (service_id)
);

CREATE TABLE service_users (
  service_id INT(11) NOT NULL,
  department_id INT(11) NOT NULL,

  PRIMARY KEY (service_id, department_id),
  FOREIGN KEY (service_id) REFERENCES services (service_id),
  FOREIGN KEY (department_id) REFERENCES departments (department_id)
);

CREATE TABLE users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_email VARCHAR(50) NOT NULL,

  PRIMARY KEY (user_id)
);

INSERT INTO statuses (status_name) VALUES ('En requerimientos');
INSERT INTO statuses (status_name) VALUES ('Definido');
INSERT INTO statuses (status_name) VALUES ('Analizado');
INSERT INTO statuses (status_name) VALUES ('Aprobado');
INSERT INTO statuses (status_name) VALUES ('Contratado');
INSERT INTO statuses (status_name) VALUES ('Diseñado');
INSERT INTO statuses (status_name) VALUES ('Desarrollado');
INSERT INTO statuses (status_name) VALUES ('Construido');
INSERT INTO statuses (status_name) VALUES ('Probado');
INSERT INTO statuses (status_name) VALUES ('Desplegado');
INSERT INTO statuses (status_name) VALUES ('En operación');
INSERT INTO statuses (status_name) VALUES ('Retirado');

INSERT INTO supporter_types (supporter_type_name) VALUES ('Equipo');
INSERT INTO supporter_types (supporter_type_name) VALUES ('Proveedor');

INSERT INTO environments (environment_name) VALUES ('Desarrollo');
INSERT INTO environments (environment_name) VALUES ('Pruebas');
INSERT INTO environments (environment_name) VALUES ('Producción');
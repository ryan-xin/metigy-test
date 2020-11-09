-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 27, 2019 at 01:14 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.19

SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = '+00:0';

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


-- Database: 'metigy_test' ---------------------

CREATE DATABASE IF NOT EXISTS metigy_test;
GRANT ALL PRIVILEGES on metigy_test.*
TO 'metigy'@'%'
WITH GRANT OPTION;

USE metigy_test

-- Table structure for table 'Keyword'

CREATE TABLE IF NOT EXISTS Keyword (
  id int(255) NOT NULL,
  word varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Keyword (id, word) VALUES
(1, 'Shoes'),
(2, 'Shoes carnival'),
(3, 'Shoes palace'),
(4, 'Shoes stores near me'),
(5, 'Shoes for crew'),
(6, 'Shoes station'),
(7, 'Shoes repair'),
(8, 'Shoes store'),
(9, 'Shoes for women'),
(10, 'Shoes fashion week'),
(11, 'Shoes instagram'),
(12, 'Shoes stories'),
(13, 'Shoes show');

ALTER TABLE Keyword
  ADD PRIMARY KEY (id);

ALTER TABLE Keyword
  MODIFY id int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

-- Table structure for table 'Site' ---------------------

CREATE TABLE IF NOT EXISTS Site (
  id int(255) NOT NULL,
  url varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Site (id, url) VALUES
(1, 'www.dockers.com'),
(2, 'www.adidas.com'),
(3, 'www.nike.com'),
(4, 'www.underarmour.com'),
(5, 'www.newbalance.com'),
(6, 'www.puma.com'),
(7, 'www.prada.com'),
(8, 'www.fredperry.com'),
(9, 'www.caterpillar.com'),
(10, 'www.gucci.com'),
(11, 'www.allenedmonds.com'),
(12, 'www.brunomagli.com'),
(13, 'www.diesel.com');

ALTER TABLE Site
  ADD PRIMARY KEY (id);

ALTER TABLE Site
  MODIFY id int (255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

-- Table structure for table 'Setting' ---------------------

CREATE TABLE IF NOT EXISTS Setting (
  id int(255) NOT NULL,
  data JSON
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Setting (id, data) VALUES
(1, '{
  "browsers": {
    "chrome": false,
    "firefox": false,
    "explorer": true,
    "safari": false,
    "opera": false,
    "incognito": true
  },
  "inputs": {
    "wait_seconds_1": 40,
    "wait_seconds_2": 55,
    "visit_within_site": true,
    "page_numbers": 1,
    "page_visit_seconds_1": 30,
    "page_visit_seconds_2": 50,
    "after_operation_wait_seconds_1": 5,
    "after_operation_wait_seconds_2": 10,
    "target_sites": 10,
    "target_site_wait_minutes": 20,
    "auto_reset_times": 1
  },
  "devices": {
    "device_reset": false,
    "vinn_reset": false,
    "phone_reset": true,
    "mobile_data": true,
    "fly_mode": false
  },
  "options": {
    "remove_cookies": true,
    "change_resolution": false,
    "mouse_tracks": false,
    "data_saving_mode": true,
    "random_generate": false,
    "analytics_protection": true,
    "remove_history": false
  }
}');

ALTER TABLE Setting
  ADD PRIMARY KEY (id);

ALTER TABLE Setting
  MODIFY id int (255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
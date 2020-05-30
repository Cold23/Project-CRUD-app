CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `card_id` int NOT NULL,
  `points` int DEFAULT '0',
  `first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street_number` smallint DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` int DEFAULT NULL,
  `birth_date` date DEFAULT '0000-00-00',
  `married` tinyint DEFAULT '0',
  `children` tinyint DEFAULT '0',
  `pets` tinyint DEFAULT '0',
  PRIMARY KEY (`card_id`),
  KEY `birtd_date_idx` (`birth_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (0,12342,'Baka','Mueller','et',634,'New Kaneshire','New Hamphsire',66624,'1993-02-06',1,13,1),(1,83780,'Zack','Ratke','natus',7664,'North Syble','Louisiana',86892,'1978-06-10',1,13,0),(2,56971,'Rubie','Murazik','atque',50,'East Merritt','Virginia',83008,'2006-01-01',0,9,0),(3,298,'Kaleb','Kutch','nihil',32767,'Trantowshire','Maine',47217,'1972-03-26',1,19,0),(4,62181,'Annabel','Cummerata','explicabo',32767,'Davisshire','District of Columbia',3102,'2001-10-07',1,8,1),(5,1234,'Jack','Hanma','AB',23,'EZ','ETH',15147,'1990-07-07',0,0,1),(6,85195,'Margie','Olson','sed',6261,'North Wendellshire','Mississippi',36394,'1999-11-21',0,0,1),(7,93845,'Miles','Volkman','laudantium',7207,'North Scottiefurt','Illinois',24648,'1996-07-17',0,18,0),(8,17916,'Roma','Beatty','dolorem',32767,'Derricktown','Arkansas',32100,'2018-02-16',0,16,1),(9,10558,'Jessyca','Williamson','harum',6,'North Heberport','Kentucky',18965,'1996-06-16',0,8,1),(10,57947,'Alexys','Wiegand','itaque',27,'South Freida','Indiana',82193,'2009-03-01',1,6,1),(11,82273,'Cara','Haley','perferendis',32767,'Colechester','Delaware',21808,'1979-01-01',1,16,1),(12,11172,'Yasmin','Gibson','quae',0,'Douglasburgh','California',24773,'2003-02-25',1,16,0),(13,51589,'Sasha','Medhurst','dolores',3347,'Ziemeview','Maryland',13818,'1994-05-16',0,3,0),(14,38758,'Marjorie','Sipes','ut',3340,'North Laron','Nebraska',59749,'1988-10-26',0,14,0),(15,30669,'Marley','Zemlak','qui',32767,'Lake Davestad','Oklahoma',20559,'1977-07-27',0,3,0),(16,54407,'Brandon','Wyman','voluptas',32767,'Noemyhaven','Montana',90029,'2002-02-07',0,3,1),(17,85662,'Daphne','Bergstrom','nemo',0,'Garrymouth','Oklahoma',98510,'2013-05-29',0,0,0),(18,57558,'Guy','Kertzmann','ullam',0,'North Humberto','Montana',4478,'1980-02-19',1,5,0),(19,72806,'Gage','Halvorson','rerum',8,'O\'Connellville','Indiana',11287,'2018-08-17',1,9,0),(20,36068,'Anabelle','King','et',32767,'New Peytonton','Indiana',62247,'2013-04-24',0,6,1),(21,43943,'Arlo','Barton','non',32767,'Gleasonhaven','Alabama',96316,'2011-03-29',1,20,0),(22,5149,'Sedrick','Boyer','voluptate',23,'South Maximillianborough','Texas',27495,'1976-10-28',0,4,0),(23,11014,'Kiarra','Ledner','itaque',214,'Muellershire','Washington',65273,'1970-07-12',0,15,0),(24,479,'Merle','Powlowski','mollitia',5392,'Lake Ginochester','Colorado',80676,'1997-12-14',1,1,1),(25,79492,'Deondre','Thompson','explicabo',32767,'Bergstrommouth','Wyoming',1266,'2010-11-30',0,20,1),(26,14834,'Liza','Anderson','minima',32767,'East Alexandra','Montana',96821,'1974-10-09',0,3,1),(27,11625,'Sienna','Shields','sint',6,'North Belle','Arizona',67967,'2014-09-18',1,5,1),(28,55020,'Dale','Wilderman','repellendus',2947,'Goyetteport','Idaho',80024,'1972-10-15',1,0,0),(29,43657,'Troy','Dicki','neque',2,'Jadenport','Arkansas',89418,'2003-09-23',1,20,1),(30,88472,'Selina','Heller','sit',32767,'West Santina','Hawaii',17304,'1976-12-15',0,12,0),(31,92127,'Noemy','Bosco','ut',5377,'South Earlinetown','Kentucky',14499,'2012-04-08',1,4,1),(32,93852,'German','Schultz','ducimus',2,'East Simeon','Nevada',33052,'2000-10-14',1,7,1),(33,76768,'Bettie','Harber','non',0,'Paucekmouth','Virginia',49177,'1984-01-14',1,7,1),(34,87271,'Dax','O\'Conner','ipsa',25990,'Vladimirberg','Missouri',71080,'2015-09-13',0,13,1),(35,27859,'Donna','Lind','sapiente',38,'New Rainaberg','Missouri',54287,'1996-07-04',0,1,0),(36,82452,'Audreanne','Huels','consequuntur',64,'New Hollyborough','NewJersey',62107,'2005-04-26',1,8,0),(37,90161,'Doris','Veum','nam',32767,'New Alanis','Utah',7037,'1988-04-28',1,7,0),(38,48225,'Shirley','Romaguera','consequatur',0,'Steubershire','Mississippi',61011,'2019-06-13',0,5,0),(39,40992,'Dejah','Torphy','atque',32767,'Howellshire','Indiana',42048,'2009-08-26',1,3,0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-30 17:42:00

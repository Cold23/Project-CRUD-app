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
-- Table structure for table `supermarkets`
--

DROP TABLE IF EXISTS `supermarkets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supermarkets` (
  `id` int NOT NULL,
  `square_meters` int DEFAULT '0',
  `days_open` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'everyday',
  `times` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '00:00-00:00',
  `street_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street_number` smallint DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` int DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `supermarket_id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarkets`
--

LOCK TABLES `supermarkets` WRITE;
/*!40000 ALTER TABLE `supermarkets` DISABLE KEYS */;
INSERT INTO `supermarkets` VALUES (2,245,'everyday','08:00-21:00','Fuga non deleniti.',57,'Andreanestad','Maine',92996,1463139784),(3,123,'everyday','08:00-21:00','Tsoukalele',346,'uganda','Africa',34600,22213654866),(6,102,'daily','08:00-21:00','Cum ut quo odio.',62,'North Icie','Oklahoma',87438,1591426593),(8,381,'daily','08:00-21:00','Akualo De Pringle',90,'Susiemouth','NewJersey',15122,2105426987),(13,145,'everyday','08:00-21:00','Possum',34,'Sugarland','Austin',15122,21054639874),(14,255,'dailysaturday','08:00-21:00','Sugarland',198,'Austin','Texas',15122,9653217484),(16,457,'dailyandsaturaday','08:00-21:00','Animi repellat quia.',10,'Faheyton','Virginia',36042,1450925389),(17,746,'dailyandsaturaday','08:00-21:00','Enim ad velit.',66,'Declanchester','Minnesota',65404,1681407848),(19,440,'daily','08:00-21:00','Ut et quisquam.',71,'Swaniawskitown','NewMexico',96854,1028011930),(20,107,'everyday','08:00-21:00','Ut ipsam hic quis.',43,'East Reidside','Hawaii',61284,1411349470),(22,912,'everyday','08:00-21:00','Cumque similique.',61,'Cummingsside','Maine',69764,1920197315),(23,245,'daily','08:00-21:00','oij ouk anak',34,'oij','akata',11512,23333),(24,267,'everyday','08:00-21:00','Sapiente earum.',10,'Bradlytown','Oregon',15667,1903540356),(26,520,'everyday','08:00-21:00','Non nam rem nam est.',94,'Lolitamouth','Idaho',57779,1734184449);
/*!40000 ALTER TABLE `supermarkets` ENABLE KEYS */;
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

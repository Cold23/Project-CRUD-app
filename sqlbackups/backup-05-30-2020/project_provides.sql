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
-- Table structure for table `provides`
--

DROP TABLE IF EXISTS `provides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provides` (
  `store_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`store_id`,`category_id`),
  UNIQUE KEY `Unique` (`store_id`,`category_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id_fk_provides` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `store_id_fk_provides` FOREIGN KEY (`store_id`) REFERENCES `supermarkets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provides`
--

LOCK TABLES `provides` WRITE;
/*!40000 ALTER TABLE `provides` DISABLE KEYS */;
INSERT INTO `provides` VALUES (2,0),(3,0),(6,0),(8,0),(13,0),(14,0),(16,0),(17,0),(19,0),(20,0),(22,0),(23,0),(24,0),(26,0),(2,1),(3,1),(6,1),(8,1),(13,1),(14,1),(16,1),(17,1),(19,1),(20,1),(22,1),(23,1),(24,1),(26,1),(2,2),(3,2),(6,2),(8,2),(13,2),(14,2),(16,2),(17,2),(19,2),(20,2),(22,2),(23,2),(24,2),(26,2),(2,3),(3,3),(6,3),(8,3),(13,3),(14,3),(16,3),(17,3),(19,3),(20,3),(22,3),(23,3),(24,3),(26,3),(2,4),(3,4),(6,4),(8,4),(13,4),(14,4),(16,4),(17,4),(19,4),(20,4),(22,4),(23,4),(24,4),(26,4),(2,5),(3,5),(6,5),(8,5),(13,5),(14,5),(16,5),(17,5),(19,5),(20,5),(22,5),(23,5),(24,5),(26,5);
/*!40000 ALTER TABLE `provides` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-30 17:42:01

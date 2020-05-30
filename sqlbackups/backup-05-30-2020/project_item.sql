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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Barcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int DEFAULT NULL,
  `signature_item` tinyint DEFAULT '0',
  `current_price` float DEFAULT NULL,
  PRIMARY KEY (`Barcode`),
  KEY `category_id_idx` (`category_id`) /*!80000 INVISIBLE */,
  KEY `singature_idx` (`signature_item`),
  CONSTRAINT `category_fk_item` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES ('RandomItemName','002652773',5,1,87.65),('4c5ba88b','005499124',2,0,61.61),('53c823ba','005666342',4,1,2.21),('096ac5f3','006400954',3,0,31.71),('22c355a8','008392650',5,0,97.83),('testnameoo99','009996609',1,0,5.32),('656309ac','031118566',3,0,35.85),('Makaronoturo','036904572',1,1,45),('d8c99a69','037639676',1,1,99.58),('Makaronokimaturo','048370428',0,1,23.12),('68875a39','055134808',1,1,36.14),('bda40651','055493685',0,1,86.87),('6f8550de','056231385',3,1,65.33),('bf6dc9d3','061299599',3,0,26.02),('4b40b6c0','065361062',2,1,62.13),('8040328e','066790483',5,1,58.64),('94a032f9','071234814',5,0,16.17),('976327d7','084701003',4,0,17.26),('3ee6668b','084771590',1,1,72.75),('ceda6317','098764800',2,0,37.42),('1be6a82c','107525059',5,0,12.66),('testname','119217710',0,0,72.5),('ee962f48','134474971',5,1,42.76),('b54df792','134889514',4,0,5.94),('77699985','139375749',4,0,49.11),('53a301e9','157926444',3,1,8.28),('3fdc5e17','158283846',4,0,71.57),('9bbc811d','164296593',2,0,16.57),('9066c232','169165199',3,1,70.08),('f78fa17b','178191875',2,0,33.06),('ba5a41fc','184362631',5,0,55.79),('3c2cb0aa','189831806',1,1,0.05),('28f6de70','193066153',0,0,15.13),('7e139c66','201029065',2,0,78.67),('9e9dc24f','201213256',3,0,79.22),('a6ffe692','204463191',5,0,73.1),('ffacf5c5','208925700',4,0,70.07),('70659de9','209669373',5,0,49.94),('3bcb306b','216263427',1,0,89.68),('ffceed02','225584755',1,0,71.62),('b7473c2a','231882891',5,0,73.56),('311bb361','233875714',1,0,94.86),('7ca83c9f','234594998',0,1,61.61),('111d1af7','238903937',0,0,38.92),('d77a83d4','241611596',0,0,68.04),('aeeca732','248101425',2,1,62.74),('27015ed4','248487285',1,1,63.27),('db1c033f','249377237',1,1,26.92),('2cea0b03','252905289',4,0,94.97),('4dac007f','261424165',5,0,74.54),('17303ab2','265730275',2,0,46.06),('4781a651','267197813',5,1,28.69),('9ed3756b','280198860',1,0,92.95),('0e4beb67','280500368',0,0,99.87),('fd932feb','283528929',1,1,5.7),('7a706295','283609503',5,0,1.12),('1db9fd4b','287157769',1,0,25.99),('85048a98','291274969',0,0,65.96),('f91982c6','298479518',2,0,66.54),('2f406c3f','302879993',1,0,35.81),('af2e2fdf','326305135',0,0,19.91),('5d0ba160','330085030',0,0,48.01),('d5c3dfe8','376561556',1,0,56.59),('fd003c5e','380985208',1,0,65.61),('a5cd80c4','396539472',0,0,91.75),('47b75e22','406270368',2,0,78.64),('3da5a0b1','416156097',4,1,12.97),('d013fd4c','418223108',3,0,46.02),('8fd8c7a9','430301187',0,0,29.34),('20ef8d12','431199250',1,0,25.06),('877db9bf','456073283',0,1,58.84),('0b86e5e7','457169995',1,0,68.71),('f731152f','458822391',5,1,82.56),('0e9a6ef0','469226948',1,1,14.98),('e6eede84','478349069',5,0,99.32),('18f18590','486267334',4,0,44.2),('15a723b7','486459501',3,0,37.42),('be876b68','504940651',0,0,99.78),('2f5a8317','505107726',3,0,97.54),('01a61abf','520665628',0,1,27.89),('4cd0fb30','524035300',2,0,40.62),('8178c062','545322544',1,0,39.03),('f41b1bb1','547878485',4,1,52.33),('a6fd7a6d','547919357',0,0,95.44),('ff2283dd','572971346',5,1,95.41),('90067645','573486699',4,0,12.32),('b001cd85','575755309',2,1,96.99),('9bb37c6c','577556219',2,0,76.48),('c390fb26','584616019',5,1,14.86),('58c41c92','587993087',3,0,94.19),('6b34527e','592102591',5,0,32.78),('3ba3e07c','601419281',0,0,22.26),('7f84a88a','605369373',2,0,26.7),('b5a7238a','607726716',0,0,85.95),('bf9819d4','609446507',0,0,28.85),('31773d86','611383602',5,1,17.41),('4fe5cca2','624615547',0,0,34.5),('92e82abd','642819006',2,1,58.41),('f8b3b932','647157984',5,1,11.93),('ecc15885','674568436',0,0,81.07),('efb10cdc','676699560',5,0,87.28),('a195607e','680640505',1,1,75.55),('824130da','687381982',2,0,11.19),('e79f96f4','691272540',5,0,60.44),('3872e58b','702632046',5,0,1.73),('9d40e628','709916670',2,1,18.91),('c3f694c7','717651307',2,0,49.38),('29ca8e12','720640810',2,0,91.06),('2087f50a','722345523',5,0,97.68),('8871d9a2','724144589',0,0,55.53),('6384f1bf','728508341',2,0,2.01),('e589616d','730544483',3,0,40.55),('cad2c9fc','737214189',1,0,86.73),('2b4cc87e','739707132',0,0,4),('97043e61','740577074',2,1,13.95),('5df046bf','777375977',1,0,72.86),('2cc863ac','779135891',1,0,84.09),('54d6cb85','779846644',0,0,67.62),('27cc8e23','783460026',5,0,34.49),('bf923f1d','795120598',3,0,69.53),('63b12080','799580586',0,0,82.1),('e4971161','801818241',3,1,9.54),('fc249172','828927742',5,0,71.55),('cd6939f7','835135470',5,1,60.58),('bd69922e','849866024',0,0,81.57),('3f8d7b04','856116961',2,0,83.12),('89463cda','857669280',1,0,46.91),('d24b5b13','885181140',1,0,47.83),('4fec80f3','896531472',2,0,92.01),('0d80491f','897949103',1,0,50.25),('d55d811c','904725006',4,0,81.59),('d577a47f','905524391',4,0,16.41),('1b420bd6','909338593',0,1,74.27),('0856aa98','916062683',2,1,77.15),('91c9d79a','920057796',0,0,92.34),('fc63c93a','924515166',1,1,34.43),('c644cb50','927263424',3,0,68.84),('94f17ba4','936204092',2,0,0.3),('0da7f372','946876533',5,1,46.98),('ebf231a0','953679781',3,1,98.6),('4037956e','964622134',0,0,52.43),('b6c34b4a','970998188',3,0,23.25),('1b8dc4bb','976797521',3,1,44.26),('f0682ef1','977715212',4,1,95.46),('f22c9f26','983834414',5,1,44.41),('27b4f20d','984651727',0,0,93.89),('bdb50218','988989417',5,0,93.28),('c5471e94','991628649',2,0,26.02),('8a2ca2ba','999980890',0,0,93.67);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ItemPriceUpdate` BEFORE UPDATE ON `item` FOR EACH ROW IF NEW.current_price != OLD.current_price && NEW.current_price >= 0 THEN
INSERT INTO price_change(date,barcode,old_price,new_price) VALUES (CURRENT_TIMESTAMP,NEW.Barcode,OLD.current_price,NEW.current_price);
ELSEIF NEW.current_price < 0 THEN
SET NEW.current_price = 0;
IF OLD.current_price != 0 THEN
INSERT INTO price_change(date,barcode,old_price,new_price) VALUES (CURRENT_TIMESTAMP,NEW.Barcode,OLD.current_price,0);
END IF;
END IF */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ItemCatChange` AFTER UPDATE ON `item` FOR EACH ROW IF NEW.category_id != OLD.category_id THEN
DELETE FROM provides WHERE (SELECT COUNT(i.category_id) FROM item as i, carries as c WHERE provides.category_id = category_id && c.barcode = i.Barcode && provides.store_id = c.store_id) = 0;
END IF */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ItemCatChange2` AFTER UPDATE ON `item` FOR EACH ROW IF NEW.category_id != OLD.category_id THEN
INSERT INTO provides(store_id,category_id) SELECT DISTINCT s.id,NEW.category_id FROM supermarkets AS s, carries AS c WHERE c.barcode = NEW.Barcode && c.store_id = s.id && NOT EXISTS(SELECT * FROM provides AS a WHERE a.store_id = s.id && a.category_id = NEW.category_id);
END IF */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-30 17:42:01

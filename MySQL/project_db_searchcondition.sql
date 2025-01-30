-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 183.105.171.41    Database: project_db
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `searchcondition`
--

DROP TABLE IF EXISTS `searchcondition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searchcondition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nation` varchar(100) DEFAULT NULL,
  `startYear` varchar(10) DEFAULT NULL,
  `endYear` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `actor` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `totalMovies` int(11) DEFAULT '0',
  `uniqueMovies` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searchcondition`
--

LOCK TABLES `searchcondition` WRITE;
/*!40000 ALTER TABLE `searchcondition` DISABLE KEYS */;
INSERT INTO `searchcondition` VALUES (1,'대한민국','2023','2025','','','','2025-01-26 20:47:21',1351,1220),(2,'대한민국','2015','2017','','','','2025-01-27 00:38:29',1873,1808),(3,'프랑스','2015','2017','','','','2025-01-27 00:40:34',353,298),(4,'대한민국','2024','2024','','','','2025-01-27 10:39:43',660,591),(5,'','2020','2024','','이병헌','','2025-01-27 11:38:07',8,5),(6,'대한민국','2014','2016','','','','2025-01-29 03:52:04',1798,1727);
/*!40000 ALTER TABLE `searchcondition` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-30 11:30:22

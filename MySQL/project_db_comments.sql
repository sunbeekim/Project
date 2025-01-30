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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boardId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `forename` varchar(100) NOT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parentId` int(11) DEFAULT NULL,
  `depth` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comment_board` (`boardId`),
  KEY `fk_comment_user` (`userId`),
  KEY `fk_comment_parent` (`parentId`),
  CONSTRAINT `fk_comment_board` FOREIGN KEY (`boardId`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_parent` FOREIGN KEY (`parentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`userId`) REFERENCES `users_login` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (13,28,'test','전우치, OST 이름을 모르는데, 얼쑤얼쑤! 도사란 무엇인가? 도사란~ 이 부분 좋았음','sgasg','2025-01-19 18:50:37','2025-01-19 18:50:37',NULL,0),(22,27,'test','tdstds','sgasg','2025-01-23 19:47:17','2025-01-23 19:47:17',NULL,0),(23,28,'aaaa','tdsts','test','2025-01-23 19:48:54','2025-01-23 19:48:54',13,1),(24,27,'aaaa','fgdsfs','test','2025-01-23 19:49:02','2025-01-23 19:49:02',22,1),(25,28,'test2','hello, world!','바보','2025-01-24 10:43:18','2025-01-24 10:43:18',23,2),(26,28,'test','dsfd','sgasg','2025-01-24 10:46:36','2025-01-24 10:46:36',25,3),(27,28,'aaaa','hi, hadoop','test','2025-01-24 10:54:23','2025-01-24 10:54:23',25,3),(28,28,'aaaa','전자기파 = 빛 = 광자, 저궤도 위성과 중궤도 위성의 지연율의 차이는?','test','2025-01-24 10:55:17','2025-01-24 10:55:17',NULL,0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-30 11:30:23

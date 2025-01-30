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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boardId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `forename` varchar(100) NOT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_board_user` (`boardId`),
  CONSTRAINT `fk_board_user` FOREIGN KEY (`boardId`) REFERENCES `users_login` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (10,'test','최고의 반전 영화 TOP 5, 당신의 선택은?','반전 있는 영화만큼 충격과 재미를 주는 작품이 있을까요? 제가 뽑은 TOP 5는 [영화 제목]인데, 여러분의 리스트는 어떤가요? 함께 토론해봐요!','sgasg','2025-01-17 17:56:15',3),(11,'test','2025년 개봉 예정인 대작 영화, 가장 기대되는 작품은?','2025년에는 정말 많은 대작들이 기다리고 있죠! 특히 [영화 제목]은 벌써 예고편만으로도 화제가 되고 있는데요. 여러분이 가장 기대하는 영화는 무엇인가요?','sgasg','2025-01-17 17:56:36',5),(12,'test','최악의 영화 관람 경험, 이런 일도 있었나요?','영화는 좋은데 관람 환경 때문에 망쳤던 경험, 다들 한 번쯤 있으시죠? 제 경우는 [에피소드]였습니다. 여러분은 어떠셨나요?','sgasg','2025-01-17 17:56:58',3),(27,'test','가장 감동적인 영화 엔딩, 당신의 선택은?','감동적인 엔딩은 영화의 전체를 다시 보게 만듭니다. 저에게는 [영화 제목]의 엔딩이 가장 기억에 남는데, 여러분은 어떤 영화의 엔딩이 감동적이었나요?','sgasg','2025-01-17 18:02:01',7),(28,'test','OST가 더 유명해진 영화들, 당신의 최애는?','영화를 기억하게 만드는 OST들, 정말 많죠. 특히 [영화 제목]의 [곡 제목]은 지금도 들으면 감동적입니다. 여러분의 최애 OST는 무엇인가요?','sgasg','2025-01-17 18:02:20',23);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
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

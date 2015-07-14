-- phpMyAdmin SQL Dump
-- version 4.4.11
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 14 Juillet 2015 à 21:06
-- Version du serveur :  10.0.20-MariaDB-log
-- Version de PHP :  5.6.11

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `cartographies`
--

-- --------------------------------------------------------

--
-- Structure de la table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `about` text COLLATE utf8_bin
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `author`
--

INSERT INTO `author` (`id`, `name`, `email`, `about`) VALUES
(1, 'Noora Fangel-Gustavson', '', '[Laboratoire de Phonétique et Phonologie](http://lpp.in2p3.fr/?lang=fr)'),
(2, 'Gilles Authier', NULL, 'INALCO'),
(3, 'Paulette Roulon-Doko', NULL, 'LLACAN'),
(4, 'Valentin Vydrin', NULL, 'LLACAN'),
(5, 'Samia Naim', NULL, 'LACITO'),
(6, 'Jean-Michel Hoppan', NULL, 'SeDyL, CELIA'),
(7, 'Sevrine Guillaume', 'guillaume@vjf.cnrs.fr', NULL),
(8, 'Guillaume Segerere', NULL, 'LLACAN'),
(9, 'Bernard Caron', NULL, 'LLACAN'),
(10, 'Lisa Brunetti', NULL, 'Université de Lyon'),
(11, 'Nicolas Qint', NULL, 'LLACAN'),
(12, 'Anaïd Donabedian', NULL, 'INALCO'),
(13, 'Patrick Caudal', NULL, 'LLF, Université Paris 7');

-- --------------------------------------------------------

--
-- Structure de la table `language`
--

DROP TABLE IF EXISTS `language`;
CREATE TABLE IF NOT EXISTS `language` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `glottonym` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `family` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `position` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `content` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `language`
--

INSERT INTO `language` (`id`, `name`, `glottonym`, `family`, `country`, `position`, `content`) VALUES
(1, 'Saami de Lule', NULL, NULL, NULL, NULL, 'Ressources en ligne :\r\n\r\n* [Nuoraj TV](https://www.youtube.com/channel/UClOQ9tyGfUrHauclHDezq8A)\r\n* [Saami culture](http://www.visitnordkyn.com/)'),
(2, 'Ghul', NULL, NULL, NULL, NULL, ''),
(3, 'Avar', NULL, NULL, NULL, NULL, ''),
(4, 'Budugh', NULL, NULL, NULL, NULL, ''),
(5, 'Dargi', NULL, NULL, NULL, NULL, ''),
(6, 'Hinuq', NULL, NULL, NULL, NULL, ''),
(7, 'Kryz', NULL, NULL, NULL, NULL, ''),
(8, 'Kubachi', NULL, NULL, NULL, NULL, ''),
(9, 'Lak', NULL, NULL, NULL, NULL, ''),
(10, 'Lezgi', NULL, NULL, NULL, NULL, ''),
(11, 'Rutul', NULL, NULL, NULL, NULL, ''),
(12, 'Tabasaran', NULL, NULL, NULL, NULL, ''),
(13, 'Tchétchène', NULL, NULL, NULL, NULL, ''),
(14, 'Tindi', NULL, NULL, NULL, NULL, ''),
(15, 'Tsakhur', NULL, NULL, NULL, NULL, ''),
(16, 'Tsez', NULL, NULL, NULL, NULL, ''),
(17, 'Udi', NULL, NULL, NULL, NULL, ''),
(18, 'Gbaya', NULL, NULL, NULL, NULL, 'Ressources :\r\n\r\n * Virelangues (conscience phonologique à partir des jeux de mots)\r\n * Vidéos: les paroles du soufflet de forge (comptes)\r\n * Canal U\r\n * Livre didactique pour enfants: le sillabaire'),
(19, 'Bambara', NULL, NULL, NULL, NULL, 'Ressources :\r\n\r\n * Dictionnaire en ligne\r\n * Corpus éléctronique de textes (presse, littérature orale, légale)\r\n * Google corpus bambara reference\r\n * Griots, bardes, tradition orale, épique\r\n * Photos et vidéos de la fête de publication du dictionnaire\r\n * Concordancier, dictionnaire'),
(20, 'Malinke', NULL, NULL, NULL, NULL, ''),
(21, 'Dan', NULL, NULL, NULL, NULL, '* Vidéos sur les tons (langue championne du monde en tons) '),
(22, 'Goo', NULL, NULL, NULL, NULL, 'Nouvelle langue: on vient de la découvrir, compréhensible avec les langues voisines, mais système phonologique pas de tout semblable aux voisins, culture propre, ses locuteurs la considère comme une lange différente, Côte d''Ivoire, Guinée\r\n'),
(23, 'NKO', NULL, NULL, NULL, NULL, '* Livres pour enfants'),
(24, 'Arabe yemenite', NULL, NULL, NULL, NULL, '* étude sur la maison yemenite (préposition spatiales) '),
(25, 'Maya préhispanique', NULL, NULL, NULL, NULL, '* images de gliphes maya avec commentaires '),
(26, 'Hausa', NULL, NULL, NULL, NULL, ''),
(27, 'Zaa', NULL, NULL, NULL, NULL, ''),
(28, 'Pidgin naja', NULL, NULL, NULL, NULL, ''),
(29, 'Catalan', NULL, NULL, NULL, NULL, 'Analyse des structures syntaxiques dans les trois langues à partir des descriptions orales alignées des locuteurs qui décrivent la même histoire d''une grenouille\r\n'),
(30, 'Espagnol', NULL, NULL, NULL, NULL, 'Analyse des structures syntaxiques dans les trois langues à partir des descriptions orales alignées des locuteurs qui décrivent la même histoire d''une grenouille'),
(31, 'Italien', NULL, NULL, NULL, NULL, 'Analyse des structures syntaxiques dans les trois langues à partir des descriptions orales alignées des locuteurs qui décrivent la même histoire d''une grenouille'),
(32, 'Koalib', NULL, NULL, NULL, NULL, ''),
(33, 'Casamançais', NULL, NULL, NULL, NULL, ''),
(34, 'Capverdien', NULL, NULL, NULL, NULL, ''),
(35, 'Occitan', NULL, NULL, NULL, NULL, ''),
(36, 'Arménien', NULL, NULL, NULL, NULL, ''),
(37, 'Iwaidja', NULL, NULL, 'Australie', NULL, ''),
(38, 'Mawng', NULL, NULL, 'Australie', NULL, ''),
(39, 'Gunwinggu', NULL, NULL, 'Australie', NULL, '');

-- --------------------------------------------------------

--
-- Structure de la table `language_author`
--

DROP TABLE IF EXISTS `language_author`;
CREATE TABLE IF NOT EXISTS `language_author` (
  `author_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `language_author`
--

INSERT INTO `language_author` (`author_id`, `language_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),
(3, 18),
(4, 19),
(4, 20),
(4, 21),
(4, 22),
(4, 23),
(5, 24),
(6, 25),
(9, 26),
(9, 27),
(9, 28),
(10, 29),
(10, 30),
(10, 31),
(11, 32),
(11, 33),
(11, 34),
(11, 35),
(12, 36),
(13, 37),
(13, 38),
(13, 39);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `language_author`
--
ALTER TABLE `language_author`
  ADD PRIMARY KEY (`author_id`,`language_id`),
  ADD KEY `fk_language_id` (`language_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `language_author`
--
ALTER TABLE `language_author`
  ADD CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

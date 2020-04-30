-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2018 at 12:17 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fbchat2`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `conversation_id` int(11) NOT NULL,
  `user_one` int(11) NOT NULL,
  `user_two` int(11) NOT NULL,
  `notification_sender` int(1) NOT NULL,
  `notification_receiver` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`conversation_id`, `user_one`, `user_two`, `notification_sender`, `notification_receiver`) VALUES
(1, 1, 4, 0, 0),
(2, 1, 3, 0, 0),
(3, 1, 2, 0, 0),
(4, 1, 5, 0, 1),
(5, 5, 6, 0, 1),
(6, 6, 1, 0, 0),
(7, 3, 2, 0, 0),
(8, 2, 4, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `user_from` int(11) NOT NULL,
  `user_to` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `user_from`, `user_to`, `message`) VALUES
(1, 2, 1, 3, 'Hello Tom!'),
(2, 3, 1, 2, 'Hi Spencer!'),
(3, 4, 1, 5, 'Hi William'),
(4, 5, 5, 6, 'Hi Yusreen!'),
(5, 4, 5, 1, 'Hi John!'),
(6, 2, 1, 3, 'Hey Tom!'),
(7, 7, 3, 2, 'Hi Spencer!'),
(8, 8, 2, 4, 'Hello Manish.'),
(9, 8, 2, 4, 'hola');

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reminder_hour` int(2) NOT NULL,
  `reminder_minute` int(2) NOT NULL,
  `reminder_date` varchar(10) NOT NULL,
  `reminder_desc` text NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`id`, `user_id`, `reminder_hour`, `reminder_minute`, `reminder_date`, `reminder_desc`, `title`) VALUES
(3, 1, 12, 25, '2018-11-23', 'asdfgh', 'Remind Me'),
(4, 1, 12, 15, '2018-11-23', 'example', 'Exam[le');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `img`) VALUES
(1, 'john', 'cc03e747a6afbbcbf8be7668acfebee5', 'img/dp-1.jpg'),
(2, 'spencer', 'cc03e747a6afbbcbf8be7668acfebee5', 'img/dp-2.jpg'),
(3, 'thomas', 'cc03e747a6afbbcbf8be7668acfebee5', 'img/dp-3.jpg'),
(4, 'manish', 'cc03e747a6afbbcbf8be7668acfebee5', 'img/dp-4.jpg'),
(5, 'william', 'cc03e747a6afbbcbf8be7668acfebee5', 'img/dp-5.jpg'),
(6, 'yusreen', 'cc03e747a6afbbcbf8be7668acfebee5', 'img/dp-6.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`conversation_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

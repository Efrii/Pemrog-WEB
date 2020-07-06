-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2020 at 03:15 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `starbucks`
--

-- --------------------------------------------------------

--
-- Table structure for table `kritik`
--

CREATE TABLE `kritik` (
  `nama` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `jenis` varchar(25) NOT NULL,
  `kritik` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kritik`
--

INSERT INTO `kritik` (`nama`, `email`, `jenis`, `kritik`) VALUES
('asdjn', 'annab1718@hotmail.com', 'Minuman', 'nbjhj'),
('Dwi', 'Budi@hma', 'enak', 'enak banget'),
('rangga', 'Efrnak@dsfsd', 'sdfsdf', 'sdfsdfsfsdfsfd');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(15) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jenis` varchar(25) NOT NULL,
  `harga` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama`, `jenis`, `harga`) VALUES
(1, 'Coffe', 'Minuman', '31.000'),
(2, 'Caffe Latte', 'Minuman', '44.000'),
(3, 'Dumb Iced Coffee', 'Minuman', '50.000'),
(4, 'Iced Americano', 'Minuman', '66.000'),
(5, 'Es Jeruk', 'Minuman', '10.000');

-- --------------------------------------------------------

--
-- Table structure for table `promo_harian`
--

CREATE TABLE `promo_harian` (
  `id` int(15) NOT NULL,
  `promo` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo_harian`
--

INSERT INTO `promo_harian` (`id`, `promo`) VALUES
(1, 'Promo Hari ini Berupa Beli satu geratis 100 cok');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `nim` int(15) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tugas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`nim`, `nama`, `tugas`) VALUES
(2388, 'Teguh Efriyanto', 'Backend Developer '),
(2402, 'Gilang Anugerah Multi 1', 'Frontend Developer'),
(2407, 'Dimas Pramana', 'Frontend Developer'),
(2426, 'Najibul Wahid kontol', 'Frontend Developer'),
(2442, 'Tatak Goresta Putra Nanda', 'Backend Developer'),
(2451, 'Ardiyanto Saputra', 'Backend Developer');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `password`) VALUES
(1, 'pw', 'TeguhEfriyano@asd.com', 'pw'),
(200, 'efri', 'efriyanto@efri.com', 'efri');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kritik`
--
ALTER TABLE `kritik`
  ADD PRIMARY KEY (`nama`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promo_harian`
--
ALTER TABLE `promo_harian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`nim`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

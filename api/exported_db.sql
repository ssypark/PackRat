-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 31, 2025 at 06:37 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `packrat`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(7) DEFAULT '#ffffff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `color`) VALUES
(1, 'Cycling', '#AEC8E0'),
(2, 'Paint', '#DBB1CF'),
(3, 'Fishing', '#BDD9A7');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image_filename` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `description`, `image_filename`, `category_id`) VALUES
(1, 'MIPS Bike Helmet', 'Freetown Gear and Gravel Lumiere Adult Helmet with MIPS Safety System', '1743402069021.webp', 1),
(3, 'Redington Chromer', ' Size: 11\'6\" 8wt 4pc Fly Rod.\r\nThe new CHROMER rods are the ultimate tool for the two-handed angler. With refined rod actions to suit a variety of casting and line styles, the rods also feature custom polymer gripping sections on the top and bottom handles. These unique pinch grip sections allow for easy running line management during spey casts and added comfort over a long day of fishing. With both switch and spey models, Redington offer a size for just about any salmon or steelhead fishing scenario.', 'rod.jpg', 3),
(5, 'TPU Inner Tubes', '650b x 38mm tubes\r\nQTY:2 ', '1743136492315.png', 1),
(7, 'Lamson Liquid 7+', 'Format: Large Arbor\r\nMaterials: Pressure Cast Aluminum Frame and Spool\r\nFinish: Polyurethane Case and Spool\r\nDrag: Sealed Conical Drag System', '1743144968426.jpg', 3),
(8, 'Acrylic - Titanium White', 'Golden 0001380-3 5oz. Heavy Body Acrylic Paint - Titanium White by Golden Artist Colors', '1743145143557.jpg', 2),
(9, 'Mixing Set', 'Golden Artist Colors, Fluid Acrylics, 10-Color Mixing Set, 0000928-0\r\nCONTENTS: Ten colors in 1 fl. oz. / 30ml Bottles (Benzimidazolone Yellow Light, Benzimidazolone Yellow Medium, Naphthol Red Light, Quinacridone Magenta, Phthalo Blue (Red Shade), Phthalo Blue (Green Shade), Phthalo Green (Blue Shade), Phthalo Green (Yellow Shade), Carbon Black*, and Titanium White).', '1743145227786.jpg', 2),
(10, 'Painting Palette', 'Martin U-BR6000 Large Clear French Style Acrylic Painting Palette', '1743145290877.jpg', 2),
(11, 'Canvas - 24x36', '2 pack of white canvas panels for painting projects, or hangable artwork. The quality 24 x 36 inch stretched canvases for painting can be used with watercolor, oil, acrylic, or tempera paint to create a work of art', '1743145408845.jpeg', 2),
(12, 'Canvas - 24x48', 'Blick Premier Heavyweight Cotton Canvas is made from professional-grade, archival-quality 100% cotton duck. This canvas is triple-primed with acid-free Titanium gesso to reach a 20 oz finished weight. - Blick Premier Heavyweight Stretched Cotton Canvas - 24\" x 48\", 1-3/8\" ProfileBlick Premier Heavy Duty Canvas, 24X48 1.375IN', '1743145508929.jpeg', 2),
(13, 'Super Black India Ink', 'Size: 2oz\r\nMade from highly opaque, carbon black pigment, this ink offers excellent reproduction quality on absorbent surfaces with optimum lightfastness. Easily applied by pen, brush, steel brush or airbrush, Speedball’s India Ink is free-flowing, non-clogging and waterproof. ', '1743147053839.jpg', 2),
(14, 'Steelhead Stinger Fly', 'Hand tied.', '1743145642624.jpg', 3),
(15, 'Shooting Head - Skagit', 'A “hybrid” head, the Rage bridges the gap between Skagit and Scandi heads. Its thick tip and aggressive taper turn over any leader/fly combination imaginable. Available in sizes to suit trout spey on up to heavy 8 weights. Features Power Core and printed, color-coded welded loops for easy line identification.', '1743145706636.jpg', 3),
(16, 'Ridge Running Line', 'AIRFLO SUPERFLO RIDGE 2.0 RUNNING LINE', '1743145776430.jpg', 3),
(17, 'Seagar Flourocarbon Line - 20lb Test', '20 LB TEST\r\nFluorocarbon leader material delivers incredible abrasion resistance and maximum impact and knot strength, all with a smaller line diameter than monofilament. ', '1743145883502.jpg', 3),
(18, 'Sink Tip - T-11', '10 FT sink tip. Repaired Oct 2024', '1743145959780.jpg', 3),
(19, 'Podium Chill 24Oz', 'Lost my other bottle, need to buy another! RIP', '1743146130960.jpg', 1),
(20, 'WT06S Light Set', '100 lumens bike headlight can be used as a warning light for daytime riding or as auxiliary lighting for nighttime riding. 120 lumens high-brightness bike tail light can better ensure your night riding safety, and the discovery distance of up to 1000m. Both the headlight and taillight have 5 adjustable light modes, which can meet your various riding needs (Modes: High light, Medium light, Slow Flash light, Rhythm Flash light, ECO Flash light).', '1743146415922.jpg', 1),
(21, 'Bontrager Bottle Cage ', 'Replica CF Bontrager XXX Bottle Cages QTY:2', '1743146553669.avif', 1),
(22, 'Salsa Verde', '2024 Salsa Journeyer Sora 650b\r\n6061-T6 ALUMINUM FRAME\r\n', '1743146728786.jpg', 1),
(23, 'Top Tube Pack', 'Apidura Racing Top Tube Pack\r\nColor: Black\r\nGear Capacity: 0.5L', '1743146858645.jpg', 1),
(24, 'Saddle Bag', 'Lumiere & Co. Bike Seat Bag\r\nSize: Large\r\nCouldn\'t afford the BOA Matone.', '1743146998481.jpg', 1),
(25, 'Asian Calligraphy Brush', 'My fave. Need more!', '1743147122194.webp', 2),
(26, 'Flat Brush Set', 'an assortment of flat brushes', '1743402183878.jpeg', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

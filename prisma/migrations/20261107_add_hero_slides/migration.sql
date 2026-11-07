-- Safe Additive Migration: Create hero_slides table
CREATE TABLE IF NOT EXISTS `hero_slides` (
    `id` VARCHAR(191) NOT NULL,
    `slideKey` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `ctaText` VARCHAR(191) NOT NULL,
    `ctaLink` VARCHAR(191) NOT NULL,
    `secondaryText` VARCHAR(191) NULL,
    `secondaryLink` VARCHAR(191) NULL,
    `proofPoint1` VARCHAR(191) NULL,
    `proofPoint2` VARCHAR(191) NULL,
    `proofPoint3` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `hero_slides_slideKey_key`(`slideKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

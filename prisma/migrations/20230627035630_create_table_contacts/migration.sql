-- CreateTable

CREATE TABLE
    `contacts` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `full_name` VARCHAR(100) NOT NULL,
        `nick_name` VARCHAR(100) NULL,
        `email` VARCHAR(100) NULL,
        `phone` VARCHAR(100) NULL,
        `username` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`id`)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci engine InnoDB;

-- AddForeignKey

ALTER TABLE `contacts`
ADD
    CONSTRAINT `contacts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
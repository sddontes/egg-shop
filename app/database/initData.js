// 创建表

// eslint-disable-next-line strict
export const createUser = 
CREATE TABLE `benben`.`user_users` (
  `user_id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NULL,
  `nickname` VARCHAR(45) NULL,
  `mobile` INT(11) NULL,
  `email` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL DEFAULT 0,
  `openid` VARCHAR(45) NULL,
  `uniid` VARCHAR(45) NULL,
  `birthday` DATE NULL,
  `reamrk` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `hometown` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `iduser_UNIQUE` (`user_id` ASC))
;

CREATE TABLE `benben`.`user_admin` (
  `user_id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NULL,
  `nickname` VARCHAR(45) NULL,
  `mobile` INT(11) NULL,
  `email` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL DEFAULT 0,
  `birthday` DATE NULL,
  `reamrk` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `hometown` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `iduser_UNIQUE` (`user_id` ASC))
;
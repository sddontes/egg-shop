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

  CREATE TABLE `benben`.`products_manage` (
    `id` INT NOT NULL,
    `name` FLOAT NULL COMMENT '商品名',
    `price` FLOAT NULL COMMENT '售卖价格',
    `discount_price` FLOAT NULL COMMENT '折扣价',
    `incoming_price` FLOAT NULL COMMENT '进货价',
    `base_price` FLOAT NULL COMMENT '基础价格',
    `stock` INT ZEROFILL NULL COMMENT '库存',
    `type` VARCHAR(45) NULL COMMENT '商品类型',
    `brand` VARCHAR(45) NULL COMMENT '品牌',
    `title` VARCHAR(45) NULL COMMENT '标题',
    `sold` VARCHAR(45) NULL COMMENT '已售卖',
    `primary_img` VARCHAR(65) NULL,
    `banner_img` VARCHAR(345) NULL,
    `detail_img` VARCHAR(345) NULL,
    `detail_content` VARCHAR(1845) NULL,
    PRIMARY KEY (`id`));
  
DROP TABLE category;

CREATE TABLE category(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    parentId  VARCHAR(30),
    _id       VARCHAR(30),
    names     VARCHAR(20),
    __v       INT   
);

INSERT INTO category VALUES
(NULL,'0','5330dsad245453','家用电器',0),
(NULL,'0','5330fsdfad2453','冰箱',0),
(NULL,'0','5c30dsdas5d453','洗衣机',0),
(NULL,'0','5c30dsdkuy4h53','电视',0),
(NULL,'0','5c3wejcd4fd456','家具',0),
(NULL,'0','5cer4567f3d453','食品',0),
(NULL,'0','5c16f7897fsd78','服装',0),
(NULL,'0','5c17fsd8998fd9','护肤品',0),
(NULL,'0','5c18fds987776d','成人用品',0),
(NULL,'0','5c19fsd7889897','电脑',0);

INSERT INTO category VALUES
(NULL,'5330dsad245453','0','台灯',0),
(NULL,'5330dsad245453','0','LED灯',0),
(NULL,'5330dsad245453','0','电视',0),
(NULL,'5330dsad245453','0','电风扇',0),
(NULL,'5330dsad245453','0','电机',0),
(NULL,'5330dsad245453','0','电脑',0);

INSERT INTO category VALUES
(NULL,'5330fsdfad2453','0','格力',0),
(NULL,'5330fsdfad2453','0','美的',0),
(NULL,'5330fsdfad2453','0','海尔',0),
(NULL,'5330fsdfad2453','0','艾美特',0),
(NULL,'5330fsdfad2453','0','lengna',0),
(NULL,'5330fsdfad2453','0','小米',0);

INSERT INTO category VALUES
(NULL,'5c30dsdas5d453','0','美的',0),
(NULL,'5c30dsdas5d453','0','格力',0),
(NULL,'5c30dsdas5d453','0','海尔',0),
(NULL,'5c30dsdas5d453','0','lengna',0),
(NULL,'5c30dsdas5d453','0','艾美特',0),
(NULL,'5c30dsdas5d453','0','小米',0);

INSERT INTO category VALUES
(NULL,'5c30dsdkuy4h53','0','华为空调',0),
(NULL,'5c30dsdkuy4h53','0','华为洗衣机',0),
(NULL,'5c30dsdkuy4h53','0','华为手机',0),
(NULL,'5c30dsdkuy4h53','0','huawei',0),
(NULL,'5c30dsdkuy4h53','0','ads',0),
(NULL,'5c30dsdkuy4h53','0','gfdgf',0);

INSERT INTO category VALUES
(NULL,'5c3wejcd4fd456','0','窗帘',0),
(NULL,'5c3wejcd4fd456','0','慕斯床',0),
(NULL,'5c3wejcd4fd456','0','桌子',0),
(NULL,'5c3wejcd4fd456','0','凳子',0),
(NULL,'5c3wejcd4fd456','0','矮凳子',0),
(NULL,'5c3wejcd4fd456','0','高凳子',0);

INSERT INTO category VALUES
(NULL,'5cer4567f3d453','0','慕斯蛋糕',0),
(NULL,'5cer4567f3d453','0','月饼',0),
(NULL,'5cer4567f3d453','0','餐具',0),
(NULL,'5cer4567f3d453','0','dasd',0),
(NULL,'5cer4567f3d453','0','矮凳子',0),
(NULL,'5cer4567f3d453','0','高凳子',0);

{
          parentId: '0',
          _id:"120",
          name: '家用电气',
          __v:0
        },
        {
          parentId: '0',
          _id:"121",
          name: '冰箱',
          __v:0
        },
        {
          parentId: '0',
          _id:"122",
          name: '洗衣机',
          __v:0
        },
        {
          parentId: '0',
          _id:"123",
          name: '服装',
          __v:0
        },
        {
          parentId: '0',
          _id:"124",
          name: '食品',
          __v:0
        },
        {
          parentId: '0',
          _id:"125",
          name: '玩具',
          __v:0
        },
        MD5   加密
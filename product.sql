DROP TABLE testpwd;
CREATE TABLE testpwd(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32),
    upwd  VARCHAR(32),
    role_id VARCHAR(32),
    _id     VARCHAR(50)
);
INSERT INTO testpwd VALUES
(NULL,'xiaowu','123456','5csdasd4564165564',NULL),
(NULL,'admin','admin','5csdasd4564fsd55g',NULL),
(NULL,'test1','1236',NULL,"5cdasdhwqdhfhasuifd5"),
(NULL,'test2','1236',NULL,"5cdasdh5345fhasuifd5");

DROP TABLE product;
CREATE TABLE product(
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    pname               VARCHAR(120),
    goods               VARCHAR(300),
    price               INT,
    goodsStatus         INT,
    pCategoryId         VARCHAR(50),
    categoryId          VARCHAR(50),
    detail              VARCHAR(10000),
    __v                 INT
);

INSERT INTO product VALUES
(NULL,'联想ThinkPad翼408',
'年度重量级新品，X390、T490全新登场 更加轻薄机身设计',
'6500',1,
'5330dsad245453',   # 5330dsad245453 parentId
'5g12dasdad5653',   #                p_imgs id 5g12dasdad5653
'<p><span style=\"color:rgb(228,57,60);background-color:rgb(22,55,22)\">电脑</span>
    <span style=\"font-size:18px;\">英特尔酷睿i5 14英寸轻薄笔记本电脑</span>
</p>',
0
),
(NULL,'小米ThinkPad翼408',
'年度重量级新品，小米8s、T490全新登场 更加轻薄机身设计',
'2599',1,
'5330fsdfad2453',   #
'5g12djgjfad553',   #
'<p><span style=\"color:rgb(228,57,60);background-color:rgb(22,55,22)\">
小米手机</span>
<span style=\"font-size:18px;\">小米机 2500 显卡</span>
</p>',
0
),
(NULL,'华为 metaThinkPad翼408',
'年度重量级新品，华为meta X390、T490全新登场 更加轻薄机身设计',
'7600',1,
'5c30dsdas5d453',   #
'5g12dasdda5653',
'<p><span style=\"color:rgb(228,57,60);background-color:rgb(22,55,22)\">
华为手机</span>
<span style=\"font-size:18px;\">华为机 2800 显卡</span>
</p>',
0),
(NULL,'华为电脑 ThinkPad翼408',
'年度重量级新品，华为meta X390、T490全新登场 更加轻薄机身设计',
'7600',1,
'5c30dsdkuy4h53',   #
'5g45yerv654gf3',   #
'<p><span style=\"color:rgb(228,57,60);background-color:rgb(22,55,22)\">
华为电脑</span>
<span style=\"font-size:18px;\">华为机 2800 显卡</span>
</p>',
0
),
(NULL,'小米电脑 metaThinkPad翼408',
'年度重量级新品，华为meta X390、T490全新登场 更加轻薄机身设计',
'7600',1,
'5c3wejcd4fd456',   #
'5g1tewtwf45fd3',   #
'<p><span style=\"color:rgb(228,57,60);background-color:rgb(22,55,22)\">
小米电脑</span>
<span style=\"font-size:18px;\">华为机 2800 显卡</span>
</p>',
0),
(NULL,' iphone iap metaThinkPad翼408',
'年度重量级新品，华为meta X390、T490全新登场 更加轻薄机身设计',
'7600',1,
'5cer4567f3d453',   #
'5g3f6gdfgh456g',   #
'<p><span style=\"color:rgb(228,57,60);background-color:rgb(22,55,22)\">
iphone iap </span>
<span style=\"font-size:18px;\">华为机 2800 显卡</span>
</p>',
0
);


DROP TABLE p_imgs;
CREATE TABLE p_imgs(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    imgs            VARCHAR(150),
    categoryId      VARCHAR(50)
);
INSERT INTO p_imgs VALUES
(NULL,'6A320.png', '5g12dasdad5653'),
(NULL,'4Q.png','5g12dasdad5653'),

(NULL,'4c-40xin.png', '5g12djgjfad553'),
(NULL,'6A320.png', '5g12djgjfad553'),

(NULL,'4Q.png','5g12dasdda5653'),
(NULL,'4c-40xin.png', '5g12dasdda5653'),

(NULL,'6A320.png', '5g45yerv654gf3'),
(NULL,'4c-40xin.png', '5g45yerv654gf3'),

(NULL,'4Q.png', '5g1tewtwf45fd3'),
(NULL,'4c-40xin.png', '5g1tewtwf45fd3'),

(NULL,'6A320.png', '5g3f6gdfgh456g'),
(NULL,'4a65555.png', '5g3f6gdfgh456g');

#DROP TABLE productGoods;
#CREATE TABLE productGoods(
#    id INT PRIMARY KEY AUTO_INCREMENT,
#    goodsName VARCHAR(50),
#    categoryId VARCHAR(20)
#);
#INSERT INTO productGoods VALUES
#(NULL,'电脑','5g12dasdad5653'),
#(NULL,'电脑','5g12djgjfad553'),
#(NULL,'电脑','5g12dasdda5653'),
#(NULL,'电脑','5g45yerv654gf3'),
#(NULL,'电脑','5g1tewtwf45fd3'),
#(NULL,'电脑','5g3f6gdfgh456g');

DROP TABLE productCategory;
CREATE TABLE productCategory(
    id INT PRIMARY KEY AUTO_INCREMENT,
    byCategory VARCHAR(30),
    pCategoryId VARCHAR(30)
);
INSERT INTO productCategory VALUES
(NULL,'台灯','5330dsad245453'),
(NULL,'小米','5330fsdfad2453'),

(NULL,'小米','5c30dsdas5d453'),
(NULL,'华为空调','5c30dsdkuy4h53'),

(NULL,'笔记本','5c3wejcd4fd456'),
(NULL,'笔记本','5cer4567f3d453');

###  这个是二级分类
DROP TABLE categoryChild;
CREATE TABLE categoryChild (
    id      INT PRIMARY KEY AUTO_INCREMENT,
    parentId VARCHAR(20),
    names    VARCHAR(20),
    categoryId VARCHAR(30),
    _v          INT
);
#INSERT INTO category VALUES
INSERT INTO categoryChild VALUES
##        parentId
(NULL,'5330dsad245453','台灯','5g12dasdad5653',0),
(NULL,'5330dsad245453','手机','5g3f6gdfgh456g',0),
(NULL,'5330fsdfad2453','小米','5g12djgjfad553',0),
(NULL,'5c30dsdkuy4h53','华为空调','5g45yerv654gf3',0),
(NULL,'5c30dsdas5d453','小米','5g1tewtwf45fd3',0);
(NULL,'5330dsad245453','LED灯',0),
(NULL,'5330dsad245453','电视',0),

#INSERT INTO category VALUES
INSERT INTO categoryChild VALUES
(NULL,'5330fsdfad2453','格力',0),
(NULL,'5330fsdfad2453','美的',0),
(NULL,'5330fsdfad2453','海尔',0),

#INSERT INTO category VALUES
INSERT INTO categoryChild VALUES
(NULL,'5c30dsdas5d453','美的',0),
(NULL,'5c30dsdas5d453','格力',0),
(NULL,'5c30dsdas5d453','海尔',0),
(NULL,'5c30dsdas5d453','lengna',0),
(NULL,'5c30dsdas5d453','艾美特',0);

#INSERT INTO category VALUES
INSERT INTO categoryChild VALUES
(NULL,'5c30dsdkuy4h53','华为洗衣机',0),
(NULL,'5c30dsdkuy4h53','华为手机',0),
(NULL,'5c30dsdkuy4h53','huawei',0),
(NULL,'5c30dsdkuy4h53','ads',0),
(NULL,'5c30dsdkuy4h53','gfdgf',0);

#INSERT INTO category VALUES
INSERT INTO categoryChild VALUES
(NULL,'5c3wejcd4fd456','窗帘',0),
(NULL,'5c3wejcd4fd456','慕斯床',0),
(NULL,'5c3wejcd4fd456','桌子',0),
(NULL,'5c3wejcd4fd456','凳子',0),
(NULL,'5c3wejcd4fd456','矮凳子',0),
(NULL,'5c3wejcd4fd456','高凳子',0);

#INSERT INTO category VALUES
INSERT INTO categoryChild VALUES
(NULL,'5cer4567f3d453','慕斯蛋糕',0),
(NULL,'5cer4567f3d453','月饼',0),
(NULL,'5cer4567f3d453','餐具',0),
(NULL,'5cer4567f3d453','dasd',0),
(NULL,'5cer4567f3d453','矮凳子',0),
(NULL,'5cer4567f3d453','高凳子',0);

#### 角色名  ##################
DROP TABLE roles_register;
CREATE TABLE roles_register(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32),
    role_id VARCHAR(50),
    _id     VARCHAR(50)
);
INSERT INTO roles_register VALUES
(null,'主管','5csdasd4564165564',"5cdasdhwqdhfhasuifd5"),
(null,'经理','5csdasd4564fsd55g',"5cdasdh5345fhasuifd5");

### 角色列表  ############################
DROP TABLE roles_list;
CREATE TABLE roles_list(
    id INT PRIMARY KEY AUTO_INCREMENT,
    _id VARCHAR(33),
    phone VARCHAR(12),
    email VARCHAR(32),
    role_id VARCHAR(33),
    create_time BIGINT,
    __v INT,
    auth_time BIGINT,
    auth_name VARCHAR(32)
);
INSERT INTO roles_list VALUES
(NULL,
"5cdasdhwqdhfhasuifd5",
'13725633589',
'1818770@qq.com',
'5csdasd4564165564',
1575101026694,
0,
1575101026697,
'xiaowu'
),
(NULL,
"5cdasdh5345fhasuifd5",
'13725633789',
'1818870@qq.com',
'5csdasd4564fsd55g',
1575101026695,
0,
1575101026698,
'admin'
);

DROP TABLE menus;
CREATE TABLE menus(
    id  INT PRIMARY KEY AUTO_INCREMENT,
    menu_path VARCHAR(100),
    role_id VARCHAR(33),
    __v INT
);
INSERT INTO menus VALUES
(NULL,'/home',"5cdasdhwqdhfhasuifd5",0),
(NULL,'/category',"5cdasdhwqdhfhasuifd5",0),
(NULL,'/user',"5cdasdhwqdhfhasuifd5",0),
(NULL,'/role',"5cdasdhwqdhfhasuifd5",0),
(NULL,'/charts/bar',"5cdasdhwqdhfhasuifd5",0),

(NULL,'/home',"5cdasdh5345fhasuifd5",0),
(NULL,'/product',"5cdasdh5345fhasuifd5",0),
(NULL,'/user',"5cdasdh5345fhasuifd5",0),
(NULL,'/role',"5cdasdh5345fhasuifd5",0),
(NULL,'/charts/line',"5cdasdh5345fhasuifd5",0);

#"data":[
#    {   "menus":[
#            "/home",
#            "/products",
#            "/products/category",
#            "/user",
#            "/role",
#            "/charts/bar"
#        ],
#
#        "_id":"5cdasdhwqdhfhasuifd5",
#        "username":"test",                         // 用户名
#        "password":"202fdas415fsdaf5sdf45afsaf",   // md5加密后  32位  密码
#        "phone": "12345657891",
#        "email": "1236@qq.com",
#        "role_id": "5casdsafhjhfuiash",
#        "create_time": 155451521654,
#        "__v":0,
#        "auth_time":155845645656,
#        "auth_name":"admin"
#    }
#]
#
#    data:{
#        users:[
#            {
#                _id: "4545safdas1f5",
#                uname:
#                password: ,
#                phone: 
#                email: 
#                role_id: 
#                create_time:
#                ＿＿ｖ：　0
#            }
#        ]
#        roles:[
#            menus: [],
#            _id:
#            name: xxx
#            create_time: 
#        ]
#    }














#   manage/product/list?pageNum=1&pageSize=2
#
#   data:{
#       "pageNum": 1,
#       "total": 10,
#       "pages": 5,
#       "pageSize": 2,
#       "list": [
#           {
#               "status":1,                     .
#               "imgs":[                        .
#                   "image-1211452.jpg",
#                   "image-1211452.jpg"
#                ]
#               "_id":"dsaj54564dsa456",
#               "pname":"华塑dsaj54564dsa456",
#               "goods":"15.6英寸窄边框游戏笔记本电脑，156XM，dsaj54564dsa456",
#               "price":6799,
#               "pCategoryId":"5csadfsfdsfdss",
#               "categoryId":"5cdasdfdsfasddd",
#               "detail":"<p><span style=\"color:rgb(228,57,60)\background-color:rgb(22,55,22)"></span></p>",
#               "_v":0,
#           }
#           {}
#       ]
#
#    }
#   SELECT p.categoryId,p.price,p.goods,p.pname, img.imgs, d.detail FROM 
#   detail as d,product as p ,p_imgs as img 
#   WHERE p.goodsStatus=1 
#
#   img.categoryId=p.categoryId OR d.categoryId=p.categoryId
#
#
#   SELECT p.*, img.*, d.* 
#   FROM product as p, p_imgs as img ,detail as d 
#   WHERE p.goodsStatus=1 AND 
#   img.categoryId=p.categoryId AND
#   d.categoryId=p.categoryId 

 








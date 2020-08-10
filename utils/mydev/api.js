var NewApiRootUrl = 'https://www.eecup.cn/tea/api/';
// var NewApiRootUrl = 'http://47.106.172.126:8888/tea/api/';
// var NewApiRootUrl = 'https://juanjuanlove.club/api/';
module.exports = {
    IndexUrl: NewApiRootUrl + 'carousel/findAll', //首页数据接口
  GetCartItemCount: NewApiRootUrl + 'cart/getCartItemCount', //首页数据接口
    CatalogList: NewApiRootUrl + 'category/list',  //分类目录全部分类数据接口
    ShopList: NewApiRootUrl + 'store/list',  //分类目录全部分类数据接口
  GetAddressList: NewApiRootUrl + 'address/getAddressList',  //分类目录全部分类数据接口
  GetActivityInfo: NewApiRootUrl + 'activity/getActivityInfo', //优惠劵
  GetRecommendList: NewApiRootUrl + 'recommend/list', 
  IsShow: NewApiRootUrl + 'env/getEnvironment', 
  ExtractPrize: NewApiRootUrl + 'activity/extractPrize', //普通优惠劵列表
  SelectStore: NewApiRootUrl + 'store/selectStore', //根据定位选择最近的店铺位置
    CatalogCurrent: NewApiRootUrl + 'goods/listByCategoryId',  //分类目录当前分类数据接口

    AuthLoginByWeixin: NewApiRootUrl + 'login/login', //微信登录
    reportUserInfo: NewApiRootUrl + 'user/reportApiUserInfo',//传用户信息

    GoodsCount: NewApiRootUrl + 'goods/count',  //统计商品总数
    GoodsList: NewApiRootUrl + 'goods/list',  //获得商品列表
    GoodsCategory: NewApiRootUrl + 'goods/listByCategoryId',  //获得分类数据
    GoodsDetail: NewApiRootUrl + 'goods/detail',  //获得商品的详情
    GoodsNew: NewApiRootUrl + 'goods/new',  //新品
    GoodsHot: NewApiRootUrl + 'goods/hot',  //热门
    GoodsRelated: NewApiRootUrl + 'goods/related',  //商品详情页的关联商品（大家都在看）
  CreateOrderByCart: NewApiRootUrl + 'order/createOrderByCart', 
  FindOrderByOppenId: NewApiRootUrl + 'order/findOrderByOppenId', 
  FindOrderDetailById: NewApiRootUrl + 'order/findOrderDetailById', 
    BrandList: NewApiRootUrl + 'brand/list',  //品牌列表
    BrandDetail: NewApiRootUrl + 'brand/detail',  //品牌详情
  GetUserCoupons: NewApiRootUrl + 'coupons/findUserValidCoupons', //获取购物车的数据
  GetTotalMoney: NewApiRootUrl + 'order/calculateCartOrderPrice', //获取购物车的数据
  GetJackpotInfo: NewApiRootUrl + 'activity/getJackpotInfo', //获取购物车的数据
  CartList: NewApiRootUrl + 'cart/cartGoodsList', //获取购物车的数据
  CartAdd: NewApiRootUrl + 'cart/addCartItem', // 添加商品到购物车
  BuyAdd: NewApiRootUrl + 'cart/addCartItem', // 直接购买
    CartUpdate: NewApiRootUrl + 'cart/update', // 更新购物车的商品
  CartDelete: NewApiRootUrl + 'cart/cartGoodsDelete', // 删除购物车的商品
  UpdateCartItemCount: NewApiRootUrl + 'cart/updateCartItemCount', // 删除购物车的商品
    CartChecked: NewApiRootUrl + 'cart/checked', // 选择或取消选择商品
    CartGoodsCount: NewApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
    CartCheckout: NewApiRootUrl + 'cart/checkout', // 下单前信息确认

    BuyCheckout: NewApiRootUrl + 'buy/checkout', // 下单前信息确认

    OrderSubmit: NewApiRootUrl + 'order/submit', // 提交订单
    PayPrepayId: NewApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

    CollectList: NewApiRootUrl + 'collect/list',  //收藏列表
    CollectAddOrDelete: NewApiRootUrl + 'collect/addordelete',  //添加或取消收藏

    CommentList: NewApiRootUrl + 'comment/list',  //评论列表
    CommentCount: NewApiRootUrl + 'comment/count',  //评论总数
    CommentPost: NewApiRootUrl + 'comment/post',   //发表评论

    TopicList: NewApiRootUrl + 'topic/list',  //专题列表
    TopicDetail: NewApiRootUrl + 'topic/detail',  //专题详情
    TopicRelated: NewApiRootUrl + 'topic/related',  //相关专题

    SearchIndex: NewApiRootUrl + 'search/index',  //搜索页面数据
    SearchResult: NewApiRootUrl + 'search/result',  //搜索数据
    SearchHelper: NewApiRootUrl + 'search/helper',  //搜索帮助
    SearchClearHistory: NewApiRootUrl + 'search/clearhistory',  //搜索帮助

    AddressList: NewApiRootUrl + 'address/findListByOppenId',  //收货地址列表
    AddressDetail: NewApiRootUrl + 'address/findById',  //收货地址详情
    AddressSave: NewApiRootUrl + 'address/addUserAddress',  //保存收货地址
  AddressDelete: NewApiRootUrl + 'address/deleteUserAddress',  //保存收货地址
    AddressUpdate: NewApiRootUrl + 'address/updateUserAddress',  //保存收货地址

  SendVerificationCode: NewApiRootUrl + 'sms/sendVerificationCode',  //发送短信

    RegionList: NewApiRootUrl + 'region/list',  //获取区域列表

    OrderList: NewApiRootUrl + 'order/list',  //订单列表
    OrderDetail: NewApiRootUrl + 'order/detail',  //订单详情
    OrderCancel: NewApiRootUrl + 'order/cancelOrder',  //取消订单

    FootprintList: NewApiRootUrl + 'footprint/list',  //足迹列表
    FootprintDelete: NewApiRootUrl + 'footprint/delete',  //删除足迹
    
    FeedbackAdd: NewApiRootUrl + 'feedback/save', //添加反馈
    SmsCode: NewApiRootUrl + 'user/smscode', //发送短信
    BindMobile: NewApiRootUrl + 'user/bindMobile', //绑定手机
    Login: NewApiRootUrl + 'auth/login', //账号登录
    Register: NewApiRootUrl + 'auth/register', //注册
    CouponList: NewApiRootUrl + 'coupon/list', // 优惠券列表
    GoodsCouponList: NewApiRootUrl + 'coupon/listByGoods', // 商品优惠券列表
    OrderQuery: NewApiRootUrl + 'pay/query',
    OrderSuccess: NewApiRootUrl + 'order/updateSuccess',

    UserList: NewApiRootUrl + 'user/getLowerLevelUsers', //会员下线查询
    MyAuth: NewApiRootUrl + 'authorization/queryMyAuth', //查询自己的授权
    MyAuthCert: NewApiRootUrl + 'authorization/auth.jpg', //查询自己的授权
    SaveAuthRecord: NewApiRootUrl + 'authrecord/save', //查询自己的授权
    getQRcode: NewApiRootUrl + 'authrecord/getQRcode.jpg', //查询自己的授权
    GetauthInfoByRecordId: NewApiRootUrl + 'authrecord/authInfoByRecordId', 
    SaveInvitingUser: NewApiRootUrl + 'authorization/saveInvitingUser',//代理注册
    QueryAuthInvitingList: NewApiRootUrl + 'authrecord/queryAuthInvitingList',//查询代理申请记录审核
    AuditsManage: NewApiRootUrl + 'authorization/auditsManage',//审核代理
    QueryAuthRecordList: NewApiRootUrl + 'authrecord/queryAuthRecordList',//查看创建代理记录
    DeleteAuthRecord: NewApiRootUrl + 'authrecord/delete',//查看创建代理记录
    AgentGoodsList: NewApiRootUrl + 'goods/agentList',  //获得商品列表
    MyStocks: NewApiRootUrl + 'goods/queryMyStock', //查看我的库存
    OrderListNew: NewApiRootUrl + 'order/orderList', //查看我的，或者下一级的订单
    ScanList: NewApiRootUrl + 'scanorder/list', //查看我的，或者下一级的订单
    ScanOrderSave: NewApiRootUrl + 'qrcode/update', //查看我的，或者下一级的订单
    VaildateScanOrderId: NewApiRootUrl + 'scanorder/vaildate', //验证唯一
    GetScanQrcodeInfo: NewApiRootUrl + 'qrcode/getQrCodeInfo', //获取扫描二维码出来的信息
    UpdateOrderType: NewApiRootUrl + 'order/updateOrderType',  //订单详情
    GetLowerLevelUsersList: NewApiRootUrl + 'user/getLowerLevelUsersList',  //找到下级所有会员
    GetUserInfoByUserId: NewApiRootUrl + 'user/getUserInfoByUserId', 
    UpdateInvitingUser: NewApiRootUrl + 'authorization/updateInvitingUser', 
    ScanListVo: NewApiRootUrl + 'scanorder/orderList',
    UpdateLevelUser: NewApiRootUrl + 'scanorder/updateLevelUser',
    ScanRecordInfo: NewApiRootUrl + 'scanorder/scanRecordInfo',
    ScanOrderDel: NewApiRootUrl + 'qrcode/del', //
    bindPhoneNum:NewApiRootUrl+'user/bindPhoneNum',//绑定用户手机号码
    getUserInfo:NewApiRootUrl+'user/getUserInfo',//用户详情
    receiveNewUserGift:NewApiRootUrl+'user/receiveNewUserGift',//领取新人优惠劵
    rechargeByShoppingCard:NewApiRootUrl+'coupons/rechargeByShoppingCard',//充值中心   根据充值码充值查询
    findShoppingCardInfo:NewApiRootUrl+'coupons/findShoppingCardInfo',//充值中心   根据充值码充值领取
    extractExperience:NewApiRootUrl+'activity/extractExperience',//体验劵   根据充值码充值领取
}
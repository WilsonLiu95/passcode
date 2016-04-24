//用户登录			
		//用户名 用户密码
    useraccount:$('#user-account').val(),   
		userpassword:$('#user-password').val()
     
        data.status // 1代表成功返回 那么跳转页面 并返回下面3个数据  如果为0 代表登录失败 下面3个数据不需要返回
		    data.userType  
        data.userName
        data.userIcon


        //userType:美食券商家；userName：香域青年； userIcon：用户头像的地址
        
//用户退出
       x:userCode,
       userStaus:"exit"
        
        无
//首页
       page:"first-page"
       x:userCode

   //活动信息
		data.activityname
		data.activitymoney
		data.beenconfirmed　
		data.beenreceived
		data.toConfirm
		data.toReceive
		data.Announcementtitle


　　//查询 
 
        consumerCode: $('#consumer-code').val(),
        x:userCode,
        consumerCodeButton:"query"
   
		data.quanMoney  // 数字 如 3
 		data.consumerName 
		data.receivedDay //日期2015/5/3
		data.receivedTime //23:02

	//使用
	    consumerCode:$('#consumer-code').val(),
	    x:userCode,
	    consumerCodeButton:"use"

	    无需返回数据


//活动统计
	 page:"second-page",
	 x:userCode

//都直接填数字 元字不用加 比如预算1000即可
	data.activityname
	data.activitymoney
	data.beenconfirmed
	data.beenreceived
	data.toConfirm
	data.toReceive
	data.budgetMoney
	data.spendingMoney
	data.freezeMoney
  // 按天的数据 
	data.dataXAxisDay  //横坐标 如9/21 9/22 9/23 连着记载 直至昨天
	data.dataShareDay  //分享人数 直接写数字 如 20
	data.dataReceiveDay
	data.dataConfirmDay
  //按月的数据
	data.dataXAxisMonth  //横坐标 按月份 如 1 2 3 4 5 6 7 8 9 10 
	data.dataShareMonth
	data.dataReceiveMonth
	data.dataConfirmMonth

//顾客统计
	page:"third-page",
    x:userCode
   //顾客总计的数字 直接填写数字
data.ShareCustomerNumber
data.receiveCustomerNumber
data.confirmCustomerNumber
   //年龄分布 '11-15','16-20','21-25','26-30','31-35'  5个段位 依次排列
data.ageDistribution[i]  //i从0到5 
    //男女分布比例 直接写数字
data.manNumber
data.womanNumber


//店铺评价
  page:"four-page",
  x:userCode
   //评论总计 直接数字 200 200 100
data.totalCommentNumber
data.readCommentNumber
data.newCommentNumber
   //最新评论
data.comment[i].src   //用户头像地址 
data.comment[i].name  //用户名
data.comment[i].dayAgo //填写数字 如 3 或 4
data.comment[i].context //用户评论正文




//账户余额
  page:"five-page",
  x:userCode
  //账户操作记录
data.accountBalance  //账户余额
data.freezeBalance   //不可用余额 即冻结
data.validityDay  //有效期 填数字


data.accountOperationRecordNumber  //账户操作条数
data.activitySpendingRecordNumber   //活动支出记录条数
  
  //活动支出记录
data.accountOperationTime[i]  //时间 2015/02/12
data.accountOperationType[i]  //操作类型分为充值和提现
data.accountOperationSymbol[i]  // 充值未 +  提现为 -
data.accountOperationMoney[i]  //金额数  如 500

data.activitySpendingTime[j]     //时间 2016/02/12
data.activitySpendingName[j]    //活动名称
data.activitySpendingcoding[j]   //消费码 
data.activitySpendingMoney[j]    //金额 填写数字 3


//活动管理
   page:"six-page",
   x:userCode

data.activityName
data.activityLimit
data.activityBudget
data.alreadySpend
data.activityTime  // 例09/01-10/23
data.creationTime  //创建时间 2015/2/3
data.totalHistoryActivityNumber  //活动历史活动数目 如 50 即i的上限

//名称	额度	截止时间	分享人数	领券人数	确认人数	创建时间
//回馈客户大酬宾回馈客户大酬宾	3	2015/8/1	200	100	70	2015/7/2

data.historyActivityName[i]
data.historyActivityMoney[i]
data.historyActivityStopTime[i]
data.historyActivityShare[i]
data.historyActivityReceive[i]
data.historyActivityConfirm[i]
data.historyActivityCreate[i]

   //确认改变当前活动状态
btn:stopActivity,
x:userCode

无需返回数据
   //添加新活动
      activityName:$('#add-activity-form input :eq(0)').val(), 
      activityLimit:$('#add-activity-form input :eq(1)').val(), 
      activityBudget:$('#add-activity-form input :eq(2)').val(),
      x:userCode

   无需返回数据




   //店铺信息
  page:"seven-page",
  x:userCode

data.userIcon  //头像地址
data.userName
data.storeStatus  //三种状态 营业中 停业中 放假中 直接传回数字
data.storeTelephone 
data.parkingIntro
data.nearbyIntro
data.wifiAccount
data.wifiPassword
data.storeAdress
data.storeIntro

   //修改
        userIcon:$('#store-logo-div input').val(),
        userName:$('#store-name').val(),
        storeStatus:$('#store-status').val(),
        storeTelephone:$('#store-telephone').val(),
        parkingIntro:$('#parking-intro').val(),
        nearbyIntro:$('#nearby-intro').val(),
        wifiAccount:$('#wifi-account').val(),
        wifiPassword:$('#wifi-password').val(),
        storeAdress:$('#store-adress').val(),
        storeIntro:$('#store-intro').text(),
        x:userCode

        data.userName
        data.userIcon


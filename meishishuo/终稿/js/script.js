//用户登录展示首页
var userCode = "";
   $(document).ready(function(){
        $("#login").click(function(){             //为按钮关联单击事件处理代码
       checklogin();                              //调用自定义函数进行登录验证
    });
      });
         function checklogin() {                       //定义一个登录验证的函数  
            if ($("#user-account").val() == "") {       //检测用户名是否为空
                $("#account-test").html("用户名不能为空！"); //显示提示消息
                $("#user-account").focus();
        return false;
            }else
      {
          $("#account-test").html("");  
        }
            if ($("#user-password").val() == "") {      //检测用户密码是否为空  
                $("#password-test").html("密码框不能为空！"); //显示提示消息
                $("#user-password").focus();
        return false;       
            }else{
          $("#password-test").html("");         
      }
            userCode = $.ajax({             //如果用户名和密码都不为空，则异步的发送Ajax验证请求，
                type: "POST",
                url: "http://www.linkmay.com/index_video.php/",
                data: "username=" + $("#user-account").val().toString()
            + "&password=" + $("#user-password").val().toString(),
            
                })
                .done(function(data){
                                 //如果异步调用成功，则判断返回的状态值
                       var dataStatus = data.status;          
                    if (dataStatus == "1") {                //如果返回状态值为1，则表示登录成功
                           location.href="index.html"
                          $('#user-type').text(data.userType);
                          $('#navbar-user-name').text(data.userName);
                          $('#navbar-user-icon').attr('href', data.userIcon);
                          $('#first-page').click();
                          return data.x;  
                      
                     }
                    else {                             //如果返回的状态值为2,则登录失败
                        $("#login-test").html("请确认您输入的用户名或密码输入是否正确！");
                        $("#test-account").focus();
                        return false;             
                    }
                
                })   
                
            }

/*
  $('#login').click(function() {
  userCode =$.ajax({
  url: 'http://www.linkmay.com/index_video.php/',
  type: 'POST',
  dataType: 'json',
  data: {
    useraccount:$('#user-account').val(),   
    userpassword:$('#user-password').val()
  },
})
.done(function(data) {
    $('#user-type').text(data.userType);
    $('#navbar-user-name').text(data.userName);
    $('#navbar-user-icon').attr('href', data.userIcon);
    $('#first-page').click();
    return data.x;  
})
  });

  */

   //用户退出
$(document).ready(function() {
  $('#exit-account').click(function() {
    $.post('http://www.linkmay.com/index_video.php/', 
      {x:userCode,userStaus:"exit"}, 
      function(data, textStatus, xhr) {
      x="";
    });
  });
});

  //首页信息加载
$(document).ready(function() {
	$('#first-page').click(function() {
	$.post('http://www.linkmay.com/index_video.php/', 
		{page:"first-page",x:userCode}, 
	  function(data, textStatus, xhr) {
	  	//消费码中的活动信息
	  	$('.activity-name').text(data.activityname) ;
        $('.activity-money').text(data.activitymoney) ;
        $('.been-confirmed').text(data.beenconfirmed) ;
        $('.been-received').text(data.beenreceived) ;
        $('.to-confirm').text(data.toConfirm) ;
        $('.to-receive').text(data.toReceive) ;
        //官方公告
        for (var i = 0; i < 8; i++) {
         $("#announcement-href b eq("+i+")").text(data.Announcementtitle[i]);                        
         $("#announcement-href time eq("+i+")").text(data.Announcementtime[i]);
         $("#announcement-href span eq("+i+")").text(data.announcementText[i]);
        };
        
});
})
})
  //查询
$(document).ready(function() {
	$('#query-button').click(function() {
		$.post('http://www.linkmay.com/index_video.php/', 
			{consumerCode: $('#consumer-code').val(),x:userCode,consumerCodeButton:"query"}, 
			function(data, textStatus, xhr) {
		$('#quan-status').text(data.quanStatus);
        $('#quan-moneyquan-money').text(data.quanMoney);
        $('#consumer-name').text(data.consumerName);
        $('#received-day').text(data.receivedDay);
        $('#received-time').text(data.receivedTime);
			
		});
	});

})

  //使用
$(document).ready(function() {
	$('#confirm-use-button').click(function() {
		$.post('http://www.linkmay.com/index_video.php/', 
			{consumerCode:$('#consumer-code').val(),x:userCode,consumerCodeButton:"use"}, 
			function(data, textStatus, xhr) {
		    $('#consumer-code').val("");
		    $('#quan-status').text("");
        $('#quan-moneyquan-money').text("");
        $('#consumer-name').text("");
        $('#received-day').text("");
        $('#received-time').text("");
		
		});
	});
});

//官方公告
$.each($('#announcement-href a'), function(index, val) {
         {  
                    $(this).click(function() {
                       $('#office-announcement-title').text($('#announcement-href b:eq('+index+')').text());
                       $('#office-announcement-span').text($('#announcement-href span:eq('+index+')').text())
                    });
     };
});
//活动统计

     //定义折线图的数据
var dataXAxis = new Array();
var dataShare = new Array();
var dataReceive = new Array();
var dataConfirm = new Array();
     //按天计的数据
var dataXAxisDay = new Array();
var dataShareDay = new Array();
var dataReceiveDay = new Array();
var dataConfirmDay = new Array();
     //按月计的数据
var dataXAxisMonth = new Array();
var dataShareMonth = new Array();
var dataReceiveMonth = new Array();
var dataConfirmMonth = new Array();

//test数据
dataXAxisMonth = [2,2,2,3,3,3];
dataShareMonth = [1,2,3,4,5,6];
dataReceiveMonth = [1,2,3,4,5,6];
dataConfirmMonth = [1,2,3,4,5,6];

dataXAxisDay = [1,2,3,4,5,6,7];
dataShareDay = [11,22,33,44,55,66,77];
dataReceiveDay = [111,222,333,444,555,666,777];
dataConfirmDay = [1111,2222,3333,4444,5555,6666,7777];

$(document).ready(function() {
	$('#second-page').click(function() {
		$.post('http://www.linkmay.com/index_video.php/',
		 { page:"second-page",x:userCode},
		  function(data, textStatus, xhr) {
  	  	//当前活动统计
  	  	$('.activity-name').text(data.activityname) ;
        $('.activity-money').text(data.activitymoney) ;
        $('.been-confirmed').text(data.beenconfirmed) ;
        $('.been-received').text(data.beenreceived) ;
        $('.to-confirm').text(data.toConfirm) ;
        $('.to-receive').text(data.toReceive) ;			
        $('#budget-money').text(data.budgetMoney);
        $('#spending-moneyspending-money').text(data.spendingMoney);
        $('#freeze-money').text(data.freezeMoney);
       
        //活动趋势
        dataXAxisDay = data.dataXAxisDay;
        dataShareDay = data.dataShareDay;
        dataReceiveDay = data.dataReceiveDay;
        dataConfirmDay = data.dataConfirmDay;        

        dataXAxisMonth = data.dataXAxisMonth;
        dataShareMonth = data.dataShareMonth;
        dataReceiveMonth = data.dataReceiveMonth;
        dataConfirmMonth = data.dataConfirmMonth;
  })
	})
})

  //2个select联动
$('#time-type-2').change(function() {
	$('#time-type-1').val($('#time-type-2').val());
});
$('#time-type-1').change(function() {
	$('#time-type-2').val($('#time-type-1').val());	
});

//折线图启动的2个函数
$(document).ready(function () {
	selectshuju();
	
});


$('#time-type-1, #time-type-2').change(function() {
	selectshuju();
});

  //select变换改变数据的函数
function selectshuju() {

if ($('#time-type-1').val() === "according-month")
 {

    dataXAxis = dataXAxisMonth;
    dataShare = dataShareMonth;
    dataReceive = dataReceiveMonth;
    dataConfirm = dataConfirmMonth;
    
}else{

    dataXAxis = dataXAxisDay;
    dataShare = dataShareDay;
    dataReceive = dataReceiveDay;
    dataConfirm = dataConfirmDay;

}

    var whichchart1 =  document.getElementById('tb1')
	var whichchart2 =  document.getElementById('tb2')
	 customerTrend (whichchart1);
 	 customerTrend (whichchart2);


        	function customerTrend(whichchart) {
               
                // 基于准备好的dom，初始化echarts图表
                var myChart = echarts.init(whichchart); 

                
                var option = {
    title : {
        text: '',//图表标题
        subtext: ''//图表副标题
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['分享人数','领券人数','确认人数']
    },
    toolbox: {
        show : true,
        feature : {
        


            mark : {show: false},
        
            dataView : {show: true, readOnly: true},
            magicType : {show: true, type: []},
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : dataXAxis,
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'分享人数',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:dataShare       },
        {
            name:'领券人数',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:dataReceive   },
        {
            name:'确认人数',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:dataConfirm   }
    ]
};
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }


};


//顾客统计
var ShareCustomerNumber = $('#Share-customer-number ');
var receiveCustomerNumber = $('#receive-customer-number ');
var confirmCustomerNumber = $('#confirm-customer-number ');
var ageDistribution = new Array();
var sexDistribution = new Array();

 
  $(document).ready(function() {
  	$('#third-page').click(function() {
  		$.post('http://www.linkmay.com/index_video.php/', 
  			{page:"third-page",
             x:userCode}, 
  			function(data, textStatus, xhr) {
  			//顾客总计
            $('#Share-customer-number ').text(data.ShareCustomerNumber);
            $('#receive-customer-number ').text(data.receiveCustomerNumber);
            $('#confirm-customer-number ').text(data.confirmCustomerNumber);        			   

  			 //顾客分布
          
              	ageDistribution = [
              	{value:data.ageDistribution[0], name:'11-15'},
                {value:data.ageDistribution[1], name:'16-20'},
                {value:data.ageDistribution[2], name:'21-25'},
                {value:data.ageDistribution[3], name:'26-30'},
                {value:data.ageDistribution[4], name:'31-35'}
              	]

              

              sexDistribution = [
              {value:data.manNumber,name:'男'}, 
               {value:data.womanNumber,name:'女'}
              ]
            distribution();

  })
  })
  })

              
function distribution(){
                // 基于准备好的dom，初始化echarts图表
                var myChart = echarts.init(document.getElementById('tb3')); 
                
                var option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['11-15','16-20','21-25','26-30','31-35']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataView : {show: true, readOnly:true},
            magicType : {
                show: true, 
                type: [],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center',
                        max: 1548
                    }
                }
            },
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:ageDistribution        }
    ]
};
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
          

// 顾客分布男女

                var myChart = echarts.init(document.getElementById('tb4')); 
                
                var option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['男','女']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: false, 
                type: ['pie'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center',
                        max: 1548
                    }
                }
            },
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:sexDistribution
        }
    ]
};

                // 为echarts对象加载数据 
                myChart.setOption(option); 

 }  
           

//店铺评价

  //评价总计


var html = new Array();

  $(document).ready(function() {
  	$('#four-page').click(function() {
  		
  		$.post('http://www.linkmay.com/index_video.php/',
  		 {page:"four-page",x:userCode}, 
  		 function(data, textStatus, xhr) {
  				
          
          $('#total-comment-number').text(data.totalCommentNumber);
          $('#read-comment-number').text(data.readCommentNumber);
          $('#new-comment-number').text(data.newCommentNumber);
               
          for (var i = 0; i < data.totalCommentNumber; i++) {
        
          html[i]='<li class="list-group-item"><div><img src="'
          +data.comment[i].src+'"><span>'
          +data.comment[i].name+'</span> <span>'
          +data.comment[i].dayAgo+'</span>天前<article>'
          + data.comment[i].context+'</article></div><a data-toggle="modal" data-target="#response-Comment" id="'
          +i+'comment">打开回复</a></li> ';  
        paging(data.totalCommentNumber,6,html,'comment-page','total-comment','previous','next');

   };
      })
  	   })
         })

responseClick(0);
responseClick(1);
responseClick(2);
responseClick(3);
responseClick(4);
responseClick(5);

function responseClick(i){
   $('#total-comment a:eq('+i+')').click(function() {
    var j = parseInt($('#total-comment a:eq('+i+')').attr('id'));
    $('#comment-spread ').text(comment[j].context);
    $('#response-comment-confirm').click(function() {
        $.post('http://www.linkmay.com/index_video.php/', 
            {responseNumber:j,responseContext:$('#response-context').val(),x:userCode}, 
            function(data, textStatus, xhr) {
            $('#response-context').val("")
        });
    });
  })
  } 


//账户余额  '<thead><td>时间</td><td>操作</td><td>金额</td></thead>'


var accountOperationHtml = new Array();
var activitySpendingHtml = new Array();

 $(document).ready(function() {
  	$('#five-page').click(function() {
  		$.post('http://www.linkmay.com/index_video.php/',
  		 {page:"five-page",x:userCode}, 
  		 function(data, textStatus, xhr) {
             $('#account-balance ').text(data.accountBalance);
             $('#freeze-balance ').text(data.freezeBalance);
             $('#validity-day ').text(data.validityDay); 				
             
             var accountOperationRecordNumber = data.accountOperationRecordNumber;
             var activitySpendingRecordNumber = data.activitySpendingRecordNumber;

             for (var i = 0; i < accountOperationRecordNumber; i++) {
                 accountOperationHtml[i] = '<tr><td>'
                 +data.accountOperationTime[i]+'</td><td>'
                 +data.accountOperationType[i]+'</td><td>'
                 +data.accountOperationSymbol[i]+"<span>"
                 +data.accountOperationMoney[i]+'</span></td></tr>';                 
             };
             for (var i = 0; i < activitySpendingRecordNumber ; i++) {
                 activitySpendingHtml[i] = '<tr><td>'
                 +data.activitySpendingTime+'</td><td>'
                 +data.activitySpendingName+'</td><td>'
                 +data.activitySpendingcoding+'</td><td>'
                 +data.activitySpendingMoney+'</td></tr>'                 
             };

   		});
        paging(accountOperationRecordNumber,10,accountOperationHtml)
        $('input[name = "account-record"]:checked').change(function() {
              if ($('input[name = "account-record"]:checked').val()==1) {
               paging(accountOperationRecordNumber,10,accountOperationHtml,'account-record-sheet','account-page','account-page-previous','account-page-next')
              }else{
                paging(activitySpendingRecordNumber,10,activitySpendingHtml,'account-record-sheet','account-page','account-page-previous','account-page-next')
              }            
        });
  	});


//活动管理
var activityHtml = new Array();
$(document).ready(function() {
  	$('#six-page').click(function() {
  		$.post('http://www.linkmay.com/index_video.php/',
  		 {page:"six-page",x:userCode}, 
  		 function(data, textStatus, xhr) {
  			    $('#activity-name ').text(data.activityName);
            $('#activity-limit').text(data.activityLimit);
            $('#activity-budget').text(data.activityBudget);
            $('#already-spend').text(data.alreadySpend);
            $('#activity-time').text(data.activityTime);
            $('#creation-time').text(data.creationTime);	

    for (var i = 0; i < data.totalHistoryActivityNumber ; i++) {
      activityHtml[i]='<tr><td class="history-activity-name">'
            +data.historyActivityName[i]+'</td><td class="history-activity-money">'
            +data.historyActivityMoney[i]+'</td><td class="history-activity-stop-time">'
            +data.historyActivityStopTime[i]+'</td><td class="history-activity-share">'
            +data.historyActivityShare[i]+'</td><td class="history-activity-receive">'
            +data.historyActivityReceive[i]+'</td><td class="history-activity-confirm">'
            +data.historyActivityConfirm[i]+'</td><td class="history-activity-create">'
            +data.historyActivityCreate[i]+'</td></tr>';   
    };
    paging(data.totalHistoryActivityNumber,10,activityHtml,'history-activity','history-activity-page','activity-previous','activity-next');
               
            
  		});
	});
   //确认改变当前活动状态
	$('#confirm-change-activity-status').click(function() {
		$.post('http://www.linkmay.com/index_video.php/',
		 {btn:stopActivity,x:userCode},
		  function(data, textStatus, xhr) {
			console.log("stop activity success.");
			activityName.text("");
            activityLimit.text("");
            activityBudget.text("");
            alreadySpend.text("");
            activityTime.text("");
            creationTime.text("");
            $('#six-page').click();

		});
	});
    });


   //添加新活动

 $('#add-new-activity').click(function() {
    
      if ($('#activity-name').text() == "") {
         $('#add-new-activity').attr('data-target', '#warning');               
      }else{
         $('#add-new-activity').attr('data-target', '#add-new-activity-modal');
   }
     });
 $('#add-activity-submit').click(function() {
   $.post('http://www.linkmay.com/index_video.php/',
    { activityName:$('#add-activity-form input :eq(0)').val(), 
      activityLimit:$('#add-activity-form input :eq(1)').val(), 
      activityBudget:$('#add-activity-form input :eq(2)').val(),
      x:userCode},
     function(data, textStatus, xhr) {
      $('#six-page').click();      
   });
 });


//店铺信息
$('#seven-page').click(function() {
$.post('http://www.linkmay.com/index_video.php/',
    {page:"seven-page",x:userCode}, 
   function(data, textStatus, xhr) {
   	    $('#store-icon').attr('src', data.userIcon); 
        $('#store-name').val(data.userName);
        $('#store-status').val(data.storeStatus);
        $('#store-telephone').val(data.storeTelephone);
        $('#parking-intro').val(data.parkingIntro);
        $('#nearby-intro').val(data.nearbyIntro);
        $('#wifi-account').val(data.wifiAccount);
        $('#wifi-password').val(data.wifiPassword);
        $('#store-adress').val(data.storeAdress);
        $('#store-intro').text(data.storeIntro);
   });
//修改button
   $('#change-store-intro-btn').click(function( ) {
   	 if ($('#change-store-intro-btn').text()==="修改") {
   	 	$('.store-intro-input').removeAttr("disabled");
   	    $('#change-store-intro-btn').text("确认");
   	 
   	 }else{
   	    $('#change-store-intro-btn').attr('data-target', '#store-intro-change-modal');	
   	 }
   });
     
     $('#confirm-store-change').click(function( ) {
   	 $('.store-intro-input').attr("disabled","disabled");
   	 $('#change-store-intro-btn').text("修改");
   	 $('#change-store-intro-btn').removeAttr('data-target')
   	 $.post('http://www.linkmay.com/index_video.php/', 
   	 	{  
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
   	 	  }, 
   	 	function(data, textStatus, xhr) {
   	 		$('#navbar-user-name').val(data.userName);
   	 		$('#navbar-user-icon').attr('src', data.userIcon);
   	 	
   	 });

   });
   $('#cancel-store-change').click(function() {
      $('#seven-page').click();

   });
});



//分页函数 
function paging(totalCommentNumber,eachPageNumber,html,pageId,commentDivId,previousId,nextId){ 
          var y = "";
          var pageTotalNumber ="";
          var pageNumberHtml ="";
          var commentPageHtml = new Array() ;        
          pageTotalNumber = Math.ceil( totalCommentNumber/eachPageNumber );
    //每一页评论
          for (var x = 0; x < pageTotalNumber; x++) {
             commentPageHtml[x] = "";
            for (var z = 0; z < eachPageNumber && z+eachPageNumber*x<totalCommentNumber; z++) {
               commentPageHtml[x]+=html[x*eachPageNumber+z];  
             }; 
          };
    //
       $('#'+commentDivId+'').html(commentPageHtml[0]);
           //分页控件
         //绘制初始的分页标签
           if (pageTotalNumber <9) {
                y = pageTotalNumber;
           }else{
                y = 8;
           }
            for (var i = 0; i < y ; i++) {
              pageNumberHtml+='<li  class=" "><a href="#" id="'+i+'Number" >'+(i+1)+'</a></li>';
            };
            $('#'+pageId+' li:eq(0)').after(pageNumberHtml);  //将标签html代码插入
 //给8个页面数字按钮绑定click函数
click(1);
click(2);
click(3);
click(4);
click(5);
click(6);
click(7);
click(8);

//点击展示该页评论的函数
   
function click(i){
$('#'+pageId+' a:eq('+i+')').click(function() {    //利用8个位置的点击做选择器
      var j =parseInt($('#'+pageId+' a:eq('+i+')').text());    //取出页面数字
     if ($('#'+pageId+' a:eq('+i+')').text()>5&&$('#'+pageId+' a:eq('+i+')').text()<pageTotalNumber-2)   
     { 
        $('#'+pageId+' a:eq(1)').text(j-4);
        $('#'+pageId+' a:eq(2)').text(j-3);
        $('#'+pageId+' a:eq(3)').text(j-2);
        $('#'+pageId+' a:eq(4)').text(j-1);
        $('#'+pageId+' a:eq(5)').text(j);
        $('#'+pageId+' a:eq(6)').text(j+1);
        $('#'+pageId+' a:eq(7)').text(j+2);
        $('#'+pageId+' a:eq(8)').text(j+3);
        $('#'+commentDivId+' ').html(commentPageHtml[j-1])
        $('#'+pageId+' li').attr('class', '');                           
        $('#'+pageId+' li:eq(5)').attr('class','active');
     }else if($('#'+pageId+' a:eq('+i+')').text()>pageTotalNumber-3){
              $('#'+commentDivId+' ').html(commentPageHtml[j-1])
              $('#'+pageId+' li').attr('class', '');                           
                  if ($('#'+pageId+' a:eq('+i+')').text() == pageTotalNumber ) {
                    $('#'+pageId+' li:eq(8)').attr('class','active');
                  }else if($('#'+pageId+' a:eq('+i+')').text() == pageTotalNumber-1 ){
                    $('#'+pageId+' li:eq(7)').attr('class','active');

                  }else{
                      $('#'+pageId+' li:eq(6)').attr('class','active');
                  }
                  $('#'+pageId+' a:eq(1)').text(pageTotalNumber-7);
                  $('#'+pageId+' a:eq(2)').text(pageTotalNumber-6);
                  $('#'+pageId+' a:eq(3)').text(pageTotalNumber-5);
                  $('#'+pageId+' a:eq(4)').text(pageTotalNumber-4);
                  $('#'+pageId+' a:eq(5)').text(pageTotalNumber-3);
                  $('#'+pageId+' a:eq(6)').text(pageTotalNumber-2);
                  $('#'+pageId+' a:eq(7)').text(pageTotalNumber-1);
                  $('#'+pageId+' a:eq(8)').text(pageTotalNumber);
     }else{   
                  $('#'+pageId+' a:eq(1)').text(1);
                  $('#'+pageId+' a:eq(2)').text(2);
                  $('#'+pageId+' a:eq(3)').text(3);
                  $('#'+pageId+' a:eq(4)').text(4);
                  $('#'+pageId+' a:eq(5)').text(5);
                  $('#'+pageId+' a:eq(6)').text(6);
                  $('#'+pageId+' a:eq(7)').text(7);
                  $('#'+pageId+' a:eq(8)').text(8);

             $('#'+commentDivId+' ').html(commentPageHtml[j-1]);

             $('#'+pageId+' li').attr('class', '');                           
             $('#'+pageId+' li:eq('+j+')').attr('class','active');
     }
});
}
//上一页
$('#'+previousId+'').click(function( ) {
    $('#'+pageId+' a:eq('+(parseInt($('#'+pageId+' .active a').attr('id')))+'  )').click();   
});  


//下一页
$('#'+nextId+'').click(function( ) {
    $('#'+pageId+' a:eq('+( parseInt ($('#'+pageId+' .active a').attr('id'))+2)+'  )').click()
});  
   }
 })


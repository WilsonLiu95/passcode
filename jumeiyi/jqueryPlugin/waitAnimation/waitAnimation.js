;(function($) {
	//绑定在父级元素上
  $.fn.waitAnimation = function (options) {
  	// 用户设置覆盖默认设置
  	var opts = $.extend({}, $.fn.waitAnimation.defaults,options);
  	return this.each(function(options) {
  		var $this = $(this);
      waitFunc.waitDomHtml(opts.successWord,opts.failWord);
  		$this.on('click','.'+opts.clickElClass, function(event) {
  			event.preventDefault();
  			/* Act on the event */
  			waitFunc.clickShow();
  		});
  	});
  };
  $.fn.waitAnimation.judgeStatus = function (ajaxStatus) {
    if (ajaxStatus == 1) {
     	$('#wait-icon-rotate').hide();
     	$('#wait-fail').hide();
	    $('#wait-complete').show();
	} else{
		  $('#wait-icon-rotate').hide();
		  $('#wait-fail').show();
	}
	waitFunc.animationEnd();
};
  $.fn.waitAnimation.defaults = {
  	clickElClass: "",
    successWord: "成功",
    failWord: "失败",
  };

    // 封装
  var waitFunc = {
  	//制作DOM元素waitbody
    waitDomHtml: function (successWord,failWord) {
			var waitBody = $("<div></div>").attr('id','wait-body');
			var waitDiv = $("<div></div>").attr('id','wait-div');
			waitDiv.appendTo(waitBody);
			var waitIconRotate = $("<ul></ul>").attr('id','wait-icon-rotate');
			for (var i = 0; i <10 ; i++) {
				waitIconRotate.append('<li class="wait-list-item"></li>');
			}
			var waitComplete = $("<div></div>").attr('id','wait-complete');
			waitComplete.append('<i class="icon-checkmark"></i><p>' + successWord + '</p>');
			var waitFail = $("<div></div>").attr('id','wait-fail').text(failWord);
		  waitDiv.append(waitIconRotate,waitComplete,waitFail);
		  waitBody.appendTo($('body'));
      },
   	// 点击触发等待动画
   	clickShow: function () {
		  var waitDivTop = $(window).scrollTop() + $(window).height()*0.5 -100;
		  $('#wait-div').css('top', waitDivTop+'px');//设置wait-div的top距离，以适应屏幕的滑动
		  $('#wait-body').css('height',$(document).height());//设置wait-body的高度为文档高度
		  $('#wait-body').show();//等待背景
		  $('#wait-icon-rotate').show();//旋转图像展示

   	},
    animationEnd: function () {
    	setTimeout(function(){
			 	$('#wait-body').hide();
			 	$('#wait-complete').hide();
			 	$('#wait-fail').hide();
			    },1000);//等待完成，无论成功失败。显示结果1s
}
};
})(jQuery);

// 触发样例
$('div').waitAnimation({
	clickElClass: "exchange-btn",
	successWord:"success",
	failWord:"fail",
});

// 后台返回数据 1后
$('.exchange-btn').on("click",function(){
  var status = Math.floor(Math.random()*2);
  setTimeout(function(){$('div').waitAnimation.judgeStatus(status)},1000);
})

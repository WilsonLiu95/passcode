$('.exchange-btn').on('click', function(event) {
	event.preventDefault();
    // $.post('data.php', 
    // 	{'giftNumber':$(this).attr('id'),},
    //     function(data, textStatus, xhr) {
    // 	/*optional stuff to do after success */
    // 	var data = $.parseJSON(data);
    //     toggleJudge(data.status);
      toggleJudge(Math.floor(2*Math.random())); 
    });
var btnClick = function () {

	$.post('data.php', 
		{'giftNumber':$(this).attr('id'),},
	  function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		var data = $.parseJSON(data);
	  toggleJudge(data.status);// toggleJudge(Math.floor(2*Math.random()));

})
};
// 根据返回状态显示不同图像
var toggleJudge = function (status){	
  var waitDivTop = $(window).scrollTop() + $(window).height()*0.5 -100;
  $('#wait-div').css('top', waitDivTop+'px');//设置wait-div的top距离，以适应屏幕的滑动
  $('#wait-body').css('height',$(document).height());//设置wait-body的高度为文档高度
  $('#wait-body').show();
  $('#wait-icon-rotate').show();//每次展示
  setTimeout(function(){
  	if (status == 1) {
     	$('#wait-icon-rotate').hide();
     	$('#wait-fail').hide();
	    $('#wait-complete').show();
	}else{
	  $('#wait-icon-rotate').hide();	  
	  $('#wait-fail').show();
	}} ,500)//无论响应速度快慢，默认最低等待0.5s
  setTimeout(function(){
 	$('#wait-body').hide();
 	$('#wait-complete').hide();
 	$('#wait-fail').hide();
    },1000);//等待完成，无论成功失败。显示结果1s
  };

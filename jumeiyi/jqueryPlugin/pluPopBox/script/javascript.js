;(function($) {
  $.fn.pluPopFun = function(options) {
      // 用户设置覆盖默认设置
      var opts = $.extend({}, $.fn.pluPopFun.defaults, options);
      return this.each(function() {
        var $this = $(this);
        popFunc.popDomCreate(opts.title, opts.article, opts.btn); //制作pop-box元素
        $this.on('click', '.'+ opts.clickElClass, function(event) {
          event.preventDefault();
          /* Act on the event */
          // 每次点击后检测滑动距离重新赋予高度
          var pluBoxTop = $(window).scrollTop() + $(window).height() * 0.5 -100;
          $('.plu-box').css('top', pluBoxTop + 'px'); //设置top距离，以适应屏幕的滑动
          $('.plu-pop-box').css('height', $(document).height()); //设置高度为文档高度
          popFunc.clickShow(); //点击clickElClass显示
        });
        $('.plu-pop-btn').on('click', function(event) {
          event.preventDefault();
          popFunc.clickEnd();
        }); //点击消失
      });
    };
    //默认设置
  $.fn.pluPopFun.defaults = {
      clickElClass: "",
      title: "提示",
      artcle: "未添加内容,请检查是否输入参数",
      btn: ['code review'],
      height:true,//true显示为少量文字，false显示为大量文字
    };
    //封装函数
  var popFunc = {
    popDomCreate: function(title, article, btn) {
      //制作盒子
      var pluPopBox = $("<div></div>").attr('class', 'plu-pop-box');
      var pluBox = $("<div></div>").attr('class', 'plu-box');
      pluBox.appendTo(pluPopBox);
      //制作header
      var pluHeader = $("<div></div>").attr('class', 'plu-header');
      pluHeader.append('<em>' + title + '</em><textarea id=“plu-textarea”>' + article + '</textarea>');
      pluHeader.appendTo(pluBox);
      //制作footer
      var pluBtnFooter = $("<ul></ul>").attr('class', 'plu-btn-footer');
      var btnNum = btn.length;
      for (var i = 0; i < btnNum; i++) {
        pluBtnFooter.append('<li class="plu-pop-btn">' + btn[i] + '</li>');
      }
      pluBtnFooter.appendTo(pluBox);
      //将生成的HTML结构插入Body中
      pluPopBox.appendTo('body');
      //根据btnNum的数字 动态分配每个元素的宽度
      $('.plu-btn-footer .plu-pop-btn').css('width', 96 / btnNum + '%');
    },
    //点击显示
    clickShow: function() {
      $('.plu-pop-box').css('display', 'block');
    },
    //点击消失
    clickEnd: function() {
      $('.plu-pop-box').css('display', 'none');
    },
  };

})(jQuery);

$('ul').pluPopFun({
  clickElClass: "test",
  title: '提示',
  article: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
  btn: ['确认', '返回'],
});

/**/
function signUpPop(triggerId) {

  var html =   '<div class="plu-bg-container">'
      +'<div class="plu-register-container">'
        +'<div class="plu-header">'
          +'<strong>请输入手机号</strong>'
          +'<img src="images/close.png" alt="X">'
        +'</div>'
        +'<form class="plu-register-form" action="" method="post">'
          +'<div>'
            +'<img src="images/user.png" alt="">'
            +'<input type="text" class="plu-user-name" placeholder="姓名">'
          +'</div>'
          +'<em>请输入姓名</em>'
          +'<div>'
            +'<img src="images/phone.png" alt="">'
            +'<input type="tel" class="plu-phone-number" placeholder="手机号">'
          +'</div>'
          +'<em>请输入正确的手机号</em>'
          +'<div>'
            +'<img src="images/security.png" alt="">'
            +'<input type="text" class="plu-security-code" placeholder="验证码">'
          +'</div>'
          +'<button type="button" id="plu-send-code">发送验证码</button>'
          +'<em>请输入正确的验证码</em>'
          +'<div class="plu-sex-choose">'
              +'<input type="radio" id="plu-sex-woman"  name="sex" value="女">'
              +'<label class="icon-venus" for="plu-sex-woman">女士</label>'
              +'<input type="radio" id="plu-sex-man" name="sex" value="男">'
              +'<label class="icon-mars" for="plu-sex-man">男士</label>'
          +'</div>'
          +'<button type="button" class="plu-form-confirm">确认</button>'
        +'</form>'
      +'</div>'
    +'</div>';
    $('body').append(html);
  //点击 triggerId 触发弹窗
  $(triggerId).on('click', function(event) {
    event.preventDefault();
    $('.plu-bg-container').addClass('plu-pop-up');
  });
  // 点击X关闭弹窗 即移除
  $('.plu-header img').on('click', function(event) {
    event.preventDefault();
    $('.plu-bg-container').removeClass('plu-pop-up');
  });
  // 点击发送验证码 倒计时60秒
  $('#plu-send-code').on('click', function(event) {
    event.preventDefault();
    var timeToEnd = 60;
    var countTime = window.setInterval(function () {
      $('#plu-send-code').text('已发送('+(timeToEnd--)+')');
      if (!timeToEnd) {
        window.clearInterval(countTime);
        timeToEnd = 60;
        $('#plu-send-code').text('重发验证码')
      }
    }, 1000);
      });
  // 点击提交验证是否为空
  $('.plu-form-confirm').on('click', function(event) {
    event.preventDefault();
    // 姓名检测 不能为空
    if (!$('.plu-user-name').val()) {
      $('.plu-register-form em').eq(0).show();
    }else {
      $('.plu-register-form em').eq(0).hide();
    }
    // 手机号码检测 不能为空
    if (!$('.plu-phone-number').val()) {
      $('.plu-register-form em').eq(1).show();
    }else {
      $('.plu-register-form em').eq(1).hide();
    }
    // 验证码检测 不能为空
    if (!$('.plu-security-code').val()) {
      $('.plu-register-form em').eq(2).css('display','block');
    }else {
      $('.plu-register-form em').eq(2).hide();
    }


  });
};
signUpPop(hah);

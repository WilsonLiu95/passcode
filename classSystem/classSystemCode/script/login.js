/*登陆页面*/
var message = {
  accountId: "loginAccount",
  passwordId: "loginPassword",
  // 郭正给！！！
  urlSend: [],
  urlJump:[],
};
// 监听提交按钮
document.querySelector('input[type=submit]').addEventListener('click',submit,false);
function submit(){
  loginIn(message);
}
function loginIn(option) {

  //封装的一些处理事件函数
  var deal = {
    // 有效验证
    valid: function(account, password) {
      // 留待扩展
      return true;
    },

    // 区分用户类型，可扩展更多验证
    difUser: function(account) {
      // 管理员以 '_'开头
      if (account.charAt(0) === '_') {
        return 0;
      } else if (account.charAt(0) === 'T') {
        // 老师以T开头
        return 1;
      } else if (account.charAt(0) === 'U') {
        // 学生以U开头
        return 2;
      } else {
        //  其他返回错误
        return false;
      }
    },

    // 区分路由
    urlRouter: function(userType) {
      switch (userType) {
        case 0:
        message.url = urlSend[0];
        break;
        case 1:
        message.url = urlSend[1];
        break;
        case 2:
        message.url = urlSend[2];
        break;
        default:
        return false;
      }
    }

  };
  // 获取用户名与密码
  var account = document.getElementById(option.accountId).value;
  var password = document.getElementById(option.passwordId).value;
    // 函数功能部分
    // 判断账户,密码是否有效。有效方可执行
  var validBool = deal.valid(account, password);
  while (validBool) {
    // 判断用户类型
    var userType = deal.difUser(account);
    //根据不同的用户类型，赋予message不同的url值  此处url必须为包含3个地址的数组
    //  有效性暂不予验证
    var finalurl = deal.urlRouter(userType);

    // 数据交互
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        if ((xhr.status >=200 && xhr.status < 300) || xhr.status == 304) {
          jsondata = JSON.parse(responseText);
          sessionStorage.setItem("userid",jsondata.userid);
          sessionStorage.setItem(userid);
          jumpToUrl(userType,option.urlJump);
        }else {
          alert("Request was unseccessful:" + xhr.status);
        }
      }
    };
    xhr.open("post", finalurl ,true);
    xhr.setRequestHeader("Content-type","application/json");
    var datas = JSON.stringify({
      userName: account,
      password: password});
    xhr.send(datas);
  }
}
// 根据用户类型跳转不同的页面
// var option = {
//   userType:0;
//   url:['http://www.wilsonliu.cn/','http://www.wilsonliu.cn/','http://www.wilsonliu.cn/']
// }
// jumpToUrl(option);
function jumpToUrl(userType,url) {
  switch (userType) {
    case 0:
      window.location.href = url[0];
      break;
    case 1:
      window.location.href = url[1];
      break;
    case 2:
      window.location.href = url[2];
      break;
    default:
      return false;
  }
}



// 注册弹窗

function submitData(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if ((xhr.status >=200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText);
      }else {
        alert("Request was unseccessful:" + xhr.status);
      }
    }
  }
  xhr.open("post", "postexample.php",true);
  xhr.setRequestHeader("Content-type","application/json");
  var form = document.getElementById("user-info");
  xhr.send(serialize(form));
}


function addURLParm(url,name,value){
  url +=(url.indexOf("?") == -1 ? "?": "&");
  url += encodeURIComponent(name) + "=" +encodeURIComponent(value);
  return url;
}




















// function ajax(option) {
//   // 默认fail函数为弹出警告
//   // option.fail = option.fail || function (errMessage) {console.log(errMessage)};
//     //option 参数必须是对象,里面包括 (type 请求方式,url 请求路径,data 请求参数)
//     if (typeof option === 'object') {
//         //option 没有定义请求url ,直接返回错误
//         if (!option.hasOwnProperty('url')) {
//           return  false;
//         }
//         //option 没有定义请求方式,默认我 get 请求
//         if (!option.hasOwnProperty('type')) {
//           option.type = 'GET';
//         }
//     } else {
//         //如果 option 不是对象,直接返回
//          return false;
//     }
//
//     var xhr = null;
//         xhr = new xhrRequest();
//         if (xhr.overrideMimeType) {
//             //针对某些特定版本的mozillar浏览器的BUG进行修正
//             xhr.overrideMimeType('text/xml');
//         }
//         //ajax 请求状态变化监听
//         xhr.onreadystatechange = function () {
//           // 成功
//           if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status ==304  ) {
//             option.responseJSON = JSON.parse(xhr.responseText);
//             option.success(option.responseJSON);
//
//           }else {
//             // 失败
//             return false;
//           }
//         };
//     //如果参数对象option 包括 data 参数对象
//     if ( option.hasOwnProperty('data')) {
//         //如果传输方式是 get 时
//         if(option.type.toLowerCase() === 'get'){
//             option.url += '?';
//             var i = 0;
//             for (var key in option.data) {
//                 option.url += i == 0 ? (key + '=' + option.data[key]) : ('&' + key + '=' + option.data[key]);
//                 ++i;
//             }
//             xhr.open(option.type.toUpperCase(), option.url, true);
//             xhr.send(null);
//         }
//         //如果传输方式是 post 时
//         if(option.type.toLowerCase() === 'post'){
//             xhr.setRequestHeader("Content-type","application/json");
//             var datas,i=0;
//             datas = JSON.stringify(option.data);
//             xhr.open(option.type.toUpperCase(), option.url, true);
//             xhr.send(datas);
//         }
//     }
//
//
// }
//
// // 使用样例
// // var option = {
// //   url: [],
// //   type: "post",
// //   data: {},
// //   success:function(JSON){},
// //   fail:function(errMessage){},
// // };
// // ajax();

/**/

// 转换页面
switchPage();
function switchPage (){
  var navList =document.querySelector('.nav-list');
  navList.addEventListener("click",
  function(event){
     var navArray = document.querySelectorAll('.nav-list a');
     var mainBodyArray = document.querySelectorAll('.main-body');
     for (var i = 0; i < 3 ;i++) {
       navArray[i].className = null;
     }
     event.target.className = "active";
     for (var i = 0; i < 2; i++) {
      mainBodyArray[i].classList.add("disappear");
      if(event.target.textContent === navArray[i].textContent){
        mainBodyArray[i].classList.remove('disappear');
     }
   }
 },
  false);
}
// 登出
logOut();
function logOut(){
  var logOutBtn =document.querySelectorAll('.nav-list a')[2];
  // 删除对话userId
  sessionStorage.setItem("userId","sss");
  // sessionStorage.removeItem("userId");
  logOutBtn.addEventListener("click",function(){window.location.href = "../login.html"},false);

}
// 课表

document.querySelectorAll('.nav-list a')[0].addEventListener("click",classScheduel,false);
function classScheduel(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if ((xhr.status >=200 && xhr.status < 300) ) {
        json = JSON.parse(responseText);
        if (json.statusCode) {
          // var json = {
          //   statusCode:0/1,
          //   data:[{
          //
          //     class:"模电",
          //     teacherName:"wislon",
          //     time:"23",
          //     duration:"3-8",
          //     place:"东九B302"},
          //     {
          //       class:"模电",
          //       teacherName:"wislon",
          //       time:"23",
          //       duration:"3-8",
          //       place:"东九B302"}]
          //   }
          var len = json.data.length;
          console.log(json.data.length);
          for (var i = 0; i < len; i++) {
            classTime = json.data[i].time;
            dayOfWeek = classTime.charAt(0);
            classSection = classTime.charAt(1) ;
            trList = document.getElementById("J_classTable").getElementsByTagName("tr");
            trList[classSection].getElementsByTagName("td")[dayOfWeek].textContent += "<" +
            json.data[i].class + json.data[i].teacherName + json.data[i].duration + "周" + json.data[i].place + ">";
          }
        }else {
        alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
      }
    }
  }
};
  // url
  xhr.open("post", url ,true);
  xhr.setRequestHeader("Content-type","application/json");
  var option = {
    "eventType":"getClass",
  };
  var datas = JSON.stringify(option);
  xhr.send(datas);


}

// 个人信息获取
document.querySelectorAll('.nav-list a')[1].addEventListener("click",infoShow,false);
function infoShow (){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if ((xhr.status >=200 && xhr.status < 300) ) {
        json = JSON.parse(responseText);
        if (json.statusCode) {
  //  测试的数据
  var json =  {
    statusCode:1,
    data: {
     userName:"Wilson",
     userCode:"U201313759",
     password:"88888888",
     academy:"电信学院",
     major:"通信工程",
     grade:"2013",
     class:"5班",
     email:"wilsonliuxyz@gmail.com",
   },
 };
 }
          for (var key in json.data) {
            if (json.data.hasOwnProperty(key)) {
              document.getElementsByClassName(key)[0].value = json.data[key];
            }
          }
        }else {
          alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
        }
      }
    };
  xhr.open("post", "http://segmentfault.com/q/1010000004225321?_ea=535327" ,true);
  xhr.setRequestHeader("Content-type","application/json");
  var option = {
    "eventType":"getInfo"
  };
  var datas = JSON.stringify(option);
  xhr.send(datas);
}

// 修改信息

document.getElementById('J_modifyInfo').addEventListener("click",modifyInfo,false);
function modifyInfo (){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if ((xhr.status >=200 && xhr.status < 300) ) {
        json = JSON.parse(responseText);
        if (json.statusCode) {
          alert("修改成功");
          }
        }
      }else {
        alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
      }
    };
  // url
  xhr.open("post", 'url' ,true);
  xhr.setRequestHeader("Content-type","application/json");
  var option = {
    "eventType":"modifyInfo",
  };
  // 获取所有表单
  for (var i = 0; i < 8; i++) {
    var cache = document.getElementById('form-student').getElementsByTagName('input')[i];
    var formInputClass = cache.getAttribute("class");
    option[formInputClass] = cache.value;
  }
  var datas = JSON.stringify(option);
  xhr.send(datas);
}

/**/
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
          var json = {
            statusCode:0/1,
            data:[{

              class:"模电",
              teacherName:"wislon",
              time:"23",
              duration:"3-8",
              place:"东九B302"},
              {
                class:"模电",
                teacherName:"wislon",
                time:"23",
                duration:"3-8",
                place:"东九B302"}]
            }
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
}
  // url
  xhr.open("post", "url" ,true);
  xhr.setRequestHeader("Content-type","application/json");
  var option = {
    "eventType":"getClass",
  }
  var datas = JSON.stringify(option);
  xhr.send(datas);


}


// document.querySelectorAll('.nav-list a')[1].addEventListener("click",function(){alert("haha")},false);
// 个人信息获取
document.querySelectorAll('.nav-list a')[1].addEventListener("click",infoShow,false);
function infoShow (){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if ((xhr.status >=200 && xhr.status < 300) ) {
        json = JSON.parse(responseText);
        if (json.statusCode) {
   测试的数据
  var json =  {
    statusCode:1,
    data: {
     userName:"Wilson",
     userCode:"U201313759",
     password:"88888888",
     academy:"电信学院",
     email:"wilsonliuxyz@gmail.com",
   },
 };

          for (var key in json.data) {
            if (json.data.hasOwnProperty(key)) {
              document.getElementsByClassName(key)[0].value = json.data[key];
            }
          }
        }else {
          alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
        }
      }
    }
  }
  xhr.open("post", "http://segmentfault.com/q/1010000004225321?_ea=535327" ,true);
  xhr.setRequestHeader("Content-type","application/json");
  var option = {
    "eventType":"getInfo",
  }
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
          alert("修改成功")
          }else {
            alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
          }
        }
      }
    }
  // url
  xhr.open("post", 'url' ,true);
  xhr.setRequestHeader("Content-type","application/json");
  var option = {
    "eventType":"modifyInfo",
  }
  // 获取所有表单
  for (var i = 0; i < 5; i++) {
    var cache = document.getElementById('form-teacher').getElementsByTagName('input')[i];
    var formInputClass = cache.getAttribute("class");
    option[formInputClass] = cache.value;
  }
  var datas = JSON.stringify(option);
  xhr.send(datas);
}




// 修改课程弹窗部分JS代码
  // 样式 保持全屏覆盖
document.getElementsByClassName("plu-wrap-back")[0].style.height =   document.body.scrollHeight +'px';

// 召唤弹窗
document.getElementById("J_modifyPopBtn").addEventListener("click",
function(){document.getElementsByClassName("plu-wrap-back")[0].classList.remove("disappear")},false);
var json = {
    statusCode: 1,
    data: [{
        class: "模电",
        duration: "3-8",
        academy: "电信",
        major: "通信工程",
        grade: "2013",
        classNo: "3-4-5",
        place: "东九B302",
        time: "01",
        classId: "01"
      }, {
        class: "模电2",
        duration: "3-8",
        academy: "电信",
        major: "通信工程",
        grade: "2013",
        classNo: "3-4-5",
        place: "东九B302",
        time: "01",
        classId: "02"
      },
      ]

    };
// 修改提交时间
  // 事件委托
document.getElementById("J_classList").addEventListener("click",
function(event,option){    // 此处option需要输入,切记
    var modifyClassBtn = event.target;
    modifyClass(modifyClassBtn);
},false);

    function modifyClass(modifyClassBtn) {
      // message为传输的数据
      var message = {
        "eventType":"modifyClass",
      }
      message.time = document.getElementById('J_dayOfWeek').value + document.getElementById('J_sectionClass').value;
      var classListItem = document.getElementsByClassName("plu-class-item")[i];
      // 赋予修改标签的class 为 classId
      message.classId = modifyClassBtn.className;
      // 先去a标签的父元素li,再取li内部的所有input标签
      var inputArray = modifyClassBtn.parentNode.getElementsByTagName("input");
      for (var i = 0; i < inputArray.length; i++) {
       message[inputArray[i].className] = inputArray[i].value;
      }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {o
          if ((xhr.status >=200 && xhr.status < 300) ) {
            json = JSON.parse(responseText);
            if (json.statusCode) {
              // 成功的话再次请求
              alert("修改成功");
            }else {
            alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
          }
        }
      }
    }
      // url
      xhr.open("post", url ,true);
      xhr.setRequestHeader("Content-type","application/json");

      var datas = JSON.stringify(message);
      xhr.send(datas);
    }





    // 查询课程
    document.getElementById('J_selectSure').addEventListener("click", function() {
      queryClass(json)
    }, false);

    function queryClass(option) {
      var selWeek = document.getElementById('J_dayOfWeek').value;
      var selClass = document.getElementById('J_sectionClass').value;
      var cacheJson = {};
      var j = 0;
      var len = option.data.length;
      // 取出所有符合的数据缓存到cacheJson中
      for (var i = 0; i < len; i++) {
        var dayOfWeek = option.data[i].time.charAt(0);
        var sectionClass = option.data[i].time.charAt(1);
        if (selWeek === dayOfWeek && selClass === sectionClass) {
          cacheJson[j] = option.data[i];
          j++;

        }
      }
      // 开始绘制另外绘制j个课程格子
      for (var i = 0; i < (j - 1); i++) {
        // 每次copy原始的表单项  li.plu-class-item
        var cacheTemplate = document.getElementsByClassName('plu-class-item')[0].cloneNode(true);
        document.getElementById("J_classList").appendChild(cacheTemplate);
      }
      // 写入数据
      for (var i = 0; i < j; i++) {
        var classListItem = document.getElementsByClassName("plu-class-item")[i];
        // 赋予修改标签的class 为 classId
        classListItem.getElementsByTagName("a")[0].className = cacheJson[i]["classId"];
        console.log(classListItem.getElementsByTagName("a")[0].className);
        for (var key in cacheJson[i]) {
          if (cacheJson[i].hasOwnProperty(key)) {
            if (classListItem.getElementsByClassName(key)[0]) {
              classListItem.getElementsByClassName(key)[0].value = cacheJson[i][key];
            }
          }
        }
      }

    }
    // 放弃修改　退出
    document.getElementById("J_abandonModify").addEventListener('click', abandonModify, false);

    function abandonModify　() {
      document.getElementsByClassName("plu-wrap-back")[0].classList.add("disappear");
    }

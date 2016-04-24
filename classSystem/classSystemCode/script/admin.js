/**/
// 用来存储 后台发送过来的院系专业等数据
var cacheClass;
// 转换页面
switchPage();

function switchPage() {
  var navList = document.querySelector('.nav-list');
  navList.addEventListener("click",
    function(event) {
      var navArray = document.querySelectorAll('.nav-list a');
      var mainBodyArray = document.querySelectorAll('.main-body');
      for (var i = 0; i < 3; i++) {
        navArray[i].className = null;
      };
      event.target.className = "active";
      for (var i = 0; i < 3; i++) {
        mainBodyArray[i].classList.add("disappear");
        if (event.target.textContent === navArray[i].textContent) {
          mainBodyArray[i].classList.remove('disappear');
        };
      }
    },
    false);
}
// 登出
logOut();

function logOut() {
  var logOutBtn = document.querySelectorAll('.nav-list a')[3];
  // 删除对话userId
  sessionStorage.setItem("userId", "sss");
  // sessionStorage.removeItem("userId");
  logOutBtn.addEventListener("click", function() {
    window.location.href = "../login.html"
  }, false);

}


// 获取院系专业年级班级信息
// 开启页面自动启动
// window.onload = getSelectData();
function getSelectData() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300)) {
          json = JSON.parse(responseText);
          if (json.statusCode) {
            // 注意了 把数据缓存在cacheClass里了，查询老师和学生页面的时候需要用到
            cacheClass = json;
            // 获取数据再传输给处理数据的函数
            dealSelectData(json,"sel-academy","sel-major","sel-grade","sel-class");
          }
        }
      } else {
        alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
      }
    }
    // url
  xhr.open("post", 'url', true);
  xhr.setRequestHeader("Content-type", "application/json");
  var option = {
    "eventType": "getSelectData",
  }
  var datas = JSON.stringify(option);
  xhr.send(datas);
}
// 获得院系后数据处理部分  触发在getSelectData函数中   在学生部分重用
  //  课表部分填充
dealSelectData("waitWrite","sel-academy","sel-major","sel-grade","sel-class"); //waitWrite 待填充
// 学生部分填充
dealSelectData("waitWrite","sel-academy-stu","sel-major-stu","sel-grade-stu","sel-class-stu");
// 抽象为课表与学生 两个页面共用
function dealSelectData(option,selacademy,selmajor,selgrade,selclass) { //等下将option改为json
  var json = {
    statusCode: 1,
    data: [{
      academy: "电信学院",
      majors: [{
        major: "通信工程",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }, {
        major: "电子信息",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }]
    }, {
      academy: "新闻学院",
      majors: [{
        major: "广告传播",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }, {
        major: "播音学院",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }]
    }, {
      academy: "机械学院",
      majors: [{
        major: "机械工程",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }, {
        major: "机械设计",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }]
    }, {
      academy: "人文学院",
      majors: [{
        major: "社会科学",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }, {
        major: "人文造人",
        grades: [{
          grade: 12,
          classNum: 6
        }, {
          grade: 13,
          classNum: 6
        }, {
          grade: 14,
          classNum: 6
        }]
      }]
    }, ]
  }; //伪造的测试数据
  // !!!!!!!                   此处测试用缓存过来 创造数据
  cacheClass = json;
  // 处理函数封装
  var selDealFun = {
      selAcademyFun: function(json) { //院系数据处理
        var fragment = document.createDocumentFragment();
        var selAcademy = document.getElementsByClassName(selacademy)[0];
        var selOption = null;
        for (var key in json.data) {
          if (json.data.hasOwnProperty(key)) {
            selOption = document.createElement("option");
            selOption.appendChild(document.createTextNode(json.data[key].academy));
            selOption.setAttribute("value", json.data[key].academy);
            fragment.appendChild(selOption);
          }
        }
        selAcademy.innerHTML = null;
        selAcademy.appendChild(fragment);
      },
      // 同时返回被选择的专业的数据
      selMajorFun: function(json) {
        var selAcademy = document.getElementsByClassName(selacademy)[0];
        selAcademy.addEventListener("click",
          function(event) {
            for (var i = 0; i < json.data.length; i++) {
              // 如果找到相同的院系则应该跳出去并返回当前对象
              if (json.data[i].academy === event.target.value) {

                var len = json.data[i].majors.length;
                // 制造代码碎片容器
                var fragment = document.createDocumentFragment();
                var selMajor = document.getElementsByClassName(selmajor)[0];
                selMajor.innerHTML = null;
                var selOption = null;
                for (var j = 0; j < len; j++) {
                  var selOption = document.createElement("option");
                  selOption.appendChild(document.createTextNode(json.data[i].majors[j].major));
                  selOption.setAttribute("value", json.data[i].majors[j].major);
                  fragment.appendChild(selOption);
                }
                selMajor.appendChild(fragment);

                // 嵌套selDealFun.selGradeFun函数进来!!!注意危险
                selDealFun.selGradeFun(json.data[i].majors);
                console.log(json.data[i].majors);
              }
            }

          }, false);
      },
      selGradeFun: function(majors) {
        document.getElementsByClassName(selmajor)[0].addEventListener("click",
          function() {
            for (var i = 0; i < majors.length; i++) {
              if (majors[i].major === document.getElementsByClassName(selmajor)[0].value) {
                var len = majors[i].grades.length;
                console.log(majors[i].grades);
                var fragment = document.createDocumentFragment();
                var selGrade = document.getElementsByClassName(selgrade)[0];
                selGrade.innerHTML = null;
                for (var j = 0; j < len; j++) {
                  var selOption = document.createElement("option");
                  selOption.appendChild(document.createTextNode(majors[i].grades[j].grade));
                  selOption.setAttribute('value', majors[i].grades[j].grade);
                  fragment.appendChild(selOption);
                }
                selGrade.appendChild(fragment);
                // 注意插入了selClassFun ,危险
                selDealFun.selClassFun(majors[i].grades);
              }
            }
          }, false)
      },
      selClassFun: function(grades) {
        document.getElementsByClassName(selgrade)[0].addEventListener("click",
          function() {
            for (var i = 0; i < grades.length; i++) {
              // 此处有坑,班级数为数字,可是不确定是否会强制转换为数字,为了容错,所有此处没有用绝对相等
              if (grades[i].grade == document.getElementsByClassName(selgrade)[0].value) {
                var len = grades[i].classNum;
                var fragment = document.createDocumentFragment();
                var selClass = document.getElementsByClassName(selclass)[0];
                selClass.innerHTML = null;
                for (var j = 1; j <= len; j++) {
                  var selOption = document.createElement("option");
                  // 班级数从1开始
                  selOption.appendChild(document.createTextNode(j));
                  selOption.setAttribute('value', j);
                  fragment.appendChild(selOption);
                }
                selClass.appendChild(fragment);
              }
            }

          }, false)
      },
    } //封装的函数对象结束之处

  // 函数功能部分
  // 立刻执行插入院系
  selDealFun.selAcademyFun(json);
  //  启动监听院系变换,已防止重复遍历消耗性能
  selDealFun.selMajorFun(json);
  // 之后的专业，年级监听在selDealFun里嵌套
}



// 监听 确认 获取当前选择的信息发送给后台   在学生部分重用
document.getElementById('J_sendSelData').addEventListener("click",
function(){
  sendSelData("J_selectList","getClass",getClassScheduel)  //注意填充数据
} , false);

// 监听 确认 获取当前选择的信息发送给后台 学生信息查询
document.getElementsByClassName('getStudentBtn')[0].addEventListener("click",
function(){
  sendSelData("J_selectListStu","getStudentList",getStudentList)  //getStudentList为学生列表获取函数
} , false);
// 抽象为变量输入
function sendSelData(J_selectList,eventType,funCallback) {
  var selectArray = document.getElementById(J_selectList).getElementsByTagName('select');
  var selData = {
      eventType: eventType,
      data: {},
    }
    // 发送状态。用来检测数据是否正确，防止错误数据的提交
  var sendState = 1;
  // 遍历4个选项，获取值
  for (var i = 0; i < 4; i++) {
    selData.data[selectArray[i].name] = selectArray[i].value;
    if (!selectArray[i].value) {
      sendState = 0;
    }
  }
  // 触发发送数据,前提是sendState不为0.即数据有效
  if (sendState) {
    funCallback(selData);
  }
}

// 触发在sendSelData函数中，json为传输的数据对象
function getClassScheduel(json) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300)) {
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
          //       time:"12",
          //       duration:"3-8",
          //       place:"东九B302"}]
          //   }
          var len = json.data.length;
          console.log(json.data.length);
          // 在嵌入数据之前，把表格置空
          var tdList = document.getElementById('J_classTable').getElementsByTagName('td');
          tdListLen = tdList.length;
          for (var i = 0; i < tdListLen; i++) {
            // 置空
            tdList[i].innerHTML = null;
          }
          for (var i = 0; i < len; i++) {
            classTime = json.data[i].time;
            dayOfWeek = classTime.charAt(0);
            classSection = classTime.charAt(1);
            trList = document.getElementById("J_classTable").getElementsByTagName("tr");
            trList[classSection].getElementsByTagName("td")[dayOfWeek].textContent += "<" +
              json.data[i].class + json.data[i].teacherName + json.data[i].duration + "周" + json.data[i].place + ">";
          }

        } else {
          alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
        }
      }
    }
  }
    // url
    xhr.open("post", "url", true);
    xhr.setRequestHeader("Content-type", "application/json");
    // json来自于函数的入口传入
    var datas = JSON.stringify(json);
    xhr.send(datas);
  }



// 修改课程弹窗部分JS代码
// 样式 保持全屏覆盖
document.getElementsByClassName("plu-wrap-back")[0].style.height = document.body.scrollHeight + 'px';

// 召唤弹窗
document.getElementById("J_modifyPopBtn").addEventListener("click",
  function() {
    document.getElementsByClassName("plu-wrap-back")[0].classList.remove("disappear")
  }, false);
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
  }, ]

};
// 修改提交时间
// 事件委托
document.getElementById("J_classList").addEventListener("click",
  function(event, option) { // 此处option需要输入,切记  现在忘记了 这个option干嘛用的。。。。注释不够呀。。
    var modifyClassBtn = event.target;
    modifyClass(modifyClassBtn);
  }, false);

function modifyClass(modifyClassBtn) {
  // message为传输的数据
  var message = {
    "eventType": "modifyClass",
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
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300)) {
        json = JSON.parse(responseText);
        if (json.statusCode) {
          // 成功的话再次请求
          alert("修改成功");
        } else {
          alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
        }
      }
    }
  }
    // url
    xhr.open("post", "url", true);
    xhr.setRequestHeader("Content-type", "application/json");

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




// 个人信息查询部分

 // 老师部分   首先构造院系选择select
 teaAcademySel(cacheClass);
 function teaAcademySel (json) { //院系数据处理
   var fragment = document.createDocumentFragment();
   var selAcademy = document.getElementsByClassName("info-sel-department")[0];
   var selOption = null;
   for (var key in json.data) {
     if (json.data.hasOwnProperty(key)) {
       selOption = document.createElement("option");
       selOption.appendChild(document.createTextNode(json.data[key].academy));
       selOption.setAttribute("value", json.data[key].academy);
       fragment.appendChild(selOption);
     }
   }
   selAcademy.innerHTML = null;
   selAcademy.appendChild(fragment);
 }

//点击确认按钮
document.getElementById('J_getTeacherList').addEventListener("click",getTeacherList,false);
 // 发送院系数据并接收数据填充
 function getTeacherList(){
   var academy = document.getElementsByClassName('info-sel-department')[0].value;
   var option = {
     eventType:"getTeacherList",
     data:{academy:academy}

   }
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
       if ((xhr.status >= 200 && xhr.status < 300)) {
         json = JSON.parse(responseText);
         if (json.statusCode) {
           var len = json.data.length;
           var fragment = document.createDocumentFragment();
           // 另外制造len-1个项目
           for (var i = 1; i < len - 1; i++) {
             var cacheTemplate = document.getElementsByClassName("teacher-list-item")[0].cloneNode(true);
             fragment.appendChild(cacheTemplate);
           }
           document.getElementById('J_teacherList').appendChild(fragment);
           // 填充信息
           for (var i = 0; i < len; i++) {
             var listItem = document.getElementsByClassName("teacher-list-item")[i];
             listItem.getElementsByTagName("span")[0].innerHTML = json.data[i].userName;
             listItem.getElementsByTagName("strong")[0].innerHTML = json.data[i].userCode;
            //  给a的name附上一个 index 好标示
             listItem.getElementsByTagName("a")[0].getAttribute('name') = i;
           }
          // 弹窗控制函数
          modifyTeacher(json)

         } else {
           alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
         }
       }
     }
   }
     // url
     xhr.open("post", "url", true);
     xhr.setRequestHeader("Content-type", "application/json");
     var datas = JSON.stringify(option);
     xhr.send(datas);
 }
 // 修改老师信息 在getTeacherList中调用
 modifyTeacher({})
 function modifyTeacher(option){
   document.getElementById('J_teacherList').addEventListener("click",
     function(event){
       if (event.target.className = "modifyTeacherBtn") {
         var indexTeacher = + event.target.name;
        //  填充数据
         document.getElementsByClassName('plu-teacher')[0].classList.remove("disappear");
         var form = document.getElementsByClassName('plu-teacher')[0].getElementsByClassName('plu-add-form')[0];
         var len = form.getElementsByTagName('input').len;
         for (var i = 0; i < len; i++) {
           form.getElementsByTagName('input')[i].value =
           option.data[indexTeacher][form.getElementsByTagName('input')[i].name];
         }
       }
       document.getElementsByName("J_pluTeaExit")[0].addEventListener("click",
         function(){
           document.getElementsByClassName('plu-teacher')[0].classList.add("disappear");
         },false);
    //  点击确认修改 触发提交
       document.getElementsByName("J_pluTeaSub")[0].addEventListener("click",
       function(){
         var xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function() {
           if (xhr.readyState == 4) {
             if ((xhr.status >= 200 && xhr.status < 300)) {
               json = JSON.parse(responseText);
               if (json.statusCode) {
                 document.getElementsByClassName('plu-teacher')[0].classList.add("disappear");
                 alert("修改成功");
               } else {
                 alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
               }
             }
           }
         }
           // url
           xhr.open("post", "url", true);
           xhr.setRequestHeader("Content-type", "application/json");
           //获取form表格数据
           var message = {eventType:"modifyTeacherInfo"};
           var form = document.getElementsByClassName('plu-teacher')[0].getElementsByClassName('plu-add-form')[0]
           for (var i = 0; i < len; i++) {
             message.data[form.getElementsByTagName('input')[i].name] = form.getElementsByTagName('input')[i].value;
           }
           var datas = JSON.stringify(message);
           xhr.send(datas);
       },false);
 })
}
//getStudentList 获取学生的列表 触发在之前sendSelData内部以回调函数存在 参数为院系选择结果
function getStudentList(selData){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300)) {
        json = JSON.parse(responseText);
        if (json.statusCode) {
          // 原来有1个，所以减一
          var len = json.data.length;
          var fragment = document.createDocumentFragment();
          // 另外制造len-1个项目
          for (var i = 1; i < len-1; i++) {
            var cacheTemplate = document.getElementsByClassName("student-list-item")[0].cloneNode(true);
            fragment.appendChild(cacheTemplate);
          }
          document.getElementById('J_studentList').appendChild(fragment);
          // 填充信息
          for (var i = 0; i < len; i++) {
            var listItem = document.getElementsByClassName("student-list-item")[i];
            listItem.getElementsByTagName("span")[0].innerHTML = json.data[i].userName;
            listItem.getElementsByTagName("strong")[0].innerHTML = json.data[i].userCode;
          }
          // 弹窗修改函数
          modifyStudent(json);
        } else {
          alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
        }
      }
    }
  }
    // url
    xhr.open("post", "url", true);
    xhr.setRequestHeader("Content-type", "application/json");
    // json来自于函数的入口传入
    var datas = JSON.stringify(selData);
    xhr.send(datas);

}
// 修改老师信息 在getTeacherList中调用
modifyStudent({})
function modifyStudent(option){
  document.getElementById('J_studentList').addEventListener("click",
    function(event){
      if (event.target.className = "modifyStudentBtn") {
        var indexStudent = + event.target.name;
       //  填充数据
        document.getElementsByClassName('plu-student')[0].classList.remove("disappear");
        var form = document.getElementsByClassName('plu-student')[0].getElementsByClassName('plu-add-form')[0];
        var len = form.getElementsByTagName('input').len;
        for (var i = 0; i < len; i++) {
          form.getElementsByTagName('input')[i].value =
          option.data[indexStudent][form.getElementsByTagName('input')[i].name];
        }
      }
      document.getElementsByName("J_pluStuExit")[0].addEventListener("click",
        function(){
          document.getElementsByClassName('plu-student')[0].classList.add("disappear");
        },false);
   //  点击确认修改 触发提交
      document.getElementsByName("J_pluStuSub")[0].addEventListener("click",
      function(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300)) {
              json = JSON.parse(responseText);
              if (json.statusCode) {
                document.getElementsByClassName('plu-student')[0].classList.add("disappear");
                alert("修改成功");
              } else {
                alert("网站出现BUG，请重新操作。服务器BUG码：" + xhr.status);
              }
            }
          }
        }
          // url
          xhr.open("post", "url", true);
          xhr.setRequestHeader("Content-type", "application/json");
          //获取form表格数据
          var message = {eventType:"modifyStudentInfo"};
          var form = document.getElementsByClassName('plu-student')[0].getElementsByClassName('plu-add-form')[0]
          for (var i = 0; i < len; i++) {
            message.data[form.getElementsByTagName('input')[i].name] = form.getElementsByTagName('input')[i].value;
          }
          var datas = JSON.stringify(message);
          xhr.send(datas);
      },false);
})
}

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
        if (xhr.readyState == 4) {
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
      // url
      xhr.open("post", url ,true);
      xhr.setRequestHeader("Content-type","application/json");

      var datas = JSON.stringify(message);
      xhr.send(datas);
    }
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

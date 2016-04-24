#等待插件说明  
函数名为$.fn.waitAnimation()。  
绑定在希望被点击的元素的父元素上，采用on事件委托。  
默认参数为：

    { clickElClass: "",
      successWord: "成功",
      failWord: "失败",   
      }
可自行输入，点击元素的class值,事件成功后显示的文字，失败后的文字。

另外因需要ajax请求，所以对于后台的响应情况，另外设置了一个函数。  

    $.fn.waitAnimation.judgeStatus(status);  
当后台返回数据时默认0为失败，1位成功。只能接收2种状态。
注：fonts里为字体图标，不可删除。

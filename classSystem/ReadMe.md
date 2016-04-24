## 项目介绍
软件课设的要求，让我们做一个课表管理系统。具体要求在课设指导书中。

## 项目进程

  因为是课设，时间不紧，而且本身在校外实习，所以一直拖，中间商量了几次页面，最后12.24才开工，
因为我1.14号要去qunar报到实习。所有跨年夜都在辛苦的码代码。码到了2016.1.1号停工。

##  项目技术选型
  因为一直没有真正在项目中全部抛弃框架类库，完全使用原生js进行开发，所以想这次既不赶工期又不要求
各种兼容性等等问题。所有开始了原生js的开发。
##  开发过程
  一开始考虑到兼容到IE8，所以拿出了《Javascript高级程序设计》这本书，把所有兼容的代码都抄了上去。
然后开始玩。然后开始封装一些ajax等函数。就这样抄了蛮久。后来发现老是出现抄错的现象。所以干脆先全
部去掉了。然后，其实并没有和后台真正的数据交互过，所以ajax部分封装后也不知道有没有用。后来也去掉
了 干脆直接写~so这部分代码有重复。
  然后一开始考虑到班上许多人没有进行过web开发，所以想把所有的组件都自己实现并封装起来，同时考虑扩展性。
因为怕他们的业务逻辑与我的业务逻辑有差别。so 光是一个登陆页面的js代码我就做了1天。当然我也是真的非常
认真去考虑代码质量与代码组织方式。按照jquery插件的形式去组织。同时，尽量预留出接口。但是后来发现，开发
进度实在是太慢，特别考虑到各种特殊情况，所有代码的健壮性要求拔高太多，开发进度严重降低。所以在开发了一天后，
就放弃了这个给其他同学封装的想法（事实证明，放弃是对的，同学们都是用php直接嵌入在html代码~）。
  html与css写了2天完成，剩下的时间都是在写js。不得不说js虽然看了许多。但是真正用起来的时候，很多
API就忘了。远不如jQuery用起来爽。所以在写js第2个晚上，我一度想放弃js并引入jQuery。所以找了一个师兄
聊天，他鼓励我越是感觉到困难的时候，越是你面临突破的时候，熬过去就能够大大提升自己。所以，我回来就
把引入的jQuery给删了，继续写js。
  事实证明，当初的选择是对的。通过这次原生js的应用，我加深了对js的理解，同时通过边红宝书边敲代码的
方式，不断的熟悉js。最后，因为时间的限制砍掉了一些功能~也选择性的忽略一些特殊情况下的代码错误。
  终于，在跨年夜后完成了代码，经历了一个星期的朝7晚2的生活。身体一度虚弱，但是还是要面对接下来的
密集考试。
  13号考完试，当晚开始与后台联调到凌晨5点钟，才回寝室睡觉。然后第二天9点多去老师那答辩，晚上坐飞机
到北京~

## 开发后记
每次你感到艰难的时候，正是你突破的关口，冲过去，便上了一个层次。
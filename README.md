# IDcardExtensionApp
身份证插件和芯片个人化谷歌插件   (不想上传图片，详情可以看    身份证读取和印章芯片个人化谷歌插件集成开发.pdf)
一：谷歌插件和外接硬件设备交互步骤和原理
注：这里只做一个demo  通过网页调用插件来连接exe与硬件交互
安装步骤：
1.环境安装：
1.1 chrome浏览器打包插件程序

插件目录的文件：

1.2 安装插件和exe交互的host环境，点击install.bat即安装完成

1.3安装读卡器或外接硬件设备驱动（身份证插件已绝大多数读卡器）
致此环境已安装完成；可试运行在页面看效果；
2.网页数据，谷歌插件，可执行文件exe，硬件设备交互流程和原理

2.1.页面的数据只会跟插件交互；安装插件后，可将网页数据通过js事件发送给插件；
2.1.1：页面加载时同时检测插件并监听插件

2.1.2：点击身份证读卡时，向插件发送数据或者指令；

2.1.3：content.js监听到网页的发出事件并向background.js发送指令（json格式）要开启长连接：



2.1.4：background.js将指令数据发送给可执行文件exe；通过（native message以json数据格式）数据的大小要控制；图片可转换为base64字符串；


2.1.5：exe：处理完成之后也会返回json字符串；然后取得里面的数据输出到页面上

交互流程如下图：



源码地址：https://github.com/yichen520/IDcardExtensionApp

注意：

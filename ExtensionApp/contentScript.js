'use strict';

{
    var extensionNode;
    var extensionCommandNode;
    var extensionResponseNode;
    var port;

    const Command_EXIT = 0;//退出
    const Command_IDCARD_READ = 1;//读卡
    const Command_SEAL_PERSONAL = 2;//个人化
    const Command_SEAL_VERIFY = 3;//在线验证
    const Command_SEAL_PROC_PERCENT = 4;//返回操作进度
    const Command_SEAL_PERSONAL_DATA = 5;//个人化发送数据
    const  Command_SEAL_DATA_REVOKE = 6;//个人化注销
    const  Command_SEAL_REVOKE_DATA = 7;//个人化注销数据


    //安装插件到目标页面中
    function installExtension() {
        createExtensionNode();
        registReadCardEvent();
        registPersonalEvent();
        registSealVerifyEvent();
        registSendPersonalDataEvent();
        registSealRevokeEvent();
        registSendRevokelDataEvent();
        document.body.appendChild(extensionNode);


        port = chrome.runtime.connect();
        // port.postMessage({joke: "Knock knock"});
        port.onMessage.addListener(function(msg) {
            console.log(msg);
            // if (msg.question == "Who's there?")
            //     port.postMessage({answer: "Madame"});
            // else if (msg.question == "Madame who?")
            //     port.postMessage({answer: "Madame... Bovary"});
            if(msg.command == 0) {
                return;
            }
            var eventName = "";
            switch (msg.command)  {
                case Command_IDCARD_READ : eventName = "IDCardReadResult";break;
                case Command_SEAL_PERSONAL : eventName = "PersonalResult";break;
                case Command_SEAL_VERIFY :  eventName = "VerifyResult";break;
                case Command_SEAL_PROC_PERCENT : eventName = "SealProcessPercent";break;
                case Command_SEAL_PERSONAL_DATA : eventName = "PersonalData";break;
                case Command_SEAL_DATA_REVOKE : eventName = "RevokeResult";break;
                case Command_SEAL_REVOKE_DATA : eventName = "RevokeData";break;
                
            }

            extensionResponseNode.innerText = JSON.stringify(msg);
            var readCardResultEvent = document.createEvent('Event');
            readCardResultEvent.initEvent(eventName, true, true);
            // 发出事件
            extensionNode.dispatchEvent(readCardResultEvent);
        });
    }

    //创建插件DOM
    function createExtensionNode() {
        var manifest = chrome.runtime.getManifest();
        var extensionNodeId = 'extension_' + chrome.runtime.id;
        extensionNode = document.createElement('div');
        extensionNode.id = extensionNodeId;
       // extensionNode.style.display = 'none';
        extensionNode.setAttribute("version", manifest.version);
        extensionCommandNode = document.createElement('div');
        extensionCommandNode.id = extensionNodeId + 'command';
        extensionNode.append(extensionCommandNode);
        extensionResponseNode = document.createElement('div');
        extensionResponseNode.id = extensionNodeId + 'response';
        extensionNode.append(extensionResponseNode);
    }

    //注册身份证事件监听
    function registReadCardEvent() {
        extensionNode.addEventListener('ReadIDCard', function (evt) {
            port.postMessage({"command": Command_IDCARD_READ});
        });
    }

	//注册个人化芯片事件监听
	 function registPersonalEvent() {
        extensionNode.addEventListener('Personal', function () {
            port.postMessage({"command": Command_SEAL_PERSONAL});
        });
    }
    //注册验证芯片事件监听
     function registSealVerifyEvent() {
        extensionNode.addEventListener('sealVerify', function () {
            port.postMessage({"command": Command_SEAL_VERIFY});
        });
    }
    //注册注销芯片
    function registSealRevokeEvent() {
        extensionNode.addEventListener('sealRevoke', function () {
            port.postMessage({"command": Command_SEAL_DATA_REVOKE});
        });
    }


    //注册发送原图事件监听
    function registSendPersonalDataEvent() {
        extensionNode.addEventListener('SendPersonalData', function () {
            console.log(extensionCommandNode.innerText);
            var data = JSON.parse(extensionCommandNode.innerText);
            var s = JSON.stringify(data);
            console.log(s);
            console.log(s.length);
            port.postMessage(data);
        });
    }

    function registSendRevokelDataEvent() {
        extensionNode.addEventListener('SendRevokeData', function () {

            // console.log(extensionCommandNode.innerText);
            // var data = JSON.parse(extensionCommandNode.innerText);
            // var s = JSON.stringify(data);
            // console.log(s);
            // console.log(s.length);
            port.postMessage({"szSealSerial":"0000000000123","szSealName":"测试专用章","remark":"00"});
        });
    }
    installExtension();
}





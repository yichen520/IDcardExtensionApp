'use strict';

{
    var hostName = "dhht.idcard.reader";
    var nativePort;
    chrome.runtime.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(command) {
            if(nativePort == null) {
                console.log("connect");
                nativePort = chrome.runtime.connectNative(hostName);
                nativePort.onMessage.addListener(function(response) {
                    console.log(response);
                    port.postMessage(response);
                });
                nativePort.onDisconnect.addListener(function() {
                    nativePort = null;
                    console.log("host exit!");
                });
            }
            console.log(command);
            nativePort.postMessage(command);
        });
    });




}

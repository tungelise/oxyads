import { printLine } from './modules/print';

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.sendMessage({ 'type': "resetBlockCount", 'data': "0" }, (response) => {
    //code to initialize my extension
    console.log('resetBlockCount: ', response);
});

setTimeout(() => {
    chrome.runtime.sendMessage({ 'type': "blockCount", 'data': "10" }, (response) => {
        //code to initialize my extension
        console.log('blockCount - 1', response);
    });
}, 800);
/*
setInterval(() => {
    chrome.runtime.sendMessage({ 'type': "blockCount", 'data': "10" }, (response) => {
        //code to initialize my extension
        console.log('blockCount', response);
    });
}, 2000);
*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('content: oxy_get_host_name', message);
    if (message.type == "oxy_get_host_name") {
        sendResponse({ "rs": window.location.hostname });

        /*
        chrome.runtime.sendMessage({ 'type': "blockCount", 'data': "10" }, (response) => {
            //code to initialize my extension
            console.log('blockCount - 1', response);
        });
        */
    }
});
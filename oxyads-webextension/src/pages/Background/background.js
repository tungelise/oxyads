chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type == "resetBlockCount") {
        console.log("resetBlockCount");
        // chrome.action.setBadgeText({ "text": "" });
        sendResponse({ "rs": "ok" });
    }

    if (message.type == "blockCount") {
        console.log("blockCount");
        // chrome.action.setBadgeText({ "text": message.data });
        sendResponse({ "rs": "ok" });
    }
});

(function () {
    console.log('closure in background js', chrome.webRequest);
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "https://*/*"
        ]
    };

    const adblockRuleID = 2; // give any id to indetify the rule but must be greater than 1
    chrome.declarativeNetRequest.updateDynamicRules(
        {
            addRules: [
                {
                    action: {
                        type: "block",
                    },
                    condition: {
                        urlFilter: "adservice.google.com/adsid/google/ui", // block URLs that starts with this
                        domains: ["*/*"], // on this domain
                    },
                    id: 1,
                    priority: 1,
                },
                {
                    action: {
                        type: "block",
                    },
                    condition: {
                        urlFilter: "play.google.com/log", // block URLs that starts with this
                        domains: ["*/*"], // on this domain
                    },
                    id: 2,
                    priority: 1,
                },
                {
                    action: {
                        type: "block",
                    },
                    condition: {
                        urlFilter: "www.google.com/gen_204?", // block URLs that starts with this
                        domains: ["*/*"], // on this domain
                    },
                    id: 3,
                    priority: 1,
                },
                {
                    action: {
                        type: "block",
                    },
                    condition: {
                        urlFilter: "accounts.google.com", // block URLs that starts with this
                        domains: ["*/*"], // on this domain
                    },
                    id: 4,
                    priority: 1,
                },
            ],
            removeRuleIds: [adblockRuleID], // this removes old rule if any
        },
        () => {
            console.log("block rule added");
        }
    );

    chrome.webRequest.onCompleted.addListener((details) => {
        console.log('onCompleted');
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];

        Object.assign(request, {
            endTime: details.timeStamp,
            requestDuration: details.timeStamp - request.startTime,
            status: 'complete'
        });
        console.log(tabStorage[tabId].requests[details.requestId]);
    }, networkFilters);

    chrome.webRequest.onErrorOccurred.addListener((details) => {
        console.log('onErrorOccurred');
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];
        Object.assign(request, {
            endTime: details.timeStamp,
            status: 'error',
        });
        console.log(tabStorage[tabId].requests[requestId]);
    }, networkFilters);

    chrome.tabs.onActivated.addListener((tab) => {
        console.log('onActivated tab');
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        console.log('open or re-active tab', tabId);

        chrome.declarativeNetRequest.setExtensionActionOptions({
            displayActionCountAsBadgeText: true,
            tabUpdate: { increment: 1, tabId: tabId }
        }, () => {
            console.log('setExtensionActionOptions on', tabId);
        });

        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });

    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab ? tab.tabId : null;
        console.log("remove tab ", tabId);
        if (!tabId || !tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type == "resetBlockCount") {
            console.log("resetBlockCount");
            sendResponse({ "rs": "ok" });
        }

        if (message.type == "blockCount") {
            console.log("blockCount");
            // chrome.action.setBadgeText({ "text": message.data });
            sendResponse({ "rs": "ok" });
        }

        if (message.type == "get_nb_track_blocked") {
            console.log("receive in backgound: get_nb_track_blocked", message);
            chrome.action.getBadgeText({ tabId: parseInt(message.data) }, (result) => {
                console.log('result on get_nb_track_blocked for tab ', message.data, result);
                chrome.runtime.sendMessage({ 'type': 'oxy_result_nb_track_blocked', 'data': result }, function (response) { });
                sendResponse({ 'rs': result });
            });
        }

        if (message.type == "oxy_new_tab") {
            console.log("receive in background oxy_new_tab");
            // chrome.action.setBadgeText({ "text": message.data });
            sendResponse({ "rs": "ok" });
        }
    });
}());


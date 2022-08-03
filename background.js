var URLHost = 'https://host.globalhitss.com';
var matchURLHost = /host.globalhitss.com/;
var matchURLHoras = /host.globalhitss.com\/Horas\/CapturaHoras2/;

var enableExtension = function() {
  chrome.action.setTitle({ title: 'HOST Lançar Horas' });
  chrome.action.setPopup({ popup: 'popup.html' });
  chrome.action.setIcon({ path: 'host.png' });
};
var disableExtension = function() {
  chrome.action.setTitle({ title: 'HOST Lançar Horas (Disabled)' });
  chrome.action.setPopup({ popup: '' });
  chrome.action.setIcon({ path: 'host_disabled.png' });
};
var checkURLHost = function(arg) {
  if(arg.url.match(matchURLHoras) == null && arg.url.match(matchURLHost) == null) {
    chrome.tabs.create({ 'url': URLHost });
  } else {
    enableExtension();
  }
};


chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, function(change) {
    if(change.url.match(matchURLHoras) == null) {
      disableExtension();
    } else {
      enableExtension();
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if(tab.url == undefined) {
    return;
  } else if(tab.url.match(matchURLHoras) == null) {
    disableExtension();
  } else {
    enableExtension();
  }
});

chrome.action.onClicked.addListener(checkURLHost);



chrome.tabs.onCreated.addListener(createdListener);
chrome.tabs.onUpdated.addListener(updateListener);

function createdListener(tab) {
  block(tab.url, tab.id);
}

function updateListener(tabId, changeInfo, tab) {
  block(changeInfo.url, tab.id);
}

function block(url, id) {
  if(url != undefined && getHostName(url) == "facebook.com") {//url.includes("facebook.com")) {
    chrome.tabs.update(id, {url: "html/redirect.html"});
  }
};

// From primaryobjects.com
function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

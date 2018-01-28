chrome.storage.local.set({blockedDomains: [], blockedPages: []});

function addBlockedPage(url) {
  chrome.storage.local.get("blockedPages", function(blocked) {
    if(blocked != undefined) {
      blocked.blockedPages.push(url);
      chrome.storage.local.set({"blockedPages": blocked.blockedPages});
    } else {
      chrome.storage.local.set({"blockedPages": [url]});
    }
  });
}

function addBlockedDomain(url) {
  url = getHostName(url);

}

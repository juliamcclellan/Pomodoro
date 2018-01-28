chrome.storage.local.set({blockedDomains: [], blockedPages: []}, function(a) {
  addBlockedDomain("https://www.facebook.com/alldhkjshdkl");
  addBlockedPage("https://www.w3schools.com/jsref/jsref_isarray.asp");
});



function addBlockedPage(url) {
  chrome.storage.local.get("blockedPages", function(blocked) {
    if(blocked != undefined && Array.isArray(blocked)) {
      if(!blocked.blockedPages.includes(url)) {
        blocked.blockedPages.push(url);
        chrome.storage.local.set({"blockedPages": blocked.blockedPages});
      }
    } else {
      chrome.storage.local.set({"blockedPages": [url]});
    }
  });
}

function addBlockedDomain(url) {
  url = getHostName(url);
  chrome.storage.local.get("blockedDomains", function(blocked) {
    if(blocked != undefined && Array.isArray(blocked)) {
      if(!blocked.blockedDomains.includes(url)) {
        blocked.blockedDomains.push(url);
        chrome.storage.local.set({"blockedDomains": blocked.blockedDomains});
      }
    } else {
      chrome.storage.local.set({"blockedDomains": [url]});
    }
  });
}

chrome.tabs.onCreated.addListener(createdListener);
chrome.tabs.onUpdated.addListener(updateListener);

chrome.storage.local.get(["blockedDomains", "blockedPages"], function(blocked) {
  if(!Array.isArray(blocked.blockedDomains)) {
    set({blockedDomains: []}, function(a) {
      addBlockedDomain("https://www.facebook.com/alldhkjshdkl");
    });
  }
  if(!Array.isArray(blocked.blockedPages)) {
    set({blockedDomains: []}, function(a) {
      addBlockedPage("https://www.w3schools.com/jsref/jsref_isarray.asp");
    });
  }
});

function createdListener(tab) {
  block(tab.url, tab.id);
}

function updateListener(tabId, changeInfo, tab) {
  block(changeInfo.url, tab.id);
}

function addBlockedPage(url) {
  console.log("here");
  chrome.storage.local.get("blockedPages", function(blocked) {
    if(blocked != undefined && Array.isArray(blocked.blockedPages)) {
      if(!blocked.blockedPages.includes(url)) {
        blocked.blockedPages.push(url);
        chrome.storage.local.set({blockedPages: blocked.blockedPages});
      }
    } else {
      chrome.storage.local.set({blockedPages: [url]});
    }
  });
}

function addBlockedDomain(url) {
  url = getHostName(url);
  chrome.storage.local.get("blockedDomains", function(blocked) {
    if(blocked != undefined && Array.isArray(blocked.blockedDomains)) {
      if(!blocked.blockedDomains.includes(url)) {
        blocked.blockedDomains.push(url);
        chrome.storage.local.set({blockedDomains: blocked.blockedDomains});
      }
    } else {
      chrome.storage.local.set({blockedDomains: [url]});
    }
  });
}


function block(url, id) {
  chrome.storage.local.get(["blockedPages", "blockedDomains"], function(blocked) {
    if(blocked != undefined && url != undefined) {
      var bool = false;

      var pages = blocked.blockedPages;
      for (i = 0; i < pages.length; i++) {
        if(pages[i] === url) {
          bool = true;
          break;
        }
      }

      if(!bool) {
        url = getHostName(url);
        var domains = blocked.blockedDomains;
        for (i = 0; i < domains.length; i++) {
          if(domains[i] === url) {
            bool = true;
            break;
          }
        }
      }

      if(bool) {
        chrome.tabs.update(id, {url: "htmlcss/redirect.html"});
      }
    }
  });
};

// From primaryobjects.com
function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string'
      && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

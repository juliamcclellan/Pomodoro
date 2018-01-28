chrome.tabs.onCreated.addListener(createdListener);
chrome.tabs.onUpdated.addListener(updateListener);

function createdListener(tab) {
  block(tab.url, tab.id);
}

function updateListener(tabId, changeInfo, tab) {
  block(changeInfo.url, tab.id);
}

function block(url, id) {
  chrome.storage.local.get(["blockedPages", "blockedDomains"], function(blocked) {
    console.log(blocked);
    if(blocked != undefined && url != undefined) {
      var bool = false;

      var pages = blocked.blockedPages;
      //console.log(pages);
      for (i = 0; i < pages.length; i++) {
        if(pages[i] == url) {
          bool = true;
          break;
        }
      }

      if(!bool) {
        url = getHostName(url);
        var domains = blocked.blockedDomains;
        //console.log(domains);
        for (i = 0; i < domains.length; i++) {
          if(domains[i] == url) {
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

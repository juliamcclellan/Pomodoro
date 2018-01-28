$(document).ready(function() {
  document.getElementById("sites").addEventListener("click", function(){
    window.location.href = "blockedSites.html";
  });

document.getElementById("addP").addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      addBlockedPage(tabs[0].url)
    });
  });

  document.getElementById("addD").addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      addBlockedDomain(tabs[0].url)
    });
  });
});

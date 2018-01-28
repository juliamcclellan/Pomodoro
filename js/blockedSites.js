$(document).ready(function(){
  document.getElementById("back").addEventListener("click", function(){
    window.location.href = "popup.html";
  });

  chrome.storage.local.get(["blockedPages", "blockedDomains"], function(blocked) {
    var pages = document.getElementById("pages");
    var domains = document.getElementById("domains");

    for(i = 0; i < blocked.blockedDomains.length; i++) {
      var para = document.createElement("p");
      para.appendChild(document.createTextNode(blocked.blockedDomains[i]));
      domains.appendChild(para);
    }

    for(i = 0; i < blocked.blockedPages.length; i++) {
      var para = document.createElement("p");
      para.appendChild(document.createTextNode(blocked.blockedPages[i]));
      pages.appendChild(para);
    }
  });
});

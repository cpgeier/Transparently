function mark_ad_async(style_left, style_scaleX) {
    ads = document.getElementsByClassName('ytp-progress-list');
    newDiv = document.createElement("div");
    newDiv.className = "ytp-play-progress";
    newDiv.style = "z-index: 50; background-color: #fc0; left: " + ads[0].offsetWidth * style_left + "px; transform: scaleX(" + (style_scaleX - style_left) + ");";
    console.log(newDiv.style.cssText);
    ads[0].parentNode.insertBefore(newDiv, ads[0]);
}

function clear_old_ads() {
    // TODO
    /*ads = document.getElementsByClassName('ytp-progress-bar');
    for (var i = 1; i < ads[0].childElementCount; i++) {
        ads[0].childern[i].remove();
    }*/
}

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.subject == "adhub") {
        mark_ad_async(request.element.left, request.element.width);
        sendResponse({status: 0});
      }
    });
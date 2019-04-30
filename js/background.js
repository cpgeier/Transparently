// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


var API_ROOT_URL = "https://adshub.herokuapp.com";

function ytid(video_url) {
  var video_id = video_url.split('v=')[1];
  var ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1)
    video_id = video_id.substring(0, ampersandPosition);
  return video_id;
}

function mark_ads_from_database(tabURL) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    var tabURL = tabs[0].url;
    if (tabURL.includes("www.youtube.com")) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", API_ROOT_URL + "/videos/" + ytid(tabURL), true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          var resp = JSON.parse(xhr.responseText);
          console.log(resp);

          resp.ads.forEach(element => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              let boj = { subject: "adhub" , element: element};
              chrome.tabs.sendMessage(tabs[0].id, boj, function (response) {
                console.log("Sent ad to page with status: " + response.status);
              });
            });
          });
        }
      };
      xhr.send();
    }
  }
  );
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.youtube.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({ farewell: "goodbye" });
      mark_ads_from_database();
  }
);
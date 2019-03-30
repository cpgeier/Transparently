var API_ROOT_URL = "https://adshub.herokuapp.com";

function ytid(video_url) {
    var video_id = video_url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1)
        video_id = video_id.substring(0, ampersandPosition);
    return video_id;
}

function mark_ads_from_database() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API_ROOT_URL + "/videos/" + ytid(location.href), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            resp.ads.forEach(element => {
                console.log("Element: " + element);
                mark_ad_async(element.left, element.width);
            });
        }
    };
    xhr.send();
}

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

clear_old_ads();
mark_ads_from_database();


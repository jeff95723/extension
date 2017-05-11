var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;
var lastSpeedX = null;
var lastSpeedY = null;


var checkScrollAccl = (function(settings){
    settings = settings || {};

    var lastPos, newPos, lastSpeed, newSpeed, timer, delta,
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      lastSpeed = 0;
      delta = 0;
    }

    clear();

    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll
        delta = newPos -  lastPos;
      }
      newSpeed = delta;
      delta = newSpeed - lastSpeed;
      lastSpeed = newSpeed;
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();

// listen to "scroll" event
window.onscroll = function(){
  var accl = checkScrollAccl();
  var threshold = 100;
  if (Math.abs(accl) > threshold) {
      playSwoosh();
  }
};

document.addEventListener("mousemove", function(e) {
    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
        return;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    var speedX = Math.round(dx / dt * 100);
    var speedY = Math.round(dy / dt * 100);

    var threshold = 500;

    //console.log("Mouse speed (" + speedX + "," + speedY + ")");
    if ((Math.abs(speedX) > threshold && Math.abs(lastSpeedX) < 40)
    || (Math.abs(speedY) > threshold) && Math.abs(lastSpeedY) < 40) {
        playSwoosh();
        showSwoosh(e, speedX, speedY);
    }

    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
    lastSpeedX = speedX;
    lastSpeedY = speedY;
});

document.onclick = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    //alert("User clicked at position (" + x + "," + y + ")");
    playPunch();
    showPunch(e);
};

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function playPunch() {
    var paths = [
        "audio/punch1.mp3",
        "audio/punch2.mp3",
        "audio/punch3.mp3",
        "audio/punch4.mp3",
    ];
    var path = choose(paths);
    var myAudio = new Audio();        // create the audio object
    myAudio.src = chrome.runtime.getURL(path); // assign the audio file to its src
    myAudio.play();
}

function playSwoosh() {
    var paths = [
        "audio/swoosh1.mp3",
        "audio/swoosh2.mp3",
    ];
    var path = choose(paths);
    var myAudio = new Audio();        // create the audio object
    myAudio.src = chrome.runtime.getURL(path); // assign the audio file to its src
    myAudio.play();
}

function showPunch(e) {
    var x = e.pageX + 'px';
    var y = e.pageY + 'px';
    var paths = [
        "img/pow.png",
        "img/thwack.png",
        "img/wham.png",
        "img/bang.png"
    ];
    var path = choose(paths);
    var img = document.createElement("IMG");
    img.src = chrome.extension.getURL(path);
    img.style.width = '50%';
    img.style.height = '50%';
    img.style.zindex = 99999;
    img.setAttribute("unselectable","on");
    var div = $("<div class='aaa' unselectable='on'>").css({
        "position": "absolute",
        "left": x,
        "top": y,
        "-moz-user-select": "-moz-none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
        "z-index":9999
    });

    div.append(img);
    div.delay(1000).fadeOut(function() {
        $(this).remove();
    });
    $(document.body).append(div);
}

function showSwoosh(e, speedX, speedY) {
    if (Math.abs(speedX) > Math.abs(speedY)) {
        if (speedX > 0) {
            var dx = -100;
            var dy = 0;
        } else {
            var dx = 100;
            var dy = 0;
        }
    } else {
        if (speedY > 0) {
            var dx = 0;
            var dy = -100;
        } else {
            var dx = 0;
            var dy = 100;
        }
    }
    var x = e.screenX + dx +  'px';
    var y = e.screenY + dy + 'px';
    var paths = [
        "img/swoosh.png"
    ];
    var path = choose(paths);
    var img = document.createElement("IMG");
    img.src = chrome.extension.getURL(path);
    img.style.width = '50%';
    img.style.height = 'auto';
    img.style.zindex = 99999;
    var div = $("<div class='aaa'>").css({
        "position": "absolute",
        "left": x,
        "top": y,
        "-moz-user-select": "-moz-none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
        "z-index":9999
    });

    div.append(img);
    div.delay(1000).fadeOut(function() {
        $(this).remove();
    });
    $(document.body).append(div);
}

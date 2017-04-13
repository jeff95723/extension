var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;
var lastSpeedX = null;
var lastSpeedY = null;

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
        "img/thwack.png"
    ];
    var path = choose(paths);
    var img = document.createElement("IMG");
    img.src = chrome.extension.getURL(path);
    img.style.width = '50%';
    img.style.height = 'auto';
    var div = $("<div class='aaa'>").css({
        "position": "absolute",                    
        "left": x,
        "top": y
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
        "img/swoosh1.png",
        "img/swoosh2.png",
        "img/swoosh3.png"
    ];
    var path = choose(paths);
    var img = document.createElement("IMG");
    img.src = chrome.extension.getURL(path);
    img.style.width = '50%';
    img.style.height = 'auto';
    var div = $("<div class='aaa'>").css({
        "position": "absolute",                    
        "left": x,
        "top": y
    });

    div.append(img);
    div.delay(1000).fadeOut(function() {
        $(this).remove();
    });
    $(document.body).append(div);
}
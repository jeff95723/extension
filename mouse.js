var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

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

    console.log("Mouse speed (" + speedX + "," + speedY + ")");

    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
});

document.onclick = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    alert("User clicked at position (" + x + "," + y + ")");
};
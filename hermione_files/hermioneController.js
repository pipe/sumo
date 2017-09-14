function updateUI(key){
    const display = document.getElementById("movementDisplay");
    // l = Turn Anticlockwise
    // i = Up
    // j = Turn clockwise
    // k = Down
    // d = move left
    // g = move right
    // f = move back
    // r = move forward
    switch (key) {
        case "l":
            display.innerHTML = 'rotating';
            break;
        case "i":
            display.innerHTML = 'up';
            break;
        case "j":
            display.innerHTML = 'rotating';
            break;
        case "k":
            display.innerHTML = 'down';
            break;
        case "d":
            display.innerHTML = 'left';
            break;
        case "g":
            display.innerHTML = 'right';
            break;
        case "f":
            display.innerHTML = 'back';
            break;
        case "r":
            display.innerHTML = 'forward';
            break;
        default:
            display.innerHTML = '-';
    }
}


//////  SENDING EVENTS
let lastBut = 'h';

function sendIfChanged(key){
   if (key != lastBut){
     sendLine(key);
   }
}

//////  KEY EVENTS
function sendKeyEvents() {
    document.addEventListener("keydown", function (event) {
        // l = Turn Anticlockwise
        // i = Up
        // j = Turn clockwise
        // k = Down
        // d = move left
        // g = move right
        // f = move back
        // r = move forward
        let key = '';

        switch (event.key) {
            case "ArrowLeft":
                key = 'l';
                break;
            case "ArrowUp":
                key = 'i';
                break;
            case "ArrowRight":
                key = 'j';
                break;
            case "ArrowDown":
                key = 'k';
                break;
            case "a":
                key = 'd';
                break;
            case "d":
                key = 'g';
                break;
            case "s":
                key = 'f';
                break;
            case "w":
                key = 'r';
                break;
            default:
                updateUI("-")
        }
        // sendIfChanged(key);
        updateUI(key);
    });
}
window.onload = function() {
    resizeCamera();
    sendKeyEvents();
};

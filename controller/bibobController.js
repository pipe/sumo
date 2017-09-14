//////  SENDING EVENTS
let lastBut = 'h';

function sendIfChanged(b){
   if (b != lastBut){
     button(b);
     lastBut =b;
   }
}

//////  KEY EVENTS
function sendKeyEvents() {
    document.addEventListener("keydown", function (event) {
        // up arrow = Up
        // down arrow = Down
        // right arrow = Turn clockwise
        // left arrow = Turn Anticlockwise
        // d = move left
        // g = move right
        // f = move back
        // r = move forward

        let key = 'h';

        switch (event.key) {
            case "ArrowLeft":
                key = 'l';
                break;
            case "ArrowUp":
                key = 'f';
                break;
            case "ArrowRight":
                key = 'r';
                break;
            case "ArrowDown":
                key = 'b';
                break;
            default:
                key = 'h';
        }
        sendIfChanged(key);
    });
    document.addEventListener("keyup", function (event) {
        sendIfChanged('h')
    });
}
window.onload = function() {
    sendKeyEvents();
};

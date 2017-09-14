let args = {
    frequency:100,					// ( How often the object sends the values - milliseconds )
    gravityNormalized:true,			// ( If the gravity related values to be normalized )
    orientationBase:GyroNorm.GAME,	// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
    decimalCount:0,					// ( How many digits after the decimal point will there be in the return values )
    logger:logger,			        // ( Function to be called to log messages from gyronorm.js )
    screenAdjusted:true			    // ( If set to true it will return screen adjusted values. )
};

let gn = new GyroNorm();
const doc = window.document;
const docEl = doc.documentElement;
gn.init(args).then(function(){

    let isAvailable = gn.isAvailable();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if(!isAvailable.deviceOrientationAvailable) {
            logger({message:'Device orientation is not available.'});
        }
    }

}).catch(function(e){
    console.log(e);
});

function logger(data) {
    document.getElementById("error-message").innerHTML = data.message + "<br/>";
}
function stop_gn() {
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    cancelFullScreen.call(doc);
    const forwards = document.getElementById("forwards");
    const backwards = document.getElementById("backwards");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    gn.stop(gncbt);
    document.getElementById("stop").style.display = "none";
    document.getElementById("go").style.display = "block";
    right.style.fill = "#ffffff";
    left.style.fill = "#ffffff";
    forwards.style.fill = "#ffffff";
    backwards.style.fill = "#ffffff";
}

function start_gn() {
    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    requestFullScreen.call(docEl);
    // let locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
    //locOrientation('landscape-primary');
    gn.start(gncbt);
    set_head_gn(); //If screenAdjusted is true, it will set the north to the user's direction
    document.getElementById("stop").style.display = "block";
    document.getElementById("go").style.display = "none";
}

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

//////  GYRONORM EVENTS
function gncbt(data){
   let wheel = data.dm.gy;
   let drive = data.dm.gz;

   logger({message:""+data.dm.gx+"<br/>"+data.dm.gy+"<br/>"+data.dm.gz});

   let nb = 'h';
    if  (wheel > 2){
        nb = 'r';
    } else if (wheel < -2) {
        nb = 'l';
    } else if (drive > 4) {
        nb = 'b';
    } else if (drive < -4) {
        nb = 'f';
    }
   sendIfChanged(nb);
}

function norm_gn() {
    gn.normalizeGravity(true);
}
function org_gn() {
    gn.normalizeGravity(false);
}
function set_head_gn() {
    gn.setHeadDirection();
}

resizeCamera = function() {
    const camera = document.getElementById("camera");
    camera.style.width = "100%";
    camera.style.height = camera.style.width * (56.25/100);
};
screen.onorientationchange = function() {
    resizeCamera();
    set_head_gn();
};
window.onload = function() {
    resizeCamera();
    sendKeyEvents();
};

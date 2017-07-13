let args = {
    frequency:100,					// ( How often the object sends the values - milliseconds )
    gravityNormalized:true,			// ( If the gravity related values to be normalized )
    orientationBase:GyroNorm.GAME,	// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
    decimalCount:0,					// ( How many digits after the decimal point will there be in the return values )
    logger:logger,			        // ( Function to be called to log messages from gyronorm.js )
    screenAdjusted:true			    // ( If set to true it will return screen adjusted values. )
};

let gn = new GyroNorm();

gn.init(args).then(function(){

    let isAvailable = gn.isAvailable();
    if(!isAvailable.deviceOrientationAvailable) {
        logger({message:'Device orientation is not available.'});
    }

}).catch(function(e){
    console.log(e);
});

function logger(data) {
    document.getElementById("error-message").innerHTML = data.message + "<br/>";
}
function stop_gn() { //todo make button for stop
    gn.stop();
    document.getElementById("stop").style.display = "block";
    document.getElementById("go").style.display = "none";
}

function start_gn() { //todo make button for start
    gn.start(gncbt);
    //gn.setHeadDirection();
    document.getElementById("stop").style.display = "none";
    document.getElementById("go").style.display = "block";
}
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
const output = document.getElementById("output");

var lastBut = 'h';

function sendIfChanged(b){
   if (b != lastBut){
     button(b);
     lastBut =b;
   }
}

function gncbt(data){
   let wheel = data.dm.gy;
   let drive = data.dm.gz;
   const forwards = document.getElementById("forwards");
   const backwards = document.getElementById("backwards");
   const left = document.getElementById("left");
   const right = document.getElementById("right");
   logger({message:""+data.dm.gx+"<br/>,"+data.dm.gy+"<br/>"+data.dm.gz});

   let nb = 'h';
   if  (wheel > 2){
      nb = 'r';
       right.style.fill ="#00A7FF";
   } else {
       right.style.fill ="#ffffff";
   }
   if (wheel < -2) {
      nb = 'l';
      left.style.fill ="#00A7FF";
   } else
       {left.style.fill ="#ffffff";}
   if (drive > 4) {
      nb = 'b';
       backwards.style.fill ="#00A7FF";
   } else
       {backwards.style.fill ="#ffffff";}
   if (drive < -4) {
      nb = 'f';
       forwards.style.fill ="#00A7FF";
   } else
       {backwards.style.fill ="#ffffff";}
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

screen.onorientationchange = function() {
    const camera = document.getElementById("camera");
    camera.style.width = "100%";
    camera.style.height = camera.style.width() * (56.25/100);
};
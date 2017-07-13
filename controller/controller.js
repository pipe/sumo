let args = {
    frequency:50,					// ( How often the object sends the values - milliseconds )
    gravityNormalized:true,			// ( If the gravity related values to be normalized )
    orientationBase:GyroNorm.GAME,	// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
    decimalCount:0,					// ( How many digits after the decimal point will there be in the return values )
    logger:logger,			        // ( Function to be called to log messages from gyronorm.js )
    screenAdjusted:true			    // ( If set to true it will return screen adjusted values. )
};
//
let gn = new GyroNorm();

gn.init(args).then(function(){

    let isAvailable = gn.isAvailable();
    if(!isAvailable.deviceOrientationAvailable) {
        logger({message:'Device orientation is not available.'});
    }
    // if(!isAvailable.accelerationAvailable) {
    //     logger({message:'Device acceleration is not available.'});
    // }
    // if(!isAvailable.accelerationIncludingGravityAvailable) {
    //     logger({message:'Device acceleration incl. gravity is not available.'});
    // }
    // if(!isAvailable.rotationRateAvailable) {
    //     logger({message:'Device rotation rate is not available.'});
    // }
    else {
        start_gn();
    }

}).catch(function(e){
    console.log(e);
});

function logger(data) {
    document.getElementById("error-message").innerHTML = data.message + "<br>";
}
function stop_gn() { //todo make button for stop
    gn.stop();
    document.getElementById("stop").style.display = "block";
    document.getElementById("go").style.display = "none";
}

function start_gn() { //todo make button for start
    gn.start(gnCallBack);
    gn.setHeadDirection();
    document.getElementById("stop").style.display = "none";
    document.getElementById("go").style.display = "block";
}

function gnCallBack(data) {
    gn.start(function(data){
        const forwards = document.getElementById("forwards");
        const backwards = document.getElementById("backwards");
        const left = document.getElementById("left");
        const right = document.getElementById("right");
        let output = document.getElementById("output"); //todo remove - for testing purposes only

        // Process:
        let direction = Math.round(data.do.alpha);	    // DIRECTION ( deviceorientation event alpha value )
        // data.do.beta		( deviceorientation event beta value )
        let speed = Math.round(data.do.gamma);	    // SPEED ( deviceorientation event gamma value )
        // data.do.absolute	( deviceorientation event absolute value )

        // data.dm.x		( devicemotion event acceleration x value )
        // data.dm.y		( devicemotion event acceleration y value )
        // data.dm.z		( devicemotion event acceleration z value )

        // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
        // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
        // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

        // data.dm.alpha	( devicemotion event rotationRate alpha value )
        // data.dm.beta		( devicemotion event rotationRate beta value )
        // data.dm.gamma	( devicemotion event rotationRate gamma value )

        output.innerHTML = "Direction: " + direction +
            "<br> Speed: " + speed; //todo remove - used for testing

        if (direction > 0 && direction < 180) {
            button("l");
            left.style.fill ="#00A7FF";
            output.innerHTML += "<br> Turning left "; //todo remove - used for testing
        } else {
            button("h");
            left.style.fill ="#ffffff";
        }
        if (direction > 180 && direction < 360) {
            button("r");
            right.style.fill ="#00A7FF";
            output.innerHTML += "<br> Turning right "; //todo remove - used for testing
        } else {
            button("h");
            right.style.fill ="#ffffff";
        }
        if (speed < -2) {
            button("b");
            backwards.style.fill ="#00A7FF";
            output.innerHTML += "<br> backwards"; //todo remove - used for testing
        } else {
            button("h");
            down.style.fill ="#ffffff";
        }
        if (speed > 2) {
            button("f");
            forwards.style.fill ="#00A7FF";
            output.innerHTML += "<br> forwards"; //todo remove - used for testing
        } else {
            button("h");
            up.style.fill ="#ffffff";
        }
    });
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



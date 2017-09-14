resizeCamera = function() {
     const camera = document.getElementById("camera");
     camera.style.width = "100%";
     camera.style.height = camera.style.width * (56.25/100);
};
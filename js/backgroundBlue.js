function setBackground() {
  var canvas = document.getElementById("background");
  var contextPage1 = canvas.getContext("2d");
  var img = document.getElementById("backgroundImage");

  var animate;

  window.onresize = function () {
    console.log("window resized!");
  };

  var placeImage = function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    img.width = canvas.width;
    img.height = canvas.height;
    contextPage1.drawImage(img, 0, 0, img.width, img.height);
    animate = setTimeout(placeImage, 20);
  };
  placeImage();
}

setBackground();
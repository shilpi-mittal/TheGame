function initialFinal() {
  var canvas = document.getElementById("initialFinalPoint");
  var context = canvas.getContext("2d");

  var trophy = document.getElementById("trophy");

  var initialXFactor = 1 / 40;
  var initialYFactor = 1 / 2;

  var finalXFactor = 39 / 40;
  var finalYFactor = 1 / 2;

  var rectColor = "#FFDB58";

  var rectWidth, rectHeight, trophyWidth, trophyHeight;
  var animate;

  var setInitialFinalPoint = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var height = window.innerHeight;
    var width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;

    trophyHeight = width / 15;
    trophyWidth = height / 12;

    rectWidth = width / 12;
    rectHeight = height / 15;

    var initialX = width * initialXFactor;
    var initialY = height * initialYFactor;

    var finalX = width * finalXFactor;
    var finalY = height * finalYFactor;

    context.fillStyle = rectColor;
    context.fill();
    context.fillRect(initialX, initialY - rectHeight / 2, rectWidth, rectHeight);

    context.fill();
    context.fillRect(finalX - rectWidth, finalY - rectHeight / 2, rectWidth, rectHeight);

    context.drawImage(trophy, finalX - rectWidth / 2 - trophyWidth / 2, finalY - rectHeight / 2 - trophyHeight, trophyWidth, trophyHeight);

    animate = setTimeout(setInitialFinalPoint, 20);
  };

  setInitialFinalPoint();
}

initialFinal();
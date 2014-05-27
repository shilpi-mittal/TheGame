function setWave() {
  var canvasBackground = document.getElementById("background");

  var canvasLayerA = document.getElementById("layerA");
  var contextLayerA = canvasLayerA.getContext("2d");

  var canvasLayerB = document.getElementById("layerB");
  var contextLayerB = canvasLayerB.getContext("2d");

  var height = canvasBackground.height;
  var width = canvasBackground.width;

  canvasLayerA.height = height;
  canvasLayerA.width = width;

  canvasLayerB.height = height;
  canvasLayerB.width = width;

  var waterHeight = height * 0.15;

  var waterBelow = document.getElementById("layerBelow");
  var waterAbove = document.getElementById("layerAbove");

  var xCoordinateBelow = 0;
  var xCoordinateAbove = -width / 2;

  var drawWater = function () {
    moveLeft();
    moveRight();
  };

  var animate1, animate2;

  var moveRight = function () {
    contextLayerA.clearRect(0, 0, canvasLayerA.width, canvasLayerA.height);
    xCoordinateAbove = xCoordinateAbove + 1;
    if (xCoordinateAbove <= -width / 2 || xCoordinateAbove >= width / 2) {
      xCoordinateAbove = -width / 2;
    }

    contextLayerA.drawImage(waterAbove, xCoordinateAbove, height - waterHeight, width * 2, waterHeight);
    animate1 = setTimeout(moveRight, 20);
  };

  var moveLeft = function () {
    contextLayerB.clearRect(0, 0, canvasLayerB.width, canvasLayerB.height);
    xCoordinateBelow = xCoordinateBelow - 2;
    if (xCoordinateBelow <= -width / 2 || xCoordinateBelow >= width / 2) {
      xCoordinateBelow = 0;
    }

    contextLayerB.drawImage(waterBelow, xCoordinateBelow, height - waterHeight, width * 2, waterHeight);
    animate2 = setTimeout(moveLeft, 20);
  };

  drawWater();
}

setWave();


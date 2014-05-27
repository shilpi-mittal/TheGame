var height, width;

function setWave() {
  var canvasLayerA = document.getElementById("layerA");
  var contextLayerA = canvasLayerA.getContext("2d");

  var canvasLayerB = document.getElementById("layerB");
  var contextLayerB = canvasLayerB.getContext("2d");

  var waterBelow = document.getElementById("layerBelow");
  var waterAbove = document.getElementById("layerAbove");

  width = window.innerWidth;
  var waveWidth = width * 0.07;

  var initialBelowX = 0;
  var initialAboveX = -waveWidth;

  var xCoordinateBelow = initialBelowX;
  var xCoordinateAbove = initialAboveX;

  var animate;

  var drawWater = function () {
    height = window.innerHeight;
    width = window.innerWidth;

    canvasLayerA.height = height;
    canvasLayerA.width = width;

    canvasLayerB.height = height;
    canvasLayerB.width = width;

    waveWidth = width * 0.07;
    var waveHeight = height * 0.1;

    var numberOfWaves = Math.ceil(width / waveWidth) + 2;

    initialBelowX = 0;
    initialAboveX = -waveWidth;

    xCoordinateBelow = moveLeft(width, height, waveWidth, waveHeight, numberOfWaves, initialBelowX, xCoordinateBelow);
    xCoordinateAbove = moveRight(width, height, waveWidth, waveHeight, numberOfWaves, initialAboveX, xCoordinateAbove);

    animate = setTimeout(drawWater, 20);
  };

  var moveRight = function (width, height, waveWidth, waveHeight, numberOfWaves, initialAboveX, xCoordinateAbove) {
    contextLayerA.clearRect(0, 0, canvasLayerA.width, canvasLayerA.height);
    xCoordinateAbove = xCoordinateAbove + waveWidth * 0.02;
    if (xCoordinateAbove <= initialAboveX || xCoordinateAbove >= initialAboveX + waveWidth) {
      xCoordinateAbove = initialAboveX;
    }

    for (var i = 0; i <= numberOfWaves; i++) {
      contextLayerA.drawImage(waterAbove, xCoordinateAbove + i * waveWidth, height - waveHeight, waveWidth, waveHeight);
    }
    return xCoordinateAbove;
  };

  var moveLeft = function (width, height, waveWidth, waveHeight, numberOfWaves, initialBelowX, xCoordinateBelow) {
    contextLayerB.clearRect(0, 0, canvasLayerB.width, canvasLayerB.height);
    xCoordinateBelow = xCoordinateBelow - waveWidth * 0.01;
    if (xCoordinateBelow <= initialBelowX - waveWidth || xCoordinateBelow >= initialBelowX) {
      xCoordinateBelow = initialBelowX;
    }

    for (var i = 0; i <= numberOfWaves; i++) {
      contextLayerB.drawImage(waterBelow, xCoordinateBelow + i * waveWidth, height - waveHeight, waveWidth, waveHeight);
    }
    return xCoordinateBelow;
  };

  drawWater();
}

setWave();


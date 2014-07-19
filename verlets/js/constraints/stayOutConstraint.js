var addStayOutConstraint = function (particle, pointA, pointB, pointC, pointD, center) {
  if (isInPolygon(particle, pointA, pointC) ) {
//      || particlePassedThroughPolygon(particle, pointA, pointB, pointC, pointD)) {
    var selectedLine = getSelectedLine(particle, pointA, pointB, pointC, pointD);
    var lineFromParticleToCenter = line({
      type: 'defaultListOfStick',
      withChanges: {
        vectorA: particle.getPosition(),
        vectorB: center
      }
    });
    particle.changePosition(lineFromParticleToCenter.getPointOfIntersection(selectedLine));
    if (particle.getParticleType() == "normal") {
      particle.setParticleType("tempLocked");
    }
  }
};


var isInPolygon = function (particle, pointA, pointC) {
  return particle.getPosition().x > pointA.x && particle.getPosition().x < pointC.x
      && particle.getPosition().y > pointA.y && particle.getPosition().y < pointC.y;
};

var isInOrOnPolygon = function (particle, pointA, pointC) {
  return particle.getPosition().x >= pointA.x && particle.getPosition().x <= pointC.x
      && particle.getPosition().y >= pointA.y && particle.getPosition().y <= pointC.y;
};

var particlePassedThroughPolygon = function (particle, pointA, pointB, pointC, pointD) {
  var currentPosition = particle.getPosition();
  var nextPosition = particle.getPosition().newAdd(particle.getVelocity());

  return((currentPosition.angleBetweenLines(pointA, pointB) < 0 && nextPosition.angleBetweenLines(pointD, pointC) > 0)
      || (currentPosition.angleBetweenLines(pointB, pointC) > 180 && nextPosition.angleBetweenLines(pointA, pointD) < 180)
      || (currentPosition.angleBetweenLines(pointD, pointC) > 0 && nextPosition.angleBetweenLines(pointA, pointB) < 0)
      || (currentPosition.angleBetweenLines(pointA, pointD) < 180 && nextPosition.angleBetweenLines(pointB, pointC) > 180));
};

var getSelectedLine = function (particle, pointA, pointB, pointC, pointD) {
  var angleA = particle.getPosition().angleInDegrees(pointA);
  var angleB = particle.getPosition().angleInDegrees(pointB);
  var angleC = particle.getPosition().angleInDegrees(pointC);
  var angleD = particle.getPosition().angleInDegrees(pointD);
  var angleAB = Math.abs(angleB - angleA);
  var angleBC = Math.abs(angleC - angleB);
  var angleCD = Math.abs(angleD - angleC);
  var angleDA = Math.abs(angleA - angleD);

  var angle = Math.max(angleAB, angleBC, angleCD, angleDA);

  if (angle == angleAB) {
    return line({
      type: 'defaultListOfStick',
      withChanges: {
        vectorA: pointA,
        vectorB: pointB
      }
    });
  } else if (angle == angleBC) {
    return line({
      type: 'defaultListOfStick',
      withChanges: {
        vectorA: pointB,
        vectorB: pointC
      }
    });
  } else if (angle == angleCD) {
    return line({
      type: 'defaultListOfStick',
      withChanges: {
        vectorA: pointC,
        vectorB: pointD
      }
    });
  } else {
    return line({
      type: 'defaultListOfStick',
      withChanges: {
        vectorA: pointD,
        vectorB: pointA
      }
    });
  }
};
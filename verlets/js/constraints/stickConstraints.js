var applyStickConstraint = function (stick, strategy) {

  var length = stick.length;

  var offset_to_maintain_distance = function () {
    var deltaBetweenTwoParticles = stick.particle2.getPosition().newSubtract(stick.particle1.getPosition());
    var lengthOfDelta = deltaBetweenTwoParticles.length();
    var differencesOfLength = lengthOfDelta - length;
    if (lengthOfDelta == 0 && differencesOfLength != 0) {
      return create_new_vector({
        both: differencesOfLength
      });
    }
    return deltaBetweenTwoParticles.newScale(differencesOfLength / lengthOfDelta);
  };

  var constraint_strategy = function (strategy) {
    var offset = offset_to_maintain_distance();
    if(strategy == 'noneLocked') {
      offset.scale(0.5);
      stick.particle1.changePosition(stick.particle1.getPosition().newAdd(offset));
      stick.particle2.changePosition(stick.particle2.getPosition().newSubtract(offset));
    }

    else if(strategy == 'particle1Locked') {
      stick.particle2.changePosition(stick.particle2.getPosition().newSubtract(offset));
    }

    else if(strategy == 'particle2Locked') {
      stick.particle1.changePosition(stick.particle1.getPosition().newAdd(offset));
    }

    else if(strategy == 'bothLocked') {
    }
  };

  return function () {
   constraint_strategy(strategy);
  }
};
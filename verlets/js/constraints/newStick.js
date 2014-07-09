var create_new_stick = function (properties) {

  (properties && properties.particleA && properties.particleB) || (function () {
    throw "Illegal properties. One of the particle not specified. Need 2 particles for a stick."
  })();

  var particleA = properties.particleA;
  var particleB = properties.particleB;

  var length = properties.length || particleA.distance(particleB);

  var offset_to_maintain_distance = function () {
    var deltaBetweenTwoParticles = particleA.getPosition().newSubtract(particleB.getPosition());
    var lengthOfDelta = deltaBetweenTwoParticles.length();
    var differencesOfLength = length - lengthOfDelta;
    if (lengthOfDelta == 0 && differencesOfLength != 0) {
      return create_new_vector({
        both: differencesOfLength
      });
    }
    return deltaBetweenTwoParticles.newScale(differencesOfLength / lengthOfDelta);
  };

  var constraint_strategy = (function () {

    var strategies = {
        none_locked = function () {
          var offset = offset_to_maintain_distance();
          offset = offset.scale(0.5);
          particleA.subtract(offset);
          particleB.add(offset);
        },
        particleA_locked = function () {
          var offset = offset_to_maintain_distance();
          particleB.add(offset);
        },
        particleB_locked = function () {
          var offset = offset_to_maintain_distance();
          particleA.subtract(offset);
        },
        both_locked = function () {

        }
        };

    return function (strategyName) {
      return strategies[strategyName];
    }
  })();

  var currentStrategy = 'none_locked';


  return function () {
    var constraint = function () {
          constraint_strategy[getConstraintStrategy()]();
        },

    getConstraintStrategy = function () {
          return currentStrategy;
        },

    setConstraintStrategy = function (newStrategy) {
//      constraint_strategy[newStrategy] || (throw "Illegal constraint strategy!");
      currentStrategy = newStrategy;
    }
  };
};
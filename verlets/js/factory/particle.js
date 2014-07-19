var particle_factory = (function () {

  var particleProducts = {
    defaultListOfParticle: {
      initial_position: create_new_vector(),
      lastPosition: create_new_vector(),
      initialVelocity: create_new_vector(),
      particleType: "normal",
      render: circle_point_drawable_factory({
        type: 'defaultDrawable',
        withChanges: {}
      })
    }
  };

  return function (properties) {

    var properties = properties || {};
    var type = properties.type || 'defaultListOfParticle';
    var withChanges = properties.withChanges || {};

    var particleProductType = particleProducts[type] || particleProducts.defaultListOfParticle;
    var finalProductType = jQuery.extend({}, particleProductType, withChanges);

    var currentPosition = finalProductType.initial_position;
    var lastPosition = jQuery.extend(true, {}, currentPosition);
    lastPosition = lastPosition.newAdd(finalProductType.initialVelocity);
    var particleType = finalProductType.particleType;

    var getPosition = function () {
      return create_new_vector({
        x: currentPosition.x,
        y: currentPosition.y
      })
    };

    var getVelocity = function () {
      return currentPosition.newSubtract(lastPosition);
    };

    var update = function () {
      var tempCurrentPosition = create_new_vector(currentPosition);
      currentPosition.add(getVelocity());
      lastPosition.copy(tempCurrentPosition);
    };

    var changePosition = function (newPosition) {
      currentPosition.copy(newPosition);
    };

    var add = function (delta) {
        currentPosition.add(delta);
    };

    var subtract = function (delta) {
      currentPosition.subtract(delta);
    };

    var getParticleType = function () {
      return finalProductType.particleType;
    };

    var setParticleType = function (type) {
      finalProductType.particleType = type;
    };

    var applyStayOutRectangleConstraint = function (rectangle) {
      var center = create_new_vector(rectangle.startPoint.newAdd((rectangle.offset.newScale(0.5))));
      var pointA = create_new_vector(rectangle.startPoint);
      var pointB = rectangle.startPoint.newAdd(create_new_vector({x: rectangle.offset.x, y: 0}));
      var pointC = rectangle.startPoint.newAdd(rectangle.offset);
      var pointD = rectangle.startPoint.newAdd(create_new_vector({x: 0, y: rectangle.offset.y}));
      addStayOutConstraint(this, pointA, pointB, pointC, pointD, center);
    };

    return {
      render: finalProductType.render,
      getPosition: getPosition,
      getVelocity: getVelocity,
      changePosition: changePosition,
      add: add,
      subtract: subtract,
      applyStickConstraint: update,
      getParticleType: getParticleType,
      setParticleType: setParticleType,
      applyStayOutRectangleConstraint: applyStayOutRectangleConstraint,
      adjustmentRatio: function () {
        return 0.5;
      }
    };
  };
})();


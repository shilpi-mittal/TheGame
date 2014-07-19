function create_new_vector(properties) {
  var properties = properties || {};

  var xCoordinate = properties.both || properties.x || 0;
  var yCoordinate = properties.both || properties.y || 0;

  return {
    x: xCoordinate,
    y: yCoordinate,

    newScale: function (val) {
      return create_new_vector({
        x: xCoordinate * val,
        y: yCoordinate * val
      });
    },
    scale: function (val) {
      this.x = this.x * val;
      this.y = this.y * val;
    },
    newSubtract: function (anotherVector) {
      return create_new_vector({
        x: this.x - anotherVector.x,
        y: this.y - anotherVector.y
      })
    },
    newAdd: function (anotherVector) {
      return create_new_vector({
        x: xCoordinate + anotherVector.x,
        y: yCoordinate + anotherVector.y
      })
    },
    copy: function (anotherVector) {
      this.x = anotherVector.x;
      this.y = anotherVector.y;
    },
    add: function (anotherVector) {
      this.x = this.x + anotherVector.x;
      this.y = this.y + anotherVector.y;
    },
    subtract: function (anotherVector) {
      this.x = this.x - anotherVector.x;
      this.y = this.y - anotherVector.y;
    },
    squaredLength: function () {
      return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    },
    squaredDistance: function (anotherVector) {
      return this.newSubtract(anotherVector).squaredLength();
    },
    length: function () {
      return Math.sqrt(this.squaredLength());
    },
    distance: function (anotherVector) {
      return Math.sqrt(this.squaredDistance(anotherVector));
    },

    angle: function (anotherVector) {
      return Math.atan2(this.y - anotherVector.y, this.x - anotherVector.x);
    },

    angleInDegrees: function (anotherVector) {
      return (this.angle(anotherVector) * 180) / Math.PI;
    },

    angleBetweenLines: function (vectorA, vectorB) {
      return (this.angleInDegrees(vectorA) - this.angleInDegrees(vectorB));
    }
  };

}
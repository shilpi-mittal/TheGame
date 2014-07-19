var line = (function () {

  var lineProduct = {
    defaultListOfLine: {
      vectorA: null,
      vectorB: null
    }
  };

  return function (properties) {
    var properties = properties || {};
    var type = properties.type || 'defaultListOfLine';
    var withChanges = properties.withChanges || {};

    var lineProductType = lineProduct[type] || lineProduct.defaultListOfLine;
    var finalProductType = jQuery.extend({}, lineProductType, withChanges);

    var det = function () {
      return this.vectorA.x * this.vectorB.y - this.vectorA.y * this.vectorB.x;
    };

    var xDifference = function () {
      return this.vectorA.x - this.vectorB.x;
    };

    var yDifference = function () {
      return this.vectorA.y - this.vectorB.y;
    };

    var getPointOfIntersection = function (anotherLine) {
      var det = function(a, b, c, d) {
        return a * d - b * c;
      };
      var det1And2 = this.det();
      var det3And4 = anotherLine.det();
      var x1LessX2 = this.xDifference();
      var y1LessY2 = this.yDifference();
      var x3LessX4 = anotherLine.xDifference();
      var y3LessY4 = anotherLine.yDifference();
      var denominator = det(x1LessX2, y1LessY2, x3LessX4, y3LessY4);
      if (denominator == 0){
        return null;
      }
      var x = (det(det1And2, x1LessX2, det3And4, x3LessX4) / denominator);
      var y = (det(det1And2, y1LessY2, det3And4, y3LessY4) / denominator);
      return create_new_vector({x : x, y: y});
    };

    return {
      vectorA: finalProductType.vectorA,
      vectorB: finalProductType.vectorB,
      det : det,
      xDifference : xDifference,
      yDifference : yDifference,
      getPointOfIntersection : getPointOfIntersection,
      adjustmentRatio: function () {
        return 0.5;
      }
    };
  };
})();
var rectangle_factory = (function () {

  var rectangleProduct = {
    smallGreenRectangle: {
      startPoint: null,
      offset: null,
      render: rectangle_drawable_factory({
        type: 'smallGreenRectangle',
        withChanges: {
          getOffset: function () {
            return null;
          },
          getStartPoint: function () {
            return null;
          }
        }
      })
    }
  };

  return function (properties) {
    var properties = properties || {};
    var type = properties.type || 'smallGreenRectangle';
    var withChanges = properties.withChanges || {};

    var rectangleProductType = rectangleProduct[type] || rectangleProduct.smallGreenRectangle;
    var finalProductType = jQuery.extend({}, rectangleProductType, withChanges);
    var startPoint = finalProductType.startPoint;
    var offset = finalProductType.offset;

    return {
      render: finalProductType.render,
      startPoint: finalProductType.startPoint,
      offset: finalProductType.offset,
      adjustmentRatio: function () {
        return 0.5;
      }
    };
  };
})();
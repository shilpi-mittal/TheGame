var listOfSticks_factory = (function () {

  var listOfSticksProducts = {
    defaultListOfSticks: {
      numberOfSticks: null,
      getStickProperties: function (index) {
        return {
          type: 'defaultListOfStick',
          withChanges: {}
        }
      }
    }
  };

  return function (properties) {

    var properties = properties || listOfSticksProducts.defaultListOfSticks;

    var listOfSticks = [];

    var type = properties.type || 'defaultListOfSticks';
    var withChanges = properties.withChanges || {};

    var sticksProductType = listOfSticksProducts[type] || listOfSticksProducts.defaultListOfSticks;
    var finalProperties = jQuery.extend({}, sticksProductType, withChanges);

    range(finalProperties.numberOfSticks).map(function (index) {
      listOfSticks.push(stick_factory(finalProperties.getStickProperties(index)));
    });

    var render_function = function (context) {
      listOfSticks.map(function (elem, index) {
        listOfSticks[index].render(context);
      });
    };

    var applyStickConstraint = function () {
      listOfSticks.map(function (elem, index) {
        listOfSticks[index].applyStickConstraint();
      });
    };

    var getListSize = function () {
      return listOfSticks.length;
    };

    var getStickAtIndex = function (index) {
      return listOfSticks[index];
    };

    return {
      render: render_function,
      applyStickConstraint: applyStickConstraint,
      getListSize: getListSize,
      getStickAtIndex: getStickAtIndex
    };
  };
})();


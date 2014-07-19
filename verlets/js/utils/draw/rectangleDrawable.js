var rectangle_drawable_factory = (function(){

  var defaults = {
    getStartPoint : function(){
      return create_new_vector({x:10, y: 0});
    },
    getOffset : function(){
      return create_new_vector({x:10, y: 10});
    },
    setLineWidth : function(){
      return 0.5;
    },
    setStrokeStyle : function(){
      return 'black'
    },
    setFillStyle : function(){
      return 'green';
    }
  };

  var rectangle_drawable_products = {
    defaultDrawable : defaults,
    smallGreenRectangle : (function(){
      var changes = {
        getOffset : function(){
          return create_new_vector({x:20, y: 10});
        }
      };
      return jQuery.extend({},defaults,changes);
    })(),
    smallRedRectangle : (function(){
      var changes = {
        getOffset : function(){
          return create_new_vector({x:20, y: 10});
        },
        setFillStyle : function(){
          return "red";
        }
      };
      return jQuery.extend({},defaults,changes);
    })()
  };

  var drawRect = function(properties, context){
    var x = properties.getStartPoint().x;
    var y = properties.getStartPoint().y;
    var w = properties.getOffset().x;
    var h = properties.getOffset().y;
    context.fillRect(x,y,w,h);
  };

  return function(properties){
    var properties = properties || rectangle_drawable_products.defaultDrawable;
    var type = properties.type || 'defaultDrawable';
    var withChanges = properties.withChanges || {};

    var rectangleProductType = rectangle_drawable_products[type] || rectangle_drawable_products.defaultDrawable;
    var finalProductType = jQuery.extend({},rectangleProductType,withChanges);

    return function(context){
//      context.beginPath();
      context.fillStyle = finalProductType.setFillStyle();
      context.fill();
//      context.lineWidth = finalProductType.setLineWidth();
//      context.strokeStyle = finalProductType.setStrokeStyle();
//      context.stroke();
      drawRect(finalProductType, context);
    }
  }
})();
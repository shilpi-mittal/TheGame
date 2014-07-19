var lineDrawableFactory = (function(){
	
	var defaults = {
		setLineWidth : function(){
			return 1;
		},
		setStrokeStyle : function(){
			return 'black'
		}
	};

  var lineDrawableProducts = {
    defaultDrawable : defaults,
    thinLine : (function(){
      var changes = {};
      return jQuery.extend({},defaults,changes);
    })()
  };

	var drawLine = function(position1, position2, properties,context){
		var x1 = position1.x;
		var y1 = position1.y;
		var x2 = position2.x;
		var y2 = position2.y;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
	};

	return function(properties){
		var lineProperties = properties || lineDrawableProducts.defaultDrawable;
		var type = lineProperties.type || 'defaultDrawable';
		var withChanges = lineProperties.withChanges || {};
		var lineProductType = lineDrawableProducts[type] || lineDrawableProducts.defaultDrawable;
		var finalProductType = jQuery.extend({},lineProductType,withChanges);
	
		return function(context){
			context.beginPath();
			drawLine(this.particle1.getPosition(),this.particle2.getPosition(),finalProductType, context);
			context.lineWidth = finalProductType.setLineWidth();
			context.strokeStyle = finalProductType.setStrokeStyle();
			context.stroke();
		}
	}
})();
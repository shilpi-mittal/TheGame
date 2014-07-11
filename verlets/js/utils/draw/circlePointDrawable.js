var circle_point_drawable_factory = (function(){
	
	var defaults = {
		getRadius : function(){
			return 5;
		},
		getArchStart : function(){
			return 0;
		},
		getIsCounterClockwise : function(){
			return false;
		},
		getFillStyle : function(){
			return 'green';
		},
		getLineWidth : function(){
			return 0.5;
		},
		getStrokeStyle : function(){
			return 'black'
		},
		getArchEnd : function(){
			return 2 * Math.PI;
		}
	};

	var point_drawable_products = {
		defaultDrawable : defaults,
		smallGreenCircle : (function(){
			var changes = {
				getRadius : function(){
					return 2;
				}
			};
			return jQuery.extend({},defaults,changes);
		})(),
    smallRedCircle : (function(){
      var changes = {
        getRadius : function(){
          return 2;
        },
        getFillStyle : function(){
          return "red";
        }
      };
      return jQuery.extend({},defaults,changes);
    })()
	};

	var drawArc = function(position, properties,context){
		var x = position.x; 
		var y = position.y;
		var radius = properties.getRadius();
		var archStart = properties.getArchStart();
		var archEnd = properties.getArchEnd();
		var isCounterClockwise = properties.getIsCounterClockwise();
		context.arc(x,y,radius,archStart,archEnd,false);
	};

	return function(properties){
		var properties = properties || point_drawable_products.defaultDrawable;
		var type = properties.type || 'defaultDrawable';
		var withChanges = properties.withChanges || {};
		
		var circleProductType = point_drawable_products[type] || point_drawable_products.defaultDrawable;
		var finalProductType = jQuery.extend({},circleProductType,withChanges);
	
		return function(context){
			context.beginPath();
			drawArc(this.getPosition(), finalProductType, context);
			context.fillStyle = finalProductType.getFillStyle();
			context.fill();
			context.lineWidth = finalProductType.getLineWidth();
			context.strokeStyle = finalProductType.getStrokeStyle();
			context.stroke();
		}
	}
})();
var particle_factory = (function(){

	var particleProducts = {
		defaultListOfParticle : {
				initial_position : create_new_vector(),
				lastPosition : create_new_vector(),
				initialVelocity : create_new_vector(),
        particleType : "normal",
				render : circle_point_drawable_factory({
					type : 'defaultDrawable',
					withChanges : {}
				})
		}
	};

	return function(properties) {

		var properties = properties || {};
		var type = properties.type || 'defaultListOfParticle';
		var withChanges = properties.withChanges || {};
		
		var particleProductType = particleProducts[type] || particleProducts.defaultListOfParticle;
		var finalProductType = jQuery.extend({},particleProductType,withChanges);
		
		var currentPosition = finalProductType.initial_position;
		var lastPosition = jQuery.extend(true,{},currentPosition);
		lastPosition = lastPosition.newAdd(finalProductType.initialVelocity);
    var particleType = finalProductType.particleType;

		var getPosition = function(){
			return create_new_vector({
				x : currentPosition.x,
				y : currentPosition.y
			})
		};

		var getVelocity = function(){
			return currentPosition.newSubtract(lastPosition);
		};

		var update = function(){
			var tempCurrentPosition = create_new_vector(currentPosition);
			currentPosition.add(getVelocity());
			lastPosition.copy(tempCurrentPosition);
		};

		var changePosition = function(newPosition){
			currentPosition.copy(newPosition);
		};

		var add = function(delta){
			currentPosition.add(delta);
		};

		var subtract = function(delta){
			currentPosition.subtract(delta);
		};

    var getParticleType = function() {
      return particleType;
    };

    var setParticleType = function(type) {
      particleType = type;
    };

		return {
			render : finalProductType.render,
			getPosition : getPosition,
			getVelocity : getVelocity,
			changePosition : changePosition,
			add : add,
			subtract : subtract,
			update : update,
      getParticleType : getParticleType,
      setParticleType : setParticleType,
			adjustmentRatio : function(){
				return 0.5 ;
			}
		};
	};
})();


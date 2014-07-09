var structure_factory = (function(){

	var structureProducts = {
		
	};

	return function(properties){

		var type = properties.type || 'defaultListOfParticle';
		var withChanges = properties.withChanges || {};
		
		var particleProductType = particleProducts[type] || particleProducts.defaultListOfParticle;
		var finalProductType = jQuery.extend({},particleProductType,withChanges);
		
		var currentPosition = finalProductType.initial_position;
		var lastPosition = jQuery.extend(true,{},currentPosition);
		lastPosition = lastPosition.newAdd(finalProductType.initialVelocity); 

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

		return {
			render : finalProductType.render,
			getPosition : getPosition,
			getVelocity : getVelocity,
			changePosition : changePosition,
			update : update
		};
	};
})();


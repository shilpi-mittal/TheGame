var create_new_stick = (function(){

	var stickProducts = {
		defaultStick : {
				particleA : null,
				particleB : null,
				length : null,
				lockingStrategy : 'none_locked',
				get_default_length : function(){
					return this.particleA.distance(this.particleB);
				},
				render : circle_point_drawable_factory({
					type : 'defaultDrawable',
					withChanges : {}
				})
		}
	};

	var constraint_strategy = (function(){
		
		var strategies = {
			none_locked : function(offset){
				offset = offset.scale(0.5);
				particleA.subtract(offset);
				particleB.add(offset);
			},
			particleA_locked : function(offset){
				particleB.add(offset);
			},
			particleB_locked : function(offset){
				particleA.subtract(offset);
			},
			both_locked : function(offset){

			}
		};

		return function(strategyName){
			return strategies[strategyName];
		}
	})();

	var throw_exception = function(msg){
		throw (msg || "Exception in verletStick");
	}

	return function(properties){

		var properties = properties || throw_exception("Must specify some properties... None specified!");
		var type = properties.type || 'defaultStick';
		var withChanges = properties.withChanges || throw_exception("Must override some defaults... None overriden!");

		(withChanges.particleA && withChanges.particleB) || throw_exception("Must specify two particles for stick. Atleast one unspecified!");

		var finalProductType = jQuery.extend({},stickProducts[type],withChanges);

		var particleA = finalProductType.particleA;
		var particleB = finalProductType.particleB;
		var length = finalProductType.length || finalProductType.get_default_length();

		var currentStrategy = constraint_strategy[properties.lockingStrategy] || stickProducts.defaultStick.lockingStrategy;

		var offset_to_maitain_distance = function(){
			var deltaBetweenTwoParticles = particleA.getPosition().newSubtract(particleB.getPosition());
			var lengthOfDelta = deltaBetweenTwoParticles.length();
			var differencesOfLength = length - lengthOfDelta;
			if(lengthOfDelta == 0 && differencesOfLength != 0){
				return create_new_vector({
					both : differencesOfLength
				});
			}
			return deltaBetweenTwoParticles.newScale(differencesOfLength / lengthOfDelta);
		};

		return {
			constraint : function(){
				constraint_strategy[currentStrategy](offset_to_maitain_distance());
			},
			render : function(){
				finalProductType.render();
			},
			get_strategy : function(){
				return currentStrategy;
			},
			set_strategy : function(strategy){
				var currentStrategy = constraint_strategy[strategy] || stickProducts.defaultStick.lockingStrategy;
			},
			get_constraint_length : function(){
				return length;
			},
			set_constraint_length : function(newLength){
				length = newLength;
			}
		};


	};	

})();
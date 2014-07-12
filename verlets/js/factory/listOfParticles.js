var listOfParticles_factory = (function(){

	var listOfParticlesProducts = {
		defaultListOfParticles : {
			numberOfParticles : 100,
			get_particle_properties : function(index){
				return {
					type : 'defaultListOfParticle',
					withChanges : {}
				}
			}
		}
	};

	return function(properties){
		
		var properties = properties || listOfParticlesProducts.defaultListOfParticles;

		var listOfParticles = [];

		var type = properties.type || 'defaultListOfParticles';
		var withChanges = properties.withChanges || {};

		var particlesProductType = listOfParticlesProducts[type] || listOfParticlesProducts.defaultListOfParticles;
		var finalProperties = jQuery.extend({},particlesProductType,withChanges);

		range(finalProperties.numberOfParticles).map(function(index){
			listOfParticles.push(particle_factory(finalProperties.get_particle_properties(index)));
		});

		var render_function = function(context){
			listOfParticles.map(function(elem,index){
				render_specific_function(index,context);
			});
		};

    var update = function() {
      listOfParticles.map(function(elem,index) {
        listOfParticles[index].update();
      });
    };

    var addForce = function(force){
      listOfParticles.map(function(elem,index) {
        listOfParticles[index].add(force);
      });
    };


    var render_specific_function = function(index,context){
			listOfParticles[index].render(context);
		};

    var getListSize = function() {
      return listOfParticles.length;
    };

    var getParticleAtIndex = function(index) {
      return listOfParticles[index];
    };
		
		return {
			render : render_function,
      update : update,
      addForce : addForce,
			renderSpecific : render_specific_function,
      getListSize : getListSize,
      getParticleAtIndex : getParticleAtIndex
		};

	};
})();


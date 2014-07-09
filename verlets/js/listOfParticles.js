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
		}

		var render_specific_function = function(index,context){
			listOfParticles[index].render(context);
		}	
		
		return {
			render : render_function,
			renderSpecific : render_specific_function 
		};

	};
})();


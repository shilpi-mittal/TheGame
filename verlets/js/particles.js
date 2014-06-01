var particles_factory = (function(){

	var particlesProducts = {
		defaultParticles : {
			numberOfParticles : 100,
			get_particle_properties : function(index){
				return {
					type : 'defaultParticle',
					withChanges : {}
				}
			}
		}
	};

	return function(properties){
		
		var properties = properties || particlesProducts.defaultParticles;

		var particles = [];

		var type = properties.type || 'defaultParticles';
		var withChanges = properties.withChanges || {};

		var particlesProductType = particlesProducts[type] || particlesProducts.defaultParticles;
		var finalProperties = jQuery.extend({},particlesProductType,withChanges);

		range(finalProperties.numberOfParticles).map(function(index){
			particles.push(particle_factory(finalProperties.get_particle_properties(index)));
		});

		var render_function = function(context){
			particles.map(function(elem,index){
				render_specific_function(index,context);
			});
		}

		var render_specific_function = function(index,context){
			particles[index].render(context);
		}	
		
		return {
			render : render_function,
			renderSpecific : render_specific_function 
		};

	};
})();


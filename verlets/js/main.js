$('document').ready(function(){
	var mainCanvasJQuery = $('#main-canvas');

	var mainCanvas = mainCanvasJQuery.get(0);

	var canvasDimensions = create_new_vector({
		x : mainCanvas.width,
		y : mainCanvas.height
	});

	var mainContext = mainCanvas.getContext('2d');
	
	var particle = particle_factory({
		type : 'defaultListOfStick',
		withChanges : {
			initial_position : canvasDimensions.newScale(0.5),
			render : circle_point_drawable_factory({
				type : 'defaultDrawable',
				withChanges : {
					getRadius : function(){
						return 20;
					}
				}
			})
		}
	});

 	var several_particles = listOfParticles_factory({
 		type : 'defaultBlueParticles',
 		withChanges : {
 			numberOfParticles : 20,
 			get_particle_properties : function(index){
 				return {
 					type : 'defaultListOfStick',
 					withChanges : {
 						initial_position : create_new_vector({
 							x : index*10 + 100,
 							y : index*5 + 50
 						}),
 						render : circle_point_drawable_factory({
 							type : 'defaultDrawable',
 							withChanges : {
 								getRadius : function(){
 									return 5 * index;
 								},
 								setFillStyle : function(){
 									var red = index * 10,
 										green = index * 20,
 										blue = index * 5;
 									return 'rgb({0},{1},{2})'.format(red,green,blue);
 								}
 							}
 						})
 					}
 				}
 			}
 		}
 	});

	particle.render(mainContext);
	several_particles.render(mainContext);

});
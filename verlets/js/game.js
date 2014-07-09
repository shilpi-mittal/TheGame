$('document').ready(function(){
	var mainCanvasJQuery = $('#main-canvas');

	var mainCanvas = mainCanvasJQuery.get(0);

	var canvasDimensions = create_new_vector({
		x : mainCanvas.width,
		y : mainCanvas.height
	});

	var mainContext = mainCanvas.getContext('2d');

	var particle = particle_factory({
		type : 'defaultListOfParticle',
		withChanges : {
			initial_position : canvasDimensions.newScale(0.5),
			render : circle_point_drawable_factory({
				type : 'smallGreenCircle'
			})
		}
	});
	
	particle.changePosition(particle.getPosition().newAdd({
		x : 1,
		y : 0
	}));

	(function gameLoop(){

		particle.changePosition(particle.getPosition().newAdd({
			x : 0.6,
			y : 1
		}));

		particle.update();
		particle.render(mainContext);
		requestAnimationFrame(gameLoop);
	})();
});	
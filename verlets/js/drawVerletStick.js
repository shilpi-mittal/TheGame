$('document').ready(function(){
  var mainCanvasJQuery = $('#main-canvas');

  var mainCanvas = mainCanvasJQuery.get(0);

  var canvasDimensions = create_new_vector({
    x : mainCanvas.width,
    y : mainCanvas.height
  });

  var mainContext = mainCanvas.getContext('2d');

  var particle1 = particle_factory({
    type : 'defaultListOfParticle',
    withChanges : {
      initial_position : canvasDimensions.newScale(0.5),
      render : circle_point_drawable_factory({
        type : 'smallRedCircle',
        withChanges : {}
      })
    }
  });

  var particle2 = particle_factory({
    type : 'defaultListOfParticle',
    withChanges : {
      initial_position : (canvasDimensions.newScale(0.5)).add(create_new_vector(3,4)) ,
      render : circle_point_drawable_factory({
        type : 'smallRedCircle',
        withChanges : {}
      })
    }
  });

  var stick = stick_factory({
    type : 'defaultListOfParticle',
    withChanges : {
      particle1 : particle1,
      particle2 : particle2,
      render : lineDrawableFactory({
        type : 'defaultDrawable',
        withChanges : {}
      })
    }
  });

  particle1.changePosition(particle1.getPosition().newAdd({
    x : 1,
    y : 0
  }));

  particle2.changePosition(particle2.getPosition().newAdd({
    x : 1,
    y : 0
  }));

  (function gameLoop(){

    particle1.changePosition(particle1.getPosition().newAdd({
      x : 0.6,
      y : 1
    }));

    particle2.changePosition(particle2.getPosition().newAdd({
      x : 0.6,
      y : 1
    }));

    particle1.update();
    particle2.update();
    particle1.render(mainContext);
    particle2.render(mainContext);
    stick.update();
    stick.render(mainContext);
    requestAnimationFrame(gameLoop);
  })();
});
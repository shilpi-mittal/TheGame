$('document').ready(function () {
  var mainCanvasJQuery = $('#main-canvas');

  var mainCanvas = mainCanvasJQuery.get(0);

  var canvasDimensions = create_new_vector({
    x: mainCanvas.width,
    y: mainCanvas.height
  });

  var mainContext = mainCanvas.getContext('2d');

  var particle1 = particle_factory({
    type: 'defaultListOfParticle',
    withChanges: {
      initial_position: canvasDimensions.newScale(0.5),
      render: circle_point_drawable_factory({
        type: 'smallGreenCircle',
        withChanges: {}
      })
    }
  });

  var particle2 = particle_factory({
    type: 'defaultListOfParticle',
    withChanges: {
      initial_position: (canvasDimensions.newScale(0.5)).newAdd(create_new_vector({x: 30, y: 40})),
      render: circle_point_drawable_factory({
        type: 'smallGreenCircle',
        withChanges: {}
      })
    }
  });

  var stick = stick_factory({
    type: 'defaultListOfParticle',
    withChanges: {
      particle1: particle1,
      particle2: particle2,
      length: 50,
      render: lineDrawableFactory({
        type: 'defaultDrawable',
        withChanges: {}
      })
    }
  });


  applyLockConstraint(particle1);
  particle1.changePosition(particle1.getPosition().newAdd({
    x: 0,
    y: 6
  }));

  (function gameLoop() {
    for(var i = 0; i<10; i++) {
    particle2.changePosition(particle2.getPosition().newAdd({
      x: 0,
      y: 6
    }));

    particle1.update();
    particle2.update();
    stick.update();
    }

    particle1.render(mainContext);
    particle2.render(mainContext);
    stick.render(mainContext);

    requestAnimationFrame(gameLoop);
  })();
});
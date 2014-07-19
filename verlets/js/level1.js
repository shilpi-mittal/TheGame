$('document').ready(function () {
  var mainCanvasJQuery = $('#main-canvas');

  var mainCanvas = mainCanvasJQuery.get(0);
  var mainContext = mainCanvas.getContext('2d');

  mainCanvas.height = window.innerHeight;
  mainCanvas.width = window.innerWidth;

  var numberOfParticlesInRope = 50;
  var initialPositionXOfFirstParticle = mainCanvas.width / 40;
  var initialPositionYOfFirstParticle = mainCanvas.height / 40;
  var finalPositionXOfFirstParticle = mainCanvas.width * (39 / 40);
  var stickLength = (mainCanvas.width - (mainCanvas.width - finalPositionXOfFirstParticle)) / numberOfParticlesInRope;

  var particleList = listOfParticles_factory({
    type: 'defaultGreenParticles',
    withChanges: {
      numberOfParticles: numberOfParticlesInRope,
      get_particle_properties: function (index) {
        return {
          type: 'defaultListOfParticles',
          withChanges: {
            initial_position: create_new_vector({
              x: index * stickLength + initialPositionXOfFirstParticle,
              y: initialPositionYOfFirstParticle
            }),
            particleType : "normal",
            render: circle_point_drawable_factory({
              type: 'smallGreenCircle',
              withChanges: {
                getRadius: function () {
                  return stickLength / 8;
                }
              }
            })
          }
        }
      }
    }
  });

  var stickList = listOfSticks_factory({
    type: 'defaultListOfStick',
    withChanges: {
      numberOfSticks: numberOfParticlesInRope - 1,
      getStickProperties: function (index) {
        return {
          type: 'defaultListOfStick',
          withChanges: {
            particle1: particleList.getParticleAtIndex(index),
            particle2: particleList.getParticleAtIndex(++index),
            length: stickLength,
            render: lineDrawableFactory({
              type: 'defaultDrawable',
              withChanges: {
                setLineWidth: function () {
                  return stickLength / 20;
                }
              }
            })
          }
        }
      }
    }
  });

  var rectangle = rectangle_factory({
    type: 'smallGreenRectangle',
    withChanges: {
      startPoint: create_new_vector({x: mainCanvas.width / 2, y: mainCanvas.height / 2}),
      offset: create_new_vector({x: mainCanvas.width / 12, y: mainCanvas.height / 15}),
      render: rectangle_drawable_factory({
        type: 'smallGreenRectangle',
        withChanges: {
          getOffset: function () {
            return create_new_vector({x: mainCanvas.width / 12, y: mainCanvas.height / 15});
          },
          getStartPoint: function () {
            return create_new_vector({x: mainCanvas.width / 2, y: mainCanvas.height / 2});
          }
        }
      })
    }
  });


  (function gameLoop() {
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    rectangle.render(mainContext);
    particleList.addForce(create_new_vector({x: 0, y: mainCanvas.height / 50}));
    particleList.applyStayOutRectangleConstraint(rectangle);
    stickList.applyStickConstraint();
    particleList.render(mainContext);
    stickList.render(mainContext);

    window.setTimeout(gameLoop, 100);
  })();
});
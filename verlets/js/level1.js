$('document').ready(function(){
  var mainCanvasJQuery = $('#main-canvas');

  var mainCanvas = mainCanvasJQuery.get(0);

  var canvasDimensions = create_new_vector({
    x : mainCanvas.width,
    y : mainCanvas.height
  });

  var mainContext = mainCanvas.getContext('2d');

  var particleList = listOfParticles_factory({
    type : 'defaultBlueParticles',
    withChanges : {
      numberOfParticles : 20,
      get_particle_properties : function(index){
        return {
          type : 'defaultListOfParticle',
          withChanges : {
            initial_position : create_new_vector({
              x : index*20 +20,
              y : 50
            }),
            render : circle_point_drawable_factory({
              type : 'smallGreenCircle'
            })
          }
        }
      }
    }
  });

  var drawRope = function(listOfParticles) {
    for (var index = 0; index<listOfParticles.getListSize(); index +2) {
      var stick = stick_factory({
        type : 'defaultListOfParticle',
        withChanges : {
          particle1 : listOfParticles.getParticleAtIndex(index),
          particle2 : listOfParticles.getParticleAtIndex(index + 1),
          render : lineDrawableFactory({
            type : 'defaultDrawable',
            withChanges : {}
          })
        }
      });
      stick.update();
      stick.render();
    }
  };

  particleList.render(mainContext);
  drawRope(particleList);
});
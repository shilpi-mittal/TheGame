var stick_factory = (function(){

  var stickProducts = {
    defaultListOfParticle : {
      particle1 : null,
      particle2 : null,
      strategy : 'noneLocked',
      render : lineDrawableFactory({
        type : 'defaultDrawable',
        withChanges : {}
      })
    }
  };

  return function(properties){
    var properties = properties || {};
    var type = properties.type || 'defaultListOfParticle';
    var withChanges = properties.withChanges || {};

    var stickProductType = stickProducts[type] || stickProducts.defaultListOfParticle;
    var finalProductType = jQuery.extend({},stickProductType,withChanges);

    var particle1Position = finalProductType.particle1.getPosition();
    var particle2Position = finalProductType.particle2.getPosition();
    var strategy = finalProductType.strategy;

    var getParticle1Position = function(){
      return create_new_vector({
        x : particle1Position.x,
        y : particle1Position.y
      })
    };

    var getParticle2Position = function(){
      return create_new_vector({
        x : particle2Position.x,
        y : particle2Position.y
      })
    };

    var update = function(){
      applyStickConstraint(this, strategy)();
    };

    var changeStrategy = function(newStrategy){
      strategy = newStrategy
    };

    return {
      render : finalProductType.render,
      particle1 : finalProductType.particle1,
      particle2 : finalProductType.particle2,
      getParticle1Position : getParticle1Position,
      getParticle2Position : getParticle2Position,
      changeStrategy : changeStrategy,
      update : update,
      adjustmentRatio : function(){
        return 0.5 ;
      }
    };
  };
})();
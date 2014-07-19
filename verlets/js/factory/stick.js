var stick_factory = (function(){

  var stickProducts = {
    defaultListOfStick : {
      particle1 : null,
      particle2 : null,
      length : null,
      strategy : 'noneLocked',
      render : lineDrawableFactory({
        type : 'defaultDrawable',
        withChanges : {}
      })
    }
  };

  return function(properties){
    var properties = properties || {};
    var type = properties.type || 'defaultListOfStick';
    var withChanges = properties.withChanges || {};

    var stickProductType = stickProducts[type] || stickProducts.defaultListOfStick;
    var finalProductType = jQuery.extend({},stickProductType,withChanges);

    var particle1Position = finalProductType.particle1.getPosition();
    var particle2Position = finalProductType.particle2.getPosition();
    var particle1 = finalProductType.particle1;
    var particle2 = finalProductType.particle2;
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

    var addStickConstraint = function(){
      if(particle1.getParticleType() == "locked" || particle1.getParticleType() == "tempLocked") {
        if(particle2.getParticleType() == "locked" || particle2.getParticleType() == "tempLocked") {
          strategy = "bothLocked";
        }
        else {
          strategy = "particle1Locked";
        }
      }
      else if(particle2.getParticleType() == "locked" || particle2.getParticleType() == "tempLocked") {
        strategy = "particle2Locked";
      }

      if(particle1.getParticleType() == "tempLocked") {
        particle1.setParticleType("normal");
      }
      if(particle2.getParticleType() == "tempLocked") {
        particle2.setParticleType("normal");
      }
      applyStickConstraint(this, strategy)();
    };

    var changeStrategy = function(newStrategy){
      strategy = newStrategy
    };

    return {
      render : finalProductType.render,
      particle1 : finalProductType.particle1,
      particle2 : finalProductType.particle2,
      length : finalProductType.length,
      strategy : finalProductType.strategy,
      getParticle1Position : getParticle1Position,
      getParticle2Position : getParticle2Position,
      changeStrategy : changeStrategy,
      applyStickConstraint : addStickConstraint,
      adjustmentRatio : function(){
        return 0.5 ;
      }
    };
  };
})();
var applyLockConstraint = function (particle) {
  particle.applyStickConstraint = function() {
    particle.changePosition(particle.getPosition());
  };

  particle.setParticleType("locked");
  particle.render = circle_point_drawable_factory({
    type : 'smallRedCircle',
    withChanges : {}
  })
};
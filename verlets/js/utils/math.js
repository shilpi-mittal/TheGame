function getRandomInRange (rangeInput) {
	var range = rangeInput || {
		max : 1,
		min : 0
	};
    
    return Math.random() * (range.max - range.min) + range.min;
}
var Timer = (function() {
	function Timer() {
		var lastTick = 0;
		
		this.loop = function (){
			lastTick = Date.now();
		}
		
		this.getDeltaMilliseconds = function(){
			return Date.now() - lastTick;
		}
		
		this.getDeltaSeconds = function(){
			return this.getDeltaMilliseconds() / 1000;
		}
	}
	
	

	return Timer;
})();
var EventManager = (function() {
	function EventManager() {
		var listeners = {};
		
		
		this.fire = function(eventName, data){
			if(listeners[eventName] === undefined)
				return;
			
			for(var i in listeners[eventName]){
				listeners[eventName][i](data);
			}
		}
		
		this.register = function(eventName, callback) {
			if(listeners[eventName] === undefined)
				listeners[eventName] = [];
			
			if(callback !== undefined)
				listeners[eventName].push(callback);
			
		};
	}
	
	
	return EventManager;
})();
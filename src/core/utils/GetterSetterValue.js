var defaultMax = 1000;
function GetterSetterValue(initVal, logGet, logSet, traceSet, traceGet, max) {
	max = max === undefined ? defaultMax : max;
	this.originalMax = max;
	this._value = initVal;
	this.__logGet = logGet !== false;
	this.__logSet = logSet !== false;
	this.__traceGet = traceGet !== false;
	this.__traceSet = traceSet !== false;
	this.__countLogGet = max;
	this.__countLogSet = max;
	this.__countTraceGet = max;
	this.__countTraceSet = max;
}
 
GetterSetterValue.prototype = {
	_value: 0,
	__count: defaultMax,
	get value() {
		if(this.__logGet && this.__countLogGet >= 0) {
			console.log("getting", this._value);
			if(this.__countLogGet == 0) {
				console.log("max number of get logs reached (", this.originalMax, ")")
			}
			this.__countLogGet--;
		}
		if(this.__traceGet && this.__countTraceGet >= 0) {
			try {
				throw Error("Who read this value?");
			} catch(err) {
				console.log(err.message);
				console.log(err.stack);
			}
			if(this.__countTraceGet == 0) {
				console.log("max number of get traces reached (", this.originalMax, ")")
			}
			this.__countTraceGet--;
		}
		return this._value;
	},
	set value(val) {
		if(this.__logSet && this.__countLogSet >= 0) {
			console.log("setting", val);
			if(this.__countLogSet == 0) {
				console.log("max number of set logs reached (", this.originalMax, ")")
			}
			this.__countLogSet--;
		}
		if(this.__traceSet && this.__countTraceSet >= 0) {
			try {
				throw Error("Who wrote this value?");
			} catch(err) {
				console.log(err.message);
				console.log(err.stack);
			}
			if(this.__countTraceSet == 0) {
				console.log("max number of set traces reached (", this.originalMax, ")")
			}
			this.__countTraceSet--;
		}
		this._value = val;
	}
}
 

 module.exports = GetterSetterValue
// 先完成几个再说


(function() {
if(window.ios) return;

var ios = window.ios = {};

if(!WebViewJavascriptBridge) {
	throw new Error('WebViewJavascriptBridge must exists');
}
ios._bridge = WebViewJavascriptBridge;


ios.call = function (name, data, success, fail) {
	data = data || {};
	success = success || nonp;
	fail = fail || nonp;

	this._bridge.callHandler(name, data, success);
}

ios.alert = function (data, callback) {
	if(typeof data == 'string') data = { message: data }
	callback = callback || nonp;

	var defaultData = {
		title: '提示',
		message: '提示框'
	}
	
	data = extend(defaultData, data);

	this.call('alert', data, callback);
}
// redirect
ios.goto = function (url) {
	if(url.indexOf(0) !== '#') return;
	this.call('goto', url);
}

// notification.alert(message, alertCallback, [title], [buttonName])

// notification.confirmCallback(message, confirmCallback, [title, buttonLabels])

// Helpers
// ------- 
function isObject(value){

}
function extend(defaults, arg1){
	for(var key in arg1){
		defaults[key] = arg1[key]; 
	}
	return defaults;
}
var nonp = function(){}
	
})();
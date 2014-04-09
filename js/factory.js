define(function(require,exports,module){
var factory={};
 factory.phoneBooks= function($firebase,fbURL){
     return $firebase(new Firebase(fbURL));
  }
 factory.Files= function($http){
	var factory = {};
	factory.getFiles=function(num){
		 return $http({method:'get',url:'/api/files/'+num})	
	};
	factory.getFile=function(id){
		 return $http({method:'get',url:'/api/file/'+id})	
	};
	factory.putFile=function(id,form){
		 return $http.put('/api/editfile/'+id,form)
	};
	factory.delFile=function(id){
		 return $http.get('/api/delfile/'+id)
	}

	return factory;
  }
   factory.Imgs= function($http){
	var factory = {};
	factory.getImgs=function(){
		 return $http({method:'get',url:'/api/imgs/'})	
	};
	return factory;
  }
 module.exports = factory;
});
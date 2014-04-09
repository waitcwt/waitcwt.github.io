  define(function(require,exports,module){
// tabs = angular.module('tabs',[]).directive('tabset',function(){
	directive={};
	directive.tabset=function(){
		return {
			restrict : 'E',
			transclude : true,
			priority:100,
            scope:{lists:'=myList'},	
            controller:function otherCtrl($scope){
            	var lists = $scope.lists;
            	angular.forEach(lists,function(list,i){
            		if(i==0)list.active= true;
            	});
            	this.select=function(scope){
	            	angular.forEach(lists, function(list) {
	           			 list.active = false;
	          		});
            		scope.list.active =true;
            	}
            },
			template:'<div><ul ng-transclude  class="nav nav-tabs" style="display:inline-block"></ul><div class="panel"><div class="tabp"  ng-repeat="list in lists" ng-class="{active:list.active}"></div></div></div>',
			replace:true
		}
	}
	directive.tab=function(){
		return {
			require:'^tabset',
			restrict : 'E',
			replace:true,
			transclude : true,
			template:'<li ng-class="{active:list.active}" ng-click="select()"><a href="javascript:;">{{list.title}}</a></li>',
			compile: function(elm, attrs, transclude) {
                  return function postLink(scope, elm, attrs, otherCtrl) {
					scope.select=function(){
						otherCtrl.select(scope)
					}
					var tabps = document.querySelectorAll('.tabp');
					angular.forEach(tabps,function(tab,i){
						angular.element(tab).html(scope.lists[i]['content']);
					});
				  } 
			}
		}
	};
	module.exports = directive;
});

  define(function(require,exports,module){
	var controller = {};
	//导航条的controller
	controller.headerController = function($scope,$location,$location){
		var tabs =$scope.tabs = [{"name":'Home',"url":'#/',"mark":'index'},{"name":'MyPhoneList',"url":'#phone',"mark":'phone'},{"name":'MyImages',"url":'#imgs',"mark":'img'},{"name":'others',"url":'#other',"mark":'other'}];
		function getActive(mark){
		  angular.forEach(tabs, function(tab,key) {
			  if(tab.mark==mark){tab.isactive = "active"}
			  else{
			   tab.isactive = "false";		
			  }
		  });
		}
		$scope.clk = function(mark){
			getActive(mark);
		}		
		//getActive(0);
		var url = $location.$$url.match(/(\w+)/);	
		url ? getActive(url[0]):getActive('index');
	}
	//首页的controller
	controller.indexController = function($scope,Files,$timeout, $firebase, fbURL){
	      var projectUrl = fbURL + 'blogs';
		  $scope.blog = $firebase(new Firebase(projectUrl));   
	}
	controller.addBlogs = function($scope,Files,$timeout,$location, $firebase, fbURL){
	      var projectUrl = fbURL + 'blogs';
		  blogs = $firebase(new Firebase(projectUrl));   
		  $scope.save = function() {
		  blogs.$add($scope.content, function() {
			$timeout(function() { $location.path('/'); });
		  });
		};
	}
	//二级页的controller
	controller.detailController = function($scope,Files,$location,$routeParams){
		var dataid = $routeParams.dataId;
		$scope.file={};
		Files.getFile(dataid).success(function(data){
			$scope.file = data.file;
		})
		$scope.edit=function(){
			$scope.ison="edit"
		}
		$scope.cancel=function(){
			$scope.ison="false"
		}
		$scope.save=function(){
		     Files.putFile(dataid,$scope.file).success(function(data){
			 $scope.ison="false";
		  })		
		}
		$scope.del=function(){
			Files.delFile(dataid).success(function(data){
				$location.url('/#index');
			  })		

		}
		$scope.ison="false";
	}

	//phone 的controller
	controller.PhoneController = function($scope,$location,$timeout, $routeParams, $firebase, fbURL,phoneBooks){
		$scope.phonebooks = phoneBooks;	
		//phone 里面editBook
		 var projectUrl = fbURL + 'phones/'+$routeParams.bookId;
		  $scope.book = $firebase(new Firebase(projectUrl));   
		  $scope.destroy = function() {
			$scope.book.$remove();
			$location.path('/phone');
		  }; 
		  $scope.save = function() {
			$scope.book.$save();
			$location.path('/phone');
		  };
		  
	},
	//img 的controller
	controller.ImgController = function($scope,Imgs){
		//数据存成js文件，便于读写
		Imgs.getImgs().success(function(data){
			$scope.data = data.imgs;
		});
		timer = null;bigtime=null
		$scope.enter = function(num){
			if(bigtime)clearTimeout(bigtime);
			bigtime = setTimeout(function(){
			var li = document.querySelectorAll('.li');
			var div =li[num].querySelector('.front');
			var end =li[num].querySelector('.end');
			div.className='flip front';
			if(timer) clearTimeout(timer);
			timer = setTimeout(function(){
			div.className='front'; div.style.display="none"; end.style.display="block"},400);
			},200);
		}
		$scope.leave=function(num){
			if(bigtime) clearTimeout(bigtime);
			if(timer) clearTimeout(timer);
			var li = document.querySelectorAll('.li');
			var div =li[num].querySelector('.front');
						div.className = 'front';
			var end =li[num].querySelector('.end');
			if(div.style.display=='none'){
			end.className='flip end';
			timer=setTimeout(function(){
			end.className='end'; end.style.display="none"; div.style.display="block"},400);
			}
		}
		
	},
	//other 的controller
	controller.otherController = function($scope){
		$scope.lists = [{"title":"个人资料","content":"<p>姓名:陈微婷</p><p>英文名:emliy chen</p><p>年龄:23</p><p>生日:1990-11-17</p><p>qq:646766469</p><p>emial:chenweiting@360.cn</p><p>籍贯:重庆</p><p>所在地:北京</p><p>座右铭:tomorrow is another day</p>"},{"title":"兴趣爱好","content":"<p>1.初中的时候迷过一阵子足球，中考成绩出来的那天是西班牙打英格兰，最后点球大战，西班牙赢了，但是我喜欢的是贝克汉姆啊。。。</p><p>2.高中的时候就开始看nba，各种迷啊，上课的时候手机拿着看文字直播的日子还历历在目，从火箭到骑士到湖人到雷霆，从麦迪到詹姆斯到科比到杜兰特，当时都是了解到不行，杜兰特本来不喜欢的，长得实在太丑了，但是命中率极其的高，所以打游戏比用角色</p><p>3.大学就是各种美剧的日子了，从绯闻少女到吸血鬼日记到老爸老妈浪漫史到美少女的谎言到人质..列举不完，每天都有各种剧更新，追的那叫一个痴狂啊。后来找工作的时候就开始不追了，现在就4部美剧追的样子</p><p>4.工作后就开始锻炼身体了，感觉天天坐在椅子上的日子腰酸背疼，所以回去游游泳，跑跑步啥的，再不锻炼身体就老了啊。</p>"},{"title":"自我总结","content":"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这个就有点意思了，我呢，看着是什么都懂一点点的样子，涉猎比较广泛，哈哈哈，什么都可以去学，什么都可以学的很快，好奇心比较重，比较八卦，喜欢运动也是因为不想长胖。写代码呢就是速度，喜欢模仿别人好的代码，学习别人的编程思想，然后写出自己代码，能够不断去优化不断去思考不断去发掘开拓创新的灵感，喜欢和有意思的人做朋友，可以学到很多促使自己上进，进步必须超过才行，也可以说是嫉妒吧，但是比较好的是，嫉妒了知道追赶，让别人嫉妒嫉妒我才行啊，典型的天蝎座！感觉每个人的潜力都是无穷无尽的，只要你去挖掘，更多的时候是被逼去挖掘，就能得到意想不到的东西，我是那种压力下能出东西的人，如果没有压力就不好了，不会去上进，这点比较悲剧。每天都在努力做的更好，争取在最短的时间内遇到最好的自己</p>"}];

	},
	//phone 里面addBook
	controller.addController = function($scope,$location,$timeout,phoneBooks){
		$scope.save = function() {
		  phoneBooks.$add($scope.book, function() {
			$timeout(function() { $location.path('/phone'); });
		  });
		};
	}
	
    module.exports = controller;
  });
var IP = 'localhost';
require.config({
	baseUrl: 'js/',
	urlArgs:'version=1.0',
	paths: {
		salut: 'base/salut',
		config: 'Config'
	}
});
//require(function(base, page) {
(function(root){
	require(['config'], function(C){
		console.log(C);
		var hash = root.location.hash.replace(/^#\/?/gi, '');
		if(hash.indexOf('?')> -1 ) {
			hash = hash.split('?')[0];
		}
		var config = C.PAGERULES;
		if(hash.indexOf('/')) {
			hash = hash.split('/')[0].toLocaleLowerCase();
		}
		for(var i in config) {
			if(config[i].indexOf(hash) >-1 ) hash = i;
		} 
		hash = hash != '' ? hash: C.entrePage;
		window.location.hash = hash;
		//首次加载文件
		require([C.loadJsPath + hash], function(){
			Backbone.history.start();
		});
	});
})(window);
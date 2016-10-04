var $ = require('jquery');

export default {
	toast : function(text) {
	var $tc = $('#toast-container');
	$tc.html('<div class="toast" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); top: 30px; opacity: 0;">'+text+'</div>');
	var $t = $tc.find('.toast');
	$t.animate({opacity:1, top: '0px'},500, function() {
		setTimeout(function(){
			$t.animate({opacity:0, top: '-40px'},300, function() {
				$t.remove();
			})
		},3000);
		});
	}
};
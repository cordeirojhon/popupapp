function getStyle(){
	var style = '<style>.pop-download-app{position: fixed; bottom: 0; left: 0; width: 100%;z-index: 1000; background: rgba(0,0,0,0.83);display: none; font-size:16px} .pop-download-app .center-content{display: -webkit-box;display: -ms-flexbox;display: flex; max-width: 750px; margin: 0 auto; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; padding:1em 0} .pop-download-app .center-content > *{margin: 0 0.4em} .pop-download-app .center-content .fechar{font-size: 1.5em; font-weight: 100; color: #fff} .pop-download-app .center-content p{font-size: 1em; color: #fff; font-weight: 100}.pop-download-app .link img { height: 2em; display: block; width: auto; }</style>';
	return style;
}
function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}
	if (/android/i.test(userAgent)) {
		return "Android";
	}
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}
	return "unknown";
}
function fechardownload() {
	sessionStorage.setItem('popclose', 'S');
	jQuery('.pop-download-app').fadeOut();
	return false;
}
jQuery.fn.popupapp = function(e) {
	var link;
	var image;
	var system = getMobileOperatingSystem();
	if (system == 'Android') {
		link = e.gLink;
		image = e.gImage;
	}
	if (system == 'iOS') {
		link = e.iLink;
		image = e.iImage;
	}
	if (sessionStorage.getItem("popclose") === null && system != 'unknown' && link != '') {
		jQuery(this).addClass('has-popupapp');
		var html = '<div class="pop-download-app" style="display:none"><div class="center-content"><a href="javascript:fechardownload()" class="fechar">x</a><a href="' + link + '" class="link ' + system + '" target="_blank"><img src="'+image+'"></a><p>'+e.body+'</p></div></div>'+getStyle();
		switch (e.insertIn) {
			case 'append':
				jQuery(this).append(html);
				break;
			case 'prepend':
				jQuery(this).prepend(html);
				break;
			case 'before':
				jQuery(this).before(html);
				break;
			case 'after':
				jQuery(this).after(html);
				break;
		}
		jQuery('.pop-download-app').fadeIn();
	}
}
 var url = window.location.href.split('/').filter(function(urlPortion){ return ( urlPortion != '' && urlPortion != 'http:' && urlPortion !=  'https:'  )  }) ;
	
//! APP CONFIGURATIONS
global.ip = url[0].split(':')[0];
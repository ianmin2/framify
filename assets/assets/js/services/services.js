"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function t(n,e,i){function r(s,u){if(!e[s]){if(!n[s]){var a="function"==typeof require&&require;if(!u&&a)return a(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=e[s]={exports:{}};n[s][0].call(c.exports,function(t){var e=n[s][1][t];return r(e?e:t)},c,c.exports,t,n,e,i)}return e[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(t,n,e){app.service("app",["$http","$ionicPopup",function(t,n){var e=window.location.href.split("/").filter(function(t){return""!=t&&"http:"!=t&&"https:"!=t});this.ip=e[0].split(":")[0],this.port=e[0].split(":")[1],this.hlink="http://"+this.ip+":"+this.port,this.url=this.hlink,this.doNothing=function(){},this.UID=function(t,n,e){document.getElementById(t).innerHTML="<div class='alert alert-"+e+"'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+n+"</div>"},this.getData=function(t,n){$.getJSON("./config/app.json",function(n){t(n)})},this.getRoutes=function(t,n){$.getJSON("./config/app-routes.json",function(n){t(n)})},this.makeResponse=function(t,n,e){return{response:t,data:{message:n,command:e}}};var i=["","January","February","March","April","May","June","July","August","September","October","November","December"];this.ajax=function(t,n,e,i,r){$.ajax({method:"POST",url:this.hlink+t,data:n,success:e,error:e})},this.cors=function(t,n,e,i,r){$.ajax({method:"POST",url:t,data:n,success:e,error:e})},this.getJSON=function(t,n){$.getJSON(t,function(t){n(t)})},this.JSON=function(t){return $.getJSON(t)},this.cgi=function(t,n){return $.ajax({method:"GET",url:t,data:n,dataType:"jsonp"})},this.loadify=function(t){t.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>')},this.alert=function(t,e,i,r){var o=n.alert({title:t,template:e,okText:r||"OK"});o.then(function(t){"function"==typeof i&&i(t)})},this.confirm=function(t,e,i,r){var o=n.confirm({title:t,template:e});o.then(function(t){t?i(t):r?r(t):i(t)})},this.prompt=function(t,e,i,r,o){n.prompt({title:t,template:e,inputType:i,inputPlaceholder:r}).then(o)},this.isemail=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,this.isEmail=function(t){return this.isemail.test(t)},this.isusername=/^[a-z0-9_-]{4,16}$/,this.isUsername=function(t){return this.isusername.test(t)},this.ispassword=/^[-@.\/\!\$\%\^|#&,+\w\s]{6,50}$/,this.isPassword=function(t){return this.ispassword.test(t)},this.istelephone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,this.isTelephone=function(t){return this.istelephone.test(t)},this.matches=function(t,n){return t===n},this.num2month=function(t){return isNaN(t)?"Invalid Month":i[t]},this.unique=function(t){for(var n=new Array,e=t.length-1;e>=0;e--){for(var i=t.length-1;i>=0;i--)t[e]==t[i]&&e!=i&&delete t[i];void 0!=t[e]&&n.push(t[e])}return n.reverse()},this.count=function(t,n){var e=0;for(v in n)t===n[v]&&(e+=1);return e},this.str=function(t){return"object"===("undefined"==typeof t?"undefined":_typeof(t))?JSON.stringify(t):t},this.json=function(t){return"object"===("undefined"==typeof t?"undefined":_typeof(t))?t:JSON.parse(t)}}])},{}],2:[function(t,n,e){app.service("cgi",[function(){this.ajax=function(t){return $.ajax({method:"GET",url:"/php/index.php",data:t})}}])},{}],3:[function(t,n,e){t("./app.serv.js"),t("./cgi.serv.js")},{"./app.serv.js":1,"./cgi.serv.js":2}]},{},[3]);
[![Framify Logo](https://bixbyte.io/Framify.png)](http://cards.ueab.ac.ke/Framify.png)

An fast and easy to use application bootstrapping tool for [node](http://nodejs.org).


  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  <!-- [![Linux Build][linux-image]][downloads-url]
  [![Windows Build][windows-image]][downloads-url]
  [![Test Coverage][test-image]][downloads-url] -->

----
### **To install**
    npm install -g framify

---
## **usage**
---

### To create a new application ...
*On the command line, navigate to the directory where you would like to start your application then type :*
   
    framify appName

** *Note:*  **

* The *appName* provided will be turned into lowercase

* Spaces are not allowed in the *appName* unless you use  escape characters e.g ** framify *My Application* ** can be typed as ** framify *My\ \Application* **
The result of this will however be ***my_application***

* The new application will be created in the ***current working directory *** (**$PWD**) at the time of running the command.

----
##A Brief Introduction

Bixbyte's **framify** rapid app development framework base relies primarily on the **ionic** *{v1}* and **angularJs** framework for *UI* development. 
This means that it can effectively be used as a *UI* base for both desktop and mobile applications. 

**framify** is also built upon *Bixbyte's* **bixbyte-frame** application base which is essentially  a set of components that are often used in nodejs applications.
This allows for the development of a full stack application essentially following an **MVC** *ish* architecture.

Some of the things that come with ***bixbyte-frame*** *and therefore available in **framify*** by default are:
* ***mongodb*** reusable connections and sample schema based off ***mongoose***

* Simple server side factories running off ***wagner-core***

* A simple communications module for SMS sending via modem or an installed android - application and email sending via the **mandrill api**

* An automated form generation module for generation of json based forms from **mongodb** *ish* schemas rendered by **angular-formly**

* A simple **gulp** based javascript file concatenating module that allows for the packaging of all custom built javascript files into one *++++>* ***application.js***

* A **socket.io** and *CORS* enabled *standardized* **express** based server - base application

* A rapid php API development framework by Bixbyte ( ***m4Labs p-frame*** ) complete with ***ODBC*** database management, encryption and mail sending classes with a **JSON** *API* producing engine with optional *CORS* packaging of ***HTTP*** requests using ***JSONP*** and a **php_cgi** module for **nodejs**

* An automated route generator for use with ionic's inbuilt ***ui-router***
----
## ** APP STRUCTURE **

    | appName
	
	  => assets	  
	     -> css
		 	-> fonts
		 -> img 
		 -> js
		 	-> controllers
			 	- *.ctrl.js
			 	+ main.js
				 % contollers.js
			 -> directives
			 	- *.dir.js
			 	+ main.js
				 % directives.js
			-> services
			 	- *.serv.js
			 	+ main.js
				 % services.js
			& app.js
			& app.router.js
			- *js
	  => config
			+ app.json
			+ config.json
			% app-routes.json
	  => forms
	  		=> dist
			  	% mainForm.json			  
	  => php
	  		+  index.php
	  	 	-> classes
				  & *.php			   
	  => sample
		 + sample.json
	  => schema
	     + sample-schema.js
		 => forms
		 	- main.js
		 	& main.min.js
	  => server
			 & formGenerator.js
			 & formStacker.js
			 + server.js
	  => views
	  		 ^ 1app.html
			 + *.html 
	  & gulpfile.js
	  & index.html
	  & main.js
	  + package.json
	  & package.sh
	  & routerify.js
	  % application.js
			
			
			 
	

*KEY*
> 
    =>			Primary Major Segment folder
	->			Subsidiary folder
	- 			Mainly User genrated files ( ***Edit at will*** )
	+ 			Pre - existing configuration files ( ***Edit with some caution*** )
	& 			Fragile Major configuration files ( ***Edit only if you are sure of what tou are doing*** )
	% 			Auto -generated application files ( ***Edit to play a frustrating game of 'chasing the wind and wild geese'*** )
	

---
##handling files in ***assets/js/ {{ services | directives | controllers }}***

> use an ***"app."*** prefix in your code for the controllers, directives and  services e.g( **app.**controller("myController",['$scope',function($scope){]) ) 	
>
	Note:	*The **app** variable is defined in the **assets/js/app.js** file*
	[ Failure to do this is as fruitful as chasing the wind with the sole purpose being to catch and jail it for causing hurricanes ]
	

> make sure to follow the prescribed **suffix for filenames** ie ( ****.serv.js*** *in services* | ****.ctrl.js*** *in controllers* | ****.dir.js*** *in directives* )  
>  
	[*Failure to do this will cause the automated compiler to fail to capture changes as they happen in the specific folders*]

> add the paths to your custom services, directives and controllers to their respective main.js file using the ***require("./filename.suffix.js")*** syntax
>
	For instance  require("./myController.ctrl.js")  in *assets/js/controllers/main.js* in order for it to be packaged in the compiled file ( controllers.js )
				  require("./myDirective.dir.js")  in *assets/js/directives/main.js* in order for it to be packaged in the compiled file ( directives.js )
	              require("./myService.serv.js")  in *assets/js/services/main.js* in order for it to be packaged in the compiled file ( services.js )
	[Failure to do this will prevent the files from being included in the final concatenated "application.js" which is used in index.html]

---
##VIEW DEVELOPMENT

> Avoid at all costs temptation(s) to place your view directly in the ***index.html*** file. 
	[ ***Free advice:*** You will die of frustration if you insist ***Place ALL of your views in the [views] folder*** ]

###DEVELOPING A VIEW THAT WILL BE AUTOMATICALLY ADDED TO YOUR APP PATH ( *and optionally to your side menu* )
 
 > It's as simple as pie
 
 	Add the tag <framify menu="true" path="home" url="/" title="Home" parent="false" icon="home"  controller="myController" ></framify>
	 
	 	For the icon, framify relies on google material icons which you can visit form the link provided below and paster the desired icon name to use it in the menu or anywhere else in your project
		 
		 [Failure to add the <framify ... ></framify> tag with ALL OPTIONS DEFINED is like looking for a specific dissolved molecule of salt in an ocean  ]
 
 ----
###AUTOMATED JAVASCRIPT PACKAGING AND APP PREVIEW RELOADING

**To package your application just once, **
> Run **gulp package** 


**To watch for ongoing file changes, ** 
> Run **gulp watch**

**To run an auto refreshing copy of the app as you make changes**
>Run **gulp serve**


 ----
 ##LINKS
[ Google Material Icons](https://design.google.com/icons/)

[ Out of the box application example](https://ianmin2.cf/framify)

----
## changelog
* March 21st 2016	 ( @framify-core Structure redefinition )

----
## thanks
* [ianmin2](https://ianmin2.cf)


## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/framify.svg
[npm-url]: https://npmjs.org/package/framify
[downloads-image]: https://img.shields.io/npm/dm/framify.svg
[downloads-url]: https://npmjs.org/package/framify
[linux-image]: https://img.shields.io/travis/ianmin2/framify/master.svg?label=linux
[windows-image]: https://img.shields.io/appveyor/ci/dougwilson/express/master.svg?label=windows

[test-image]: https://img.shields.io/coveralls/ianmin2/framify/master.svg
[![##Framify](http://cards.ueab.ac.ke/Framify.png)](https://www.npmjs.com/package/framify)

An fast and easy to use application bootstrapping tool for [node](http://nodejs.org).


  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  <!-- [![Linux Build][linux-image]][downloads-url]
  [![Windows Build][windows-image]][downloads-url]
  [![Test Coverage][test-image]][downloads-url] -->

----
### **To install**
> npm install -g framify

---
## **usage**
---

### To create a new application ...
*On the command line, navigate to the directory where you would like to start your application then type :*
   
> framify appName

***Note:***

* The *appName* provided will be turned into lowercase

* Spaces are not allowed in the *appName* unless you use  escape characters e.g ** framify *My Application* ** can be typed as ** framify *My\ \Application* **
The result of this will however be ***my_application***

* The new application directory will be created in the ***current working directory *** (**$PWD**) at the time of running the command.

----
## A Brief Introduction

Bixbyte's **framify** rapid app development framework base relies primarily on the **UIKit**  and **AngularJs** frameworks for *UI* development. 

it can also easily be ported as a *UI* base for mobile applications. 

**framify** UI builder is built out of the box to interact *Bixbyte's* **bixbyte-frame** application base which is a rapid API development framework complete with a GraphQl like ORM with built in simple yet powerful user access control management.

This aids in the rapid development of a full stack application essentially following an **MVC** *ish* architecture.

Some of the things that come with ***bixbyte-frame*** *and therefore available in **framify*** by default are:

* A **socket.io** and *CORS* enabled *standardized* **express** based server - base application

* A simple communications module for email sending via the **mandrill api**

* A simple Branded SMS sender module **premium rate api**

* ***mongodb*** reusable connections and sample schema based off ***mongoose*** and Simple server side factories running off ***wagner-core***

* ***postgresql*** promise based query handler complete with an easy to use 'no alteration required' ORM.

* A simple **gulp** based javascript framework packaging module that allows for customization of the default shipped angular modules 

* A CGI based handler to allow the running of php scripts in nodejs.
Comes with a **JSON** *API* ORM with optional *CORS* packaging of ***HTTP*** requests using ***JSONP*** 

----
## **APP STRUCTURE**

    | appName
	
	  => assets	  

	     -> css
		 	-> fonts
			-> themes
			- + .css

		 -> img 

		 -> icons
		 	-> material-design-icons

		 -> js
		 	-> maps
			- & .js

	  => config
			- app.json
			+ & config.js
			- app-routes.json
> ### *These files are to be created manually*
>			* & jwt-secret.conf
>			* & mailgun.conf
>			* & mongo.conf
> 			* & postgres.conf
> 			* & sms.conf
> ### *These files are to be created manually*

	  => db
>#####	*POSTGRESQL ORM HANDLER*

	  		& .js	

	  => php
>#####	*PHP CGI & ORM HANDLER*
	  		&  index.php
	  	 	-> classes
				  & *.php	

	  => routes

	  	 => templates

		   	=> welcome
			   	+ *.html

			=>password
				+ *.html

		 & auth.js
		 & db.js
		 & main.js
		 & passwords.js
		 & payments.js
		 & sms.js
		 & template2sms.js
		 & upload.js

	  => sample

		  - sample.json

	  => schema

	     & members.js
		 - sample.sql

	  => server
			 & enc_dec.js
			 & gcm.js
			 & mail.js
			 + & server.js
			 + server_cleanup.js
			 & sms.js
			 & sms_actions.js

	  =>src

		=> framework

			+ & framify.es6		

		+ & app.es6
	  
	  
	  => views

	  		 & login.html
			 & signup.html
			 & manage_users.html
			 & passwords.html

			 -+ index.html
			 -+ dash.html
			 -+ panel.html

			 - *.html 

	  & gulpfile.js
	  & index.html
	  & main.js
	  + package.json
	

#### *KEY*

>	(=>)			Primary Major Segment folder

>	(->)			Subsidiary folder

>	(\*) Files that require to be created at project initialization

>	(-) 			Mainly User genrated files ( ***Edit at will*** )

>	(+) 			Pre - existing configuration files ( ***Edit with some caution*** )

>	(&) 			Fragile Major configuration files ( ***Edit only if you are sure of what tou are doing*** )

>	(%) 			Auto -generated application files ( ***Edit to play a frustrating game of 'chasing the wind and wild geese'*** )
	

---
#### handling files in ***src/ {{ services | directives | controllers }}***

> Make your main controller and directive changes in the ***framework/framify.es6*** file	

#### Note:	
	
	*This file is required to run the application*

	[ Editing it carelessly may prove as fruitful as chasing the wind with the sole purpose being to catch and jail it for causing hurricanes ]
	

> Edit the ***app.es6***  file such that all your application files are included therein* )  
>  
	[*Failure to do this may mean that you have to implement an even dirtier routing mechanism*]

---
### VIEW DEVELOPMENT

> Avoid at all costs temptation(s) to place your view directly in the ***index.html***, ***dash.html*** or **panel.html** files. 
	
	[*Create sub routers for that purpose*]


 ----
### JAVASCRIPT PACKAGING

***To package your application after making changes to the files in "/src"***

##### Run 
> **gulp** 


***To watch for ongoing file changes,*** 
##### Run 
>**gulp watch**


 ----
 ### LINKS
[ Google Material Icons](https://design.google.com/icons/)

[ Out of the box application example](https://bixbyte.io/framify)

----
## Changelog
[Open Changelog Document](https://github.com/ianmin2/framify/blob/master/changelog.md)

----
## Contributors
* [ianmin2](https://github.com/ianmin2)


## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/framify.svg
[npm-url]: https://npmjs.org/package/framify
[downloads-image]: https://img.shields.io/npm/dm/framify.svg
[downloads-url]: https://npmjs.org/package/framify
[linux-image]: https://img.shields.io/travis/ianmin2/framify/master.svg?label=linux
[windows-image]: https://img.shields.io/appveyor/ci/dougwilson/express/master.svg?label=windows

[test-image]: https://img.shields.io/coveralls/ianmin2/framify/master.svg
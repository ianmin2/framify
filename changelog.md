> ## v1.14.0

	Added the frame.path() function 
		returns the current route without subroutes

> ## v1.14.1 
	
	Added the $scope.custom() query handler in app.ctrl.js
		Allows for custom SQL query processing 
			!! Handle with care.

> ## v1.14.2

	Simple quick edit to the query handler 

> ## v1.14.3

	Made the p-frame $connection->db_name and $connection->db_host public

> ## v1.15.0

	Removed the reference JS and CSS files in favor of concatenated library files js.js and css.css respectively

> ## v1.16.0
Added support for angular-charts 

	Documentation at https://jtblin.github.io/angular-chart.js/

> ## v1.16.1

	Added a standard startup database schema in schema>sample.sql

> ## v1.16.2

	Changed the user and admin login pages to encrypt their respective password field before attempted login

> ## v1.16.3

	Added required asterix's and basic defaults to the user and administrator management pages

> ## v1.17.0
	
	Added the cgi db based smart instanceOf counter

> ## v1.17.1

	=> 	Changed the php cgi process file to dish more custom messages

	=> 	Fixed an audit table no_reference to "aud_suppliers" error

> ## v1.18.0
	
	=> 	Added email sending support for the mailgun api

	-> Defined minimum nodejs version required

	-> Set preference for global installation

> ## v1.18.1
	
	=> Added pre crash handling
	
> ## v2.0.0 
	
	=> Added support for mongodb based JWT authentication and deprecated the previous default authentication.
	
> ## v2.0.1
	
	=> made the sendmail function globally accessible

> ## v2.1.0
	
	=> Added support for postgresql JWT authentication switchable via the global 'authMeth' variable in server/server.js

	=> Modified the sample schema to include the new required 'members' tuple needed for JWT authentication.

> ## v2.2.0 
	
	=> Added essential documentation for integration with framify.js 

	=> Made changes for eased remote client adaptability in framify.js
	
> ## v2.3.0
	
	=> Grouped the documentation into tabs

	=> Added methods to the framify.js dependency file
	
> ## v2.4.0
	
	=> Added an app.e_handler/error_handler/errorHandler method

	=> Added the /#/documentation route

	=> Updated outdated references to the logout function
	
> ## v2.4.1
	
	=> Added an ignore directive for the dev.folder in the .gitignore file

> ## v2.5.0 
	
	=> Removed the "request" module call in the upload route in favor of bixbyte-framify's included global "request" module

> ## v2.6.0
	
	=> Added the "/db" route for database connectivity via postgresql in line for the deprecation of the php-cgi module
	
> ## v2.6.1 
	
	=> Altered the structure of the sample sql file in favor of a more structure coupled file

> ## v2.7.0
	
	=> Updated the structure of the pr-automated db query handler

	=> Added an implicit link reference to the application favicon in the main html file 

	=> Updated to the latest version of framify.js with 'app.isimei' validation support

	=> Updated the structure of the "/mail" path to implicitly catch errors of omission of either of the "to,from" variables as well as the setting of the "bcc" variable where available

	=> Removed the "server/dbfy.js" file due to it's redundance after the implementation of the "/db" postgres handler route

	=> Added a notifier log message on startup to show the member authentication method loaded ("mongodb/postgreql")

	=> Removed the sample facebook authentication credentials from the configuration file 

	=> Changed the default access parameter values ["username,password,database"] for postgresql authentication in preparation for full customization at framify project initiaization

	=> Slightly Altered the content of the main "index.html" file
	
> ## v2.8.0 

	=> Added the preliminary password recovery feature accessible via the "/passwords" route

	=> Updated the authentication route handler "/auth" to use simple prepared statements for data entry.

> ## v2.9.0 

	=> Added a slightly more intuitive password recovery UI

> ## v2.10.0

	=> Altered the "config/config.js" file to use ".conf" files for passwords rather than inline text

	=> Altered the "schema/sample.sql" file to fit an email in organizations as well as a more intuitive easier to debug format

> ## v2.11.0

	=> Updated the passport JWT strategy and SQL to start support for SAAS 

	=> Fixed the deactivated user authentication issue
	
> ## v2.12.0 

	=> Updated the "auth"/register route via the postgres database implementation to accommodate a more flexible datase for insertion of main applixation members

> ## v2.13.0

	=> Updated the "process" pgdb file

	=> Updated the "db"/index.js file to return json rather than plain text

	=> Slight updates made to the main HTML file navigation menu

> ## v2.14.0 

	=> added the "keepMatch" and "removeMatch" methods that perform regex checks on csv's and Arrays alike returning an Array

> ## v2.15.0

	=> Fixed the "pgdb" not found exclusion error

> ## v2.16.0

	=> Merged the SMS frame project into the main application (logically and in the database schema as well) **need_to_rename_tables

	=> Fixed major database security flaws

	=> Allowed easy and atomic (regEx based) database security access definitions

	=> Integrated the encrypt,decrypt module

	=> Added the framify.js customizer via the "src" folder
		... build your project specific version by running "gulp"
		
> ## v2.16.1 

	=> Fixed the missing command parameters for the route "/auth/verify"
	
> ## v2.17.1

	=> Added the db/backup ignore directive in the .gitignore file

> ## v2.17.2

	=> Fixed missing dependency for gulp packaging the src files
	
> ## v2.17.3

	=> Fixed the erroneous SMS balance deduction upon the provision of falsy SMS credentials 
	
> ## v2.17.4

	=> Fixed the  missing organization record for the members trigger function
	
> ## v2.17.5

	=> Re-did the login and signup forms to merge more fluently the UI-KIT design language

	=> Fixed a critical error that limited SMS credit loading to default organizationn rather than the User's Organization
	
> ## v2.17.6

	=> Changed the main password recovery  router from static file referencing to utilize the more stable path module
	
> ## v2.18.0 

	=> Added user welcome email capability

	=> Fixed the pesky user data lingering after logout issue

	=> Added support for error Emails on some routes

	=> Started the move to a more modular system

	=> Added in-app password recovery

	=> Fixed a lingering unnecesary field "name.last" required on signup issue

> ## v2.18.1

	=> Updated the documentation and changelog format.

	=> Removed some unecessary files

	=> Added sample configuration files for the user
	
> ## v2.18.3
	
	=> Deleted the redundant files (from previous versions)

> ## v2.18.4

	=> Fixed a provider attribution in the 'in-app' password recovery file 

> ## v2.18.5

	=> Fixed lingering SQL issues

	=> Fixed a lingering *"property role undefined not found"* for authentication in the main framework file


> ## v2.19.0

	=> Added  a global  http intercept to replace the after authentication handler
app.drive = app.drive || {};
app.git	  = app.git || {};

require("./git/git.js");
require("./drive/drive.js");

app.cloud =  app.cloud || {};

app.cloud.callbacks = {
	drive: app.drive.init,
	git: app.git.init
};
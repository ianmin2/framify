require("./config_cloud_git.js");
require("./config_cloud_drive.js");

global.cloud_callbacks = {
    drive: init_drive,
    git:    init_git
};
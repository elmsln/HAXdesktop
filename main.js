const {app, BrowserWindow} = require("electron");
const path = require("path");
//auto update, need to be worked on
//need to set a flag that this api understands
require("update-electron-app")();

//flag for production or dev environment
process.env.NODE_ENV = "development";





function createWindow() {
    var mainWindow = new BrowserWindow();

    mainWindow.loadFile(path.join(__dirname, "mainWindow.html"));
    if(process.env.NODE_ENV === "production")
        mainWindow.removeMenu();

     //Quit app when closed
     mainWindow.on("closed", function() {
        app.quit();
    })
}

app.on("ready", function() {
    createWindow();
})
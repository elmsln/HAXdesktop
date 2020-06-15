const {app, BrowserWindow} = require("electron");
const path = require("path");
require("update-electron-app")();

function createWindow() {
    var mainWindow = new BrowserWindow();

    mainWindow.loadFile(path.join(__dirname, "mainWindow.html"));

     //Quit app when closed
     mainWindow.on("closed", function() {
        app.quit();
    })
}

app.on("ready", function() {
    createWindow();
})
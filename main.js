const {app, BrowserWindow, Menu, dialog} = require("electron");
const { opendir } = require("fs");
const path = require("path");
const Shell = require("node-powershell");

//flag for production or dev environment
process.env.NODE_ENV = "development";

/*
    Menu contains file operations including "Open", "Save", and "Publish".
    Menu's file operations are not yet fully functional - will probably need to establish some
    variables saved within the application which control the active open project directory, and
    potentially more, haven't thought through it a ton, just trying to start a menu skeleton.
    Menu also contains functionality to toggle a fully operational Chrome devtool menu.
*/
var mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click(item, focusedWindow, event)
                {
                    /*
                        This probably doesn't actually open any directories, just opens the system open dialog.
                    */
                    dialog.showOpenDialog(opendir);
                }
            },
            {
                label: 'Save',
                click(item, focusedWindow, event)
                {
                    /*
                        This probably doesn't actually save anything, just opens the system save dialog.
                    */
                    dialog.showSaveDialog();
                }
            },
            {
                label: 'Publish',
                click(item, focusedWindow, event)
                {
                    /*
                        Uses node to instantiate powershell in order to eventually execute shell commands.
                    */
                    var powershell = new Shell();
                    /*
                        Git commands would go below as well.  The app should store a string variable
                        controlling the directory to the local site that the user has open currently.
                        In place of __dirname, we would cd into the currently open path.
                    */
                    powershell.addCommand('cd ' + __dirname);
                    /*
                        The below then obviously invokes the commands which we added to the shell script.
                        Not sure if we want to console.log the output/errors but the implementation in
                        order to do so is there.
                    */
                    powershell.invoke()
                    .then(function(output)
                    {
                        console.log(output);
                    })
                    .catch(function(err)
                    {
                        console.log(err);
                        powershell.dispose();
                    })
                }
            }
        ]
    },
    {
        label: 'Developer Tools',
        click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
        }
        
    }
];



function createWindow() {

    var mainWindow = new BrowserWindow();

    //Build menu from above template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    /*
        Would it make sense to have a static "welcome" page with buttons allowing the user
        to open a local project, and other functionality?  I think this would make sense.
        It would then involve simply revamping the mainWindow.html page I think.  Also, what's
        the deal with the mainWindow.removeMenu() call?  Was this meant to remove the devtools
        toggle option?
    */
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


const electron = require('electron');
    // Module to control application life.
const app = electron.app;
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let splashWindow;
let mainWindow;

function createSplashWindow() {
    // Create the browser window.
    splashWindow = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false
    })

    // and load the index.html of the app.
    splashWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // splashWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    splashWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        splashWindow = null
    })
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    // splashWindow.webContents.openDevTools()

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createSplashWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createMainWindow();
    }
});

setTimeout(function() {
    console.log(app);
}, 10000);
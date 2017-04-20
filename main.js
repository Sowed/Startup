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
        frame: false,
        resizable: false,
        backgroundColor: '#2b2b2b',
        transparent: true,
        thickFrame: true,
        show: false

    });

    // and load the index.html of the app.
    splashWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    splashWindow.once('ready-to-show', () => {
        splashWindow.show();
    });

    // Emitted when the window is closed.
    splashWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        splashWindow = null
    });

}

function createMainWindow(splash) {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    //mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        splash.close();

    });
}

app.on('ready', function(){
    createSplashWindow();
    setTimeout(function () {
        createMainWindow(splashWindow);
    }, 5000);

});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
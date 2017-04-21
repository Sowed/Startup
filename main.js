const electron = require('electron');

// Module to control application life.
// Module to create native browser window.
// Module to create native Menu.
const {app, BrowserWindow, Menu} = electron;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let splashWindow;
let mainWindow;

let menuTemplate = [
    {
        label: 'Startup',
        submenu: [
            {
                label: 'Settings',
                click: () => {
                    console.log('No settings yet');
                }
            },
            {
                label: 'About',
                click: () => {
                    createSplashWindow();
                    setTimeout(function () {
                        splashWindow.close();
                    }, 10000);
                }
            }
        ]
    }
];

function createSplashWindow() {
    // Create the browser window.
    splashWindow = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false,
        resizable: false,
        backgroundColor: '#2b2b2b',
        skipTaskbar: true,
        transparent: true,
        thickFrame: true,
        parent: mainWindow,
        modal: true,
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
        minWidth: 800,
        minHeight: 500,
        backgroundColor: '#aaa',
        title: 'SACCO  |  Welcome',
        icon: '',
        autoHideMenuBar: true,
        maximized: true,
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    //mainWindow.webContents.openDevTools()

    //Setup custom menu for mainWindow
    let mainMenu = Menu.buildFromTemplate(menuTemplate);
    mainWindow.setMenu(mainMenu);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        if (splash !== null) {
            splash.close();
            setTimeout(function () {
                //console.log('The SACCO is fully loaded');
                //mainWindow.setTitle('Welcome');
                //mainWindow.setSkipTaskbar(true);
                //mainWindow.setIgnoreMouseEvents(true);
            }, 2000);
        }
    });
}

app.on('ready', function () {
    createSplashWindow();
    setTimeout(function () {
        createMainWindow(splashWindow);
    }, 1000);

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
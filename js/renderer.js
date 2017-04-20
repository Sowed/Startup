//document.write('Hello World');
//alert('Welcome \nTo the new World');

const fs = require('fs'),
    contents = fs.readFileSync('./package.json', 'utf8');
alert(contents);

const remote = require('electron').remote,
    Menu =  require('electron').menu;

let menu = Menu.buildFromTemplate([{
    label: 'Startup',
    submenu: [
        {
            label: 'Settings',
            click: function () {
                alert('No settings yet');
            }
        }
    ]
}]);
console.log(menu);
Menu.setApplicationMenu(menu);
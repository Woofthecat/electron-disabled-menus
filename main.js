// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const template = [
  {
    role: 'window' //dummy
  },
  {
    label: 'Test',
    submenu: [
      {
        label: 'Enabled', 
        accelerator: 'Shift+F',
        click () { console.log('Enabled clicked') }
      },
      {
        label: 'Disabled submenu',
        submenu: [
          {
            label: 'Disabled 1',
            accelerator: 'Shift+H',
            click () { console.log('Disabled 1 clicked') }
          },
          {
            label: 'Disabled 2',
            accelerator: 'Shift+J',
            click () { console.log('Disabled 2 clicked') }
          }	
        ],
        enabled: false,
        click () { console.log('Disabled submenu clicked') }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template);

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

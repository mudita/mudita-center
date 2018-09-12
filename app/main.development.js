const {darwinWindow, windowsWindow} = require("./electron/window");
const fsPromises = require("fs").promises;
const {app, BrowserWindow, Menu} = require('electron');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

log.transports.file.level = "debug";
autoUpdater.logger = log;

let menu;
let template;
let mainWindow = null;


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

//`fsPromises.readdir`
//
// mainWindow.webContents.send('ping', value)


function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text);
}

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require
    require('devtron').install();

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
  }

  return Promise.resolve([]);
};

app.on('ready', async () => {
  await installExtensions();

  // const appVersion = require('./package.json').version;
  // log.info(`app.getVersion ${app.getVersion()}`);
  // log.info(`package.json-require.version ${appVersion}`);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });


  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', async () => {
    mainWindow.show();
    mainWindow.focus();
    await autoUpdater.checkForUpdatesAndNotify();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
  });

  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
  });

  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
  });

  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const {x, y} = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

  if (process.platform === 'darwin') {
    template = darwinWindow(app, mainWindow);
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = windowsWindow(app, mainWindow);
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu)
  }
});

const listFiles = async (path = './') => {
  return await fsPromises.readdir(path);
};

exports.listFiles = listFiles;
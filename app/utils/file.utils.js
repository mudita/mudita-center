const fsPromises = require("fs").promises;

const listFiles = async (path = './') => {
  return await fsPromises.readdir(path);
};

const isElementFile = async (path) => {
  try {
    const file = await fsPromises.lstat(path);
    return file.isFile();
  } catch (err) {
    throw new Error('is element file error')
  }
};

const isElementDirectory = async (path) => {
  try {
    const file = await fsPromises.lstat(path);
    return file.isDirectory();
  } catch (err) {
    throw new Error('is element file error')
  }
};


exports.fileUtils = {
  listFiles,
  isElementFile,
  isElementDirectory
};
const fsPromises = require("fs").promises;
const fs = require('fs');

const FileType = {
  file: 'file',
  directory: 'directory',
  unknown: 'unknown'
};

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

const checkType = (path) => {
  const isFile = fs.lstatSync(path).isFile();
  const isDirectory = fs.lstatSync(path).isDirectory();

  if (isFile) {
    return FileType.file;
  }

  if (isDirectory) {
    return FileType.directory
  }

  return FileType.unknown
};

exports.fileUtils = {
  checkType,
  listFiles,
  isElementFile,
  isElementDirectory
};
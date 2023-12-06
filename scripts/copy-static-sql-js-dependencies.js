const fs = require('fs');
const path = require("path")
const shell = require('child_process').execSync;

const FILES_TO_COPY = ['sql-wasm-debug.js', 'sql-wasm-debug.wasm', 'sql-wasm.js', 'sql-wasm.wasm']

FILES_TO_COPY.forEach(fileName => {
    const sourcePath = path.resolve(__dirname, "../node_modules/sql.js/dist", fileName)
    const destinationPath = path.resolve(__dirname, "../apps/mudita-center/static", fileName)
    console.log("sourcePath", sourcePath)
    console.log("destinationPath", destinationPath)

    fs.copyFile(sourcePath, destinationPath, (err)=>{
        console.log(err)
    })
})

//this needs to be moved to new file
var source = path.resolve(__dirname, "../node_modules/electron")
var destination = path.resolve(__dirname, "../apps/mudita-center/node_modules/electron")

if(process.platform === "win32") {
    shell(`Xcopy ${source} ${destination} /E /H /C /I`);
}
else {
    shell(`mkdir -p ${destination}`);
    shell(`cp -r ${source}/* ${destination}`);
}

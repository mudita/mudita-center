const fs = require('fs');
const path = require("path")

const FILES_TO_COPY = ['sql-wasm-debug.js', 'sql-wasm-debug.wasm', 'sql-wasm.js', 'sql-wasm.wasm']

FILES_TO_COPY.forEach(fileName => {
    const sourcePath = path.resolve(__dirname, "../node_modules/sql.js/dist", fileName)
    const destinationPath = path.resolve(__dirname, "../static", fileName)

    fs.copyFile(sourcePath, destinationPath, (err)=>{
        console.log(err)
    })
})
namespace ReadDB {
  const fs = require("fs")
  const initSqlJs = require("sql.js")
  const elasticlunr = require("elasticlunr")

  const filePath = process.argv.slice(2)[0]

  const readDatabaseFile = async (path: string) => {
    const fileBuffer = await fs.readFileSync(path)
    // console.log(Buffer.from(res).toString("utf-8"))
    const storage = {}

    const SQL = await initSqlJs()
    const db = new SQL.Database(fileBuffer)
    const tables = await db.exec(
      'SELECT name FROM sqlite_master WHERE type = "table";'
    )[0].values

    tables.forEach((table) => {
      const tableName = table[0]

      storage[tableName] = elasticlunr()

      const data = db.exec(`SELECT * FROM ${tableName};`)[0]

      data.columns.forEach((column) => {
        if (column.includes("_id")) {
          storage[tableName].setRef(column)
        } else {
          storage[tableName].addField(column)
        }
      })

      data.values.forEach((value) => {
        const doc = {}

        value.forEach((field, index) => {
          doc[data.columns[index]] = String(field)
        })

        // if (table === 'contact_number') {
        // console.log(tableName, doc)
        // }

        storage[tableName].addDoc(doc)
      })
    })

    console.log(
      storage["contact_number"].search("883", {
        // fields: {
        //   number_user: { boost: 2 }
        // },
        // bool: "OR",
        expand: true,
      })
    )

    console.log(storage["contact_number"].documentStore.getDoc("146"))

    // .search('883982', {
    //   fields: {
    //     number_user: { boost: 2 }
    //   }
    // }))

    // fs.open(path, 'r', (status, fd) => {
    //   if (status) {
    //     console.log(status.message)
    //     return
    //   }

    //   console.log(fd)

    //   const buffer = Buffer.alloc(1000)
    //   fs.read(fd, buffer, 0, 100, 0, function(err, num) {
    //     console.log(buffer.toString('utf8', 0, num))
    //   })
    // })
  }

  readDatabaseFile(filePath)
}

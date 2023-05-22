const {Connection, Request} = require('tedious');

const config = {  
    server: 'homebacklog-sql1.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'azureuser', //update me
            password: '0TblT@M!'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'webappdb',  //update me
        trustServerCertificate: false,
        rowCollectionOnRequestCompletion: true,
        connectTimeout: 15000,
        requestTimeout: 5000,
        cancelTimeout: 3000,
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: true,
            log: true
        }
    }
};  



const getConnected = async () => {
    return new Promise((resolve, reject) => {
        console.log("Connecting....");
        const connection = new Connection(config);
        console.log("Connecting-object created");

        
        connection.on('connect', (err) => {
            if(err) {
                console.log("error");
                reject(err);
            } else {
                console.log("Resolved");
                resolve(connection);  
            }
        });
        connection.connect();
    });
}

const executeQuery = async (sql) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Ready to connect!!");
            const connection = await getConnected();
            console.log("connected");
            const request = new Request(sql, (err, rowCount, rows) => {
                if(err) {
                    reject(err);
                } else {
                    console.log(rowCount + ' rows');
                    resolve({rowCount: rowCount, rows: rows });  
                }  
            });

            request.on('row', (columns) => {
                columns.forEach((column) => {
                  if (column.value === null) {
                    console.log('NULL');
                  } else {
                    console.log(column.value);
                  }
                });
              });

            connection.execSql(request);
        } catch(err) {
            reject(err);
        }
    });
};

module.exports.queryTodolist = async () => {
    const sql = 'SELECT * FROM todolist';
    console.log("Todolist query");
    return await executeQuery(sql);
};
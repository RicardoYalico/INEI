
const { Client } = require('pg')

const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
  password: 'postgres',
  port: 5432,
}

const client = new Client(connectionData)

client.connect().then(client=> console.log('connected')) 

const queryExample = client.query('SELECT * FROM newtable')

var distritos = [];


Promise.all([queryExample]).then(
  result=>{
    const queryExampleResult = result[0].rows;

    distritos = queryExampleResult;

    console.log(distritos)
  }
)



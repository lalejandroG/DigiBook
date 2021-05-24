var pg = require('pg');

var conString = "postgres://bhqbaqpt:2WbvlNpZb6V6BupIHAV8G7eUlTASlxQh@kashin.db.elephantsql.com/bhqbaqpt" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('No se pudo conectar a postgres', err);
  }
  client.query('SELECT * FROM autor', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});
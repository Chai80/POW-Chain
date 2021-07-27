const client = requre('./client')
const{PUBLIC_KEY} = require('./config');

client.request('getBalance', [PUBLIC_KEY], function(err, response)){
  if(err) throw err;
  console.log(response.result);
}
 

// let fs = require('fs');
// let key = fs.readFileSync('client.pem'); // If you require a .pem file otherwise remove
//
// exports.connectionString = function(){
//   return 'mongodb://USERNAME:PASSWORD@xx.xx.xxx.xx:xxxx,xx.xx.xxx.xx:xxxx,xx.xx.xxx.xx:xxxx/perf?ssl=true&replicaSet=mongo7063';
// };
//
// exports.options = function() {
//   return {
//     server: {
//       ssl: true,
//       sslValidate:true,
//       sslCA: key
//     }
//   };
// };
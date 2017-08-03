// export class Result {
//   endTime: Date;
//   elapsed: String;
//   executedBy: String;
//   queryString: String;
//   version: String;
//   host: String;
//
//   constructor() {
//     this.endTime = new Date();
//   }
// }

const uuid = require('uuid/v4');

module.exports = (function () {
  function Result() {
    this.endTime = new Date();
    this.id = uuid();
  }

  return Result;
}());

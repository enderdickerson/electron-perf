function fib(n) {
   if (n === 0) {
     return 0;
   } else if (n === 1) {
     return 1;
   } else {
     return fib(n-1) + fib(n-2);
   }
}

process.on('message', function(input) {
  output = fib(input);
  process.send(output);
});

module.exports = fib

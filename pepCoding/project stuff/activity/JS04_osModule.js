// inbuilt library/module
// os module - gives the feature of os to get some info related to it
const os = require('os');

console.log(os.arch());         // x64 
/* Returns the operating system CPU architecture for which the Node.js binary was compiled. */

console.log(os.platform());     // win32
/* Returns a string identifying the operating system platform. The value is set at compile time. Possible values are 'darwin', 'linux', 'openbsd',  and 'win32' etc. */

console.log(os.hostname());     // MayankPC
/* Returns the host name of the operating system as a string. */

// console.log(os.networkInterfaces());
/* Returns an object containing network interfaces that have been assigned a network address. */

console.log(os.cpus());
/* Returns an array of objects containing information about each logical CPU core. */
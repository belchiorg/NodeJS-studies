const _ = require('underscore');

// Checks if it's a core module
// Then checks if it's a file or folder
// Finally, assumes it's an npm module'

const check = _.contains([1,2,3], 3);

console.log(check)
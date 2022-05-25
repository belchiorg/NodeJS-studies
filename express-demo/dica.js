const EventEmitter = require('events')

var hey = () => {
    console.log("Lindo");
}

/*


class  Logger extends EventEmitter{
    log(message) { 
        console.log(message)
    }

    this.emit('Message Logged', {id: 1, url : 'http://localhost'});
}*/

module.exports = hey;
// @flow

class Logger {
    log: (...args: Array<any>) => void;
    constructor() {
        this.log =console.log ;
    }
}

export default new Logger();

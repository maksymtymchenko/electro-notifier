class Logger {
    constructor() {
        this.levels = {
            info: 'INFO',
            warn: 'WARN',
            error: 'ERROR'
        };
    }

    getTimeStamp() {
        return new Date().toISOString();
    }

    log(level, message, data) {
        if (!this.levels[level]) {
            throw new Error(`Invalid log level: ${level}`);
        }
        console.log(`[${this.getTimeStamp()}] [${this.levels[level]}]: ${message} - ${data}`);
    }

    info(message, data = null) {
        this.log('info', message, data);
    }

    warn(message, data = null) {
        this.log('warn', message, data);
    }

    error(message, data = null) {
        this.log('error', message, data);
    }
}

// Usage example:
export const logger = new Logger();

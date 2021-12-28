import { ConsoleDriver } from "./drivers/console";
import { LoggerDriverInterface } from "./logger-driver-interface";
import { LogMessage } from "./log-message";
import { LogLevel } from "./log-level";

class Logger {
  public options: LoggerOptions;
  private _driver: LoggerDriverInterface;
  private _tag?: string;

  constructor(options?: LoggerOptions) {
    this.options = Object.assign({}, LoggerDefaultOptions, options);
    this._driver = this.options.driver;
    if (this.options.showTimestamp) {
      this._driver.showTimestamp(this.options.showTimestamp);
    }
    this._tag = this.options.tag;
  }

  private _buildMessage(level: LogLevel, message: string, ...extras: any) {
    return new LogMessage(level, message, this._tag, extras);
  }

  private _writeLog(message: LogMessage) {
    this.options.driver.writeLog(message);
  }

  private _process(level: LogLevel, message: string, ...extras: any): void {
    let logMessage = this._buildMessage(level, message, ...extras);
    this._writeLog(logMessage);
  }

  showTimestamp(show: boolean) {
    this.options.showTimestamp = show;
    this._driver.showTimestamp(this.options.showTimestamp);
  }

  error = (message: string, ...args: any) =>
    this._process(LogLevel.ERROR, message, ...args);
  warning = (message: string, ...args: any) =>
    this._process(LogLevel.WARNING, message, ...args);
  notice = (message: string, ...args: any) =>
    this._process(LogLevel.NOTICE, message, ...args);
  info = (message: string, ...args: any) =>
    this._process(LogLevel.INFO, message, ...args);
  debug = (message: string, ...args: any) =>
    this._process(LogLevel.DEBUG, message, ...args);
}

const LoggerDefaultOptions: LoggerOptions = {
  driver: new ConsoleDriver(),
  showTimestamp: false,
  logLevel: LogLevel.NOTICE,
};

export interface LoggerOptions {
  driver: LoggerDriverInterface;
  tag?: string;
  showTimestamp?: boolean;
  logLevel?: LogLevel;
}

export default Logger;

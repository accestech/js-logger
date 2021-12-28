import { LogLevel } from './../log-level';
import { LogMessage } from '../log-message';
import { LoggerDriverInterface } from './../logger-driver-interface';

export class ConsoleDriver implements LoggerDriverInterface {

    private _withTimestamp: boolean = false
    private _methods: Map<LogLevel, Function> = new Map<LogLevel, Function>([
        [LogLevel.ERROR, console.error],
        [LogLevel.WARNING, console.warn],
        [LogLevel.NOTICE, console.log],
        [LogLevel.INFO, console.log],
        [LogLevel.DEBUG, console.log]
    ])

    public showTimestamp(show: boolean): void {
        this._withTimestamp = show          
    }

    public writeLog(message: LogMessage): void {
        let messageLogged = message.text
        if (message.tag !== null) messageLogged = this._prepend(messageLogged, message.tag)
        if (this._withTimestamp) messageLogged = this._prepend(messageLogged, message.timestamp.toISOString())
        this._methods.get(message.level)!(messageLogged, ...message.extras)
    }

    private _prepend(text: string, prefix: string, decorator: [string, string] = ["[", "]"], separator: string = " ") : string {
        return [decorator[0], prefix, decorator[1], separator, text].join('')
    }
}
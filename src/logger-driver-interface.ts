import { LogMessage } from './log-message';

export interface LoggerDriverInterface {
    writeLog(message: LogMessage): void
    showTimestamp(show: boolean): void
}
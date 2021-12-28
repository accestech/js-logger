import { LogLevel } from "./log-level";

export class LogMessage {
  private _level: LogLevel;
  private _text: string;
  private _tag?: string;
  private _timestamp: Date;
  private _extra: Array<any>;

  public constructor(
    level: LogLevel,
    message: string,
    tag?: string,
    ...extras: any
  ) {
    this._level = level;
    this._text = message;
    this._tag = tag;
    this._timestamp = new Date();
    this._extra = extras;
  }

  public get text(): string {
    return this._text;
  }

  public get level(): LogLevel {
    return this._level;
  }

  public get timestamp(): Date {
    return this._timestamp;
  }

  public get extras(): Array<any> {
    return this._extra;
  }

  public get tag(): string | null {
    return this._tag ?? null;
  }
}

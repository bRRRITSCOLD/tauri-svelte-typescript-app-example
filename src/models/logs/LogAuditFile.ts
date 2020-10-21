// node_modules
import { assign, findIndex, get } from "lodash";
import { v4 as uuid } from 'uuid';
import type { AnyObject } from "../common";

export interface LogAuditFileLogFileInterface {
  id?: string;
  date: number;
  name: string;
  hash: string;
  path?: string;
  data?: {
    level: string;
    message: string;
  }[];
}

export class LogAuditFileLogFile implements LogAuditFileLogFileInterface {
  public id?: string;
  public date!: number;
  public name!: string;
  public hash!: string;
  public path?: string;
  public data?: {
    level: string;
    message: string;
  }[];

  public constructor(logAuditFileLogFile: Partial<LogAuditFileLogFileInterface>) {
    assign(this, logAuditFileLogFile, {
      id: get(logAuditFileLogFile, 'id', uuid()),
      date: get(logAuditFileLogFile, 'date'),
      name: get(logAuditFileLogFile, 'name'),
      hash: get(logAuditFileLogFile, 'hash'),
      path: get(logAuditFileLogFile, 'path'),
      data: get(logAuditFileLogFile, 'data')
    })
  }
}

export interface LogAuditFileInterface {
  id: string;
  directory: string;
  keep: {
    days?: boolean;
    amount: number;
  },
  auditlog: string;
  logFiles: LogAuditFileLogFileInterface[];
}

export class LogAuditFile implements LogAuditFileInterface {
  public id!: string;
  public directory!: string;
  public keep!: {
    days?: boolean;
    amount: number;
  };
  public auditlog!: string;
  public logFiles!: LogAuditFileLogFile[];

  public constructor(logAuditFile: LogAuditFileInterface) {
    assign(this, logAuditFile, {
      id: get(logAuditFile, 'id', uuid()),
      directory: get(logAuditFile, 'directory'),
      keep: get(logAuditFile, 'keep'),
      auditlog: get(logAuditFile, 'auditlog'),
      logFiles: get(logAuditFile, 'logFiles')
    });
  }

  public replaceLogFile(replaceCriteria: AnyObject, logAuditFileLogFile: LogAuditFileLogFileInterface) {
    // create new log audit file log file instance
    const newLogAuditFileLogFile = new LogAuditFileLogFile(logAuditFileLogFile);
    // first find the index of the current log file
    const foundLogFileIndex = findIndex(this.logFiles, replaceCriteria);
    // now if found replace and if not found push into array
    if (foundLogFileIndex > -1) {
      this.logFiles[foundLogFileIndex] = newLogAuditFileLogFile;
    } else {
      this.logFiles.push(newLogAuditFileLogFile)
    }
    // return explicitly
    return;
  }
}
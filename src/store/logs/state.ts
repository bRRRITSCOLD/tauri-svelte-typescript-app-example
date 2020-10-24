// models
import type { LogAuditFile } from '../../models';

export interface LogStoreStateInterface {
  logAuditFiles: LogAuditFile[];
}

export const initialLogsStoreState: LogStoreStateInterface = {
  logAuditFiles: [],
};

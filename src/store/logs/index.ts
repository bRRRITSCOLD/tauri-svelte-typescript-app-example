// node_modules
import { writable, readable, derived, get } from "svelte/store";
import { reduxify } from "svelte-reduxify";
import type * as tauriFs from 'tauri/api/fs';
import { v4 as uuid } from 'uuid';
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// models
import type { LogAuditFile, LogAuditFileInterface, LogAuditFileLogFileInterface } from '../../models';

// services
import {
  directoriesService,
  filesService,
  logsService
} from "../../services";

// store specific
import { initialLogsStoreState } from "./state";
import { LOGS_STORE_KEY } from "./keys";


// get persisted item
const storedLogsStore = JSON.parse(sessionStorage.getItem(LOGS_STORE_KEY));
console.log('storedLogsStore=', storedLogsStore);
// create writable
const { subscribe, update, set } = writable(assign({}, initialLogsStoreState, _.isObject(storedLogsStore) ? storedLogsStore : {}));
subscribe(value => {
  console.log('logStoreSubscribe=', value);
  sessionStorage.setItem(LOGS_STORE_KEY, JSON.stringify(value));
});

function createLogsStore() {
  // // get persisted item
  // const storedLogsStore = JSON.parse(sessionStorage.getItem(LOGS_STORE_KEY));
  // console.log('storedLogsStore=', storedLogsStore);
  // // create writable
  // const { subscribe, update, set } = writable(assign({}, initialLogsStoreState, _.isObject(storedLogsStore) ? storedLogsStore : {}));
  // subscribe(value => {
  //   console.log('logStoreSubscribe=', value);
  //   sessionStorage.setItem(LOGS_STORE_KEY, JSON.stringify(value));
  // });

  return {
    update,
    subscribe,
    reset: () => set(initialLogsStoreState),
    addLogDirectory: async () => {
      // ask user for log files directory
      const logDirectory: string = await directoriesService.getDirectoryName();
      // read the directory
      const logDirectoryFiles = await directoriesService.readDir(logDirectory);
      // no filter/reduce down the results
      const logAuditFile = logDirectoryFiles.reduce((auditFile: any, file: tauriFs.FileEntry) => {
        if (_get(_get(file, 'name', '').split('.').slice(-1), '[0]', '').toUpperCase() === 'JSON') {
          auditFile = assign({}, file, { logDirectory });
        }
        return auditFile;
      }, undefined);
      // read the audit file
      const readLogAuditFile = await filesService.readTextFile(logAuditFile.path);
      const parsedReadLogAuditFile: any = JSON.parse(readLogAuditFile);
      // now let us take the data from the readDir
      // operation from above and merge it with the
      // log files under each auditLogFile
      // set log audit files in store
      update(
        state => {
          const updatedData = {
            logAuditFiles: _.replaceOne(
              { auditLog: parsedReadLogAuditFile.auditLog },
              state.logAuditFiles,
              assign(
                {},
                parsedReadLogAuditFile, 
                {
                  path: parsedReadLogAuditFile.path,
                  directory: logDirectory,
                  id: uuid(),
                  logFiles: parsedReadLogAuditFile.files.map((file: LogAuditFileLogFileInterface) => {
                    // first find the log audit file log file
                    // that correlates to each file returned
                    // from the above readDir call
                    const foundReadDirFile = logDirectoryFiles.find((logDirectoryFile) => logDirectoryFile.path.includes(file.name));
                    console.log('foundReadDirFile=', foundReadDirFile);
                    return assign(
                      {},
                      file,
                      {
                        path: foundReadDirFile?.path
                      }
                    )
                  })
                }
              )
            ) 
          };
          console.log('updatedData=', updatedData);
          // create new state
          const newState = _.assign(
            {},
            state,
            updatedData
          );
          console.log('newState=', newState);
          // return new state
          return _.assign({}, newState);
        }
      );
    }
  };
}

const logsStore = createLogsStore();

export { logsStore };

// /* computed values */
// export const getTotalHeroes = derived(
//   heroStore,
//   $heroStore => $heroStore.heroes.length
// );
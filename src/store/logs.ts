// node_modules
import { writable, readable, derived, get } from "svelte/store";
import { reduxify } from "svelte-reduxify";
import type * as tauriFs from 'tauri/api/fs';
import { v4 as uuid } from 'uuid';
import { get as _get, assign } from 'lodash';
import { _ } from '../lib/utils';

// models
import type { LogAuditFile, LogAuditFileInterface, LogAuditFileLogFileInterface } from '../models';

// services
import {
  directoriesService,
  filesService,
  logsService
} from "../services";

export interface LogStoreStateInterface {
  logAuditFiles: LogAuditFile[];
}

const initialLogsStoreState: LogStoreStateInterface = {
  logAuditFiles: [],
};

function createLogsStore() {
  const { subscribe, update, set } = writable(initialLogsStoreState);

  return {
    update,
    subscribe,
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
  //   loadHeroes: async () => {
  //     update(state => (state = { ...state, isLoading: true }));
  //     try {
  //       const res = (await getHeroes()).data;
  //       update(state => (state = { ...state, heroes: res }));
  //     } catch (e) {
  //       alert(e.message);
  //     } finally {
  //       update(state => (state = { ...state, isLoading: false }));
  //     }
  //   },

  //   loadHeroById: async id => {
  //     update(state => (state = { ...state, isLoading: true }));
  //     try {
  //       const res = (await getHeroById(id)).data;
  //       update(state => (state = { ...state, hero: res }));
  //     } catch (e) {
  //       console.log(e.message);
  //       alert(e.message);
  //     }
  //     update(state => (state = { ...state, isLoading: false }));
  //   },

  //   createHero: async newHero => {
  //     update(state => (state = { ...state, isLoading: true }));
  //     try {
  //       const res = (await postHero(newHero)).data;
  //       update(
  //         state =>
  //           (state = { ...state, heroes: [...state.heroes, res] })
  //       );
  //     } catch (e) {
  //       alert(e.message);
  //     } finally {
  //       update(state => (state = { ...state, isLoading: false }));
  //     }
  //   },

  // /* Optimistic UI update. Updating the UI before sending the request to the web service */
  //   removeHero: async id => {
  //     const confirmation = confirm("You sure you want to delete this?");
  //     if (!confirmation) return;

  //     let previousHeroes;
  //     update(state => {
  //       previousHeroes = state.heroes;
  //       const updatedHeroes = state.heroes.filter(h => h._id !== id);
  //       return (state = { ...state, heroes: updatedHeroes }); // need to return the state only
  //     });
  //     try {
  //       await deleteHero(id);
  //     } catch (e) {
  //       alert(e.message);
  //       update(state => (state = { ...state, heroes: previousHeroes })); // rolling back. =)
  //     }
  //   },

  //   updateHero: async updatedHero => {
  //     update(state => (state = { ...state, isLoading: true }));
  //     try {
  //       await putHero(updatedHero);
  //       update(state => {
  //         const index = state.heroes.findIndex(h => h._id === updatedHero._id);
  //         const copyOfHeroes = state.heroes;
  //         copyOfHeroes[index] = updatedHero;
  //         return (state = {
  //           ...state,
  //           heroes: copyOfHeroes
  //         });
  //       });
  //     } catch (e) {
  //       alert(e.message);
  //     } finally {
  //       update(state => (state = { ...state, isLoading: false }));
  //     }
  //   }
  };
}

export const logsStore = createLogsStore();

// /* computed values */
// export const getTotalHeroes = derived(
//   heroStore,
//   $heroStore => $heroStore.heroes.length
// );
// node_modules
import * as tauriDialog from 'tauri/api/dialog';
import * as tauriFs from 'tauri/api/fs';

export async function getDirectoryName(): Promise<string> {
  // ask user for log files directory
  const logDirectory = await tauriDialog.open({ directory: true, multiple: false });
  // return the log directoy
  // name explicitly
  return logDirectory as string;
}

export async function readDir(directoryPath: string) {
  // read the directory
  const logDirectoryFiles = await tauriFs.readDir(directoryPath, { recursive: true } as any);
  // return the log directoy
  // files/hierarchy explicitly
  return logDirectoryFiles;
}
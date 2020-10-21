// node_modules
import * as tauriFs from 'tauri/api/fs';

export async function readTextFile(filePath: string): Promise<string> {
  // read the audit file
  const readTextFile = await tauriFs.readTextFile(filePath);
  // explicity return read file
  return readTextFile;
}

export async function readTextFiles(filePaths: string[]): Promise<string[]> {
  // read all files
  const readTextFiles = await Promise.all(
    filePaths.map((filePath: string) => readTextFile(filePath))
  );
  // explicitly return read files
  return readTextFiles;
}
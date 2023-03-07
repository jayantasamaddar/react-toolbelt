import { constants } from 'fs';
import { access, readdir, rmdir, unlink } from 'fs/promises';
import { join } from 'path';

export async function rmDirRecursive(folderPath: string) {
  try {
    // Sanity check for permissions
    await access(folderPath, constants.R_OK | constants.W_OK);
  } catch (err) {
    console.log(
      `\x1b[91m Access error\x1b[0m: Could not access '${folderPath}'`
    );
    return false;
  }
  try {
    const files = await readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = join(folderPath, file.name);
      if (file.isDirectory()) {
        await rmDirRecursive(filePath);
      } else {
        await unlink(filePath);
      }
    }
    await rmdir(folderPath);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return false;
    }
  }
}

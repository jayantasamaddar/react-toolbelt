import { existsSync } from 'fs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join, relative } from 'path';

/**
 * Read from a location and write another location.
 * Run pre and post processor hooks.
 *
 * Pre-processor hooks can be used to format the file.
 *
 * Post-processor hooks can be used to read from and write to another file in the same flow.
 *
 * @async
 * @param {{
  readLocation: string;
  writeLocation: string;
  preprocessor?: (file?: string) => string;
  postprocessor?: (file?: string) => Promise<void> | void;
}} {
  readLocation: `string`,
  writeLocation: `string`,
  preprocessor: `(file?: string) => string`,
  postprocessor: `Promise<void> | void`
}
 * @returns {Promise<boolean | undefined>}
 */
export const readFromWriteTo = async ({
  readLocation,
  writeLocation,
  preprocessor,
  postprocessor
}: {
  readLocation: string;
  writeLocation: string;
  preprocessor?: (file?: string) => string;
  postprocessor?: (file?: string) => Promise<void> | void;
}): Promise<boolean | undefined> => {
  try {
    let file = await readFile(readLocation, { encoding: 'utf8' });
    const rWritePath = relative(__dirname, writeLocation);
    if (!file)
      throw new Error(
        `\x1b[32m File read error\x1b[0m: Could not read file at '${readLocation}'`
      );

    /** Run pre-processor to make changes to file (if any) */
    if (preprocessor) file = preprocessor(file);

    /** If no Directory exists, create it */
    const dirPath = dirname(writeLocation);
    if (!existsSync(dirPath)) await mkdir(dirPath);

    await writeFile(writeLocation, file, { encoding: 'utf-8' });
    console.log(
      `\x1b[32m File successfully written to\x1b[0m: '${join(
        '/src',
        rWritePath.slice(rWritePath.indexOf('app'))
      )}'`
    );

    /** Run postprocessor if any */
    postprocessor && postprocessor(file);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return false;
    }
  }
};

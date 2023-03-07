import { join, resolve, relative } from 'path';
import { readdir, unlink } from 'fs/promises';
import pkg from '@/../package.json';
import sidebar from '@/settings/sidebar.json';
import { rmDirRecursive } from '@/utilities/server';

const project_prefix = pkg.name.slice(0, pkg.name.lastIndexOf('-') + 1); // 'react-tools-'
const project = pkg.name.slice(pkg.name.lastIndexOf('-') + 1); // 'website'
const docsDir = resolve(__dirname, `../app/docs`);

const docsclean = async () => {
  const projectDir = await readdir(resolve(__dirname, '../../../../src'));

  /** The list of PROJECTS */
  const PROJECTS = projectDir
    .filter((name) => name.split(project_prefix)[1] !== project)
    .map((p) => p.slice(p.lastIndexOf('-') + 1)); // [ 'hooks', 'utils' ]

  /** Get name of all APIs belonging to the PROJECTS */
  for (const item of sidebar) {
    const items = item.items ?? [];
    /** Whether documentation is to be generated for a package whose markdown is sourced
     * or is any other documentation.
     */
    const type =
      PROJECTS.includes(item.name) && Array.isArray(items)
        ? 'package'
        : 'non-package';

    for await (const api of items) {
      const apiDir = `${docsDir}/${api.name}`;
      const rPath = relative(__dirname, apiDir);
      try {
        // Remove package directories from docs
        if (type === 'package') {
          const result = await rmDirRecursive(apiDir);
          if (!result) {
            throw new Error(
              `Directory and Files at '${join(
                '/src/app',
                rPath
              )}' could not be deleted!`,
              { cause: 'Recursive removal failed' }
            );
          }
          console.log(
            `\x1b[32m Successfuly deleted\x1b[0m: Directory and Files at '${join(
              '/src/app',
              rPath
            )}'!`
          );
        } else {
          // For non-package directories, remove all files except the  ones in EXCLUDE_FILES
          const EXCLUDE_FILES = ['README.md'];
          const dirFiles = await readdir(apiDir, { withFileTypes: true });
          for (const file of dirFiles) {
            if (EXCLUDE_FILES.includes(file.name)) continue;
            await unlink(`${apiDir}/${file.name}`);
          }
          console.log(
            `\x1b[32m Successfuly deleted\x1b[0m: Files at '${join(
              '/src/app',
              rPath
            )}',\x1b[35m excluding\x1b[0m: ${EXCLUDE_FILES.join(', ')})!`
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(`\x1b[31m ${err.cause}\x1b[0m: ${err.message}`);
        }
      }
    }
  }
};

docsclean();

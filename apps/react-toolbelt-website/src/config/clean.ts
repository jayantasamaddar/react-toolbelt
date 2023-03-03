import path from 'path';
import url from 'url';
import { access, readdir, rm } from 'fs/promises';
import { constants } from 'fs';
import pkg from '../../package.json' assert { type: 'json' };
import sidebar from '../settings/sidebar.json' assert { type: 'json' };

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const project_prefix = pkg.name.slice(0, pkg.name.lastIndexOf('-') + 1); // 'react-tools-'
const project = pkg.name.slice(pkg.name.lastIndexOf('-') + 1); // 'website'
const docsPath = path.resolve(__dirname, `../app/docs`);

const clean = async () => {
  const projectDir = await readdir(path.resolve(__dirname, '../../../../src'));

  /** The list of PROJECTS */
  const PROJECTS = projectDir
    .filter((name) => name.split(project_prefix)[1] !== project)
    .map((p) => p.slice(p.lastIndexOf('-') + 1)); // [ 'hooks', 'utils' ]

  /** The files and directories inside `docs` folder */
  const targetDirFiles = await readdir(docsPath, {
    withFileTypes: true
  });

  /** Get name of all APIs belonging to the PROJECTS */
  const apis: string[] = [];
  for (const item of sidebar) {
    const items = item?.items;
    if (!(PROJECTS.includes(item?.name) && Array.isArray(items))) continue;
    items?.forEach((api) => apis.push(api.name));
  }

  /** Target Directories which have the API documentation */
  const targetDirectories = targetDirFiles.filter(
    (file) => file.isDirectory() && apis.includes(file.name)
  );

  /** Cleanup the documentation MDX files inside the directories */
  for (const target of targetDirectories) {
    try {
      await access(
        `${docsPath}/${target.name}`,
        constants.R_OK | constants.W_OK
      );
      await rm(`${docsPath}/${target.name}`, {
        force: true,
        recursive: true
      });
      console.log(
        `Directory and Files at "${path.relative(
          __dirname,
          `${docsPath}/${target.name}`
        )}" deleted successfully!`
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log();
      }
    }
  }
};

clean();

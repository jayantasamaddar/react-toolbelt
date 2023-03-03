import url from 'url';
import { resolve, dirname } from 'path';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import pkg from '../../package.json' assert { type: 'json' };
import sidebar from '../settings/sidebar.json' assert { type: 'json' };

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readFromWriteTo = async (
  readLocation: string,
  writeLocation: string,
  preprocessor?: (file?: string) => string,
  postprocessor?: () => void
) => {
  try {
    let file = await readFile(readLocation, { encoding: 'utf8' });
    if (!file) throw new Error(`Could not read file at ${readLocation}`);

    /** Run pre-processor to make changes to file (if any) */
    if (preprocessor) file = preprocessor(file);

    /** If no Directory exists, create it */
    const dirPath = dirname(writeLocation);
    if (!existsSync(dirPath)) await mkdir(dirPath);

    await writeFile(writeLocation, file, { encoding: 'utf-8' });
    console.log(`File written to: ${writeLocation}`);

    /** Run postprocessor if any */
    postprocessor && postprocessor();
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return false;
    }
  }
};

/**
 * Generate Documentation Pages
 * ----------------------------
 */
const generateDocs = async () => {
  // const pkgData = await readFile(resolve(__dirname, '../../package.json'), {
  //   encoding: 'utf8'
  // });
  // const pkg = await JSON.parse(pkgData);
  const projectDir = resolve(__dirname, '../../../../src'); // location of packages
  const project_prefix = pkg.name.slice(0, pkg.name.lastIndexOf('-') + 1); // 'react-tools-'
  const project = pkg.name.slice(pkg.name.lastIndexOf('-') + 1); // 'website'
  const projectDirFiles = await readdir(projectDir);

  /** The list of PROJECTS */
  const PROJECTS = projectDirFiles
    .filter((name) => name.split(project_prefix)[1] !== project)
    .map((p) => p.slice(p.lastIndexOf('-') + 1)); // [ 'hooks', 'utils' ]

  // const data = await readFile(resolve(__dirname, '../../package.json'), {
  //   encoding: 'utf8'
  // });
  // const sidebar = await JSON.parse(data);

  for (const item of sidebar) {
    const items = item?.items;
    if (!(PROJECTS.includes(item?.name) && Array.isArray(items))) {
      continue;
    }

    items.forEach(async (api) => {
      const readLocation = resolve(
        __dirname,
        `${projectDir}/${project_prefix}${item.name}/src/${item.name}/${api.title}/README.md`
      );

      const writeLocation = resolve(__dirname, `../app/docs/${api.name}`);

      /** Generate MDX from a project folder's read location */
      await readFromWriteTo(readLocation, `${writeLocation}/content.mdx`);

      const title = api.title[0].toUpperCase() + api.title.slice(1);

      /** Generate page.tsx from a Template */
      await readFromWriteTo(
        resolve(__dirname, './templates/DocsPage.tsx'),
        `${writeLocation}/page.tsx`,
        (file) => (file as string).replace('Template', title)
      );

      /** Generate loading.tsx from a Template */
      await readFromWriteTo(
        resolve(__dirname, './templates/DocsLoading.tsx'),
        `${writeLocation}/loading.tsx`
      );
    });
  }
};

generateDocs();

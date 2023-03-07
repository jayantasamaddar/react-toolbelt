import { resolve, extname, relative, join } from 'path';
import { readdir, writeFile } from 'fs/promises';
import pkg from '@/../package.json';
import sidebar from '@/settings/sidebar.json';
import { toKebabCase, toPascalCase } from '@react-toolbelt/utils';
import { HeadingTree } from '@/utilities';
import { readFromWriteTo } from '@/utilities/server';

/**
 * Generate Documentation Pages
 * ----------------------------
 */
const docsgen = async () => {
  const projectDir = resolve(__dirname, '../../../../src'); // location of packages
  const project_prefix = pkg.name.slice(0, pkg.name.lastIndexOf('-') + 1); // 'react-toolbelt-'
  const project = pkg.name.slice(pkg.name.lastIndexOf('-') + 1); // 'website'
  const projectDirFiles = await readdir(projectDir);

  /** The list of PROJECTS */
  const PROJECTS = projectDirFiles
    .filter((name) => name.split(project_prefix)[1] !== project)
    .map((p) => p.slice(p.lastIndexOf('-') + 1)); // [ 'hooks', 'utils' ]

  for (const item of sidebar) {
    const items = item.items ?? [];
    const type =
      PROJECTS.includes(item.name) && Array.isArray(items)
        ? 'package'
        : 'non-package';

    for (const api of items) {
      const readLocation =
        type === 'package'
          ? resolve(
              __dirname,
              `${projectDir}/${project_prefix}${item.name}/src/${item.name}/${api.title}/README.md`
            )
          : resolve(__dirname, `../app/docs/${api.name}/README.md`);

      const writeLocation = resolve(__dirname, `../app/docs/${api.name}`);

      /** Generate MDX from a project folder's read location */

      /** Generate fetched MDX from packages */
      await readFromWriteTo({
        readLocation,
        writeLocation: `${writeLocation}/content.mdx`,
        postprocessor: async (file) => {
          /** Post-processor hook, Generate Headings JSON file for sidebar */
          if (extname(readLocation) === '.md') {
            const headings = new HeadingTree();
            for (const heading of (file as string).split('\n')) {
              // Select Headings 1 - 3
              if (/^(#{1,3})\s/.test(heading)) {
                // /^(#{1,3})\s(?!.*(`|npm|yarn|pnpm)).+$/gim  => https://regex101.com/r/Q7z2GP/1
                // Exclude the following words, characters
                if (/(?:`|npm|yarn|pnpm)/.test(heading)) continue;
                /** `level`: 1 for h1, 2 for h2 and so on. Needed for tree generation. */
                const level = heading.lastIndexOf('#') + 1;
                const title = heading.slice(level + 1, heading.length);
                const kebabCasedTitle =
                  (
                    toKebabCase(title.replace(/ +/g, '')) as string
                  ).toLowerCase() ?? title;
                headings.add({
                  id: kebabCasedTitle,
                  name: kebabCasedTitle,
                  title,
                  level,
                  url: `${api.url}/#${kebabCasedTitle}`
                });
              }
            }
            const headingsJSON = JSON.stringify(
              headings.normalize(),
              null,
              2
            ).replace(/children+/g, 'items');
            await writeFile(`${writeLocation}/headings.json`, headingsJSON, {
              encoding: 'utf-8'
            });
            const rWritePath = relative(
              __dirname,
              `${writeLocation}/headings.json'`
            );
            console.log(
              `\x1b[32m File successfully written to\x1b[0m: '${join(
                '/src',
                rWritePath.slice(rWritePath.indexOf('app'))
              )}'`
            );
          }
        }
      });

      // Replace all spaces
      const title = toPascalCase(api.title.replace(/ +/g, '')) as string;

      /** Generate page.tsx from a Template */
      await readFromWriteTo({
        readLocation: resolve(__dirname, './templates/docs/DocsPage.tsx'),
        writeLocation: `${writeLocation}/page.tsx`,
        preprocessor: (file) => (file as string).replace('Template', title) // Pre-processor hook to change name
      });

      /** Generate loading.tsx from a Template */
      await readFromWriteTo({
        readLocation: resolve(__dirname, './templates/docs/DocsLoading.tsx'),
        writeLocation: `${writeLocation}/loading.tsx`
      });
    }
  }
};

docsgen();

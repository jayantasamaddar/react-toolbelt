'use client';

// import Image from 'next/image';
// import { Inter } from '@next/font/google';
// import styles from './page.module.css';

import { Button, WordShuffle } from '@/components';

// const inter = Inter({ subsets: ['latin'] });

const WORDS = [
  'supercharge',
  'amplify',
  'elevate',
  'ignite',
  'turbocharge',
  'optimize',
  'boost',
  'skyrocket',
  'transcend',
  'invigorate'
];

export default function Home() {
  return (
    <div className="RT-Home h-full w-full p-5 text-white">
      <section className="RT-HeroSection flex h-full w-full flex-col items-center justify-center gap-8 px-10">
        <h1 className="text-center text-7xl md:text-8xl">React Toolbelt</h1>
        <p className="text-center text-xl leading-loose md:text-2xl">
          <span>Tools to </span>
          <WordShuffle
            className="border-b border-b-white bg-theme-accent-2 px-1.5 pt-0.5 font-bold"
            words={WORDS}
          />
          <span> your React Developer Experience</span>
        </p>
        <Button primary url="/docs">
          Go to Docs
        </Button>
      </section>
    </div>
  );
}

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>src/app/page.tsx</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//         <div className={styles.thirteen}>
//           <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
//         </div>
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={inter.className}>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p className={inter.className}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={inter.className}>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p className={inter.className}>Explore the Next.js 13 playground.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={inter.className}>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p className={inter.className}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }

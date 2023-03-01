import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import logo from '../../assets/logo.png';

interface LogoProps {
  src?: 'string';
  width?: number;
  height?: number | `${number}`;
  className?: string;
  link?: string;
}

export const Logo = ({
  src,
  width = 50,
  height = 50,
  className,
  link
}: LogoProps): ReactElement => {
  return (
    <Link href={link ?? '/'} passHref>
      <Image
        className={`Logo flex cursor-pointer items-center justify-center ${
          className ?? ''
        }`}
        title={
          link ?? 'React Tools - Supercharge your React Developer experience!'
        }
        src={src ?? logo}
        width={width}
        height={height}
        style={{ objectFit: 'cover' }}
        alt="Jayanta Samaddar | Logo"
      />
    </Link>
  );
};

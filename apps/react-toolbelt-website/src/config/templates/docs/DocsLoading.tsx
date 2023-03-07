import { Spinner } from '@/components';

export default function Loading() {
  return (
    <>
      <h1 className="p5 text-slate-600">
        <Spinner />
      </h1>
    </>
  );
}

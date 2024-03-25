import React, { lazy, Suspense } from 'react';

const LazyWorkshops = lazy(() => import('./Workshops'));

const Workshops = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWorkshops {...props} pagename={""} />
  </Suspense>
);

export default Workshops;

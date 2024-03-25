import React, { lazy, Suspense } from 'react';

const LazyHomeFooter = lazy(() => import('./HomeFooter'));

const HomeFooter = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHomeFooter {...props} />
  </Suspense>
);

export default HomeFooter;

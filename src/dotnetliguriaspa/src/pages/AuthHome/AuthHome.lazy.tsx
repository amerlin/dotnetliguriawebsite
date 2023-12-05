import React, { lazy, Suspense } from 'react';

const LazyAuthHome = lazy(() => import('./AuthHome'));

const AuthHome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAuthHome {...props} />
  </Suspense>
);

export default AuthHome;

import React, { lazy, Suspense } from 'react';

const LazyCustomSideBar = lazy(() => import('./CustomSideBar'));

const CustomSideBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCustomSideBar {...props} />
  </Suspense>
);

export default CustomSideBar;

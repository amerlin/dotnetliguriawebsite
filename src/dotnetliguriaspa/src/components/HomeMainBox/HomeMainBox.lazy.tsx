import React, { lazy, Suspense } from 'react';

const LazyHomeMainBox = lazy(() => import('./HomeMainBox'));

const HomeMainBox = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHomeMainBox {...props} pagename={""}/>
  </Suspense>
);

export default HomeMainBox;

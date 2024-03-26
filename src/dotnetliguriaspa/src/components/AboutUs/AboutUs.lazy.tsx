import React, { lazy, Suspense } from 'react';

const LazyAboutUs = lazy(() => import('./AboutUs'));

const AboutUs = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAboutUs {...props} pagename={""}/>
  </Suspense>
);

export default AboutUs;

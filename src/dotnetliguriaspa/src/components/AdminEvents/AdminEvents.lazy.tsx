import React, { lazy, Suspense } from 'react';

const LazyAdminEvents = lazy(() => import('./AdminEvents'));

const AdminEvents = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminEvents {...props} />
  </Suspense>
);

export default AdminEvents;

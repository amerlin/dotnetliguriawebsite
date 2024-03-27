import React, { lazy, Suspense } from 'react';

const LazyAdminSpeakers = lazy(() => import('./AdminSpeakers'));

const AdminSpeakers = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminSpeakers {...props} />
  </Suspense>
);

export default AdminSpeakers;

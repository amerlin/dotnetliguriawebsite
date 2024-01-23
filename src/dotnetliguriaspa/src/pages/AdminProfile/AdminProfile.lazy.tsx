import React, { lazy, Suspense } from 'react';

const LazyAdminProfile = lazy(() => import('./AdminProfile'));

const AdminProfile = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminProfile {...props} />
  </Suspense>
);

export default AdminProfile;

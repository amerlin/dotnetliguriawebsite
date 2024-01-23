import React, { lazy, Suspense } from 'react';

const LazyAdminFeedbacks = lazy(() => import('./AdminFeedbacks'));

const AdminFeedbacks = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminFeedbacks {...props} />
  </Suspense>
);

export default AdminFeedbacks;

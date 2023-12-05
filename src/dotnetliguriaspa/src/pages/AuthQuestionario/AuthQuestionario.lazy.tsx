import React, { lazy, Suspense } from 'react';

const LazyAuthQuestionario = lazy(() => import('./AuthQuestionario'));

const AuthQuestionario = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAuthQuestionario {...props} />
  </Suspense>
);

export default AuthQuestionario;

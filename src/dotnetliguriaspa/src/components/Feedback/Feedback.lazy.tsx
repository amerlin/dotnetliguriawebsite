import React, { lazy, Suspense } from 'react';
import { FeedbackProps } from './Feedback';

const LazyFeedback = lazy(() => import('./Feedback'));

const Feedback = (props: FeedbackProps) => (
	<Suspense fallback={<div>Loading...</div>}>
		<LazyFeedback {...props} />
	</Suspense>
);

export default Feedback;

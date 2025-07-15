import { lazy } from 'react';

// Lazy load the BoardBio component
const BoardBioLazy = lazy(() => import('./BoardBio'));

export default BoardBioLazy;

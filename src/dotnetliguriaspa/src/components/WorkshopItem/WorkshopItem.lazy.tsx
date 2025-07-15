import { lazy } from 'react';

// Lazy load the WorkshopItem component
const WorkshopItemLazy = lazy(() => import('./WorkshopItem'));

export default WorkshopItemLazy;

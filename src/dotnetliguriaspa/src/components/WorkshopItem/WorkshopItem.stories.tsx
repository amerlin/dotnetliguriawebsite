/* eslint-disable */
import WorkshopItem from './WorkshopItem';

export default {
    title: "WorkshopItem",
};

export const Default = () => <WorkshopItem workshop={{
    workshopId: '1',
    title: 'Introduzione a React e TypeScript',
    description: 'Un workshop completo per imparare le basi di React e TypeScript. Vedremo come creare componenti, gestire lo state e utilizzare i hooks per costruire applicazioni web moderne e scalabili.',
    eventDate: new Date('2024-03-15'),
    image: 'https://via.placeholder.com/400x250?text=React+Workshop',
    creationDate: new Date(),
    blogHtml: '',
    tags: 'react,typescript,frontend',
    published: true,
    isExternalEvent: false,
    externalRegistration: false,
    externalRegistrationLink: '',
    onlyHtml: false,
    location: {
        name: 'Università di Genova',
        address: 'Aula Magna, Via Balbi 5, 16126 Genova GE',
        coordinates: '44.4124,8.9316',
        maximumSpaces: 100
    },
    tracks: [],
    oldUrl: '',
    slug: 'react-typescript-workshop'
}} />;

Default.story = {
    name: 'default',
};

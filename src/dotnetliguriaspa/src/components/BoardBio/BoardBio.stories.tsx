/* eslint-disable */
import BoardBio from './BoardBio';

export default {
    title: "BoardBio",
};

export const Default = () => <BoardBio profile={{
    id: '1',
    name: 'Raffaele Rialdi',
    email: 'raffaele.rialdi@example.com',
    imageUrl: 'https://via.placeholder.com/300x300?text=Profile+Image',
    profileImageUrl: 'https://via.placeholder.com/300x300?text=Profile+Image',
    profileBio: 'Mi occupo professionalmente di sviluppo software dal 1987. Mi sono specializzato nelle tecnologie di sviluppo basate su piattaforma Microsoft.',
    description: 'Presidente - Microsoft MVP',
    linkedinUrl: 'https://linkedin.com/in/example',
    githubUrl: 'https://github.com/example',
    facebookUrl: 'https://facebook.com/example'
}} />;

Default.story = {
    name: 'default',
};

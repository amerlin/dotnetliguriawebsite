import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Container, Typography, Box, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CONTENT_BASE_URL } from '../../config/apiConfig';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import { getActiveBoardProfiles } from '../../services/boardProfileService';
import { BoardProfileModel } from '../../models/BoadProfileModel';

interface TeamMember {
    name: string;
    title: string;
    image: string;
    description: string;
    shortBio?: string;
    blogUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div className="flip-card">
            <div
                className={`flip-card-inner ${showDescription ? 'flipped' : ''}`}
                onClick={() => setShowDescription(!showDescription)}
            >
                {/* Front side */}
                <div className="flip-card-front">
                    <img
                        src={member.image}
                        alt={member.name}
                        style={{
                            width: 205,
                            height: 205,
                            minHeight: 205,
                            maxHeight: 205,
                            borderRadius: '8px',
                            marginBottom: 12,
                            objectFit: 'cover',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                            display: 'block',
                        }}
                    />
                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.25rem', marginBottom: 1 }}>
                        {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1 }}>
                        {member.title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, marginTop: 'auto' }}>
                        <IconButton
                            size="small"
                            component={member.blogUrl ? "a" : "button"}
                            href={member.blogUrl || undefined}
                            target={member.blogUrl ? "_blank" : undefined}
                            rel={member.blogUrl ? "noopener" : undefined}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            disabled={!member.blogUrl}
                            sx={{ padding: 0.5 }}
                        >
                            <ArticleIcon sx={{ fontSize: 20, color: member.blogUrl ? '#FF6B6B' : '#ccc' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            component={member.linkedinUrl ? "a" : "button"}
                            href={member.linkedinUrl || undefined}
                            target={member.linkedinUrl ? "_blank" : undefined}
                            rel={member.linkedinUrl ? "noopener" : undefined}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            disabled={!member.linkedinUrl}
                            sx={{ padding: 0.5 }}
                        >
                            <LinkedInIcon sx={{ fontSize: 20, color: member.linkedinUrl ? '#0077B5' : '#ccc' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            component={member.githubUrl ? "a" : "button"}
                            href={member.githubUrl || undefined}
                            target={member.githubUrl ? "_blank" : undefined}
                            rel={member.githubUrl ? "noopener" : undefined}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            disabled={!member.githubUrl}
                            sx={{ padding: 0.5 }}
                        >
                            <GitHubIcon sx={{ fontSize: 20, color: member.githubUrl ? '#333' : '#ccc' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            component={member.facebookUrl ? "a" : "button"}
                            href={member.facebookUrl || undefined}
                            target={member.facebookUrl ? "_blank" : undefined}
                            rel={member.facebookUrl ? "noopener" : undefined}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            disabled={!member.facebookUrl}
                            sx={{ padding: 0.5 }}
                        >
                            <FacebookIcon sx={{ fontSize: 20, color: member.facebookUrl ? '#1877F2' : '#ccc' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            component={member.twitterUrl ? "a" : "button"}
                            href={member.twitterUrl || undefined}
                            target={member.twitterUrl ? "_blank" : undefined}
                            rel={member.twitterUrl ? "noopener" : undefined}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            disabled={!member.twitterUrl}
                            sx={{ padding: 0.5 }}
                        >
                            <TwitterIcon sx={{ fontSize: 20, color: member.twitterUrl ? '#1DA1F2' : '#ccc' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            component={member.instagramUrl ? "a" : "button"}
                            href={member.instagramUrl || undefined}
                            target={member.instagramUrl ? "_blank" : undefined}
                            rel={member.instagramUrl ? "noopener" : undefined}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            disabled={!member.instagramUrl}
                            sx={{ padding: 0.5 }}
                        >
                            <InstagramIcon sx={{ fontSize: 20, color: member.instagramUrl ? '#E4405F' : '#ccc' }} />
                        </IconButton>
                    </Box>
                </div>

                {/* Back side */}
                <div className="flip-card-back">
                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.25rem', marginBottom: 2 }}>
                        {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", fontSize: '1rem', textAlign: 'center', color: '#333' }}>
                        {member.shortBio || member.description}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeamMembers = async () => {
            try {
                const boardProfiles = await getActiveBoardProfiles();
                const members: TeamMember[] = boardProfiles
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((profile: BoardProfileModel) => ({
                        name: profile.name,
                        title: profile.description || '',
                        image: profile.profileImageUrl ? `${CONTENT_BASE_URL}${profile.profileImageUrl.replace(/^\//, '')}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=ccc&color=fff&size=300`,
                        description: profile.profileBio || '',
                        shortBio: profile.shortBio,
                        blogUrl: profile.blogHtml,
                        linkedinUrl: profile.lInkedinUrl,
                        githubUrl: profile.gitHubUrl,
                        facebookUrl: profile.faceboookUrl,
                        twitterUrl: profile.twitterUrl,
                        instagramUrl: profile.instagramUrl
                    }));
                setTeamMembers(members);
            } catch (error) {
                console.error('Error loading team members:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTeamMembers();
    }, []);

    return (
        <>
            <TopBar showMenu={true} />
            <main className="home-container">
                <HeroSection
                    title="La prima community .NET della Liguria"
                    logoSrc="/images/logo-default.png"
                    logoAlt="DotNet Liguria Logo"
                />
                <section className="about fullscreen-section" id="about">
                    <div className="section-content" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* <Typography variant="h3" align="center" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 0 }}>
								Chi siamo
							</Typography> */}
                            <Box sx={{ width: '100%', px: 4 }}>
                                <Typography variant="body1" align="center" sx={{ fontFamily: "'Titillium Web', sans-serif", fontSize: '1.25rem', width: '100%' }}>
                                    DotNet Liguria è la prima community .NET della Liguria, nata per promuovere la condivisione di conoscenze, esperienze e networking tra sviluppatori, professionisti e appassionati del mondo Microsoft .NET. Organizziamo eventi, workshop e incontri per favorire la crescita tecnica e la collaborazione sul territorio.
                                </Typography>
                            </Box>
                        </Box>
                    </div>
                </section>
                <section className="dotnet-conf fullscreen-section" id="evidence">
                    <Container maxWidth={false} className="section-content" style={{ padding: '0 4rem', paddingTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h2" align="center" gutterBottom sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 0, marginBottom: 3, width: '100%' }}>
                            .NET Conf 2025 - Le Novità di .NET 10
                        </Typography>
                        <Box sx={{ marginBottom: 3 }}>
                            <img src="/images/Locandina Evento Dicembre 2025.png" alt="Locandina Evento .NET Conf 2025" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon sx={{ color: '#72C02C' }} />
                                <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontSize: '24px' }}>
                                    12 dicembre 2025
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BusinessIcon sx={{ color: '#72C02C' }} />
                                <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontSize: '24px' }}>
                                    Ordine Ingegneri Genova
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: '-8px' }}>
                                <LocationOnIcon sx={{ color: '#72C02C' }} />
                                <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontSize: '24px', color: '#444' }}>
                                    Sede Ordine Genova Piazza della Vittoria 11/10, 16121 Genova (GE) Genova
                                </Typography>
                            </Box>
                            {/* Rimosso: sede evento ripetuta */}
                        </Box>
                        <Box sx={{ marginTop: 4, width: '100%' }}>
                            <Typography variant="h4" align="center" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 3 }}>
                                Programma
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Raffaele Rialdi
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        09:15 - 09:30
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Introduzione e benvenuto
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        L&apos;evento di quest&apos;anno è un evento combinato che incrocia il lancio della Long Term Support (LTS) di .NET 10 e C# 14 con le nuove librerie per aggiungere la potenza della AI generativa alle applicazioni .NET, grazie anche al nuovo protocollo standard Model Context Protocol (MCP) che aggiungono potenza ai Copilot e alle nostre applicazioni. Gli argomenti della giornata spazieranno dalle novità della nuova versione di .NET alle librerie più interessanti del ricco ecosistema.
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Raffaele Rialdi
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        09:30 - 10:20
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Le novità di C# 14 e .NET 10
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        Eccoci a una nuova versione di .NET, che porta con sé numerose novità sia per il linguaggio C# sia per il runtime e le librerie. Sul fronte C# vedremo come estendere le proprietà di un tipo, l&apos;introduzione della keyword field e alcune utili semplificazioni sintattiche. Per quanto riguarda il runtime, esploreremo i miglioramenti in termini di performance, le nuove caratteristiche del Garbage Collector e una selezione delle più interessanti innovazioni nelle librerie.
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Giampaolo Tucci
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        10:25 - 11:15
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Le novità di MAUI 10
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        La nuova versione di MAUI porta alcune novità interessanti che riaguardano l&apos;interazione con Aspire, nonchè nell&apos;ambito delle Hybrid View: a completare la revisione alcune API sono state marcate come deprecate. Nella sessione vedremo un pò più nel dettaglio queste novità, soffermandoci sui risvolti pratici e sulle varie particolarita.
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Jody Donetti
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        11:20 - 12:20
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Caching in .NET: prestazioni, resilienza e soluzioni ibride
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        Il caching è fondamentale per creare software performante, robusto e resiliente. In questa sessione esploreremo cosa significa fare caching in .NET, quali alternative abbiamo a disposizione: in memoria, distribuita e ibrida. Per le cache ibride approfondiremo sia la nuova HybridCache di Microsoft che FusionCache. Esploreremo scenari comuni, problemi ricorrenti e soprattutto come risolverli, concentrandoci su soluzioni pragmatiche immediatamente applicabili nel mondo reale. FusionCache è il mio progetto free+OSS: è utilizzato da svariati progetti e aziende, inclusa Microsoft stessa (esempio: Data API Builder). E&apos; inoltre stata la prima implementazione production-ready di HybridCache in assoluto, anche prima di Microsoft stessa. Resilienza, prestazioni e scalabilità saranno centrali.
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Jody Donetti
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        14:00 - 15:00
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Oltre HybridCache: FusionCache
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        Con la nuova HybridCache di Microsoft, ora disponiamo di una cache ibrida 1st party che possiamo utilizzare per ottenere il meglio di entrambi i mondi: caching in memoria e distribuito. E&apos; quindi la fine del nostro viaggio nel mondo del caching? No, decisamente no. In questa sessione vedremo come, tramite FusionCache, possiamo spingerci ben oltre i limiti di HybridCache e ottenere maggiore flessibilità, prestazioni, scalabilità e soprattutto resilienza. FusionCache è il mio progetto free+OSS: è utilizzato da svariati progetti e aziende, inclusa Microsoft stessa (esempio: Data API Builder). E&apos; inoltre stata la prima implementazione production-ready di HybridCache in assoluto, anche prima di Microsoft stessa. Ci saranno demo, lezioni apprese direttamente sul campo, e best practice per ottenere prestazioni spettacolari oltre a resilienza e scalabilità avanzate. Bonus: vedremo anche com&apos;è possibile andare oltre i limiti di HybridCache usando... HybridCache stessa
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Lorenzo Billi
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        15:05 - 16:55
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Le novità in Visual Studio 2026
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        La prossima versione di Visual Studio è in arrivo, e con essa una profonda rivisitazione dell’interfaccia grafica ora basata sul Fluent design, con supporto a temi e finestre di dialogo e configurazione completamente ridisegnate. In questa sessione esploreremo le principali novità di Visual Studio 2026, tra cui la maggiore integrazione con Copilot, i miglioramenti prestazionali di compilazione e di Hot Reload, il nuovo formato predefinito SLNX per le solution, nonché l’estensione della funzionalità di code coverage a tutte le edizioni di Visual Studio.
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: '1.6rem' }}>
                                        Andrea Merlin
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1, fontSize: '1.35rem' }}>
                                        17:00 - 17:50
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginTop: 1, marginBottom: 1, fontSize: '1.35rem' }}>
                                        Le Novità Essenziali di Entity Framework Core 10
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", textAlign: 'justify', fontSize: '1.22rem' }}>
                                        Questa sessione è dedicata all&apos;analisi delle novità introdotte in Entity Framework Core 10 (EF10), la major release presentata con .NET 10. Verrà analizzato come Entity Framework Core 10 semplifica la gestione dei dati grazie alla mappatura diretta di tipi complessi su colonne JSON, agli operatori LINQ per join più intuitivi e a una API ottimizzata per gli aggiornamenti bulk. Verranno inoltre presentati i miglioramenti nella ricerca su Azure Cosmos DB, tra cui full-text search e hybrid search, oltre al consolidamento della ricerca vettoriale. Tutto questo, rende EF10 uno strumento ancora più efficiente per lo sviluppo di applicazioni dati moderne.
                                    </Typography>
                                </Box>
                                <Box sx={{ marginTop: 4, width: '100%', maxWidth: '900px', margin: '2rem auto 0' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2644!2d8.9432739!3d44.4029438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d343e7f3f3f3f3%3A0x0!2sP.za%20della%20Vittoria%2C%2011%2C%2016121%20Genova%20GE!5e0!3m2!1sit!2sit!4v1234567890"
                                        width="100%"
                                        height="400"
                                        style={{ border: 0, borderRadius: '8px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Piazza della Vittoria 11/10, 16121 Genova"
                                    ></iframe>
                                </Box>
                            </Box>
                            {/* Rimosso: sede evento ripetuta */}
                        </Box>
                    </Container>
                </section>
                <section className="board fullscreen-section" id="team">
                    <div className="section-content" style={{ flexDirection: 'column', paddingTop: '30px', paddingBottom: '50px' }}>
                        <Typography variant="h3" align="center" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 3, width: '100%' }}>
                            Il Team
                        </Typography>
                        {loading ? (
                            <Typography variant="body1" align="center" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666' }}>
                                Caricamento...
                            </Typography>
                        ) : teamMembers.length === 0 ? (
                            <Typography variant="body1" align="center" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666' }}>
                                Nessun membro del team disponibile
                            </Typography>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
                                    {teamMembers.slice(0, 4).map(member => (
                                        <TeamMemberCard key={member.name} member={member} />
                                    ))}
                                </div>
                                {teamMembers.length > 4 && (
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
                                        {teamMembers.slice(4).map(member => (
                                            <TeamMemberCard key={member.name} member={member} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
                <Footer />
                {/* Rimuove completamente la sezione "Eventi & Novità" */}
                {/* <section className="events fullscreen-section" id="events">
  <div className="section-content">
    <h2>Eventi & Novità</h2>
    <ul>
      <li>Prossimo meetup: dicembre 2025 - Genova</li>
      <li>Workshop Azure Fundamentals - gennaio 2026</li>
      <li>Seguici su <a href="https://twitter.com/dotnetliguria" target="_blank" rel="noopener">Twitter</a> e <a href="https://www.linkedin.com/company/dotnet-liguria/" target="_blank" rel="noopener">LinkedIn</a></li>
    </ul>
  </div>
</section> */}
            </main>
        </>
    );
}

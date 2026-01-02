import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginControl from '../loginControl';
import './TopBar.css';

interface TopBarProps {
    pageName?: string;
    showMenu: boolean;
}

const menuItems = [
    { label: 'Home', href: '/' },
    { label: '.NET Conf 2025', href: '/#dotnet-conf' },
    { label: 'Il Team', href: '/#team' },
    { label: 'Eventi passati', href: '/workshops' },
];

const TopBar: FC<TopBarProps> = ({ showMenu, pageName }) => {
    const navigate = useNavigate();

    const handleNavigation = (href: string) => {
        if (href === '/') {
            // Se clicchi su Home, vai all'inizio della pagina
            if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate('/');
            }
        } else if (href.startsWith('/#')) {
            // Se siamo già sulla home, scorri all'ancora
            if (window.location.pathname === '/') {
                const anchor = href.substring(2);
                const element = document.getElementById(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Naviga alla home e poi scorri all'ancora
                navigate('/');
                setTimeout(() => {
                    const anchor = href.substring(2);
                    const element = document.getElementById(anchor);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    };

    return (
        <nav className="main-menu">
            <ul>
                {menuItems.map(item => (
                    <li key={item.href}>
                        {item.href === '/' || item.href.startsWith('/#') ? (
                            <a
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(item.href);
                                }}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <RouterLink to={item.href}>{item.label}</RouterLink>
                        )}
                    </li>
                ))}
                <li className="login-item">
                    <LoginControl onLogout={() => navigate('/')} />
                </li>
            </ul>
        </nav>
    );
}

export default TopBar;

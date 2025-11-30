import React, { FC } from 'react';
import './HeroSection.css';

interface HeroSectionProps {
	title: string;
	logoSrc?: string;
	logoAlt?: string;
}

const HeroSection: FC<HeroSectionProps> = ({ title, logoSrc, logoAlt }) => {
	return (
		<section className="hero fullscreen-section first" id="home">
			<div className="section-content">
				{logoSrc && <img src={logoSrc} alt={logoAlt || 'Logo'} className="logo" />}
				<p className="subtitle">{title}</p>
			</div>
		</section>
	);
};

export default HeroSection;

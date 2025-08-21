import React from 'react';
import { NavLink } from 'react-router';
import '../css/front.css';

const Index = () => {
    const features = [
        {
            title: "Real-time Messaging",
            description: "Chat instantly with friends and groups. Share photos, videos, and reactions in real-time.",
            icon: "💬"
        },
        
        {
            title: "Privacy First",
            description: "Your data is yours. Advanced privacy controls and end-to-end encryption keep you safe.",
            icon: "🔒"
        }
    ];
    return (
        <div className="min-h-screen">

            <section className="hero">


                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Connect.
                                <br />
                                <span className="hero-accent">Share.</span>
                                <br />
                                Inspire.
                            </h1>

                            <p className="hero-description">
                                Join millions of people sharing their stories, connecting with friends,
                                and discovering amazing content on Us.
                            </p>

                            <div className="hero-buttons">
                                <NavLink to="/login" ><button className="btn-hero">Get Started</button></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="features">
                <div className="container">
                    <div className="features-header">
                        <h2 className="features-title">
                            Why Choose
                            <br />
                            <span className="features-accent">Us?</span>
                        </h2>
                        <p className="features-description">
                            Discover the features that make Us the most engaging
                            and secure social media platform.
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <div className="feature-bar"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default Index;
import {
    Navbar,
    Hero,
    Stats,
    Comparison,
    FeaturesGrid,
    DataSources,
    TechStack,
    BeginnerSection,
    Footer
} from '../components/landing_v2';

export function LandingPageV2() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <Hero />
            <Stats />
            <Comparison />
            <FeaturesGrid />
            <DataSources />
            <TechStack />
            <BeginnerSection />
            <Footer />
        </div>
    );
}

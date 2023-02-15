import React from "react";

import Hero from "./Hero";
import LandingLayout from "./LandingLayout";
export default function Landing() {
    return (
        <LandingLayout>
            <Hero
                title="Raid Planners"
                subtitle="Hassle-free solution to planning hangouts/events with friends!"
                image="https://source.unsplash.com/collection/404339/800x600"
            />
        </LandingLayout>
    );
}

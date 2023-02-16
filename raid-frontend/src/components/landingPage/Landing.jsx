import React from "react";
import DiscordButton from "../socialButtons/DiscordButton";
import Hero from "./Hero";
import LandingLayout from "./LandingLayout";
export default function Landing() {
    return (
        <LandingLayout>
            <Hero
                title="Raid Planners"
                subtitle="Hassle-free solution to planning hangouts/events with friends!"
                image="https://images.unsplash.com/photo-1551151665-d7d636a3ae24?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHw0MDQzMzl8fHx8fHx8MTY3NjQ0NjUxMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800"
            />
        </LandingLayout>
    );
}

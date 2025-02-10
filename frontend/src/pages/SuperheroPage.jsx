import React, { useState, useEffect } from "react";
import HeroForm from "../components/HeroForm";
import HeroList from "../components/HeroList";
import { fetchSuperheroes, addSuperhero } from "../api";

const SuperheroPage = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchSuperheroes()
            .then((data) => setHeroes(data))
            .catch(() => console.error("Error fetching heroes"))
            .finally(() => setLoading(false));
    }, []);

    const handleAddHero = async (hero) => {
        setLoading(true);
        const newHero = await addSuperhero(hero);
        if (newHero) {
            setHeroes([...heroes, newHero.superhero]);
        }
        setLoading(false);
    };

    return (
        <div>
            <HeroForm onAddHero={handleAddHero} loading={loading} />
            <HeroList heroes={heroes} loading={loading} />
        </div>
    );
};

export default SuperheroPage;

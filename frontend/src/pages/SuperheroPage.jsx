import React, { useState, useEffect } from "react";
import HeroForm from "../components/HeroForm";
import HeroList from "../components/HeroList";
import Modal from "../components/Modal";
import { fetchSuperheroes, addSuperhero, updateSuperhero, deleteSuperhero } from "../api";

const SuperheroPage = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentHero, setCurrentHero] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(false);
    };

    const handleUpdateHero = async (hero) => {
        setLoading(true);
        const updatedHero = await updateSuperhero(hero.id, hero);
        if (updatedHero) {
            setHeroes(heroes.map((h) => (h.id === hero.id ? updatedHero.superhero : h)));
        }
        setCurrentHero(null);
        setLoading(false);
        setIsModalOpen(false);
    };

    const handleDeleteHero = async (heroId) => {
        setLoading(true);
        const result = await deleteSuperhero(heroId);
        if (result) {
            setHeroes(heroes.filter((h) => h.id !== heroId));
        }
        setLoading(false);
    };

    const openAddModal = () => {
        setCurrentHero(null);
        setIsModalOpen(true);
    };

    const openUpdateModal = (hero) => {
        setCurrentHero(hero);
        setIsModalOpen(true);
    };

    return (
        <div>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={openAddModal}
            >
                Add Superhero
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <HeroForm
                    onAddHero={handleAddHero}
                    onUpdateHero={handleUpdateHero}
                    loading={loading}
                    currentHero={currentHero}
                />
            </Modal>
            <HeroList
                heroes={heroes}
                loading={loading}
                onUpdateHero={openUpdateModal}
                onDeleteHero={handleDeleteHero}
            />
        </div>
    );
};

export default SuperheroPage;
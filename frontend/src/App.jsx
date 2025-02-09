import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000'; // Adjust if needed for your Docker environment

export default function App() {
    const [name, setName] = useState('');
    const [superpower, setSuperpower] = useState('');
    const [humilityScore, setHumilityScore] = useState('');
    const [heroes, setHeroes] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch heroes on mount
    useEffect(() => {
        fetchHeroes();
    }, []);

    const fetchHeroes = async () => {
        setMessage('');
        try {
            const res = await fetch(`${BASE_URL}/superheroes`);
            if (!res.ok) throw new Error('Failed to fetch heroes');
            const data = await res.json();
            setHeroes(data);
        } catch (err) {
            console.error(err);
            setMessage('Error fetching heroes.');
        }
    };

    const addHero = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!name.trim() || !superpower.trim() || !humilityScore.trim()) {
            setMessage('Please fill in all fields.');
            return;
        }

        const scoreNum = parseInt(humilityScore);
        if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 10) {
            setMessage('Humility score must be between 1 and 10.');
            return;
        }

        const heroData = { name, superpower, humilityScore: scoreNum };

        try {
            const res = await fetch(`${BASE_URL}/superheroes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(heroData),
            });
            if (!res.ok) throw new Error('Failed to add hero');

            const result = await res.json();
            setMessage(result.message);
            setName('');
            setSuperpower('');
            setHumilityScore('');
            fetchHeroes();
        } catch (err) {
            console.error(err);
            setMessage('Error adding hero.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
                <h1 className="text-2xl font-bold mb-4">Humble Superhero Manager</h1>
                <form onSubmit={addHero} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Name:</label>
                        <input
                            className="border border-gray-300 p-2 w-full rounded-md"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Bruce Wayne"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Superpower:</label>
                        <input
                            className="border border-gray-300 p-2 w-full rounded-md"
                            type="text"
                            value={superpower}
                            onChange={(e) => setSuperpower(e.target.value)}
                            placeholder="e.g. Stealth"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Humility Score:</label>
                        <input
                            className="border border-gray-300 p-2 w-full rounded-md"
                            type="number"
                            value={humilityScore}
                            onChange={(e) => setHumilityScore(e.target.value)}
                            placeholder="1-10"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add Hero
                    </button>
                </form>
                {message && <div className="mt-4 text-red-600 font-semibold">{message}</div>}
            </div>

            <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
                <h2 className="text-xl font-bold mb-4">Superheroes</h2>
                {heroes.length === 0 ? (
                    <div className="text-gray-500">No superheroes yet.</div>
                ) : (
                    <ul className="space-y-2">
                        {heroes.map((hero) => (
                            <li key={hero.id} className="border border-gray-200 rounded-md p-3">
                                <div className="font-semibold">{hero.name}</div>
                                <div className="text-sm text-gray-600">{hero.superpower}</div>
                                <div className="text-sm text-gray-800">
                                    Humility Score: {hero.humilityScore}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

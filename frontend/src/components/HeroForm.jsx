import React, { useState } from "react";

const HeroForm = ({ onAddHero, loading }) => {
    const [name, setName] = useState("");
    const [superpower, setSuperpower] = useState("");
    const [humilityScore, setHumilityScore] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!name.trim() || !superpower.trim() || !humilityScore.trim()) {
            setMessage("Please fill in all fields.");
            return;
        }

        const scoreNum = parseInt(humilityScore);
        if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 10) {
            setMessage("Humility score must be between 1 and 10.");
            return;
        }

        await onAddHero({ name, superpower, humilityScore: scoreNum });
        setName("");
        setSuperpower("");
        setHumilityScore("");
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
            <h1 className="text-2xl font-bold mb-4">Humble Superhero Manager</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Hero"}
                </button>
            </form>
            {message && <div className="mt-4 text-red-600 font-semibold">{message}</div>}
        </div>
    );
};

export default HeroForm;

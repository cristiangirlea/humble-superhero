import React from "react";

const HeroList = ({ heroes, loading }) => {
    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Superheroes</h2>
            {loading ? (
                <div className="text-gray-500">Loading heroes...</div>
            ) : heroes.length === 0 ? (
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
    );
};

export default HeroList;

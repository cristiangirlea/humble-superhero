const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchSuperheroes = async () => {
    try {
        const res = await fetch(`${BASE_URL}/superheroes`);
        if (!res.ok) throw new Error("Failed to fetch heroes");
        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return [];
    }
};

export const addSuperhero = async (heroData) => {
    try {
        const res = await fetch(`${BASE_URL}/superheroes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(heroData),
        });
        if (!res.ok) throw new Error("Failed to add hero");

        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return null;
    }
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchSuperheroes = async () => {
    try {
        const res = await fetch(`${BASE_URL}/superheroes`);
        if (!res.ok) throw new Error("Failed to fetch heroes");
        const result = await res.json();
        return result.data; // Access the data field from the response
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

export const deleteSuperhero = async (heroId) => {
    try {
        const res = await fetch(`${BASE_URL}/superheroes/${heroId}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete hero");

        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return null;
    }
};

export const updateSuperhero = async (heroId, heroData) => {
    try {
        const res = await fetch(`${BASE_URL}/superheroes/${heroId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(heroData),
        });
        if (!res.ok) throw new Error("Failed to update hero");

        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return null;
    }
};

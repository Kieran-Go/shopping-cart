import { useState, useEffect } from "react";

// Fetches data items from the provided API url and returns them as an array. Also returns loading and error statuses
function useFetchItems(url) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, { mode: "cors" });
                if (response.status >= 400) throw new Error("server error");
                const data = await response.json();
                setItems(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [url]);

    return { items, loading, error };
}
export default useFetchItems;
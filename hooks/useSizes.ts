import { useState, useEffect } from 'react';

interface Size {
    id: number;
    name: string;
}

export const useSizes = () => {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadSizes`);
                const data = await response.json();
                if (data.message === 'success') {
                    setSizes(data.sizes);
                } else {
                    setError('Failed to load sizes');
                }
            } catch (err) {
                setError('Failed to load sizes');
            } finally {
                setLoading(false);
            }
        };

        fetchSizes();
    }, []);

    return { sizes, loading, error };
};

import { useState, useEffect } from 'react';

interface Color {
    id: number;
    name: string;
    colorHex: string;
}

export const useColors = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadColors`);
                const data = await response.json();
                if (data.message === 'success') {
                    setColors(data.colors);
                } else {
                    setError('Failed to load colors');
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Failed to load colors');
            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, []);

    return { colors, loading, error };
};

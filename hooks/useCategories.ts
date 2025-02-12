import { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadAllCategories`);
                const data = await response.json();
                if (data.message === 'success') {
                    setCategories(data.categories);
                } else {
                    setError('Failed to load categories');
                }
            } catch (err) {
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

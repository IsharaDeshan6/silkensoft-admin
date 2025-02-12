import { useState, useEffect } from 'react';

interface Model {
    id: number;
    name: string;
}

export const useModels = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadModels`);
                const data = await response.json();
                if (data.message === 'success') {
                    setModels(data.models);
                } else {
                    setError('Failed to load models');
                }
            } catch (err) {
                setError('Failed to load models');
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    return { models, loading, error };
};

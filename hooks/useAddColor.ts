import { useState } from 'react';
import { toast } from 'sonner';

const useAddColor = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addColor = async (color: { name: string, colorHex: string }) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}AddColor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(color),
            });

            const data = await response.json();
            if (data.message === 'success') {
                toast.success('Color added successfully');
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Add color error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { addColor, isLoading };
};

export default useAddColor;

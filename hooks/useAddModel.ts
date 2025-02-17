import { useState } from 'react';
import { toast } from 'sonner';

const useAddModel = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addModel = async (model: { name: string }) => {
        setIsLoading(true);

        // console.log('model', model);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}AddModel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(model),
            });

            const data = await response.json();
            if (data.message === 'success') {
                toast.success('Model added successfully');
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Add model error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { addModel, isLoading };
};

export default useAddModel;

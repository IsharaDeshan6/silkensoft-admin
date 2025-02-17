import { useState } from 'react';
import { toast } from 'sonner';

const useAddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addCategory = async (category: { name: string, image: File | null }) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('categoryName', category.name);
            if (category.image) {
                formData.append('image', category.image);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}AddCategory`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.message === 'success') {
                toast.success('Category added successfully');
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Add category error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { addCategory, isLoading };
};

export default useAddCategory;

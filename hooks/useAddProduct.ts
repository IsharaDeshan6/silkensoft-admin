import { useState } from 'react';
import { toast } from 'sonner';

const useAddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addProduct = async (product: {
        title: string,
        description: string,
        price: string,
        quantity: string,
        categoryId: string,
        colorId: string,
        modelId: string,
        sizeId: string,
        adminEmail: string,
        image1: File | null,
        image2: File | null
    }) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('quantity', product.quantity);
            formData.append('categoryId', product.categoryId);
            formData.append('colorId', product.colorId);
            formData.append('modelId', product.modelId);
            formData.append('sizeId', product.sizeId);
            formData.append('adminEmail', product.adminEmail);
            if (product.image1) {
                formData.append('image1', product.image1);
            }
            if (product.image2) {
                formData.append('image2', product.image2);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}AddProduct`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.message === 'success') {
                toast.success('Product added successfully');
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Add product error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { addProduct, isLoading };
};

export default useAddProduct;

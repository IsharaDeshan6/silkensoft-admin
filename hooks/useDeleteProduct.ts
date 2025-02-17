import { useState } from 'react';

const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteProduct = async (productId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}DeleteProductById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ productId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete product');
            }

            return data;
        } catch (err) {
            // @ts-ignore
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading, error };
};

export default useDeleteProduct;

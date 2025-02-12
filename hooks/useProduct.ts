import { useState, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    qty: number;
    category: { id: number; name: string };
    size: { id: number; name: string };
    color: { id: number; name: string; colorHex: string };
    user: { id: number; fname: string; lname: string; email: string };
    model: { id: number; name: string };
    productStatus: { id: number; status: string };
}

const useProduct = (productId: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}GetProductById?productId=${productId}`);
                const data = await response.json();
                if (data.message === 'success') {
                    setProduct(data.product);
                } else {
                    setError('Failed to load product');
                }
            } catch (err) {
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, loading, error };
};

export default useProduct;

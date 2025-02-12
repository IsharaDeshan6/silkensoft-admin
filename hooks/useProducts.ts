import { useState, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    qty: number;
    registerDate: string;
    category: {
        id: number;
        name: string;
    };
    size: {
        id: number;
        name: string;
    };
    color: {
        id: number;
        name: string;
        colorHex: string;
    };
    user: {
        id: number;
        fname: string;
        lname: string;
        email: string;
    };
    model: {
        id: number;
        name: string;
    };
    productStatus: {
        id: number;
        status: string;
    };
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadAllProducts`);
                const data = await response.json();
                if (data.message === 'success') {
                    setProducts(data.products);
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

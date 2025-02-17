'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import useDeleteProduct from '@/hooks/useDeleteProduct';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function DeleteRoute({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { deleteProduct, loading, error } = useDeleteProduct();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(params.id);
      await router.push('/admin/dashboard/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Are you absolutely sure?</CardTitle>
            <CardDescription>
              This action cannot be undone. This will permanently delete this
              product and remove all data from our servers.
            </CardDescription>
          </CardHeader>
          <CardFooter className="w-full flex justify-between">
            <Button variant="secondary" asChild>
              <Link href="/admin/dashboard/products">Cancel</Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete Product'}
            </Button>
          </CardFooter>
          {error && <p className="text-red-500">{error}</p>}
        </Card>
      </div>
  );
}

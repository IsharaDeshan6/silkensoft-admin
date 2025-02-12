"use client"
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {MoreHorizontal, PlusCircle} from "lucide-react";
import Link from "next/link";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {useAuth} from "@/context/AuthContext";
import {useProducts} from "@/hooks/useProducts";


export default  function ProductsRoute() {

  const { products, loading, error } = useProducts();
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex items-center gap-x-2">
          <Link href="/admin/dashboard/products/create">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage Products from your store!</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Image</TableHead>
                <TableHead>Product Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered Date</TableHead>
                <TableHead>Modify Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={`http://localhost:8080/SilkenSoft/images/clothes/${product.id}/img1.jpg?timestamp=${Date.now()}`} alt={product.title} />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{product.title}</p>
                    </TableCell>
                    <TableCell>Rs. {product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.qty} stocks available</TableCell>
                    <TableCell>
                      <Badge variant={product.productStatus.status === 'Active' ? 'success' : 'destructive'}>{product.productStatus.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(product.registerDate).toISOString().split('T')[0]}</TableCell>
                    <TableCell>
                      <div>
                        <select
                            id="status"
                            name="status"
                            defaultValue={product.productStatus.status}
                            className="mt-2 block w-full rounded-md border-2 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option>Active</option>
                          <option>Deactive</option>
                        </select>
                      </div>
                    </TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/dashboard/products/${product.id}/update`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/dashboard/products/${product.id}/delete`}>
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

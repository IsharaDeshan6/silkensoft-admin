"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useAuth} from "@/context/AuthContext";


export default  function OrdersPage() {
    const { isAuthenticated } = useAuth();


    if (!isAuthenticated) {
        return null; // or a loading spinner
    }
    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Manage Orders from your store !</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order Id</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Order Total</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            <TableRow>
                                <TableCell>
                                    <p className="font-medium">5348f4a6wda85</p>
                                </TableCell>
                                <TableCell>2025-01-25 14:30:21</TableCell>
                                <TableCell>Men&#39;s T-shirt</TableCell>
                                <TableCell>
                                    <Badge variant={'success'}>Order Placed</Badge>
                                </TableCell>
                                <TableCell>Rs. 20 500.00</TableCell>
                                <TableCell>
                                    <div>
                                        <select
                                            id="location"
                                            name="location"
                                            defaultValue="Canada"
                                            className="mt-2 block w-full  rounded-md border-2 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option>Order Placed</option>
                                            <option>Order Success</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                        </select>
                                    </div>
                                </TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="fixed bottom-0 left-0 right-0 bg-white">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#"/>
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
                            <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#"/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </>
    );
}

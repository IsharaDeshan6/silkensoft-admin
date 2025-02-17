'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useAuth } from "@/context/AuthContext";
import { useUsers } from '@/hooks/useUsers';
import useUpdateUserStatus from '@/hooks/useUpdateUserStatus';

export default function UsersPage() {
    const { isAuthenticated } = useAuth();
    const { users, loading, error, loadUsers } = useUsers();
    const { updateUserStatus } = useUpdateUserStatus();

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleStatusChange = async (email: string, status: string) => {
        const statusId = status === 'Active' ? '1' : '2';
        await updateUserStatus(email, statusId);
        loadUsers();
    };

    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage Users from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Profile Image</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Mobile</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Registered Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={`http://localhost:8080/SilkenSoft/images/users/${user.id}/avatar.jpg?timestamp=${Date.now()}`} alt={user.username} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-medium">{user.username}</p>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.mobile}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'success' : 'destructive'}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>{new Date(user.registered_date).toISOString().split('T')[0]}</TableCell>
                                    <TableCell>
                                        <div>
                                            <select
                                                id="status"
                                                name="status"
                                                defaultValue={user.status}
                                                className="mt-2 block w-full rounded-md border-2 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => handleStatusChange(user.email, e.target.value)}
                                            >
                                                <option>Active</option>
                                                <option>Deactive</option>
                                            </select>
                                        </div>
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

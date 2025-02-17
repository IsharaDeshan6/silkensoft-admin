"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

import {PlusCircle} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useCategories} from "@/hooks/useCategories";
import {useAuth} from "@/context/AuthContext";
import useAddCategory from "@/hooks/useAddCategory";

const Page =()=> {
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const [nameError, setNameError] = useState("");
    const [imageError, setImageError] = useState("");
    const { categories, loading, error } = useCategories();
    const { isAuthenticated } = useAuth();
    const { addCategory, isLoading } = useAddCategory();

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleSave = async () => {
        let hasError = false;
        if (!categoryName) {
            setNameError('Please enter a category name');
            hasError = true;
        } else {
            setNameError('');
        }
        if (!categoryImage) {
            setImageError('Please select a category image');
            hasError = true;
        } else {
            setImageError('');
        }
        if (hasError) {
            return;
        }
        await addCategory({ name: categoryName, image: categoryImage });
        setOpenCategoryDialog(false);
    };

    return (
        <>
            <div className="flex items-center justify-end">
                <Button className="flex items-center gap-x-2 mb-5"
                        onClick={() => {
                            setOpenCategoryDialog(true);
                        }}
                >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                </Button>
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Recent categories from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category Id</TableHead>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Category Image</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <p className="font-medium">{category.id}</p>
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={`http://localhost:8080/SilkenSoft/images/categories/${category.name}.jpg?timestamp=${Date.now()}`} alt={category.name} />
                                        </Avatar>
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

            <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center text-2xl'>Add New Category</DialogTitle>
                        <DialogDescription className='text-black pt-3'>
                            Add new category to your store!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <Label>Category Name</Label>
                        <Input
                            type="text"
                            placeholder="Category Name"
                            className="col-span-3"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        {nameError && <p className="text-red-500 text-left">{nameError}</p>}
                    </div>
                    <div className="grid gap-4">
                        <Label>Category Image</Label>
                        <Input
                            type="file"
                            className="col-span-3"
                            onChange={(e) => setCategoryImage(e.target.files ? e.target.files[0] : null)}
                        />
                        {imageError && <p className="text-red-500 text-left">{imageError}</p>}
                    </div>
                    <DialogFooter>
                        <Button className='w-full' onClick={handleSave} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Page;

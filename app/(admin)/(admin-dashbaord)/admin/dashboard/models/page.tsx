"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

import {PlusCircle} from "lucide-react";
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
import {useAuth} from "@/context/AuthContext";
import {useModels} from "@/hooks/useModels";
import useAddModel from "@/hooks/useAddModel";

const Page =()=> {
    const [openModelDialog, setOpenModelDialog] = useState(false);
    const [modelName, setModelName] = useState("");
    const [nameError, setNameError] = useState("");
    const { models, loading, error } = useModels();
    const { isAuthenticated } = useAuth();
    const { addModel, isLoading } = useAddModel();

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
        if (!modelName) {
            setNameError('Please enter a model name');
            return;
        }
        setNameError('');
        await addModel({ name: modelName });
        setOpenModelDialog(false);
    };

    return (
        <>
            <div className="flex items-center justify-end">
                <Button className="flex items-center gap-x-2 mb-5"
                        onClick={() => {
                            setOpenModelDialog(true);
                        }}
                >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Model</span>
                </Button>
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Models</CardTitle>
                    <CardDescription>Recent models from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Model Id</TableHead>
                                <TableHead>Model Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {models.map(model => (
                                <TableRow key={model.id}>
                                    <TableCell>
                                        <p className="font-medium">{model.id}</p>
                                    </TableCell>
                                    <TableCell>{model.name}</TableCell>
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

            <Dialog open={openModelDialog} onOpenChange={setOpenModelDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center text-2xl'>Add New Model</DialogTitle>
                        <DialogDescription className='text-black pt-3'>
                            Add new model to your store!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <Label>Model Name</Label>
                        <Input
                            type="text"
                            placeholder="Model Name"
                            className="col-span-3"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                        />
                        {nameError && <p className="text-red-500 text-left">{nameError}</p>}
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

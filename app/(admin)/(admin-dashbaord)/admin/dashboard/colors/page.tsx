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
import {useColors} from "@/hooks/useColors";
import useAddColor from "@/hooks/useAddColor";

const Page =()=> {
    const [openColorDialog, setOpenColorDialog] = useState(false);
    const [colorName, setColorName] = useState("");
    const [colorHex, setColorHex] = useState("");
    const [nameError, setNameError] = useState("");
    const [hexError, setHexError] = useState("");
    const { colors, loading, error } = useColors();
    const { isAuthenticated } = useAuth();
    const { addColor, isLoading } = useAddColor();

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
        if (!colorName) {
            setNameError('Please enter a color name');
            hasError = true;
        } else {
            setNameError('');
        }
        if (!colorHex) {
            setHexError('Please enter a color hex');
            hasError = true;
        } else {
            setHexError('');
        }
        if (hasError) {
            return;
        }
        await addColor({ name: colorName, colorHex });
        setOpenColorDialog(false);
    };

    return (
        <>
            <div className="flex items-center justify-end">
                <Button className="flex items-center gap-x-2 mb-5"
                        onClick={() => {
                            setOpenColorDialog(true);
                        }}
                >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Color</span>
                </Button>
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Colors</CardTitle>
                    <CardDescription>Recent colors from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Color Id</TableHead>
                                <TableHead>Color Name</TableHead>
                                <TableHead>Color Hexadecimal</TableHead>
                                <TableHead>Color</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {colors.map(color => (
                                <TableRow key={color.id}>
                                    <TableCell>
                                        <p className="font-medium">{color.id}</p>
                                    </TableCell>
                                    <TableCell>{color.name}</TableCell>
                                    <TableCell>{color.colorHex}</TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                backgroundColor: color.colorHex,
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: '1px solid #000'
                                            }}
                                        />
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

            <Dialog open={openColorDialog} onOpenChange={setOpenColorDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center text-2xl'>Add New Color</DialogTitle>
                        <DialogDescription className='text-black pt-3'>
                            Add a new color to your store!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <Label>Color Name</Label>
                        <Input
                            type="text"
                            placeholder="Color Name"
                            className="col-span-3"
                            value={colorName}
                            onChange={(e) => setColorName(e.target.value)}
                        />
                        {nameError && <p className="text-red-500 text-left">{nameError}</p>}
                    </div>
                    <div className="grid gap-4 py-2">
                        <Label>Hexadecimal Value</Label>
                        <Input
                            type="text"
                            placeholder="#FFFFFF"
                            className="col-span-3"
                            value={colorHex}
                            onChange={(e) => setColorHex(e.target.value)}
                        />
                        {hexError && <p className="text-red-500 text-left">{hexError}</p>}
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

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export  function RecentSales() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">

                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarImage src={''} alt="Avatar Image"/>
                        <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium"> Ishara Deshan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ishara@gmail.com
                    </p>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarImage src={''} alt="Avatar Image"/>
                        <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium"> Ishara Deshan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ishara@gmail.com
                    </p>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarImage src={''} alt="Avatar Image"/>
                        <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium"> Ishara Deshan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ishara@gmail.com
                    </p>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden sm:flex h-9 w-9">
                        <AvatarImage src={''} alt="Avatar Image"/>
                        <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium"> Ishara Deshan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ishara@gmail.com
                    </p>
                    <p className="ml-auto font-medium">+$1,999.00</p>
                </div>


            </CardContent>
        </Card>
    );
}

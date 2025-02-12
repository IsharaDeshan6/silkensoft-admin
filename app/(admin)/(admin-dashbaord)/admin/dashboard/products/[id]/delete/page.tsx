import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";

export default function DeleteRoute({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return null; // or a loading spinner
  }
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
          <Button variant="destructive" asChild>
            <Link href="/admin/dashboard/products">Delete Product</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

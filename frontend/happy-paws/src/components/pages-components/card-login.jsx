import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CardLogin() {
  return (
    <Card className="text-center w-auto h-auto gap-2 justify-center bg-primary/90 text-white ">
      <CardHeader>
        <CardTitle className="text-xl">Name User</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-center">
        <div>Email</div>
        <div>User Role</div>
      </CardContent>
    </Card>
  );
}

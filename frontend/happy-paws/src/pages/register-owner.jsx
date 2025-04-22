import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function RegisterOwner() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Registrasi Owner Shelter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Input
                      id="shelterName"
                      type="text"
                      placeholder="Nama Shelter"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Input
                      id="shelterOwnerName"
                      type="text"
                      placeholder="Nama Owner"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Input
                      id="shelterPhoneNumber"
                      type="text"
                      placeholder="Nomor Telepon"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Input
                      id="shelterAddress"
                      type="text"
                      placeholder="Alamat Shelter"
                      required
                    />
                  </div>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full mt-2"
                  >
                    Registrasi
                  </Button>
                  <div className="text-sm">
                    Sudah Punya Akun ?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Masuk
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

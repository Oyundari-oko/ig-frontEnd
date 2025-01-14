"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  const body = {
    email,
    password,
  };

  const login = async () => {
    if (email === "") {
      console.log("please write your email");
      setEmailError(true);
      if (password === "") {
        setPasswordError(true);
        console.log("please write your pass");
      }
    } else {
      router.push("/posts");
    }

    const data = await fetch(`https://ig-backend-eop9.onrender.com/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    const token = response.token;
    localStorage.setItem("accessToken", token);
  };

  return (
    <div className="flex justify-center items-center bg-black h-screen p-0">
      <Card className="bg-black border-gray-500 h-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-center text-white text-2xl font-mono">
            INSTAGRAM
          </CardTitle>
          <CardDescription className="text-white flex justify-center">
            Sign up to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent className=" space-y-4 flex justify-center flex-col ">
          <Input
            value={email}
            onChange={(e) => setEmail(String(e.target.value))}
            className="text-white font-sans"
            placeholder="Email"
          />
          {emailError && (
            <div className="text-red-600 font-sans">
              please write your email😄
            </div>
          )}

          <Input
            value={password}
            onChange={(e) => setPassword(String(e.target.value))}
            type="password"
            className="text-white"
            placeholder="Password"
          />
          {passwordError && (
            <div className="text-red-600  font-sans">
              please write your password😄
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-blue-700 hover:bg-blue-800 w-[370px] font-sans"
            onClick={login}
          >
            Login
          </Button>
        </CardFooter>
        <div className="flex justify-center space-x-1 pt-10">
          <div className="text-white">Don't have an account?</div>
          <div
            className="text-blue-700 font-bold"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </div>
        </div>
      </Card>
    </div>
  );
}

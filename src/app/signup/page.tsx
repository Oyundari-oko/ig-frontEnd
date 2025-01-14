"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  // const [lastname, setLastname] = useState<string>("");
  // const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  // state zarlaad   usestate<boolean>(false)

  const body = {
    username,
    email,
    password,
  };

  const signUP = async () => {
    if (username === "") {
      console.log("please write your Fistname");
      setUsernameError(true);

      if (email === "") {
        console.log("please write your email");
        setEmailError(true);
      }

      if (password === "") {
        setPasswordError(true);
        console.log("please write your pass");
      }
    } else {
      router.push("/posts");
    }

    const data = await fetch(`https://ig-backend-eop9.onrender.com/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    console.log(response);
    const token = response.token;
    localStorage.setItem("accessToken", token);
  };

  // useEffect(() => {
  //   signUP();
  // }, []);

  const router = useRouter();
  return (
    <div className="flex justify-center items-center bg-black h-screen p-0">
      <Card className="bg-black border-black">
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
            value={username}
            onChange={(e) => setUsername(String(e.target.value))}
            className="text-white font-sans"
            placeholder="Name"
          />
          {usernameError && (
            <div className="text-red-600 font-sans">please write your name</div>
          )}
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
            // onClick={() => router.push("/posts")}
            onClick={signUP}
          >
            SignUp
          </Button>
        </CardFooter>
        <div className="flex justify-center space-x-1">
          <div className="text-white">Have an account?</div>
          <div
            className="text-blue-700 font-bold"
            onClick={() => router.push("/login")}
          >
            Login
          </div>
        </div>
      </Card>
    </div>
  );
}

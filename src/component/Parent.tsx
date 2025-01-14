"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { House } from "lucide-react";
import { SquareUserRound } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export const Parent = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const decode = jwtDecode(token ?? "");
  const myUserId = decode.userId;
  const { push } = useRouter();
  const routeringSeit = () => {
    push("/iq_users");
  };
  const home = () => {
    push("/posts");
  };
  const profile = () => {
    push(`/user/post/${myUserId}`);
  };
  const newPost = () => {
    push("/newPost");
  };

  return (
    <div className=" bg-black flex flex-col justify-end">
      <div
        style={{
          fontSize: "40px",
          fontFamily: "cursive",
          backgroundColor: "black",
          paddingLeft: "20px",
          borderColor: "grey",
        }}
      >
        Instagram
      </div>
      <div>{children}</div>
      <div
        style={{
          gap: "64px",
          position: "sticky",
          bottom: "0",
          top: "0",
          backgroundColor: "black",
          height: "30px",
          fontSize: "40px",
        }}
        className="flex justify-center items-center text-white"
      >
        <div className="flex my-4">
          <House onClick={home} />
        </div>
        <div>
          <Search onClick={routeringSeit} />
        </div>
        <div>
          <SquarePlus onClick={newPost} />
        </div>
        <div>
          <SquareUserRound onClick={profile} />
        </div>
      </div>
    </div>
  );
};

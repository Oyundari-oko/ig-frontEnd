"use client";
import { useEffect, useState } from "react";
import { Parent } from "@/component/Parent";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { jwtDecode } from "jwt-decode";
import { PostHeader } from "@/costume components/PostHeader";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { UsersLike } from "@/component/UsersLike";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { PostActions } from "@/costume components/PostActions";
type postType = {
  _id: string;
  caption: string;
  postImg: string;

  userId: {
    _id: string;
    username: string;
    email: string;
  };
  liked: string[];
  comments: string;
}[];

const Page = () => {
  const [posts, setPosts] = useState<postType>([]);
  const [openUser, setOpenUse] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");
  const router = useRouter();
  const igPost = async (token: string) => {
    const data = await fetch("https://ig-backend-eop9.onrender.com/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await data.json();
    setPosts(response);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decode = jwtDecode(token ?? "");
    console.log(decode);
    if (!token) {
      router.push("/signup");
    } else {
      igPost(token);
    }
  }, []);

  return (
    <Parent>
      <div className="flex justify-center items-center flex-col bg-black space-y-2 ">
        <div className="space-y-4">
          {posts?.map((post) => {
            const { userId } = post;

            return (
              <Card
                key={post._id}
                className="bg-black border-gray-800 border-[1px]"
              >
                <CardHeader>
                  <PostHeader userProfile={post.userId} />
                  <Carousel className="w-[390px] h-[470px]">
                    <CarouselContent>
                      {post.postImg.map((img, i) => {
                        return (
                          <CarouselItem key={i}>
                            <img className="w-[580px] h-[460px]" src={img} />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  <PostActions
                    postId={post._id}
                    likes={post.liked}
                    _id={post._id}
                  />
                  <CardFooter className="p-0 space-x-2">
                    <div className="text-white font-bold">
                      {userId?.username}
                    </div>
                    <div className="font-semibold text-lg text-gray-500">
                      {post.caption}
                    </div>
                  </CardFooter>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </Parent>
  );
};
export default Page;

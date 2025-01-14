"use client";
import { use, useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Parent } from "@/component/Parent";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { jwtDecode } from "jwt-decode";
type commentType = {
  _id: string;
  comments: string;
  userId: {
    _id: string;
    username: string;
  };
  postImg: string;
}[];
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const [comment, setComment] = useState<commentType>([]);
  const [creatComm, setCreateComm] = useState<string>("");
  const { postId } = use(params);
  const igComment = async () => {
    const data = await fetch(
      `https://ig-backend-eop9.onrender.com/comments/${postId}`
    );
    const response = await data.json();
    setComment(response);
  };

  useEffect(() => {
    igComment();
  }, [postId]);

  const createComment = async () => {
    const token = localStorage.getItem("accessToken");
    const decode = jwtDecode(token ?? "");
    const myUserId = decode.userId;

    console.log();

    const data = await fetch(
      "https://ig-backend-eop9.onrender.com/commented/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: creatComm,
          postUserId: postId,
          userId: myUserId,
        }),
      }
    );
    const response = await data.json();
    setComment((comments) => [...comments, response]);
  };
  return (
    <Parent>
      <div className="bg-black h-[800px]">
        <div className="pt-9">
          <div className="font-bold text-xl text-white border-slate-400 border flex justify-center sticky top-0 z-10">
            Comments
          </div>
          {comment?.map((com) => {
            return (
              <div key={com._id}>
                <div className="flex">
                  <div className="pt-[30px]">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1732167372202-30be36e1168e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8UzRNS0xBc0JCNzR8fGVufDB8fHx8fA%3D%3D" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      paddingTop: "30px",
                      paddingRight: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "500px",
                    }}
                  >
                    <div className="text-gray-400 font-bold">
                      {com.userId.username}
                      <div className="text-white ">{com.comments}</div>
                    </div>
                    <div className="flex justify-center items-center">
                      <Heart
                      // color={"red"} fill={"red"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-end border-1px">
        <Input
          className="w-[400px]"
          value={creatComm}
          onChange={(e) => setCreateComm(String(e.target.value))}
        ></Input>
        <ArrowUp
          className="bg-blue-600 h-[35.8px] w-[30px]"
          onClick={createComment}
        ></ArrowUp>
      </div>
    </Parent>
  );
};
export default Page;

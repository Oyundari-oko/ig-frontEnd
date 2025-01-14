import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Bookmark } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UsersLike } from "@/component/UsersLike";
// type likeTypes = { profileImage: string; username: string; _id: string };
export const PostActions = ({
  postId,
  likes,
  _id,
}: {
  postId: string;
  likes: string[];
  _id: string;
}) => {
  const uniqueLikes = new Set(likes);
  const token = localStorage.getItem("accessToken");
  const decode = jwtDecode(token ?? "");
  const userId = decode.userId;
  const [isLikedDialog, setIsDialogOpen] = useState(false);
  const [openUser, setOpenUse] = useState<boolean>(false);
  const handleDialog = () => setIsDialogOpen((prev) => !prev);
  const router = useRouter();
  const likedPost = async () => {
    const response = await fetch(
      "https://ig-backend-eop9.onrender.com/post/like",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          userId: userId,
        }),
      }
    );
    const res = await response.json();
  };
  //   console.log(likes);
  const isUserLiked = likes.find((like) => like === userId);
  // console.log(isUserLiked);

  // const unlikedPost = async () => {
  //   const response = await fetch(
  //     "https://ig-backend-eop9.onrender.com/post/unlike",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         postId: postId,
  //         userId: userId,
  //       }),
  //     }
  //   );
  //   const unlike = await response.json();
  //   console.log(unlike);
  // };
  // console.log(openUser);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="flex" style={{ gap: "5px" }}>
          <div className="flex space-x-1 ">
            <Heart
              className="text-white"
              onClick={likedPost}
              color={isUserLiked ? "red" : "white"}
              fill={isUserLiked ? "red" : "black"}
            />
          </div>

          <div className="flex space-x-1">
            <MessageCircle
              className="text-white"
              onClick={() => router.push(`/posts/comments/${_id}`)}
            />
          </div>

          <Send className="text-white" />
        </div>

        <div>
          <Bookmark className="text-white" />
        </div>
      </div>
      <div className="flex space-x-1">
        <div className="font-bold" onClick={handleDialog}>
          {uniqueLikes.size}
        </div>
        <UsersLike
          open={openUser}
          setOpen={setOpenUse}
          postId={postId}
        ></UsersLike>
        <div className="font-bold" onClick={() => setOpenUse(true)}>
          likes
        </div>
      </div>
    </div>
  );
};

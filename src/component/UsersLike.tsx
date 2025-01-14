import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// type likeTypes = {
//   userId: { profileImage: string; username: string };
//   _id: string;
//   postId: string;
// };

type usersType = {
  _id: string;
  username: string;
  email: string;
  postImg: string;
}[];

export const UsersLike = ({
  open,
  setOpen,
  postId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
}) => {
  const [likeUser, setLikeUser] = useState<usersType>([]);
  const like = async () => {
    if (!postId) return;
    const data = await fetch(
      `https://ig-backend-eop9.onrender.com/like/likedUser/${postId}`
    );
    const response = await data.json();
    setLikeUser(response);
  };

  useEffect(() => {
    like();
  }, [postId]);

  return (
    <div>
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogContent className="font-bold bg-black text-white">
          Likes
          <DialogTitle>
            {likeUser?.map((like, index) => {
              return (
                <div key={index}>
                  <div
                    className="text-white font-sans text-lg flex justify-between"
                    style={{ gap: "10px" }}
                  >
                    <div className="flex flex-col">
                      <div>{like.username}</div>
                      <div
                        style={{
                          color: "gray",
                          fontSize: "16px",
                        }}
                      >
                        {like.email}
                      </div>
                    </div>

                    <button
                      style={{
                        fontFamily: "inherit",
                        background: "darkblue",
                        width: "60px",
                        height: "30px",
                        border: "solid blue 1px",
                        borderRadius: "4px",
                      }}
                    >
                      follow
                    </button>
                  </div>
                </div>
              );
            })}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

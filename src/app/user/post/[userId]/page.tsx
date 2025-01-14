"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Parent } from "@/component/Parent";
import { jwtDecode } from "jwt-decode";
import { UserFollowers } from "@/component/UserFollowers";
import { UserFollowing } from "@/component/UserFollowing";

type usersType = {
  _id: string;
  username: string;
  email: string;

  post: {
    _id: string;
    postImg: string[];
    caption: string;
  }[];

  followers: string;
  following: string;
};

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [profile, setProfile] = useState<usersType>();
  const [openUser, setOpenUse] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { userId } = use(params);
  const router = useRouter();
  const userProfile = async () => {
    const data = await fetch(
      `https://ig-backend-eop9.onrender.com/user/post/${userId}`
    );
    const response = await data.json();
    setProfile(response);
  };

  const token = localStorage.getItem("accessToken");
  const decode = jwtDecode(token ?? "");
  const myUserId = decode.userId;
  const isUserFollowed = profile?.followers.includes(myUserId);
  const follow = async () => {
    const data = await fetch(
      "https://ig-backend-eop9.onrender.com/user/following",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followingUserId: myUserId,
          followerUserId: userId,
        }),
      }
    );
    await data.json();
  };

  const unfollow = async () => {
    const unfollow = await fetch(
      "https://ig-backend-eop9.onrender.com/user/unfollow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followingUserId: myUserId,
          followerUserId: userId,
        }),
      }
    );
  };
  useEffect(() => {
    userProfile();
  }, [userId]);

  return (
    <Parent>
      <div className="h-screen">
        <div>
          <div className="flex">
            <div>
              <div className="flex">
                <div className="text-white flex justify-start font-bold text-xl pl-[22px]">
                  {profile?.username}
                </div>
                {/* <ChevronDown className="flex justify-center items-end"></ChevronDown> */}
              </div>

              <div>
                <Avatar
                  style={{
                    width: "120px",
                    height: "120px",
                    top: "20px",
                    left: "10px",
                  }}
                >
                  <AvatarImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEXZ3OFwd39yd3tweHtydn/c3+TZ3eBveXtxd31weH7e4eZuc3dtcnZsdHdrc3bV2N3LztOAho1rcnukqa3Gyc57foOrrrNpdHWRlp20uLx8g4a+w8eHjJDP1Nits7eeo6eTm563v8GjrK5+h4qTl6DCxs+anaKNkpaIjJWNlJd2f4HP2dtlbXV/gYaJi5DMCHAdAAAHH0lEQVR4nO2da1OrOhRA29ANNISAPPri0arntlbr+f8/7waq3qOntUASknizPjmO47Amr71DsplMLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaL5X8LAMYYXNwAqh9GPICjIl3dPXuOk9+t0iLCWPUjCQQA4vT1lCTJdM6YTtlPp7s0hp/SkuCuS5JMvxKQch39BEeY1DlB6C/BqY8CktfmO+L7DUXokmHzW4du7s0ejzha/d09P5McI+yqfs6huLhAtwSnfoAKY5sRHqgzv2mIEElNHYx76nldDBFZqX7UIbhuSW7ZfViS0sCh6JbBhQn0MggFpern7Q0cLi6C1wxRcDBsLMKe+L7fuZcyyA5M6ql40XkMfrQjWRjUilBQp7chIoU5iq7nef0NEYpUP3hX8M1Q7TLh0ZDgBorTIMHpfGlKP807T6JfDJ1c9aN3AqdkqKFHUhP6aYXQQEPfcZ4r1Y9/G9aEHIahAY0YIZ42dPRfMXCddI/WvjL357TWfTp1H4fqnQkfNTeEjPIZejTTWxFveQ3DreaGz71D7s/4CGk9m0JMe4fcn2EpRqza4jugFmCo9WyKVyGnoY+Clc7dFOfdN2eukutsWAUCDBONwxrIemywXTfMVHtcB+6FGK713XWDWkgvrV1XV0VIhRimWFtDvBViuNW3DQUYzmazZPuj29AaKkaUob7jEFIh66HGu1GwEGKo8UsoWAuKaVSLXAUKfkPf1/ktm4DI23GcUOPIW0D21BjG+rbhxL14gq2foedoLDjBrw7nLgZbD+/0XSxE7NOwBf+Xzoaw4N1rY4YaL4ftpj6/4T9aG054DT2PqJb4HlyGnIZhqfMwbI6ULjkNqdbDkC2Ice/jXp9xqM7rfQPccRo+qja4BSyGnYd6hy70HoaMirMN9T9ugvfB4LMYCAV7zUchw824DDV/i9+Cj8Fgw8CI04luxWGo+1JxBqeE5bFDDM04uNewGWhoxuHLSZthDDJMTJhmzuC6/0n2+fxUm9JHm0tr/Y9GeXRrjiBThH3f4I3sjOmiZ/oqJgYEM1+Ah/Z27M2lsbmd5zj0wTjB9gJp0NEwQGbeBoboQG6HN80d0oOxN7pxsbmZ8vtkUxhcRALw/WNIPYbziebubPNbb7ks1wb7NQBk2w2l4d+GTkjpZpv9gNIRgKNscXimtPVsGzMMk1OSHxZZZHj7fQAAblXU6f54KMvysNumdVExddXPJRgADH+g+nEsFovFoi/uG6qfQx7W0GjaknvvsDDuB0U1jVmUrRfpr9XTXcPT0z6t71nYjX9AaMraKq63jyEhlJJkNpu1p55mfkAYYbmtY9fV9/7ILVjaFC8OLMldtsmuN28FW8Vmc+acAC+944OhSRSOin2eJP60rZV4rpf4x96F759rKM59P0le94VpkuBmu2cazt5a7VvY3zT1BfcmZfvYrTftvkVnQ0ZIN3VkxsSDqz1dnree+hiyUUmDfaW/I8Q7Gt4sQ3cFL6R7zauasvYjrHty1MUIiM7tiKMHp9025DBsNuJSXbfA8Tqn5+3QYYLtMfYGkq91vPmEowPhv03SghA5vujWVQHWRMTtyjdDtnas9VKEl+OVWroDDR1PrxdSuMiTpvbh4NI7nzn/oyTXpzYtXgSd1vaeIKLLSUx3Rx0JgmxmpVqcXoDJI4vRZLRhk139nqh2dKHK+Q4Ff0+QV4oVIUaBREE2reZqjyviTNgScc0wQJnC+QZngbAl4jLs36s8dMq6qFS9N0mEVClCNTiL6GmI1Ew3UD2Ht0uuizHMlZQdckt/PoJgOxZDFQXN8Y6zul4fPLoffULF3LdF+8Cy4rFjVMgI753mPngOIuMeAocXcdlgZ8uXUQ2PweiGy+OIjQi1wIy+Kx4d7yw/i2UccRl9V1h4MVpsA4fuH+cQSfI0kqGYKjRDOI21ATf+LPOGH4zih7eyU6arzMe5VxPTUaLRi4YeHaEELz4MvUApwjA4SG/EplCSwjZ05Adv8CRhZ7Qzs9lMdiNClig2lH3bG1Yydrd7GUoOT+NAtaEvd+sNeMvm8+MHctfEkLNsvgBDhCS+AIf1mFsX1wyJxLqK+HH4KQRxir7Egm6VqqTiMydpoZuYAqz8yKvohjeq0qYvvErqphDLfBfah2UsZzrlLQEljqWkj3zg36rN3vEkVa2rtBiDDZ4j5XUbFJzl9MQh6YOeONXHMJBSjAhKfQxRKaMNo2flMek7cl4K83+sShxyPnulQ17xDpKSX0DKWwRZHMwwlWB41CMmPZOsxBu6pU6G0zvhgu33RVVr/YEvfjKtiK+TYSK+zmk88FPUkjgJT6AGf2xbEifhkSmsdUkOz4hfEKEmc/X7bP8RCE+C8cOwepay8IWXsMNpqJeh8KBGO0Phby/wVi/DpPOHkf8FzHmAerbNDZEAAAAASUVORK5CYII=" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex justify-end space-x-10 pl-[40px]">
              <div className="flex justify-center items-end font-sans">
                {profile?.post.length} posts
              </div>
              <div
                className="flex justify-center items-end font-sans"
                onClick={() => setOpenUse(true)}
              >
                {profile?.followers.length} followers
              </div>
              <div
                className="flex justify-center items-end font-sans"
                onClick={() => setOpen(true)}
              >
                <UserFollowing
                  open={open}
                  setOpen={setOpen}
                  userId={userId}
                ></UserFollowing>
                {profile?.following.length} following
              </div>
              <UserFollowers
                open={openUser}
                setOpen={setOpenUse}
                userId={userId}
              ></UserFollowers>
            </div>
          </div>
          <div className="pt-[30px] flex justify-evenly space-x-2">
            <div className="flex space-x-2">
              {myUserId === userId ? null : (
                <button
                  className=" bg-blue-800 rounded h-7 w-screen"
                  onClick={() => follow()}
                >
                  {isUserFollowed ? "unfollow" : "follow"}
                </button>
              )}
              {/* <UserRoundPlus
                onClick={searchUser}
                className="bg-blue-800 rounded h-7 w-[40px] "
              ></UserRoundPlus> */}
            </div>
          </div>
          <div className="pt-[20px] flex justify-start flex-wrap-reverse w-screen">
            {profile?.post?.map((post) => {
              return (
                <div key={post._id}>
                  <img src={post.postImg[0]} className="w-[143px] h-[143px]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Parent>
  );
};
export default Page;

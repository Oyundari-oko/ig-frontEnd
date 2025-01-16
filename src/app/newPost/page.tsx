"use client";
import { useState } from "react";
import { Parent } from "@/component/Parent";
import { Forward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
const Page = () => {
  const [images, setImages] = useState<FileList | null>(null);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [valueError, setValueError] = useState<boolean>(false);

  const uploadImages = async () => {
    if (!images) return;

    const uploadPromises = Array.from(images).map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "picture");
      formData.append("cloud_name", "diwbjvip9");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/diwbjvip9/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      return result.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
  };

  // const post = () => {
  //   if (value == "") {
  //     setValueError(true);
  //   } else {
  //     setValue(value);
  //   }
  // };

  const token = localStorage.getItem("accessToken");
  const decode = jwtDecode(token ?? "");
  const userId = decode.userId;
  const router = useRouter();
  const sharePost = async () => {
    if (value === "") {
      setValueError(true);
    }
    const body = {
      caption: value,
      postImg: uploadedImages,
      userId: userId,
    };
    const data = await fetch(
      "https://ig-backend-eop9.onrender.com/post/creat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const response = await data.json();
    router.push("/posts");
    return response;
  };

  return (
    <Parent>
      <div className="p-4 space-y-4">
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setImages(files);
            }
          }}
          style={{ borderRadius: "10px" }}
          className="file:border file:bg-blue-800 file:text-white file:cursor-pointer hover:file:bg-blue-700"
        />
        <button
          onClick={uploadImages}
          style={{ borderRadius: "10px" }}
          className="bg-blue-700 w-[80px] font-sans"
        >
          Upload
        </button>
        <div className="mt-4 text-center flex flex-col justify-center space-3">
          {uploadedImages.map((img, index) => {
            return (
              <img
                key={index}
                src={img}
                className="max-w-full h-[400px] rounded-lg shadow-lg"
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <input
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            placeholder="caption"
            className="bg-black border border-gray-700 w-[300px]"
          />
          {valueError && (
            <div className="text-red-600 font-sans text-sm">
              please write caption🥹
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-blue-700 text-xl h-[40px] w-[400px]"
            style={{ borderRadius: "10px" }}
            onClick={sharePost}
          >
            share
          </Button>
        </div>
      </div>
    </Parent>
  );
};

export default Page;

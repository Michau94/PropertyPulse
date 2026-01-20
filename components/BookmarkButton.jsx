"use client";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";

export default function BookmarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }
      setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId]);

  // Early return after all hooks
  if (!userId) {
    return (
      <p className="text-center text-gray-500">
        Please log in to bookmark properties
      </p>
    );
  }

  function handleClick() {
    bookmarkProperty(property._id.toString()).then((res) => {
      if (res.error) {
        return toast.error(res.error);
      }
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return !isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  );
}

"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();
  // get the user
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId required");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  console.log(user.bookmarks, "bookmarks");

  let isBookmarked = user.bookmarks.includes(propertyId);
  console.log("isBookmarked:", isBookmarked);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Property removed from bookmarks";
    isBookmarked = false;
  } else {
    // if not bookmarked then add to bookmarks
    user.bookmarks.push(propertyId);
    message = "Property bookmarked successfully";
    isBookmarked = true;
  }

  await user.save();

  // revalidate the path
  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
}

export default bookmarkProperty;

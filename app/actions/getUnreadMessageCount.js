"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function getUnreadMessageCount() {
  await connectDB();

  // get the user
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId required");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    receiver: userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;

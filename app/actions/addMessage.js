"use server";

import connectDB from "@/config/database";
import Message from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function addMessage(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserID required");
  }

  const { userId } = sessionUser;
  const receiver = formData.get("receiver");

  if (userId == receiver) {
    throw new Error("Cannot send message to yourself");
  }

  const newMessage = new Message({
    sender: userId,
    receiver: receiver,
    property: formData.get("property"),
    content: formData.get("content"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  await newMessage.save();

  return {
    submitted: true,
  };
}

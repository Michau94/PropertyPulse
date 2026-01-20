import connectDB from "@/config/database";
import Message from "@/models/Message";
import { convertToObject } from "@/utils/converttoObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "../../components/MessageCard";

export default async function MessagesPage() {
  connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMessages = await Message.find({
    receiver: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    receiver: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((msg) => {
    const message = convertToObject(msg);
    message.sender = convertToObject(msg.sender);
    message.property = convertToObject(msg.property);
    // console.log(message);

    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>No Messages Found</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

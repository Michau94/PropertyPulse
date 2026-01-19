"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

export default function MessageCard({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  async function handleReadClick() {
    try {
      const updatedReadStatus = await markMessageAsRead(message._id);
      setIsRead(updatedReadStatus);
      setUnreadCount((prev) => (updatedReadStatus ? prev - 1 : prev + 1));
      toast.success(`Message marked as ${updatedReadStatus ? "read" : "new"}`);
    } catch (error) {
      toast.error("Failed to update message status");
    }
  }

  async function handleDelete() {
    if (isDeleted) return; // prevent multiple clicks
    try {
      await deleteMessage(message._id);
      setIsDeleted(true);
      setUnreadCount((prev) => (isRead ? prev : prev - 1));
      toast.success("Message deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message");
      setIsDeleted(false);
    }
  }

  if (isDeleted) return <p>Deleted Message</p>;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200 ">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property inquiry</span>
        {": "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a className="text-blue-500" href={`mailto:${message.email}`}>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a className="text-blue-500" href={`tel:${message.phone}`}>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>

      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}

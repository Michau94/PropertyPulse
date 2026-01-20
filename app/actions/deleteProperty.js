"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserID required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  // verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // gather ids

  // console.log("Property images:", property.images);

  const publicIDs = property.images.map((img) => {
    const parts = img.split("/");
    return parts.at(-1).split(".").at(0);
  });

  if (publicIDs.length > 0) {
    for (const publicId of publicIDs) {
      await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;

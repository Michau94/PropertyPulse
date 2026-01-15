"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import deleteProperty from "../app/actions/deleteProperty";
import { toast } from "react-toastify";

export default function ProfileProperties({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);

  async function handleDelete(propertyId) {
    try {
      await deleteProperty(propertyId);

      const updatedProperties = properties.filter(
        (property) => property._id !== propertyId
      );
      setProperties(updatedProperties);
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.error("Failed to delete property");
      return;
    }
  }

  return properties.map((property) => (
    <div className="mb-10" key={property._id}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={
            property.images && property.images.length > 0
              ? property.images[0]
              : ""
          }
          alt={property.name}
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street}, {property.location.city},{" "}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => {
            handleDelete(property._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));
}

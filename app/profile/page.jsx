import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Image from "next/image";

async function fetchUserProperties(userId) {
  await connectDB();
  const properties = await Property.find({ owner: userId }).lean();
  console.log("User properties:", properties);
  return properties.map((property) => ({
    ...property,
    _id: property._id.toString(),
  }));
}
export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  console.log("User session:", session);

  const properties = await fetchUserProperties(session.user.id);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src="/images/profile.png"
                  alt="User"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {session?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {session?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties.length > 0 &&
                properties.map((property) => (
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
                        Address: {property.location.street},{" "}
                        {property.location.city}, {property.location.state}{" "}
                        {property.location.zipcode}
                      </p>
                    </div>
                    <div className="mt-2">
                      <a
                        href="/add-property.html"
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </a>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

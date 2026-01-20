import PropertyCard from "@/components/PropertyCard";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

export default async function SavedPropertiesPage() {
  const { userId } = await getSessionUser();

  const user = await User.findById(userId).populate("bookmarks");

  // console.log("User bookmarks:", user.bookmarks);

  return (
    <section className=" my-6 px-4">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {user.bookmarks.length === 0 ? (
          <p>You have no saved properties.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {user.bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

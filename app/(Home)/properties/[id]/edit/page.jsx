import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/converttoObject";

export default async function PropertyEditPage({ params }) {
  await connectDB();

  console.log("Params received:", params);
  const { id } = await params;

  console.log("Editing property with ID:", id);

  const propertyDoc = await Property.findById(id).lean();
  const property = convertToObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <section
      className="bg-blue-50
  "
    >
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:mx-0">
          <PropertyEditForm property={property}></PropertyEditForm>
        </div>
      </div>
    </section>
  );
}

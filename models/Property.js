import { model, models, Schema } from "mongoose";

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Property name is required"],
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
    baths: {
      type: Number,
      required: [true, "Number of baths is required"],
    },
    square_feet: {
      type: Number,
      required: [true, "Square feet is required"],
    },
    amenities: [{ type: String }],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: { name: String, email: String, phone: String },
    images: [{ type: String }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const Property = models.Property || model("Property", propertySchema);

export default Property;

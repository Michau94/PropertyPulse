"use client";

import { ClipLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "blue",
};

export default function LoadingPage() {
  return (
    <ClipLoader color="#3b82f6" cssOverride={override} size={150}></ClipLoader>
  );
}

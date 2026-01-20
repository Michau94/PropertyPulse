"use client";
import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";

export default function PropertyMap({ property }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: 0,
    longitude: 0,
    zoom: 12,
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCords = async () => {
      try {
        const response = await fromAddress(
          `${property.location.street}, ${property.location.state} ${property.location.zipcode}`,
        );
        const { lat, lng } = response.results[0].geometry.location;

        if (response.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        // console.log(lat, lng);

        setLat(lat);
        setLng(lng);
        setViewport((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      } catch (err) {
        // console.log("Geocode error: ", err);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    // fetchCords();
  }, []);

  if (loading) return <div>Loading map...</div>;
  if (geocodeError) return <div>Could not load map for this address.</div>;

  return <div>Map</div>;
}

"use client";

import React, { useEffect, useState } from "react";

export default function MapSection() {
  const [MapComponent, setMapComponent] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamically import the map component only on client side
    const loadMap = async () => {
      try {
        const { MapContainer, TileLayer, Marker, Popup, useMap } =
          await import("react-leaflet");
        const L = await import("leaflet");

        // Import CSS
        await import("leaflet/dist/leaflet.css");

        // Fix for default markers in React Leaflet
        delete (
          L.Icon.Default.prototype as L.Icon.Default & {
            _getIconUrl?: () => void;
          }
        )._getIconUrl;

        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        // Custom red marker icon
        const redIcon = new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        // TAJ AL RAHMAH, Dubai, United Arab Emirates coordinates
        const position: [number, number] = [25.3223595, 55.3930895];

        // Map control component to handle centering
        const MapController = ({
          targetPosition,
        }: {
          targetPosition: [number, number] | null;
        }) => {
          const map = useMap();

          React.useEffect(() => {
            if (targetPosition) {
              map.flyTo(targetPosition, 15, {
                duration: 1.5,
              });
            }
          }, [map, targetPosition]);

          return null;
        };

        const MapClient = () => {
          const [centerTarget, setCenterTarget] = React.useState<
            [number, number] | null
          >(null);

          const handleViewLargerMap = () => {
            if (typeof window !== "undefined") {
              // Open exact TAJ AL RAHMAH Google Maps location
              const googleMapsUrl =
                "https://www.google.com/maps/place/TAJ+AL+RAHMAH/@25.3223595,55.3930895,17z";

              window.open(googleMapsUrl, "_blank");
            }
          };

          const handleCenterToMarker = () => {
            setCenterTarget(position);

            // Reset the target after a short delay to allow for future clicks
            setTimeout(() => setCenterTarget(null), 2000);
          };

          return (
            <div className="h-[400px] md:h-[500px] lg:h-[600px] w-full relative">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <MapController targetPosition={centerTarget} />

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} icon={redIcon}>
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-2 text-[#01a9a0]">
                        TAJ AL RAHMAH
                      </h3>

                      <p className="text-sm text-gray-600 mb-2">
                        Office G-01-691, Al Khabaisi
                        <br />
                        Dubai, 00000 Dubai
                      </p>

                      <div className="text-sm space-y-1">
                        <p className="font-semibold text-gray-700">
                          Phone: +971 55 617 3300 / +971 52 749 2002
                        </p>

                        <p className="font-semibold text-gray-700">
                          Email: info@tajalrahmah.com
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* Info Card Overlay - Top Left */}
              <div className="absolute top-2 left-2 z-10 bg-[#EDE8E9] rounded-lg shadow-lg border border-gray-300 p-4 max-w-xs">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Our Office
                  </h3>

                  {/* direction for moving map */}
                  <button
                    onClick={handleCenterToMarker}
                    className="p-2 bg-white hover:bg-red-50 rounded-full transition-colors duration-200 group border border-gray-300"
                    title="Center map on location"
                  >
                    <svg
                      className="w-4 h-4 text-[#01a9a0] group-hover:text-[#01a9a0]/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-gray-700 mb-3 leading-relaxed">
                  <p className="font-semibold text-[#01a9a0]">TAJ AL RAHMAH</p>
                  <p>Office G-01-691, Al Khabaisi</p>
                  <p>Dubai, 00000 Dubai</p>
                  <p className="mt-2 text-xs font-semibold text-gray-600">+971 55 617 3300</p>
                </div>

                <button
                  onClick={handleViewLargerMap}
                  className="text-[#01a9a0] hover:text-[#01a9a0]/80 text-sm font-semibold transition-colors cursor-pointer"
                >
                  View larger map →
                </button>
              </div>
            </div>
          );
        };

        setMapComponent(() => MapClient);
      } catch (error) {
        console.error("Failed to load map:", error);
      }
    };

    loadMap();
  }, []);

  return (
    <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 mb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold theme-text-main mb-4">
            Find Us On Map
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Visit our office location in Dubai, United Arab Emirates. We&apos;re
            here to serve you with excellence.
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {MapComponent ? (
            <MapComponent />
          ) : (
            <div className="h-[400px] md:h-[500px] lg:h-[600px] w-full bg-gray-200 flex items-center justify-center">
              <div className="text-gray-500">Loading map...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import type { FakeOrder } from "@/store/cart";

const storeIcon = new L.DivIcon({
  className: "map-pin store-pin",
  html: "<span>SH</span>",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const courierIcon = new L.DivIcon({
  className: "map-pin courier-pin",
  html: "<span>✦</span>",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const homeIcon = new L.DivIcon({
  className: "map-pin home-pin",
  html: "<span>⌂</span>",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const store: LatLngExpression = [41.0082, 28.9784];
const home: LatLngExpression = [41.015, 28.97];

export default function TrackingMap({ order }: { order: FakeOrder }) {
  const [pos, setPos] = useState<[number, number]>([41.0082, 28.9784]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        const lat = prev[0] + (41.015 - prev[0]) * 0.045;
        const lng = prev[1] + (28.97 - prev[1]) * 0.045;
        return [lat, lng];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [order.id]);

  const route: LatLngExpression[] = [store, pos, home];

  return (
    <div className="card map-card">
      <MapContainer
        center={store}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={store} icon={storeIcon} />
        <Marker position={pos} icon={courierIcon} />
        <Marker position={home} icon={homeIcon} />
        <Polyline positions={route} color="#FF6000" />
      </MapContainer>
    </div>
  );
}

"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dormitory as defaultDorm, mapTileLayers } from "@/lib/data/map";

function dormIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:36px;height:36px;border-radius:9999px;
      background:#f2994a;border:3px solid white;
      box-shadow:0 4px 12px rgba(0,0,0,.25);
      display:flex;align-items:center;justify-content:center;
      font-size:16px;">🏠</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

function schoolIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:9999px;
      background:#2B6FD6;border:3px solid white;
      box-shadow:0 3px 10px rgba(0,0,0,.22);
      display:flex;align-items:center;justify-content:center;
      font-size:12px;color:white;">📍</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function FlyTo({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom ?? map.getZoom(), { duration: 0.7 });
    }
  }, [position, zoom, map]);
  return null;
}

export default function SchoolsOsmMap({
  schools,
  dormitory: dormProp,
  mapStyle,
  focusPosition,
  onMarkerClick,
}) {
  const dorm = dormProp || defaultDorm;
  const tile = mapTileLayers[mapStyle] || mapTileLayers.standart;
  const lat = Number(dorm.lat);
  const lng = Number(dorm.lng);

  const center = useMemo(() => [lat, lng], [lat, lng]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
      style={{ minHeight: 420 }}
    >
      <TileLayer key={mapStyle} attribution={tile.attribution} url={tile.url} />
      <FlyTo position={focusPosition} zoom={15} />

      <Marker position={[lat, lng]} icon={dormIcon()}>
        <Popup>
          <strong>{dorm.shortName || dorm.name || "Yurdumuz"}</strong>
          <br />
          Merkez yurt konumu
        </Popup>
      </Marker>

      {schools.map((school) => (
        <Marker
          key={school.id}
          position={[school.mapLat, school.mapLng]}
          icon={schoolIcon()}
          eventHandlers={{
            click: () => onMarkerClick?.(school.id),
          }}
        >
          <Popup>
            <strong>{school.name}</strong>
            <br />
            {school.district} · {school.distanceKm} km · %{school.yuzdelik}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

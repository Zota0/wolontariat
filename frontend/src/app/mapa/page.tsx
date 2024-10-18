
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Page() {
    return (
        <MapContainer center={[-51.505, -50.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A popup at [51.505, -0.09]!
                </Popup>
            </Marker>
        </MapContainer>
    );
}
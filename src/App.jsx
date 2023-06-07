/* eslint-disable react/prop-types */

import { MapContainer, TileLayer, Marker, Circle, Polygon } from 'react-leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';

function App() {
  const limeOptions = { color: 'lime' };
  const fillBlueOptions = { fillColor: 'blue' }

  const [latitude, setLatitude] = React.useState(-12.0700045)
  const [longitude, setLongitude] = React.useState(-77.064618)
  const [coords, setCoords] = React.useState({
    latitude: -12.0700045,
    longitude: -77.064618,
    radio: 100,
  })
  const [radio, setRadio] = React.useState(100)
  
  const [multiPolygon, setMultiPolygon] = React.useState([
    [-12.069106027403414, -77.06551647259658], 
    [-12.069106027403414, -77.0637195274034],
    [-12.070902972596585, -77.0637195274034],
    [-12.070902972596585, -77.06551647259658],
  ])

  const dibujarCuadrado = () => {
    setCoords({
      latitude,
      longitude,
      radio
    })
    calcularEsquinas(latitude, longitude, radio)
  }

  const calcularEsquinas = (lat, long, rad) => {
    const latitudDiferencia = rad / 111111;
    const longitudDiferencia = rad / (111111 * Math.cos(lat * (Math.PI / 180)));

    const esquinaSuperiorIzquierda = {
      latitude: lat + latitudDiferencia,
      longitude: long - longitudDiferencia,
    };

    const esquinaSuperiorDerecha = {
      latitude: lat + latitudDiferencia,
      longitude: long + longitudDiferencia,
    };

    const esquinaInferiorIzquierda = {
      latitude: lat - latitudDiferencia,
      longitude: long - longitudDiferencia,
    };

    const esquinaInferiorDerecha = {
      latitude: lat - latitudDiferencia,
      longitude: long + longitudDiferencia,
    };

    setMultiPolygon([
      [esquinaSuperiorIzquierda.latitude, esquinaSuperiorIzquierda.longitude],
      [esquinaSuperiorDerecha.latitude, esquinaSuperiorDerecha.longitude],
      [esquinaInferiorDerecha.latitude, esquinaInferiorDerecha.longitude],
      [esquinaInferiorIzquierda.latitude, esquinaInferiorIzquierda.longitude],
    ])
  }

  return (
    <>
      <div className='form-coords'>
        <div>
          <label htmlFor="latitude">Latitude</label>
          <input name="latitude" type="text" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value.replace(/[^0-9.-]/g, '')))}/>
        </div>
        <div>
          <label htmlFor="longitude">Longitude</label>
          <input name="longitude" type="text" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value.replace(/[^0-9.-]/g, '')))}/>
        </div>
        <div>
          <label htmlFor="radio">Radio</label>
          <input name="radio" type="text" value={radio} onChange={(e) => setRadio(parseFloat(e.target.value.replace(/[^0-9.-]/g, '')))}/>
        </div>
        <button onClick={dibujarCuadrado}>Dibujar Coords</button>
      </div>
      <MapContainer id="map" center={[coords.latitude,coords.longitude]} zoom={18} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.latitude,coords.longitude]} />
        <Circle center={[coords.latitude,coords.longitude]} pathOptions={fillBlueOptions} radius={coords.radio} />
        <Polygon pathOptions={limeOptions} positions={multiPolygon} />
      </MapContainer>
    </>
  )
}

export default App

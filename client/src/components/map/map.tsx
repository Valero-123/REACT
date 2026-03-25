import React, {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';

type City = {
	lat: number;
	lng: number;
	zoom: number;
};

type Point = {
	id: string;
	title: string;
	lat: number;
	lng: number;
};

type MapProps = {
	city: City;
	points: Point[];
	selectedPointId?: string;
};

function Map({city, points, selectedPointId}: MapProps): React.ReactElement {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const map = useMap(mapRef, city);

	useEffect(() => {
		if (!map) {
			return;
		}

		// Создаем иконки для маркеров
		const defaultIcon = leaflet.icon({
			iconUrl: 'img/pin.svg',
			iconSize: [27, 39],
			iconAnchor: [13, 39],
		});

		const activeIcon = leaflet.icon({
			iconUrl: 'img/pin-active.svg',
			iconSize: [27, 39],
			iconAnchor: [13, 39],
		});

		// Очищаем старые маркеры
		const markersLayer = leaflet.layerGroup().addTo(map);

		points.forEach((point) => {
			const isSelected = point.id === selectedPointId;
			
			leaflet
				.marker([point.lat, point.lng], {
					icon: isSelected ? activeIcon : defaultIcon,
				})
				.addTo(markersLayer);
		});

		// Очистка при размонтировании
		return () => {
			markersLayer.clearLayers();
		};
	}, [map, points, selectedPointId]);

	return (
		<div
			ref={mapRef}
			style={{width: '100%', height: '500px'}}
		/>
	);
}

export default Map;
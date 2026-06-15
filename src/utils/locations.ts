import rawPlaces from '../../centroides_veredas.json';

type RawPlace = {
  name: string;
  id: string;
  latitud: string;
  longitud: string;
  municipio: string;
  departamento: string;
};

export type Place = {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
  municipality: string;
  department: string;
  searchName: string;
};

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

const places: Place[] = (rawPlaces as RawPlace[]).map(place => ({
  name: place.name,
  id: place.id,
  latitude: Number(place.latitud),
  longitude: Number(place.longitud),
  municipality: place.municipio,
  department: place.departamento,
  searchName: normalizeText(
    `${place.name} ${place.municipio} ${place.departamento}`,
  ),
}));

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

export const searchPlaces = (query: string, maxResults = 20) => {
  const normalizedQuery = normalizeText(query);

  return places
    .filter(place => place.searchName.includes(normalizedQuery))
    .slice(0, maxResults);
};

export const findNearestPlace = (
  latitude: number,
  longitude: number,
): Place | undefined => {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return undefined;
  }

  let nearestPlace = places[0];
  let nearestDistance = nearestPlace
    ? getDistance(
        latitude,
        longitude,
        nearestPlace.latitude,
        nearestPlace.longitude,
      )
    : undefined;

  for (const place of places.slice(1)) {
    const distance = getDistance(
      latitude,
      longitude,
      place.latitude,
      place.longitude,
    );

    if (nearestDistance === undefined || distance < nearestDistance) {
      nearestPlace = place;
      nearestDistance = distance;
    }
  }

  return nearestPlace;
};

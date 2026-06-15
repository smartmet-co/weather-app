import { findNearestPlace } from '../../src/utils/locations';

describe('locations findNearestPlace', () => {
  it('returns the place matching given coordinates', () => {
    const place = findNearestPlace(9.01715387417895, -73.5208420721286);

    expect(place).toMatchObject({
      id: '20175037',
      name: 'PLAYAS LINDAS',
      municipality: 'CHIMICHAGUA',
      department: 'CESAR',
    });
  });

  it('returns undefined for invalid coordinates', () => {
    expect(findNearestPlace(Number.NaN, -73.5208420721286)).toBeUndefined();
    expect(findNearestPlace(9.01715387417895, Number.NaN)).toBeUndefined();
  });
});

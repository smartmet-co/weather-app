import locations from '@assets/locations';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __dirname: string;

const fs = require('fs');
const path = require('path');

// Hermes corrupts its heap when a single array literal holds more than 65,535
// objects, and Metro bundles every imported JSON file as one array literal.
const HERMES_ARRAY_LITERAL_LIMIT = 65535;

const LOCATIONS_DIR = path.join(__dirname, '../../src/assets/locations');

const chunkFiles = fs
  .readdirSync(LOCATIONS_DIR)
  .filter((file: string) => /^locations-\d+\.json$/.test(file));

const readChunk = (file: string) =>
  JSON.parse(fs.readFileSync(path.join(LOCATIONS_DIR, file), 'utf8'));

describe('locations dataset', () => {
  it('is only shipped as chunks', () => {
    expect(chunkFiles.length).toBeGreaterThan(0);
    expect(fs.existsSync(path.join(LOCATIONS_DIR, 'locations.json'))).toBe(false);
  });

  it('keeps every chunk below the Hermes array literal limit', () => {
    chunkFiles.forEach((file: string) => {
      expect(readChunk(file).length).toBeLessThan(HERMES_ARRAY_LITERAL_LIMIT);
    });
  });

  it('joins all chunks without holes', () => {
    const total = chunkFiles.reduce(
      (sum: number, file: string) => sum + readChunk(file).length,
      0
    );

    expect(locations).toHaveLength(total);
    expect(locations.every(Boolean)).toBe(true);
  });

  it('has complete entries with unique ids', () => {
    const ids = new Set<string>();

    locations.forEach((location) => {
      expect(location.name.primary).toBeTruthy();
      expect(location.region.primary).toBeTruthy();
      expect(location.timezone).toBeTruthy();
      expect(typeof location.latitude).toBe('number');
      expect(typeof location.longitude).toBe('number');
      ids.add(location.id);
    });

    expect(ids.size).toBe(locations.length);
  });
});

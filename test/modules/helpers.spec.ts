import {
  isNumber,
  loadSpotifyPlayer,
  millisecondsToTime,
  parseVolume,
  round,
  validateURI,
} from '~/modules/helpers';

describe('isNumber', () => {
  it('should return properly', () => {
    expect(isNumber(1)).toBeTrue();
    expect(isNumber('1')).toBeFalse();
  });
});

describe('loadSpotifyPlayer', () => {
  afterAll(() => {
    document.getElementById('spotify-player')?.remove();
  });

  it('should load the script', () => {
    loadSpotifyPlayer();

    const scriptTag = document.getElementById('spotify-player') as HTMLScriptElement;

    expect(scriptTag.tagName).toBe('SCRIPT');
    expect(scriptTag.src).toBe('https://sdk.scdn.co/spotify-player.js');
  });
});

describe('millisecondsToTime', () => {
  it.each([
    [0, '0:00'],
    [1200, '0:01'],
    [63000, '1:03'],
    [3610000, '01:00:10'],
    [7123490, '01:58:43'],
  ])('should convert %d to %s', (input, expected) => {
    expect(millisecondsToTime(input)).toBe(expected);
  });
});

describe('parseVolume', () => {
  it.each([
    [0.3, 0.3],
    [1, 1],
    ['100', 1],
    [3, 0.03],
    [20, 0.2],
  ])('should parse %d to %d', (input, expected) => {
    expect(parseVolume(input)).toBe(expected);
  });
});

describe('round', () => {
  it.each([
    [10.1029, 1, 10.1],
    [34.0293, 2, 34.03],
    [79.0178, 3, 79.018],
  ])('should convert %d with %d digits to %d', (input, digits, expected) => {
    expect(round(input, digits)).toEqual(expected);
  });
});

describe('validateURI', () => {
  it.each([
    ['spotify:album:51QBkcL7S3KYdXSSA0zM9R', true],
    ['spotify:artist:7A0awCXkE1FtSU8B0qwOJQ', true],
    ['spotify:episode:6r8OOleI5xP7qCEipHvdyK', false],
    ['spotify:playlist:5kHMGRfZHORA4UrCbhYyad', true],
    ['spotify:show:5huEzXsf133dhbh57Np2tg', true],
    ['spotify:track:0gkVD2tr14wCfJhqhdE94L', true],
    ['spotify:user:gilbarbara', false],
  ])('%s should return %s', (value, expected) => {
    expect(validateURI(value)).toBe(expected);
  });
});

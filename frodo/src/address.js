export class Address {
  constructor(country, state, city, zip, street) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }
}

export function zipCode(code, location) {
  let _code = code;
  let _location = location || '';

  return {
    code: () => _code,
    location: () => _location,
    fromString: (str) => {
      let parts = str.split('-');
      return zipCode(parts[0], parts[1]);
    },
    toString: () => _code + '-' + _location,
  };
}

export function coordinate(lat, long) {
  let _lat = lat;
  let _long = long;

  return {
    latitude: () => _lat,
    longitude: () => _long,
    translate: (dx, dy) => coordinate(_lat + dx, _long + dy),
    toString: () => '(' + _lat + ',' + _long + ')',
  };
}

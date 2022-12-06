// Export interface GeocodeInformation {
//   place_id: number;
//   licence: string;
//   osm_type: string;
//   osm_id: number;
//   boundingbox: string[];
//   lat: string;
//   lon: string;
//   display_name: string;
//   class: string;
//   type: string;
//   importance: number;
//   icon: string;
//   address: {
//     city: string;
//     county: string;
//     state_district: string;
//     "ISO3166-2-lvl6": string;
//     state: string;
//     "ISO3166-2-lvl4": string;
//     postcode: string;
//     country: string;
//     country_code: string;
//   };
// }ç

export interface GoogleGeocodeResponse {
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    place_id: string;
    types: string[];
  }>;
  status: string;
}

// Export type GeocodeResponse = GeocodeInformation[];

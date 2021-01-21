import { createContext, useContext } from 'react';

const LocationsContext = createContext(null);

export const LocationProvider = LocationsContext.Provider;

export const useLocations = () => useContext(LocationsContext);

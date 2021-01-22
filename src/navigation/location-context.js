import { createContext, useContext } from 'react';
import locations from './locations';

const LocationsContext = createContext(null);

export const LocationProvider = props => <LocationsContext.Provider value={locations} {...props} />;

export const useLocations = () => useContext(LocationsContext);

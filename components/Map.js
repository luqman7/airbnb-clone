import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});
    
    //Extract lat long from searchResults
    const coor = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const centerCoor = getCenter(coor);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: centerCoor.latitude,
        longitude: centerCoor.longitude,
        zoom: 11,
    });
    
    return (
        <ReactMapGL
            mapStyle='mapbox://styles/lukehakem/cks1a5evr4gkw17perzhjjajx'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20} //offset to make the pin perfectly on the dot latlong
                    offsetTop={-10}
                >
                    <p 
                        className='cursor-pointer text-2xl animate-bounce'
                            onClick={() => setSelectedLocation(result)}
                            role='img'
                            aria-label='push-pin'
                    >📍</p>
                </Marker>
                
                {/* the popup show if click the Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ): (
                            false
                )}
            </div>
            ))}
        </ReactMapGL>  
    );
}

export default Map

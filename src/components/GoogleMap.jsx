import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const GoogleMap = () => {
  const restaurantInfo = {
    name: "Delicious Bites",
    address: "123 Food Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    hours: {
      weekdays: "11:00 AM - 10:00 PM",
      saturday: "10:00 AM - 11:00 PM",
      sunday: "10:00 AM - 9:00 PM"
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantInfo.address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {/* Map Container */}
        <div className="w-full h-96 bg-gray-200 relative">
          {/* Embedded Google Map */}
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(restaurantInfo.address)}`}
            allowFullScreen
            title="Restaurant Location"
            className="absolute inset-0"
          />
          
          {/* Fallback when API key is not available */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Find Us Here</h3>
              <p className="text-gray-600 mb-4">{restaurantInfo.address}</p>
              <button
                onClick={handleGetDirections}
                className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Location Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">{restaurantInfo.name}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  <span>{restaurantInfo.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  <span>{restaurantInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Open: {restaurantInfo.hours.weekdays}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleGetDirections}
              className="ml-4 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hours Section */}
      <div className="p-6 bg-gray-50">
        <h4 className="font-semibold text-gray-800 mb-3">Opening Hours</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-medium">{restaurantInfo.hours.weekdays}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium">{restaurantInfo.hours.saturday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="font-medium">{restaurantInfo.hours.sunday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
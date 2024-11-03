import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe2, Users, MapPin, Languages, Coins, Clock, Map } from 'lucide-react';

export default function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        if (!response.ok) throw new Error('Country not found');
        const [data] = await response.json();
        setCountry(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 w-32 rounded" />
            <div className="h-64 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-gray-200 rounded-lg" />
              <div className="h-32 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error || 'Country not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currencies = Object.values(country.currencies || {});
  const languages = Object.values(country.languages || {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Countries
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl font-bold text-white mb-2">{country.name.common}</h1>
              <p className="text-gray-200">{country.name.official}</p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Capital</h3>
                  <p className="text-lg">{country.capital?.[0] || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe2 className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Region</h3>
                  <p className="text-lg">{country.region} ({country.subregion})</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Population</h3>
                  <p className="text-lg">{new Intl.NumberFormat().format(country.population)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Languages className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Languages</h3>
                  <p className="text-lg">{languages.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Coins className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Currencies</h3>
                  <p className="text-lg">
                    {currencies.map(c => `${c.name} (${c.symbol})`).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Timezones</h3>
                  <p className="text-lg">{country.timezones.join(', ')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Map className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-600">Maps</h3>
                  <div className="space-x-4">
                    <a
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Google Maps
                    </a>
                    <a
                      href={country.maps.openStreetMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      OpenStreetMap
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {country.borders && country.borders.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Bordering Countries</h2>
            <div className="flex flex-wrap gap-2">
              {country.borders.map(border => (
                <span
                  key={border}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-600"
                >
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
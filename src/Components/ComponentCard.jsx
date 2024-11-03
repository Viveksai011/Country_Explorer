import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComponentCard({ country }) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/country/${country.name.common}`)}
    className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
  >
    <div className="relative">
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 rounded-3xl left-0 m-2 bg-yellow-500 px-4 py-1">
        <h2 className="text-xl font-bold">{country.name.common}</h2>
      </div>
    </div>

    <div className="p-4">
      <p className="mb-1"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
      <p className="mb-1"><span className="font-semibold">Population:</span> {new Intl.NumberFormat().format(country.population)}</p>
      <p><span className="font-semibold">Region:</span> {country.region}</p>
    </div>
  </div>
  );
}
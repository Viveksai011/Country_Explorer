import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CountryList({ countries, sortConfig, onSort }) {
  const navigate = useNavigate();

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flag
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center gap-1">
                Name
                <SortIcon columnKey="name" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Capital
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('population')}
            >
              <div className="flex items-center gap-1">
                Population
                <SortIcon columnKey="population" />
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('region')}
            >
              <div className="flex items-center gap-1">
                Region
                <SortIcon columnKey="region" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {countries.map((country) => (
            <tr 
              key={country.name.common}
              onClick={() => navigate(`/country/${country.name.common}`)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <img 
                  src={country.flags.svg} 
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  className="h-6 w-10 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {country.name.common}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {country.capital?.[0] || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Intl.NumberFormat().format(country.population)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {country.region}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
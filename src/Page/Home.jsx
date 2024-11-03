import React, { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import  CountryCard  from '../Components/ComponentCard';
import  CountryList  from '../Components/CountryList';
import  SearchFilters  from '../Components/SearchFilter';

export function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const regions = [...new Set(countries.map(country => country.region))].sort();

  const filteredCountries = countries
    .filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase()) ||
                          country.capital?.[0]?.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = !region || country.region === region;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (sortConfig.key === 'name') {
        return direction * a.name.common.localeCompare(b.name.common);
      }
      if (sortConfig.key === 'population') {
        return direction * (a.population - b.population);
      }
      if (sortConfig.key === 'region') {
        return direction * a.region.localeCompare(b.region);
      }
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded-lg w-full max-w-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-72 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <SearchFilters
            search={search}
            onSearchChange={setSearch}
            region={region}
            onRegionChange={setRegion}
            regions={regions}
          />
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map(country => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </div>
        ) : (
          <CountryList
            countries={filteredCountries}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        )}
      </div>
    </div>
  );
}
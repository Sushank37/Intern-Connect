import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign,
  Calendar,
  ExternalLink,
  Filter,
  Laptop
} from "lucide-react";
import { SectionTransition, CardHover, StaggerContainer, StaggerItem } from "./PageTransition.tsx";

interface Company {
  id: number;
  name: string;
  description: string | null;
  website: string | null;
  industry: string | null;
  size: string | null;
  logo: string | null;
  location: string | null;
  createdAt: Date;
}

interface Internship {
  id: number;
  companyId: number;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  location: string | null;
  remote: boolean | null;
  duration: string | null;
  stipend: string | null;
  applicationDeadline: Date | null;
  startDate: Date | null;
  isActive: boolean | null;
  postedAt: Date;
  createdAt: Date;
  company: Company;
}

const InternshipSearch = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState<boolean | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced fetch function
  const debouncedFetch = useCallback(
    debounce(async (search: string, location: string, remote: boolean | undefined) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (location) params.append('location', location);
        if (remote !== undefined) params.append('remote', remote.toString());

        const response = await fetch(`/api/internships?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setInternships(data);
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(searchTerm, locationFilter, remoteFilter);
  }, [searchTerm, locationFilter, remoteFilter, debouncedFetch]);

  // Debounce utility
  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const formatStipend = (stipend: string | null) => {
    if (!stipend) return 'Unpaid';
    const amount = parseFloat(stipend);
    return `$${amount.toLocaleString()}/month`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <SectionTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect 
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> PM Internship</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Search through hundreds of Product Management internships from top companies
          </p>
        </div>

        {/* Search Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Main Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search internships by title, company, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-purple-500/20">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <Input
                  placeholder="City, State"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Work Type</label>
                <select
                  value={remoteFilter === undefined ? '' : remoteFilter ? 'remote' : 'onsite'}
                  onChange={(e) => {
                    if (e.target.value === '') setRemoteFilter(undefined);
                    else setRemoteFilter(e.target.value === 'remote');
                  }}
                  className="w-full p-2 bg-white/10 border border-purple-500/30 rounded-md text-white"
                >
                  <option value="">All</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('');
                    setRemoteFilter(undefined);
                  }}
                  variant="outline"
                  className="border-gray-500/50 text-gray-400 hover:bg-gray-500/20"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Finding amazing internships...</p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <StaggerContainer>
            <div className="mb-6">
              <p className="text-gray-400">
                Found {internships.length} internship{internships.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {internships.map((internship) => (
                <StaggerItem key={internship.id}>
                  <CardHover>
                    <Card className="bg-white/10 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                              {internship.title}
                            </h3>
                            <div className="flex items-center text-purple-300 mb-2">
                              <Building2 className="w-4 h-4 mr-2" />
                              <span className="font-medium">{internship.company.name}</span>
                            </div>
                          </div>
                          {internship.remote && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <Laptop className="w-3 h-3 mr-1" />
                              Remote
                            </Badge>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {internship.description}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            {internship.location || 'Location TBD'}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {internship.duration || 'Duration TBD'}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {formatStipend(internship.stipend)}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            Apply by {formatDate(internship.applicationDeadline)}
                          </div>
                        </div>

                        {/* Company Info */}
                        <div className="border-t border-purple-500/20 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                              {internship.company.industry && (
                                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 mr-2">
                                  {internship.company.industry}
                                </Badge>
                              )}
                              {internship.company.size && (
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                  {internship.company.size}
                                </Badge>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                // Open application in new tab or show application modal
                                console.log(`Applying to ${internship.title} at ${internship.company.name}`);
                                if (internship.company.website) {
                                  window.open(internship.company.website, '_blank');
                                } else {
                                  alert(`Applying to ${internship.title} at ${internship.company.name}. This would typically open an application form or redirect to the company's careers page.`);
                                }
                              }}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            >
                              Apply Now
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardHover>
                </StaggerItem>
              ))}
            </div>

            {/* No Results */}
            {internships.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No internships found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('');
                    setRemoteFilter(undefined);
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </StaggerContainer>
        )}
      </SectionTransition>
    </section>
  );
};

export default InternshipSearch;
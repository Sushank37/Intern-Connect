import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign,
  Calendar,
  ExternalLink,
  Laptop,
  Loader2
} from 'lucide-react';
import { WizardData } from '../InternshipWizard';

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

interface ScoredInternship extends Internship {
  score: number;
  matchReasons: string[];
}

interface RecommendationsStepProps {
  wizardData: WizardData;
  onBack: () => void;
  onClose: () => void;
}

const RecommendationsStep: React.FC<RecommendationsStepProps> = ({
  wizardData,
  onBack,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<ScoredInternship[]>([]);

  const calculateMatch = (internship: Internship): ScoredInternship => {
    let score = 0;
    const matchReasons: string[] = [];
    const { preferences } = wizardData;

    // Skills overlap (50% weight)
    const skillsScore = calculateSkillsMatch(internship, preferences.skills);
    score += skillsScore * 0.5;
    if (skillsScore > 0.3) {
      matchReasons.push('Matching skills found');
    }

    // Sector match (15% weight)
    const sectorScore = calculateSectorMatch(internship, preferences.sector);
    score += sectorScore * 0.15;
    if (sectorScore > 0.5) {
      matchReasons.push('Industry match');
    }

    // Work mode match (10% weight)
    const workModeScore = calculateWorkModeMatch(internship, preferences.workMode);
    score += workModeScore * 0.1;
    if (workModeScore > 0.5) {
      matchReasons.push('Work mode preference');
    }

    // Duration match (10% weight)
    const durationScore = calculateDurationMatch(internship, preferences.duration);
    score += durationScore * 0.1;
    if (durationScore > 0.5) {
      matchReasons.push('Duration preference');
    }

    // Internship type match (15% weight)
    const typeScore = calculateTypeMatch(internship, preferences.internshipType);
    score += typeScore * 0.15;
    if (typeScore > 0.5) {
      matchReasons.push('Internship type match');
    }

    // Location bonus - small boost for active/recent internships
    if (internship.isActive) {
      score += 0.05;
    }

    return {
      ...internship,
      score: Math.min(score, 1), // Cap at 1.0
      matchReasons: matchReasons.length > 0 ? matchReasons : ['General match']
    };
  };

  const calculateSkillsMatch = (internship: Internship, userSkills: string[]): number => {
    if (!userSkills.length) return 0;

    // Tokenize internship text for better matching
    const internshipText = `${internship.title} ${internship.description} ${internship.requirements || ''}`.toLowerCase();
    const internshipTokens = new Set(
      internshipText.split(/\s+/).filter(token => token.length > 2) // Remove short words
    );
    
    const normalizedUserSkills = new Set(userSkills.map(skill => skill.toLowerCase()));
    
    // Calculate Jaccard similarity: |A ∩ B| / |A ∪ B|
    const intersection = new Set(Array.from(normalizedUserSkills).filter(skill => 
      Array.from(internshipTokens).some(token => token.includes(skill) || skill.includes(token))
    ));
    
    const union = new Set([...Array.from(normalizedUserSkills), ...Array.from(internshipTokens)]);
    
    const jaccard = intersection.size / union.size;
    console.log(`Skills match for ${internship.title}: ${jaccard.toFixed(3)} (${intersection.size}/${union.size})`);
    
    return jaccard;
  };

  const calculateSectorMatch = (internship: Internship, userSector: string): number => {
    if (!internship.company.industry || !userSector) return 0;
    
    const internshipIndustry = internship.company.industry.toLowerCase();
    const userIndustry = userSector.toLowerCase();
    
    if (internshipIndustry === userIndustry) return 1.0;
    if (internshipIndustry.includes(userIndustry) || userIndustry.includes(internshipIndustry)) return 0.7;
    
    return 0;
  };

  const calculateWorkModeMatch = (internship: Internship, userWorkMode: string): number => {
    if (!userWorkMode) return 0.5;

    const userMode = userWorkMode.toLowerCase();
    
    if (userMode === 'flexible') return 1.0;
    if (userMode === 'remote' && internship.remote) return 1.0;
    if (userMode === 'onsite' && !internship.remote) return 1.0;
    if (userMode === 'hybrid') return 0.8; // Hybrid can work with both
    
    return 0.2;
  };

  const calculateDurationMatch = (internship: Internship, userDuration: number): number => {
    if (!internship.duration) return 0.5;

    const durationText = internship.duration.toLowerCase();
    let internshipMonths = 3; // default

    // Parse duration
    if (durationText.includes('month')) {
      const match = durationText.match(/(\d+)\s*month/);
      if (match) internshipMonths = parseInt(match[1]);
    } else if (durationText.includes('summer')) {
      internshipMonths = 3;
    } else if (durationText.includes('semester')) {
      internshipMonths = 4;
    } else if (durationText.includes('year')) {
      internshipMonths = 12;
    }

    const diff = Math.abs(internshipMonths - userDuration);
    return Math.max(0, 1 - (diff / 6)); // 6 month difference = 0 score
  };

  const calculateTypeMatch = (internship: Internship, userType: string): number => {
    if (!userType) return 0.5;

    const titleLower = internship.title.toLowerCase();
    const typeLower = userType.toLowerCase();

    if (typeLower.includes('summer') && titleLower.includes('summer')) return 1.0;
    if (typeLower.includes('part-time') && (titleLower.includes('part') || titleLower.includes('part-time'))) return 1.0;
    if (typeLower.includes('full-time') && (titleLower.includes('full') || titleLower.includes('full-time'))) return 1.0;
    if (typeLower.includes('co-op') && titleLower.includes('co-op')) return 1.0;
    if (typeLower.includes('virtual') && titleLower.includes('virtual')) return 1.0;

    return 0.3; // Default partial match
  };

  const formatStipend = (stipend: string | null) => {
    if (!stipend) return 'Unpaid';
    const amount = parseFloat(stipend);
    return `₹${amount.toLocaleString()}/month`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    const fetchAndScore = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/internships');
        if (response.ok) {
          const internships: Internship[] = await response.json();
          console.log(`Fetched ${internships.length} total internships for recommendation matching`);
          
          // Score all internships
          const scored = internships
            .map(internship => calculateMatch(internship))
            // Deterministic sorting: score desc, then postedAt desc, then id asc
            .sort((a, b) => {
              if (b.score !== a.score) return b.score - a.score;
              if (b.postedAt !== a.postedAt) return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
              return a.id - b.id;
            })
            .slice(0, 5); // Enforce top 3-5 recommendations

          console.log('Top recommendations:', scored.map(s => `${s.title} (${(s.score * 100).toFixed(1)}%)`));
          setRecommendations(scored);
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndScore();
  }, [wizardData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-600">Finding your perfect matches...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Perfect Matches for {wizardData.personal.name}
        </h3>
        <p className="text-gray-600">
          Based on your preferences, here are the best internship opportunities for you
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            No matching internships found. Try adjusting your preferences or check back later for new opportunities.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((internship) => (
            <Card key={internship.id} className="border border-purple-200 hover:border-purple-400 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{internship.title}</h4>
                    <div className="flex items-center text-purple-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="font-medium">{internship.company.name}</span>
                    </div>
                    <div className="flex items-center text-green-600 mb-2">
                      <span className="text-sm font-medium">{Math.round(internship.score * 100)}% Match</span>
                    </div>
                  </div>
                  {internship.remote && (
                    <Badge className="bg-green-100 text-green-800">
                      <Laptop className="w-3 h-3 mr-1" />
                      Remote
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {internship.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {internship.location || 'Location TBD'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {internship.duration || 'Duration TBD'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {formatStipend(internship.stipend)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Apply by {formatDate(internship.applicationDeadline)}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Why this matches:</p>
                  <div className="flex flex-wrap gap-1">
                    {internship.matchReasons.map((reason, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => {
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Preferences
        </Button>
        <Button 
          onClick={onClose}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsStep;
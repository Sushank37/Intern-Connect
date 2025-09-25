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
  skills: string | null; // JSON array of required skills
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
    const { preferences, personal } = wizardData;

    // Debug logging
    console.log(`\n=== Matching ${internship.title} ===`);
    console.log('User skills:', preferences.skills);
    console.log('User education:', personal?.educationLevel);

    // Skills overlap (40% weight - reduced to make room for education)
    const skillsScore = calculateSkillsMatch(internship, preferences.skills);
    score += skillsScore * 0.4;
    if (skillsScore > 0.2) {
      matchReasons.push('Matching skills found');
    }

    // Education level match (20% weight - new criteria)
    const educationScore = calculateEducationMatch(internship, personal?.educationLevel || '');
    score += educationScore * 0.2;
    if (educationScore > 0.5) {
      matchReasons.push('Education level match');
    }

    // Sector match (12% weight)
    const sectorScore = calculateSectorMatch(internship, preferences.sector);
    score += sectorScore * 0.12;
    if (sectorScore > 0.5) {
      matchReasons.push('Industry match');
    }

    // Work mode match (8% weight)
    const workModeScore = calculateWorkModeMatch(internship, preferences.workMode);
    score += workModeScore * 0.08;
    if (workModeScore > 0.5) {
      matchReasons.push('Work mode preference');
    }

    // Duration match (8% weight)
    const durationScore = calculateDurationMatch(internship, preferences.duration);
    score += durationScore * 0.08;
    if (durationScore > 0.5) {
      matchReasons.push('Duration preference');
    }

    // Internship type match (12% weight)
    const typeScore = calculateTypeMatch(internship, preferences.internshipType);
    score += typeScore * 0.12;
    if (typeScore > 0.5) {
      matchReasons.push('Internship type match');
    }

    // Location bonus - small boost for active/recent internships
    if (internship.isActive) {
      score += 0.05;
    }

    console.log(`Total score: ${(score * 100).toFixed(1)}% (Skills: ${(skillsScore * 40).toFixed(1)}%, Education: ${(educationScore * 20).toFixed(1)}%)`);

    return {
      ...internship,
      score: Math.min(score, 1), // Cap at 1.0
      matchReasons: matchReasons.length > 0 ? matchReasons : ['General match']
    };
  };

  const calculateSkillsMatch = (internship: Internship, userSkills: string[]): number => {
    console.log(`\n--- Skills matching for ${internship.title} ---`);
    console.log('Raw user skills:', userSkills);
    console.log('Raw internship skills field:', internship.skills);
    
    if (!userSkills.length) {
      console.log('No user skills provided, returning 0');
      return 0;
    }

    // Parse internship skills from JSON
    let internshipSkills: string[] = [];
    try {
      if (internship.skills) {
        internshipSkills = JSON.parse(internship.skills);
        console.log('Parsed internship skills:', internshipSkills);
      } else {
        console.log('No skills field in internship');
      }
    } catch (error) {
      console.log('JSON parsing failed, using fallback:', error);
      // Fallback to text parsing if JSON parsing fails
      const internshipText = `${internship.title} ${internship.description} ${internship.requirements || ''}`.toLowerCase();
      internshipSkills = internshipText.split(/\s+/).filter(token => token.length > 2);
      console.log('Fallback skills from text:', internshipSkills.slice(0, 10)); // Show first 10
    }

    if (!internshipSkills.length) {
      console.log('No internship skills found, returning 0');
      return 0;
    }
    
    const normalizedUserSkills = new Set(userSkills.map(skill => skill.toLowerCase()));
    const normalizedInternshipSkills = new Set(internshipSkills.map(skill => skill.toLowerCase()));
    
    console.log('Normalized user skills:', Array.from(normalizedUserSkills));
    console.log('Normalized internship skills:', Array.from(normalizedInternshipSkills));
    
    // Calculate Jaccard similarity: |A ∩ B| / |A ∪ B|
    const intersection = new Set(Array.from(normalizedUserSkills).filter(userSkill => 
      Array.from(normalizedInternshipSkills).some(internshipSkill => 
        internshipSkill.includes(userSkill) || userSkill.includes(internshipSkill) ||
        userSkill === internshipSkill
      )
    ));
    
    const union = new Set([...Array.from(normalizedUserSkills), ...Array.from(normalizedInternshipSkills)]);
    
    const jaccard = intersection.size / union.size;
    console.log(`Skills match result: ${jaccard.toFixed(3)} (${intersection.size}/${union.size})`);
    console.log(`Intersection skills: [${Array.from(intersection).join(', ')}]`);
    
    return jaccard;
  };

  const calculateEducationMatch = (internship: Internship, userEducation: string): number => {
    if (!userEducation) return 0.5;

    // Education level hierarchy
    const educationLevels = {
      'high-school': 1,
      'bootcamp': 2,
      'other': 2,
      'bachelors': 3,
      'masters': 4,
      'phd': 5
    };

    const userLevel = educationLevels[userEducation as keyof typeof educationLevels] || 2;
    
    // Determine required education level based on internship title and description
    const title = internship.title.toLowerCase();
    const description = internship.description.toLowerCase();
    const requirements = (internship.requirements || '').toLowerCase();
    const text = `${title} ${description} ${requirements}`;

    // Senior roles or enterprise positions typically require higher education
    let requiredLevel = 2; // default: bootcamp/other level

    if (text.includes('senior') || text.includes('lead') || text.includes('enterprise')) {
      requiredLevel = 4; // masters level
    } else if (text.includes('advanced') || text.includes('specialist') || text.includes('expert')) {
      requiredLevel = 3; // bachelors level
    } else if (text.includes('entry') || text.includes('junior') || text.includes('intern')) {
      requiredLevel = 2; // bootcamp/certificate level
    } else if (text.includes('research') || text.includes('phd') || text.includes('doctorate')) {
      requiredLevel = 5; // PhD level
    }

    // Calculate match score
    if (userLevel >= requiredLevel) {
      // User meets or exceeds requirements - bonus for higher education
      const bonus = Math.min((userLevel - requiredLevel) * 0.1, 0.3); // Up to 30% bonus
      return Math.min(1.0, 0.7 + bonus);
    } else {
      // User doesn't meet requirements - penalty
      const penalty = (requiredLevel - userLevel) * 0.2;
      return Math.max(0, 0.3 - penalty);
    }
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
            .slice(0, 15); // Show top 15 recommendations based on matching score

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
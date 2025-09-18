import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useWizard } from '@/contexts/WizardContext';
import PersonalDetailsStep from './wizard-steps/PersonalDetailsStep';
import PreferencesStep from './wizard-steps/PreferencesStep';
import RecommendationsStep from './wizard-steps/RecommendationsStep';

export interface PersonalDetails {
  name: string;
  age: number;
  educationLevel: string;
}

export interface InternshipPreferences {
  skills: string[];
  internshipType: string;
  sector: string;
  duration: number; // in months
  location: string;
  workMode: string;
}

export interface WizardData {
  personal: PersonalDetails;
  preferences: InternshipPreferences;
}

const InternshipWizard: React.FC = () => {
  const { isOpen, closeWizard } = useWizard();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({});

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setWizardData({});
    closeWizard();
  };

  const updatePersonalDetails = (details: PersonalDetails) => {
    setWizardData(prev => ({ ...prev, personal: details }));
  };

  const updatePreferences = (preferences: InternshipPreferences) => {
    setWizardData(prev => ({ ...prev, preferences }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            data={wizardData.personal}
            onNext={handleNext}
            onUpdate={updatePersonalDetails}
          />
        );
      case 2:
        return (
          <PreferencesStep
            data={wizardData.preferences}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updatePreferences}
          />
        );
      case 3:
        return (
          <RecommendationsStep
            wizardData={wizardData as WizardData}
            onBack={handleBack}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Internship Preferences';
      case 3:
        return 'Your Recommendations';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {getStepTitle()}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {currentStep === 1 && "Let's get to know you better to find perfect internship matches"}
            {currentStep === 2 && "Tell us about your internship preferences and skills"}
            {currentStep === 3 && "Here are your personalized internship recommendations"}
          </DialogDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    step <= currentStep
                      ? 'bg-purple-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InternshipWizard;
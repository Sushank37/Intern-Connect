import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { InternshipPreferences } from '../InternshipWizard';

interface PreferencesStepProps {
  data?: InternshipPreferences;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: InternshipPreferences) => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({
  data,
  onNext,
  onBack,
  onUpdate,
}) => {
  const [skills, setSkills] = useState<string[]>(data?.skills || []);
  const [skillInput, setSkillInput] = useState('');

  const form = useForm<Omit<InternshipPreferences, 'skills'>>({
    defaultValues: {
      internshipType: data?.internshipType || '',
      sector: data?.sector || '',
      duration: data?.duration || 3,
      location: data?.location || '',
      workMode: data?.workMode || '',
    },
  });

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const onSubmit = (formData: Omit<InternshipPreferences, 'skills'>) => {
    if (skills.length === 0) {
      form.setError('root', { message: 'Please add at least one skill' });
      return;
    }

    const fullData: InternshipPreferences = {
      ...formData,
      skills,
    };

    onUpdate(fullData);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Tell us about your internship preferences to find the perfect match for you.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Skills Section */}
          <div className="space-y-2">
            <FormLabel>Skills & Technologies</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Enter a skill (e.g., JavaScript, Design, Analytics)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addSkill} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            {form.formState.errors.root && (
              <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
            )}
          </div>

          <FormField
            control={form.control}
            name="internshipType"
            rules={{ required: 'Internship type is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internship Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select internship type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="summer">Summer Internship</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="co-op">Co-op Program</SelectItem>
                    <SelectItem value="virtual">Virtual Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sector"
            rules={{ required: 'Sector is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Sector</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="media">Media & Entertainment</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Duration (months)</FormLabel>
                <FormControl>
                  <div className="px-4">
                    <Slider
                      min={1}
                      max={12}
                      step={1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>1 month</span>
                      <span className="font-medium">{field.value} months</span>
                      <span>12 months</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  How long would you like your internship to last?
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            rules={{ required: 'Location preference is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Preference</FormLabel>
                <FormControl>
                  <Input placeholder="City, State or 'Anywhere'" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your preferred location or "Anywhere" for flexibility
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workMode"
            rules={{ required: 'Work mode is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Mode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Find My Matches
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PreferencesStep;
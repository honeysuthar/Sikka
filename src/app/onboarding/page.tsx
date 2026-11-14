'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Bengali'];
const educationLevels = ['High School', 'Undergraduate', 'Graduate', 'Post Graduate', 'Other'];
const occupations = ['Student', 'Employed', 'Self-Employed', 'Business Owner', 'Freelancer', 'Other'];
const literacyLevels = ['Beginner', 'Intermediate', 'Advanced'];

function SelectField({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: '12px' }}>
      <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: value ? '#fff' : '#555',
          fontSize: '15px',
          outline: 'none',
          cursor: 'pointer',
          appearance: 'none',
        }}
      >
        <option value="" style={{ background: '#1a1a1a' }}>Select...</option>
        {options.map(o => (
          <option key={o} value={o} style={{ background: '#1a1a1a', color: '#fff' }}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function InputField({
  label, value, onChange, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: '12px' }}>
      <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '15px',
          outline: 'none',
        }}
        className="placeholder-gray-600"
      />
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [literacy, setLiteracy] = useState('');

  const handleNext = () => {
    router.push('/onboarding/interests');
  };

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-10"
      style={{ background: '#111111', color: '#fff' }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#fff', letterSpacing: '-0.3px', marginBottom: '6px' }}>
          Tell us about yourself
        </h1>
        <p style={{ color: '#888', fontSize: '14px' }}>Add your info to get started with the app</p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-5">
        <InputField label="Age" value={age} onChange={setAge} type="number" />
        <InputField label="City" value={city} onChange={setCity} />
        <SelectField label="Preferred Language" options={languages} value={language} onChange={setLanguage} />
        <SelectField label="Education" options={educationLevels} value={education} onChange={setEducation} />
        <SelectField label="Occupation" options={occupations} value={occupation} onChange={setOccupation} />
        <SelectField label="Level of Financial Literacy" options={literacyLevels} value={literacy} onChange={setLiteracy} />
      </div>

      {/* NEXT button */}
      <div className="mt-10">
        <button
          onClick={handleNext}
          id="onboarding-next"
          style={{
            width: '100%',
            background: '#000',
            color: '#fff',
            borderRadius: '999px',
            padding: '18px',
            fontSize: '16px',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

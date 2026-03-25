import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useCV } from '../context/CVContext';
import { formatDate, type Language } from '../utils/dateFormat';
import { FONTS } from '../types';

// Social icons component
const SocialIcons: React.FC<{ linkedin?: string; linkedinUsername?: string; github?: string; githubUsername?: string; website?: string }> = ({ linkedin, linkedinUsername, github, githubUsername, website }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {(linkedin || linkedinUsername) && (
        <a href={linkedin || `https://linkedin.com/in/${linkedinUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-900 hover:text-gray-700">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span className="text-xs">{linkedinUsername}</span>
        </a>
      )}
      {(github || githubUsername) && (
        <a href={github || `https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-900 hover:text-gray-700">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-xs">{githubUsername}</span>
        </a>
      )}
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-900 hover:text-gray-700">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <span className="text-xs">Website</span>
        </a>
      )}
    </div>
  );
};

// Helper component to render a section based on its ID
interface SectionRendererProps {
  sectionId: string;
  variant?: 'minimal' | 'modern' | 'professional';
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ sectionId, variant = 'minimal' }) => {
  const { cvData, t, titleSize, sectionTitleMarginTop, language, color, textColor } = useCV();
  const lang = (language || 'en') as Language;
  const { education, experience, skills, projects, languages, voluntaryWork, conferences, certifications, achievements, publications, interests, references } = cvData;

  // PersonalInfo is handled separately in the header, skip it here
  if (sectionId === 'personalInfo') return null;

  // Summary is now part of personalInfo in header, skip it here
  if (sectionId === 'summary') return null;

  // Education section
  if (sectionId === 'education' && education.length > 0) {
    if (variant === 'professional') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold border-b-2 border-blue-500 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.education}</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={edu.institutionBold ? 'font-semibold' : ''} style={edu.institutionBold ? { fontWeight: 'bold' } : undefined}>{edu.institution}</h3>
                  <p className={edu.degreeBold ? '' : ''} style={edu.degreeBold ? { fontWeight: 'bold' } : undefined}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                </div>
                <span>{formatDate(edu.startDate, lang)} - {formatDate(edu.endDate, lang)}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (variant === 'modern') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold mb-4" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.education}</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className={edu.institutionBold ? 'font-semibold' : ''} style={edu.institutionBold ? { fontWeight: 'bold' } : undefined}>{edu.institution}</h3>
              <p className={edu.degreeBold ? '' : ''} style={edu.degreeBold ? { fontWeight: 'bold' } : undefined}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
              <p>{formatDate(edu.startDate, lang)} - {formatDate(edu.endDate, lang)}</p>
            </div>
          ))}
        </div>
      );
    }
    // minimal variant
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.education}</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 style={{ color: textColor, fontWeight: edu.institutionBold ? 'bold' : 'normal' }} className="font-medium">{edu.institution}</h3>
              <span>{formatDate(edu.startDate, lang)} - {formatDate(edu.endDate, lang)}</span>
            </div>
            <p style={{ fontWeight: edu.degreeBold ? 'bold' : 'normal' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
            {edu.description && <p className="mt-1">{edu.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  // Languages section
  if (sectionId === 'languages' && languages.length > 0) {
    const getProficiencyText = (level: string) => {
      if (level === 'native') return t.langNative;
      if (level === 'fluent') return t.langFluent;
      if (level === 'advanced') return t.langAdvanced;
      if (level === 'intermediate') return t.langIntermediate;
      return t.langBasic;
    };

    if (variant === 'professional') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold border-b-2 border-blue-500 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.languages}</h2>
          <div className="space-y-2">
            {languages.map((lang) => (
              <div key={lang.id}>
                <span className="font-medium" style={{ fontWeight: lang.languageBold ? 'bold' : 'normal' }}>{lang.language}</span>
                <span className="ml-2">{getProficiencyText(lang.proficiency)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (variant === 'modern') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold mb-4" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.languages}</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span key={lang.id} className="px-2 py-1 bg-gray-100 rounded" style={{ color: textColor, fontWeight: lang.languageBold ? 'bold' : 'normal' }}>
                {lang.language}
                <span className="ml-1">( {getProficiencyText(lang.proficiency)} )</span>
              </span>
            ))}
          </div>
        </div>
      );
    }
    // minimal variant
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.languages}</h2>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span key={lang.id} className="px-3 py-1 rounded-full" style={{ backgroundColor: `${color}20`, color: textColor, fontWeight: lang.languageBold ? 'bold' : 'normal' }}>
              {lang.language} - {getProficiencyText(lang.proficiency)}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Experience section
  if (sectionId === 'experience' && experience.length > 0) {
    if (variant === 'professional') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold border-b-2 border-blue-500 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.experience}</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 style={{ fontWeight: exp.positionBold ? 'bold' : 'normal' }} className="font-semibold">{exp.position}</h3>
                  <p style={{ color, fontWeight: exp.companyBold ? 'bold' : 'normal' }}>{exp.company}</p>
                </div>
                <span>{formatDate(exp.startDate, lang)} - {formatDate(exp.endDate, lang)}</span>
              </div>
              {exp.description && <p className="mt-2">{exp.description}</p>}
            </div>
          ))}
        </div>
      );
    }
    if (variant === 'modern') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold mb-4" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.experience}</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 style={{ fontWeight: exp.companyBold ? 'bold' : 'normal' }} className="font-semibold">{exp.company}</h3>
              <p style={{ color, fontWeight: exp.positionBold ? 'bold' : 'normal' }}>{exp.position}</p>
              <p>{formatDate(exp.startDate, lang)} - {formatDate(exp.endDate, lang)}</p>
              {exp.description && <p className="mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      );
    }
    // minimal variant
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.experience}</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 style={{ color: textColor, fontWeight: exp.companyBold ? 'bold' : 'normal' }} className="font-medium">{exp.company}</h3>
              <span>{formatDate(exp.startDate, lang)} - {formatDate(exp.endDate, lang)}</span>
            </div>
            <p style={{ fontWeight: exp.positionBold ? 'bold' : 'normal' }}>{exp.position}</p>
            {exp.description && <p className="mt-1">{exp.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  // Voluntary Work section
  if (sectionId === 'voluntaryWork' && voluntaryWork.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.voluntaryWork}</h2>
        {voluntaryWork.map((vol) => (
          <div key={vol.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 style={{ color: textColor, fontWeight: vol.organizationBold ? 'bold' : 'normal' }} className="font-medium">{vol.organization}</h3>
              <span>{formatDate(vol.startDate, lang)} - {formatDate(vol.endDate, lang)}</span>
            </div>
            <p style={{ fontWeight: vol.roleBold ? 'bold' : 'normal' }}>{vol.role}</p>
            {vol.description && <p className="mt-1">{vol.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  // Conferences section
  if (sectionId === 'conferences' && conferences.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.conferences}</h2>
        {conferences.map((conf) => (
          <div key={conf.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium" style={{ fontWeight: conf.nameBold ? 'bold' : 'normal' }}>{conf.name}</h3>
              <span>{formatDate(conf.date, lang)}</span>
            </div>
            <p style={{ fontWeight: conf.locationBold ? 'bold' : 'normal' }}>{conf.location}</p>
            {conf.description && <p className="mt-1">{conf.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  // Certifications section
  if (sectionId === 'certifications' && certifications.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.certifications}</h2>
        {certifications.map((cert) => (
          <div key={cert.id} className="mb-3">
            <h3 className="font-medium" style={{ fontWeight: cert.nameBold ? 'bold' : 'normal' }}>{cert.name}</h3>
            <p style={{ fontWeight: cert.issuerBold ? 'bold' : 'normal' }}>{cert.issuer}</p>
            <p>
              {formatDate(cert.date, lang)}{cert.expires ? ` - ${formatDate(cert.expires, lang)}` : ''}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Achievements section
  if (sectionId === 'achievements' && achievements.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.achievements}</h2>
        {achievements.map((item) => (
          <div key={item.id} className="mb-3">
            <h3 className="font-medium" style={{ fontWeight: item.titleBold ? 'bold' : 'normal' }}>{item.title}</h3>
            <p style={{ fontWeight: item.descriptionBold ? 'bold' : 'normal' }}>{item.description}</p>
            {item.date && <p className="text-gray-500 ">{item.date}</p>}
          </div>
        ))}
      </div>
    );
  }

  // Publications section
  if (sectionId === 'publications' && publications.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.publications}</h2>
        {publications.map((item) => (
          <div key={item.id} className="mb-3">
            <h3 className="font-medium" style={{ fontWeight: item.titleBold ? 'bold' : 'normal' }}>{item.title}</h3>
            <p style={{ fontWeight: item.publisherBold ? 'bold' : 'normal' }}>{item.publisher}</p>
            <p>
              {item.date}{item.url ? ` - ${item.url}` : ''}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Interests section
  if (sectionId === 'interests' && interests.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.interests}</h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <span key={item.id} className="px-2 py-1 bg-gray-100 rounded" style={{ color: textColor, fontWeight: item.nameBold ? 'bold' : 'normal' }}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // References section
  if (sectionId === 'references' && references.length > 0) {
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.references}</h2>
        {references.map((item) => (
          <div key={item.id} className="mb-3">
            <h3 className="font-medium" style={{ fontWeight: item.nameBold ? 'bold' : 'normal' }}>{item.name}</h3>
            <p style={{ fontWeight: item.titleBold ? 'bold' : 'normal' }}>{item.title}</p>
            <p style={{ fontWeight: item.companyBold ? 'bold' : 'normal' }}>{item.company}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
          </div>
        ))}
      </div>
    );
  }

  // Skills section - in professional template it's in sidebar, so skip
  if (sectionId === 'skills' && skills.length > 0 && variant !== 'professional') {
    if (variant === 'modern') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold mb-4" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex flex-col items-center">
                <span className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: `${color}20`, color: textColor, fontWeight: skill.nameBold ? 'bold' : 'normal' }}>
                  {skill.name}
                </span>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span key={level} className={`w-1.5 h-1.5 rounded-full ${level <= skill.level ? '' : 'bg-gray-300'}`} style={{ backgroundColor: level <= skill.level ? color : undefined }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // minimal variant
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.skills}</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex flex-col items-center">
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: `${color}20`, color: textColor, fontWeight: skill.nameBold ? 'bold' : 'normal' }}>
                {skill.name}
              </span>
              <div className="flex gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <span key={level} className={`w-1.5 h-1.5 rounded-full ${level <= skill.level ? '' : 'bg-gray-300'}`} style={{ backgroundColor: level <= skill.level ? color : undefined }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Projects section
  if (sectionId === 'projects' && projects.length > 0) {
    if (variant === 'professional') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold border-b-2 border-blue-500 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.projects}</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-semibold" style={{ fontWeight: project.nameBold ? 'bold' : 'normal' }}>{project.name}</h3>
              {project.description && <p style={{ fontWeight: project.descriptionBold ? 'bold' : 'normal' }}>{project.description}</p>}
              {project.technologies && <p>{t.technologies} {project.technologies}</p>}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color }}>{t.viewLink}</a>}
            </div>
          ))}
        </div>
      );
    }
    if (variant === 'modern') {
      return (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-bold mb-4" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.projects}</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-semibold" style={{ fontWeight: project.nameBold ? 'bold' : 'normal' }}>{project.name}</h3>
              {project.description && <p style={{ fontWeight: project.descriptionBold ? 'bold' : 'normal' }}>{project.description}</p>}
              {project.technologies && <p>{project.technologies}</p>}
            </div>
          ))}
        </div>
      );
    }
    // minimal variant
    return (
      <div className="mb-6" style={{ color: textColor }}>
        <h2 className="font-medium border-b border-gray-200 pb-2 mb-3" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.projects}</h2>
        {projects.map((project) => (
          <div key={project.id} className="mb-4">
            <h3 className="font-medium" style={{ fontWeight: project.nameBold ? 'bold' : 'normal' }}>{project.name}</h3>
            {project.description && <p style={{ fontWeight: project.descriptionBold ? 'bold' : 'normal' }}>{project.description}</p>}
            {project.technologies && <p className="mt-1">{t.tech} {project.technologies}</p>}
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color }}>{t.viewProject}</a>}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// A4 page dimensions in pixels (at 96 DPI)
const A4_HEIGHT = 1123; // 297mm at 96 DPI
const A4_WIDTH = 794;   // 210mm at 96 DPI

// Page Container Component that shows A4 pages
const PageContainer = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(2); // Start with 2 pages for testing

  useEffect(() => {
    const calculatePageCount = () => {
      // Use setTimeout to ensure DOM is fully rendered and styled
      setTimeout(() => {
        if (measureRef.current) {
          const height = measureRef.current.getBoundingClientRect().height;
          console.log('Content height:', height, 'A4_HEIGHT:', A4_HEIGHT);
          const pages = Math.max(1, Math.ceil(height / A4_HEIGHT));
          setPageCount(pages);
        }
      }, 100);
    };

    // Initial calculation after mount
    calculatePageCount();
    
    // Also observe for changes
    const observer = new ResizeObserver(calculatePageCount);
    if (measureRef.current) observer.observe(measureRef.current);
    return () => observer.disconnect();
  }, []);

  // Reference to pass to parent for PDF export
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto" style={{ width: `${A4_WIDTH}px` }}>
      {/* Hidden measurement container - measures full content height without clipping */}
      <div
        ref={(node) => {
          (measureRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (ref) {
            if (typeof ref === 'function') ref(node);
            else (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className="pointer-events-none"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '210mm',
          fontSize: '11pt',
          background: 'white'
        }}
      >
        {children}
      </div>
      
      {/* Render multiple A4 pages based on content height */}
      {Array.from({ length: pageCount }).map((_, index) => (
        <div
          key={index}
          ref={index === 0 ? pageRef : undefined}
          className="bg-white mx-auto relative overflow-hidden"
          style={{
            width: '210mm',
            height: '297mm',
            maxWidth: '210mm',
            fontSize: '11pt',
            transform: 'scale(0.47)',
            transformOrigin: 'top left',
            marginBottom: index < pageCount - 1 ? '-585px' : '0'
          }}
        >
          {/* Content wrapper that translates to show different parts on each page */}
          <div
            style={{
              transform: `translateY(-${index * 297}mm)`,
              width: '210mm'
            }}
          >
            {children}
          </div>
        </div>
      ))}
    </div>
  );
});

PageContainer.displayName = 'PageContainer';

// Minimal Template
const MinimalTemplate: React.FC = () => {
  const { cvData, font, fontSize, titleSize, titleMarginTop, sectionTitleMarginTop, t, color, textColor } = useCV();
  const { personalInfo } = cvData;
  const fontFamily = FONTS.find(f => f.id === font)?.family || 'Inter, sans-serif';

  // Filter sectionOrder (personalInfo now includes summary)
  const orderedSections = cvData.sectionOrder.filter(s => s !== 'personalInfo' && s !== 'summary');

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white" style={{ fontFamily, fontSize: `${fontSize}px`, color: textColor }}>
      {/* Header */}
      <div className={`flex items-start gap-6 mb-4 ${!personalInfo.photo ? 'justify-center' : ''}`}>
        {personalInfo.photo && (
          <img 
            src={personalInfo.photo} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          />
        )}
        <div className={`flex-1 ${!personalInfo.photo ? 'text-center' : ''}`}>
          <h1 className="font-light mb-2" style={{ fontSize: `${titleSize}px`, marginTop: `${titleMarginTop}px`, color }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className={`flex flex-wrap gap-4 mb-2 ${!personalInfo.photo ? 'justify-center' : ''}`} style={{ color: textColor }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.linkedinUsername || personalInfo.github || personalInfo.githubUsername) && (
            <SocialIcons 
              linkedin={personalInfo.linkedin} 
              linkedinUsername={personalInfo.linkedinUsername}
              github={personalInfo.github}
              githubUsername={personalInfo.githubUsername}
              website={personalInfo.website}
            />
          )}
        </div>
      </div>
      
      {/* About section - full width */}
      {personalInfo.summary && (
        <div className="mb-6" style={{ color: textColor }}>
          <h2 className="font-medium border-b border-gray-200 pb-1 mb-2" style={{ fontSize: `${titleSize}px`, marginTop: `${sectionTitleMarginTop}px`, color }}>{t.about}</h2>
          <p>{personalInfo.summary}</p>
        </div>
      )}

      {/* Full width sections below */}
      <div className="w-full">
        {orderedSections.map((sectionId) => (
          <SectionRenderer key={sectionId} sectionId={sectionId} variant="minimal" />
        ))}
      </div>
    </div>
  );
};

// Preview Component
interface PreviewProps {
  onExportPDF: (event: React.MouseEvent) => void;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ onExportPDF }, ref) => {
  const { t } = useCV();
  return (
    <div className="w-full sm:w-96 bg-gray-100 border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">{t.livePreview}</h2>
        <button
          type="button"
          onClick={onExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t.exportPdf}
        </button>
      </div>

      {/* Preview Content - scrollable area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-2">
        <PageContainer ref={ref}>
          <MinimalTemplate />
        </PageContainer>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;

import React from 'react';
import { useCV } from '../context/CVContext';
import type { Education, Experience, Skill, Project, KnownLanguage } from '../types';
import MonthPicker from './MonthPicker';

// Reusable Input component
const Input: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder = '', type = 'text', rows = 1 }) => {
  const baseClasses = "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-xs sm:text-sm placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200";
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
};

// Bold Input with toggle button
const BoldInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  isBold: boolean;
  onBoldChange: (bold: boolean) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, isBold, onBoldChange, placeholder = '', rows = 1 }) => {
  const baseClasses = "flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-xs sm:text-sm placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200";
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={() => onBoldChange(!isBold)}
          className={`px-2 py-1 rounded text-sm font-bold transition-all duration-200 ${
            isBold 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          B
        </button>
      </div>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
};

// Reusable Card component for entries
const EntryCard: React.FC<{
  children: React.ReactNode;
  onRemove: () => void;
}> = ({ children, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 relative group">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {children}
    </div>
  );
};

// Personal Info Editor
const PersonalInfoEditor: React.FC = () => {
  const { cvData, updatePersonalInfo, t } = useCV();
  const { personalInfo } = cvData;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo('photo', '');
  };

  return (
    <div className="space-y-6">
      {/* Photo upload section */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block">
            <span>{t.uploadPhoto}</span>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
          {personalInfo.photo && (
            <button
              onClick={removePhoto}
              className="text-red-500 text-sm hover:text-red-600"
            >
              Remove Photo
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t.fullName}
          value={personalInfo.fullName}
          onChange={(v) => updatePersonalInfo('fullName', v)}
          placeholder={t.placeholderFullName}
        />
        <Input
          label={t.email}
          value={personalInfo.email}
          onChange={(v) => updatePersonalInfo('email', v)}
          placeholder={t.placeholderEmail}
          type="email"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t.phone}
          value={personalInfo.phone}
          onChange={(v) => updatePersonalInfo('phone', v)}
          placeholder={t.placeholderPhone}
          type="tel"
        />
        <Input
          label={t.address}
          value={personalInfo.address}
          onChange={(v) => updatePersonalInfo('address', v)}
          placeholder={t.placeholderAddress}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t.website}
          value={personalInfo.website}
          onChange={(v) => updatePersonalInfo('website', v)}
          placeholder={t.placeholderWebsite}
          type="url"
        />
        <Input
          label="LinkedIn URL"
          value={personalInfo.linkedin}
          onChange={(v) => updatePersonalInfo('linkedin', v)}
          placeholder={t.placeholderLinkedIn}
          type="url"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="LinkedIn Username"
          value={personalInfo.linkedinUsername}
          onChange={(v) => updatePersonalInfo('linkedinUsername', v)}
          placeholder={t.placeholderLinkedInUsername}
        />
        <Input
          label={t.github}
          value={personalInfo.github}
          onChange={(v) => updatePersonalInfo('github', v)}
          placeholder={t.placeholderGitHub}
          type="url"
        />
        <Input
          label="GitHub Username"
          value={personalInfo.githubUsername}
          onChange={(v) => updatePersonalInfo('githubUsername', v)}
          placeholder={t.placeholderGitHubUsername}
        />
      </div>
      <Input
        label={t.summary}
        value={personalInfo.summary}
        onChange={(v) => updatePersonalInfo('summary', v)}
        placeholder={t.placeholderSummary}
        rows={4}
      />
    </div>
  );
};

// Education Editor
const EducationEditor: React.FC = () => {
  const { cvData, addEducation, removeEducation, updateEducation, updateEducationBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.education.map((edu: Education) => (
        <EntryCard key={edu.id} onRemove={() => removeEducation(edu.id)}>
          <div className="grid grid-cols-2 gap-4">
            <BoldInput
              label={t.institution}
              value={edu.institution}
              onChange={(v) => updateEducation(edu.id, 'institution', v)}
              isBold={edu.institutionBold || false}
              onBoldChange={(bold) => updateEducationBold(edu.id, 'institution', bold)}
              placeholder={t.placeholderInstitution}
            />
            <BoldInput
              label={t.degree}
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              isBold={edu.degreeBold || false}
              onBoldChange={(bold) => updateEducationBold(edu.id, 'degree', bold)}
              placeholder={t.placeholderDegree}
            />
          </div>
          <Input
            label={t.field}
            value={edu.field}
            onChange={(v) => updateEducation(edu.id, 'field', v)}
            placeholder={t.placeholderField}
          />
          <div className="grid grid-cols-2 gap-4">
            <MonthPicker
              label={t.startDate}
              value={edu.startDate}
              onChange={(v) => updateEducation(edu.id, 'startDate', v)}
            />
            <MonthPicker
              label={t.endDate}
              value={edu.endDate}
              onChange={(v) => updateEducation(edu.id, 'endDate', v)}
              showOngoing={true}
            />
          </div>
          <Input
            label={t.description}
            value={edu.description}
            onChange={(v) => updateEducation(edu.id, 'description', v)}
            placeholder={t.placeholderEducationDescription}
            rows={3}
          />
        </EntryCard>
      ))}
      <button
        onClick={addEducation}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addEducation}
      </button>
    </div>
  );
};

// Experience Editor
const ExperienceEditor: React.FC = () => {
  const { cvData, addExperience, removeExperience, updateExperience, updateExperienceBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.experience.map((exp: Experience) => (
        <EntryCard key={exp.id} onRemove={() => removeExperience(exp.id)}>
          <div className="grid grid-cols-2 gap-4">
            <BoldInput
              label={t.company}
              value={exp.company}
              onChange={(v) => updateExperience(exp.id, 'company', v)}
              isBold={exp.companyBold || false}
              onBoldChange={(bold) => updateExperienceBold(exp.id, 'company', bold)}
              placeholder={t.placeholderCompany}
            />
            <BoldInput
              label={t.position}
              value={exp.position}
              onChange={(v) => updateExperience(exp.id, 'position', v)}
              isBold={exp.positionBold || false}
              onBoldChange={(bold) => updateExperienceBold(exp.id, 'position', bold)}
              placeholder={t.placeholderPosition}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MonthPicker
              label={t.startDate}
              value={exp.startDate}
              onChange={(v) => updateExperience(exp.id, 'startDate', v)}
            />
            <MonthPicker
              label={t.endDate}
              value={exp.endDate}
              onChange={(v) => updateExperience(exp.id, 'endDate', v)}
              placeholder={t.placeholderPresent}
              showOngoing={true}
            />
          </div>
          <Input
            label={t.description}
            value={exp.description}
            onChange={(v) => updateExperience(exp.id, 'description', v)}
            placeholder={t.placeholderExperienceDescription}
            rows={4}
          />
        </EntryCard>
      ))}
      <button
        onClick={addExperience}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addExperience}
      </button>
    </div>
  );
};

// Skills Editor
const SkillsEditor: React.FC = () => {
  const { cvData, addSkill, removeSkill, updateSkill, updateSkillBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.skills.map((skill: Skill) => (
        <EntryCard key={skill.id} onRemove={() => removeSkill(skill.id)}>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <BoldInput
                label={t.skillName}
                value={skill.name}
                onChange={(v) => updateSkill(skill.id, 'name', v)}
                isBold={skill.nameBold || false}
                onBoldChange={(bold) => updateSkillBold(skill.id, bold)}
                placeholder={t.placeholderSkillName}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.level}</label>
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              >
                <option value={1}>{t.beginner}</option>
                <option value={2}>{t.elementary}</option>
                <option value={3}>{t.intermediate}</option>
                <option value={4}>{t.advanced}</option>
                <option value={5}>{t.expert}</option>
              </select>
            </div>
          </div>
        </EntryCard>
      ))}
      <button
        onClick={addSkill}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addSkill}
      </button>
    </div>
  );
};

// Projects Editor
const ProjectsEditor: React.FC = () => {
  const { cvData, addProject, removeProject, updateProject, updateProjectBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.projects.map((project: Project) => (
        <EntryCard key={project.id} onRemove={() => removeProject(project.id)}>
          <BoldInput
            label={t.projectName}
            value={project.name}
            onChange={(v) => updateProject(project.id, 'name', v)}
            isBold={project.nameBold || false}
            onBoldChange={(bold) => updateProjectBold(project.id, 'name', bold)}
            placeholder={t.placeholderProjectName}
          />
          <Input
            label={t.description}
            value={project.description}
            onChange={(v) => updateProject(project.id, 'description', v)}
            placeholder={t.placeholderProjectDescription}
            rows={3}
          />
          <Input
            label={t.technologies}
            value={project.technologies}
            onChange={(v) => updateProject(project.id, 'technologies', v)}
            placeholder={t.placeholderTechnologies}
          />
          <Input
            label={t.link}
            value={project.link}
            onChange={(v) => updateProject(project.id, 'link', v)}
            placeholder={t.placeholderProjectLink}
            type="url"
          />
        </EntryCard>
      ))}
      <button
        onClick={addProject}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addProject}
      </button>
    </div>
  );
};

// Languages Editor
const LanguagesEditor: React.FC = () => {
  const { cvData, addLanguage, removeLanguage, updateLanguage, updateLanguageBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.languages.map((language: KnownLanguage) => (
        <EntryCard key={language.id} onRemove={() => removeLanguage(language.id)}>
          <div className="grid grid-cols-2 gap-4">
            <BoldInput
              label={t.languageName}
              value={language.language}
              onChange={(v) => updateLanguage(language.id, 'language', v)}
              isBold={language.languageBold || false}
              onBoldChange={(bold) => updateLanguageBold(language.id, bold)}
              placeholder={t.placeholderLanguageName}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.proficiency}</label>
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              >
                <option value="native">{t.langNative}</option>
                <option value="fluent">{t.langFluent}</option>
                <option value="advanced">{t.langAdvanced}</option>
                <option value="intermediate">{t.langIntermediate}</option>
                <option value="basic">{t.langBasic}</option>
              </select>
            </div>
          </div>
        </EntryCard>
      ))}
      <button
        onClick={addLanguage}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addLanguage}
      </button>
    </div>
  );
};

// Voluntary Work Editor
const VoluntaryWorkEditor: React.FC = () => {
  const { cvData, addVoluntaryWork, removeVoluntaryWork, updateVoluntaryWork, updateVoluntaryWorkBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.voluntaryWork.map((vol) => (
        <EntryCard key={vol.id} onRemove={() => removeVoluntaryWork(vol.id)}>
          <BoldInput
            label={t.organization}
            value={vol.organization}
            onChange={(v) => updateVoluntaryWork(vol.id, 'organization', v)}
            isBold={vol.organizationBold || false}
            onBoldChange={(bold) => updateVoluntaryWorkBold(vol.id, 'organization', bold)}
            placeholder={t.placeholderOrganization}
          />
          <BoldInput
            label={t.role}
            value={vol.role}
            onChange={(v) => updateVoluntaryWork(vol.id, 'role', v)}
            isBold={vol.roleBold || false}
            onBoldChange={(bold) => updateVoluntaryWorkBold(vol.id, 'role', bold)}
            placeholder={t.placeholderRole}
          />
          <div className="grid grid-cols-2 gap-4">
            <MonthPicker
              label={t.startDate}
              value={vol.startDate}
              onChange={(v) => updateVoluntaryWork(vol.id, 'startDate', v)}
            />
            <MonthPicker
              label={t.endDate}
              value={vol.endDate}
              onChange={(v) => updateVoluntaryWork(vol.id, 'endDate', v)}
              showOngoing={true}
            />
          </div>
          <Input
            label="Description"
            value={vol.description}
            onChange={(v) => updateVoluntaryWork(vol.id, 'description', v)}
            placeholder={t.placeholderVoluntaryWorkDescription}
            rows={3}
          />
        </EntryCard>
      ))}
      <button
        onClick={addVoluntaryWork}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Voluntary Work
      </button>
    </div>
  );
};

// Conferences Editor
const ConferencesEditor: React.FC = () => {
  const { cvData, addConference, removeConference, updateConference, updateConferenceBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.conferences.map((conf) => (
        <EntryCard key={conf.id} onRemove={() => removeConference(conf.id)}>
          <BoldInput
            label={t.conferences}
            value={conf.name}
            onChange={(v) => updateConference(conf.id, 'name', v)}
            isBold={conf.nameBold || false}
            onBoldChange={(bold) => updateConferenceBold(conf.id, bold)}
            placeholder={t.placeholderConferenceName}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.location}
              value={conf.location}
              onChange={(v) => updateConference(conf.id, 'location', v)}
              placeholder={t.placeholderConferenceLocation}
            />
            <MonthPicker
              label={t.date}
              value={conf.date}
              onChange={(v) => updateConference(conf.id, 'date', v)}
            />
          </div>
          <Input
            label="Description"
            value={conf.description}
            onChange={(v) => updateConference(conf.id, 'description', v)}
            placeholder={t.placeholderConferenceDescription}
            rows={3}
          />
        </EntryCard>
      ))}
      <button
        onClick={addConference}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Conference
      </button>
    </div>
  );
};

// Certifications Editor
const CertificationsEditor: React.FC = () => {
  const { cvData, addCertification, removeCertification, updateCertification, updateCertificationBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.certifications.map((cert) => (
        <EntryCard key={cert.id} onRemove={() => removeCertification(cert.id)}>
          <BoldInput
            label={t.certifications}
            value={cert.name}
            onChange={(v) => updateCertification(cert.id, 'name', v)}
            isBold={cert.nameBold || false}
            onBoldChange={(bold) => updateCertificationBold(cert.id, bold)}
            placeholder={t.placeholderCertificationName}
          />
          <Input
            label={t.issuer}
            value={cert.issuer}
            onChange={(v) => updateCertification(cert.id, 'issuer', v)}
            placeholder={t.placeholderIssuer}
          />
          <div className="grid grid-cols-2 gap-4">
            <MonthPicker
              label={t.date}
              value={cert.date}
              onChange={(v) => updateCertification(cert.id, 'date', v)}
            />
            <MonthPicker
              label={t.expires}
              value={cert.expires}
              onChange={(v) => updateCertification(cert.id, 'expires', v)}
            />
          </div>
        </EntryCard>
      ))}
      <button
        onClick={addCertification}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Certification
      </button>
    </div>
  );
};

// Achievements Editor
const AchievementsEditor: React.FC = () => {
  const { cvData, addAchievement, removeAchievement, updateAchievement, updateAchievementBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.achievements.map((achievement) => (
        <EntryCard key={achievement.id} onRemove={() => removeAchievement(achievement.id)}>
          <BoldInput
            label={t.projectName || 'Title'}
            value={achievement.title}
            onChange={(v) => updateAchievement(achievement.id, 'title', v)}
            isBold={achievement.titleBold || false}
            onBoldChange={(bold) => updateAchievementBold(achievement.id, bold)}
            placeholder={t.placeholderAchievementTitle}
          />
          <Input
            label={t.date}
            value={achievement.date}
            onChange={(v) => updateAchievement(achievement.id, 'date', v)}
            placeholder={t.placeholderDate}
          />
          <Input
            label={t.description}
            value={achievement.description}
            onChange={(v) => updateAchievement(achievement.id, 'description', v)}
            placeholder={t.placeholderAchievementDescription}
            rows={3}
          />
        </EntryCard>
      ))}
      <button
        onClick={addAchievement}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addProject ? t.addProject.replace('Project', 'Achievement') : 'Add Achievement'}
      </button>
    </div>
  );
};

// Publications Editor
const PublicationsEditor: React.FC = () => {
  const { cvData, addPublication, removePublication, updatePublication, updatePublicationBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.publications.map((pub) => (
        <EntryCard key={pub.id} onRemove={() => removePublication(pub.id)}>
          <BoldInput
            label={t.projectName || 'Title'}
            value={pub.title}
            onChange={(v) => updatePublication(pub.id, 'title', v)}
            isBold={pub.titleBold || false}
            onBoldChange={(bold) => updatePublicationBold(pub.id, bold)}
            placeholder={t.placeholderPublicationTitle}
          />
          <Input
            label={t.publisher}
            value={pub.publisher}
            onChange={(v) => updatePublication(pub.id, 'publisher', v)}
            placeholder={t.placeholderPublisher}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.date}
              value={pub.date}
              onChange={(v) => updatePublication(pub.id, 'date', v)}
              placeholder={t.placeholderDate}
            />
            <Input
              label={t.link || 'URL'}
              value={pub.url}
              onChange={(v) => updatePublication(pub.id, 'url', v)}
              placeholder={t.placeholderUrl}
            />
          </div>
          <Input
            label={t.description}
            value={pub.description}
            onChange={(v) => updatePublication(pub.id, 'description', v)}
            placeholder={t.placeholderPublicationDescription}
            rows={3}
          />
        </EntryCard>
      ))}
      <button
        onClick={addPublication}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addProject ? t.addProject.replace('Project', 'Publication') : 'Add Publication'}
      </button>
    </div>
  );
};

// Interests Editor
const InterestsEditor: React.FC = () => {
  const { cvData, addInterest, removeInterest, updateInterest, updateInterestBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.interests.map((interest) => (
        <EntryCard key={interest.id} onRemove={() => removeInterest(interest.id)}>
          <BoldInput
            label={t.skillName || 'Interest'}
            value={interest.name}
            onChange={(v) => updateInterest(interest.id, 'name', v)}
            isBold={interest.nameBold || false}
            onBoldChange={(bold) => updateInterestBold(interest.id, bold)}
            placeholder={t.placeholderInterest}
          />
        </EntryCard>
      ))}
      <button
        onClick={addInterest}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addSkill ? t.addSkill.replace('Skill', 'Interest') : 'Add Interest'}
      </button>
    </div>
  );
};

// References Editor
const ReferencesEditor: React.FC = () => {
  const { cvData, addReference, removeReference, updateReference, updateReferenceBold, t } = useCV();

  return (
    <div className="space-y-6">
      {cvData.references.map((ref) => (
        <EntryCard key={ref.id} onRemove={() => removeReference(ref.id)}>
          <BoldInput
            label={t.fullName || 'Name'}
            value={ref.name}
            onChange={(v) => updateReference(ref.id, 'name', v)}
            isBold={ref.nameBold || false}
            onBoldChange={(bold) => updateReferenceBold(ref.id, 'name', bold)}
            placeholder={t.placeholderReferenceName}
          />
          <BoldInput
            label={t.title}
            value={ref.title}
            onChange={(v) => updateReference(ref.id, 'title', v)}
            isBold={ref.titleBold || false}
            onBoldChange={(bold) => updateReferenceBold(ref.id, 'title', bold)}
            placeholder={t.placeholderReferenceTitle}
          />
          <Input
            label={t.company}
            value={ref.company}
            onChange={(v) => updateReference(ref.id, 'company', v)}
            placeholder={t.placeholderReferenceCompany}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.email}
              value={ref.email}
              onChange={(v) => updateReference(ref.id, 'email', v)}
              placeholder={t.placeholderReferenceEmail}
              type="email"
            />
            <Input
              label={t.phone}
              value={ref.phone}
              onChange={(v) => updateReference(ref.id, 'phone', v)}
              placeholder={t.placeholderReferencePhone}
              type="tel"
            />
          </div>
          <Input
            label={t.relationship}
            value={ref.relationship}
            onChange={(v) => updateReference(ref.id, 'relationship', v)}
            placeholder={t.placeholderRelationship}
          />
        </EntryCard>
      ))}
      <button
        onClick={addReference}
        className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t.addProject ? t.addProject.replace('Project', 'Reference') : 'Add Reference'}
      </button>
    </div>
  );
};

// Main Editor Component
const Editor: React.FC = () => {
  const { activeSection, t } = useCV();

  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoEditor />;
      case 'education':
        return <EducationEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'voluntaryWork':
        return <VoluntaryWorkEditor />;
      case 'conferences':
        return <ConferencesEditor />;
      case 'certifications':
        return <CertificationsEditor />;
      case 'achievements':
        return <AchievementsEditor />;
      case 'publications':
        return <PublicationsEditor />;
      case 'interests':
        return <InterestsEditor />;
      case 'references':
        return <ReferencesEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'languages':
        return <LanguagesEditor />;
      default:
        return <PersonalInfoEditor />;
    }
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t[activeSection as keyof typeof t] || 'Edit'}
        </h2>
        {renderSection()}
      </div>
    </div>
  );
};

export default Editor;
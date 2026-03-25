import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CVData, TemplateType, Language, FontType } from '../types';
import { DEFAULT_CV_DATA, TRANSLATIONS } from '../types';
import type { Translations } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface CVContextType {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
  font: FontType;
  setFont: (font: FontType) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  titleSize: number;
  setTitleSize: (titleSize: number) => void;
  color: string;
  setColor: (color: string) => void;
  textColor: string;
  setTextColor: (textColor: string) => void;
  titleMarginTop: number;
  setTitleMarginTop: (titleMarginTop: number) => void;
  sectionTitleMarginTop: number;
  setSectionTitleMarginTop: (sectionTitleMarginTop: number) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, field: string, value: string) => void;
  updateEducationBold: (id: string, field: string, bold: boolean) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, field: string, value: string) => void;
  updateExperienceBold: (id: string, field: string, bold: boolean) => void;
  addSkill: () => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, field: string, value: string | number) => void;
  updateSkillBold: (id: string, bold: boolean) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, field: string, value: string) => void;
  updateProjectBold: (id: string, field: string, bold: boolean) => void;
  addLanguage: () => void;
  removeLanguage: (id: string) => void;
  updateLanguage: (id: string, field: string, value: string) => void;
  updateLanguageBold: (id: string, bold: boolean) => void;
  addVoluntaryWork: () => void;
  removeVoluntaryWork: (id: string) => void;
  updateVoluntaryWork: (id: string, field: string, value: string) => void;
  updateVoluntaryWorkBold: (id: string, field: string, bold: boolean) => void;
  addConference: () => void;
  removeConference: (id: string) => void;
  updateConference: (id: string, field: string, value: string) => void;
  updateConferenceBold: (id: string, bold: boolean) => void;
  addCertification: () => void;
  removeCertification: (id: string) => void;
  updateCertification: (id: string, field: string, value: string) => void;
  updateCertificationBold: (id: string, bold: boolean) => void;
  addAchievement: () => void;
  removeAchievement: (id: string) => void;
  updateAchievement: (id: string, field: string, value: string) => void;
  updateAchievementBold: (id: string, bold: boolean) => void;
  addPublication: () => void;
  removePublication: (id: string) => void;
  updatePublication: (id: string, field: string, value: string) => void;
  updatePublicationBold: (id: string, bold: boolean) => void;
  addInterest: () => void;
  removeInterest: (id: string) => void;
  updateInterest: (id: string, field: string, value: string) => void;
  updateInterestBold: (id: string, bold: boolean) => void;
  addReference: () => void;
  removeReference: (id: string) => void;
  updateReference: (id: string, field: string, value: string) => void;
  updateReferenceBold: (id: string, field: string, bold: boolean) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  reorderSections: (newOrder: string[]) => void;
  resetCV: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

// Custom hook to use the CV context
// eslint-disable-next-line react-refresh/only-export-components
export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};

interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  // Initialize from localStorage or use default
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cvData');
    const defaultSectionOrder = DEFAULT_CV_DATA.sectionOrder;
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all data fields exist with defaults
      if (!parsed.voluntaryWork) parsed.voluntaryWork = [];
      if (!parsed.conferences) parsed.conferences = [];
      if (!parsed.certifications) parsed.certifications = [];
      if (!parsed.achievements) parsed.achievements = [];
      if (!parsed.publications) parsed.publications = [];
      if (!parsed.interests) parsed.interests = [];
      if (!parsed.references) parsed.references = [];
      if (!parsed.personalInfo) parsed.personalInfo = { ...DEFAULT_CV_DATA.personalInfo };
      // Migrate summary from separate field to personalInfo
      if (parsed.summary && parsed.summary.length > 0) {
        parsed.personalInfo.summary = parsed.summary;
        delete parsed.summary;
      }
      if (!parsed.personalInfo.summary) parsed.personalInfo.summary = '';
      if (!parsed.education) parsed.education = [];
      if (!parsed.experience) parsed.experience = [];
      if (!parsed.skills) parsed.skills = [];
      if (!parsed.projects) parsed.projects = [];
      if (!parsed.languages) parsed.languages = [];
      // Ensure all sections are in the sectionOrder
      let currentOrder = parsed.sectionOrder || [];
      // Replace 'summary' with 'personalInfo' if it exists
      currentOrder = currentOrder.map((s: string) => s === 'summary' ? 'personalInfo' : s);
      // Remove duplicates (e.g., if both 'summary' and 'personalInfo' existed)
      currentOrder = [...new Set(currentOrder)];
      const allSections = defaultSectionOrder;
      // Add any missing sections
      const missingSections = allSections.filter((s: string) => !currentOrder.includes(s));
      if (missingSections.length > 0) {
        parsed.sectionOrder = [...currentOrder, ...missingSections];
      } else {
        parsed.sectionOrder = currentOrder;
      }
      return parsed;
    }
    return DEFAULT_CV_DATA;
  });

  const [template, setTemplate] = useState<TemplateType>(() => {
    return (localStorage.getItem('cvTemplate') as TemplateType) || 'minimal';
  });

  const [activeSection, setActiveSection] = useState('personalInfo');

  const [font, setFont] = useState<FontType>(() => {
    return (localStorage.getItem('cvFont') as FontType) || 'roboto';
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('cvFontSize');
    return saved ? parseFloat(saved) : 12;
  });

  const [titleSize, setTitleSize] = useState<number>(() => {
    const saved = localStorage.getItem('cvTitleSize');
    return saved ? parseFloat(saved) : 18;
  });

  const [color, setColor] = useState<string>(() => {
    const saved = localStorage.getItem('cvColor');
    return saved || '#1f2937'; // default gray-800
  });

  const [textColor, setTextColor] = useState<string>(() => {
    const saved = localStorage.getItem('cvTextColor');
    return saved || '#374151'; // default gray-700
  });

  const [titleMarginTop, setTitleMarginTop] = useState<number>(() => {
    const saved = localStorage.getItem('cvTitleMarginTop');
    return saved ? parseFloat(saved) : 16;
  });

  const [sectionTitleMarginTop, setSectionTitleMarginTop] = useState<number>(() => {
    const saved = localStorage.getItem('cvSectionTitleMarginTop');
    return saved ? parseFloat(saved) : 8;
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('cvLanguage') as Language) || 'en';
  });

  // Get translations for current language
  const t = TRANSLATIONS[language];

  // Auto-save to localStorage whenever cvData changes
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem('cvTemplate', template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem('cvLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('cvFont', font);
  }, [font]);

  useEffect(() => {
    localStorage.setItem('cvFontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('cvTitleSize', titleSize.toString());
  }, [titleSize]);

  useEffect(() => {
    localStorage.setItem('cvColor', color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem('cvTextColor', textColor);
  }, [textColor]);

  useEffect(() => {
    localStorage.setItem('cvTitleMarginTop', titleMarginTop.toString());
  }, [titleMarginTop]);

  useEffect(() => {
    localStorage.setItem('cvSectionTitleMarginTop', sectionTitleMarginTop.toString());
  }, [sectionTitleMarginTop]);

  // Update personal info field
  const updatePersonalInfo = (field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Education functions
  const addEducation = () => {
    setCVData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uuidv4(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const updateEducationBold = (id: string, field: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [`${field}Bold`]: bold } : edu
      ),
    }));
  };

  // Experience functions
  const addExperience = () => {
    setCVData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: uuidv4(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const updateExperienceBold = (id: string, field: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [`${field}Bold`]: bold } : exp
      ),
    }));
  };

  // Skill functions
  const addSkill = () => {
    setCVData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: uuidv4(),
          name: '',
          level: 3,
        },
      ],
    }));
  };

  const removeSkill = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const updateSkill = (id: string, field: string, value: string | number) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const updateSkillBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, nameBold: bold } : skill
      ),
    }));
  };

  // Language functions (known languages - e.g., English, Greek)
  const addLanguage = () => {
    setCVData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: uuidv4(),
          language: '',
          proficiency: '',
        },
      ],
    }));
  };

  const removeLanguage = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const updateLanguageBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, languageBold: bold } : lang
      ),
    }));
  };

  // Voluntary Work functions
  const addVoluntaryWork = () => {
    setCVData((prev) => ({
      ...prev,
      voluntaryWork: [
        ...prev.voluntaryWork,
        {
          id: uuidv4(),
          organization: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const removeVoluntaryWork = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      voluntaryWork: prev.voluntaryWork.filter((v) => v.id !== id),
    }));
  };

  const updateVoluntaryWork = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      voluntaryWork: prev.voluntaryWork.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      ),
    }));
  };

  const updateVoluntaryWorkBold = (id: string, field: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      voluntaryWork: prev.voluntaryWork.map((v) =>
        v.id === id ? { ...v, [`${field}Bold`]: bold } : v
      ),
    }));
  };

  // Conference functions
  const addConference = () => {
    setCVData((prev) => ({
      ...prev,
      conferences: [
        ...prev.conferences,
        {
          id: uuidv4(),
          name: '',
          location: '',
          date: '',
          description: '',
        },
      ],
    }));
  };

  const removeConference = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      conferences: prev.conferences.filter((c) => c.id !== id),
    }));
  };

  const updateConference = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      conferences: prev.conferences.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const updateConferenceBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      conferences: prev.conferences.map((c) =>
        c.id === id ? { ...c, nameBold: bold } : c
      ),
    }));
  };

  // Certification functions
  const addCertification = () => {
    setCVData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: uuidv4(),
          name: '',
          issuer: '',
          date: '',
          expires: '',
        },
      ],
    }));
  };

  const removeCertification = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const updateCertificationBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, nameBold: bold } : c
      ),
    }));
  };

  // Achievements functions
  const addAchievement = () => {
    setCVData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { id: uuidv4(), title: '', date: '', description: '' },
      ],
    }));
  };

  const removeAchievement = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    }));
  };

  const updateAchievementBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, titleBold: bold } : a
      ),
    }));
  };

  // Publications functions
  const addPublication = () => {
    setCVData((prev) => ({
      ...prev,
      publications: [
        ...prev.publications,
        { id: uuidv4(), title: '', publisher: '', date: '', url: '', description: '' },
      ],
    }));
  };

  const removePublication = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      publications: prev.publications.filter((p) => p.id !== id),
    }));
  };

  const updatePublication = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const updatePublicationBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      publications: prev.publications.map((p) =>
        p.id === id ? { ...p, titleBold: bold } : p
      ),
    }));
  };

  // Interests functions
  const addInterest = () => {
    setCVData((prev) => ({
      ...prev,
      interests: [
        ...prev.interests,
        { id: uuidv4(), name: '' },
      ],
    }));
  };

  const removeInterest = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i.id !== id),
    }));
  };

  const updateInterest = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      interests: prev.interests.map((i) =>
        i.id === id ? { ...i, [field]: value } : i
      ),
    }));
  };

  const updateInterestBold = (id: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      interests: prev.interests.map((i) =>
        i.id === id ? { ...i, nameBold: bold } : i
      ),
    }));
  };

  // References functions
  const addReference = () => {
    setCVData((prev) => ({
      ...prev,
      references: [
        ...prev.references,
        { id: uuidv4(), name: '', title: '', company: '', email: '', phone: '', relationship: '' },
      ],
    }));
  };

  const removeReference = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      references: prev.references.filter((r) => r.id !== id),
    }));
  };

  const updateReference = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      references: prev.references.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      ),
    }));
  };

  const updateReferenceBold = (id: string, field: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      references: prev.references.map((r) =>
        r.id === id ? { ...r, [`${field}Bold`]: bold } : r
      ),
    }));
  };

  const addProject = () => {
    setCVData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: uuidv4(),
          name: '',
          description: '',
          technologies: '',
          link: '',
        },
      ],
    }));
  };

  const removeProject = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    }));
  };

  const updateProjectBold = (id: string, field: string, bold: boolean) => {
    setCVData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [`${field}Bold`]: bold } : project
      ),
    }));
  };

  // Reorder sections
  const reorderSections = (newOrder: string[]) => {
    setCVData((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  // Reset CV to default
  const resetCV = () => {
    setCVData(DEFAULT_CV_DATA);
    setTemplate('minimal');
    setFont('inter');
    setFontSize(12);
    setTitleSize(18);
    setColor('#1f2937');
    setTextColor('#374151');
  };

  const value: CVContextType = {
    cvData,
    setCVData,
    template,
    setTemplate,
    font,
    setFont,
    fontSize,
    setFontSize,
    titleSize,
    setTitleSize,
    color,
    setColor,
    textColor,
    setTextColor,
    titleMarginTop,
    setTitleMarginTop,
    sectionTitleMarginTop,
    setSectionTitleMarginTop,
    activeSection,
    setActiveSection,
    language,
    setLanguage,
    t,
    addEducation,
    removeEducation,
    updateEducation,
    updateEducationBold,
    addExperience,
    removeExperience,
    updateExperience,
    updateExperienceBold,
    addSkill,
    removeSkill,
    updateSkill,
    updateSkillBold,
    addProject,
    removeProject,
    updateProject,
    updateProjectBold,
    addLanguage,
    removeLanguage,
    updateLanguage,
    updateLanguageBold,
    addVoluntaryWork,
    removeVoluntaryWork,
    updateVoluntaryWork,
    updateVoluntaryWorkBold,
    addConference,
    removeConference,
    updateConference,
    updateConferenceBold,
    addCertification,
    removeCertification,
    updateCertification,
    updateCertificationBold,
    addAchievement,
    removeAchievement,
    updateAchievement,
    updateAchievementBold,
    addPublication,
    removePublication,
    updatePublication,
    updatePublicationBold,
    addInterest,
    removeInterest,
    updateInterest,
    updateInterestBold,
    addReference,
    removeReference,
    updateReference,
    updateReferenceBold,
    updatePersonalInfo,
    reorderSections,
    resetCV,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};
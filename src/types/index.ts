// CV Types and Interfaces

export type Language = 'en' | 'el' | 'es' | 'fr' | 'de';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  linkedinUsername: string;
  github: string;
  githubUsername: string;
  summary: string;
  photo: string;
}

export interface Education {
  id: string;
  institution: string;
  institutionBold?: boolean;
  degree: string;
  degreeBold?: boolean;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  companyBold?: boolean;
  position: string;
  positionBold?: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  nameBold?: boolean;
  level: number; // 1-5
}

export interface VoluntaryWork {
  id: string;
  organization: string;
  organizationBold?: boolean;
  role: string;
  roleBold?: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Conference {
  id: string;
  name: string;
  nameBold?: boolean;
  location: string;
  locationBold?: boolean;
  date: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  nameBold?: boolean;
  issuer: string;
  issuerBold?: boolean;
  date: string;
  expires: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleBold?: boolean;
  date: string;
  description: string;
  descriptionBold?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  titleBold?: boolean;
  publisher: string;
  publisherBold?: boolean;
  date: string;
  url: string;
  description: string;
}

export interface Interest {
  id: string;
  name: string;
  nameBold?: boolean;
}

export interface Reference {
  id: string;
  name: string;
  nameBold?: boolean;
  title: string;
  titleBold?: boolean;
  company: string;
  companyBold?: boolean;
  email: string;
  phone: string;
  relationship: string;
}

export interface Project {
  id: string;
  name: string;
  nameBold?: boolean;
  description: string;
  descriptionBold?: boolean;
  technologies: string;
  link: string;
}

// Interface for known languages (e.g., English, Greek, etc.)
export interface KnownLanguage {
  id: string;
  language: string;  // e.g., "English", "Greek"
  languageBold?: boolean;
  proficiency: string;  // e.g., "Native", "Fluent", "Intermediate"
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  languages: KnownLanguage[];
  voluntaryWork: VoluntaryWork[];
  conferences: Conference[];
  certifications: Certification[];
  achievements: Achievement[];
  publications: Publication[];
  interests: Interest[];
  references: Reference[];
  sectionOrder: string[];
}

export type SectionType = 'personalInfo' | 'education' | 'experience' | 'skills' | 'projects' | 'languages' | 'voluntaryWork' | 'conferences' | 'certifications' | 'achievements' | 'publications' | 'interests' | 'references';

export interface Section {
  id: SectionType;
  title: string;
  icon: string;
}

export type TemplateType = 'minimal' | 'modern' | 'professional';

export type FontType = 'inter' | 'roboto' | 'playfair' | 'montserrat' | 'source-sans' | 'merriweather' | 'lato' | 'open-sans' | 'poppins' | 'raleway' | 'oswald' | 'dancing-script' | 'crimson' | 'libre-baskerville' | 'archivo' | 'nunito';

export interface FontOption {
  id: FontType;
  name: string;
  family: string;
}

export const FONTS: FontOption[] = [
  { id: 'inter', name: 'Inter', family: 'Inter, sans-serif' },
  { id: 'roboto', name: 'Roboto', family: 'Roboto, sans-serif' },
  { id: 'playfair', name: 'Playfair Display', family: 'Playfair Display, serif' },
  { id: 'montserrat', name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { id: 'source-sans', name: 'Source Sans 3', family: 'Source Sans 3, sans-serif' },
  { id: 'merriweather', name: 'Merriweather', family: 'Merriweather, serif' },
  { id: 'lato', name: 'Lato', family: 'Lato, sans-serif' },
  { id: 'open-sans', name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { id: 'poppins', name: 'Poppins', family: 'Poppins, sans-serif' },
  { id: 'raleway', name: 'Raleway', family: 'Raleway, sans-serif' },
  { id: 'oswald', name: 'Oswald', family: 'Oswald, sans-serif' },
  { id: 'dancing-script', name: 'Dancing Script', family: 'Dancing Script, cursive' },
  { id: 'crimson', name: 'Crimson Text', family: 'Crimson Text, serif' },
  { id: 'libre-baskerville', name: 'Libre Baskerville', family: 'Libre Baskerville, serif' },
  { id: 'archivo', name: 'Archivo', family: 'Archivo, sans-serif' },
  { id: 'nunito', name: 'Nunito', family: 'Nunito, sans-serif' },
];

export const DEFAULT_CV_DATA: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    linkedinUsername: '',
    github: '',
    githubUsername: '',
    summary: '',
    photo: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  languages: [],  // New: empty by default
  voluntaryWork: [],
  conferences: [],
  certifications: [],
  achievements: [],
  publications: [],
  interests: [],
  references: [],
  sectionOrder: ['personalInfo', 'education', 'experience', 'voluntaryWork', 'conferences', 'certifications', 'achievements', 'publications', 'interests', 'references', 'skills', 'projects', 'languages'],
};

export const SECTIONS: Section[] = [
  { id: 'personalInfo', title: 'Personal Info', icon: '👤' },
  { id: 'education', title: 'Education', icon: '🎓' },
  { id: 'experience', title: 'Experience', icon: '💼' },
  { id: 'voluntaryWork', title: 'Volunteering', icon: '🤝' },
  { id: 'conferences', title: 'Conferences', icon: '🎤' },
  { id: 'certifications', title: 'Certifications', icon: '🏆' },
  { id: 'achievements', title: 'Achievements', icon: '🏅' },
  { id: 'publications', title: 'Publications', icon: '📚' },
  { id: 'interests', title: 'Interests', icon: '🎨' },
  { id: 'references', title: 'References', icon: '📞' },
  { id: 'skills', title: 'Skills', icon: '⚡' },
  { id: 'projects', title: 'Projects', icon: '🚀' },
  { id: 'languages', title: 'Languages', icon: '🌐' },
];

// Translations for UI labels
export interface Translations {
  personalInfo: string;
  summary: string;
  education: string;
  experience: string;
  skills: string;
  projects: string;
  languages: string;
  voluntaryWork: string;
  conferences: string;
  certifications: string;
  achievements: string;
  publications: string;
  interests: string;
  references: string;
  fullName: string;
  date: string;
  exportPdf: string;
  link: string;
  organization: string;
  role: string;
  location: string;
  issuer: string;
  expires: string;
  publisher: string;
  title: string;
  company: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  startDate: string;
  endDate: string;
  ongoing: string;
  titleMarginTop: string;
  createCV: string;
  font: string;
  fontTitleSize: string;
  language: string;
  sectionTitleMargin: string;
  linkedin: string;
  github: string;
  institution: string;
  degree: string;
  field: string;
  description: string;
  position: string;
  skillName: string;
  level: string;
  projectName: string;
  technologies: string;
  addEducation: string;
  addExperience: string;
  addSkill: string;
  addProject: string;
  addLanguage: string;  // New: Add Language
  about: string;
  uploadPhoto: string;
  // Skill levels
  beginner: string;
  elementary: string;
  intermediate: string;
  advanced: string;
  expert: string;
  // Language proficiency
  languageName: string;
  proficiency: string;
  langNative: string;
  langFluent: string;
  langAdvanced: string;
  langIntermediate: string;
  langBasic: string;
  // Placeholders
  placeholderFullName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderAddress: string;
  placeholderWebsite: string;
  placeholderLinkedIn: string;
  placeholderLinkedInUsername: string;
  placeholderGitHub: string;
  placeholderGitHubUsername: string;
  placeholderSummary: string;
  placeholderInstitution: string;
  placeholderDegree: string;
  placeholderField: string;
  placeholderEducationDescription: string;
  placeholderCompany: string;
  placeholderPosition: string;
  placeholderExperienceDescription: string;
  placeholderSkillName: string;
  placeholderProjectName: string;
  placeholderProjectDescription: string;
  placeholderTechnologies: string;
  placeholderProjectLink: string;
  placeholderLanguageName: string;
  placeholderOrganization: string;
  placeholderRole: string;
  placeholderVoluntaryWorkDescription: string;
  placeholderConferenceName: string;
  placeholderConferenceLocation: string;
  placeholderConferenceDescription: string;
  placeholderCertificationName: string;
  placeholderIssuer: string;
  placeholderAchievementTitle: string;
  placeholderAchievementDescription: string;
  placeholderPublicationTitle: string;
  placeholderPublisher: string;
  placeholderUrl: string;
  placeholderPublicationDescription: string;
  placeholderInterest: string;
  placeholderReferenceName: string;
  placeholderReferenceTitle: string;
  placeholderReferenceCompany: string;
  placeholderReferenceEmail: string;
  placeholderReferencePhone: string;
  placeholderRelationship: string;
  placeholderPresent: string;
  placeholderDate: string;
  viewProject: string;
  tech: string;
  viewLink: string;
  livePreview: string;
  settings: string;
  edit: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    personalInfo: 'Personal Information',
    summary: 'Profile',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    languages: 'Languages',
    voluntaryWork: 'Volunteering',
    conferences: 'Conferences',
    certifications: 'Certifications',
    achievements: 'Achievements',
    publications: 'Publications',
    interests: 'Interests',
    references: 'References',
    fullName: 'Full Name',
    date: 'Date',
    exportPdf: 'Export PDF',
    link: 'Link',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    institution: 'Institution',
    degree: 'Degree',
    field: 'Field of Study',
    startDate: 'Start Date',
    endDate: 'End Date',
    ongoing: 'Ongoing',
    titleMarginTop: 'Title Margin Top',
    createCV: 'Create your professional resume',
    font: 'Font',
    fontTitleSize: 'Font / Title Size',
    language: 'Language',
    sectionTitleMargin: 'Section Title Margin',
    description: 'Description',
    company: 'Company',
    position: 'Position',
    skillName: 'Skill Name',
    level: 'Level',
    projectName: 'Project Name',
    technologies: 'Technologies',
    addEducation: 'Add Education',
    addExperience: 'Add Experience',
    addSkill: 'Add Skill',
    addProject: 'Add Project',
    addLanguage: 'Add Language',
    about: 'About',
    uploadPhoto: 'Upload Photo',
    beginner: 'Beginner',
    elementary: 'Elementary',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    languageName: 'Language',
    proficiency: 'Proficiency',
    langNative: 'Native',
    langFluent: 'Fluent',
    langAdvanced: 'Advanced',
    langIntermediate: 'Intermediate',
    langBasic: 'Basic',
    organization: 'Organization',
    role: 'Role',
    location: 'Location',
    issuer: 'Issuer',
    expires: 'Expires',
    publisher: 'Publisher',
    title: 'Title',
    relationship: 'Relationship',
    // Placeholders
    placeholderFullName: 'John Doe',
    placeholderEmail: 'john@example.com',
    placeholderPhone: '+1 (555) 000-0000',
    placeholderAddress: 'New York, NY',
    placeholderWebsite: 'https://yourwebsite.com',
    placeholderLinkedIn: 'https://linkedin.com/in/username',
    placeholderLinkedInUsername: 'username',
    placeholderGitHub: 'https://github.com/username',
    placeholderGitHubUsername: 'username',
    placeholderSummary: 'Write a brief summary about yourself...',
    placeholderInstitution: 'University Name',
    placeholderDegree: 'Bachelor of Science',
    placeholderField: 'Computer Science',
    placeholderEducationDescription: 'Additional details...',
    placeholderCompany: 'Company Name',
    placeholderPosition: 'Job Title',
    placeholderExperienceDescription: 'Describe your responsibilities and achievements...',
    placeholderSkillName: 'JavaScript',
    placeholderProjectName: 'My Awesome Project',
    placeholderProjectDescription: 'Describe what you built...',
    placeholderTechnologies: 'React, TypeScript, Node.js',
    placeholderProjectLink: 'https://github.com/username/project',
    placeholderLanguageName: 'English',
    placeholderOrganization: 'Organization Name',
    placeholderRole: 'Your Role',
    placeholderVoluntaryWorkDescription: 'Describe your volunteer work...',
    placeholderConferenceName: 'Conference Name',
    placeholderConferenceLocation: 'City, Country',
    placeholderConferenceDescription: 'What did you present or attend?',
    placeholderCertificationName: 'Certification Name',
    placeholderIssuer: 'Issuing Organization',
    placeholderAchievementTitle: 'Achievement Title',
    placeholderAchievementDescription: 'Describe the achievement...',
    placeholderPublicationTitle: 'Publication Title',
    placeholderPublisher: 'Publisher Name',
    placeholderUrl: 'https://...',
    placeholderPublicationDescription: 'Brief description...',
    placeholderInterest: 'Interest or Hobby',
    placeholderReferenceName: 'Reference Name',
    placeholderReferenceTitle: 'Job Title',
    placeholderReferenceCompany: 'Company Name',
    placeholderReferenceEmail: 'email@example.com',
    placeholderReferencePhone: '+1 (555) 000-0000',
    placeholderRelationship: 'e.g., Former Manager, Colleague',
    placeholderPresent: 'Present',
    placeholderDate: 'January 2024',
    viewProject: 'View Project →',
    tech: 'Tech:',
    viewLink: 'View →',
    livePreview: 'Live Preview',
    settings: 'Settings',
    edit: 'Edit',
  },
  el: {
    personalInfo: 'Προσωπικά Στοιχεία',
    summary: 'Προφίλ',
    education: 'Εκπαίδευση',
    experience: 'Εργασιακή Εμπειρία',
    skills: 'Δεξιότητες',
    projects: 'Έργα',
    languages: 'Γλώσσες',
    voluntaryWork: 'Εθελοντισμός',
    conferences: 'Συνέδρια',
    certifications: 'Πιστοποιήσεις',
    achievements: 'Επιτεύγματα',
    publications: 'Δημοσιεύσεις',
    interests: 'Ενδιαφέροντα',
    references: 'Συστατικές Επιστολές',
    fullName: 'Ονοματεπώνυμο',
    date: 'Ημερομηνία',
    exportPdf: 'Εξαγωγή PDF',
    email: 'Email',
    phone: 'Τηλέφωνο',
    address: 'Διεύθυνση',
    website: 'Ιστοσελίδα',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    institution: 'Ίδρυμα',
    degree: 'Τίτλος Σπουδών',
    field: 'Τομέας Σπουδών',
    startDate: 'Ημερομηνία Έναρξης',
    endDate: 'Ημερομηνία Λήξης',
    ongoing: 'Συνεχίζεται',
    titleMarginTop: 'Περιθώριο Τίτλου Πάνω',
    createCV: 'Δημιουργήστε το επαγγελματικό σας βιογραφικό',
    font: 'Γραμματοσειρά',
    fontTitleSize: 'Γραμματοσειρά / Μέγεθος Τίτλου',
    language: 'Γλώσσα',
    sectionTitleMargin: 'Περιθώριο Τίτλων Ενοτήτων',
    description: 'Περιγραφή',
    company: 'Εταιρεία',
    position: 'Θέση',
    skillName: 'Δεξιότητα',
    level: 'Επίπεδο',
    projectName: 'Όνομα Έργου',
    technologies: 'Τεχνολογίες',
    link: 'Σύνδεσμος',
    addEducation: 'Προσθήκη Εκπαίδευσης',
    addExperience: 'Προσθήκη Εμπειρίας',
    addSkill: 'Προσθήκη Δεξιότητας',
    addProject: 'Προσθήκη Έργου',
    addLanguage: 'Προσθήκη Γλώσσας',
    about: 'Σχετικά',
    uploadPhoto: 'Ανέβασμα Φωτογραφίας',
    beginner: 'Αρχάριος',
    elementary: 'Βασικό',
    intermediate: 'Μέτριο',
    advanced: 'Προχωρημένο',
    expert: 'Ειδικός',
    languageName: 'Γλώσσα',
    proficiency: 'Επάρκεια',
    langNative: 'Μητρική',
    langFluent: 'Άριστη',
    langAdvanced: 'Προχωρημένη',
    langIntermediate: 'Μέτρια',
    langBasic: 'Βασική',
    organization: 'Οργανισμός',
    role: 'Ρόλος',
    location: 'Τοποθεσία',
    issuer: 'Φορέας',
    expires: 'Λήξη',
    publisher: 'Εκδότης',
    title: 'Τίτλος',
    relationship: 'Σχέση',
    // Placeholders
    placeholderFullName: 'Γιάννης Παπαδόπουλος',
    placeholderEmail: 'giannis@example.com',
    placeholderPhone: '+30 210 0000000',
    placeholderAddress: 'Αθήνα, Ελλάδα',
    placeholderWebsite: 'https://ιστοσελίδα.gr',
    placeholderLinkedIn: 'https://linkedin.com/in/username',
    placeholderLinkedInUsername: 'username',
    placeholderGitHub: 'https://github.com/username',
    placeholderGitHubUsername: 'username',
    placeholderSummary: 'Γράψτε μια σύντομη περίληψη για τον εαυτό σας...',
    placeholderInstitution: 'Όνομα Πανεπιστημίου',
    placeholderDegree: 'Πτυχίο',
    placeholderField: 'Τομέας Σπουδών',
    placeholderEducationDescription: 'Επιπλέον στοιχεία...',
    placeholderCompany: 'Όνομα Εταιρείας',
    placeholderPosition: 'Θέση Εργασίας',
    placeholderExperienceDescription: 'Περιγράψτε τα καθήκοντα και τα επιτεύγματά σας...',
    placeholderSkillName: 'JavaScript',
    placeholderProjectName: 'Το Έργο μου',
    placeholderProjectDescription: 'Περιγράψτε τι δημιουργήσατε...',
    placeholderTechnologies: 'React, TypeScript, Node.js',
    placeholderProjectLink: 'https://github.com/username/project',
    placeholderLanguageName: 'Αγγλικά',
    placeholderOrganization: 'Όνομα Οργανισμού',
    placeholderRole: 'Ο Ρόλος σας',
    placeholderVoluntaryWorkDescription: 'Περιγράψτε την εθελοντική εργασία...',
    placeholderConferenceName: 'Όνομα Συνεδρίου',
    placeholderConferenceLocation: 'Πόλη, Χώρα',
    placeholderConferenceDescription: 'Τι παρουσιάσατε ή παρακολουθήσατε;',
    placeholderCertificationName: 'Όνομα Πιστοποίησης',
    placeholderIssuer: 'Φορέας Έκδοσης',
    placeholderAchievementTitle: 'Τίτλος Επιτεύγματος',
    placeholderAchievementDescription: 'Περιγράψτε το επίτευγμα...',
    placeholderPublicationTitle: 'Τίτλος Δημοσίευσης',
    placeholderPublisher: 'Όνομα Εκδότη',
    placeholderUrl: 'https://...',
    placeholderPublicationDescription: 'Σύντομη περιγραφή...',
    placeholderInterest: 'Ενδιαφέρον ή Χόμπι',
    placeholderReferenceName: 'Όνομα Αναφοράς',
    placeholderReferenceTitle: 'Τίτλος Θέσης',
    placeholderReferenceCompany: 'Όνομα Εταιρείας',
    placeholderReferenceEmail: 'email@example.com',
    placeholderReferencePhone: '+30 210 0000000',
    placeholderRelationship: 'π.χ. Πρώην Διευθυντής, Συνάδελφος',
    placeholderPresent: 'Συνεχίζεται',
    placeholderDate: 'Ιανουάριος 2024',
    viewProject: 'Δες το Έργο →',
    tech: 'Τεχνολογίες:',
    viewLink: 'Δες →',
    livePreview: 'Ζωντανή Προεπισκόπηση',
    settings: 'Ρυθμίσεις',
    edit: 'Επεξεργασία',
  },
  es: {
    personalInfo: 'Información Personal',
    summary: 'Perfil',
    education: 'Educación',
    experience: 'Experiencia',
    skills: 'Habilidades',
    projects: 'Proyectos',
    languages: 'Idiomas',
    voluntaryWork: 'Trabajo Voluntario',
    conferences: 'Conferencias',
    certifications: 'Certificaciones',
    achievements: 'Logros',
    publications: 'Publicaciones',
    interests: 'Intereses',
    references: 'Referencias',
    fullName: 'Nombre Completo',
    date: 'Fecha',
    exportPdf: 'Exportar PDF',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    website: 'Sitio Web',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    institution: 'Institución',
    degree: 'Título',
    field: 'Campo de Estudio',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    ongoing: 'En curso',
    titleMarginTop: 'Margen Superior del Título',
    createCV: 'Crea tu currículum profesional',
    font: 'Fuente',
    fontTitleSize: 'Fuente / Tamaño del Título',
    language: 'Idioma',
    sectionTitleMargin: 'Margen de Títulos de Sección',
    description: 'Descripción',
    company: 'Empresa',
    position: 'Puesto',
    skillName: 'Habilidad',
    level: 'Nivel',
    projectName: 'Nombre del Proyecto',
    technologies: 'Tecnologías',
    link: 'Enlace',
    addEducation: 'Añadir Educación',
    addExperience: 'Añadir Experiencia',
    addSkill: 'Añadir Habilidad',
    addProject: 'Añadir Proyecto',
    addLanguage: 'Añadir Idioma',
    about: 'Acerca de',
    uploadPhoto: 'Subir Foto',
    beginner: 'Principiante',
    elementary: 'Elemental',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    expert: 'Experto',
    languageName: 'Idioma',
    proficiency: 'Nivel',
    langNative: 'Nativo',
    langFluent: 'Fluido',
    langAdvanced: 'Avanzado',
    langIntermediate: 'Intermedio',
    langBasic: 'Básico',
    organization: 'Organización',
    role: 'Rol',
    location: 'Ubicación',
    issuer: 'Emisor',
    expires: 'Caduca',
    publisher: 'Editorial',
    title: 'Título',
    relationship: 'Relación',
    // Placeholders
    placeholderFullName: 'Juan García',
    placeholderEmail: 'juan@ejemplo.com',
    placeholderPhone: '+34 600 000000',
    placeholderAddress: 'Madrid, España',
    placeholderWebsite: 'https://tusitio.com',
    placeholderLinkedIn: 'https://linkedin.com/in/usuario',
    placeholderLinkedInUsername: 'usuario',
    placeholderGitHub: 'https://github.com/usuario',
    placeholderGitHubUsername: 'usuario',
    placeholderSummary: 'Escribe un breve resumen sobre ti...',
    placeholderInstitution: 'Nombre de la Universidad',
    placeholderDegree: 'Licenciatura',
    placeholderField: 'Campo de Estudio',
    placeholderEducationDescription: 'Detalles adicionales...',
    placeholderCompany: 'Nombre de la Empresa',
    placeholderPosition: 'Puesto de Trabajo',
    placeholderExperienceDescription: 'Describe tus responsabilidades y logros...',
    placeholderSkillName: 'JavaScript',
    placeholderProjectName: 'Mi Proyecto',
    placeholderProjectDescription: 'Describe lo que construiste...',
    placeholderTechnologies: 'React, TypeScript, Node.js',
    placeholderProjectLink: 'https://github.com/usuario/proyecto',
    placeholderLanguageName: 'Inglés',
    placeholderOrganization: 'Nombre de la Organización',
    placeholderRole: 'Tu Rol',
    placeholderVoluntaryWorkDescription: 'Describe tu trabajo voluntario...',
    placeholderConferenceName: 'Nombre de la Conferencia',
    placeholderConferenceLocation: 'Ciudad, País',
    placeholderConferenceDescription: '¿Qué presentaste o asististe?',
    placeholderCertificationName: 'Nombre de la Certificación',
    placeholderIssuer: 'Organismo Emisor',
    placeholderAchievementTitle: 'Título del Logro',
    placeholderAchievementDescription: 'Describe el logro...',
    placeholderPublicationTitle: 'Título de la Publicación',
    placeholderPublisher: 'Nombre del Editor',
    placeholderUrl: 'https://...',
    placeholderPublicationDescription: 'Breve descripción...',
    placeholderInterest: 'Interés o Hobby',
    placeholderReferenceName: 'Nombre de Referencia',
    placeholderReferenceTitle: 'Puesto de Trabajo',
    placeholderReferenceCompany: 'Nombre de la Empresa',
    placeholderReferenceEmail: 'email@ejemplo.com',
    placeholderReferencePhone: '+34 600 000000',
    placeholderRelationship: 'ej., Ex Gerente, Colega',
    placeholderPresent: 'Presente',
    placeholderDate: 'Enero 2024',
    viewProject: 'Ver Proyecto →',
    tech: 'Tecnología:',
    viewLink: 'Ver →',
    livePreview: 'Vista Previa en Vivo',
    settings: 'Configuración',
    edit: 'Editar',
  },
  fr: {
    personalInfo: 'Informations Personnelles',
    summary: 'Profil',
    education: 'Éducation',
    experience: 'Expérience',
    skills: 'Compétences',
    projects: 'Projets',
    languages: 'Langues',
    voluntaryWork: 'Bénévolat',
    conferences: 'Conférences',
    certifications: 'Certifications',
    achievements: 'Réalisations',
    publications: 'Publications',
    interests: 'Intérêts',
    references: 'Références',
    fullName: 'Nom Complet',
    date: 'Date',
    exportPdf: 'Exporter PDF',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    website: 'Site Web',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    institution: 'Institution',
    degree: 'Diplôme',
    field: 'Domaine d\'étude',
    startDate: 'Date de Début',
    endDate: 'Date de Fin',
    ongoing: 'En cours',
    titleMarginTop: 'Marge Supérieur du Titre',
    createCV: 'Créez votre CV professionnel',
    font: 'Police',
    fontTitleSize: 'Police / Taille du Titre',
    language: 'Langue',
    sectionTitleMargin: 'Marge des Titres de Section',
    description: 'Description',
    company: 'Entreprise',
    position: 'Poste',
    skillName: 'Compétence',
    level: 'Niveau',
    projectName: 'Nom du Projet',
    technologies: 'Technologies',
    link: 'Lien',
    addEducation: 'Ajouter Éducation',
    addExperience: 'Ajouter Expérience',
    addSkill: 'Ajouter Compétence',
    addProject: 'Ajouter Projet',
    addLanguage: 'Ajouter Langue',
    about: 'À propos',
    uploadPhoto: 'Télécharger Photo',
    beginner: 'Débutant',
    elementary: 'Élémentaire',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    expert: 'Expert',
    languageName: 'Langue',
    proficiency: 'Niveau',
    langNative: 'Natif',
    langFluent: 'Courant',
    langAdvanced: 'Avancé',
    langIntermediate: 'Intermédiaire',
    langBasic: 'Débutant',
    organization: 'Organisation',
    role: 'Rôle',
    location: 'Lieu',
    issuer: 'Émetteur',
    expires: 'Expire',
    publisher: 'Éditeur',
    title: 'Titre',
    relationship: 'Relation',
    // Placeholders
    placeholderFullName: 'Jean Dupont',
    placeholderEmail: 'jean@exemple.com',
    placeholderPhone: '+33 6 00 00 00 00',
    placeholderAddress: 'Paris, France',
    placeholderWebsite: 'https://votresite.com',
    placeholderLinkedIn: 'https://linkedin.com/in/utilisateur',
    placeholderLinkedInUsername: 'utilisateur',
    placeholderGitHub: 'https://github.com/utilisateur',
    placeholderGitHubUsername: 'utilisateur',
    placeholderSummary: 'Rédigez un bref résumé sur vous...',
    placeholderInstitution: 'Nom de l\'Université',
    placeholderDegree: 'Licence',
    placeholderField: 'Domaine d\'Étude',
    placeholderEducationDescription: 'Détails supplémentaires...',
    placeholderCompany: 'Nom de l\'Entreprise',
    placeholderPosition: 'Poste',
    placeholderExperienceDescription: 'Décrivez vos responsabilités et réalisations...',
    placeholderSkillName: 'JavaScript',
    placeholderProjectName: 'Mon Projet',
    placeholderProjectDescription: 'Décrivez ce que vous avez construit...',
    placeholderTechnologies: 'React, TypeScript, Node.js',
    placeholderProjectLink: 'https://github.com/utilisateur/projet',
    placeholderLanguageName: 'Anglais',
    placeholderOrganization: 'Nom de l\'Organisation',
    placeholderRole: 'Votre Rôle',
    placeholderVoluntaryWorkDescription: 'Décrivez votre travail bénévole...',
    placeholderConferenceName: 'Nom de la Conférence',
    placeholderConferenceLocation: 'Ville, Pays',
    placeholderConferenceDescription: 'Qu\'avez-vous présenté ou assisté?',
    placeholderCertificationName: 'Nom de la Certification',
    placeholderIssuer: 'Organisation Émettrice',
    placeholderAchievementTitle: 'Titre de l\'Accomplissement',
    placeholderAchievementDescription: 'Décrivez l\'accomplissement...',
    placeholderPublicationTitle: 'Titre de la Publication',
    placeholderPublisher: 'Nom de l\'Éditeur',
    placeholderUrl: 'https://...',
    placeholderPublicationDescription: 'Brève description...',
    placeholderInterest: 'Intérêt ou Loisir',
    placeholderReferenceName: 'Nom de Référence',
    placeholderReferenceTitle: 'Poste',
    placeholderReferenceCompany: 'Nom de l\'Entreprise',
    placeholderReferenceEmail: 'email@exemple.com',
    placeholderReferencePhone: '+33 6 00 00 00 00',
    placeholderRelationship: 'ex., Ancien Manager, Collègue',
    placeholderPresent: 'Présent',
    placeholderDate: 'Janvier 2024',
    viewProject: 'Voir le Projet →',
    tech: 'Tech:',
    viewLink: 'Voir →',
    livePreview: 'Aperçu en Direct',
    settings: 'Paramètres',
    edit: 'Modifier',
  },
  de: {
    personalInfo: 'Persönliche Informationen',
    summary: 'Profil',
    education: 'Ausbildung',
    experience: 'Erfahrung',
    skills: 'Fähigkeiten',
    projects: 'Projekte',
    languages: 'Sprachen',
    voluntaryWork: 'Freiwilligenarbeit',
    conferences: 'Konferenzen',
    certifications: 'Zertifizierungen',
    achievements: 'Erfolge',
    publications: 'Veröffentlichungen',
    interests: 'Interessen',
    references: 'Referenzen',
    fullName: 'Vollständiger Name',
    date: 'Datum',
    exportPdf: 'PDF exportieren',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Adresse',
    website: 'Webseite',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    institution: 'Institution',
    degree: 'Abschluss',
    field: 'Studienfach',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    ongoing: 'Laufend',
    titleMarginTop: 'Titel Oberer Rand',
    createCV: 'Erstellen Sie Ihren professionellen Lebenslauf',
    font: 'Schriftart',
    fontTitleSize: 'Schriftart / Titelgröße',
    language: 'Sprache',
    sectionTitleMargin: 'Abschnittstitel-Rand',
    description: 'Beschreibung',
    company: 'Unternehmen',
    position: 'Position',
    skillName: 'Fähigkeit',
    level: 'Niveau',
    projectName: 'Projektname',
    technologies: 'Technologien',
    link: 'Link',
    addEducation: 'Ausbildung Hinzufügen',
    addExperience: 'Erfahrung Hinzufügen',
    addSkill: 'Fähigkeit Hinzufügen',
    addProject: 'Projekt Hinzufügen',
    addLanguage: 'Sprache Hinzufügen',
    about: 'Über',
    uploadPhoto: 'Foto Hochladen',
    beginner: 'Anfänger',
    elementary: 'Elementar',
    intermediate: 'Mittelstufe',
    advanced: 'Fortgeschritten',
    expert: 'Experte',
    languageName: 'Sprache',
    proficiency: 'Niveau',
    langNative: 'Muttersprache',
    langFluent: 'Fließend',
    langAdvanced: 'Fortgeschritten',
    langIntermediate: 'Mittelstufe',
    langBasic: 'Grundlagen',
    organization: 'Organisation',
    role: 'Rolle',
    location: 'Ort',
    issuer: 'Aussteller',
    expires: 'Läuft ab',
    publisher: 'Verlag',
    title: 'Titel',
    relationship: 'Beziehung',
    // Placeholders
    placeholderFullName: 'Max Mustermann',
    placeholderEmail: 'max@beispiel.de',
    placeholderPhone: '+49 30 00000000',
    placeholderAddress: 'Berlin, Deutschland',
    placeholderWebsite: 'https://ihrewebsite.de',
    placeholderLinkedIn: 'https://linkedin.com/in/benutzername',
    placeholderLinkedInUsername: 'benutzername',
    placeholderGitHub: 'https://github.com/benutzername',
    placeholderGitHubUsername: 'benutzername',
    placeholderSummary: 'Schreiben Sie eine kurze Zusammenfassung über sich...',
    placeholderInstitution: 'Universitätsname',
    placeholderDegree: 'Bachelor',
    placeholderField: 'Studienfach',
    placeholderEducationDescription: 'Zusätzliche Details...',
    placeholderCompany: 'Firmenname',
    placeholderPosition: 'Berufsbezeichnung',
    placeholderExperienceDescription: 'Beschreiben Sie Ihre Aufgaben und Erfolge...',
    placeholderSkillName: 'JavaScript',
    placeholderProjectName: 'Mein Projekt',
    placeholderProjectDescription: 'Beschreiben Sie, was Sie gebaut haben...',
    placeholderTechnologies: 'React, TypeScript, Node.js',
    placeholderProjectLink: 'https://github.com/benutzername/projekt',
    placeholderLanguageName: 'Englisch',
    placeholderOrganization: 'Organisationsname',
    placeholderRole: 'Ihre Rolle',
    placeholderVoluntaryWorkDescription: 'Beschreiben Sie Ihre ehrenamtliche Arbeit...',
    placeholderConferenceName: 'Konferenzname',
    placeholderConferenceLocation: 'Stadt, Land',
    placeholderConferenceDescription: 'Was haben Sie präsentiert oder besucht?',
    placeholderCertificationName: 'Zertifizierungsname',
    placeholderIssuer: 'Ausstellende Organisation',
    placeholderAchievementTitle: 'Erfolgstitel',
    placeholderAchievementDescription: 'Beschreiben Sie den Erfolg...',
    placeholderPublicationTitle: 'Publikationstitel',
    placeholderPublisher: 'Verlagsname',
    placeholderUrl: 'https://...',
    placeholderPublicationDescription: 'Kurze Beschreibung...',
    placeholderInterest: 'Interesse oder Hobby',
    placeholderReferenceName: 'Referenzname',
    placeholderReferenceTitle: 'Berufsbezeichnung',
    placeholderReferenceCompany: 'Firmenname',
    placeholderReferenceEmail: 'email@beispiel.de',
    placeholderReferencePhone: '+49 30 00000000',
    placeholderRelationship: 'z.B. Ehemaliger Vorgesetzter, Kollege',
    placeholderPresent: 'Gegenwärtig',
    placeholderDate: 'Januar 2024',
    viewProject: 'Projekt ansehen →',
    tech: 'Tech:',
    viewLink: 'Ansehen →',
    livePreview: 'Live-Vorschau',
    settings: 'Einstellungen',
    edit: 'Bearbeiten',
  },
};
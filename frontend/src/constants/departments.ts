export interface StructureItem {
  id: string;
  name: string;
}

export interface CollegeStructure {
  id: string;
  code: string;
  name: string;
  overview: string;
  faculties: StructureItem[];
  departments: StructureItem[];
  note?: string;
}

export interface AdministrativeUnit extends StructureItem {
  kind: 'Office' | 'Directorate' | 'Unit' | 'Section' | 'Service' | 'School';
  children?: StructureItem[];
}

export interface AdministrativeCluster {
  id: string;
  name: string;
  overview: string;
  units: AdministrativeUnit[];
}

export interface DirectoryEntry {
  id: string;
  name: string;
  division: string;
  category: string;
  parent: string;
}

export const UCC_COLLEGE_STRUCTURE: CollegeStructure[] = [
  {
    id: 'ces',
    code: 'CES',
    name: 'College of Education Studies',
    overview: 'Teacher education, educational leadership, outreach, and school improvement programmes.',
    faculties: [
      { id: 'ces-fef', name: 'Faculty of Educational Foundations' },
      { id: 'ces-fepa', name: 'Faculty of Educational Planning & Administration' },
      { id: 'ces-fste', name: 'Faculty of Science & Technology Education' },
      { id: 'ces-fasse', name: 'Faculty of Arts & Social Sciences Education' },
      { id: 'ces-fedo', name: 'Faculty of Educational Development & Outreach' },
      { id: 'ces-sedo', name: 'School of Educational Development and Outreach' },
    ],
    departments: [
      { id: 'ces-education-foundations', name: 'Education Foundations' },
      { id: 'ces-psychology-education', name: 'Psychology & Education' },
      { id: 'ces-guidance-counselling', name: 'Guidance & Counselling' },
      { id: 'ces-basic-education', name: 'Basic Education' },
      { id: 'ces-curriculum-teaching', name: 'Curriculum & Teaching' },
      { id: 'ces-science-education', name: 'Science Education' },
      { id: 'ces-mathematics-ict-education', name: 'Mathematics & ICT Education' },
      { id: 'ces-business-social-sciences-education', name: 'Business & Social Sciences Education' },
      { id: 'ces-arts-education', name: 'Arts Education' },
      { id: 'ces-physical-education', name: 'Physical Education' },
      { id: 'ces-health-education', name: 'Health Education' },
      { id: 'ces-educational-administration-management', name: 'Educational Administration & Management' },
    ],
  },
  {
    id: 'chls',
    code: 'CHLS',
    name: 'College of Humanities and Legal Studies',
    overview: 'Humanities, law, business, and social sciences education across the university.',
    faculties: [
      { id: 'chls-fa', name: 'Faculty of Arts' },
      { id: 'chls-fss', name: 'Faculty of Social Sciences' },
      { id: 'chls-sob', name: 'UCC School of Business' },
      { id: 'chls-law', name: 'Faculty of Law' },
    ],
    departments: [
      { id: 'chls-english', name: 'English' },
      { id: 'chls-french', name: 'French' },
      { id: 'chls-gll', name: 'Ghanaian Languages & Linguistics' },
      { id: 'chls-history', name: 'History' },
      { id: 'chls-philosophy-classics', name: 'Philosophy & Classics' },
      { id: 'chls-religious-studies', name: 'Religious Studies' },
      { id: 'chls-theatre-film-studies', name: 'Theatre & Film Studies' },
      { id: 'chls-music-dance', name: 'Music & Dance' },
      { id: 'chls-economics', name: 'Economics' },
      { id: 'chls-geography-regional-planning', name: 'Geography & Regional Planning' },
      { id: 'chls-political-science', name: 'Political Science' },
      { id: 'chls-sociology-anthropology', name: 'Sociology & Anthropology' },
      { id: 'chls-population-health', name: 'Population & Health' },
      { id: 'chls-accounting', name: 'Accounting' },
      { id: 'chls-finance', name: 'Finance' },
      { id: 'chls-marketing-supply-chain-management', name: 'Marketing & Supply Chain Management' },
      { id: 'chls-management', name: 'Management' },
      { id: 'chls-human-resource-management', name: 'Human Resource Management' },
      { id: 'chls-private-law', name: 'Private Law' },
      { id: 'chls-public-law', name: 'Public Law' },
    ],
  },
  {
    id: 'cans',
    code: 'CANS',
    name: 'College of Agriculture and Natural Sciences',
    overview: 'Agriculture, life sciences, physical sciences, computing, and environmental science.',
    faculties: [
      { id: 'cans-fa', name: 'Faculty of Agriculture' },
      { id: 'cans-fs', name: 'Faculty of Science' },
      { id: 'cans-sbs', name: 'School of Biological Sciences' },
      { id: 'cans-sps', name: 'School of Physical Sciences' },
      { id: 'cans-sahs', name: 'School of Allied Health Sciences' },
    ],
    departments: [
      { id: 'cans-agriculture', name: 'Agriculture' },
      { id: 'cans-animal-science', name: 'Animal Science' },
      { id: 'cans-crop-science', name: 'Crop Science' },
      { id: 'cans-soil-science', name: 'Soil Science' },
      { id: 'cans-agricultural-economics-extension', name: 'Agricultural Economics & Extension' },
      { id: 'cans-biological-sciences', name: 'Biological Sciences' },
      { id: 'cans-biochemistry', name: 'Biochemistry' },
      { id: 'cans-molecular-biology-biotechnology', name: 'Molecular Biology & Biotechnology' },
      { id: 'cans-fisheries-aquatic-sciences', name: 'Fisheries & Aquatic Sciences' },
      { id: 'cans-conservation-biology-entomology', name: 'Conservation Biology & Entomology' },
      { id: 'cans-physical-sciences', name: 'Physical Sciences' },
      { id: 'cans-physics', name: 'Physics' },
      { id: 'cans-chemistry', name: 'Chemistry' },
      { id: 'cans-mathematics-statistics', name: 'Mathematics & Statistics' },
      { id: 'cans-computer-science', name: 'Computer Science' },
      { id: 'cans-environmental-science', name: 'Environmental Science' },
    ],
  },
  {
    id: 'chas',
    code: 'CHAS',
    name: 'College of Health and Allied Sciences',
    overview: 'Medical, nursing, public health, pharmacy, and allied health professional training.',
    faculties: [
      { id: 'chas-sms', name: 'School of Medical Sciences' },
      { id: 'chas-snm', name: 'School of Nursing & Midwifery' },
      { id: 'chas-sahs', name: 'School of Allied Health Sciences' },
      { id: 'chas-spps', name: 'School of Pharmacy & Pharmaceutical Sciences' },
      { id: 'chas-sph', name: 'School of Public Health' },
    ],
    departments: [
      { id: 'chas-anatomy', name: 'Anatomy' },
      { id: 'chas-physiology', name: 'Physiology' },
      { id: 'chas-biochemistry-medical', name: 'Biochemistry (Medical)' },
      { id: 'chas-community-medicine', name: 'Community Medicine' },
      { id: 'chas-nursing', name: 'Nursing' },
      { id: 'chas-midwifery', name: 'Midwifery' },
      { id: 'chas-medical-laboratory-science', name: 'Medical Laboratory Science' },
      { id: 'chas-physician-assistantship', name: 'Physician Assistantship' },
      { id: 'chas-biomedical-sciences', name: 'Biomedical Sciences' },
      { id: 'chas-nutrition-dietetics', name: 'Nutrition & Dietetics' },
      { id: 'chas-pharmaceutical-sciences', name: 'Pharmaceutical Sciences' },
      { id: 'chas-public-health', name: 'Public Health' },
    ],
  },
  {
    id: 'sgs',
    code: 'SGS',
    name: 'School of Graduate Studies',
    overview: 'Coordinates postgraduate programmes across the academic colleges of the university.',
    faculties: [],
    departments: [],
    note: 'School of Graduate Studies is programme-based and not department-based.',
  },
];

export const UCC_ADMIN_STRUCTURE: AdministrativeCluster[] = [
  {
    id: 'central-administration-offices',
    name: 'Central Administration Offices',
    overview: 'Core executive and statutory offices supporting governance and institutional administration.',
    units: [
      { id: 'admin-vc-office', name: 'Office of the Vice-Chancellor', kind: 'Office' },
      { id: 'admin-pvc-office', name: 'Office of the Pro Vice-Chancellor', kind: 'Office' },
      { id: 'admin-registrar-office', name: "Registrar's Office", kind: 'Office' },
      { id: 'admin-finance-office', name: 'Finance Office', kind: 'Office' },
      { id: 'admin-internal-audit-directorate', name: 'Internal Audit Directorate', kind: 'Directorate' },
    ],
  },
  {
    id: 'academic-student-administration',
    name: 'Academic & Student Administration',
    overview: 'Academic records, student-facing administration, admissions, and examinations operations.',
    units: [
      { id: 'admin-academic-affairs', name: 'Directorate of Academic Affairs', kind: 'Directorate' },
      { id: 'admin-students-affairs', name: "Directorate of Students' Affairs", kind: 'Directorate' },
      { id: 'admin-examinations-unit', name: 'Examinations Unit', kind: 'Unit' },
      { id: 'admin-admissions-office', name: 'Admissions Office', kind: 'Office' },
    ],
  },
  {
    id: 'ict-digital-services',
    name: 'ICT & Digital Services',
    overview: 'Enterprise digital systems, infrastructure, training, cybersecurity, and online learning support.',
    units: [
      {
        id: 'admin-dicts',
        name: 'Directorate of Information & Communication Technology Services (DICTS)',
        kind: 'Directorate',
        children: [
          { id: 'admin-dicts-mis', name: 'MIS Section' },
          { id: 'admin-dicts-systems-administration', name: 'Systems Administration' },
          { id: 'admin-dicts-database-administration', name: 'Database Administration' },
          { id: 'admin-dicts-cybersecurity', name: 'Cybersecurity' },
          { id: 'admin-dicts-it-support', name: 'IT Support' },
          { id: 'admin-dicts-it-training', name: 'IT Training' },
          { id: 'admin-dicts-network-infrastructure', name: 'Network & Infrastructure' },
          { id: 'admin-dicts-elknow', name: 'E-Learning & Knowledge Management' },
          { id: 'admin-dicts-web-services', name: 'Web Services' },
          { id: 'admin-dicts-secretariat', name: 'Secretariat' },
        ],
      },
    ],
  },
  {
    id: 'research-quality',
    name: 'Research & Quality',
    overview: 'Research support, innovation, consultancy, and quality assurance leadership.',
    units: [
      { id: 'admin-dric', name: 'Directorate of Research, Innovation & Consultancy (DRIC)', kind: 'Directorate' },
      { id: 'admin-quality-assurance', name: 'Directorate of Quality Assurance', kind: 'Directorate' },
    ],
  },
  {
    id: 'human-resource-planning',
    name: 'Human Resource & Planning',
    overview: 'People management, infrastructure planning, and university health support functions.',
    units: [
      { id: 'admin-human-resource', name: 'Directorate of Human Resource', kind: 'Directorate' },
      { id: 'admin-dpdem', name: 'Directorate of Physical Development & Estate Management (DPDEM)', kind: 'Directorate' },
      { id: 'admin-university-health-services', name: 'Directorate of University Health Services', kind: 'Directorate' },
    ],
  },
  {
    id: 'finance-procurement',
    name: 'Finance & Procurement',
    overview: 'Finance operations, procurement leadership, and university stores management.',
    units: [
      { id: 'admin-directorate-finance', name: 'Directorate of Finance', kind: 'Directorate' },
      { id: 'admin-procurement-directorate', name: 'Procurement Directorate', kind: 'Directorate' },
      { id: 'admin-stores', name: 'Stores', kind: 'Unit' },
    ],
  },
  {
    id: 'student-public-services',
    name: 'Student & Public Services',
    overview: 'Public communication, student support services, sports, and knowledge access.',
    units: [
      { id: 'admin-public-affairs', name: 'Directorate of Public Affairs', kind: 'Directorate' },
      { id: 'admin-sports', name: 'Directorate of Sports', kind: 'Directorate' },
      { id: 'admin-library-system', name: 'University Library System', kind: 'Service' },
      { id: 'admin-counselling-centre', name: 'Counselling Centre', kind: 'Unit' },
    ],
  },
  {
    id: 'security-welfare',
    name: 'Security & Welfare',
    overview: 'Campus security, transport operations, and student and staff welfare services.',
    units: [
      { id: 'admin-security-services', name: 'University Security Services', kind: 'Service' },
      { id: 'admin-transport-section', name: 'Transport Section', kind: 'Section' },
      { id: 'admin-university-hospital', name: 'University Hospital', kind: 'Service' },
    ],
  },
];

const academicDirectory: DirectoryEntry[] = UCC_COLLEGE_STRUCTURE.flatMap((college) => {
  const collegeLevelEntry =
    college.departments.length === 0
      ? [
          {
            id: `${college.id}-programme-office`,
            name: college.name,
            division: college.code,
            category: 'School',
            parent: 'Academic Structure',
          },
        ]
      : [];

  return [
    ...collegeLevelEntry,
    ...college.departments.map((department) => ({
      id: department.id,
      name: department.name,
      division: college.name,
      category: 'Academic Department',
      parent: college.code,
    })),
  ];
});

const administrativeDirectory: DirectoryEntry[] = UCC_ADMIN_STRUCTURE.flatMap((cluster) =>
  cluster.units.flatMap((unit) => [
    {
      id: unit.id,
      name: unit.name,
      division: cluster.name,
      category: unit.kind,
      parent: cluster.name,
    },
    ...(unit.children ?? []).map((child) => ({
      id: child.id,
      name: child.name,
      division: unit.name,
      category: 'Section',
      parent: cluster.name,
    })),
  ])
);

export const DEPARTMENT_DIRECTORY: DirectoryEntry[] = [...academicDirectory, ...administrativeDirectory].sort(
  (left, right) => left.name.localeCompare(right.name)
);

export const TOTAL_FACULTIES_AND_SCHOOLS = UCC_COLLEGE_STRUCTURE.reduce(
  (total, college) => total + college.faculties.length,
  0
);

export const TOTAL_ACADEMIC_DEPARTMENTS = UCC_COLLEGE_STRUCTURE.reduce(
  (total, college) => total + college.departments.length,
  0
);

export const TOTAL_ADMIN_UNITS = UCC_ADMIN_STRUCTURE.reduce(
  (total, cluster) =>
    total +
    cluster.units.length +
    cluster.units.reduce((childTotal, unit) => childTotal + (unit.children?.length ?? 0), 0),
  0
);

export const TOTAL_DIRECTORY_ENTRIES = DEPARTMENT_DIRECTORY.length;

const duplicateDepartmentNames = new Set(
  DEPARTMENT_DIRECTORY
    .map((department) => department.name)
    .filter((name, index, names) => names.indexOf(name) !== index)
);

export const formatDepartmentLabel = (department: DirectoryEntry) =>
  duplicateDepartmentNames.has(department.name)
    ? `${department.name} (${department.division})`
    : department.name;

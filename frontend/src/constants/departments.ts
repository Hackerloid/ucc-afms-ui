export interface Department {
  id: string;
  name: string;
  head: string;
  employees: number;
  location: string;
  email: string;
  division: string;
}

export const UCC_DEPARTMENTS: Department[] = [
  // Central Administration
  { id: 'OVC', name: 'Office of the Vice-Chancellor', head: 'Prof. Johnson Nyarko Boampong', employees: 15, location: 'Administration Block', email: 'v-c@ucc.edu.gh', division: 'Central Administration' },
  { id: 'OPVC', name: 'Office of the Pro Vice-Chancellor', head: 'Prof. Rosemond Boohene', employees: 10, location: 'Administration Block', email: 'prov-c@ucc.edu.gh', division: 'Central Administration' },
  { id: 'OREG', name: 'Office of the Registrar', head: 'Mr. Jeff Teye Emmanuel Onyame', employees: 12, location: 'Administration Block', email: 'registrar@ucc.edu.gh', division: 'Central Administration' },
  { id: 'OFIN', name: 'Office of the Director of Finance', head: 'Mrs. Elizabeth Obese', employees: 20, location: 'Administration Block', email: 'finance@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DAA', name: 'Directorate of Academic Affairs', head: 'Mr. Gideon Enoch Abbeyquaye', employees: 25, location: 'Academic Block', email: 'academic.affairs@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DSA', name: 'Directorate of Students’ Affairs', head: 'Dr. Christopher Akwaa-Mensah', employees: 18, location: 'Student Centre', email: 'students.affairs@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DUHS', name: 'Directorate of University Health Services', head: 'Dr. Evans Ekanem', employees: 45, location: 'University Hospital', email: 'health.services@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DSPT', name: 'Directorate of Sports', head: 'Dr. Daniel Apaak', employees: 12, location: 'Sports Stadium', email: 'sports@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DFIN', name: 'Directorate of Finance', head: 'Mrs. Elizabeth Obese', employees: 30, location: 'Administration Block', email: 'finance.dir@ucc.edu.gh', division: 'Central Administration' },
  { id: 'PROC', name: 'Procurement Office', head: 'Mr. Eugene Forson', employees: 8, location: 'Administration Block', email: 'procurement@ucc.edu.gh', division: 'Central Administration' },
  { id: 'IAU', name: 'Internal Audit Unit', head: 'Mr. Emmanuel P. Owusu', employees: 12, location: 'Administration Block', email: 'internal.audit@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DHR', name: 'Directorate of Human Resource', head: 'Rev. Isaac Baafi Sarbeng', employees: 22, location: 'Administration Block', email: 'hr@ucc.edu.gh', division: 'Central Administration' },
  { id: 'GAD', name: 'General Administration Division', head: 'Mr. Kwabena Antwi-Konadu', employees: 35, location: 'Administration Block', email: 'general.admin@ucc.edu.gh', division: 'Central Administration' },
  { id: 'LEGAL', name: 'Legal Office', head: 'Mr. Solomon Faakye', employees: 6, location: 'Administration Block', email: 'legal@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DPDEM', name: 'Directorate of Physical Development and Estate Management (DPDEM)', head: 'Mr. Philip Nyerere K.A. Boateng', employees: 40, location: 'DPDEM Office', email: 'dpdem@ucc.edu.gh', division: 'Central Administration' },
  { id: 'TRANS', name: 'Transport Section', head: 'Mr. Fred Yao Badu', employees: 30, location: 'Transport Yard', email: 'transport@ucc.edu.gh', division: 'Central Administration' },
  { id: 'SEC', name: 'University Security Section', head: 'Col. (Rtd.) Joseph Kojo-Kofie', employees: 150, location: 'Security Office', email: 'security@ucc.edu.gh', division: 'Central Administration' },
  { id: 'DMU', name: 'Disaster Management Unit', head: 'Mr. John Amoah', employees: 8, location: 'Safety House', email: 'disaster.mgmt@ucc.edu.gh', division: 'Central Administration' },

  // Academic Support & Governance
  { id: 'DICTS', name: 'Directorate of ICT Services (DICTS)', head: 'Dr. Regina Gyampoh-Vidogah', employees: 40, location: 'ICT Centre', email: 'dicts@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'ULS', name: 'University Library System', head: 'Dr. Mac-Anthony Cobblah', employees: 55, location: 'Main Library', email: 'library@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'DRIC', name: 'Directorate of Research, Innovation and Consultancy (DRIC)', head: 'Prof. David Teye Doku', employees: 15, location: 'DRIC House', email: 'dric@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'DAPQA', name: 'Directorate of Academic Planning and Quality Assurance (DAPQA)', head: 'Prof. Jophus Anamuah-Mensah', employees: 10, location: 'Old Library', email: 'dapqa@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'DPA', name: 'Directorate of Public Affairs', head: 'Mr. Kwabena Antwi-Konadu', employees: 12, location: 'Academic Block', email: 'public.affairs@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'DIR', name: 'Directorate of International Relations', head: 'Prof. Kwaku Adutwum Ayim Boakye', employees: 8, location: 'International House', email: 'international@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'ARO', name: 'Alumni Relations Office', head: 'Mr. Kester Mensah', employees: 5, location: 'Alumni House', email: 'alumni@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'EXAM', name: 'Examinations Unit', head: 'Mr. Alfred Ghartey', employees: 25, location: 'Academic Block', email: 'exams@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'ADMISS', name: 'Admissions Office', head: 'Mr. Peter Antwi-Bosiako', employees: 15, location: 'Academic Block', email: 'admissions@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'RECORDS', name: 'Records Office', head: 'Mr. Akwasi Appiah', employees: 20, location: 'Administration Block', email: 'records@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'COUNS', name: 'Counselling Centre', head: 'Prof. Godwin Awabil', employees: 12, location: 'Counselling House', email: 'counselling@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'CHAP', name: 'Chaplaincy / Religious Affairs Units', head: 'Rev. Prof. M. Okyerefo', employees: 8, location: 'Chapel Complex', email: 'chaplaincy@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'AB', name: 'Academic Board', head: 'The Vice-Chancellor', employees: 5, location: 'Administration Block', email: 'academic.board@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'UC', name: 'University Council', head: 'Council Chairman', employees: 5, location: 'Council Chamber', email: 'council@ucc.edu.gh', division: 'Academic Support & Governance' },
  { id: 'CONV', name: 'Convocation', head: 'Convocation Chairman', employees: 5, location: 'Main Hall', email: 'convocation@ucc.edu.gh', division: 'Academic Support & Governance' },

  // College of Humanities and Legal Studies
  { id: 'DCP', name: 'Department of Classics and Philosophy', head: 'Dr. Peter Dwumah', employees: 15, location: 'Faculty of Arts', email: 'classics.philosophy@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DCS', name: 'Department of Communication Studies', head: 'Dr. Mike Yao Teku', employees: 18, location: 'Faculty of Arts', email: 'comm.studies@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DENG', name: 'Department of English', head: 'Dr. Joseph Benjamin Archibald Afful', employees: 22, location: 'Faculty of Arts', email: 'english@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DFRE', name: 'Department of French', head: 'Dr. Mawulorm Goka', employees: 16, location: 'Faculty of Arts', email: 'french@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DGLL', name: 'Department of Ghanaian Languages and Linguistics', head: 'Dr. Emmanuel Amoh Ofori', employees: 20, location: 'Faculty of Arts', email: 'gll@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DHIST', name: 'Department of History', head: 'Dr. Kwame Osei Kwarteng', employees: 15, location: 'Faculty of Arts', email: 'history@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DMD', name: 'Department of Music and Dance', head: 'Dr. Eric Debrah Otchere', employees: 18, location: 'Faculty of Arts', email: 'music.dance@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DRHV', name: 'Department of Religion and Human Values', head: 'Rev. Dr. Eric Anum', employees: 14, location: 'Faculty of Arts', email: 'religion@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DTFS', name: 'Department of Theatre and Film Studies', head: 'Dr. Samuel Mensah', employees: 12, location: 'Faculty of Arts', email: 'theatre.film@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DACC', name: 'Department of Accounting', head: 'Dr. Mohammed Sani Abdulai', employees: 25, location: 'School of Business', email: 'accounting@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DFIN_BUS', name: 'Department of Finance', head: 'Dr. Seyram Kawor', employees: 22, location: 'School of Business', email: 'finance.bus@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DHRM', name: 'Department of Human Resource Management', head: 'Dr. Rebecca Dei Mensah', employees: 20, location: 'School of Business', email: 'hrm@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DMGMT', name: 'Department of Management', head: 'Dr. Edward Amarteyfio', employees: 18, location: 'School of Business', email: 'management@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DMSCM', name: 'Department of Marketing and Supply Chain Management', head: 'Dr. Ernest Nyarku', employees: 20, location: 'School of Business', email: 'marketing.scm@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DGRP', name: 'Department of Geography and Regional Planning', head: 'Prof. S.B. Kendie', employees: 22, location: 'Faculty of Social Sciences', email: 'geography@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DHTM', name: 'Department of Hospitality and Tourism Management', head: 'Dr. Ishmael Mensah', employees: 18, location: 'Faculty of Social Sciences', email: 'ht.mgmt@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DPH', name: 'Department of Population and Health', head: 'Prof. Augustine Tanle', employees: 15, location: 'Faculty of Social Sciences', email: 'pop.health@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DSA_SOC', name: 'Department of Sociology and Anthropology', head: 'Dr. Akwasi Kumi-Kyereme', employees: 18, location: 'Faculty of Social Sciences', email: 'sociology@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DLAW', name: 'Department of Law', head: 'De-Graft Johnson', employees: 20, location: 'Faculty of Law', email: 'law@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },
  { id: 'DLE', name: 'Department of Legal Extension', head: 'Dr. Solomon Faakye', employees: 8, location: 'Faculty of Law', email: 'legal.extension@ucc.edu.gh', division: 'College of Humanities and Legal Studies' },

  // College of Education
  { id: 'DBE', name: 'Department of Basic Education', head: 'Dr. Eric Nyarko-Sampson', employees: 25, location: 'Faculty of Education', email: 'basic.edu@ucc.edu.gh', division: 'College of Education' },
  { id: 'DEP', name: 'Department of Education and Psychology', head: 'Prof. Emmanuel Kofi Gyimah', employees: 30, location: 'Faculty of Education', email: 'edu.psych@ucc.edu.gh', division: 'College of Education' },
  { id: 'DGC', name: 'Department of Guidance and Counselling', head: 'Prof. Godwin Awabil', employees: 18, location: 'Faculty of Education', email: 'guidance.couns@ucc.edu.gh', division: 'College of Education' },
  { id: 'DAE', name: 'Department of Arts Education', head: 'Dr. Seth Peter Boateng', employees: 25, location: 'Faculty of Education', email: 'arts.edu@ucc.edu.gh', division: 'College of Education' },
  { id: 'DBSE', name: 'Department of Business and Social Sciences Education', head: 'Dr. Joseph Kwaku Adu', employees: 30, location: 'Faculty of Education', email: 'business.edu@ucc.edu.gh', division: 'College of Education' },
  { id: 'DHPER', name: 'Department of Health, Physical Education and Recreation', head: 'Dr. Daniel Apaak', employees: 20, location: 'Faculty of Education', email: 'hper@ucc.edu.gh', division: 'College of Education' },
  { id: 'DMICTE', name: 'Department of Mathematics and ICT Education', head: 'Dr. Christopher Akwaa-Mensah', employees: 25, location: 'Faculty of Education', email: 'math.ict.edu@ucc.edu.gh', division: 'College of Education' },
  { id: 'DSE', name: 'Department of Science Education', head: 'Dr. Douglas Darko Agyei', employees: 20, location: 'Faculty of Education', email: 'science.edu@ucc.edu.gh', division: 'College of Education' },
  { id: 'DVTE', name: 'Department of Vocational and Technical Education', head: 'Dr. Sandra Amanfu', employees: 15, location: 'Faculty of Education', email: 'votech.edu@ucc.edu.gh', division: 'College of Education' },

  // College of Agriculture and Natural Sciences
  { id: 'DBIO', name: 'Department of Biochemistry', head: 'Dr. Paul Armah Sakyi', employees: 20, location: 'College of Health', email: 'biochem@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DCBE', name: 'Department of Conservation Biology and Entomology', head: 'Dr. Rofela Combey', employees: 15, location: 'College of Health', email: 'cbe@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DEVS', name: 'Department of Environmental Science', head: 'Dr. Donatus Bapohl Angnuureng', employees: 12, location: 'College of Health', email: 'env.science@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DFAS', name: 'Department of Fisheries and Aquatic Sciences', head: 'Prof. John Blay', employees: 18, location: 'College of Health', email: 'fisheries@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DFOR', name: 'Department of Forensic Sciences', head: 'Dr. Richmond Afoakwa', employees: 15, location: 'College of Health', email: 'forensics@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DMBB', name: 'Department of Molecular Biology and Biotechnology', head: 'Dr. Samuel Kojo Kwofie', employees: 18, location: 'College of Health', email: 'mbb@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DAEE', name: 'Department of Agricultural Economics and Extension', head: 'Dr. Festus Annor-Frempong', employees: 20, location: 'School of Agriculture', email: 'agric.econ@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DAGEN', name: 'Department of Agricultural Engineering', head: 'Dr. Robert Adjawui', employees: 18, location: 'School of Agriculture', email: 'agric.eng@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DANS', name: 'Department of Animal Science', head: 'Prof. S.Y. Annor', employees: 15, location: 'School of Agriculture', email: 'animal.science@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DCS_AG', name: 'Department of Crop Science', head: 'Dr. Michael Kwabena Osei', employees: 15, location: 'School of Agriculture', email: 'crop.science@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DSS', name: 'Department of Soil Science', head: 'Dr. David Oscar Yawson', employees: 12, location: 'School of Agriculture', email: 'soil.science@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DCHEM', name: 'Department of Chemistry', head: 'Prof. Robert James Aniagyei', employees: 25, location: 'College of Health', email: 'chemistry@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DCSIT', name: 'Department of Computer Science and Information Technology', head: 'Dr. Regina Vidogah', employees: 30, location: 'College of Health', email: 'csit@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DLT', name: 'Department of Laboratory Technology', head: 'Dr. Ernest Teye', employees: 15, location: 'College of Health', email: 'lab.technology@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DMATH', name: 'Department of Mathematics', head: 'Prof. Nathaniel Kotei Kotte', employees: 20, location: 'College of Health', email: 'mathematics@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DPHYS', name: 'Department of Physics', head: 'Dr. Moses Jojo Eghan', employees: 18, location: 'College of Health', email: 'physics@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },
  { id: 'DSTAT', name: 'Department of Statistics', head: 'Dr. Bismark Kwutse', employees: 15, location: 'College of Health', email: 'statistics@ucc.edu.gh', division: 'College of Agriculture and Natural Sciences' },

  // College of Health and Allied Sciences
  { id: 'DCPATH', name: 'Department of Chemical Pathology', head: 'Dr. Robert Ngala', employees: 12, location: 'Medical School', email: 'chem.path@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DCN', name: 'Department of Clinical Nutrition and Dietetics', head: 'Dr. Christian Laryea', employees: 15, location: 'Medical School', email: 'clinical.nutrition@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DCM', name: 'Department of Community Medicine', head: 'Prof. Akosua Gyamfi', employees: 18, location: 'Medical School', email: 'comm.medicine@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DIM', name: 'Department of Internal Medicine', head: 'Dr. Kofi Boateng', employees: 20, location: 'Medical School', email: 'internal.medicine@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DMB', name: 'Department of Medical Biochemistry', head: 'Dr. Yaw Asante Ennin', employees: 15, location: 'Medical School', email: 'med.biochem@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DMI', name: 'Department of Microbiology and Immunology', head: 'Dr. Dorcas Obiri-Yeboah', employees: 18, location: 'Medical School', email: 'microbiology@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DOG', name: 'Department of Obstetrics and Gynaecology', head: 'Dr. Sebastian Eliason', employees: 15, location: 'Medical School', email: 'obgyn@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPCH', name: 'Department of Paediatrics and Child Health', head: 'Dr. Emmanuel Ameyaw', employees: 12, location: 'Medical School', email: 'paediatrics@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPHARM', name: 'Department of Pharmacology', head: 'Dr. Robert Peter Biney', employees: 15, location: 'Medical School', email: 'pharmacology@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPHY', name: 'Department of Physiology', head: 'Dr. Victor Yakpo', employees: 12, location: 'Medical School', email: 'physiology@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPMMM', name: 'Department of Psychological Medicine and Mental Health', head: 'Dr. Amoakohene Asante', employees: 10, location: 'Medical School', email: 'psych.medicine@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DSURG', name: 'Department of Surgery', head: 'Dr. Martin Morna', employees: 15, location: 'Medical School', email: 'surgery@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DANA', name: 'Department of Anatomy', head: 'Dr. Josiah Adjovu', employees: 12, location: 'Medical School', email: 'anatomy@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DAN', name: 'Department of Adult Nursing', head: 'Dr. Jerry Paul Ninnoni', employees: 18, location: 'School of Nursing', email: 'adult.nursing@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DMCH', name: 'Department of Maternal and Child Health', head: 'Dr. Patience Faghir-Hassan', employees: 15, location: 'School of Nursing', email: 'maternal.health@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DMH', name: 'Department of Mental Health', head: 'Dr. Jerry Paul Ninnoni', employees: 12, location: 'School of Nursing', email: 'mental.health@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPUBH', name: 'Department of Public Health', head: 'Dr. Paul Kwabla Effah', employees: 15, location: 'School of Nursing', email: 'nursing.public.health@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DBS', name: 'Department of Biomedical Sciences', head: 'Dr. Samuel Victor Nuvor', employees: 22, location: 'School of Allied Health', email: 'biomedical@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DHIM', name: 'Department of Health Information Management', head: 'Dr. Kwaku Brako', employees: 15, location: 'School of Allied Health', email: 'health.info@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DMIS', name: 'Department of Medical Imaging and Sonography', head: 'Dr. Benjamin Arko-Mensah', employees: 12, location: 'School of Allied Health', email: 'medical.imaging@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DMLT', name: 'Department of Medical Laboratory Technology', head: 'Dr. Richard Kobina Dadzie Ephraim', employees: 20, location: 'School of Allied Health', email: 'mlt@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DND', name: 'Department of Nutrition and Dietetics', head: 'Dr. Christian Laryea', employees: 15, location: 'School of Allied Health', email: 'nutrition@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPAS', name: 'Department of Physician Assistant Studies', head: 'Dr. Stephen Larbi-Mensah', employees: 12, location: 'School of Allied Health', email: 'pas@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPC', name: 'Department of Pharmaceutical Chemistry', head: 'Dr. Robert Peter Biney', employees: 12, location: 'School of Pharmacy', email: 'pharm.chem@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPM', name: 'Department of Pharmaceutical Microbiology', head: 'Dr. Joseph Ampofo-Asiama', employees: 10, location: 'School of Pharmacy', email: 'pharm.micro@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPHCS', name: 'Department of Pharmaceutics', head: 'Dr. Robert Adjawui', employees: 12, location: 'School of Pharmacy', email: 'pharmaceutics@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPCSY', name: 'Department of Pharmacognosy', head: 'Dr. Moses Jojo Eghan', employees: 10, location: 'School of Pharmacy', email: 'pharmacognosy@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPHARM2', name: 'Department of Pharmacology', head: 'Dr. Eric Debrah Otchere', employees: 10, location: 'School of Pharmacy', email: 'pharmacology.pharm@ucc.edu.gh', division: 'College of Health and Allied Sciences' },
  { id: 'DPP', name: 'Department of Pharmacy Practice', head: 'Dr. Sebastian Eliason', employees: 12, location: 'School of Pharmacy', email: 'pharmacy.practice@ucc.edu.gh', division: 'College of Health and Allied Sciences' },

  // School of Economics
  { id: 'DAPP_EC', name: 'Department of Applied Economics', head: 'Dr. Emmanuel Ekow Asmah', employees: 18, location: 'School of Economics', email: 'applied.econ@ucc.edu.gh', division: 'School of Economics' },
  { id: 'DDSEP', name: 'Department of Data Science and Economic Policy', head: 'Dr. William Baah-Boateng', employees: 15, location: 'School of Economics', email: 'data.science.econ@ucc.edu.gh', division: 'School of Economics' },
  { id: 'DES', name: 'Department of Economics Studies', head: 'Dr. James Atta Junior', employees: 20, location: 'School of Economics', email: 'economics.studies@ucc.edu.gh', division: 'School of Economics' },

  // IDS & IDS Related
  { id: 'DEGS', name: 'Department of Environment, Governance and Sustainable Development', head: 'Dr. Francis Enu-Kwesi', employees: 15, location: 'IDS', email: 'egsd@ucc.edu.gh', division: 'Institute of Development Studies' },
  { id: 'DIDS', name: 'Department of Integrated Development Studies', head: 'Dr. Emmanuel Tenkorang', employees: 18, location: 'IDS', email: 'ids@ucc.edu.gh', division: 'Institute of Development Studies' },
  { id: 'DLHR', name: 'Department of Labour and Human Resource Studies', head: 'Dr. Akua Opokua Britwum', employees: 12, location: 'IDS', email: 'labour.studies@ucc.edu.gh', division: 'Institute of Development Studies' },
  { id: 'DPS', name: 'Department of Peace Studies', head: 'Dr. Patrick Osei-Kufuor', employees: 10, location: 'IDS', email: 'peace.studies@ucc.edu.gh', division: 'Institute of Development Studies' },

  // CoDE
  { id: 'DMS_CODE', name: 'Department of Mathematics and Science (CoDE)', head: 'Dr. Douglas Darko Agyei', employees: 20, location: 'CoDE Block', email: 'ms.code@ucc.edu.gh', division: 'College of Distance Education' },
  { id: 'DBS_CODE', name: 'Department of Business Studies (CoDE)', head: 'Dr. Mohammed Sani Abdulai', employees: 25, location: 'CoDE Block', email: 'bs.code@ucc.edu.gh', division: 'College of Distance Education' },
  { id: 'DE_CODE', name: 'Department of Education (CoDE)', head: 'Dr. Sandra Amanfu', employees: 22, location: 'CoDE Block', email: 'edu.code@ucc.edu.gh', division: 'College of Distance Education' },
];

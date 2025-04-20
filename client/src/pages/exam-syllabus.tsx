import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ExamSyllabus = () => {
  const [_, setLocation] = useLocation();
  const [activeExam, setActiveExam] = useState("jee");

  // Sample syllabus data
  const syllabusData = {
    jee: {
      name: "JEE (Main & Advanced)",
      description: "Joint Entrance Examination for admission to undergraduate engineering programs at NITs, IITs, and other centrally funded technical institutions",
      subjects: [
        {
          name: "Physics",
          topics: [
            {
              name: "Mechanics",
              subtopics: [
                "Kinematics", "Laws of Motion", "Work, Energy and Power", 
                "Rotational Motion", "Gravitation", "Properties of Solids and Liquids"
              ]
            },
            {
              name: "Electrodynamics",
              subtopics: [
                "Current Electricity", "Magnetic Effects of Current and Magnetism", 
                "Electromagnetic Induction and Alternating Currents", "Electromagnetic Waves"
              ]
            },
            {
              name: "Optics and Modern Physics",
              subtopics: [
                "Ray Optics", "Wave Optics", "Dual Nature of Matter and Radiation", 
                "Atoms and Nuclei", "Electronic Devices"
              ]
            },
            {
              name: "Heat and Thermodynamics",
              subtopics: [
                "Thermal Properties", "Thermodynamics", "Kinetic Theory of Gases"
              ]
            }
          ]
        },
        {
          name: "Chemistry",
          topics: [
            {
              name: "Physical Chemistry",
              subtopics: [
                "States of Matter", "Atomic Structure", "Chemical Bonding", 
                "Chemical Thermodynamics", "Solutions", "Equilibrium", 
                "Redox Reactions and Electrochemistry", "Chemical Kinetics", "Surface Chemistry"
              ]
            },
            {
              name: "Organic Chemistry",
              subtopics: [
                "Basic Concepts", "Hydrocarbons", "Organic Compounds Containing Halogens", 
                "Organic Compounds Containing Oxygen", "Organic Compounds Containing Nitrogen", 
                "Polymers", "Biomolecules", "Chemistry in Everyday Life"
              ]
            },
            {
              name: "Inorganic Chemistry",
              subtopics: [
                "Classification of Elements and Periodicity in Properties", 
                "General Principles and Processes of Isolation of Metals", 
                "Hydrogen", "s-Block Elements", "p-Block Elements", 
                "d- and f-Block Elements", "Coordination Compounds", 
                "Environmental Chemistry"
              ]
            }
          ]
        },
        {
          name: "Mathematics",
          topics: [
            {
              name: "Algebra",
              subtopics: [
                "Complex Numbers", "Matrices and Determinants", "Sets, Relations and Functions", 
                "Mathematical Induction", "Permutations and Combinations", "Binomial Theorem", 
                "Sequences and Series", "Probability"
              ]
            },
            {
              name: "Calculus",
              subtopics: [
                "Limits, Continuity and Differentiability", "Functions", "Applications of Derivatives", 
                "Definite and Indefinite Integrals", "Applications of Integrals", "Differential Equations"
              ]
            },
            {
              name: "Coordinate Geometry",
              subtopics: [
                "Straight Lines", "Circles", "Conic Sections", "Three-dimensional Geometry"
              ]
            },
            {
              name: "Trigonometry",
              subtopics: [
                "Trigonometric Functions", "Trigonometric Equations", "Inverse Trigonometric Functions", 
                "Heights and Distances", "Properties of Triangles"
              ]
            },
            {
              name: "Vector Algebra",
              subtopics: [
                "Vectors and Scalars", "Addition of Vectors", "Product of Vectors"
              ]
            }
          ]
        }
      ]
    },
    neet: {
      name: "NEET UG",
      description: "National Eligibility cum Entrance Test for admission to undergraduate medical courses in India",
      subjects: [
        {
          name: "Physics",
          topics: [
            {
              name: "Physical World and Measurement",
              subtopics: [
                "Physics: Scope and Excitement", "Nature of Physical Laws", 
                "Physics, Technology and Society", "Need for Measurement", 
                "Units of Measurement", "Systems of Units", "SI Units", 
                "Fundamental and Derived Units", "Length, Mass and Time Measurements", 
                "Accuracy and Precision of Measuring Instruments", "Errors in Measurement", 
                "Dimensions of Physical Quantities", "Dimensional Analysis and its Applications"
              ]
            },
            {
              name: "Kinematics",
              subtopics: [
                "Frame of Reference", "Motion in a Straight Line", "Position-time Graph", 
                "Speed and Velocity", "Uniform and Non-uniform Motion", "Average Speed and Instantaneous Velocity", 
                "Uniformly Accelerated Motion", "Velocity-time and Position-time Graphs for Uniformly Accelerated Motion", 
                "Relations for Uniformly Accelerated Motion", "Scalar and Vector Quantities", 
                "Position and Displacement Vectors", "Equality of Vectors", "Multiplication of Vectors by a Real Number", 
                "Addition and Subtraction of Vectors", "Relative Velocity", 
                "Unit Vector", "Resolution of a Vector in a Plane", "Rectangular Components", 
                "Scalar and Vector Products of Vectors", "Motion in a Plane", 
                "Cases of Uniform Velocity and Uniform Acceleration-Projectile Motion", "Uniform Circular Motion"
              ]
            },
            // Other physics topics...
          ]
        },
        {
          name: "Chemistry",
          topics: [
            {
              name: "Some Basic Concepts of Chemistry",
              subtopics: [
                "Importance of Chemistry", "Nature of Matter", "Properties of Matter and their Measurement", 
                "Uncertainty in Measurement", "Laws of Chemical Combinations", "Dalton's Atomic Theory", 
                "Atomic and Molecular Masses", "Mole Concept and Molar Mass", "Percentage Composition", 
                "Empirical and Molecular Formula", "Chemical Reactions", "Stoichiometry and Calculations based on Stoichiometry"
              ]
            },
            // Other chemistry topics...
          ]
        },
        {
          name: "Biology",
          topics: [
            {
              name: "Diversity in Living World",
              subtopics: [
                "What is Living?", "Biodiversity", "Need for Classification", 
                "Taxonomy and Systematics", "Three Domains of Life", "Concept of Species and Taxonomical Hierarchy", 
                "Binomial Nomenclature", "Tools for Study of Taxonomy – Museums, Zoos, Herbaria, Botanical Gardens"
              ]
            },
            {
              name: "Structural Organisation in Animals and Plants",
              subtopics: [
                "Morphology and Modifications in Plants", "Tissues", "Anatomy and Functions of Different Parts of Flowering Plants", 
                "Morphology, Anatomy and Functions of Different Systems of an Annelid, an Insect and a Frog"
              ]
            },
            // Other biology topics...
          ]
        }
      ]
    },
    cat: {
      name: "CAT",
      description: "Common Admission Test for admission to postgraduate management programs at IIMs and other top business schools in India",
      subjects: [
        {
          name: "Quantitative Aptitude",
          topics: [
            {
              name: "Number Systems",
              subtopics: [
                "LCM and HCF", "Factorial", "Divisibility", "Remainders", "Fractions and Decimals"
              ]
            },
            {
              name: "Algebra",
              subtopics: [
                "Linear and Quadratic Equations", "Inequalities", "Functions", "Logarithm", "Progressions", "Binomial Theorem"
              ]
            },
            {
              name: "Geometry",
              subtopics: [
                "Lines and Angles", "Triangles", "Circles", "Quadrilaterals", "Coordinate Geometry", "3-D Geometry"
              ]
            },
            {
              name: "Mensuration",
              subtopics: [
                "Areas", "Volumes", "Surface Areas"
              ]
            },
            {
              name: "Statistics and Data Interpretation",
              subtopics: [
                "Measures of Central Tendency and Dispersion", "Probability", "Permutation and Combination", "Data Interpretation"
              ]
            }
          ]
        },
        {
          name: "Verbal Ability and Reading Comprehension",
          topics: [
            {
              name: "Reading Comprehension",
              subtopics: [
                "Long Passages", "Short Passages", "Para Jumbles", "Para Summary", "Para Completion"
              ]
            },
            {
              name: "Verbal Ability",
              subtopics: [
                "Grammar", "Vocabulary", "Fill in the Blanks", "Verbal Reasoning", "Sentence Correction"
              ]
            }
          ]
        },
        {
          name: "Data Interpretation and Logical Reasoning",
          topics: [
            {
              name: "Logical Reasoning",
              subtopics: [
                "Seating Arrangement", "Blood Relations", "Syllogisms", "Binary Logic", "Clocks and Calendars", "Sets and Venn Diagrams"
              ]
            },
            {
              name: "Data Interpretation",
              subtopics: [
                "Tables", "Charts", "Graphs", "Caselets", "Data Sufficiency"
              ]
            }
          ]
        }
      ]
    },
    upsc: {
      name: "UPSC CSE",
      description: "Civil Services Examination conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India",
      subjects: [
        {
          name: "Preliminary Examination - General Studies Paper I",
          topics: [
            {
              name: "Current Events of National and International Importance",
              subtopics: []
            },
            {
              name: "History of India and Indian National Movement",
              subtopics: []
            },
            {
              name: "Indian and World Geography",
              subtopics: []
            },
            {
              name: "Indian Polity and Governance",
              subtopics: []
            },
            {
              name: "Economic and Social Development",
              subtopics: []
            },
            {
              name: "Environmental Ecology, Biodiversity and Climate Change",
              subtopics: []
            },
            {
              name: "General Science",
              subtopics: []
            }
          ]
        },
        {
          name: "Preliminary Examination - General Studies Paper II (CSAT)",
          topics: [
            {
              name: "Comprehension",
              subtopics: []
            },
            {
              name: "Interpersonal Skills",
              subtopics: []
            },
            {
              name: "Logical Reasoning and Analytical Ability",
              subtopics: []
            },
            {
              name: "Decision Making and Problem Solving",
              subtopics: []
            },
            {
              name: "General Mental Ability",
              subtopics: []
            },
            {
              name: "Basic Numeracy",
              subtopics: []
            },
            {
              name: "Data Interpretation",
              subtopics: []
            },
            {
              name: "English Language Comprehension",
              subtopics: []
            }
          ]
        },
        {
          name: "Main Examination",
          topics: [
            {
              name: "Essay",
              subtopics: []
            },
            {
              name: "General Studies I - Indian Heritage and Culture, History and Geography",
              subtopics: []
            },
            {
              name: "General Studies II - Governance, Constitution, Polity, Social Justice",
              subtopics: []
            },
            {
              name: "General Studies III - Technology, Economic Development, Biodiversity, Security",
              subtopics: []
            },
            {
              name: "General Studies IV - Ethics, Integrity and Aptitude",
              subtopics: []
            },
            {
              name: "Optional Subject Papers I & II",
              subtopics: []
            }
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icons.logo className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl cursor-pointer" onClick={() => setLocation("/home")}>MockPrep.online</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setLocation("/auth")}>
                Log In
              </Button>
              <Button onClick={() => setLocation("/register")}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Exam Syllabus</h1>
              <p className="text-gray-600">Comprehensive syllabus for major competitive exams in India</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" onClick={() => setLocation("/college-rankings")}>
                College Rankings
              </Button>
              <Button variant="outline" onClick={() => setLocation("/exam-updates")}>
                Exam Updates
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <Tabs defaultValue={activeExam} className="w-full" onValueChange={(value) => setActiveExam(value)}>
              <TabsList className="grid grid-cols-4 bg-gray-100 p-0 h-auto border-b">
                <TabsTrigger className="py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary" value="jee">JEE</TabsTrigger>
                <TabsTrigger className="py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary" value="neet">NEET</TabsTrigger>
                <TabsTrigger className="py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary" value="cat">CAT</TabsTrigger>
                <TabsTrigger className="py-3 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary" value="upsc">UPSC CSE</TabsTrigger>
              </TabsList>
              
              {Object.entries(syllabusData).map(([key, exam]) => (
                <TabsContent key={key} value={key} className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{exam.name} Syllabus</h2>
                    <p className="text-gray-700">{exam.description}</p>
                  </div>
                  
                  {exam.subjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="mb-6">
                      <h3 className="text-xl font-bold mb-4 text-primary">{subject.name}</h3>
                      
                      <Accordion type="multiple" className="space-y-2">
                        {subject.topics.map((topic, topicIndex) => (
                          <AccordionItem 
                            key={topicIndex} 
                            value={`${subject.name}-${topic.name}`}
                            className="border rounded-lg overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 hover:no-underline">
                              {topic.name}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              {topic.subtopics.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {topic.subtopics.map((subtopic, subtopicIndex) => (
                                    <li key={subtopicIndex} className="text-gray-700">{subtopic}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-700 italic">
                                  Detailed syllabus available in our premium mock tests.
                                </p>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                  
                  <div className="mt-8 flex justify-center">
                    <Button onClick={() => setLocation(`/exam/${key}`)}>
                      Prepare for {exam.name} Exam
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Study Resources and Mock Tests</h2>
            <p className="text-gray-700 mb-4">
              Our comprehensive mock tests cover the entire syllabus with detailed solutions and performance analytics. Sign up to access high-quality practice materials and improve your exam preparation.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => setLocation("/register")}>
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExamSyllabus;
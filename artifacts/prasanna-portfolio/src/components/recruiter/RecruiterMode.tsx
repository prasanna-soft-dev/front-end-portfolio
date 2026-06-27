import { useAppStore } from '@/store/appStore';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RecruiterModeToggle() {
  const { recruiterMode, setRecruiterMode } = useAppStore();

  if (recruiterMode) return null;

  return (
    <button
      onClick={() => setRecruiterMode(true)}
      className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-2 rounded-full border-primary flex items-center gap-2 text-white font-mono text-sm hover:bg-primary/20 transition-all glow-border animate-bounce hover:animate-none"
    >
      <span className="text-xl">👔</span> Recruiter Mode
    </button>
  );
}

export function RecruiterMode() {
  const { recruiterMode, setRecruiterMode } = useAppStore();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/PRASANNA%20T_RESUME.pdf';
    link.download = 'Prasanna_T_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {recruiterMode && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-[100] bg-slate-100 text-slate-900 overflow-y-auto print:static print:bg-white print:overflow-visible"
        >
          <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10 relative">
            <button
              onClick={() => setRecruiterMode(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white shadow-sm hover:bg-slate-100 transition-colors z-10 print:hidden"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <header className="bg-slate-900 text-white px-6 py-8 md:px-10 md:py-10">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-100 transition-colors hover:bg-white/20"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-200">
                      Software Developer
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">PRASANNA T</h1>
                      <p className="mt-2 text-lg text-slate-200">1+ Year | Java | Spring Boot | Backend Engineering</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                      <span>Tiruchirappalli, India</span>
                      <span>+91 7397141898</span>
                      <span>prasannat857@gmail.com</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      <span>LinkedIn</span>
                      <span>GitHub</span>
                      <span>LeetCode</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-slate-200 md:min-w-[220px]">
                    <p className="font-semibold text-white">Immediate Joiner</p>
                    <p className="mt-1">Dorustree • Software Developer Trainee</p>
                  </div>
                </div>
              </header>

              <main className="px-6 py-8 md:px-10 md:py-10">
                <p className="text-slate-700 leading-7 mb-8">
                  Software Developer with 1+ year of experience building scalable backend systems, high-performance APIs,
                  and database-driven applications using Java and Spring Boot. Experienced in designing reliable software
                  components, optimizing performance, solving complex engineering problems, and delivering production-ready
                  systems in Agile environments.
                </p>

                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-xl font-semibold text-slate-900 mb-4">Professional Experience</h2>
                      <div className="space-y-6">
                        <article className="border-l-2 border-slate-200 pl-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg text-slate-900">Dorustree, Tiruchirappalli</h3>
                              <p className="text-slate-600">Software Developer Trainee</p>
                            </div>
                            <span className="text-sm text-slate-500">Jun 2025 – Present</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-3">Immediate Joiner</p>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">
                                Education Management System — Backend Engineering + API Development
                              </h4>
                              <p className="text-sm text-slate-500 mb-2">Jul 2025 – Jan 2026</p>
                              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                                <li>Owned design and development of scalable REST APIs across Student, Staff, Tasks, and Finance modules, improving operational efficiency by 30%.</li>
                                <li>Improved database performance by 20% through query optimization, relational modeling improvements, and efficient use of Spring Data JPA.</li>
                                <li>Reduced integration defects by 25% by building and validating 20+ APIs with structured request-response contracts using Postman and Swagger.</li>
                                <li>Implemented reusable backend components and transaction-safe business logic, improving maintainability and reducing defect leakage.</li>
                                <li>Increased system reliability through performance tuning, structured debugging, and exception handling improvements for high-volume request processing.</li>
                                <li>Drove end-to-end API delivery in collaboration with frontend teams, improving integration stability and reducing turnaround for issue resolution.</li>
                                <li>Contributed to code quality through reviews, defect fixes, and production support, improving platform stability and engineering consistency.</li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">
                                Rig Lift Management System — Backend Logic + Domain Engineering
                              </h4>
                              <p className="text-sm text-slate-500 mb-2">Oct 2025 – Nov 2025</p>
                              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                                <li>Designed and implemented backend services supporting lift planning workflows, improving planning efficiency and reducing manual effort.</li>
                                <li>Built calculation logic for lift weights and constraint validation, improving operational planning accuracy by 30%.</li>
                                <li>Reduced manual risk assessment effort by 25% through automation of pre-lift validation checks.</li>
                                <li>Improved transactional efficiency through optimized data access patterns and backend performance enhancements.</li>
                                <li>Translated complex domain requirements into scalable engineering solutions through direct collaboration with clients and iterative feature refinement.</li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">
                                Travel Marketing Platform — Frontend + Integration Support
                              </h4>
                              <p className="text-sm text-slate-500 mb-2">Jan 2026 – Present</p>
                              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                                <li>Delivered frontend enhancements using Angular and supported backend API integrations, improving application usability and end-to-end reliability.</li>
                                <li>Reduced production defects by 20% through targeted bug fixes, integration troubleshooting, and issue resolution.</li>
                                <li>Improved turnaround for integration defects by 20% through API validation, debugging, and collaborative problem-solving.</li>
                                <li>Contributed within microservices-oriented workflows with exposure to distributed communication and event-driven patterns.</li>
                              </ul>
                            </div>
                          </div>
                        </article>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h2 className="text-xl font-semibold text-slate-900 mb-4">Core Competencies</h2>
                      <div className="space-y-3 text-sm text-slate-600">
                        <div>
                          <p className="font-semibold text-slate-800">Programming</p>
                          <p>Java, SQL, OOP, Data Structures, Algorithms, Collections, Exception Handling</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Backend Development</p>
                          <p>Spring Boot, Spring MVC, REST APIs, Spring Security, Transaction Management, Multithreading</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Data & Persistence</p>
                          <p>Spring Data JPA, Hibernate, MySQL, PostgreSQL, Database Design, Query Optimization, Indexing</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Architecture</p>
                          <p>Microservices Fundamentals, Distributed Systems, API Gateway, Event-Driven Architecture, Kafka (Exposure)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">API Engineering</p>
                          <p>RESTful Services, Auth, Authorization, Error Handling, Validation, Swagger, Postman</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Performance & Quality</p>
                          <p>Debugging, Performance Tuning, Code Reviews, Low-Latency Processing, Defect Prevention</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">DevOps & Delivery</p>
                          <p>Git, GitHub, Docker, CI/CD Fundamentals, Deployment Support</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Design Principles</p>
                          <p>SOLID Principles, Reusable Components, Design Patterns, Modular Architecture</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-slate-900 mb-4">Certifications</h2>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Programming in Core Java</li>
                        <li>• Advanced Programming in C</li>
                        <li>• Spring (3 & 6) and Hibernate Course</li>
                        <li>• IBM Cloud Technology Basics</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-slate-900 mb-4">Education</h2>
                      <div className="text-sm text-slate-600">
                        <p className="font-semibold text-slate-800">B.E — Computer Science and Engineering (2024)</p>
                        <p>Dhanalakshmi Srinivasan Institute of Technology</p>
                        <p>CGPA: 8.38</p>
                      </div>
                    </section>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

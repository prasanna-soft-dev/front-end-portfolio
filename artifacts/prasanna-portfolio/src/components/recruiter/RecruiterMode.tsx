import { useAppStore } from '@/store/appStore';
import { X, Download, Github, Linkedin, Mail } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {recruiterMode && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-[100] bg-white text-slate-900 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto p-6 md:p-12 relative">
            <button 
              onClick={() => setRecruiterMode(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>

            <header className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-12 border-b pb-8">
              <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-white text-3xl font-bold">
                PB
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Prasanna</h1>
                <h2 className="text-xl text-slate-600 mb-4">Senior Backend Engineer</h2>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4"/> prasanna@example.com</span>
                  <span className="flex items-center gap-1"><Linkedin className="w-4 h-4"/> linkedin.com/in/prasanna</span>
                  <span className="flex items-center gap-1"><Github className="w-4 h-4"/> github.com/prasanna</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                <Download className="w-4 h-4" /> Download Resume
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-1 bg-slate-900"></span> Experience
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg">Senior Backend Engineer</h4>
                          <div className="text-slate-600">TechCorp Inc.</div>
                        </div>
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded">2021 - Present</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                        <li>Architected and migrated legacy monolith to Spring Boot microservices, reducing latency by 40%.</li>
                        <li>Designed distributed payment processing pipeline handling $5M+ daily volume with 99.99% uptime.</li>
                        <li>Implemented event-driven architecture using Kafka, decoupling services and improving system resilience.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg">Software Engineer</h4>
                          <div className="text-slate-600">StartupX</div>
                        </div>
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded">2019 - 2021</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                        <li>Developed RESTful APIs serving 1M+ MAU using Java and Spring Framework.</li>
                        <li>Optimized complex MySQL queries, improving database response times by 60%.</li>
                        <li>Set up CI/CD pipelines using GitHub Actions and Docker.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-1 bg-slate-900"></span> Key Projects
                  </h3>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2">E-Commerce Microservices Platform</h4>
                      <p className="text-slate-600 mb-4">A fully functional distributed e-commerce backend with order management, inventory locking, and payment processing.</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-600">Spring Boot</span>
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-600">Kafka</span>
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-600">Redis</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2">Real-Time Chat System</h4>
                      <p className="text-slate-600 mb-4">High-throughput WebSocket server utilizing Redis pub/sub for horizontal scaling across multiple nodes.</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-600">WebSocket</span>
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-600">Redis</span>
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-600">MongoDB</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-12">
                <section>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">Core Skills</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Java / Spring Boot</span>
                        <span className="text-slate-500">Expert</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-slate-900 h-2 rounded-full w-[95%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">System Design</span>
                        <span className="text-slate-500">Advanced</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-slate-900 h-2 rounded-full w-[90%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Databases (SQL/NoSQL)</span>
                        <span className="text-slate-500">Advanced</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-slate-900 h-2 rounded-full w-[85%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Docker & K8s</span>
                        <span className="text-slate-500">Intermediate</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-slate-900 h-2 rounded-full w-[75%]"></div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">Education</h3>
                  <div className="mb-4">
                    <h4 className="font-bold">B.S. Computer Science</h4>
                    <div className="text-slate-600 text-sm">University of Technology</div>
                    <div className="text-slate-500 text-sm">2015 - 2019</div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">Certifications</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>AWS Certified Solutions Architect</li>
                    <li>Oracle Certified Professional, Java SE</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

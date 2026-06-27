import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Key, Type, Hash, Play, TerminalSquare, Calendar, Link2 } from 'lucide-react';

const schema = {
  users: {
    columns: [
      { name: 'id', type: 'uuid', key: 'PK' },
      { name: 'email', type: 'varchar(255)', key: 'UNIQ' },
      { name: 'name', type: 'varchar(100)' },
      { name: 'role', type: 'enum' },
      { name: 'created_at', type: 'timestamp' }
    ],
    indexes: ['idx_users_email', 'idx_users_created_at']
  },
  orders: {
    columns: [
      { name: 'id', type: 'uuid', key: 'PK' },
      { name: 'user_id', type: 'uuid', key: 'FK' },
      { name: 'status', type: 'varchar(50)' },
      { name: 'total', type: 'decimal(10,2)' },
      { name: 'created_at', type: 'timestamp' }
    ],
    indexes: ['idx_orders_user_status']
  },
  projects: {
    columns: [
      { name: 'id', type: 'serial', key: 'PK' },
      { name: 'developer', type: 'varchar(100)', key: 'IDX' },
      { name: 'name', type: 'varchar(255)' },
      { name: 'tech_stack', type: 'jsonb' },
      { name: 'status', type: 'varchar(50)' }
    ],
    indexes: ['idx_proj_dev', 'gin_idx_tech_stack']
  }
};

const queryStr = `SELECT p.name, p.tech_stack, COUNT(o.id) as order_count
FROM projects p
LEFT JOIN orders o ON p.developer = o.developer_id  
WHERE p.developer = 'Prasanna'
GROUP BY p.id
ORDER BY order_count DESC;`;

export function DatabaseExplorer() {
  const [activeTable, setActiveTable] = useState('projects');
  const [typedQuery, setTypedQuery] = useState('');
  const [queryRunning, setQueryRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const runQuery = () => {
    setQueryRunning(true);
    setShowResults(false);
    setTypedQuery('');
    
    let i = 0;
    const interval = setInterval(() => {
      setTypedQuery(queryStr.slice(0, i + 1));
      i++;
      if (i >= queryStr.length) {
        clearInterval(interval);
        setTimeout(() => {
          setQueryRunning(false);
          setShowResults(true);
        }, 500);
      }
    }, 20);
  };

  return (
    <section id="database" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-[#E6892E] mr-2">/</span>
          Database Schema Explorer
        </h2>
        <div className="h-1 w-24 bg-[#E6892E] shadow-[0_0_10px_rgba(230,137,46,0.5)] rounded mb-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Schema Viewer */}
          <div className="lg:col-span-5 space-y-4">
            {Object.entries(schema).map(([tableName, data]) => (
              <div 
                key={tableName} 
                onClick={() => setActiveTable(tableName)}
                className={`glass-panel rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeTable === tableName 
                    ? 'border-[#E6892E] shadow-[0_0_15px_rgba(230,137,46,0.2)]' 
                    : 'border-primary/20 hover:border-[#E6892E]/50 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`p-3 border-b flex items-center gap-3 font-mono font-bold text-white ${
                  activeTable === tableName ? 'bg-[#E6892E]/20 border-[#E6892E]/30' : 'bg-background border-primary/20'
                }`}>
                  <Database className={activeTable === tableName ? 'text-[#E6892E]' : 'text-muted-foreground'} size={18} />
                  {tableName}
                </div>
                
                <AnimatePresence>
                  {activeTable === tableName && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 'auto' }} 
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-black/20"
                    >
                      <div className="p-0">
                        {data.columns.map(col => (
                          <div key={col.name} className="flex justify-between items-center px-4 py-2 border-b border-white/5 last:border-0 font-mono text-sm hover:bg-white/5">
                            <div className="flex items-center gap-2">
                              {col.key === 'PK' ? <Key size={14} className="text-[#E6892E]" /> :
                               col.key === 'FK' ? <Link2 size={14} className="text-secondary" /> :
                               col.type.includes('char') ? <Type size={14} className="text-muted-foreground" /> :
                               col.type.includes('time') ? <Calendar size={14} className="text-muted-foreground" /> :
                               <Hash size={14} className="text-muted-foreground" />}
                              <span className={col.key === 'PK' ? 'text-white font-bold' : 'text-white/80'}>{col.name}</span>
                            </div>
                            <span className="text-primary/70">{col.type}</span>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 bg-[#E6892E]/5 border-t border-[#E6892E]/20 text-xs font-mono text-[#E6892E]/80">
                        Indexes: {data.indexes.join(', ')}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Query Editor & Results */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-panel p-4 rounded-lg border-[#E6892E]/30 flex-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <TerminalSquare size={16} className="text-[#E6892E]" /> query.sql
                </div>
                <button 
                  onClick={runQuery}
                  disabled={queryRunning}
                  className="flex items-center gap-1 px-3 py-1 bg-[#E6892E]/20 text-[#E6892E] rounded border border-[#E6892E]/50 hover:bg-[#E6892E] hover:text-white transition-colors disabled:opacity-50 text-xs font-mono"
                >
                  <Play size={12} /> {queryRunning ? 'Executing...' : 'Run Query'}
                </button>
              </div>
              
              <div className="font-mono text-sm leading-relaxed p-4 bg-[#0a0f1d] rounded border border-white/5 h-48 overflow-y-auto text-white/90">
                <pre><code className="language-sql text-primary">
                  {typedQuery || (
                    <span className="text-muted-foreground italic">-- Click 'Run Query' to simulate complex JOIN</span>
                  )}
                  {queryRunning && <span className="inline-block w-2 h-4 bg-[#E6892E] animate-pulse ml-1 align-middle"></span>}
                </code></pre>
              </div>

              {/* Execution Plan & Results */}
              <AnimatePresence>
                {showResults && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground mb-2">EXPLAIN ANALYZE</h4>
                      <div className="flex items-center gap-2 text-xs font-mono bg-black/30 p-2 rounded border border-white/5 overflow-x-auto">
                        <span className="text-destructive whitespace-nowrap">Seq Scan (projects)</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-secondary whitespace-nowrap">Hash Join</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-accent whitespace-nowrap">Index Scan (orders)</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-primary whitespace-nowrap">Sort</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground mb-2">RESULTS (3 rows, 42ms)</h4>
                      <div className="overflow-x-auto border border-white/10 rounded">
                        <table className="w-full text-left text-sm font-mono">
                          <thead className="bg-white/5 text-primary">
                            <tr>
                              <th className="p-2 border-b border-white/10">name</th>
                              <th className="p-2 border-b border-white/10">tech_stack</th>
                              <th className="p-2 border-b border-white/10">order_count</th>
                            </tr>
                          </thead>
                          <tbody className="text-white/80">
                            <tr className="hover:bg-white/5 border-b border-white/5">
                              <td className="p-2">E-Commerce Platform</td>
                              <td className="p-2 text-secondary">["Spring Boot", "MySQL", "Kafka"]</td>
                              <td className="p-2 text-[#E6892E]">1,245</td>
                            </tr>
                            <tr className="hover:bg-white/5 border-b border-white/5">
                              <td className="p-2">Payment Gateway</td>
                              <td className="p-2 text-secondary">["Spring Boot", "PostgreSQL"]</td>
                              <td className="p-2 text-[#E6892E]">892</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                              <td className="p-2">Chat System</td>
                              <td className="p-2 text-secondary">["Node.js", "Redis", "MongoDB"]</td>
                              <td className="p-2 text-[#E6892E]">0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { Terminal as TerminalIcon } from 'lucide-react';

const COMMANDS: Record<string, string> = {
  'help': 'Available commands: help, about, skills, projects, experience, architecture, metrics, resume, contact, system-design, clear, kubectl get pods, docker ps, redis-cli info',
  'about': 'Prasanna is a Backend Engineer with 4+ years experience building scalable Java/Spring Boot systems. Obsessed with performance, distributed systems, and clean architecture.',
  'skills': `+----------------+----------+\n| Skill          | Level    |\n+----------------+----------+\n| Java           | 95%      |\n| Spring Boot    | 90%      |\n| MySQL          | 88%      |\n| Redis          | 82%      |\n| Kafka          | 75%      |\n+----------------+----------+`,
  'projects': '1. E-Commerce Platform\n2. Real-Time Chat System\n3. Payment Gateway\n4. URL Shortener\nType "show architecture" to see more.',
  'experience': '2020-Present: Senior Backend Engineer @ TechCorp\n2018-2020: Software Engineer @ StartupX',
  'architecture': `   [Client] -> [API Gateway] -> [Auth]\n                    |\n            +-------+-------+\n            |               |\n       [Order Svc]    [Payment Svc]\n            |               |\n         [Kafka]         [MySQL]`,
  'metrics': 'Commits: 2847 | Projects: 12 | APIs: 47',
  'resume': 'Opening resume... \nPrasanna_Resume.pdf\n- Backend Engineer\n- 4 YOE\n- Java, Spring, Microservices',
  'contact': 'Email: prasanna@example.com | LinkedIn: linkedin.com/in/prasanna | GitHub: github.com/prasanna',
  'system-design': 'Client -> LB -> App Servers -> Cache -> DB\n           |-> Message Queue -> Workers',
  'kubectl get pods': `NAME                                READY   STATUS    RESTARTS   AGE\napi-gateway-7b5c5f4d9-x8q2z         1/1     Running   0          2d\nauth-service-5d8f6c9b4-k9m3p        1/1     Running   0          5d\npayment-service-8f4b9d2c1-p2w5v     1/1     Running   0          12h\norder-service-6c7d8e9f2-t4n7x       1/1     Running   2          1d`,
  'docker ps': `CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS                               NAMES\na1b2c3d4e5f6   redis:7-alpine        "docker-entrypoint.s…"   2 days ago     Up 2 days     0.0.0.0:6379->6379/tcp              redis-cache\nb2c3d4e5f6a1   mysql:8.0             "docker-entrypoint.s…"   5 days ago     Up 5 days     0.0.0.0:3306->3306/tcp              mysql-primary\nc3d4e5f6a1b2   confluentinc/cp-kafka "/etc/confluent/dock…"   12 hours ago   Up 12 hours   0.0.0.0:9092->9092/tcp              kafka-broker`,
  'redis-cli info': `# Server\nredis_version:7.0.11\nredis_mode:cluster\n# Memory\nused_memory:1.2G\nused_memory_human:1.20G\n# Stats\ntotal_connections_received:849201\nkeyspace_hits:9421034\nkeyspace_misses:120485`,
  'show architecture': `Client -> API Gateway -> Microservices (Order, Payment, Auth) -> Kafka -> DB`,
  'simulate request': `Connecting... OK\nAuthenticating... OK\nProcessing... OK\nResponse: 200 OK (12ms)`
};

export function InteractiveTerminal() {
  const { terminalHistory, addTerminalCommand } = useAppStore();
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!input.trim()) return;
      
      addTerminalCommand(`$ ${input}`);
      
      const cmd = input.trim().toLowerCase();
      if (cmd === 'clear') {
        useAppStore.setState({ terminalHistory: [] });
      } else {
        const output = COMMANDS[cmd] || `command not found: ${cmd}. Type 'help' for available commands.`;
        addTerminalCommand(output);
      }
      
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = terminalHistory.filter(h => h.startsWith('$ ')).map(h => h.substring(2));
      if (commands.length > 0 && historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = terminalHistory.filter(h => h.startsWith('$ ')).map(h => h.substring(2));
        setInput(commands[commands.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matchingCommands = Object.keys(COMMANDS).filter(c => c.startsWith(input.toLowerCase()));
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  return (
    <section id="terminal" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-primary mr-2">/</span>
          Interactive Terminal
        </h2>
        <div className="h-1 w-24 bg-primary glow-border rounded mb-12"></div>

        <div className="glass-panel rounded-lg border-primary/30 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.1)]">
          <div className="bg-[#0f172a] px-4 py-2 flex items-center gap-2 border-b border-white/10">
            <TerminalIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">prasanna@backend-cmd:~</span>
          </div>
          
          <div className="p-4 h-[500px] overflow-y-auto bg-[#0a0f1d] font-mono text-sm" onClick={() => document.getElementById('terminal-input')?.focus()}>
            <div className="text-primary/80 mb-4 whitespace-pre-wrap">
{`____  ____      _    ____    _    _   _ _   _    _    
|  _ \\|  _ \\    / \\  / ___|  / \\  | \\ | | \\ | |  / \\   
| |_) | |_) |  / _ \\ \\___ \\ / _ \\ |  \\| |  \\| | / _ \\  
|  __/|  _ <  / ___ \\ ___) / ___ \\| |\\  | |\\  |/ ___ \\ 
|_|   |_| \\_\\/_/   \\_\\____/_/   \\_\\_| \\_|_| \\_/_/   \\_\\

Welcome to the Backend Command Center.
Type 'help' to see available commands.`}
            </div>

            <div className="space-y-1">
              {terminalHistory.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap ${line.startsWith('$') ? 'text-primary' : 'text-white/80'}`}>
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center mt-2">
              <span className="text-accent mr-2">prasanna@backend-cmd:~$</span>
              <input
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-primary focus:ring-0 p-0"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={endOfTerminalRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

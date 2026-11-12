import { useState, useEffect } from 'react'
import Header from './Header'
import AgentsSection from './AgentsSection'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [count, setCount] = useState(0)
  const [inputText, setInputText] = useState('')

  const [agents, setAgents] = useState(() => {
    const savedAgents = localStorage.getItem('cyber_agents')
    if (savedAgents) {
      return JSON.parse(savedAgents)
    }
    return [
      { id: 1, name: "Vikram Rathore", email: "vikram@gmail.com", city: "Chennai" },
      { id: 2, name: "Ananya Sharma", email: "ananya@gmail.com", city: "Bangalore" },
      { id: 3, name: "Karthik Raja", email: "karthik@gmail.com", city: "Madurai" }
    ]
  })

  useEffect(() => {
    localStorage.setItem('cyber_agents', JSON.stringify(agents))
  }, [agents])

  const systemLogs = [
    { id: 1, title: "Firewall Security", status: "Active" },
    { id: 2, title: "Database Connection", status: "Connected" },
    { id: 3, title: "AI Neural Engine", status: "Standby" },
    { id: 4, title: "Cloud Backup Sync", status: "Completed" }
  ]

  function handleAddAgent(name, city) {
    const newAgent = {
      id: Date.now(),
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city: city
    }
    setAgents([...agents, newAgent])
  }

  function handleDeleteAgent(idToDelete) {
    setAgents(agents.filter((agent) => agent.id !== idToDelete))
  }

  // --- NEW: AGENT CITY-AH UPDATE PANRA FUNCTION ---
  function handleUpdateCity(idToUpdate, newCity) {
    const updatedAgents = agents.map((agent) =>
      agent.id === idToUpdate ? { ...agent, city: newCity } : agent
    )
    setAgents(updatedAgents)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 font-sans">
      <div className="max-w-md mx-auto text-center">
        
        <Header developerName="Valavan" />

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition ${
              activeTab === 'agents' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Agents ({agents.length})
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="bg-slate-900 p-7 rounded-2xl border border-slate-800 shadow-xl mb-6">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Live Traffic Hits</h3>
              <h2 className="text-5xl font-extrabold text-blue-500 my-4">{count}</h2>
              <button 
                onClick={() => setCount(count + 1)} 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                Update Metrics
              </button>
            </div>

            <div className="bg-slate-900 p-7 rounded-2xl border border-slate-800 shadow-xl mb-6">
              <h4 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4">Cyber Terminal Input</h4>
              <input 
                type="text" 
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Any command type here..."
                className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 mb-4"
              />
              <div className="bg-black p-4 rounded-xl text-left min-h-[60px] border border-slate-800 font-mono text-sm">
                <span className="text-sky-400">valavan@cyber-root:# </span>
                <span className="text-slate-200 break-all">{inputText}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-7 rounded-2xl border border-slate-800 shadow-xl text-left">
              <h4 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4 text-center">System Modules Status</h4>
              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-300 text-sm font-medium">{log.title}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agents Tab - onUpdateCity prop-aiyum anupurom */}
        {activeTab === 'agents' && (
          <AgentsSection 
            agents={agents} 
            onAddAgent={handleAddAgent} 
            onDeleteAgent={handleDeleteAgent}
            onUpdateCity={handleUpdateCity}
          />
        )}

      </div>
    </div>
  )
}

export default App

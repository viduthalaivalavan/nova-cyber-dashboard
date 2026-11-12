import { useState } from 'react'

function AgentsSection({ agents, onAddAgent, onDeleteAgent, onUpdateCity }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newCity, setNewCity] = useState('')

  // --- NEW: EDIT MODE MEMORY ---
  const [editingId, setEditingId] = useState(null)
  const [editCityValue, setEditCityValue] = useState('')

  function handleAddClick() {
    if (newName.trim() === '' || newCity.trim() === '') return
    onAddAgent(newName, newCity)
    setNewName('')
    setNewCity('')
  }

  // Edit button click panna andha row-ah edit mode-ku maathum
  function startEditing(agent) {
    setEditingId(agent.id)
    setEditCityValue(agent.city)
  }

  // Save button click panna pudhu city-ah save pannittu edit mode close pannum
  function saveEdit(id) {
    if (editCityValue.trim() === '') return
    onUpdateCity(id, editCityValue)
    setEditingId(null)
  }

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-slate-900 p-7 rounded-2xl border border-slate-800 shadow-xl text-left">
      <h4 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4 text-center">
        Cyber Agents Directory
      </h4>

      {/* Add New Agent Form */}
      <div className="flex gap-2 mb-4">
        <input 
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Agent Name..."
          className="w-1/2 p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
        />
        <input 
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="City..."
          className="w-1/3 p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
        />
        <button 
          onClick={handleAddClick}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 rounded-xl text-xs cursor-pointer transition"
        >
          + Add
        </button>
      </div>

      {/* Search Bar */}
      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or city..."
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-sky-500 mb-4"
      />

      {/* Agents List */}
      <div className="space-y-3">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <div 
              key={agent.id} 
              className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center"
            >
              <div>
                <p className="text-slate-200 text-sm font-bold m-0">{agent.name}</p>
                <p className="text-slate-500 text-xs mt-1 m-0">{agent.email}</p>
              </div>
              
              {/* EDIT MODE CHECK: Indha row edit mode-la irundha Input Box kaatum */}
              {editingId === agent.id ? (
                <div className="flex items-center gap-1.5">
                  <input 
                    type="text"
                    value={editCityValue}
                    onChange={(e) => setEditCityValue(e.target.value)}
                    className="w-24 p-1 bg-slate-900 border border-amber-500 rounded-lg text-slate-100 text-xs focus:outline-none"
                  />
                  <button 
                    onClick={() => saveEdit(agent.id)}
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-lg cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                    {agent.city}
                  </span>
                  <button 
                    onClick={() => startEditing(agent)}
                    className="text-xs bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white px-2 py-1 rounded-lg border border-amber-500/20 cursor-pointer transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDeleteAgent(agent.id)}
                    className="text-xs bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-2 py-1 rounded-lg border border-rose-500/20 cursor-pointer transition"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 text-sm py-4">No matching agents found!</p>
        )}
      </div>
    </div>
  )
}

export default AgentsSection

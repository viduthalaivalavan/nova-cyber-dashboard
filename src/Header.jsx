function Header(props) {
  return (
    <div className="bg-indigo-950 p-6 rounded-2xl mb-8 shadow-lg border border-indigo-800">
      <h1 className="text-blue-400 text-xl font-bold uppercase tracking-wider m-0">
        Nova Cyber Dashboard
      </h1>
      <p className="text-slate-200 mt-2 font-semibold">
        Welcome back, <span className="text-rose-500">{props.developerName}</span>!
      </p>
    </div>
  )
}

export default Header

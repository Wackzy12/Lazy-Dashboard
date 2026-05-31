export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search tasks..."
      className="
        w-half
        bg-slate-900
        border
        border-slate-700
        rounded-lg
        px-4
        py-2
        outline-none
        focus:border-blue-500
      "
    />
  )
}
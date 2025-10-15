export default function SimplePage({ title, children }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-display text-gray-700">{title}</h1>
      <div className="mt-6 text-gray-600 leading-relaxed">{children}</div>
    </main>
  )
}



const snippets = [
  "const build = async () => deploy()",
  "SELECT * FROM projects WHERE status = 'published'",
  "<Motion.div whileHover={{ scale: 1.02 }} />",
  "supabase.from('skills').select('*')"
];

export function AnimatedGridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[72px] left-0 right-0 h-[calc(100%+72px)] opacity-35 [background-image:linear-gradient(rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.12)_1px,transparent_1px)] [background-size:72px_72px] animate-grid-pan" />
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14),transparent_60%)]" />
      <div className="absolute bottom-0 right-0 h-[32rem] w-[60rem] bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.08),transparent_68%)]" />
      {snippets.map((snippet, index) => (
        <div
          key={snippet}
          className="absolute hidden rounded-lg border border-cyan-300/10 bg-slate-950/40 px-3 py-2 font-mono text-xs text-cyan-100/40 backdrop-blur md:block"
          style={{
            top: `${18 + index * 18}%`,
            left: index % 2 ? "76%" : "5%",
            animation: `float-y ${7 + index}s ease-in-out infinite`
          }}
        >
          {snippet}
        </div>
      ))}
    </div>
  );
}

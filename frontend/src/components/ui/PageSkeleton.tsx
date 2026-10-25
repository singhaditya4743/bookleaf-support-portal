export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-1/3 rounded-lg bg-slate-200" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-72 rounded-xl bg-slate-200 lg:col-span-2" />
        <div className="h-72 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

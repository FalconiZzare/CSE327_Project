import { HardHat } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  description?: string;
  features?: string[];
}

export function UnderConstruction({
  title = "Under Construction",
  description = "This section is being built. Check back soon.",
  features
}: UnderConstructionProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <div className="rounded-full bg-amber-100 p-5 dark:bg-amber-950/40">
        <HardHat className="h-10 w-10 text-amber-600 dark:text-amber-400" />
      </div>
      <div className="max-w-sm space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
      {features && features.length > 0 && (
        <div className="bg-muted/40 w-full max-w-xs rounded-xl border px-6 py-4 text-left">
          <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-widest uppercase">
            Planned features
          </p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <span className="bg-muted-foreground/40 h-1.5 w-1.5 shrink-0 rounded-full" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

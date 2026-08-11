import type { ReactNode } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-ink-soft">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

const inputClass =
  "min-h-[44px] w-full rounded-lg border border-line bg-paper-raised px-3 py-2 text-ink placeholder:text-ink-faint";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-[120px] ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Checkbox({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
      <input type="checkbox" {...props} className="h-5 w-5 rounded border-line" />
      {label}
    </label>
  );
}

export function AdminPageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="font-serif text-2xl font-semibold text-ink">{title}</h1>
      {action}
    </div>
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3 border-t border-line pt-5">{children}</div>;
}

export const PrimaryButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`min-h-[44px] rounded-lg bg-lawn px-5 py-2.5 font-semibold text-paper-raised hover:bg-lawn-deep disabled:opacity-60 ${props.className ?? ""}`}
  />
);

export const DangerButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`min-h-[44px] rounded-lg border border-maroon px-5 py-2.5 font-semibold text-maroon hover:bg-maroon/10 ${props.className ?? ""}`}
  />
);

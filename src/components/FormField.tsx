"use client";

import { useId } from "react";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'toggle' | 'date' | 'number';
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  error?: string;
  className?: string;
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options = [],
  required = false,
  error,
  className = ""
}: FormFieldProps) {
  const id = useId();

  const baseInputClass = "w-full bg-white border rounded-xl px-4 py-3 text-sm text-roots-charcoal placeholder-foreground-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all";
  const errorClass = error 
    ? "border-roots-red focus:ring-roots-red/30" 
    : "border-roots-sand/60 focus:ring-roots-red/20 focus:border-roots-red";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-roots-charcoal flex items-center justify-between">
        <span>{label} {required && <span className="text-roots-red">*</span>}</span>
      </label>

      {type === 'text' || type === 'date' || type === 'number' ? (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`${baseInputClass} ${errorClass}`}
        />
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${baseInputClass} ${errorClass} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`${baseInputClass} ${errorClass} appearance-none cursor-pointer`}
          style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232C2420' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
        >
          <option value="" disabled>Selecciona una opción</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'toggle' ? (
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-roots-red/30 focus:ring-offset-2 ${
            value ? 'bg-roots-red' : 'bg-roots-sand'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ) : null}

      {error && (
        <p className="text-xs text-roots-red mt-0.5">{error}</p>
      )}
    </div>
  );
}

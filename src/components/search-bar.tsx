"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Utilitaire pour gérer les classes conditionnelles

interface SearchBarProps {
  placeholder?: string; // Texte d'espace réservé
  value: string; // Valeur de l'input
  onChange: (value: string) => void; // Fonction de gestion du changement
  className?: string; // Classes CSS personnalisées
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      {/* Input de recherche */}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10" // Ajoute un padding à gauche pour l'icône
      />
    </div>
  );
}
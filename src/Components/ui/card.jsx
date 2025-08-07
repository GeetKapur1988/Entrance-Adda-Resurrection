// src/Components/ui/card.jsx
export const Card = ({ children }) => (
  <div className="rounded-lg border p-4 shadow">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-2">{children}</div>
);
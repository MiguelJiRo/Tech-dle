const ICONS = {
  Lenguaje: (
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  ),
  Framework: (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
    </>
  ),
  'Base de Datos': (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  Herramienta: (
    <path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a4.5 4.5 0 0 0 6.4-6.4l-2.5 2.5-2.8-2.8 2.5-2.5z" />
  ),
};

const TechIcon = ({ type, className = 'w-4 h-4', title }) => {
  const path = ICONS[type] ?? ICONS.Herramienta;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {path}
    </svg>
  );
};

export default TechIcon;

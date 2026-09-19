// Este layout omite el Navbar y Footer del layout raíz
// porque las páginas de auth tienen su propio diseño
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

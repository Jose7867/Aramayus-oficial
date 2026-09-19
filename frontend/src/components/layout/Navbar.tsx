"use client";
import Link from "next/link";
import { useCartStore } from "@store/cartStore";
import { useAuthStore } from "@store/authStore";
import { ShoppingBag, User, Search, Menu, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [userMenu, setUserMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    setMobileMenu(false);
    router.push("/");
  };

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Probador", href: "/probador" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <nav className="bg-andean-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-xl text-inca-gold italic">
            Aramayus
            <span className="block text-wool-cream not-italic text-[10px] tracking-[3px] font-sans font-light">
              Art Textil Andino
            </span>
          </Link>

          {/* Links de navegación — desktop */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-wool-cream/70 text-xs tracking-widest uppercase hover:text-inca-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Iconos derecha */}
          <div className="flex items-center gap-4">
            <Search className="text-wool-cream/70 w-5 h-5 cursor-pointer hover:text-inca-gold transition-colors" />

            {/* Menú usuario */}
            <div className="relative">
              <button
                onClick={() =>
                  user ? setUserMenu(!userMenu) : router.push("/auth/login")
                }
                className="text-wool-cream/70 hover:text-inca-gold transition-colors"
                aria-label="Cuenta de usuario"
              >
                <User className="w-5 h-5" />
              </button>
              {/* Dropdown si está logueado */}
              {user && userMenu && (
                <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-sm shadow-xl z-50 py-1">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-andean-black truncate">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate">
                      {user.email}
                    </div>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setUserMenu(false)}
                      className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-inca-gold transition-colors"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <Link
                    href="/cuenta/perfil"
                    onClick={() => setUserMenu(false)}
                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-inca-gold transition-colors"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    href="/cuenta/pedidos"
                    onClick={() => setUserMenu(false)}
                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-inca-gold transition-colors"
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-gray-100 mt-1"
                  >
                    <LogOut className="w-3 h-3" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/carrito"
              className="relative"
              aria-label={`Carrito, ${itemCount} artículos`}
            >
              <ShoppingBag className="text-wool-cream w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-wiphala-red text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Hamburguesa móvil */}
            <button
              className="md:hidden text-wool-cream/70 hover:text-inca-gold transition-colors"
              onClick={() => setMobileMenu(true)}
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Overlay para cerrar el menú de usuario */}
        {userMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setUserMenu(false)}
          />
        )}
      </nav>

      {/* ── Drawer lateral móvil ── */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setMobileMenu(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed right-0 top-0 h-full w-72 bg-andean-black z-50 flex flex-col"
            >
              {/* Header del drawer */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <span className="font-display text-inca-gold italic text-lg">
                  Aramayus
                </span>
                <button
                  onClick={() => setMobileMenu(false)}
                  className="text-wool-cream/70 hover:text-inca-gold transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col px-6 py-8 gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className="text-wool-cream/80 text-sm tracking-widest uppercase py-3 border-b border-white/10 hover:text-inca-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Footer del drawer */}
              <div className="px-6 py-6 border-t border-white/10">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-xs text-wool-cream/50 truncate">
                      {user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenu(false)}
                    className="block w-full text-center bg-inca-gold text-andean-black py-2.5 rounded-sm text-xs font-semibold tracking-widest uppercase hover:bg-yellow-600 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

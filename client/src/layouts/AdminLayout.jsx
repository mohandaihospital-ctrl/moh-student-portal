import { useContext, useState } from "react";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import logo from "@/assets/logo.png";

import {
  LayoutDashboard,
  Users,
  LogOut,
  ShieldCheck,
  FileText,
  Menu,
  X,
} from "lucide-react";

import { AuthContext } from "@/context/AuthContext";

const AdminLayout = () => {

  const location = useLocation();

  const { logout } =
    useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Applications",
      path: "/admin/applications",
      icon: Users,
    },

    {
      name: "Brochure",
      path: "/admin/brochure",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 h-screen overflow-y-auto
          border-r border-[var(--border)]
          bg-[var(--surface)]
          flex flex-col
          transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* LOGO */}

        <div className="h-20 px-6 border-b border-[var(--border)] flex items-center justify-between">

          <div className="flex items-center gap-4">

            <img
              src={logo}
              alt="MOH Logo"
              className="w-20 h-16 object-contain"
            />

            <div>

              <h2 className="text-lg font-bold text-[var(--heading)]">

                Admin Panel

              </h2>

              <p className="text-sm text-[var(--text)]">

                Brochure Management

              </p>

            </div>

          </div>

          {/* CLOSE BUTTON */}

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="lg:hidden"
          >

            <X size={24} />

          </button>

        </div>

        {/* ADMIN INFO */}

        <div className="px-6 py-6 border-b border-[var(--border)]">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-[var(--soft-blue)] flex items-center justify-center">

              <ShieldCheck
                size={22}
                className="text-[var(--primary)]"
              />

            </div>

            <div>

              <h3 className="font-semibold text-[var(--heading)]">

                Administrator

              </h3>

              <p className="text-sm text-[var(--text)]">

                System Access Enabled

              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 p-5">

          <nav className="space-y-2">

            {navItems.map((item) => {

              const Icon =
                item.icon;

              const isActive =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-[var(--text)] hover:bg-[var(--soft-blue)] hover:text-[var(--primary)]"
                  }`}
                >

                  <Icon size={19} />

                  {item.name}

                </Link>
              );
            })}

          </nav>

        </div>

        {/* FOOTER */}

        <div className="p-5 border-t border-[var(--border)]">

          <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 mb-4">

            <div className="flex items-start gap-3">

              <div className="w-10 h-10 rounded-xl bg-[var(--soft-blue)] flex items-center justify-center">

                <FileText
                  size={18}
                  className="text-[var(--primary)]"
                />

              </div>

              <div>

                <h4 className="text-sm font-semibold text-[var(--heading)]">

                  MOH Student Portal

                </h4>

                <p className="text-xs text-[var(--text)] mt-1 leading-relaxed">

                  Manage student records and brochure downloads.

                </p>

              </div>

            </div>

          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 transition"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <div className="lg:ml-72 flex flex-col min-h-screen">

        {/* TOPBAR */}

        <header className="h-20 bg-[var(--surface)] border-b border-[var(--border)] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">

          <div className="flex items-center gap-4">

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="lg:hidden"
            >

              <Menu size={26} />

            </button>

            <div>

              <h1 className="text-xl lg:text-2xl font-bold text-[var(--heading)]">

                Admin Dashboard

              </h1>

              <p className="text-xs lg:text-sm text-[var(--text)] mt-1">

                Manage student records and portal activity

              </p>

            </div>

          </div>

          {/* MOBILE LOGOUT */}

          <button
            onClick={logout}
            className="lg:hidden flex items-center gap-2 px-3 h-10 rounded-xl border border-red-200 text-red-500 text-sm"
          >

            <LogOut size={16} />

            Logout

          </button>

        </header>

        {/* PAGE CONTENT */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
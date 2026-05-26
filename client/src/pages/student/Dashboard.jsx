import { useContext } from "react";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  GraduationCap,
  ArrowRight,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

import { AuthContext } from "@/context/AuthContext";

const Dashboard = () => {

  const { user } =
    useContext(AuthContext);

  const stats = [
    {
      title:
        "Application Status",

      value:
        user?.profileCompleted
          ? "Submitted"
          : "Pending",

      icon:
        user?.profileCompleted
          ? CheckCircle2
          : Clock3,

      color:
        user?.profileCompleted
          ? "text-green-600"
          : "text-amber-500",

      bg:
        user?.profileCompleted
          ? "bg-green-50"
          : "bg-amber-50",
    },

    {
      title:
        "Payment Status",

      value:
        user?.hasPurchased
          ? "Paid"
          : "Unpaid",

      icon: CreditCard,

      color:
        user?.hasPurchased
          ? "text-green-600"
          : "text-red-500",

      bg:
        user?.hasPurchased
          ? "bg-green-50"
          : "bg-red-50",
    },

    {
      title:
        "Selected Course",

      value:
        user?.selectedCourse
          ?.replaceAll("_", " "),

      icon:
        GraduationCap,

      color:
        "text-[var(--primary)]",

      bg:
        "bg-[var(--soft-blue)]",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HERO CARD */}

      <div className="relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-8 shadow-sm">

        <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--soft-blue)] rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-sm font-medium text-[var(--primary)] mb-3">
              Student Dashboard
            </p>

            <h2 className="text-4xl font-bold text-[var(--heading)] leading-tight">

              Welcome back,
              <span className="block mt-1">
                {user?.name}
              </span>

            </h2>

            <p className="text-[var(--text)] mt-4 max-w-2xl leading-relaxed">
Access nursing course brochures, student resources, and program information from your portal dashboard.

            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">

              <Link
                to="/dashboard/application"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition"
              >

                Continue Application

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/dashboard/downloads"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-[var(--border)] text-[var(--heading)] hover:bg-[var(--background)] transition"
              >

                <FileText size={18} />

                View Downloads

              </Link>

            </div>

          </div>

          {/* STATUS BADGE */}

          <div className="bg-[var(--background)] border border-[var(--border)] rounded-3xl p-6 min-w-[260px]">

            <p className="text-sm text-[var(--text)]">
              Admission Progress
            </p>

            <h3 className="text-4xl font-bold text-[var(--heading)] mt-3">

              {user?.profileCompleted
                ? "100%"
                : "50%"}

            </h3>

            <div className="w-full h-3 rounded-full bg-slate-200 mt-5 overflow-hidden">

              <div
                className={`h-full rounded-full ${
                  user?.profileCompleted
                    ? "bg-green-500 w-full"
                    : "bg-[var(--primary)] w-1/2"
                }`}
              />

            </div>

            <p className="text-sm text-[var(--text)] mt-4">

              {user?.profileCompleted
                ? "Your application has been submitted successfully."
                : "Complete your application to continue the admission process."}

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {stats.map((item) => {

          const Icon =
            item.icon;

          return (
            <div
              key={item.title}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-[var(--text)]">
                    {item.title}
                  </p>

                  <h3 className={`text-3xl font-bold mt-3 ${item.color}`}>

                    {item.value}

                  </h3>

                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}>

                  <Icon
                    className={item.color}
                    size={24}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* INFO CARD */}

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h3 className="text-2xl font-bold text-[var(--heading)]">
              Important Instructions
            </h3>

            <p className="text-[var(--text)] mt-3 max-w-3xl leading-relaxed">

              Please ensure all your submitted
              information and uploaded documents
              are accurate. Incorrect or incomplete
              applications may affect your admission
              process.

            </p>

          </div>

          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[var(--soft-blue)] border border-[var(--border)]">

            <CheckCircle2
              className="text-[var(--primary)]"
              size={22}
            />

            <span className="text-sm font-medium text-[var(--heading)]">

              Admission Portal Active

            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
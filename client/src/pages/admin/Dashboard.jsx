import {
  Users,
  FileCheck2,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const Dashboard = () => {

  const stats = [
    {
      title: "Total Students",
      value: "120",
      icon: Users,
      color: "text-[var(--primary)]",
      bg: "bg-[var(--soft-blue)]",
    },

    {
      title:
        "Applications Submitted",

      value: "95",

      icon: FileCheck2,

      color:
        "text-green-600",

      bg:
        "bg-green-50",
    },

    {
      title:
        "Payments Completed",

      value: "72",

      icon:
        CreditCard,

      color:
        "text-emerald-600",

      bg:
        "bg-emerald-50",
    },

    {
      title:
        "Pending Applications",

      value: "25",

      icon:
        Clock3,

      color:
        "text-amber-500",

      bg:
        "bg-amber-50",
    },
  ];

  const recentStudents = [
    {
      name:
        "Aman Saini",

      course:
        "B.Sc Nursing",

      application:
        "Submitted",

      payment:
        "Pending",
    },

    {
      name:
        "Rahul Sharma",

      course:
        "GNM",

      application:
        "Submitted",

      payment:
        "Paid",
    },

    {
      name:
        "Priya Verma",

      course:
        "Post B.Sc",

      application:
        "Pending",

      payment:
        "Pending",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HERO SECTION */}

      <div className="relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-8 shadow-sm">

        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--soft-blue)] rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-sm font-medium text-[var(--primary)] mb-3">

              Admin Overview

            </p>

            <h2 className="text-4xl font-bold text-[var(--heading)] leading-tight">

              Admission Management
              <span className="block mt-1">
                Dashboard Overview
              </span>

            </h2>

            <p className="text-[var(--text)] mt-4 max-w-3xl leading-relaxed">

              Monitor student applications,
              payment activity, and admission
              workflows from your admin portal.

            </p>

          </div>

          {/* QUICK STATUS */}

          <div className="bg-[var(--background)] border border-[var(--border)] rounded-3xl p-6 min-w-[260px]">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">

                <TrendingUp className="text-green-600" />

              </div>

              <div>

                <p className="text-sm text-[var(--text)]">

                  Admission Progress

                </p>

                <h3 className="text-3xl font-bold text-[var(--heading)] mt-1">

                  79%

                </h3>

              </div>

            </div>

            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

              <div className="w-[79%] h-full rounded-full bg-green-500" />

            </div>

            <p className="text-sm text-[var(--text)] mt-4 leading-relaxed">

              Most student applications have
              been completed successfully.

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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

                  <h3 className={`text-4xl font-bold mt-4 ${item.color}`}>

                    {item.value}

                  </h3>

                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}>

                  <Icon
                    size={24}
                    className={item.color}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* TABLE */}

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-8 border-b border-[var(--border)]">

          <div>

            <p className="text-sm font-medium text-[var(--primary)] mb-2">

              Student Applications

            </p>

            <h2 className="text-3xl font-bold text-[var(--heading)]">

              Recent Students

            </h2>

          </div>

          <button className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl border border-[var(--border)] text-[var(--heading)] hover:bg-[var(--background)] transition">

            View All

            <ArrowUpRight size={18} />

          </button>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-[var(--background)]">

              <tr>

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">

                  Student

                </th>

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">

                  Course

                </th>

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">

                  Application

                </th>

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">

                  Payment

                </th>

              </tr>

            </thead>

            <tbody>

              {recentStudents.map(
                (student, index) => (

                  <tr
                    key={index}
                    className="border-t border-[var(--border)] hover:bg-[var(--background)] transition"
                  >

                    <td className="p-5">

                      <div className="flex items-center gap-4">

                        <div className="w-11 h-11 rounded-full bg-[var(--soft-blue)] flex items-center justify-center text-[var(--primary)] font-semibold">

                          {student.name
                            .charAt(0)}

                        </div>

                        <div>

                          <h4 className="font-semibold text-[var(--heading)]">

                            {student.name}

                          </h4>

                          <p className="text-sm text-[var(--text)]">

                            Student Applicant

                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-5 text-[var(--heading)] font-medium">

                      {student.course}

                    </td>

                    <td className="p-5">

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
                          student.application ===
                          "Submitted"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >

                        <CheckCircle2
                          size={14}
                        />

                        {student.application}

                      </span>

                    </td>

                    <td className="p-5">

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
                          student.payment ===
                          "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >

                        <CreditCard
                          size={14}
                        />

                        {student.payment}

                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users,
  FileCheck2,
  CreditCard,
  Clock3,
} from "lucide-react";

import api from "@/api/axios";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const Applications = () => {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    applicationFilter,
    setApplicationFilter,
  ] = useState("all");

  const [
    paymentFilter,
    setPaymentFilter,
  ] = useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const applicationsPerPage = 8;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            "/admin/applications"
          );

        setApplications(
          response.data
            .applications || []
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to fetch applications"
        );

      } finally {

        setLoading(false);
      }
    };

  const filteredApplications =
    useMemo(() => {

      return applications.filter(
        (application) => {

          const user =
            application.userId || {};

          const matchesSearch =
            user.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            user.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesApplication =
            applicationFilter ===
            "all"
              ? true
              : applicationFilter ===
                "submitted"
              ? user.profileCompleted
              : !user.profileCompleted;

          const matchesPayment =
            paymentFilter ===
            "all"
              ? true
              : paymentFilter ===
                "paid"
              ? user.hasPurchased
              : !user.hasPurchased;

          return (
            matchesSearch &&
            matchesApplication &&
            matchesPayment
          );
        }
      );

    }, [
      applications,
      search,
      applicationFilter,
      paymentFilter,
    ]);

  const totalPages = Math.ceil(
    filteredApplications.length /
      applicationsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    applicationsPerPage;

  const paginatedApplications =
    filteredApplications.slice(
      startIndex,
      startIndex +
        applicationsPerPage
    );

  const submittedCount =
    applications.filter(
      (app) =>
        app.userId
          ?.profileCompleted
    ).length;

  const paidCount =
    applications.filter(
      (app) =>
        app.userId
          ?.hasPurchased
    ).length;

  return (
    <div className="space-y-6">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-8 shadow-sm">

        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--soft-blue)] rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-sm font-medium text-[var(--primary)] mb-3">

              Student Applications

            </p>

            <h2 className="text-4xl font-bold text-[var(--heading)] leading-tight">

              Manage Student
              <span className="block mt-1">
                Applications
              </span>

            </h2>

            <p className="text-[var(--text)] mt-4 max-w-3xl leading-relaxed">

              Review admission applications,
              monitor payment activity,
              and manage student records
              through the admin dashboard.

            </p>

          </div>

          {/* QUICK STATS */}

          <div className="grid grid-cols-2 gap-4 min-w-[320px]">

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-[var(--text)]">
                    Total
                  </p>

                  <h3 className="text-3xl font-bold text-[var(--heading)] mt-2">

                    {
                      applications.length
                    }

                  </h3>

                </div>

                <div className="w-12 h-12 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

                  <Users className="text-[var(--primary)]" />

                </div>

              </div>

            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-[var(--text)]">
                    Submitted
                  </p>

                  <h3 className="text-3xl font-bold text-green-600 mt-2">

                    {submittedCount}

                  </h3>

                </div>

                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">

                  <FileCheck2 className="text-green-600" />

                </div>

              </div>

            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-[var(--text)]">
                    Paid
                  </p>

                  <h3 className="text-3xl font-bold text-emerald-600 mt-2">

                    {paidCount}

                  </h3>

                </div>

                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">

                  <CreditCard className="text-emerald-600" />

                </div>

              </div>

            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-[var(--text)]">
                    Pending
                  </p>

                  <h3 className="text-3xl font-bold text-amber-500 mt-2">

                    {
                      applications.length -
                      submittedCount
                    }

                  </h3>

                </div>

                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">

                  <Clock3 className="text-amber-500" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FILTERS */}

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

        <CardContent className="p-6">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

            {/* SEARCH */}

            <div className="relative w-full xl:w-80">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
              />

              <Input
                placeholder="Search applications..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="pl-11 h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
              />

            </div>

            {/* FILTERS */}

            <div className="flex flex-col md:flex-row gap-3">

              <select
                value={
                  applicationFilter
                }
                onChange={(e) =>
                  setApplicationFilter(
                    e.target.value
                  )
                }
                className="h-12 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--heading)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >

                <option value="all">
                  All Applications
                </option>

                <option value="submitted">
                  Submitted
                </option>

                <option value="pending">
                  Pending
                </option>

              </select>

              <select
                value={
                  paymentFilter
                }
                onChange={(e) =>
                  setPaymentFilter(
                    e.target.value
                  )
                }
                className="h-12 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--heading)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >

                <option value="all">
                  All Payments
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="unpaid">
                  Unpaid
                </option>

              </select>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* TABLE */}

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)] overflow-hidden">

        <CardContent className="p-0 overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-[var(--background)] border-b border-[var(--border)]">

              <tr>

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">
                  Student
                </th>

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">
                  Mobile
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

                <th className="text-left p-5 text-sm font-semibold text-[var(--text)]">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-16 text-[var(--text)]"
                  >

                    Loading applications...

                  </td>

                </tr>

              ) : paginatedApplications.length ===
                0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-16 text-[var(--text)]"
                  >

                    No applications found

                  </td>

                </tr>

              ) : (

                paginatedApplications.map(
                  (
                    application
                  ) => (

                    <tr
                      key={
                        application._id
                      }
                      className="border-b border-[var(--border)] hover:bg-[var(--background)] transition"
                    >

                      {/* STUDENT */}

                      <td className="p-5">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-full bg-[var(--soft-blue)] flex items-center justify-center text-[var(--primary)] font-semibold">

                            {application.userId?.name?.charAt(
                              0
                            )}

                          </div>

                          <div>

                            <h4 className="font-semibold text-[var(--heading)]">

                              {
                                application
                                  .userId
                                  ?.name
                              }

                            </h4>

                            <p className="text-sm text-[var(--text)]">

                              {
                                application
                                  .userId
                                  ?.email
                              }

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* MOBILE */}

                      <td className="p-5 text-[var(--heading)]">

                        {
                          application
                            .userId
                            ?.mobile
                        }

                      </td>

                      {/* COURSE */}

                      <td className="p-5 text-[var(--heading)] capitalize">

                        {application.userId?.selectedCourse?.replaceAll(
                          "_",
                          " "
                        )}

                      </td>

                      {/* APPLICATION */}

                      <td className="p-5">

                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
                            application
                              .userId
                              ?.profileCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >

                          {application
                            .userId
                            ?.profileCompleted
                            ? "Submitted"
                            : "Pending"}

                        </span>

                      </td>

                      {/* PAYMENT */}

                      <td className="p-5">

                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
                            application
                              .userId
                              ?.hasPurchased
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {application
                            .userId
                            ?.hasPurchased
                            ? "Paid"
                            : "Unpaid"}

                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="p-5">

                        <Link
                          to={`/admin/applications/${application._id}`}
                        >

                          <Button
                            size="sm"
                            variant="outline"
                            className="h-10 rounded-xl border-[var(--border)] hover:bg-[var(--background)]"
                          >

                            <Eye
                              size={16}
                              className="mr-2"
                            />

                            View

                          </Button>

                        </Link>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </CardContent>

      </Card>

      {/* PAGINATION */}

      {!loading &&
        filteredApplications.length >
          0 && (

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <p className="text-sm text-[var(--text)]">

              Showing{" "}
              {startIndex + 1}
              {" - "}
              {Math.min(
                startIndex +
                  applicationsPerPage,
                filteredApplications.length
              )}{" "}
              of{" "}
              {
                filteredApplications.length
              }{" "}
              applications

            </p>

            <div className="flex items-center gap-3">

              <Button
                variant="outline"
                size="icon"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="border-[var(--border)]"
              >

                <ChevronLeft
                  size={18}
                />

              </Button>

              <div className="px-4 text-sm font-medium text-[var(--heading)]">

                Page {currentPage} of{" "}
                {totalPages}

              </div>

              <Button
                variant="outline"
                size="icon"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="border-[var(--border)]"
              >

                <ChevronRight
                  size={18}
                />

              </Button>

            </div>

          </div>
        )}

    </div>
  );
};

export default Applications;
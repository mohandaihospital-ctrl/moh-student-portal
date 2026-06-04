import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLoader from "@/common/PageLoader";

import {
  FileText,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  User,
  Eye,
  Download,
  ShieldCheck,
  MapPin,
  BadgeCheck,
  BookOpen,
} from "lucide-react";

import api from "@/api/axios";

import { courseForms } from "@/data/courseForms";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const ApplicationDetails = () => {

  const { id } =
    useParams();

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [statusLoading, setStatusLoading] =
    useState(false);

  const currentCourse =
    courseForms[
      application?.userId
        ?.selectedCourse
    ] || {
      sections: [],
      documents: [],
    };

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            `/admin/applications/${id}`
          );

        setApplication(
          response.data
            .application
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to fetch application"
        );

      } finally {

        setLoading(false);
      }
    };

  const updateStatus =
    async (status) => {

      try {

        setStatusLoading(true);

        await api.put(
          `/admin/applications/${id}/status`,
          {
            status,
          }
        );

        await fetchApplication();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update status"
        );

      } finally {

        setStatusLoading(false);
      }
    };

  const getDownloadUrl =
    (url) => {

      if (
        url?.includes(
          "/raw/upload/"
        )
      ) {

        return url.replace(
          "/raw/upload/",
          "/raw/upload/fl_attachment:true/"
        );
      }

      return url;
    };

 const getFieldIcon =
  (fieldName) => {

    const lower =
      fieldName.toLowerCase();

    if (
      lower.includes("email")
    ) {

      return Mail;
    }

    if (
      lower.includes("mobile") ||
      lower.includes("phone")
    ) {

      return Phone;
    }

    if (
      lower.includes("address") ||
      lower.includes("city") ||
      lower.includes("state")
    ) {

      return MapPin;
    }

    if (
      lower.includes("course") ||
      lower.includes("marks") ||
      lower.includes("education") ||
      lower.includes("details")
    ) {

      return GraduationCap;
    }

    if (
      lower.includes("date") ||
      lower.includes("dob") ||
      lower.includes("year")
    ) {

      return Calendar;
    }

    return FileText;
  };

  if (loading) {

    return (
      <PageLoader
        text="Loading application..."
      />
    );
  }

  if (!application) {

    return (
      <div className="text-center py-24">

        <h2 className="text-3xl font-bold text-[var(--heading)]">

          Application Not Found

        </h2>

        <p className="text-[var(--text)] mt-3">

          Unable to find the requested application.

        </p>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 lg:p-8 shadow-sm">

        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--soft-blue)] rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-sm font-medium text-[var(--primary)] mb-3">

              Student Profile Review

            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--heading)] leading-tight">

              Student Application
              <span className="block mt-1">

                Details Overview

              </span>

            </h2>

            <p className="text-[var(--text)] mt-4 max-w-3xl leading-relaxed">

              Review student profile details,
              submitted documents, and
              brochure access activity.

            </p>

          </div>

          {/* STATUS */}

          <div className="bg-[var(--background)] border border-[var(--border)] rounded-3xl p-6 min-w-full lg:min-w-[280px]">

            <p className="text-sm text-[var(--text)]">

              Application Status

            </p>

            <div className="mt-4">

              <span
                className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-medium ${
                  application.status ===
                  "approved"
                    ? "bg-green-100 text-green-700"
                    : application.status ===
                      "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >

                {application.status ||
                  "pending"}

              </span>

            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border)]">

              <p className="text-sm text-[var(--text)]">

                Payment Status

              </p>

              <div className="mt-3">

                <span
                  className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-medium ${
                    application.userId
                      ?.hasPurchased
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {application.userId
                    ?.hasPurchased
                    ? "Paid"
                    : "Unpaid"}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* STUDENT INFO */}

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

        <CardContent className="p-6 lg:p-8">

          <div className="flex items-center gap-3 mb-8">

            <div className="w-14 h-14 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

              <User className="text-[var(--primary)]" />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-[var(--heading)]">

                Student Information

              </h3>

              <p className="text-[var(--text)] mt-1">

                Student account and contact details

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {[
              {
                icon: User,
                label: "Full Name",
                value:
                  application.userId
                    ?.name,
              },

              {
                icon: Mail,
                label:
                  "Email Address",

                value:
                  application.userId
                    ?.email,
              },

              {
                icon: Phone,
                label:
                  "Mobile Number",

                value:
                  application.userId
                    ?.mobile,
              },

              {
                icon:
                  GraduationCap,

                label:
                  "Selected Course",

                value:
                  application.userId
                    ?.selectedCourse
                    ?.replaceAll(
                      "_",
                      " "
                    ),
              },
            ].map((item) => {

              const Icon =
                item.icon;

              return (
                <div
                  key={item.label}
                  className="border border-[var(--border)] rounded-2xl p-5 bg-[var(--background)] hover:shadow-md transition-all duration-300"
                >

                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-4">

                    <Icon
                      size={22}
                      className="text-[var(--primary)]"
                    />

                  </div>

                  <p className="text-sm text-[var(--text)]">

                    {item.label}

                  </p>

                  <h4 className="font-semibold text-[var(--heading)] mt-2 capitalize break-words">

                    {item.value || "N/A"}

                  </h4>

                </div>
              );
            })}

          </div>

        </CardContent>

      </Card>

      {/* APPLICATION INFO */}

      {currentCourse?.sections?.map(
        (section) => (

          <Card
            key={section.title}
            className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]"
          >

            <CardContent className="p-6 lg:p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

                  <BadgeCheck className="text-[var(--primary)]" />

                </div>

                <div>

                  <h3 className="text-2xl font-bold text-[var(--heading)]">

                    {section.title}

                  </h3>

                  <p className="text-[var(--text)] mt-1">

                    {section.description}

                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {section.fields.map(
                  (field) => {

                    const Icon =
                      getFieldIcon(
                        field.name
                      );

                    return (
                      <div
                        key={field.name}
                        className="border border-[var(--border)] rounded-2xl p-5 bg-[var(--background)] hover:shadow-md transition-all duration-300"
                      >

                        <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-4">

                          <Icon
                            size={22}
                            className="text-[var(--primary)]"
                          />

                        </div>

                        <p className="text-sm text-[var(--text)]">

                          {field.label}

                        </p>

                        <h4 className="font-semibold text-[var(--heading)] mt-2 break-words whitespace-pre-wrap">

                          {application?.formData?.[
                            field.name
                          ] || "N/A"}

                        </h4>

                      </div>
                    );
                  }
                )}

              </div>

            </CardContent>

          </Card>
        )
      )}

      {/* DOCUMENTS */}

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

  <CardContent className="p-6 lg:p-8">

    {/* HEADER */}

    <div className="flex items-center gap-4 mb-8">

      <div className="w-14 h-14 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

        <FileText className="text-[var(--primary)]" />

      </div>

      <div>

        <h3 className="text-2xl font-bold text-[var(--heading)]">

          Uploaded Documents

        </h3>

        <p className="text-[var(--text)] mt-1">

          Review uploaded student files and documents

        </p>

      </div>

    </div>

    {/* EMPTY STATE */}

    {!application.documents ||
    Object.keys(
      application.documents
    ).length === 0 ? (

      <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-3xl bg-[var(--background)]">

        <FileText
          size={42}
          className="mx-auto text-[var(--text)]"
        />

        <h4 className="text-xl font-semibold text-[var(--heading)] mt-5">

          No Documents Uploaded

        </h4>

        <p className="text-[var(--text)] mt-2">

          Student has not uploaded any documents yet.

        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {Object.entries(
          application.documents
        ).map(
          ([key, document]) => (

            <div
              key={key}
              className="min-w-0 border border-[var(--border)] rounded-3xl p-6 bg-[var(--background)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              {/* TOP */}

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">

                  <FileText
                    size={24}
                    className="text-[var(--primary)]"
                  />

                </div>

                <div className="min-w-0">

                  <h4 className="font-semibold text-[var(--heading)] capitalize break-words">

                    {key
                      .replace(
                        /([A-Z])/g,
                        " $1"
                      )
                      .trim()}

                  </h4>

                  <p className="text-sm text-[var(--text)] mt-1">

                    Uploaded Document

                  </p>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">

                <Button
                  onClick={() =>
                    window.open(
                      document?.url,
                      "_blank"
                    )
                  }
                  variant="outline"
                  className="w-full h-11 rounded-2xl border-[var(--border)] overflow-hidden"
                >

                  <Eye
                    size={17}
                    className="mr-2"
                  />

                  View

                </Button>

                <a
                  href={getDownloadUrl(
                    document?.url
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >

                  <Button className="w-full h-11 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] overflow-hidden">

                    <Download
                      size={17}
                      className="mr-2"
                    />

                    Download

                  </Button>

                </a>

              </div>

            </div>
          )
        )}

      </div>
    )}

  </CardContent>

</Card>

      {/* ACTIONS */}

      {/* <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">

        <Button
          onClick={() =>
            updateStatus(
              "approved"
            )
          }
          disabled={
            statusLoading
          }
          className="w-full sm:w-auto h-12 px-6 rounded-2xl bg-green-600 hover:bg-green-700"
        >

          <CheckCircle
            size={18}
            className="mr-2"
          />

          Approve Application

        </Button>

        <Button
          onClick={() =>
            updateStatus(
              "rejected"
            )
          }
          disabled={
            statusLoading
          }
          variant="destructive"
          className="w-full sm:w-auto h-12 px-6 rounded-2xl"
        >

          <XCircle
            size={18}
            className="mr-2"
          />

          Reject Application

        </Button>

      </div> */}

    </div>
  );
};

export default ApplicationDetails;
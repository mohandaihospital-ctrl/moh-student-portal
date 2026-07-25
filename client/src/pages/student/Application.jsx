import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Upload,
  CheckCircle2,
  FileText,
  ArrowRight,
} from "lucide-react";

import api from "@/api/axios";

import { AuthContext } from "@/context/AuthContext";

import { courseForms } from "@/data/courseForms";

import { generateSchema } from "@/lib/generateSchema";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

const Application = () => {

  const {
    user,
    setUser,
  } = useContext(AuthContext);

  const currentCourse =
    courseForms[
      user?.selectedCourse
    ] || {
sections: [],
      documents: [],
    };

  const dynamicSchema =
   generateSchema(
  currentCourse?.sections?.flatMap(
    (section) =>
      section.fields
  ) || []
)

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [documents, setDocuments] =
    useState({});

  const [uploadErrors, setUploadErrors] =
    useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({

    resolver:
      zodResolver(
        dynamicSchema
      ),
  });

  const handleFileUpload =
    async (
      e,
      fieldName
    ) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setUploadErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      const allowedTypes = [
        "image/jpeg",
        "image/png",
      ];

      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        setUploadErrors((prev) => ({
          ...prev,
          [fieldName]:
            "Only JPG and PNG images are allowed",
        }));

        toast.error(
          "Only JPG and PNG images are allowed"
        );

        return;
      }

      if (file.size > 300000) {

        setUploadErrors((prev) => ({
          ...prev,
          [fieldName]:
            "File size must be below 300KB",
        }));

        toast.error(
          "File size must be below 300KB"
        );

        return;
      }

      const uploadToast =
        toast.loading(
          "Uploading document..."
        );

      try {

        setUploading(true);

        const uploadData =
          new FormData();

        uploadData.append(
          "file",
          file
        );

        uploadData.append(
          "documentType",
          fieldName
        );

        const response =
          await api.post(
            "/upload/document",
            uploadData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setDocuments((prev) => ({
          ...prev,

          [fieldName]:
            response.data.document
              .url,
        }));

        setUploadErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));

        toast.dismiss(
          uploadToast
        );

        toast.success(
          `${fieldName
            .replace(
              /([A-Z])/g,
              " $1"
            )
            .trim()} uploaded successfully`
        );

      } catch (error) {

        console.log(error);

        setUploadErrors((prev) => ({
          ...prev,
          [fieldName]:
            "Upload failed",
        }));

        toast.dismiss(
          uploadToast
        );

        toast.error(
          "File upload failed"
        );

      } finally {

        setUploading(false);
      }
    };

  const onSubmit =
    async (formData) => {

      if (loading) return;

    const optionalDocuments = [
  "residenceCertificate",
  "casteCertificate",
  "apaarId",
  "feeSlip",
];

const missingDocuments =
  currentCourse.documents.filter(
    (doc) =>
      !optionalDocuments.includes(
        doc.key
      ) &&
      !documents[
        doc.key
      ]
  );

      if (
        missingDocuments.length > 0
      ) {

        toast.error(
          `${missingDocuments[0].label} is required`
        );

        return;
      }

      const submitToast =
        toast.loading(
          "Submitting application..."
        );

      try {

        setLoading(true);

        await api.post(
          "/application",
          {
            formData,

            documents:
              Object.fromEntries(

                Object.entries(
                  documents
                ).map(
                  ([
                    key,
                    value,
                  ]) => [

                    key,

                    {
                      url: value,
                    },
                  ]
                )
              ),
          }
        );

        const { data } =
          await api.get(
            "/auth/me"
          );

        setUser(data);

        toast.dismiss(
          submitToast
        );

        toast.success(
          "Application submitted successfully"
        );

      } catch (error) {

        console.log(error);

        toast.dismiss(
          submitToast
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Submission failed"
        );

      } finally {

        setLoading(false);
      }
    };

  if (user?.profileCompleted) {

    return (
      <div className="max-w-4xl mx-auto">

        <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

          <CardContent className="p-10 text-center">

            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto">

              <CheckCircle2
                size={48}
                className="text-green-600"
              />

            </div>

            <h2 className="text-4xl font-bold text-[var(--heading)] mt-8">

              Application Submitted

            </h2>

            <p className="text-[var(--text)] mt-4 text-lg max-w-2xl mx-auto leading-relaxed">

              Your application has been submitted
              successfully. Complete payment to
              unlock brochure and invoice downloads.

            </p>

            <div className="mt-8">

              <Link
                to="/dashboard/downloads"
              >

                <Button className="h-12 px-6 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]">

                  Go To Downloads

                  <ArrowRight
                    size={18}
                    className="ml-2"
                  />

                </Button>

              </Link>

            </div>

          </CardContent>

        </Card>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">

        <p className="text-sm font-medium text-[var(--primary)] mb-3">

          Admission Form

        </p>

        <h2 className="text-4xl font-bold text-[var(--heading)]">

          Student Application

        </h2>

        <p className="text-[var(--text)] mt-4 max-w-3xl leading-relaxed">

          Fill out your admission details carefully
          and upload all required documents to
          complete the application process.

        </p>

      </div>

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

        <CardContent className="p-8 lg:p-10">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
          >

            <div>

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

                  <FileText className="text-[var(--primary)]" />

                </div>

                <div>

                  <h3 className="text-2xl font-bold text-[var(--heading)]">

                    Basic Details

                  </h3>

                  <p className="text-[var(--text)] text-sm mt-1">

                    Student personal and admission information

                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[
                  {
                    label:
                      "Full Name",

                    value:
                      user?.name || "",
                  },

                  {
                    label:
                      "Email Address",

                    value:
                      user?.email || "",
                  },

                  {
                    label:
                      "Mobile Number",

                    value:
                      user?.mobile || "",
                  },

                  {
                    label:
                      "Selected Course",

                    value:
                      user?.selectedCourse?.replaceAll(
                        "_",
                        " "
                      ) || "",
                  },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="space-y-2"
                  >

                    <Label className="text-[var(--heading)]">

                      {item.label}

                    </Label>

                    <Input
                      value={item.value}
                      disabled
                      className="h-12 border-[var(--border)] bg-slate-50 text-[var(--text)]"
                    />

                  </div>
                ))}

                {currentCourse?.sections?.map(
  (section) => (

    <div
      key={section.title}
      className="md:col-span-2"
    >

      <div className="mb-6 mt-4">

        <h3 className="text-2xl font-bold text-[var(--heading)]">

          {section.title}

        </h3>

        <p className="text-sm text-[var(--text)] mt-1">

          {section.description}

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {section.fields.map(
          (field) => (

            <div
              key={field.name}
              className="space-y-2"
            >

              <Label className="text-[var(--heading)]">

                {field.label}

              </Label>

              {field.type ===
              "select" ? (

                <select
                  {...register(
                    field.name
                  )}
                  className="w-full h-12 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >

                  <option value="">
                    Select
                  </option>

                  {field.options?.map(
                    (
                      option
                    ) => (

                      <option
                        key={
                          option
                        }
                        value={
                          option
                        }
                      >

                        {option}

                      </option>
                    )
                  )}

                </select>

              ) : field.type ===
                "textarea" ? (

                <textarea
                  {...register(
                    field.name
                  )}
                  placeholder={
                    field.label
                  }
                  className="w-full min-h-[120px] px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                />

              ) : (

                <Input
                  type={
                    field.type
                  }
                  placeholder={
                    field.label
                  }
                  {...register(
                    field.name
                  )}
                  className="h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                />

              )}

              {errors[
                field.name
              ] && (

                <p className="text-sm text-red-500">

                  {
                    errors[
                      field
                        .name
                    ]?.message
                  }

                </p>
              )}

            </div>
          )
        )}

      </div>

    </div>
  )
)}

              </div>

            </div>

            <div>

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

                  <Upload className="text-[var(--primary)]" />

                </div>

                <div>

                  <h3 className="text-2xl font-bold text-[var(--heading)]">

                    Upload Documents

                  </h3>

                  <p className="text-[var(--text)] text-sm mt-1">

                    Upload all required admission documents

                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {currentCourse?.documents?.map(
                  (item) => (

                    <div
                      key={item.key}
                      className="border border-[var(--border)] rounded-3xl p-6 bg-[var(--background)]"
                    >

                      <div className="flex items-center gap-3 mb-5">

                        <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">

                          <Upload
                            size={20}
                            className="text-[var(--primary)]"
                          />

                        </div>

                        <div>

                          <h4 className="font-semibold text-[var(--heading)]">

                            {item.label}

                          </h4>

                          <p className="text-sm text-[var(--text)]">

                            Upload document file

                          </p>

                        </div>

                      </div>

                      <Input
                        type="file"

                        accept=".jpg,.jpeg,.png"

                        multiple={false}

                        onChange={(e) =>
                          handleFileUpload(
                            e,
                            item.key
                          )
                        }

                        className="border-[var(--border)] bg-[var(--surface)]"

                        required={
  ![
    "residenceCertificate",
    "casteCertificate",
    "apaarId",
    "feeSlip",
  ].includes(item.key)
}
                      />

                      {documents[
                        item.key
                      ] && (

                        <div className="flex items-center gap-2 text-green-600 text-sm mt-4 font-medium">

                          <CheckCircle2
                            size={16}
                          />

                          Uploaded Successfully

                        </div>
                      )}

                      {uploadErrors[
                        item.key
                      ] && (

                        <div className="flex items-center gap-2 text-red-500 text-sm mt-3 font-medium">

                          <span>
                            {uploadErrors[
                              item.key
                            ]}
                          </span>

                        </div>
                      )}

                    </div>
                  )
                )}

              </div>

            </div>

            <div>

              <Button
                type="submit"
                size="lg"

                disabled={
                  loading ||
                  uploading ||
                  Object.keys(errors)
                    .length > 0
                }

                className="h-12 px-8 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
              >

                {loading
                  ? "Submitting..."
                  : uploading
                  ? "Uploading..."
                  : "Submit Application"}

                {!loading &&
                  !uploading && (

                    <ArrowRight
                      size={18}
                      className="ml-2"
                    />

                  )}

              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
};

export default Application;
import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  Upload,
  FileText,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

import api from "@/api/axios";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

const Brochure = () => {

  const [loading, setLoading] =
    useState(false);

  const [brochure, setBrochure] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const fetchBrochure =
    async () => {

      try {

        const { data } =
          await api.get(
            "/brochure"
          );

        setBrochure(
          data.brochure
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchBrochure();
  }, []);

 const handleFileChange =
  (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    if (
      file.type !==
      "application/pdf"
    ) {

      toast.error(
        "Only PDF files are allowed"
      );

      return;
    }

    const maxSize =
      10 * 1024 * 1024;

    if (
      file.size > maxSize
    ) {

      toast.error(
        "Brochure size must be below 10MB"
      );

      return;
    }

    setSelectedFile(
      file
    );
  };

  const handleUpload =
    async () => {

      if (!selectedFile) {

        toast.error(
          "Please select brochure PDF"
        );

        return;
      }

      const uploadToast =
        toast.loading(
          brochure
            ? "Updating brochure..."
            : "Uploading brochure..."
        );

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile
        );

        const { data } =
          await api.post(
            "/brochure/upload",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setBrochure(
          data.brochure
        );

        setSelectedFile(
          null
        );

        toast.dismiss(
          uploadToast
        );

        toast.success(
          data.message
        );

      } catch (error) {

        console.log(error);

        toast.dismiss(
          uploadToast
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Upload failed"
        );

      } finally {

        setLoading(false);
      }
    };


    const handleDownloadBrochure =
  async () => {

    try {

      toast.loading(
        "Downloading brochure..."
      );

      const response =
        await fetch(
          brochure.fileUrl
        );

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "admission-brochure.pdf";

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      window.URL.revokeObjectURL(
        url
      );

      toast.dismiss();

      toast.success(
        "Brochure downloaded successfully"
      );

    } catch (error) {

      console.log(error);

      toast.dismiss();

      toast.error(
        "Failed to download brochure"
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">

        <p className="text-sm font-medium text-[var(--primary)] mb-3">

          Admin Panel

        </p>

        <h2 className="text-4xl font-bold text-[var(--heading)]">

          Brochure Management

        </h2>

        <p className="text-[var(--text)] mt-4 max-w-3xl leading-relaxed">

          Upload and manage the official
          admission brochure PDF for
          students.

        </p>

      </div>

      {/* UPLOAD CARD */}

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

        <CardContent className="p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center">

              <Upload
                size={28}
                className="text-[var(--primary)]"
              />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-[var(--heading)]">

                Upload Brochure

              </h3>

              <p className="text-[var(--text)] mt-1">

                Only PDF brochure files are allowed

              </p>

            </div>

          </div>

          <div className="space-y-5">

            <Input
              type="file"

              accept=".pdf"

              onChange={
                handleFileChange
              }

              className="border-[var(--border)] bg-[var(--surface)]"
            />

            {selectedFile && (

              <div className="flex items-center gap-3 text-sm text-green-600 font-medium">

                <FileText
                  size={18}
                />

                {selectedFile.name}

              </div>
            )}

            <Button
              onClick={
                handleUpload
              }

              disabled={
                loading
              }

              className="h-12 px-8 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
            >

              {loading ? (

                <>
                  <RefreshCw
                    size={18}
                    className="mr-2 animate-spin"
                  />

                  Uploading...
                </>

              ) : (

                <>
                  <Upload
                    size={18}
                    className="mr-2"
                  />

                  {brochure
                    ? "Replace Brochure"
                    : "Upload Brochure"}

                </>

              )}

            </Button>

          </div>

        </CardContent>

      </Card>

      {/* CURRENT BROCHURE */}

      {brochure && (

        <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)]">

          <CardContent className="p-8">

            <div className="flex items-center justify-between flex-wrap gap-5">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">

                  <FileText
                    size={28}
                    className="text-red-500"
                  />

                </div>

                <div>

                  <h3 className="text-2xl font-bold text-[var(--heading)]">

                    Current Brochure

                  </h3>

                  <p className="text-[var(--text)] mt-1">

                    Active brochure available for students

                  </p>

                </div>

              </div>

              <Button
                onClick={
  handleDownloadBrochure
}
                variant="outline"

                className="h-12 px-6 rounded-2xl border-[var(--border)]"
              >

                <ExternalLink
                  size={18}
                  className="mr-2"
                />

                View Brochure

              </Button>

            </div>

          </CardContent>

        </Card>

      )}

    </div>
  );
};

export default Brochure;
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  FileText,
  FileCheck,
  Receipt,
  CreditCard,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";

import api from "@/api/axios";

import { AuthContext } from "@/context/AuthContext";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const Downloads = () => {

  const { user } =
    useContext(AuthContext);



  const [loading, setLoading] =
    useState(false);

  const loadRazorpayScript =
  () => {

    return new Promise(
      (resolve) => {

        const script =
          document.createElement(
            "script"
          );

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.onload =
          () => {
            resolve(true);
          };

        script.onerror =
          () => {
            resolve(false);
          };

        document.body.appendChild(
          script
        );
      }
    );
  };

  const handlePayment =
  async () => {

    try {

      setLoading(true);

      const loaded =
        await loadRazorpayScript();

      if (!loaded) {

        toast.error(
          "Failed to load Razorpay"
        );

        return;
      }

      const { data } =
        await api.post(
          "/payment/create-order"
        );

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          data.order.amount,

        currency:
          data.order.currency,

        name:
          "MOH Student Portal",

        description:
          "Admission Payment",

        order_id:
          data.order.id,

        handler:
          async (
            response
          ) => {

            try {

              await api.post(
                "/payment/verify",
                response
              );

              const userResponse =
                await api.get(
                  "/auth/me"
                );

              localStorage.setItem(
                "user",
                JSON.stringify(
                  userResponse.data
                )
              );

              toast.success(
                "Payment successful"
              );

              window.location.reload();

            } catch (error) {

              console.log(error);

              toast.error(
                "Payment verification failed"
              );
            }
          },

        theme: {
          color:
            "#0f766e",
        },
      };

      const paymentObject =
        new window.Razorpay(
          options
        );

      paymentObject.open();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Payment failed"
      );

    } finally {

      setLoading(false);
    }
  };

const downloadBrochure =
  async () => {

    try {

      toast.loading(
        "Downloading brochure..."
      );

      const { data } =
        await api.get(
          "/brochure"
        );

      const response =
        await fetch(
          data.brochure.fileUrl
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
        error.response?.data
          ?.message ||
          "Failed to download brochure"
      );
    }
  };

 const downloadInvoice =
  async () => {

    try {

      toast.loading(
        "Downloading invoice..."
      );

      const response =
        await api.get(
          "/invoice/download",
          {
            responseType:
              "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data,
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.setAttribute(
        "download",
        "invoice.pdf"
      );

      document.body.appendChild(
        link
      );

      link.click();

      toast.dismiss();

      toast.success(
        "Invoice downloaded successfully"
      );

    } catch (error) {

      console.log(error);

      toast.dismiss();

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to download invoice"
      );
    }
  };


if (!user?.profileCompleted) {

  return (

    <div className="max-w-3xl mx-auto">

      <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)] overflow-hidden">

        <CardContent className="p-10 lg:p-14 text-center relative">

          <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--soft-blue)] rounded-full blur-3xl opacity-70" />

          <div className="relative z-10">

            <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center mx-auto">

              <FileText
                size={42}
                className="text-amber-500"
              />

            </div>

            <p className="text-sm font-medium text-amber-500 mt-8">

              Application Required

            </p>

            <h2 className="text-4xl font-bold text-[var(--heading)] mt-3">

              Complete Your Profile First

            </h2>

            <p className="text-[var(--text)] mt-5 text-lg leading-relaxed max-w-2xl mx-auto">

              Please complete and submit your
              admission application before
              accessing payments and downloads.

            </p>

            <div className="mt-10">

              <Link
                to="/dashboard/application"
              >

                <Button className="h-12 px-8 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]">

                  Complete Application

                  <ArrowRight
                    size={18}
                    className="ml-2"
                  />

                </Button>

              </Link>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}





if (!user?.hasPurchased) {

    return (
      <div className="max-w-4xl mx-auto">

        <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)] overflow-hidden">

          <CardContent className="p-10 lg:p-14 text-center relative">

            <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--soft-blue)] rounded-full blur-3xl opacity-70" />

            <div className="relative z-10">

              <div className="w-24 h-24 rounded-full bg-[var(--soft-blue)] flex items-center justify-center mx-auto">

                <CreditCard
                  size={42}
                  className="text-[var(--primary)]"
                />

              </div>

              <p className="text-sm font-medium text-[var(--primary)] mt-8">

                Secure Payment

              </p>

              <h2 className="text-4xl font-bold text-[var(--heading)] mt-3">

                Unlock Downloads

              </h2>

              <p className="text-[var(--text)] mt-5 text-lg leading-relaxed max-w-2xl mx-auto">

                Complete your admission payment
                to access brochure downloads
                and payment invoice documents.

              </p>

              <div className="mt-10">

                <h3 className="text-6xl font-bold text-[var(--heading)]">

                  ₹1150

                </h3>

                <p className="text-[var(--text)] mt-3">

                  One-time admission payment

                </p>

              </div>

              <div className="flex items-center justify-center gap-4 mt-10">

                <div className="flex items-center gap-2 text-sm text-[var(--text)]">

                  <CheckCircle2
                    size={16}
                    className="text-green-600"
                  />

                  Secure Payment

                </div>

                <div className="flex items-center gap-2 text-sm text-[var(--text)]">

                  <CheckCircle2
                    size={16}
                    className="text-green-600"
                  />

                  Instant Access

                </div>

              </div>

              <div className="mt-10">

                <Button
                  onClick={
                    handlePayment
                  }
                  disabled={loading}
                  className="h-12 px-8 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
                >

                  {loading
                    ? "Processing..."
                    : "Pay Now"}

                  {!loading && (

                    <ArrowRight
                      size={18}
                      className="ml-2"
                    />

                  )}

                </Button>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">

        <p className="text-sm font-medium text-[var(--primary)] mb-3">

          Downloads Center

        </p>

        <h2 className="text-4xl font-bold text-[var(--heading)]">

          Access Downloads

        </h2>

        <p className="text-[var(--text)] mt-4 max-w-3xl leading-relaxed">

          Download your admission brochure
          and payment invoice documents from
          your MOH Student Portal dashboard.

        </p>

      </div>

      {/* DOWNLOAD CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* BROCHURE */}

        <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)] hover:shadow-md transition">

          <CardContent className="p-8">

            <div className="w-16 h-16 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center mb-6">

              <FileText
                size={30}
                className="text-[var(--primary)]"
              />

            </div>

            <h3 className="text-2xl font-bold text-[var(--heading)]">

              Admission Brochure

            </h3>

            <p className="text-[var(--text)] mt-3 leading-relaxed">

              Download the official admission
              brochure PDF containing complete
              course and admission information.

            </p>

            <Button
              onClick={
                downloadBrochure
              }
              className="w-full mt-8 h-12 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
            >

              <Download
                size={18}
                className="mr-2"
              />

              Download Brochure

            </Button>

          </CardContent>

        </Card>

        {/* INVOICE */}

        <Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)] hover:shadow-md transition">

          <CardContent className="p-8">

            <div className="w-16 h-16 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center mb-6">

              <Receipt
                size={30}
                className="text-[var(--primary)]"
              />

            </div>

            <h3 className="text-2xl font-bold text-[var(--heading)]">

              Payment Invoice

            </h3>

            <p className="text-[var(--text)] mt-3 leading-relaxed">

              Download your payment invoice
              and admission payment confirmation
              document in PDF format.

            </p>

            <Button
              onClick={
                downloadInvoice
              }
              className="w-full mt-8 h-12 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
            >

              <Download
                size={18}
                className="mr-2"
              />

              Download Invoice

            </Button>

          </CardContent>

        </Card>

        {/* ADMISSION FORM */}

<Card className="border border-[var(--border)] rounded-3xl shadow-sm bg-[var(--surface)] hover:shadow-md transition">

  <CardContent className="p-8">

    <div className="w-16 h-16 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center mb-6">

      <FileCheck
        size={30}
        className="text-[var(--primary)]"
      />

    </div>

    <h3 className="text-2xl font-bold text-[var(--heading)]">

      Admission Form

    </h3>

    <p className="text-[var(--text)] mt-3 leading-relaxed">

      Download the official admission form PDF,
      complete the required information, and
      keep it ready for the admission process.

    </p>

    <Button
      asChild
      className="w-full mt-8 h-12 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
    >

      <a
        href="/admission-form.pdf"
        download
        target="_blank"
        rel="noreferrer"
      >

        <Download
          size={18}
          className="mr-2"
        />

        Download Form

      </a>

    </Button>

  </CardContent>

</Card>

      </div>

    </div>
  );
};

export default Downloads;
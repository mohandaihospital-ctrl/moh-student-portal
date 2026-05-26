const PDFDocument =
  require("pdfkit");

const Payment =
  require("../models/Payment");

exports.downloadInvoice =
  async (req, res) => {

    try {

      if (
        !req.user.hasPurchased
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Payment required",
        });
      }

      const payment =
        await Payment.findOne({
          userId: req.user._id,
          paymentStatus: "paid",
        })
          .populate("userId")
          .sort({
            createdAt: -1,
          });

      if (!payment) {

        return res.status(404).json({
          success: false,
          message:
            "Invoice not found",
        });
      }

      const doc =
  new PDFDocument({
    margin: 40,
  });

res.setHeader(
  "Content-Type",
  "application/pdf"
);

res.setHeader(
  "Content-Disposition",
  `attachment; filename=invoice-${payment.invoiceNumber}.pdf`
);

doc.pipe(res);

/* ---------- HEADER ---------- */

doc
  .rect(
    0,
    0,
    doc.page.width,
    120
  )
  .fill("#0f766e");

doc
  .fillColor("#ffffff")
  .fontSize(28)
  .font("Helvetica-Bold")
  .text(
    "ADMISSION INVOICE",
    40,
    40
  );

doc
  .fontSize(13)
  .font("Helvetica")
  .text(
    "Student Admission Portal",
    40,
    78
  );

/* ---------- INVOICE BOX ---------- */

doc
  .roundedRect(
    40,
    150,
    520,
    220,
    12
  )
  .fillAndStroke(
    "#ffffff",
    "#d1d5db"
  );

doc.fillColor("#111827");

/* ---------- LEFT DETAILS ---------- */

doc
  .fontSize(18)
  .font("Helvetica-Bold")
  .text(
    "Invoice Details",
    60,
    175
  );

doc
  .moveTo(60, 205)
  .lineTo(250, 205)
  .strokeColor("#e5e7eb")
  .stroke();

/* ---------- DETAILS ---------- */

const details = [

  [
    "Invoice Number",
    payment.invoiceNumber,
  ],

  [
    "Student Name",
    payment.userId.name,
  ],

  [
    "Email Address",
    payment.userId.email,
  ],

  [
    "Course",
    payment.userId.selectedCourse,
  ],

  [
    "Payment ID",
    payment.razorpay_payment_id,
  ],

  [
    "Payment Date",
    new Date(
      payment.createdAt
    ).toLocaleDateString(),
  ],
];

let y = 225;

details.forEach(
  ([label, value]) => {

    doc
      .fontSize(11)
      .fillColor("#6b7280")
      .font("Helvetica")
      .text(
        label,
        60,
        y
      );

    doc
      .fontSize(13)
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .text(
        value,
        240,
        y
      );

    y += 28;
  }
);

/* ---------- AMOUNT BOX ---------- */

doc
  .roundedRect(
    390,
    185,
    140,
    110,
    12
  )
  .fill("#ecfdf5");

doc
  .fillColor("#065f46")
  .fontSize(13)
  .font("Helvetica")
  .text(
    "Amount Paid",
    425,
    210
  );

doc
  .fontSize(30)
  .font("Helvetica-Bold")
  .text(
    `₹${payment.amount}`,
    412,
    240
  );

/* ---------- STATUS ---------- */

doc
  .roundedRect(
    390,
    315,
    140,
    40,
    20
  )
  .fill("#dcfce7");

doc
  .fillColor("#166534")
  .fontSize(14)
  .font("Helvetica-Bold")
  .text(
    "PAID",
    442,
    328
  );

/* ---------- FOOTER ---------- */

doc
  .fontSize(10)
  .fillColor("#6b7280")
  .font("Helvetica")
  .text(
    "This is a system generated invoice.",
    40,
    720,
    {
      align:
        "center",
      width: 520,
    }
  );

doc
  .text(
    "For support contact admissions department.",
    40,
    738,
    {
      align:
        "center",
      width: 520,
    }
  );

doc.end();

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };
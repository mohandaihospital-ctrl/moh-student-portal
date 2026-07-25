const commonFields = [

  {
    name: "studentName",
    label: "Student Name",
    type: "text",

    validation: {
      required: true,
      minLength: 3,
    },
  },

  {
    name: "fatherName",
    label: "Father Name",
    type: "text",

    validation: {
      required: true,
      minLength: 3,
    },
  },

  {
    name: "motherName",
    label: "Mother Name",
    type: "text",

    validation: {
      required: true,
      minLength: 3,
    },
  },

  {
    name: "gender",
    label: "Gender",
    type: "select",

    options: [
      "Male",
      "Female",
      "Other",
    ],

    validation: {
      required: true,
    },
  },

  {
    name: "dob",
    label: "Date Of Birth",
    type: "date",

    validation: {
      required: true,
    },
  },

  {
    name: "religion",
    label: "Religion",
    type: "text",

    validation: {
      required: true,
    },
  },

  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "text",

    validation: {
      required: true,
    },
  },

  {
    name: "category",
    label: "Category",
    type: "text",

    validation: {
      required: true,
    },
  },

  {
    name: "annualIncome",
    label: "Annual Income",
    type: "text",

    validation: {
      required: true,
    },
  },

  {
    name: "correspondenceAddress",
    label: "Correspondence Address",
    type: "text",

    validation: {
      required: true,
      minLength: 10,
    },
  },

  {
    name: "correspondencePinCode",
    label: "Correspondence Pin Code",
    type: "text",

    validation: {
      required: true,
      minLength: 6,
    },
  },

  {
    name: "permanentAddress",
    label: "Permanent Address",
    type: "text",

    validation: {
      required: true,
      minLength: 10,
    },
  },

  {
    name: "permanentPinCode",
    label: "Permanent Pin Code",
    type: "text",

    validation: {
      required: true,
      minLength: 6,
    },
  },

  {
    name: "fatherPhone",
    label: "Father Phone",
    type: "text",

    validation: {
      required: true,
      minLength: 10,
    },
  },

  {
    name: "motherPhone",
    label: "Mother Phone",
    type: "text",

    validation: {
      required: true,
      minLength: 10,
    },
  },

  {
    name: "studentPhone",
    label: "Student Phone",
    type: "text",

    validation: {
      required: true,
      minLength: 10,
    },
  },

  {
    name: "studentEmail",
    label: "Student Email",
    type: "email",

    validation: {
      required: true,
    },
  },

  {
    name: "parentEmail",
    label: "Parent Email",
    type: "email",

    validation: {
      required: true,
    },
  },

  {
    name: "residenceStatus",
    label: "Residence Status",
    type: "text",

  },

  {
    name: "aadhaarNumber",
    label: "Aadhaar Number",
    type: "text",

    validation: {
      required: true,
      minLength: 12,
    },
  },
];


const commonSections = [

  {
    title: "Personal Details",

    description:
      "Student personal information",

    fields: [

      ...commonFields.slice(0, 9),
    ],
  },

  {
    title: "Address Details",

    description:
      "Student address information",

    fields: [

      ...commonFields.slice(9, 13),
    ],
  },

  {
    title: "Contact Details",

    description:
      "Student and parent contact information",

    fields: [

      ...commonFields.slice(13, 18),
    ],
  },

  {
    title: "Identity Details",

    description:
      "Identity and residence information",

    fields: [

      ...commonFields.slice(18),
    ],
  },
];

const commonDocuments = [

  {
    key: "aadhaarCard",
    label: "Aadhaar Card",
  },

  {
    key: "residenceCertificate",
    label: "Residence Certificate (Optional)",
  },

  {
    key: "casteCertificate",
    label: "Caste Certificate (Optional)",
  },

  {
    key: "passportPhoto",
    label: "Photo",
  },

  {
    key: "signature",
    label: "Signature",
  },
];

export const courseForms = {

  bsc_nursing: {

    sections: [

  ...commonSections,

  {
    title:
      "Academic Details",

    description:
      "Educational qualification details",

    fields: [

      {
        name: "ppmetRollNo",
        label: "PPMET Roll Number",
        type: "text",

        validation: {
    required: true,
  },
      },

      // {
      //   name: "monthYear",
      //   label: "Month & Year",
      //   type: "text",

      //   validation: {
      //     required: true,
      //   },
      // },

      {
        name: "tenthDetails",
        label: "10th Details (Board/Year/Obtained Marks/Total Marks/Percentage)",
        type: "textarea",
        
        validation: {
          required: true,
        },
      },

      {
        name: "plusOneDetails",
        label: "+1 Details (Board/Year/Obtained Marks/Total Marks/Percentage) (Optional)",
        type: "textarea",
      },

      {
        name: "plusTwoDetails",
        label: "+2 Details (Board/Year/Obtained Marks/Total Marks/Percentage)",
        type: "textarea",

        validation: {
          required: true,
        },
      },
    ],
  },

  {
    title:
      "Entrance Examination",

    description:
      "PPMET examination information",

    fields: [

      {
        name: "ppmetMarks",
        label: "PPMET Marks",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "percentile",
        label: "Percentile",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "socialCategory",
        label: "Social Category",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "allottedQuota",
        label: "Allotted Quota",
        type: "select",

        options: [
          "Government",
          "Management",
        ],

        validation: {
          required: true,
        },
      },
    ],
  },
],

    documents: [

      ...commonDocuments,

      {
        key: "tenthCertificate",
        label: "10th Certificate",
      },

      {
        key: "eleventhCertificate",
        label: "11th Certificate",
      },

      {
        key: "twelfthCertificate",
        label: "12th Certificate",
      },

      {
        key: "feeSlip",
        label: "University Fee Slip(Optional)",
         required: false,
      },

      {
        key: "characterCertificate",
        label: "Character Certificate",
      },

      {
        key: "migrationCertificate",
        label: "Migration Certificate",
      },

      {
        key: "ppmetResultCard",
        label: "PPMET Result Card",
      },

      {
        key: "apaarId",
        label: "Apaar ID (Optional)",
      },
    ],
  },

  gnm: {

    sections: [

  ...commonSections,

  {
    title:
      "Admission Details",

    description:
      "GNM admission information",

    fields: [

      {
        name: "pnrcApplicationNo",
        label: "PNRC Application Number",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "subCategory",
        label: "Sub Category",
        type: "text",

        validation: {
          required: true,
        },
      },
    ],
  },

  {
  title: "Academic Qualifications",

  description:
    "Educational qualification details",

  fields: [

    {
      name: "tenthDetails",
      label:
        "10th Details (School/Board/Year/Max Marks/Obtained Marks/Percentage)",
      type: "textarea",

      validation: {
        required: true,
      },
    },

    {
      name: "plusOneDetails",
      label:
        "10+1 Details (School/Board/Year/Stream/Max Marks/Obtained Marks/Percentage)",
      type: "textarea",

      validation: {
        required: true,
      },
    },

    {
      name: "plusTwoDetails",
      label:
        "10+2 Details (School/Board/Year/Stream/Max Marks/Obtained Marks/Percentage)",
      type: "textarea",

      validation: {
        required: true,
      },
    },
  ],
},
],



    documents: [

      ...commonDocuments,

      {
        key: "tenthDmc",
        label: "10th DMC",
      },

      {
        key: "plusOneCertificate",
        label: "10+1 Certificate",
      },

      {
        key: "plusTwoDmc",
        label: "10+2 DMC",
      },

      {
        key: "migrationCertificate",
        label: "Migration Certificate",
      },

      {
        key: "characterCertificate",
        label: "Character Certificate",
      },

      {
        key: "seatAllotmentLetter",
        label: "Seat Allotment Letter",
      },

      {
        key: "admissionForm",
        label: "Admission Form",
      },

      {
        key: "gapYearCertificate",
        label: "Gap Year Certificate",
      },
    ],
  },

  post_bsc: {

   sections: [

  ...commonSections,

  {
    title:
      "Academic Details",

    description:
      "Educational qualification details",

    fields: [

      {
        name: "attemptPpmet",
        label: "Attempt PPMET",
        type: "select",

        options: [
          "Yes",
          "No",
        ],

        validation: {
          required: true,
        },
      },

      {
        name: "ppmetRollNo",
        label: "PPMET Roll Number",
        type: "text",

        validation: {
          required: true,
        },
      },

      // {
      //   name: "monthYear",
      //   label: "Month & Year",
      //   type: "text",

      //   validation: {
      //     required: true,
      //   },
      // },

      {
        name: "tenthDetails",
        label: "10th Details (Board/Year/Obtained Marks/Total Marks/Percentage)",
        type: "textarea",

        validation: {
          required: true,
        },
      },

      {
        name: "plusTwoDetails",
        label: "+2 Details (Board/Year/Obtained Marks/Total Marks/Percentage)",
        type: "textarea",

        validation: {
          required: true,
        },
      },

      {
        name: "gnmDetails",
label:
"GNM Details (Institute/Board/Year/Max Marks/Obtained Marks/Percentage)",
        type: "textarea",

        validation: {
          required: true,
        },
      },

      {
        name: "gnmState",
        label: "GNM State",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "rnrmNumber",
        label: "RNRM Number",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "nursingCouncil",
        label: "Nursing Council",
        type: "text",

        validation: {
          required: true,
        },
      },
    ],
  },

  {
    title:
      "Entrance Examination",

    description:
      "PPMET examination information",

    fields: [

      {
        name: "ppmetMarks",
        label: "PPMET Marks",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "percentile",
        label: "Percentile",
        type: "text",

        validation: {
          required: true,
        },
      },

      {
        name: "clinicalExperience",
        label: "Clinical Experience",
        type: "textarea",

        validation: {
          required: true,
        },
      },
    ],
  },
],

    documents: [

      ...commonDocuments,

      {
        key: "tenthCertificate",
        label: "10th Certificate",
      },

      {
        key: "twelfthCertificate",
        label: "12th Certificate",
      },

      {
        key: "gnmCharacterCertificate",
        label: "GNM Character Certificate",
      },

      {
        key: "feeSlip",
        label: "University Fee Slip (Optional)",
         required: false,
      },

      {
        key: "migrationCertificate",
        label: "Migration Certificate",
      },

      {
        key: "relievingCertificate",
        label: "Relieving Certificate",
      },

      {
        key: "rnrmCertificate",
        label: "RNRM Certificate",
      },

      {
        key: "ppmetResultCard",
        label: "PPMET Result Card",
      },

      {
        key: "apaarId",
        label: "Apaar ID",
      },
    ],
  },
};
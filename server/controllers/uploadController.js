const streamifier =
  require("streamifier");

const cloudinary =
  require("../config/cloudinary");

exports.uploadDocument =
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message:
            "No file uploaded",
        });
      }

      const isPdf =
        req.file.mimetype ===
        "application/pdf";

      const uploadOptions = {
        folder:
          "student-portal-documents",

        use_filename: true,

        unique_filename: true,

        resource_type:
          isPdf
            ? "raw"
            : "image",
      };

      const uploadStream =
        cloudinary.uploader.upload_stream(
          uploadOptions,

          async (
            error,
            result
          ) => {

            if (error) {
              return res
                .status(500)
                .json({
                  message:
                    error.message,
                });
            }

            const finalUrl =
              isPdf
                ? `${result.secure_url}.pdf`
                : result.secure_url;

            res.status(200).json({
              success: true,

              message:
                "Document uploaded successfully",

              document: {
                url: finalUrl,

                public_id:
                  result.public_id,
              },
            });
          }
        );

      streamifier
        .createReadStream(
          req.file.buffer
        )
        .pipe(uploadStream);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
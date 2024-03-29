import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ImageUploadData, UploadedFile } from "../interface";

cloudinary.config({
  cloud_name: "djnkmibzv",
  api_key: "132877126913535",
  api_secret: "8rLrAPyE2lUYvWFdqOsjP_sf1cI",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Cloudinary

// const imageUploadToCloudinary: Promise<ImageUploadData> = async (file: UploadedFile) => {
//   console.log({ file });
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       { public_id: file.originalname },
//       (error, result) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// };

const imageUploadToCloudinary: (
  file: UploadedFile
) => Promise<ImageUploadData> = async (file: UploadedFile) => {
  return new Promise<ImageUploadData>((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      (error, result: any) => {
        // Use 'any' type as result may not be exactly of type ImageUploadData
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          const uploadData: ImageUploadData = {
            asset_id: result.asset_id,
            public_id: result.public_id,
            version: result.version,
            version_id: result.version_id,
            signature: result.signature,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            created_at: result.created_at,
            tags: result.tags,
            bytes: result.bytes,
            type: result.type,
            etag: result.etag,
            placeholder: result.placeholder,
            url: result.url,
            secure_url: result.secure_url,
            folder: result.folder,
            overwritten: result.overwritten,
            original_filename: result.original_filename,
            api_key: result.api_key,
          };
          resolve(uploadData);
        }
      }
    );
  });
};

export const imageUpload = {
  upload,
  imageUploadToCloudinary,
};

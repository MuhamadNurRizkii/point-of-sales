import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

const deleteFile = async (publicId) => {
  try {
    const result = cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log("Gagal menghapus file", error);
  }
};

export { uploadFile, deleteFile };

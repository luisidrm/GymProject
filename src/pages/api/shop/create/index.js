import formidable from "formidable";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle large files
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method === 'POST') {
    
    const uploadDir = path.join(process.cwd(), "public/storage");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true, // Keep file extensions
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        console.log("fields", fields);
        console.log("files", files);
        
        if (err) {
          console.error("Error parsing the form:", err);
          return reject(res.status(500).json({ message: "Error parsing the form" }));
        }

        const file = files['data[element][picture]']; // Assuming the file field is named 'picture'

        if (!file) {
          return reject(res.status(400).json({ error: "No file uploaded" }));
        }

        try {
          // Save the file path or other details to the database
          const nombre = fields['data[element][nombre]'][0];
          const description  = fields['data[element][description]'][0];
          const venta  = fields['data[element][venta]'][0];

          // Rename and move the file to the desired location
          const newFilePath = path.join(uploadDir, file[0].newFilename);
          fs.renameSync(file[0].filepath, newFilePath);

          const addProduct = await prisma.shop.create({
            data: {
              picture: `/storage/${file[0].newFilename}`, // Save relative path
              nombre,
              description,
              venta: Number.parseFloat(venta),
            },
          });

          resolve(res.status(200).json({ message: "File uploaded and product added", product: addProduct }));
        } catch (error) {
          console.error("Error saving the file or product:", error);
          reject(res.status(500).json({ error: "Error saving the file or product" }));
        }
      });
    });
  }
}
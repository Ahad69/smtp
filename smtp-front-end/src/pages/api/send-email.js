import { google } from "googleapis";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from "util";

// Multer setup for handling file uploads
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Utility to handle multer uploads in Next.js
export const config = {
  api: {
    bodyParser: false, // Disallow built-in bodyParser as multer will parse it
  },
};

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Function to create OAuth2 client
const createOAuth2Client = (clientId, clientSecret, refreshToken) => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  return oAuth2Client;
};

// Function to create transporter for sending emails
const createTransporter = async (user) => {
  const oAuth2Client = createOAuth2Client(
    user.clientId,
    user.clientSecret,
    user.refreshToken
  );
  const accessToken = await oAuth2Client.getAccessToken();
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: user.email,
      clientId: user.clientId,
      clientSecret: user.clientSecret,
      refreshToken: user.refreshToken,
      accessToken: accessToken.token,
    },
  });
};

// Function to generate 8-digit random number
const generateRandomNumber = () => {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default async function handler(req, res) {
  console.log(req.body, "body");
  //  if (req.method === "POST") {
  //    // Handle file upload
  //    await runMiddleware(req, res, upload.single("file"));
  //
  //    const { emailList, desc, subject, users } = req.body;
  //
  //    let totalSent = 0;
  //    let totalRejected = 0;
  //    let userIndex = 0;
  //    const randomNumber = generateRandomNumber();
  //    console.log(emailList, desc, subject, users, randomNumber);

  //try {
  //      const pLimit = (await import("p-limit")).default;
  //      const limit = pLimit(7); // Limit concurrent sending tasks
  //
  //      let attachmentPath = null;
  //      if (req.file) {
  //        attachmentPath = path.join(uploadsDir, req.file.filename);
  //
  //        // Check if the file exists
  //        if (!fs.existsSync(attachmentPath)) {
  //          console.error(`File not found: ${attachmentPath}`);
  //          return res.status(404).send("File not found");
  //        }
  //      }
  //
  //      // Function to send a batch of emails
  //      const sendBatch = async (batch, user) => {
  //        const transporter = await createTransporter(user);
  //        const emailPromises = batch.map((recipient) =>
  //          limit(async () => {
  //            try {
  //              let mailOptions = {
  //                from: `Order Confirmation <${user.email}>`,
  //                to: recipient,
  //                subject: `${subject} ${randomNumber}`,
  //                html: desc,
  //              };
  //
  //              // Attach the file only if it's available
  //              if (attachmentPath) {
  //                mailOptions.attachments = [
  //                  { filename: req.file.originalname, path: attachmentPath },
  //                ];
  //              }
  //
  //              let info = await transporter.sendMail(mailOptions);
  //              totalSent += info.accepted?.length || 0;
  //              totalRejected += info.rejected?.length || 0;
  //              console.log(`Sent to ${recipient}`);
  //            } catch (error) {
  //              console.error(`Error sending email to ${recipient}:`, error);
  //            }
  //          })
  //        );
  //
  //        await Promise.all(emailPromises);
  //      };
  //
  //      // Function to get the next user based on their limits
  //      const getNextUser = () => {
  //        const user = users[userIndex];
  //        userIndex = (userIndex + 1) % users.length; // Cycle through users
  //        return user;
  //      };
  //
  //      // Split the email list into chunks of the user limit size
  //      let currentBatch = [];
  //      for (let i = 0; i < emailList.length; i++) {
  //        currentBatch.push(emailList[i]);
  //        if (
  //          currentBatch.length === users[userIndex].limit ||
  //          i === emailList.length - 1
  //        ) {
  //          const user = getNextUser();
  //          await sendBatch(currentBatch, user);
  //          currentBatch = []; // Reset batch
  //        }
  //      }
  //
  //      // Delete the attachment file if it exists
  //      if (attachmentPath && fs.existsSync(attachmentPath)) {
  //        fs.unlinkSync(attachmentPath);
  //      }
  //
  //      console.log(`Total emails sent: ${totalSent}`);
  //      console.log(`Total emails rejected: ${totalRejected}`);
  //      return res.status(200).json({ message: "Emails sent successfully!" });
  //    } catch (error) {
  //      console.error("Error sending emails:", error);
  //      return res.status(500).json({ error: "Error sending emails" });
  //    }
  //  } else {
  //    res.setHeader("Allow", ["POST"]);
  //    return res.status(405).end(`Method ${req.method} Not Allowed`);
  //  }
}

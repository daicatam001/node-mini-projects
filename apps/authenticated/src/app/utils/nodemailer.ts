import * as nodemailer from "nodemailer";
import { environment } from "../../environments/environment";

let transporter;

const createTransport = async () => {
  const account = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: environment.mailHost,
    port: environment.mailPort,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
};

export const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  if (!transporter) {
    await createTransport();
  }
  console.log(to)
  return await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

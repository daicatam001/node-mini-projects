import * as nodemailer from "nodemailer";
import * as sendGrid from "nodemailer-sendgrid";
import { environment } from "../../environments/environment";

let transporter;

const createTransport = () => {
  transporter = nodemailer.createTransport(
    sendGrid({
      apiKey: environment.sendGridApiKey,
    })
  );
};

export const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  if (!transporter) {
    createTransport();
  }
  console.log(transporter)
  return await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

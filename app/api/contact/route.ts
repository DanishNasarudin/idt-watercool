import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log(data);
  if (
    !data.name ||
    !data.email ||
    !data.contact ||
    !data.state ||
    !data.reason ||
    !data.budget
  ) {
    return NextResponse.json({ message: "Bad request" }, { status: 501 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "v5787.securen.net",
      host: "v5787.securen.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: `Ideal Tech PC <${process.env.EMAIL}>`,
      to: data.email,
      cc: process.env.EMAIL,
      replyTo: data.email,
      subject: `New Watercool Enquiry from ${data.name}`,
      html: `
      <p>Hi <b>${data.name}</b>,</p>
      <p>Thank you for reaching out.</p>
      <p>We will contact you for further details soon.</p>
      <br />
      <p>Information:</p>
      <p>Name: ${data.name}</p>
      <p>Email: ${data.email}</p>
      <p>Contact: ${data.contact}</p>
      <p>State: ${data.state}</p>
      <p><b>Budget: ${data.budget}</b></p>
      <p><b>PC Usage: ${data.reason}</b></p>
      <p>Additional Requirements: ${data.requirements}</p>
      <br />
      <p>Best regards,</p>
      <p>Ideal Tech PC Team.</p>`,
    };

    // transporter.verify(function (error: any, success: any) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Server is ready to take our messages");
    //   }
    // });

    await transporter.sendMail(mailOption);
    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }
}

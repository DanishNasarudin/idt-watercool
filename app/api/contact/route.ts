import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log(data);
  if (!data.name || !data.email || !data.position || !data.attach) {
    return NextResponse.json({ message: "Bad request" }, { status: 500 });
  }

  const fileName =
    process.env.NODE_ENV === "production"
      ? data.attach.split("/").pop()
      : data.attach.split("\\").pop();

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
      subject: `New Application: ${data.position} position from ${data.name}`,
      html: `
      <p>Hi <b>${data.name}</b>,</p>
      <p>Thank you for applying for the ${data.position} position.</p>
      <p>We will contact you if you pass our first screening.</p>
      <p>Best regards,</p>
      <p>Ideal Tech PC Team.</p>`,
      attachments: [{ filename: fileName, path: data.attach }],
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

import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("EmailService", () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emailService = new EmailService();

  it("should send email with correct options", async () => {
    const options: SendEmailOptions = {
      to: "test@test.com",
      subject: "Test Email",
      htmlBody: "<h1>Test Email</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      html: options.htmlBody,
      attachments: expect.any(Array),
      to: options.to,
      subject: options.subject,
    });
  });

  it("should send email with attachments", async () => {
    await emailService.sendEmailWithFSLogs("test@test.com");

    expect(mockSendMail).toHaveBeenCalledWith({
      html: expect.any(String),
      attachments: expect.any(Array),
      to: "test@test.com",
      subject: "Server Logs",
    });
  });
});

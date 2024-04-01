import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MailerModule.forRoot({
            transport:{
              host: 'smtp.gmail.com',
              auth: {
        
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_PASSWORD,
                
              }
            }
          }),
    ]
})
export class emailModule  {}

// @Injectable()
// export class EmailService {
//   private transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.MAIL_FROM,
//         pass: process.env.MAIL_PASSWORD,
//       },
//     });
//   }

//   async sendMailOtp( otp: string,  mailTo: string): Promise<void> {
//     const mailOptions = {
//       from: process.env.MAIL_FROM,
//       to: mailTo,
//       subject: "Mark out authentification",
//       text: "voici votre OTP "+otp,
//     };
//     await this.transporter.sendMail(mailOptions);
//   }
// }
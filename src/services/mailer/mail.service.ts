import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { GlobalConfigService } from 'src/config/config.service';
import { emailTemplate } from 'src/templates/email';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private isOk: boolean;
  private templates = { email: emailTemplate };
  constructor(private configSrvice: GlobalConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { type: 'OAuth2', ...this.configSrvice.getMailOptions() },
    });

    this.transporter.verify((err, success) => {
      if (err) {
        return (this.isOk = false);
      }
      if (success) {
        this.isOk = true;
        return;
      }
    });
  }
  /*
  public async sendDenemeMail() {
    return await this.transporter
      .sendMail({
        subject: 'Dertler biter mi?',
        text: 'Bilirsin bazen koşmak gerek, neden bilmeden kaybı görmeden, ayıbı göm beden, ayıkana kadar hadi tana kana akıtana kadar',
        to: 'sametsaricicekym@gmail.com',
        from: this.configSrvice.getMailOptions()['user'],
        html: emailTemplate(11231321),
      })
      .then((res) => true);
  }*/
  public async sendEmailMail(template: 'email', context: any, to: string) {
    return await this.transporter
      .sendMail({
        subject: 'Dertler biter mi?',
        to: to,
        from: this.configSrvice.getMailOptions()['user'],
        html: this.templates[template](context),
      })
      .then((res) => res)
      .catch((err) => console.log('Mailer error:', err));
  }

  //   public async send
}

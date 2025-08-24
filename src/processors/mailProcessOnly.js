import { MAIL_ID } from '../config/serverConfig.js';
import mailer from '../config/mailConfig.js';

export const addEmailtoMail = async (emailData) => {
  const workspace = emailData.workspace;
  console.log('printing workspace details', workspace);
  try {
    const mailResponse = await mailer.sendMail({
      from: MAIL_ID,
      to: emailData.to,
      subject: 'Welcome Mail',
      text: `Welcome to the workspace ${workspace.name}`
    });
    console.log('Mail response is ', mailResponse);
  } catch (error) {
    console.log('mail response error from mailProcess only', error);
  }
};

import mailQueue from '../queues/mailQueue.js';

export const addEmailtoMailQueue = async (emailData) => {
  console.log('Initiating email sending process');
  try {
    await mailQueue.add(emailData);
    console.log('Email added to the email Queue');
  } catch (error) {
    console.log('Add mail to the Queue error', error);
  }
};

import cron from 'node-cron';
import { resetClientStatuses } from './path-to-your-function';

// Schedule the job to run at 00:00 on the first day of every month
cron.schedule('0 0 1 * *', async () => {
  console.log('Running scheduled task to reset client statuses...');
  await resetClientStatuses();
});

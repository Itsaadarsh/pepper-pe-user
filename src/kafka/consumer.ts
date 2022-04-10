import { EachMessagePayload } from 'kafkajs';
import { kafka } from './config';
import dotenv from 'dotenv';
import { insertNewUser, updateUserBalance } from '../repository/userDetails/userDetails.repo';

dotenv.config();
export const kafkaConsumer = async () => {
  const consume = kafka.consumer({
    groupId: `${process.env.KAFKA_CLIENTID}`,
  });

  await consume.connect();
  await consume.subscribe({ topic: `${process.env.KAFKA_TOPIC}` });
  await consume.run({
    eachMessage: async (message: EachMessagePayload) => {
      const key = message.message.key!.toString();
      const value = JSON.parse(message.message.value!.toString());

      if (key === 'userCreated') {
        const { $numberDecimal } = value.account_balance;
        await insertNewUser(value.account_number, value.password, value.email, value.name, $numberDecimal);
        console.log('\nKafka USER service (Consumer): User created\n');
      }

      if (key === 'depWithCreated') {
        const { $numberDecimal } = value.account_balance;
        await updateUserBalance(+value.account_number, +$numberDecimal, value.remarks, +value.amount);
        console.log('\nKafka USER service (Consumer): Updated User Balance & Transaction Log\n');
      }
    },
  });
};

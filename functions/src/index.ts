import slack from 'slack';
import { PubsubMessage } from "@google-cloud/pubsub/build/src/publisher";

const BOT_ACCESS_TOKEN = process.env.BOT_ACCESS_TOKEN
const CHANNEL = process.env.SLACK_CHANNEL || 'bot';

// TODO: pubsubEvent type
exports.notifySlack = async (pubsubEvent: any) => {
  const pubsubAttrs = pubsubEvent.attributes;
  const pubsubData = Buffer.from(pubsubEvent.data, 'base64').toString();
  const budgetNotificationText = `${JSON.stringify(
    pubsubAttrs
  )}, ${pubsubData}`;

  await slack.chat.postMessage({
    token: BOT_ACCESS_TOKEN,
    channel: CHANNEL,
    text: budgetNotificationText,
  });

  return 'Slack notification sent successfully';
};
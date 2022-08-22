const { IncomingWebhook } = require('@slack/webhook');
const _ = require('lodash');
const url = process.env.SLACK_WEBHOOK_URL;
const urlGenNft = process.env.SLACK_WEBHOOK_GEN_Nft_URL;
const urlChargeNft = process.env.SLACK_WEBHOOK_CHARGE_URL; 
const webhook = new IncomingWebhook(url);
const webhookGenNft = new IncomingWebhook(urlGenNft);
const webhookChargeNft = new IncomingWebhook(urlChargeNft);

exports.sendToSlack = (title, stack) => {
  const attachments = getContent(title, stack);

  webhook.send({
    text: `\`${title}\``,
    attachments,
  });
}

exports.sendToSlackGenNfting = (title, stack) => {
  const attachments = getContent(title, stack);

  webhookGenNft.send({
    text: `\`${title}\``,
    attachments,
  });
}

exports.sendToSlackCharge = (title, stack) => {
  const attachments = getContent(title, stack);

  webhookChargeNft.send({
    text: `\`${title}\``,
    attachments,
  });
}


const getContent = (title, stack) => {
  let log = {};
  if (_.isObject(stack)) {
    log = Object.assign(log, stack);
  } else {
    log.stack = stack;
  }

  const attachments = buildAttachments({
    title: title,
    data: log,
  });

  return attachments;
}

function buildAttachments({ title = '', titleLink = '', preText = '', detail = '', data }) {
  let fields = [];
  if (_.isObject(data)) {
    fields = Object.keys(data).map((key) => {
      return {
        short: true,
        title: key,
        value: stringify(data[key]),
      };
    });
  }

  return [
    {
      title,
      fields,
      mrkdwn_in: ['text'],
      color: '#36a64f',
      pretext: preText,
      title_link: titleLink,
      text: detail,
    },
  ];
}

function stringify(item) {
  if (_.isObject(item)) {
    try {
      item = JSON.stringify(item);
    } catch (e) {
      item = String(item);
    }
  }

  return item;
}

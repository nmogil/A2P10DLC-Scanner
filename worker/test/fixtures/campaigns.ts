import { ScanRequest } from '../../src/types';

export const goodCampaign: ScanRequest = {
  useCaseType: 'MARKETING',
  campaignDescription:
    'This campaign sends weekly promotional offers, seasonal sale notifications, and exclusive discount codes to customers who have opted in through our website checkout flow at example.com. Messages include product recommendations based on purchase history.',
  sampleMessages: [
    'ExampleCo: Hi [Name]! Our Spring Sale starts tomorrow — save up to 40% on all items. Shop now at example.com/spring-sale. Reply STOP to unsubscribe.',
    'ExampleCo: Your exclusive 20% discount code is SAVE20. Valid through [date]. Visit example.com/shop to browse new arrivals. Msg&data rates may apply. Reply HELP for help.',
  ],
  messageFlow:
    'Customers opt in by checking a clearly labeled consent checkbox during website checkout at example.com/checkout. The checkbox reads "I agree to receive promotional text messages from ExampleCo. Message frequency varies. Msg&data rates may apply. Reply STOP to unsubscribe." Consent is recorded in our CRM with timestamp.',
  businessName: 'ExampleCo',
  privacyPolicyUrl: 'https://example.com/privacy',
  websiteUrl: 'https://example.com',
  termsOfServiceUrl: 'https://example.com/terms',
  optInKeywords: ['START', 'YES'],
  optOutKeywords: ['STOP', 'UNSUBSCRIBE', 'CANCEL'],
  helpKeywords: ['HELP', 'INFO'],
  optInMessage: 'ExampleCo: You have subscribed to promotional messages. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out, HELP for help.',
  optOutMessage: 'ExampleCo: You have been unsubscribed and will no longer receive promotional messages from us. Reply START to re-subscribe.',
  helpMessage: 'ExampleCo: For help, visit example.com/support or call 1-800-555-0100. Reply STOP to unsubscribe.',
  embeddedLinks: true,
  embeddedPhoneNumbers: false,
  ageGatedContent: false,
  directLending: false,
  numberPool: false,
};

export const badCampaign: ScanRequest = {
  useCaseType: 'MARKETING',
  campaignDescription: 'We send marketing texts',
  sampleMessages: [
    'Check out our deals at bit.ly/abc123',
    'Buy now! Amazing offers awaits you. Visit tinyurl.com/xyz',
  ],
  messageFlow: 'Users text us to subscribe',
  embeddedLinks: false,
  embeddedPhoneNumbers: false,
  ageGatedContent: false,
  directLending: false,
  numberPool: false,
};

export const shaftCampaign: ScanRequest = {
  useCaseType: 'MARKETING',
  campaignDescription:
    'This campaign promotes our premium adult entertainment subscription service, including exclusive content and live events.',
  sampleMessages: [
    'Hot new content just dropped! Subscribe now for exclusive adult videos and photos. Visit adultstuff.com/join',
    'Your favorite performers are live tonight! Watch now at adultstuff.com/live. Text STOP to unsubscribe.',
  ],
  messageFlow:
    'Users opt in through our website age verification gate at adultstuff.com.',
  businessName: 'AdultStuff Inc',
  optOutKeywords: ['STOP'],
  helpKeywords: ['HELP'],
  embeddedLinks: true,
  embeddedPhoneNumbers: false,
  ageGatedContent: true,
  directLending: false,
  numberPool: false,
};

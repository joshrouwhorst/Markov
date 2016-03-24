var Markov = require('./Markov');

var texts = [
    "Why few hackers are lining up to help FBI crack iPhone encryption",
    "This sassy Twitter chatbot by Microsoft talks smack like a Millennial...and it's awesome",
    "Pornhub launches VR porn channel with free 360-degree adult videos",
    "Lessons on digital security and privacy from SXSW",
    "Apple 9.7-Inch iPad Pro: Price, Specs, Availability And Everything You Need To Know",
    "Days after Apple Watch's $50 price cut, competitor Pebble lays off 25% of staff",
    "Twitter Tests Ability to Add Stickers to Photos",
    "Toyota Is Bringing a Glammed Up Prius to Market",
    "Without Facebook, Your Smartphone Platform Is Effectively Dead",
    "Channing and Jenna Dewan Tatum partner for new dance competition show on NBC",
    "North Carolina passes bill blocking LGBT protections",
    "Task force cites state errors, 'belligerence' in Flint water crisis",
    'As Coal Prospects Decline, a Colorado Town Reconsiders Marijuana',
    'The Latest: Alleged Hastert victims sister to testify',
    'DC regulators green-light Pepco-Exelon merger, creating largest utility in the nation',
    'Amazon says theres no gender pay gap in its ranks',
    'Rockefeller Family Fund hits Exxon, divests from fossil fuels',
    'Mysterious ice deposits suggest the moon shifted on its axis',
    'Climate report warns of killer storms, rising seas in near future'
];

console.log(Markov.create(texts, 1));

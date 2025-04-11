// English और हिंदी Welcome Text
const englishWelcomeText = "<p>Welcome to <strong>Money Plant MLM System</strong>. This is your own money plant, it's a fully decentralized system where the owner is renounced and only users are the owner. <strong>Here you can grow your money securely and get financial freedom!</strong> This system works on a <strong>smart contract</strong> that automatically distributes rewards among participants in a fair and transparent way. Once you register, you will start earning commissions from direct and indirect referrals. <br /><br />🌟 <strong>100% Safe & Secure</strong> - No Admin Control, Fully Decentralized.<br />🌟 <strong>Instant Payments</strong> - No Waiting, Get Paid Instantly.<br />🌟 <strong>Unlimited Earnings</strong> - Grow Your Network, Increase Your Income.<br /><strong>Transparency:</strong> Funds are distributed directly from user to user without any mediator. Money Plant is a liability-free project and will remain forever with you all.</p>";
const hindiWelcomeText = "<p>Money Plant MLM System में आपका स्वागत है। यह आपका अपना Money Plant है, जो पूरी तरह से विकेंद्रीकृत है – इसमें मालिकाना हक छोड़ दिया गया है और केवल यूज़र्स ही मालिक हैं। <strong>यहाँ आप सुरक्षित रूप से अपनी कमाई बढ़ा सकते हैं और आर्थिक आज़ादी प्राप्त कर सकते हैं!</strong> यह सिस्टम एक <strong>स्मार्ट कॉन्ट्रैक्ट</strong> पर आधारित है जो उपयोगकर्ताओं के बीच पारदर्शिता से इनाम वितरित करता है। एक बार रजिस्टर करने के बाद, आप डायरेक्ट और इनडायरेक्ट रेफरल से कमीशन कमाना शुरू कर देंगे।<br /><br />🌟 <strong>100% Safe & Secure</strong> - कोई एडमिन कंट्रोल नहीं, पूरी तरह विकेंद्रीकृत।<br />🌟 <strong>Instant Payments</strong> - बिना किसी देरी के, तुरंत भुगतान।<br />🌟 <strong>Unlimited Earnings</strong> - अपनी टीम बढ़ाएं, अपनी इनकम बढ़ाएं।<br /><strong>पारदर्शिता:</strong> फंड सीधे यूज़र्स के बीच वितरित होते हैं। Money Plant एक liability-free प्रोजेक्ट है और हमेशा के लिए आपके साथ रहेगा।</p>";

// डिफ़ॉल्ट भाषा English सेट करें
document.getElementById("welcomeText").innerHTML = englishWelcomeText;
let currentLanguage = "en";

// FAQ डेटा: कुल 25 सवाल, लेकिन केवल निम्नलिखित (9,10,11,13,14,16,17,19,21,23,24) के जवाब अपडेट किए गए हैं।
const faqData = [
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution. Any user can activate their ID by getting referrals from their sponsor."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है।"
    }
  },
  {
    en: {
      question: "2. How does Money Plant MLM System work?",
      answer: "Deposit 27 USDT in your wallet and distribute it to 18 wallet addresses. Then you become active and earn from referrals."
    },
    hi: {
      question: "2. Money Plant MLM System कैसे काम करता है?",
      answer: "- नया यूज़र अपनी ID सक्रिय करने के लिए अपने वॉलेट में 27 USDT जमा करता है।<br />- यह राशि 18 लाभार्थी वॉलेट एड्रेस में वितरित कर दी जाती है, जिससे ID सक्रिय हो जाती है।<br />- सक्रिय यूज़र अपने रेफरल लिंक के माध्यम से नए यूज़र्स को जोड़ता है।<br />- हर डायरेक्ट रेफरल पर 9 USDT मिलते हैं और टीम के 16 वे लेवल तक 1 USDT रॉयल्टी के रूप में प्राप्त होता है।<br />- यदि कोई यूज़र रेफरल नहीं कर पाता, तो Replace Me या Quit Me के विकल्प का उपयोग कर अपना 100% मूलधन वापस पा सकता है।"
    }
  },
  {
    en: {
      question: "3. Does my money go to the company or directly to users?",
      answer: "All funds are distributed directly among users. The company gets only a 1 USDT royalty."
    },
    hi: {
      question: "3. मेरा पैसा कंपनी के पास जाता है या सीधे यूज़र्स के पास?",
      answer: "आपका फंड कंपनी के पास नहीं जाता। जमा राशि स्मार्ट कॉन्ट्रैक्ट के अनुसार सीधे यूज़र्स में विभाजित की जाती है, जिसमें एडमिन को केवल 1 USDT रॉयल्टी मिलती है।"
    }
  },
  {
    en: {
      question: "4. Why can’t the admin scam or misappropriate funds?",
      answer: "Smart contracts and blockchain ensure the admin has no control over funds."
    },
    hi: {
      question: "4. Admin किसी भी प्रकार का Scam क्यों नहीं कर सकता?",
      answer: "Money Plant पूरी तरह से विकेंद्रीकृत है। सोर्स कोड वेरिफाइड है और स्मार्ट कॉन्ट्रैक्ट द्वारा चलता है, जिससे एडमिन के पास फंड्स पर कोई नियंत्रण नहीं रहता।"
    }
  },
  {
    en: {
      question: "5. How long will Money Plant MLM System operate?",
      answer: "It can run indefinitely as long as new users join."
    },
    hi: {
      question: "5. Money Plant MLM System कब तक चलेगा?",
      answer: "यह सिस्टम तब तक चलता रहेगा जब तक नए यूज़र जुड़ते रहेंगे।"
    }
  },
  {
    en: {
      question: "6. How can I activate my ID?",
      answer: "To activate your ID, obtain a referral link from an activated user, paste it in your wallet's browser, and then deposit 27 USDT (including gas fee) to the 18 designated wallet addresses. Your ID will be activated instantly and you'll receive your referral code."
    },
    hi: {
      question: "6. मैं अपनी ID एक्टिवेट कैसे कर सकता हूँ?",
      answer: "सक्रिय होने के लिए, आपको किसी एक्टिवेटेड यूज़र से रेफरल लिंक लेना होगा, उसे अपने वॉलेट में पेस्ट करना होगा और 27 USDT जमा करने होंगे (गैस फीस समेत) ताकि आपकी ID तुरंत एक्टिव हो जाए।"
    }
  },
  {
    en: {
      question: "7. How do I distribute my funds?",
      answer: "First, deposit 27 USDT into your wallet. Then, open the Money Plant dApp and click on the Activate button. Scroll down to view the 18 wallet addresses and click on the 'Distribute Fund' button. Your funds will be automatically sent to the 18 addresses by the smart contract. You can also verify the transaction on the blockchain."
    },
    hi: {
      question: "7. मैं अपना फंड कैसे डिस्ट्रिब्यूट करूँगा?",
      answer: "- सबसे पहले अपने वॉलेट में 27 USDT जमा करें।<br />- Money Plant dApp खोलें और Activate बटन पर क्लिक करें।<br />- नीचे स्क्रॉल करें जहाँ 18 वॉलेट एड्रेस दिखें, और 'Distribute Fund' बटन पर क्लिक करें।<br />- आपका फंड स्मार्ट कॉन्ट्रैक्ट द्वारा 18 एड्रेस में वितरित हो जाएगा।"
    }
  },
  {
    en: {
      question: "8. Can the creator ever perform a rugpull?",
      answer: "No, because funds are deposited directly to beneficiary users via an automated, verified smart contract, making any rugpull impossible."
    },
    hi: {
      question: "8. क्या Creator कभी भी फंड लेकर (Rugpull) भाग सकता है?",
      answer: "नहीं, क्योंकि फंड सीधे बेनिफिशरी यूज़र्स में वितरित होते हैं और स्मार्ट कॉन्ट्रैक्ट द्वारा सुरक्षित रहते हैं।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "9. Is there any time limit for building the team?",
      answer: "No, users can build their team at their convenience. Once your ID is activated, it remains valid forever, and you continue earning rewards as your team grows."
    },
    hi: {
      question: "9. टीम बनाने के लिए कोई समय सीमा निर्धारित है?",
      answer: "नहीं, यूज़र अपनी सुविधा और समय के अनुसार टीम बना सकते हैं। एक बार ID एक्टिव हो जाने के बाद, वह हमेशा के लिए वैध रहती है।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "10. Can a user lose their money?",
      answer: "Not at all. With three direct referrals (each 9 USDT), your entire principal is returned. Additionally, if you don’t get any referrals, you can either use Quit Me or Replace Me."
    },
    hi: {
      question: "10. क्या किसी यूज़र का पैसा खो सकता है?",
      answer: "बिल्कुल नहीं। तीन डायरेक्ट रेफरल (प्रत्येक 9 USDT) से आपका पूरा मूलधन वापस मिल जाता है। यदि कोई रेफरल नहीं मिलता, तो Quit Me या Replace Me के विकल्प उपलब्ध हैं।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "11. Can any user's ID be blocked or restricted?",
      answer: "No, the system is completely decentralized so no user's ID can be blocked."
    },
    hi: {
      question: "11. क्या किसी यूज़र की ID को ब्लैकलिस्ट या ब्लॉक किया जा सकता है?",
      answer: "नहीं, क्योंकि सिस्टम पूरी तरह विकेंद्रीकृत है।"
    }
  },
  {
    en: {
      question: "12. How many direct referrals can a user have?",
      answer: "There is no limit to the number of direct referrals."
    },
    hi: {
      question: "12. कोई यूज़र कितना डायरेक्ट रेफरल कर सकता है?",
      answer: "कोई भी यूज़र असीमित डायरेक्ट रेफरल कर सकता है।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "13. How much income is earned per direct referral?",
      answer: "Each direct referral earns 9 USDT."
    },
    hi: {
      question: "13. डायरेक्ट रेफरल से कितनी इनकम होती है?",
      answer: "हर डायरेक्ट रेफरल से 9 USDT मिलते हैं।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "14. How many levels and how much income from indirect referrals?",
      answer: "Each of the 15 uplines receives 1 USDT per new user."
    },
    hi: {
      question: "14. इनडायरेक्ट रेफरल क्या है?",
      answer: "- सीधे आपकी रेफरल लिंक से जुड़े डायरेक्ट रेफरल होते हैं।<br />- आपकी टीम में शामिल बाक़ी यूज़र्स (16 लेवल तक) इनडायरेक्ट रेफरल माने जाते हैं, जिनसे प्रति यूज़र 1 USDT रॉयल्टी प्राप्त होती है।"
    }
  },
  {
    en: {
      question: "15. What is the Quit Me button?",
      answer: "The Quit Me button allows users to exit the system and gradually receive their entire principal (27 USDT) back from the Refund Pool."
    },
    hi: {
      question: "15. Quit Me बटन क्या है?",
      answer: "Quit Me बटन उन यूज़र्स के लिए है जो रेफरल नहीं जोड़ पाते और सिस्टम से बाहर निकलकर अपना पूरा मूलधन (27 USDT) धीरे-धीरे वापस प्राप्त करना चाहते हैं।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "16. What is the Replace Me button?",
      answer: "It allows users with no referrals to transfer their ID to a new user and immediately receive their 27 USDT back."
    },
    hi: {
      question: "16. Replace Me बटन क्या है?",
      answer: "यदि कोई यूज़र रेफरल नहीं जोड़ पाता है, तो Replace Me बटन का उपयोग कर अपनी ID किसी नए यूज़र को ट्रांसफर करके तुरंत 27 USDT प्राप्त कर सकता है।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "17. What are the conditions for quitting?",
      answer: "If no referrals are added, users can quit using the Quit Me button. After quitting, your principal is gradually returned from the Refund Pool at up to 0.27 USDT per day until the full 27 USDT is recovered."
    },
    hi: {
      question: "17. किस तरह से Quit किया जा सकता है और इसकी शर्तें क्या हैं?",
      answer: "यदि कोई रेफरल नहीं जुड़ते, तो Quit Me का उपयोग करें। Quit करने के बाद Refund Pool से धीरे-धीरे 27 USDT तक का भुगतान होता है।"
    }
  },
  {
    // (प्रश्न 18 – बिना बदलाव)
    en: {
      question: "18. Who can use the Replace Me button and what are its conditions?",
      answer: "Only users with no referrals can use Replace Me to immediately recover 27 USDT by transferring their ID to a new user."
    },
    hi: {
      question: "18. Replace Me बटन कौन उपयोग कर सकता है और इसकी शर्तें क्या हैं?",
      answer: "Replace Me बटन केवल उन यूज़र्स के लिए है जिनके पास कोई रेफरल नहीं है और जो तुरंत अपना 27 USDT प्राप्त करना चाहते हैं।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "19. If I don't add any user, how do I get my capital back?",
      answer: "You have two options: Quit Me to gradually receive your 27 USDT back from the Refund Pool, or Replace Me to immediately recover 27 USDT."
    },
    hi: {
      question: "19. यदि मैं एक भी रेफरल नहीं जोड़ पाता हूँ तो मुझे मेरा मूलधन 27 USDT कैसे वापस मिलेगा?",
      answer: "यूज़र्स के पास दो विकल्प हैं: (i) Quit Me – धीरे-धीरे Refund Pool से 27 USDT प्राप्त करें, या (ii) Replace Me – तुरंत 27 USDT प्राप्त करें।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "20. How can I sell my ID if I don't want to work with Money Plant?",
      answer: "If you choose not to continue with the system, use Replace Me to transfer or sell your ID to a new user. Your ID is then removed and replaced by the new user."
    },
    hi: {
      question: "20. अगर मैं Money Plant में काम नहीं करना चाहता तो अपनी ID कैसे किसी नए यूज़र को बेच सकता हूँ?",
      answer: "यदि आप आगे काम नहीं करना चाहते, तो Replace Me बटन का उपयोग करें और अपनी ID को किसी नए यूज़र को ट्रांसफर या बेच दें।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "21. How do I copy my referral link?",
      answer: "Only activated users can copy their referral link. Click Activate and, after fund distribution, copy the displayed link."
    },
    hi: {
      question: "21. अपना रेफरल लिंक कैसे कॉपी करें?",
      answer: "केवल एक्टिवेटेड यूज़र अपना रेफरल लिंक कॉपी कर सकते हैं। Activate बटन पर क्लिक करें और फंड डिस्ट्रिब्यूशन के बाद दिखाई देने वाले लिंक को कॉपी करें।"
    }
  },
  {
    en: {
      question: "22. How do I add a new user to my team?",
      answer: "Contact the new user, explain the system, and if they agree, share your referral link so they can join your team."
    },
    hi: {
      question: "22. किसी नए यूज़र को अपनी टीम में कैसे जोड़ें?",
      answer: "सबसे पहले नए यूज़र से संपर्क करें, सिस्टम की जानकारी दें, और यदि सहमति हो, तो अपना रेफरल लिंक शेयर करें।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "23. Is Money Plant scam-free?",
      answer: "Yes, Money Plant is 100% scam-free as it is completely based on blockchain and decentralized. All funds are distributed directly among users."
    },
    hi: {
      question: "23. क्या Money Plant एक स्कैम-फ्री प्रोजेक्ट है?",
      answer: "हाँ, Money Plant 100% स्कैम-फ्री है क्योंकि यह पूरी तरह ब्लॉकचेन पर आधारित और विकेंद्रीकृत है। सभी फंड सीधे यूज़र्स के बीच वितरित होते हैं।"
    }
  },
  {
    // [अपडेट किया गया]
    en: {
      question: "24. Can a user who quit join again?",
      answer: "Yes, after quitting, a user can rejoin with a new referral link."
    },
    hi: {
      question: "24. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Quit Me के बाद भी यूज़र नए रेफरल लिंक से दुबारा जुड़ सकता है।"
    }
  },
  {
    en: {
      question: "25. Can a user who replaced themselves join again?",
      answer: "Yes, even after using Replace Me, a user can join again with a new ID."
    },
    hi: {
      question: "25. क्या जिसने Replace कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Replace Me के बाद भी यूज़र नई ID से फिर से जुड़ सकता है।"
    }
  }
];

// FAQ रेंडर करने का फंक्शन
function renderFAQ() {
  const faqContainer = document.getElementById("faq-items");
  faqContainer.innerHTML = "";
  faqData.forEach((item) => {
    const langData = currentLanguage === "en" ? item.en : item.hi;
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerHTML = `<strong>${langData.question}</strong>`;
    const p = document.createElement("p");
    p.innerHTML = langData.answer;
    details.appendChild(summary);
    details.appendChild(p);
    faqContainer.appendChild(details);
  });
}
renderFAQ();

// भाषा बदलने पर Welcome Text और FAQ अपडेट करें
document.getElementById("languageBtn").addEventListener("click", () => {
  const isEnglish = document.getElementById("languageBtn").textContent.includes("English");
  if (isEnglish) {
    currentLanguage = "hi";
    document.getElementById("welcomeText").innerHTML = hindiWelcomeText;
    document.getElementById("languageBtn").textContent = "हिंदी / English";
  } else {
    currentLanguage = "en";
    document.getElementById("welcomeText").innerHTML = englishWelcomeText;
    document.getElementById("languageBtn").textContent = "English / हिंदी";
  }
  renderFAQ();
});

// (अन्य JavaScript फंक्शंस जैसे connectWallet, distributeFunds, replaceUser, handleQuit, openModal, closeModal, loadUplines, loadTeamLevels, copyReferral आदि आपके मौजूदा कोड के अनुसार वही रहें)

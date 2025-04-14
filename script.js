// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const connectBtn = document.getElementById('connectWalletBtn');
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace('disconnected', 'connected');
      // Set connected wallet in Add Partner modal field if available
      const yourWalletField = document.getElementById('yourWallet');
      if (yourWalletField) {
        yourWalletField.value = userAccount;
      }
      if(document.getElementById('directSponsor')){
         document.getElementById('directSponsor').value = currentSponsor;
      }
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Default language is English
let currentLanguage = 'en';
const englishWelcomeText = document.getElementById('welcomeText').innerHTML;
const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br><br>
  <b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br><br>
  🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br>
  🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br>
  🌟 <b>असीमित कमाई</b> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br><br>
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।
`;

/* FAQ Data: 25 Questions */
const faqData = [
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution. Any user can activate their ID by getting referrals from their sponsor."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है। किसी भी यूजर को अपने स्पॉन्सर से रेफरल लेकर अपनी ID एक्टिवेट करनी होती है।"
    }
  },
  {
    en: {
      question: "2. How does Money Plant MLM System work?",
      answer: "Deposit 27 USDT in your wallet and distribute it to 18 wallet addresses. Then you become active and earn from referrals."
    },
    hi: {
      question: "2. Money Plant MLM System किस तरह से काम करता है?",
      answer: "अपने वॉलेट में 27 USDT जमा करें और 18 वॉलेट एड्रेस में वितरित करें। फिर आप सक्रिय हो जाते हैं और रेफरल से कमाई करते हैं।"
    }
  },
  {
    en: {
      question: "3. Does my money go to the company or directly to users?",
      answer: "All funds are distributed directly among users. The company gets only a 1 USDT royalty."
    },
    hi: {
      question: "3. मेरा पैसा कंपनी के पास जाता है या डायरेक्ट यूजर्स के पास?",
      answer: "सभी फंड सीधे यूजर्स के बीच वितरित होते हैं। कंपनी को केवल 1 USDT रॉयल्टी मिलती है।"
    }
  },
  {
    en: {
      question: "4. Why can’t the admin scam or misappropriate funds?",
      answer: "Smart contracts and blockchain ensure the admin has no control over funds."
    },
    hi: {
      question: "4. एडमिन किसी भी प्रकार का स्कैम क्यों नहीं कर सकता?",
      answer: "स्मार्ट कॉन्ट्रैक्ट और ब्लॉकचेन के कारण एडमिन के पास फंड पर नियंत्रण नहीं है।"
    }
  },
  {
    en: {
      question: "5. How long will Money Plant MLM System operate?",
      answer: "It can run indefinitely as long as new users join."
    },
    hi: {
      question: "5. Money Plant MLM System कब तक चलेगा?",
      answer: "जब तक नए यूजर्स जुड़ते हैं, यह अनिश्चितकाल तक चलेगा।"
    }
  },
  {
    en: {
      question: "6. How can I activate my ID?",
      answer: "Deposit 27 USDT and distribute it to 18 wallet addresses to activate your ID."
    },
    hi: {
      question: "6. मैं अपनी ID एक्टिवेट कैसे कर सकता हूँ?",
      answer: "27 USDT जमा करें और इसे 18 वॉलेट एड्रेस में वितरित करें, फिर आपकी ID एक्टिव हो जाएगी।"
    }
  },
  {
    en: {
      question: "7. How do I distribute my funds?",
      answer: "The smart contract splits 27 USDT among 18 addresses."
    },
    hi: {
      question: "7. मैं अपना फंड कैसे डिस्ट्रीब्यूट करूँ?",
      answer: "स्मार्ट कॉन्ट्रैक्ट 27 USDT को 18 एड्रेस में बांटता है।"
    }
  },
  {
    en: {
      question: "8. Is Money Plant completely decentralized?",
      answer: "Yes, it is built on blockchain, and all funds are distributed among users."
    },
    hi: {
      question: "8. क्या Money Plant पूरी तरह से विकेंद्रीकृत है?",
      answer: "हाँ, यह ब्लॉकचेन पर आधारित है और पूरी तरह विकेंद्रीकृत है।"
    }
  },
  {
    en: {
      question: "9. Is there any time limit for building your team?",
      answer: "No, users can build their team at their convenience. Once your ID is activated, it remains valid forever. Even if you start building your team after years of inactivity, your income and indirect earnings for your upline will commence from that day. Money Plant will remain live indefinitely even if there are no users."
    },
    hi: {
      question: "9. टीम बनाने के लिए कोई समय सीमा निर्धारित है?",
      answer: "नहीं, यूज़र अपनी सुविधा और समय के अनुसार टीम बना सकते हैं। एक बार ID एक्टिव हो जाने के बाद, वह हमेशा के लिए वैध रहती है। यदि बहुत समय बाद भी टीम बनाना शुरू कर देते हैं, तो उसी दिन से इनकम और अपलाइन टीम को इनडायरेक्ट इनकम मिलने लगेगी। Money Plant यूज़र्स के साथ अनन्तकाल तक रहेगी, और यूज़र्स न होने पर भी वेबसाइट live रहेगी।"
    }
  },
  {
    en: {
      question: "10. Can a user's money be lost?",
      answer: "Absolutely not. The creator has provided several options; if three direct referrals (each earning 9 USDT) are secured, your entire principal is returned. If no referral is obtained, you can choose Quit Me or Replace Me. Additionally, if you do not wish to withdraw gradually from the refund pool, using Replace Me will immediately give you your full principal of 27 USDT from a new user. Measures ensure no loss occurs."
    },
    hi: {
      question: "10. क्या किसी यूज़र का पैसा loss हो सकता है?",
      answer: "बिल्कुल नहीं। क्रिएटर ने कई विकल्प रखे हैं; यदि तीन डायरेक्ट रेफरल (प्रत्येक से 9 USDT) मिलते हैं, तो आपका पूरा मूलधन वापस आ जाता है। यदि कोई रेफरल नहीं मिलता, तो Quit Me या Replace Me का विकल्प है। अगर आप धीरे-धीरे refund pool से पैसे नहीं लेना चाहते हैं, तो Replace Me के जरिए तुरंत 27 USDT प्राप्त कर सकते हैं। Loss न हो, इसका पूरा ध्यान रखा गया है।"
    }
  },
  {
    en: {
      question: "11. Can a user's ID be blacklisted or blocked?",
      answer: "No, because the system is fully decentralized. No user's ID can be blacklisted or blocked."
    },
    hi: {
      question: "11. क्या किसी यूज़र की ID को ब्लैकलिस्ट या ब्लॉक किया जा सकता है?",
      answer: "नहीं, क्योंकि सिस्टम पूरी तरह विकेंद्रीकृत है। किसी की भी ID को ब्लैकलिस्ट या ब्लॉक नहीं किया जा सकता।"
    }
  },
  {
    en: {
      question: "12. How many direct referrals can a user have?",
      answer: "Unlimited direct referrals are allowed."
    },
    hi: {
      question: "12. कोई यूजर कितना डायरेक्ट रेफरल कर सकता है?",
      answer: "यूजर के पास असीमित डायरेक्ट रेफरल हो सकते हैं।"
    }
  },
  {
    en: {
      question: "13. What is the income from direct and indirect referrals?",
      answer: "Each direct referral earns 9 USDT, and for indirect referrals up to 16 levels, you earn 1 USDT per level."
    },
    hi: {
      question: "13. डायरेक्ट और इनडायरेक्ट रेफरल से कितनी इनकम होती है?",
      answer: "हर डायरेक्ट रेफरल से 9 USDT मिलते हैं, और 16 स्तर तक के इनडायरेक्ट रेफरल से प्रति स्तर 1 USDT मिलते हैं।"
    }
  },
  {
    en: {
      question: "14. What are direct and indirect referrals?",
      answer: "Direct referrals are the users who join directly through your referral link. Indirect referrals are the remaining team members (up to 16 levels) who join via your team."
    },
    hi: {
      question: "14. डायरेक्ट और इनडायरेक्ट रेफरल क्या हैं?",
      answer: "सीधे आपकी रेफरल लिंक से जुड़ने वाले डायरेक्ट रेफरल होते हैं, और आपकी टीम में शामिल बाकी यूज़र्स (16 लेवल तक) को इनडायरेक्ट रेफरल माना जाता है।"
    }
  },
  {
    en: {
      question: "15. What is the Quit Me button?",
      answer: "It allows users to exit the system and receive a refund."
    },
    hi: {
      question: "15. Quit Me बटन क्या है?",
      answer: "यह बटन यूजर को सिस्टम छोड़कर रिफंड लेने की अनुमति देता है।"
    }
  },
  {
    en: {
      question: "16. What is the Replace Me button?",
      answer: "If a user fails to secure any referrals, they can use the Replace Me button to transfer their ID to a new user and immediately receive their full principal of 27 USDT."
    },
    hi: {
      question: "16. Replace Me बटन क्या है?",
      answer: "यदि कोई यूज़र कोई रेफरल नहीं जोड़ पाता है, तो Replace Me बटन का उपयोग कर अपनी ID किसी नए यूज़र को ट्रांसफर करके तुरंत अपना मूलधन 27 USDT प्राप्त कर सकता है।"
    }
  },
  {
    en: {
      question: "17. How can one quit and what are the conditions?",
      answer: "If a user fails to secure any referrals, they can use the Quit Me button. After quitting, the refund pool disburses up to 27 USDT gradually every 24 hours with a maximum cap of 0.27 USDT per withdrawal, calculated by dividing the total pool among quitters. This process is fully automated via the smart contract."
    },
    hi: {
      question: "17. किस तरह से Quit किया जा सकता है और इसकी शर्तें क्या हैं?",
      answer: "यदि कोई यूज़र रेफरल नहीं जोड़ पाता है, तो Quit Me बटन का उपयोग करें। Quit करने के बाद refund pool से रोज़ाना 24 घंटे में 1 बार अधिकतम 0.27 USDT तक का भुगतान होता है, जो कुल pool को quit करने वालों की संख्या से विभाजित करके तय किया जाता है। यह वितरण भी स्मार्ट कॉन्ट्रैक्ट द्वारा स्वचालित रूप से होता है।"
    }
  },
  {
    en: {
      question: "18. Who can use the Replace Me button?",
      answer: "Only active users can transfer their ID using it."
    },
    hi: {
      question: "18. Replace Me बटन कौन उपयोग कर सकता है?",
      answer: "केवल सक्रिय यूजर इसका उपयोग कर सकते हैं।"
    }
  },
  {
    en: {
      question: "19. If I do not secure any referrals, how do I get back my principal of 27 USDT?",
      answer: "Users have two options: (i) Quit Me – gradually receive 27 USDT from the refund pool, or (ii) Replace Me – immediately obtain 27 USDT from a new user."
    },
    hi: {
      question: "19. यदि मैं एक भी रेफरल नहीं जोड़ पाता हूँ तो मुझे मेरा मूलधन 27 USDT कैसे वापस मिलेगा?",
      answer: "यूज़र्स के पास दो विकल्प हैं: (i) Quit Me – धीरे-धीरे refund pool से 27 USDT प्राप्त करें, या (ii) Replace Me – तुरंत नए यूज़र से 27 USDT प्राप्त करें।"
    }
  },
  {
    en: {
      question: "20. How can I sell my ID?",
      answer: "Transfer your ID to another user using the Replace Me button."
    },
    hi: {
      question: "20. अपनी ID कैसे बेच सकते हैं?",
      answer: "Replace Me बटन का उपयोग करके अपनी ID दूसरे यूजर को ट्रांसफर करें।"
    }
  },
  {
    en: {
      question: "21. How do I copy my referral link?",
      answer: "Only activated users can copy their referral link. Click the Activate button and then the Distribute Funds button to display the option for copying your referral link."
    },
    hi: {
      question: "21. अपना रेफरल लिंक कैसे कॉपी करें?",
      answer: "केवल एक्टिवेटेड यूज़र अपना रेफरल लिंक कॉपी कर सकते हैं। Activate बटन पर क्लिक करें और फिर Distribute Funds बटन पर, जिससे रेफरल लिंक कॉपी करने का विकल्प दिखाई देगा।"
    }
  },
  {
    en: {
      question: "22. How do I add a new user to my team?",
      answer: "Share your referral link with others to add new users."
    },
    hi: {
      question: "22. अपनी टीम में नया यूजर कैसे जोड़ें?",
      answer: "अपने रेफरल लिंक को शेयर करें।"
    }
  },
  {
    en: {
      question: "23. Is Money Plant a scam-free project?",
      answer: "Yes, Money Plant is 100% scam-free as it is entirely based on blockchain and decentralized. All funds are distributed directly among users, leaving no room for scam."
    },
    hi: {
      question: "23. क्या Money Plant स्कैम-फ्री प्रोजेक्ट है?",
      answer: "हाँ, Money Plant 100% स्कैम-फ्री है क्योंकि यह पूरी तरह ब्लॉकचेन पर आधारित और विकेंद्रीकृत है। सभी फंड सीधे यूज़र्स के बीच वितरित होते हैं जिससे scam की कोई गुंजाइश नहीं रहती।"
    }
  },
  {
    en: {
      question: "24. Can a user who has quit rejoin with a new ID?",
      answer: "Yes, after quitting, a user can join again with a new ID at any time."
    },
    hi: {
      question: "24. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Quit करने के बाद यूज़र नई ID लेकर कभी भी दुबारा जुड़ सकता है।"
    }
  },
  {
    en: {
      question: "25. Can a user who replaced themselves join again?",
      answer: "Yes, even after replacing, they can join again with a new ID."
    },
    hi: {
      question: "25. क्या Replace करने वाला फिर से जुड़ सकता है?",
      answer: "हाँ, Replace करने के बाद भी नया ID लेकर जुड़ सकता है।"
    }
  }
];

function renderFAQ() {
  const faqContainer = document.getElementById('faq-items');
  faqContainer.innerHTML = '';
  faqData.forEach(item => {
    const langData = currentLanguage === 'en' ? item.en : item.hi;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = langData.question;
    const p = document.createElement('p');
    p.textContent = langData.answer;
    details.appendChild(summary);
    details.appendChild(p);
    faqContainer.appendChild(details);
  });
}
renderFAQ();

// Language Toggle
document.getElementById('languageBtn').addEventListener('click', () => {
  const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
  if (isEnglish) {
    currentLanguage = 'hi';
    document.getElementById('welcomeText').innerHTML = hindiWelcomeText;
    document.getElementById('languageBtn').textContent = 'हिंदी / English';
  } else {
    currentLanguage = 'en';
    document.getElementById('welcomeText').innerHTML = englishWelcomeText;
    document.getElementById('languageBtn').textContent = 'English / हिंदी';
  }
  renderFAQ();
});

// Modals: Fullscreen
function openModal(modalId) {
  document.body.classList.add('modal-open');
  document.getElementById(modalId).style.display = 'block';
  if(modalId === 'activateModal'){
    loadUplines();
  }
  if(modalId === 'teamModal'){
    loadTeamLevels();
  }
}
function closeModal() {
  document.body.classList.remove('modal-open');
  document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

// Load Uplines for Activate Modal
function loadUplines() {
  const uplineList = document.getElementById('uplineList');
  if(uplineList){
    uplineList.innerHTML = '';
    for (let i = 15; i >= 1; i--) {
      uplineList.innerHTML += `
        <div class="beneficiary-item">
          <span>🤠 Upline ${i}</span>
          <input type="text" placeholder="Address pending..." readonly>
          <span class="amount">1 USDT</span>
        </div>
      `;
    }
  }
}

// Load Team Levels for Team Modal
function loadTeamLevels() {
  const teamLevels = document.querySelector('.team-levels');
  if(teamLevels){
    let total = 0;
    teamLevels.innerHTML = "";
    for (let i = 1; i <= 16; i++) {
      const members = Math.floor(Math.random() * 5);
      total += members;
      teamLevels.innerHTML += `
        <div class="level">
          <span>Level ${i}:</span>
          <span>${members} Members</span>
        </div>
      `;
    }
    document.getElementById('totalMembers').textContent = total;
  }
}

// Distribute Funds
function distributeFunds() {
  document.querySelector('.distribute-btn').style.display = 'none';
  const container = document.querySelector('.referral-actions-container');
  container.innerHTML = `
    <div class="congrats-msg">
      <h3>🎉 Activation Successful!</h3>
      <div class="referral-actions">
        <button class="copy-btn" onclick="copyReferral()">Copy Referral Link</button>
        <button class="telegram-btn" onclick="window.open('https://t.me/+CeJkEHpoTWthZDVl')">Join Telegram</button>
      </div>
    </div>
  `;
}

// Copy Referral Link
function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert('Link Copied!');
}

// Replace Me
function openReplaceModal() {
  document.getElementById('sponsorLink').value = `https://moneyplant.com/ref?user=${currentSponsor}`;
  openModal('replaceModal');
}
function replaceUser() {
  const newAddress = document.getElementById('newAddress').value;
  if (newAddress) {
    currentSponsor = userAccount;
    userAccount = newAddress;
    document.getElementById('connectWalletBtn').textContent = `Connected: ${newAddress.slice(0,6)}...${newAddress.slice(-4)}`;
    if(document.getElementById('directSponsor')){
      document.getElementById('directSponsor').value = currentSponsor;
    }
    alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddress}`);
    closeModal();
  } else {
    alert("Enter New Wallet!");
  }
}

// Add Partner Function
function addPartner() {
  const partnerAddress = document.getElementById('partnerAddress').value.trim();
  if (partnerAddress === "") {
    alert("Please enter Partner Wallet Address!");
    return;
  }
  // Simulate payment of 3 USDT: 1 USDT to Admin, 2 USDT to Refund Pool.
  // The deduction is assumed to be from the connected user (yourWallet).
  const partnerReferralLink = `https://moneyplant.com/ref?partner=${partnerAddress}`;
  alert(`Payment successful!
Partner Added.
Your Partner Referral Link: ${partnerReferralLink}
Note: Partner cannot use Quit or Replace Me and can only add users who have joined with 27 USDT.`);
  closeModal();
}

// Quit Me
function handleQuit() {
  if (confirm('You will get up to 0.27 USDT daily. Confirm?')) {
    alert('Refunds start tomorrow at 4 AM IST.');
    const quitBtn = document.getElementById('quitBtn');
    if (quitBtn) quitBtn.style.display = 'none';
  }
                                             }

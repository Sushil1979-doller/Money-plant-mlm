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
      document.getElementById('directSponsor').value = currentSponsor;
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

// Store welcome note texts
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

// Store FAQ texts in both languages as an array of objects
const faqData = [
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution. Any user can activate their ID by getting referrals from their sponsor."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है। इसमें कोई भी यूजर अपने स्पॉन्सर से रेफरल लेकर अपनी ID एक्टिवेट कर सकता है।"
    }
  },
  {
    en: {
      question: "2. How does Money Plant MLM System work?",
      answer: "You need to deposit 27 USDT in your wallet and then distribute that amount to the 18 given wallet addresses. After that, you become active in the system and can earn by adding new users."
    },
    hi: {
      question: "2. Money Plant MLM System किस तरह से काम करता है?",
      answer: "यूजर को 27 USDT अपने वॉलेट में जमा करने होते हैं और फिर दिए गए 18 वॉलेट एड्रेस पर यह राशि डिस्ट्रीब्यूट करनी होती है। इसके बाद यूजर सिस्टम में सक्रिय हो जाता है और नए यूजर्स को जोड़कर कमाई कर सकता है।"
    }
  },
  {
    en: {
      question: "3. Does my money go to the company or directly to users?",
      answer: "All funds in Money Plant are distributed directly among users. The company does not receive any money, except for a 1 USDT royalty for the admin."
    },
    hi: {
      question: "3. मेरा पैसा कंपनी के पास जाता है या डायरेक्ट यूजर्स के पास?",
      answer: "Money Plant में पूरा फंड डायरेक्ट यूजर्स के बीच डिस्ट्रिब्यूट होता है। कंपनी के पास कोई पैसा नहीं जाता, केवल एडमिन को 1 USDT रॉयल्टी के रूप में प्राप्त होता है।"
    }
  },
  {
    en: {
      question: "4. Why can’t the admin scam or misappropriate funds?",
      answer: "Because the system is entirely based on smart contracts and blockchain, the admin has no control over user funds."
    },
    hi: {
      question: "4. एडमिन किसी भी प्रकार का स्कैम या रगपुल क्यों नहीं कर सकता?",
      answer: "क्योंकि सिस्टम पूरी तरह से स्मार्ट कॉन्ट्रैक्ट और ब्लॉकचेन पर आधारित है, एडमिन को किसी के फंड को नियंत्रित करने की अनुमति नहीं होती।"
    }
  },
  {
    en: {
      question: "5. How long will Money Plant MLM System operate?",
      answer: "Since there is no liability on the company, the system can run indefinitely as long as new users join."
    },
    hi: {
      question: "5. Money Plant MLM System कब तक चलेगा?",
      answer: "कंपनी के ऊपर कोई लायबिलिटी नहीं है, इसलिए यह सिस्टम अनिश्चितकाल तक चल सकता है। जब तक नए यूजर्स सिस्टम में जुड़ते रहेंगे, यह चलता रहेगा।"
    }
  },
  {
    en: {
      question: "6. How can I activate my ID?",
      answer: "After receiving the referral link from your sponsor, deposit 27 USDT in your wallet and distribute it to the 18 wallet addresses. Your ID will then be activated."
    },
    hi: {
      question: "6. मैं अपनी ID एक्टिवेट कैसे कर सकता हूँ?",
      answer: "स्पॉन्सर से रेफरल लिंक प्राप्त करने के बाद, 27 USDT अपने वॉलेट में जमा करें और इसे दिए गए 18 वॉलेट एड्रेस में डिस्ट्रीब्यूट करें। इसके बाद आपकी ID एक्टिव हो जाएगी।"
    }
  },
  {
    en: {
      question: "7. How do I distribute my funds?",
      answer: "You need to split 27 USDT among the 18 provided wallet addresses. The distribution is managed entirely by the smart contract."
    },
    hi: {
      question: "7. मैं अपना फंड कैसे डिस्ट्रीब्यूट करूँ?",
      answer: "सिस्टम में दिए गए 18 वॉलेट एड्रेस पर 27 USDT को बांटना होगा। यह डिस्ट्रिब्यूशन पूरी तरह से स्मार्ट कॉन्ट्रैक्ट द्वारा संचालित होता है।"
    }
  },
  {
    en: {
      question: "8. Is Money Plant completely decentralized?",
      answer: "Yes, the system is built on blockchain, and all funds are distributed among users."
    },
    hi: {
      question: "8. क्या Money Plant पूरी तरह से विकेंद्रीकृत है?",
      answer: "हाँ, यह सिस्टम ब्लॉकचेन पर बना हुआ है और इसका पूरा फंड यूजर्स के बीच डिस्ट्रीब्यूट होता है।"
    }
  },
  {
    en: {
      question: "9. Can the creator run away with funds?",
      answer: "No, since the entire system is automated via smart contracts, no one can control or misappropriate funds."
    },
    hi: {
      question: "9. क्या क्रिएटर किसी के फंड को लेकर भाग सकता है?",
      answer: "नहीं, क्योंकि पूरा सिस्टम स्मार्ट कॉन्ट्रैक्ट द्वारा ऑटोमेटेड है और किसी को भी फंड को नियंत्रित करने की अनुमति नहीं है।"
    }
  },
  {
    en: {
      question: "10. Can a user's money be lost?",
      answer: "No, if a user makes three direct referrals, they get their full amount back. Additionally, quit users receive refunds from the refund pool."
    },
    hi: {
      question: "10. क्या किसी यूजर का पैसा डूब सकता है?",
      answer: "नहीं, अगर यूजर तीन डायरेक्ट रेफरल करता है तो उसे उसकी पूरी राशि वापस मिल जाती है। इसके अलावा, क्विटर यूजर्स को रिफंड पूल से फंड वापस मिलता है।"
    }
  },
  {
    en: {
      question: "11. Can any user's ID be blocked or restricted?",
      answer: "No, it is a decentralized system and no user's ID can be blocked or restricted."
    },
    hi: {
      question: "11. क्या किसी की ID को ब्लॉक या रिस्ट्रिक्ट किया जा सकता है?",
      answer: "नहीं, यह एक विकेंद्रीकृत सिस्टम है और किसी की ID को ब्लॉक या रिस्ट्रिक्ट नहीं किया जा सकता।"
    }
  },
  {
    en: {
      question: "12. How many direct referrals can a user have?",
      answer: "Any user can have unlimited direct referrals."
    },
    hi: {
      question: "12. कोई यूजर कितना डायरेक्ट रेफरल कर सकता है?",
      answer: "कोई भी यूजर अनलिमिटेड डायरेक्ट रेफरल कर सकता है।"
    }
  },
  {
    en: {
      question: "13. How much income is earned per direct referral?",
      answer: "Each direct referral earns the user 9 USDT."
    },
    hi: {
      question: "13. डायरेक्ट रेफरल से कितनी इनकम होती है?",
      answer: "हर डायरेक्ट रेफरल से यूजर को 9 USDT प्राप्त होता है।"
    }
  },
  {
    en: {
      question: "14. How many levels and how much income from indirect referrals?",
      answer: "For every new user, each of the 15 uplines receives 1 USDT."
    },
    hi: {
      question: "14. इनडायरेक्ट रेफरल से कितने लेवल तक इनकम मिलेगी और कितनी?",
      answer: "हर नए यूजर के 15 अपलाइन में से प्रत्येक को 1 USDT प्राप्त होता है।"
    }
  },
  {
    en: {
      question: "15. What is the Quit Me button?",
      answer: "This button is for users who wish to leave the system and get their capital refunded."
    },
    hi: {
      question: "15. Quit Me बटन क्या है?",
      answer: "यह बटन उन यूजर्स के लिए होता है जो सिस्टम छोड़ना चाहते हैं और अपनी पूंजी वापस प्राप्त करना चाहते हैं।"
    }
  },
  {
    en: {
      question: "16. What is the Replace Me button?",
      answer: "This button is used by users who want to transfer their ID to a new user."
    },
    hi: {
      question: "16. Replace Me बटन क्या है?",
      answer: "यह बटन उन यूजर्स के लिए होता है जो अपनी ID को किसी नए यूजर को ट्रांसफर करने के लिए उपयोग करना चाहते हैं।"
    }
  },
  {
    en: {
      question: "17. What are the conditions for quitting?",
      answer: "If a user adds no referrals, they can use the Quit Me button to receive their funds from the refund pool."
    },
    hi: {
      question: "17. किस तरह से Quit किया जा सकता है और इसकी क्या शर्तें हैं?",
      answer: "अगर कोई यूजर एक भी रेफरल नहीं जोड़ता है, तो वह Quit Me बटन का उपयोग कर सकता है और रिफंड पूल से अपनी राशि वापस प्राप्त कर सकता है।"
    }
  },
  {
    en: {
      question: "18. Who can use the Replace Me button and what are the conditions?",
      answer: "Only active users can transfer their ID to a new user using the Replace Me button."
    },
    hi: {
      question: "18. Replace Me का बटन कौन उपयोग कर सकता है और इसकी क्या शर्तें हैं?",
      answer: "केवल एक्टिव यूजर्स ही अपनी ID को किसी नए यूजर को ट्रांसफर करने के लिए Replace Me बटन का उपयोग कर सकते हैं।"
    }
  },
  {
    en: {
      question: "19. If I don't add any user, how do I get my capital back?",
      answer: "If no referral is added, the user can use the Quit Me button to receive their money from the refund pool."
    },
    hi: {
      question: "19. अगर मैं एक भी यूजर नहीं जोड़ पाता हूँ तो मुझे मेरी पूंजी वापस कैसे मिलेगी?",
      answer: "अगर कोई भी रेफरल नहीं जोड़ा जाता है, तो यूजर Quit Me बटन का उपयोग कर सकता है और रिफंड पूल से पैसे वापस ले सकता है।"
    }
  },
  {
    en: {
      question: "20. How can I sell my ID if I don't want to work on Money Plant?",
      answer: "You can transfer your ID to another user using the Replace Me button."
    },
    hi: {
      question: "20. अगर मैं Money Plant में काम नहीं करना चाहता हूँ तो किस तरह से अपनी ID किसी नए यूजर को बेच सकता हूँ?",
      answer: "Replace Me बटन का उपयोग करके आप अपनी ID को किसी अन्य यूजर को ट्रांसफर कर सकते हैं।"
    }
  },
  {
    en: {
      question: "21. How do I copy my referral link?",
      answer: "After logging in, you can copy your referral link from your profile section."
    },
    hi: {
      question: "21. अपना रेफरल लिंक कैसे कॉपी करें?",
      answer: "सिस्टम में लॉगिन करने के बाद अपने प्रोफाइल सेक्शन में जाकर रेफरल लिंक कॉपी कर सकते हैं।"
    }
  },
  {
    en: {
      question: "22. How do I add a new user to my team?",
      answer: "You can add a new user by sharing your referral link."
    },
    hi: {
      question: "22. किसी नए यूजर को अपनी टीम में कैसे जोड़ें?",
      answer: "अपने रेफरल लिंक को शेयर करके नए यूजर को जोड़ा जा सकता है।"
    }
  },
  {
    en: {
      question: "23. Is Money Plant a scam-free project?",
      answer: "Yes, because it is entirely based on blockchain and is decentralized."
    },
    hi: {
      question: "23. क्या Money Plant एक स्कैम-फ्री प्रोजेक्ट है?",
      answer: "हाँ, क्योंकि यह पूरी तरह से ब्लॉकचेन आधारित और विकेंद्रीकृत प्रणाली है।"
    }
  },
  {
    en: {
      question: "24. Can a user who has quit create a new ID again?",
      answer: "Yes, after quitting, a user can join again with a new referral link."
    },
    hi: {
      question: "24. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Quit करने के बाद कोई भी यूजर नए रेफरल लिंक से दुबारा अपनी नई ID बना सकता है।"
    }
  },
  {
    en: {
      question: "25. Can a user who replaced themselves join again with a new ID?",
      answer: "Yes, even after replacing, a user can join again with a new ID."
    },
    hi: {
      question: "25. क्या जिसने खुद को Replace कर लिया था वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Replace करने के बाद भी कोई यूजर नई ID से फिर से जॉइन कर सकता है।"
    }
  }
];

// Function to render FAQ items based on current language
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

// Initial render of FAQ in English
renderFAQ();

// Language Toggle
document.getElementById('languageBtn').addEventListener('click', () => {
  const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
  if (isEnglish) {
    // Switch to Hindi
    currentLanguage = 'hi';
    document.getElementById('welcomeText').innerHTML = hindiWelcomeText;
    document.getElementById('languageBtn').textContent = 'हिंदी / English';
  } else {
    // Switch to English
    currentLanguage = 'en';
    document.getElementById('welcomeText').innerHTML = englishWelcomeText;
    document.getElementById('languageBtn').textContent = 'English / हिंदी';
  }
  renderFAQ();
});

// Modals
function openModal(modalId) {
  document.body.classList.add('modal-open');
  document.getElementById(modalId).style.display = 'block';
}
function closeModal() {
  document.body.classList.remove('modal-open');
  document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

// Load Uplines
function loadUplines() {
  const uplineList = document.getElementById('uplineList');
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
loadUplines();

// Team View
function loadTeamLevels() {
  const teamLevels = document.querySelector('.team-levels');
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
loadTeamLevels();

// Distribute Funds
function distributeFunds() {
  document.querySelector('.distribute-btn').style.display = 'none';
  const referralLink = `https://moneyplant.com/ref?user=${userAccount}`;
  document.getElementById('activateModal').innerHTML += `
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
    document.getElementById('directSponsor').value = currentSponsor;
    alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddress}`);
    closeModal();
  } else {
    alert("Enter New Wallet!");
  }
}

// Quit Me
function handleQuit() {
  if (confirm('You will get 0.27 USDT daily. Confirm?')) {
    alert('Refunds start tomorrow at 4 AM IST.');
    document.getElementById('quitBtn').style.display = 'none';
  }
      }

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
const hindiWelcomeText = document.getElementById('welcomeText').innerHTML; 
// (Welcome Note रहता है जैसा कि index.html में है)

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
      question: "4. एडमिन किसी भी प्रकार का Scam क्यों नहीं कर सकता?",
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
      question: "9. Can the creator run away with funds?",
      answer: "No, smart contracts prevent misappropriation."
    },
    hi: {
      question: "9. क्या क्रिएटर फंड लेकर भाग सकता है?",
      answer: "नहीं, स्मार्ट कॉन्ट्रैक्ट फंड की सुरक्षा करते हैं।"
    }
  },
  {
    en: {
      question: "10. Can a user's money be lost?",
      answer: "No, with three direct referrals, the full amount is returned along with refunds from the pool."
    },
    hi: {
      question: "10. क्या किसी यूजर का पैसा डूब सकता है?",
      answer: "नहीं, तीन डायरेक्ट रेफरल से पूरा पैसा वापस मिलता है और रिफंड भी मिलता है।"
    }
  },
  {
    en: {
      question: "11. Can any user's ID be blocked or restricted?",
      answer: "No, the system is decentralized so no user's ID can be blocked."
    },
    hi: {
      question: "11. क्या किसी की ID को ब्लॉक किया जा सकता है?",
      answer: "नहीं, क्योंकि सिस्टम विकेंद्रीकृत है।"
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
      question: "13. How much income is earned per direct referral?",
      answer: "Each direct referral earns 9 USDT."
    },
    hi: {
      question: "13. डायरेक्ट रेफरल से कितनी इनकम होती है?",
      answer: "हर डायरेक्ट रेफरल से 9 USDT मिलते हैं।"
    }
  },
  {
    en: {
      question: "14. How many levels and how much income from indirect referrals?",
      answer: "Each of the 15 uplines receives 1 USDT per new user."
    },
    hi: {
      question: "14. इनडायरेक्ट रेफरल से कितने लेवल तक इनकम मिलेगी?",
      answer: "नए यूजर के लिए 15 अपलाइन में से प्रत्येक को 1 USDT मिलता है।"
    }
  },
  {
    en: {
      question: "15. What is the Quit Me button?",
      answer: "It allows users to exit the system and get a refund."
    },
    hi: {
      question: "15. Quit Me बटन क्या है?",
      answer: "यह बटन यूजर को सिस्टम छोड़कर रिफंड लेने की अनुमति देता है।"
    }
  },
  {
    en: {
      question: "16. What is the Replace Me button?",
      answer: "It lets users transfer their ID to a new user."
    },
    hi: {
      question: "16. Replace Me बटन क्या है?",
      answer: "यह बटन यूजर को अपनी ID नए यूजर को ट्रांसफर करने देता है।"
    }
  },
  {
    en: {
      question: "17. What are the conditions for quitting?",
      answer: "If no referrals are added, users can quit and receive a refund from the pool."
    },
    hi: {
      question: "17. Quit करने की शर्तें क्या हैं?",
      answer: "यदि कोई रेफरल नहीं जुड़ता, तो यूजर Quit कर सकता है और रिफंड ले सकता है।"
    }
  },
  {
    en: {
      question: "18. Who can use the Replace Me button?",
      answer: "Only active users can transfer their ID using it."
    },
    hi: {
      question: "18. Replace Me बटन कौन उपयोग कर सकता है?",
      answer: "केवल सक्रिय यूजर ही इसका उपयोग कर सकते हैं।"
    }
  },
  {
    en: {
      question: "19. If I don't add any user, how do I get my capital back?",
      answer: "Use the Quit Me button to receive your funds from the refund pool."
    },
    hi: {
      question: "19. बिना रेफरल के पूंजी कैसे मिलेगी?",
      answer: "Quit Me बटन का उपयोग करें और रिफंड पूल से पैसा प्राप्त करें।"
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
      answer: "Copy it from your profile section after logging in."
    },
    hi: {
      question: "21. अपना रेफरल लिंक कैसे कॉपी करें?",
      answer: "लॉग इन करने के बाद प्रोफाइल सेक्शन से कॉपी करें।"
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
      question: "23. Is Money Plant scam-free?",
      answer: "Yes, it is entirely based on blockchain and decentralized."
    },
    hi: {
      question: "23. क्या Money Plant स्कैम-फ्री है?",
      answer: "हाँ, यह पूरी तरह ब्लॉकचेन पर आधारित और विकेंद्रीकृत है।"
    }
  },
  {
    en: {
      question: "24. Can a user who quit join again?",
      answer: "Yes, they can rejoin with a new referral link."
    },
    hi: {
      question: "24. क्या Quit करने वाला फिर से जुड़ सकता है?",
      answer: "हाँ, नया रेफरल लिंक लेकर फिर से जुड़ सकता है।"
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
  const referralLink = `https://moneyplant.com/ref?user=${userAccount}`;
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

// Quit Me
function handleQuit() {
  if (confirm('You will get 0.27 USDT daily. Confirm?')) {
    alert('Refunds start tomorrow at 4 AM IST.');
    const quitBtn = document.getElementById('quitBtn');
    if(quitBtn) quitBtn.style.display = 'none';
  }
      }

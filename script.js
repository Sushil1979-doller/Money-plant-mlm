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
      if (document.getElementById('directSponsor')) {
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
// (Welcome Note remains as in HTML)

const faqData = [
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution. Any user can activate their ID by getting referrals from their sponsor."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है। यह लोगों को आर्थिक आज़ादी पाने का एक शानदार अवसर प्रदान करता है, जिसमें प्रत्येक यूज़र अपने स्पॉन्सर से रेफरल लेकर अपनी ID एक्टिवेट करता है और अपनी टीम बनाता है। इस सिस्टम में, अगर कोई यूज़र 1 भी रेफरल नहीं कर पाता, तो उसे 100% मूलधन वापस पाने का विकल्प दिया गया है। इसे पूरी तरह liability free बनाया गया है ताकि एक बार जुड़ने पर यूज़र पीढ़ी दर पीढ़ी हमेशा कमाई कर सके।"
    }
  },
  {
    en: {
      question: "2. How does Money Plant MLM System work?",
      answer: "Deposit 27 USDT in your wallet and distribute it to 18 wallet addresses. Then you become active and earn from referrals."
    },
    hi: {
      question: "2. Money Plant MLM System कैसे काम करता है?",
      answer: "- नया यूज़र अपनी ID सक्रिय करने के लिए अपने वॉलेट में 27 USDT जमा करता है।<br>- यह राशि 18 लाभार्थी वॉलेट एड्रेस में वितरित कर दी जाती है, जिससे ID सक्रिय हो जाती है।<br>- सक्रिय यूज़र अपने रेफरल लिंक के माध्यम से नए यूज़र्स को जोड़ता है।<br>- हर डायरेक्ट रेफरल पर 9 USDT मिलते हैं और टीम के 16 वे लेवल तक 1 USDT रॉयल्टी के रूप में प्राप्त होता है।<br>- यदि कोई यूज़र रेफरल नहीं कर पाता, तो वह Replace Me या Quit Me के विकल्प का उपयोग कर अपना 100% मूलधन वापस प्राप्त कर सकता है।"
    }
  },
  {
    en: {
      question: "3. Does my money go to the company or directly to users?",
      answer: "All funds are distributed directly among users. The company gets only a 1 USDT royalty."
    },
    hi: {
      question: "3. मेरा पैसा कंपनी के पास जाता है या सीधे यूज़र्स के पास?",
      answer: "आपका फंड कंपनी के पास नहीं जाता। जब आप 27 USDT जमा करते हैं, तो यह राशि सीधे बेनिफिशरी लिस्ट में दिखाए गए यूज़र्स में, स्मार्ट कॉन्ट्रैक्ट द्वारा निर्धारित हिस्सों के अनुसार वितरित की जाती है। इसमें से एडमिन को केवल 1 USDT रॉयल्टी मिलती है और 2 USDT Refund Pool Wallet में जमा हो जाते हैं, जिन्हें quit करने वाले यूज़र्स को वापस किया जाता है।"
    }
  },
  {
    en: {
      question: "4. Why can’t the admin scam or misappropriate funds?",
      answer: "Smart contracts and blockchain ensure the admin has no control over funds."
    },
    hi: {
      question: "4. Admin किसी भी प्रकार का Scam क्यों नहीं कर सकता?",
      answer: "Money Plant पूरी तरह से विकेंद्रीकृत है और इसका मालिकाना हक छोड़ दिया गया है। सोर्स कोड वेरिफाइड और ऑटोमेटेड स्मार्ट कॉन्ट्रैक्ट द्वारा चलता है, जिस कारण एडमिन के पास यूज़र्स के फंड पर कोई नियंत्रण नहीं रहता। एडमिन को केवल 1 USDT मिलता है, जबकि शेष राशि सीधे यूज़र्स में वितरित हो जाती है, जिससे किसी भी तरह का Scam करना असंभव हो जाता है।"
    }
  },
  {
    en: {
      question: "5. How long will Money Plant MLM System operate?",
      answer: "It can run indefinitely as long as new users join."
    },
    hi: {
      question: "5. Money Plant MLM System कब तक चलेगा?",
      answer: "यह सिस्टम तब तक चलता रहेगा जब तक नए यूज़र जुड़ते रहेंगे। कोई निश्चित समय सीमा नहीं है—यदि कोई यूज़र कुछ समय के लिए सक्रिय नहीं रहता, फिर भी जब बाद में सक्रिय होता है तो उसे टीम के आधार पर आय मिलना शुरू हो जाता है। इससे सिस्टम हमेशा चालू और स्थिर रहता है।"
    }
  },
  {
    en: {
      question: "6. How can I activate my ID?",
      answer: "To activate your ID, obtain a referral link from an activated user, paste it in your wallet's browser, and then deposit 27 USDT (including gas fee) to the 18 designated wallet addresses. Your ID will be activated instantly and you'll receive your referral code."
    },
    hi: {
      question: "6. मैं अपनी ID एक्टिवेट कैसे कर सकता हूँ?",
      answer: "सक्रिय होने के लिए, आपको किसी एक्टिवेटेड यूज़र से रेफरल लिंक लेना होगा। इस लिंक को अपने वॉलेट के ब्राउज़र में पेस्ट करें, फिर एक बार की गैस फ़ी और 27 USDT जमा करें। जमा राशि को निर्धारित 18 वॉलेट एड्रेस में वितरित करने के पश्चात् आपकी ID तुरंत एक्टिव हो जाएगी और आपको आपका रेफरल कोड प्राप्त हो जाएगा।"
    }
  },
  {
    en: {
      question: "7. How do I distribute my funds?",
      answer: "First, deposit 27 USDT into your wallet. Then, open the Money Plant dApp and click on the Activate button. Scroll down to view the 18 wallet addresses and click on the 'Distribute Fund' button. Your funds will be automatically sent to the 18 addresses by the smart contract. You can also verify the transaction on the blockchain."
    },
    hi: {
      question: "7. मैं अपना फंड कैसे डिस्ट्रिब्यूट करूँगा?",
      answer: "- सबसे पहले अपने वॉलेट में 27 USDT जमा करें।<br>- फिर अपने Money Plant के dApp को खोलें।<br>- Activate बटन पर क्लिक करने के पश्चात् नीचे स्क्रॉल करें, जहां कुल 18 वॉलेट एड्रेस दिखाई देंगे।<br>- 'Distribute Fund' बटन पर क्लिक करने से आपका फंड स्मार्ट कॉन्ट्रैक्ट द्वारा इन 18 एड्रेस में ऑटोमेटिकली भेज दिया जाएगा।<br>- इस प्रक्रिया को आप Blockchain पर भी चेक कर सकते हैं।"
    }
  },
  {
    en: {
      question: "8. Can the creator ever perform a rugpull?",
      answer: "No, because funds are deposited directly to beneficiary users via an automated, verified smart contract, making any rugpull impossible."
    },
    hi: {
      question: "8. क्या Creator कभी भी फंड लेकर (Rugpull) भाग सकता है?",
      answer: "नहीं, क्योंकि फंड सीधे बेनिफिशरी यूज़र्स में वितरित होते हैं और स्मार्ट कॉन्ट्रैक्ट द्वारा सुरक्षित रहते हैं, जिससे Rugpull करना असंभव हो जाता है।"
    }
  },
  {
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
    en: {
      question: "10. Can a user lose their money?",
      answer: "Not at all. With three direct referrals (each 9 USDT), your entire principal is returned. Additionally, if you don’t get any referrals, you can either use Quit Me or Replace Me."
    },
    hi: {
      question: "10. क्या किसी यूज़र का पैसा खो सकता है?",
      answer: "बिल्कुल नहीं। तीन डायरेक्ट रेफरल करने से (9 USDT प्रत्येक) आपका पूरा मूलधन वापस मिल जाता है। यदि कोई रेफरल नहीं मिलता, तो Quit Me या Replace Me के विकल्प उपलब्ध हैं।"
    }
  },
  {
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
      question: "14. इनडायरेक्ट रेफरल क्या है?",
      answer: "- सीधे आपकी रेफरल लिंक से जुड़ने वाले डायरेक्ट रेफरल होते हैं।<br>- आपकी टीम में शामिल बाक़ी यूज़र्स (16 लेवल तक) इनडायरेक्ट रेफरल माने जाते हैं, जिनसे प्रति यूज़र 1 USDT रॉयल्टी प्राप्त होती है।"
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
    en: {
      question: "16. What is the Replace Me button?",
      answer: "It allows users with no referrals to transfer their ID to a new user and immediately receive their 27 USDT back."
    },
    hi: {
      question: "16. Replace Me बटन क्या है?",
      answer: "यदि कोई यूज़र कोई रेफरल नहीं जोड़ पाता है, तो Replace Me बटन का उपयोग कर अपनी ID किसी नए यूज़र को ट्रांसफर करके तुरंत अपना 27 USDT प्राप्त कर सकता है।"
    }
  },
  {
    en: {
      question: "17. What are the conditions for quitting?",
      answer: "If no referrals are added, users can quit using the Quit Me button. After quitting, your principal is gradually returned from the Refund Pool at up to 0.27 USDT per day until the full 27 USDT is recovered."
    },
    hi: {
      question: "17. किस तरह से Quit किया जा सकता है और इसकी शर्तें क्या हैं?",
      answer: "यदि कोई यूज़र रेफरल नहीं जोड़ पाता है, तो Quit Me बटन का उपयोग करें। Quit करने के बाद Refund Pool से धीरे-धीरे 27 USDT तक का भुगतान होता है।"
    }
  },
  {
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
    en: {
      question: "24. Can a user who quit join again?",
      answer: "Yes, after quitting, a user can rejoin with a new referral link."
    },
    hi: {
      question: "24. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Quit करने के बाद यूज़र नए रेफरल लिंक से दुबारा जुड़ सकता है।"
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

function renderFAQ() {
  const faqContainer = document.getElementById('faq-items');
  faqContainer.innerHTML = "";
  faqData.forEach(item => {
    const langData = currentLanguage === 'en' ? item.en : item.hi;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.innerHTML = `<strong>${langData.question}</strong>`;
    const p = document.createElement('p');
    p.innerHTML = langData.answer;
    details.appendChild(summary);
    details.appendChild(p);
    faqContainer.appendChild(details);
  });
}
renderFAQ();

// Language Toggle
document.getElementById('languageBtn').addEventListener('click', () => {
  const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
  if(isEnglish) {
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
  document.getElementById(modalId).style.display = "block";
  if (modalId === "activateModal") { loadUplines(); }
  if (modalId === "teamModal") { loadTeamLevels(); }
}
function closeModal() {
  document.body.classList.remove("modal-open");
  document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
}

// Load Uplines for Activate Modal
function loadUplines() {
  const uplineList = document.getElementById("uplineList");
  if(uplineList) {
    uplineList.innerHTML = "";
    for (let i = 15; i >= 1; i--) {
      uplineList.innerHTML += `<div class="beneficiary-item">
        <span>🤠 Upline ${i}</span>
        <input type="text" placeholder="Address pending..." readonly>
        <span class="amount">1 USDT</span>
      </div>`;
    }
  }
}

// Load Team Levels for Team Modal
function loadTeamLevels() {
  const teamLevels = document.querySelector(".team-levels");
  if(teamLevels) {
    let total = 0;
    teamLevels.innerHTML = "";
    for (let i = 1; i <= 16; i++) {
      const members = Math.floor(Math.random() * 5);
      total += members;
      teamLevels.innerHTML += `<div class="level">
        <span>Level ${i}:</span>
        <span>${members} Members</span>
      </div>`;
    }
    document.getElementById("totalMembers").textContent = total;
  }
}

// Distribute Funds
function distributeFunds() {
  document.querySelector(".distribute-btn").style.display = "none";
  const container = document.querySelector(".referral-actions-container");
  container.innerHTML = `<div class="congrats-msg">
      <h3>🎉 Activation Successful!</h3>
      <div class="referral-actions">
        <button class="copy-btn" onclick="copyReferral()">Copy Referral Link</button>
        <button class="telegram-btn" onclick="window.open('https://t.me/+CeJkEHpoTWthZDVl')">Join Telegram</button>
      </div>
    </div>`;
}

// Copy Referral Link
function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert("Link Copied!");
}

// Replace Me
function openReplaceModal() {
  document.getElementById("sponsorLink").value = `https://moneyplant.com/ref?user=${currentSponsor}`;
  openModal("replaceModal");
}
function replaceUser() {
  const newAddress = document.getElementById("newAddress").value;
  if(newAddress) {
    currentSponsor = userAccount;
    userAccount = newAddress;
    document.getElementById("connectWalletBtn").textContent = `Connected: ${newAddress.slice(0,6)}...${newAddress.slice(-4)}`;
    if(document.getElementById("directSponsor")){
      document.getElementById("directSponsor").value = currentSponsor;
    }
    alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddress}`);
    closeModal();
  } else {
    alert("Enter New Wallet!");
  }
}

// Quit Me
function handleQuit() {
  if(confirm("You will get 0.27 USDT daily. Confirm?")){
    alert("Refunds start tomorrow at 4 AM IST.");
    const quitBtn = document.getElementById("quitBtn");
    if(quitBtn) quitBtn.style.display = "none";
  }
      }

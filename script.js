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
      connectBtn.classList.replace('disconnected','connected');
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
// (Welcome Note remains as in HTML)

const faqData = [
  {
    en: {
      question: "1. टीम बनाने के लिए कोई समय सीमा निर्धारित है?",
      answer: "नहीं, यूज़र अपनी सुविधा और समय के अनुसार टीम बना सकते हैं। एक बार ID एक्टिव हो जाने के बाद, वह हमेशा के लिए वैध रहती है। यदि वह कई वर्षों तक कुछ भी न करे और बहुत वर्षों बाद भी टीम बनाना शुरू कर देता है तो भी उन्हें उस दिन से इनकम आनी शुरू हो जाएगी और उनकी अपलाइन टीम को भी इनडायरेक्ट इनकम मिलने लगेगी। Money Plant अपने यूजर्स के साथ अनन्तकाल तक रहेगी, चाहे यूजर्स न हों, वेबसाइट live रहेगी।"
    },
    hi: {
      question: "1. टीम बनाने के लिए कोई समय सीमा निर्धारित है?",
      answer: "नहीं, यूज़र अपनी सुविधा और समय के अनुसार टीम बना सकते हैं। एक बार ID एक्टिव हो जाने के बाद, वह हमेशा के लिए वैध रहती है। यदि वह कई वर्षों तक कुछ भी न करे और बहुत वर्षों बाद भी टीम बनाना शुरू कर देता है तो भी उन्हें उस दिन से इनकम आनी शुरू हो जाएगी और उनकी अपलाइन टीम को भी इनडायरेक्ट इनकम मिलने लगेगी। Money Plant अपने यूजर्स के साथ अनन्तकाल तक रहेगी, चाहे यूजर्स न भी हों, वेबसाइट live रहेगी।"
    }
  },
  {
    en: {
      question: "2. क्या किसी यूज़र का पैसा loss हो सकता है?",
      answer: "बिल्कुल नहीं। Creator ने बहुत सारे विकल्प दे रखे हैं, यदि तीन डायरेक्ट रेफरल (प्रत्येक 9 USDT) से आपका पूरा मूलधन वापस मिल जाता है। यदि कोई रेफरल नहीं मिलता, तो Quit Me या Replace Me के विकल्प उपलब्ध हैं। यदि कोई refund pool से धीरे-धीरे पैसे नहीं लेना चाहता, तो Replace Me का इस्तेमाल कर अपनी ID किसी नए यूज़र को बेच भी सकता है, जिससे कि उन्हें नए यूज़र से (27 USDT) एक बार में सारा मूलधन मिल जाए।"
    },
    hi: {
      question: "2. क्या किसी यूज़र का पैसा loss हो सकता है?",
      answer: "बिल्कुल नहीं। Creator ने बहुत सारे विकल्प दे रखे हैं, यदि तीन डायरेक्ट रेफरल (प्रत्येक 9 USDT) से आपका पूरा मूलधन वापस मिल जाता है। यदि कोई रेफरल नहीं मिलता, तो Quit Me या Replace Me के विकल्प उपलब्ध हैं। यदि कोई refund pool से धीरे-धीरे पैसे नहीं लेना चाहता, तो Replace Me का इस्तेमाल कर अपनी ID किसी नए यूज़र को बेच भी सकता है, जिससे कि उन्हें नए यूज़र से (27 USDT) एक बार में सारा मूलधन मिल जाए।"
    }
  },
  {
    en: {
      question: "3. क्या किसी यूज़र की ID को ब्लैकलिस्ट या ब्लॉक किया जा सकता है?",
      answer: "नहीं, क्योंकि सिस्टम पूरी तरह विकेंद्रीकृत है। किसी की भी ID को ब्लैकलिस्ट या ब्लॉक नहीं किया जा सकता।"
    },
    hi: {
      question: "3. क्या किसी यूज़र की ID को ब्लैकलिस्ट या ब्लॉक किया जा सकता है?",
      answer: "नहीं, क्योंकि सिस्टम पूरी तरह विकेंद्रीकृत है। किसी की भी ID को ब्लैकलिस्ट या ब्लॉक नहीं किया जा सकता।"
    }
  },
  {
    en: {
      question: "4. डायरेक्ट और इनडायरेक्ट रेफरल से कितनी इनकम होती है?",
      answer: "हर डायरेक्ट रेफरल से 9 USDT मिलते हैं और 16-लेवल तक के सभी इनडायरेक्ट रेफरल से 1 USDT मिलते हैं।"
    },
    hi: {
      question: "4. डायरेक्ट और इनडायरेक्ट रेफरल से कितनी इनकम होती है?",
      answer: "हर डायरेक्ट रेफरल से 9 USDT मिलते हैं और 16-लेवल तक के सभी इनडायरेक्ट रेफरल से 1 USDT मिलते हैं।"
    }
  },
  {
    en: {
      question: "5. डायरेक्ट और इनडायरेक्ट रेफरल क्या हैं?",
      answer: "सीधे आपकी रेफरल लिंक से जुड़ने वाले डायरेक्ट रेफरल होते हैं। आपकी टीम में शामिल बाक़ी यूज़र्स (16 लेवल तक) को इनडायरेक्ट रेफरल माना जाता है, जो आपकी टीम द्वारा रेफर किए जाते हैं।"
    },
    hi: {
      question: "5. डायरेक्ट और इनडायरेक्ट रेफरल क्या हैं?",
      answer: "सीधे आपकी रेफरल लिंक से जुड़ने वाले डायरेक्ट रेफरल होते हैं। आपकी टीम में शामिल बाक़ी यूज़र्स (16 लेवल तक) को इनडायरेक्ट रेफरल माना जाता है, जो आपकी टीम द्वारा रेफर किए जाते हैं।"
    }
  },
  {
    en: {
      question: "6. Replace Me बटन क्या है?",
      answer: "यदि कोई यूज़र कोई रेफरल नहीं जोड़ पाता है, तो Replace Me बटन का उपयोग कर अपनी ID किसी नए यूज़र को ट्रांसफर करके तुरंत अपना मूलधन (27 USDT) प्राप्त कर सकता है।"
    },
    hi: {
      question: "6. Replace Me बटन क्या है?",
      answer: "यदि कोई यूज़र कोई रेफरल नहीं जोड़ पाता है, तो Replace Me बटन का उपयोग कर अपनी ID किसी नए यूज़र को ट्रांसफर करके तुरंत अपना मूलधन (27 USDT) प्राप्त कर सकता है।"
    }
  },
  {
    en: {
      question: "7. किस तरह से Quit किया जा सकता है और इसकी शर्तें क्या हैं?",
      answer: "यदि कोई यूज़र रेफरल नहीं जोड़ पाता है, तो Quit Me बटन का उपयोग करें। Quit करने के बाद Refund Pool से रोज 24 घंटे में 1 बार अधिकतम 0.27 USDT का भुगतान होता है, जिसका वितरण कुल जमा राशि को सभी quitters की संख्या से विभाजित कर तय किया जाता है। यह वितरण भी स्मार्ट कॉन्ट्रैक्ट द्वारा ऑटोमेटिकली होता है।"
    },
    hi: {
      question: "7. किस तरह से Quit किया जा सकता है और इसकी शर्तें क्या हैं?",
      answer: "यदि कोई यूज़र रेफरल नहीं जोड़ पाता है, तो Quit Me बटन का उपयोग करें। Quit करने के बाद, Refund Pool से धीरे-धीरे 0.27 USDT प्रति दिन का भुगतान होता है, जिसका वितरण कुल जमा राशि को सभी quitters में बाँटकर तय किया जाता है। यह प्रक्रिया स्मार्ट कॉन्ट्रैक्ट के द्वारा ऑटोमेटिकली होती है।"
    }
  },
  {
    en: {
      question: "8. यदि मैं एक भी रेफरल नहीं जोड़ पाता हूँ तो मुझे मेरा मूलधन 27 USDT कैसे वापस मिलेगा?",
      answer: "यूज़र्स के पास दो विकल्प हैं: (i) Quit Me – धीरे-धीरे Refund Pool से 27 USDT प्राप्त करें, या (ii) Replace Me – तुरंत 27 USDT नए यूज़र से प्राप्त कर लें।"
    },
    hi: {
      question: "8. यदि मैं एक भी रेफरल नहीं जोड़ पाता हूँ तो मुझे मेरा मूलधन 27 USDT कैसे वापस मिलेगा?",
      answer: "यूज़र्स के पास दो विकल्प हैं: (i) Quit Me – धीरे-धीरे Refund Pool से 27 USDT प्राप्त करें, या (ii) Replace Me – तुरंत 27 USDT नए यूज़र से प्राप्त कर लें।"
    }
  },
  {
    en: {
      question: "9. अपना रेफरल लिंक कैसे कॉपी करें?",
      answer: "केवल एक्टिवेटेड यूज़र अपना रेफरल लिंक कॉपी कर सकते हैं। Activate बटन पर क्लिक करें और Distribute Fund पर क्लिक करने के बाद नीचे कॉपी करने का बटन दिखाई देगा।"
    },
    hi: {
      question: "9. अपना रेफरल लिंक कैसे कॉपी करें?",
      answer: "केवल एक्टिवेटेड यूज़र अपना रेफरल लिंक कॉपी कर सकते हैं। Activate बटन पर क्लिक करें और Distribute Fund पर क्लिक करने के बाद नीचे रेफरल लिंक कॉपी करने का बटन दिखाई देगा।"
    }
  },
  {
    en: {
      question: "10. क्या Money Plant एक स्कैम-फ्री प्रोजेक्ट है?",
      answer: "Yes, Money Plant is 100% scam-free because it is entirely based on blockchain and decentralized. All funds are distributed directly among users."
    },
    hi: {
      question: "10. क्या Money Plant एक स्कैम-फ्री प्रोजेक्ट है?",
      answer: "हाँ, Money Plant 100% स्कैम-फ्री है क्योंकि यह पूरी तरह ब्लॉकचेन पर आधारित और विकेंद्रीकृत है। सभी फंड सीधे यूज़र्स के बीच वितरित होते हैं, जिससे scam की कोई गुंजाइश नहीं बचती।"
    }
  },
  {
    en: {
      question: "11. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "Yes, after quitting, a user can rejoin with a new ID at any time."
    },
    hi: {
      question: "11. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?",
      answer: "हाँ, Quit करने के बाद यूज़र कभी भी नई ID लेकर दुबारा जुड़ सकता है।"
    }
  }
];

function renderFAQ() {
  const faqContainer = document.getElementById("faq-items");
  faqContainer.innerHTML = "";
  faqData.forEach(item => {
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

// Language Toggle
document.getElementById("languageBtn").addEventListener("click", () => {
  const isEnglish = document.getElementById("languageBtn").textContent.includes("English");
  if(isEnglish){
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

// Modals: Fullscreen
function openModal(modalId) {
  document.body.classList.add("modal-open");
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

// -----------------------------
// Global Variables & Data
// -----------------------------
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

let isActivated = false;
// यह flag बताएगा कि user ने कभी भी Add Partner उपयोग किया है या नहीं:
// एक बार जोड़ा, तो Replace/Quit दोनों बटन हमेशा disabled रहेंगी।
let hasUsedAddPartnerOption = false;

let partnerExists = false;
let partnerAddressStored = "";
let partnerReferralCount = 0;
let partnerReferralDate = null;

let currentLanguage = "en"; // डिफ़ॉल्ट English

// Welcome Text दोनों भाषाओं में
const englishWelcomeText = `
  Welcome to <b>Money Plant MLM System</b>. This is your own money plant, it's a fully decentralized system where the owner is renounced and only users are the owner.<br><br>
  <b>Here you can grow your money securely and get financial freedom!</b><br><br>
  This system works on a <b>smart contract</b> that automatically distributes rewards among participants in a fair and transparent way. Once you register, you will start earning commissions from direct and indirect referrals.<br><br>
  🌟 <b>100% Safe & Secure</b> - No Admin Control, Fully Decentralized.<br>
  🌟 <b>Instant Payments</b> - No Waiting, Get Paid Instantly.<br />
  🌟 <b>Unlimited Earnings</b> - Grow Your Network, Increase Your Income.<br /><br>
  <b>Transparency:</b> Funds are distributed directly user-to-user without any mediator. Money Plant is a liability-free project and will remain forever with you all.
`;
const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br><br>
  <b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br><br>
  🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br />
  🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br />
  🌟 <b>असीमित कमाई</b> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br /><br>
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।
`;

const faqData = [
  /* आपकी 25 FAQ आइटम्स वैसे ही रखें */
];

// Rules Data for Add Partner (दो भाषाओं में)
const partnerRulesData = {
  en: [
    "A. Any user who has activated their ID with 27 USDT can use the Add Partner feature.",
    "B. Each user can create only one free partner.",
    "C. If your partner does not perform any business activity within 30 days, you can remove them so your earnings do not stop, and add another new partner in their place.",
    "D. If your partner adds even one new ID within the 30-day timeframe, then you will never be able to remove them.",
    "E. Your partner can, at any time, distribute 27 USDT to become the owner of their own system and from that day onward receive 100% of the profit. However, if they leave you to join another user's referral link, the team they previously built will remain under you.",
    "F. If your partner creates their own ID, they will be considered a member of your team, and they can also add their own partner; at that point, you can again add a new partner."
  ],
  hi: [
    "A. Add partner का फायदा कोई भी यूजर ले सकता है जिसने 27 USDT से अपनी ID एक्टिवेट की हो।",
    "B. कोई भी यूजर सिर्फ़ एक ही फ्री पार्टनर बना सकता है।",
    "C. यदि आपका पार्टनर 30 दिनों के भीतर कोई बिज़नेस एक्टिविटी नहीं करता है, तो आप उन्हें हटा सकते हैं ताकि आपकी कमाई न रुके, और उनकी जगह एक नया पार्टनर जोड़ सकते हैं।",
    "D. यदि आपका पार्टनर 30-दिन की समयसीमा में एक भी नई ID जोड़ देता है, तो आप उन्हें कभी नहीं हटा पाएंगे।",
    "E. आपका पार्टनर किसी भी समय 27 USDT डिस्ट्रीब्यूट करके अपने सिस्टम का मालिक बन सकता है और उस दिन से 100% प्रॉफिट पा सकता है। मगर यदि वह आपको छोड़कर किसी दूसरे यूजर के रेफ़रल लिंक से जुड़ता है, तो उसने जो टीम बनायी थी वह आपके अधीन ही रहेगी।",
    "F. यदि आपका पार्टनर अपनी खुद की ID बनाता है, तो उसे आपकी टीम का सदस्य माना जाएगा, और वह अपना पार्टनर भी जोड़ सकेगा; उस समय आप फिर से एक नया पार्टनर जोड़ सकते हैं।"
  ]
};

// Rules Data for Replace Me (दो भाषाओं में)
const replaceRulesData = {
  en: [
    "A. Only the user who activated their ID with 27 USDT and no longer wants to work with the system can sell their ID.",
    "B. Before selling the ID, taking 27 USDT from the new user is solely your responsibility; the system has no involvement in this transaction.",
    "C. Only the user who has zero referrals under them and no partners can use the Replace Me button.",
    "D. Once a user replaces their ID, the old wallet address will be removed from the system, and the new user they bring in will become the owner of the system.",
    "E. The old user's direct sponsor will remain as the new user's direct sponsor. The entire upline team will also remain the same as before.",
    "F. A user who has replaced themselves can, at any time, take a new ID and rejoin Money Plant to work again."
  ],
  hi: [
    "A. सिर्फ वही यूजर अपनी ID बेच सकता है जिसने 27 USDT डिस्ट्रीब्यूट करके अपनी ID एक्टिवेट की हो और अब इस सिस्टम के साथ काम नहीं करना चाहता हो।",
    "B. ID बेचने से पहले नए यूजर से 27 USDT लेना सिर्फ आपकी जिम्मेदारी होगी; इस लेन-देन में सिस्टम का कोई लेना-देना नहीं होगा।",
    "C. सिर्फ वही यूजर Replace Me बटन का उपयोग कर सकता है जिनके नीचे एक भी रेफ़रल न हो और न कोई पार्टनर हो।",
    "D. अगर किसी यूजर ने अपनी ID एक बार रिप्लेस कर दी, तो पुराने यूजर का वॉलेट एड्रेस सिस्टम से हट जाएगा और नए यूजर को ही सिस्टम का मालिक माना जाएगा।",
    "E. पुराने यूजर का डायरेक्ट स्पॉन्सर ही नए यूजर का डायरेक्ट स्पॉन्सर माना जाएगा। Upline टीम भी पहले जैसी ही रहेगी।",
    "F. कोई यूजर जिसने खुद को रिप्लेस कर लिया हो, वह अगर चाहे तो कभी भी नया ID लेकर फिर से Money Plant के साथ जुड़कर काम कर सकता है।"
  ]
};

// Rules Data for Quit Me (दो भाषाओं में, इमेज के अनुसार)
const quitRulesData = {
  en: [
    "A. Only the user who activated their ID with 27 USDT can quit and take their principal back from the refund pool.",
    "B. Only a user with zero referrals under them and no partners can quit and claim the refund from the pool.",
    "C. The total amount in the refund pool will be divided equally among all quitters; each quitter will receive that share every 24 hours.",
    "D. Each quitter can claim from the refund pool only once in 24 hours, up to a maximum of 0.27 USDT per claim.",
    "E. Each quitter will get a refund once per day, until their entire 27 USDT principal is 100% returned. After full refund, they will not get any further payments.",
    "F. If a user has quit and wants to rejoin Money Plant later, they can create a new ID and start working again."
  ],
  hi: [
    "A. सिर्फ वही यूजर quit कर के refund pool से अपना मूलधन वापस ले सकता है जिसने 27 USDT distribute कर के अपनी ID activate की हो।",
    "B. सिर्फ वो ही यूजर quit कर के refund pool से मूलधन वापस ले सकता है जिनके नीचे न कोई referral हो और न ही कोई partner हो।",
    "C. Refund pool में कुल जमा राशि को quitters की कुल संख्या से भाग देने पर जो राशि निकल कर आएगी, प्रत्येक quitter को 24 घंटे में उतनी ही दी जाएगी।",
    "D. Refund pool से प्रत्येक quitter को 24 घंटे में सिर्फ 1 बार ही refund राशि दी जाएगी, जिसकी अधिकतम सीमा 0.27 USDT तय है।",
    "E. प्रत्येक quitter को refund राशि प्रत्येक दिन 1 बार दी जाएगी, मगर जब तक उनका मूलधन 27 USDT 100% वापस नहीं मिल जाता, तब तक उन्हें daily refund मिलता रहेगा।",
    "F. यदि कोई यूजर quit कर चुका है और फिर से Money Plant के साथ काम करना चाहता है, तो वह नई ID बनाकर फिर से काम शुरू कर सकता है।"
  ]
};

// -----------------------------
// Core Functions (Global)
// -----------------------------
async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask!");
    return;
  }
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    userAccount = accounts[0];
    document.getElementById(
      "connectWalletBtn"
    ).textContent = `Connected: ${userAccount.substring(0, 6)}...${userAccount.slice(
      -4
    )}`;
    document
      .getElementById("connectWalletBtn")
      .classList.replace("disconnected", "connected");
    document.getElementById("yourWallet").value = userAccount;
    document.getElementById("newAddress").value = userAccount;
    document.getElementById("sponsorLink").value = userAccount;
    if (document.getElementById("directSponsor")) {
      document.getElementById("directSponsor").value = currentSponsor;
    }
  } catch (err) {
    alert("Approve in MetaMask!");
  }
}

function toggleLanguage() {
  if (currentLanguage === "en") {
    currentLanguage = "hi";
    document.getElementById("welcomeText").innerHTML = hindiWelcomeText;
    document.getElementById("languageBtn").textContent = "हिंदी / English";
  } else {
    currentLanguage = "en";
    document.getElementById("welcomeText").innerHTML = englishWelcomeText;
    document.getElementById("languageBtn").textContent = "English / हिंदी";
  }
  renderFAQ();
  renderPartnerRules();  // Add Partner के नियम अपडेट होंगे
  renderReplaceRules();  // Replace Me के नियम अपडेट होंगे
  // Quit Me के नियम अपडेट नहीं हैं तभी तक जब Quit Me Modal खुलेगा
}

// FAQ Render (पहले जैसा ही)
function renderFAQ() {
  const container = document.getElementById("faq-items");
  container.innerHTML = "";
  faqData.forEach((item) => {
    const lang = currentLanguage === "en" ? item.en : item.hi;
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = lang.question;
    const p = document.createElement("p");
    p.textContent = lang.answer;
    details.append(summary, p);
    container.append(details);
  });
}

// Render Add Partner के Rules
function renderPartnerRules() {
  const rulesContainer = document.getElementById("partnerRules");
  rulesContainer.innerHTML = ""; 
  const ul = document.createElement("ul");
  partnerRulesData[currentLanguage].forEach((ruleText) => {
    const li = document.createElement("li");
    li.textContent = ruleText;
    ul.appendChild(li);
  });
  rulesContainer.appendChild(ul);
}

// Render Replace Me के Rules
function renderReplaceRules() {
  const rulesContainer = document.getElementById("replaceRules");
  rulesContainer.innerHTML = "";
  const ul = document.createElement("ul");
  replaceRulesData[currentLanguage].forEach((ruleText) => {
    const li = document.createElement("li");
    li.textContent = ruleText;
    ul.appendChild(li);
  });
  rulesContainer.appendChild(ul);
}

// Modal Management
function openModal(id) {
  document.body.classList.add("modal-open");
  document.getElementById(id).style.display = "block";

  if (id === "activateModal") loadUplines();
  if (id === "teamModal") loadTeamLevels();
  if (id === "addPartnerModal") renderPartnerRules();
  if (id === "replaceModal") renderReplaceRules();
}

function closeModal() {
  document.body.classList.remove("modal-open");
  document.querySelectorAll(".modal").forEach((m) => (m.style.display = "none"));
}

function loadUplines() {
  const list = document.getElementById("uplineList");
  list.innerHTML = "";
  for (let i = 15; i >= 1; i--) {
    list.innerHTML += `
      <div class="beneficiary-item">
        <span>🤠 Upline ${i}</span>
        <input type="text" placeholder="Address pending..." readonly />
        <span class="amount">1 USDT</span>
      </div>
    `;
  }
}

function loadTeamLevels() {
  const levels = document.querySelector(".team-levels");
  let total = 0;
  levels.innerHTML = "";
  for (let i = 1; i <= 16; i++) {
    const members = Math.floor(Math.random() * 5);
    total += members;
    levels.innerHTML += `
      <div class="level">
        <span>Level ${i}:</span><span>${members} Members</span>
      </div>
    `;
  }
  document.getElementById("totalMembers").textContent = total;

  document.getElementById("todaysIncome").textContent = "0 USDT";
  document.getElementById("totalIncome").textContent = "0 USDT";
}

// Activation & Referral
function distributeFunds() {
  document.querySelector(".distribute-btn").style.display = "none";
  const c = document.querySelector(".referral-actions-container");
  c.innerHTML = `
    <div class="congrats-msg">
      <h3>🎉 Activation Successful!</h3>
      <div class="referral-actions">
        <button class="copy-btn" onclick="copyReferral()">
          Copy Referral Link
        </button>
        <button class="telegram-btn" onclick="window.open('https://t.me/+CeJkEHpoTWthZDVl')">
          Join Telegram
        </button>
      </div>
    </div>
  `;
  isActivated = true;
}

function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert("Link Copied!");
}

// Replace & Quit

function replaceUser() {
  // अगर user ने कभी Add Partner बटन use किया है, तो Replace/Quit always disabled
  if (hasUsedAddPartnerOption) {
    alert("You cannot use Replace Me after using Add Partner.");
    return;
  }
  const newAddr = document.getElementById("newAddress").value.trim();
  if (!newAddr) {
    alert("Enter New Wallet!");
    return;
  }
  currentSponsor = userAccount;
  userAccount = newAddr;
  document.getElementById(
    "connectWalletBtn"
  ).textContent = `Connected: ${newAddr.slice(0, 6)}...${newAddr.slice(-4)}`;
  if (document.getElementById("directSponsor"))
    document.getElementById("directSponsor").value = currentSponsor;
  alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddr}`);
  hideAllButtons();
  closeModal();
}

function handleQuit() {
  // अगर user ने कभी Add Partner बटन use किया है, तो Replace/Quit always disabled
  if (hasUsedAddPartnerOption) {
    alert("You cannot use Quit Me after using Add Partner.");
    return;
  }

  // 1) सबसे पहले नियम (Rules) display करें
  const rulesArray = quitRulesData[currentLanguage]; // इस array में नियम दोनों भाषाओं में हैं
  let combinedText = "";
  rulesArray.forEach((rule, idx) => {
    combinedText += `${idx + 1}. ${rule}\n\n`;
  });
  alert(combinedText.trim()); // पहला पॉपअप: सिर्फ़ नियम

  // 2) एक बार confirmation पूछें
  const userConfirm = confirm(
    currentLanguage === "en"
      ? "Are you sure you want to quit and claim your refund?"
      : "क्या आप सच में quit करके refund लेना चाहते हैं?"
  );
  if (!userConfirm) return;

  // 3) अगर user Confirm करता है, तो अंतिम सूचना दिखाएँ
  alert(
    currentLanguage === "en"
      ? "Refunds start tomorrow at 4 AM IST."
      : "Refund अगले दिन सुबह 4 बजे IST से शुरू होगा।"
  );
  hideAllButtons();
}

// Helper: सभी बटन छिपाएं
function hideAllButtons() {
  document.querySelector(".button-container").style.display = "none";
}

// Add / Remove Partner
function addPartner() {
  if (!isActivated) {
    alert("Activate first!");
    return;
  }
  if (partnerExists) {
    alert("Remove existing partner first.");
    return;
  }
  const addr = document.getElementById("partnerAddress").value.trim();
  if (!addr) {
    alert("Enter Partner Wallet Address!");
    return;
  }

  partnerExists = true;
  partnerAddressStored = addr;
  partnerReferralDate = new Date();
  partnerReferralCount = 0;
  hasUsedAddPartnerOption = true; // एक बार जोड़ा, तो Replace/Quit दोनों बटन हमेशा disabled रहेंगी

  // Replace/Quit दोनों बटन पूरी तरह से hide कर देते हैं
  document.querySelectorAll(".btn-replace, .btn-quit").forEach((btn) => {
    btn.style.display = "none";
  });

  alert(`Successful!
Partner Added.
Your Partner Referral Link: https://moneyplant.com/ref?partner=${addr}
Note: Once you add a partner, you cannot use Replace Me or Quit Me anymore.`);
  closeModal();
}

function removePartner() {
  if (!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  if (partnerReferralCount >= 2) {
    alert("This Partner has ≥2 referrals in last 30 days. Cannot remove.");
    return;
  }
  if (confirm("Remove current Partner?")) {
    partnerExists = false;
    partnerAddressStored = "";
    partnerReferralCount = 0;
    partnerReferralDate = null;
    document.getElementById("partnerAddress").value = "";
    alert("Partner removed successfully.");
    // लेकिन hasUsedAddPartnerOption पहले true हुआ था, तो Replace/Quit दोनों बटन फिर भी disabled ही रहेंगी
  }
}

// -----------------------------
// Hook Up Event Listeners
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("connectWalletBtn")
    .addEventListener("click", connectWallet);
  document
    .getElementById("languageBtn")
    .addEventListener("click", toggleLanguage);

  document
    .querySelectorAll(".btn-activate")
    .forEach((b) => b.addEventListener("click", () => openModal("activateModal")));
  document
    .querySelectorAll(".btn-team")
    .forEach((b) => b.addEventListener("click", () => openModal("teamModal")));
  document
    .querySelectorAll(".btn-replace")
    .forEach((b) => b.addEventListener("click", () => openModal("replaceModal")));
  document
    .querySelectorAll(".btn-quit")
    .forEach((b) => b.addEventListener("click", handleQuit));

  renderFAQ();
});

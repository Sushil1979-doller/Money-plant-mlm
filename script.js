// -----------------------------
// Global Variables & Data
// -----------------------------
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

let isActivated = false;
// यह flag बताएगा कि user ने कभी भी Add Partner उपयोग किया है या नहीं:
// अगर एक बार उपयोग कर लिया, तो Replace/ Quit हमेशा ही disabled रहेगा।
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
  🌟 <b>Instant Payments</b> - No Waiting, Get Paid Instantly.<br>
  🌟 <b>Unlimited Earnings</b> - Grow Your Network, Increase Your Income.<br><br>
  <b>Transparency:</b> Funds are distributed directly user-to-user without any mediator. Money Plant is a liability-free project and will remain forever with you all.
`;
const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br><br>
  <b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br><br>
  🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br />
  🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br />
  🌟 <b>असीमित कमाई</b> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br /><br />
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।
`;

const faqData = [
  /* आपकी 25 FAQ आइटम्स वैसे ही रखें */
];

// Rules Data दोनों भाषाओं में
const partnerRulesData = {
  en: [
    "Only an activated user can add one free partner.",
    "If the free partner does not bring any new joining within 21 days, then the activated user can remove that partner. Only after removal can a new partner be added.",
    "50% of the free partner’s earnings will be shared with the activated user, and 50% will go to the free partner.",
    "If the free partner brings even 1 joining, the activated user cannot remove the free partner at any cost.",
    "A free partner can activate themselves at any time by distributing 27 USDT. Once activated, they will receive 100% income from their own team starting that day.",
    "If the free partner activates themselves, then their (original) partner can add a new partner again.",
    "If any user adds their partner, they will permanently lose the right to use the Replace Me and Quit Me buttons."
  ],
  hi: [
    "सिर्फ activated user ही 1 free partner add कर सकता है।",
    "अगर free पार्टनर 21 दिन के अंदर कोई नई joining नहीं करवाता है तो activated user अपने पार्टनर को remove कर सकता है। और remove करने के बाद ही एक दूसरा नया partner बना सकता है।",
    "Free partner की कमाई का 50% शेयर activated user को जाएगा और 50% free partner को जाएगा।",
    "अगर free partner ने 1 भी joining करवा दी है तो activated user किसी भी कीमत पर free पार्टनर को remove नहीं कर सकता।",
    "Free partner कभी भी 27 USDT distribute कर के खुद को activate कर सकता है और activate होने के बाद उस दिन से वो अपनी टीम से 100% इनकम प्राप्त कर सकता है।",
    "अगर free partner खुद को activate कर लेता है तो उसका पार्टनर फिर से एक नया partner add कर पाएगा।",
    "अगर कोई user अपना पार्टनर add करता है तो फिर वो Replace Me और Quit Me के बटन का इस्तेमाल करने का हक हमेशा के लिए खो देगा।"
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
  renderPartnerRules(); // भाषा बदलते समय rules भी अपडेट हों
}

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

function renderPartnerRules() {
  const rulesContainer = document.getElementById("partnerRules");
  rulesContainer.innerHTML = ""; // पुराने को हटाएं

  const ul = document.createElement("ul");
  partnerRulesData[currentLanguage].forEach((ruleText) => {
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

  // आप चाहें तो इन इन्‍कम IDs में नेटवर्क से डेटा भर सकते हैं
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
  // अगर user ने कभी Add Partner बटन use किया है, तो Replace/Quit हमेशा disabled रहेगा
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
  // अगर user ने कभी Add Partner बटन use किया है, तो Replace/Quit हमेशा disabled रहेगा
  if (hasUsedAddPartnerOption) {
    alert("You cannot use Quit Me after using Add Partner.");
    return;
  }
  if (confirm("You will get up to 0.27 USDT daily. Confirm?")) {
    alert("Refunds start tomorrow at 4 AM IST.");
    hideAllButtons();
  }
}

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
  hasUsedAddPartnerOption = true; // एक बार जोड़ा, तो Replace/Quit हमेशा disabled होंगी

  // अब Replace & Quit दोनों बटन पूरी तरह hide कर देते हैं
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
    // लेकिन hasUsedAddPartnerOption पहले true हुआ था, तो Replace/Quit फिर भी disabled ही रहेगा
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

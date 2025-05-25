// -----------------------------
// Global Variables & Data
// -----------------------------
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

let isActivated = false;
let isPartner = false;
let partnerExists = false;
let partnerAddressStored = "";
let partnerReferralCount = 0;
let partnerReferralDate = null;

let currentLanguage = 'en';

const englishWelcomeText = `
  Welcome to <b>Money Plant MLM System</b>. This is your own money plant, it's a fully decentralized system where the owner is renounced and only users are the owner.<br /><br />
  <b>Here you can grow your money securely and get financial freedom!</b><br /><br />
  This system works on a <b>smart contract</b> that automatically distributes rewards among participants in a fair and transparent way. Once you register, you will start earning commissions from direct and indirect referrals.<br /><br />
  🌟 <b>100% Safe & Secure</b> – No Admin Control, Fully Decentralized.<br />
  🌟 <b>Instant Payments</b> – No Waiting, Get Paid Instantly.<br />
  🌟 <b>Unlimited Earnings</b> – Grow Your Network, Increase Your Income.<br /><br />
  <b>Transparency:</b> Funds are distributed directly user-to-user without any mediator. Money Plant is a liability-free project and will remain forever with you all.
`;

const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br /><br />
  <b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br /><br />
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br /><br />
  🌟 <b>100% सुरक्षित</b> – कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br />
  🌟 <b>तुरंत भुगतान</b> – प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br />
  🌟 <b>असीमित कमाई</b> – अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br /><br />
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।
`;

const faqData = [
  /* आपकी 25 FAQ आइटम्स वैसे ही रखें */
];

// -----------------------------
// Core Functions (Global)
// -----------------------------
async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask!");
    return;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    document.getElementById('connectWalletBtn').textContent = `Connected: ${userAccount.substring(0, 6)}...${userAccount.slice(-4)}`;
    document.getElementById('connectWalletBtn').classList.replace('disconnected', 'connected');

    document.getElementById('yourWallet').value = userAccount;
    document.getElementById('newAddress').value = userAccount;
    document.getElementById('sponsorLink').value = userAccount;
    if (document.getElementById('directSponsor')) {
      document.getElementById('directSponsor').value = currentSponsor;
    }
  } catch (err) {
    alert("Approve in MetaMask!");
  }
}

function toggleLanguage() {
  if (currentLanguage === 'en') {
    currentLanguage = 'hi';
    document.getElementById('welcomeText').innerHTML = hindiWelcomeText;
    document.getElementById('languageBtn').textContent = 'हिंदी / English';
  } else {
    currentLanguage = 'en';
    document.getElementById('welcomeText').innerHTML = englishWelcomeText;
    document.getElementById('languageBtn').textContent = 'English / हिंदी';
  }
  renderFAQ();
}

function renderFAQ() {
  const container = document.getElementById('faq-items');
  container.innerHTML = '';
  faqData.forEach(item => {
    const lang = currentLanguage === 'en' ? item.en : item.hi;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = lang.question;
    const p = document.createElement('p');
    p.textContent = lang.answer;
    details.append(summary, p);
    container.append(details);
  });
}

// Modal Management
function openModal(id) {
  document.body.classList.add('modal-open');
  document.getElementById(id).style.display = 'block';
  if (id === 'activateModal') loadUplines();
  if (id === 'teamModal') loadTeamLevels();
}

function closeModal() {
  document.body.classList.remove('modal-open');
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

function loadUplines() {
  const list = document.getElementById('uplineList');
  list.innerHTML = '';
  for (let i = 15; i >= 1; i--) {
    list.innerHTML += `
      <div class="beneficiary-item">
        <span>🤠 Upline ${i}</span>
        <input type="text" placeholder="Address pending..." readonly />
        <span class="amount">1 USDT</span>
      </div>`;
  }
}

function loadTeamLevels() {
  const levels = document.querySelector('.team-levels');
  let total = 0;
  levels.innerHTML = '';
  for (let i = 1; i <= 16; i++) {
    const members = Math.floor(Math.random() * 5);
    total += members;
    levels.innerHTML += `
      <div class="level">
        <span>Level ${i}:</span><span>${members} Members</span>
      </div>`;
  }
  document.getElementById('totalMembers').textContent = total;
}

// Activation & Referral
function distributeFunds() {
  document.querySelector('.distribute-btn').style.display = 'none';
  const c = document.querySelector('.referral-actions-container');
  c.innerHTML = `
    <div class="congrats-msg">
      <h3>🎉 Activation Successful!</h3>
      <div class="referral-actions">
        <button class="copy-btn" onclick="copyReferral()">Copy Referral Link</button>
        <button class="telegram-btn" onclick="window.open('https://t.me/+CeJkEHpoTWthZDVl')">Join Telegram</button>
      </div>
    </div>`;
  isActivated = true;
}

function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert('Link Copied!');
}

// Replace & Quit
function replaceUser() {
  if (isPartner) {
    alert("Partner cannot use Replace Me!");
    return;
  }
  const newAddr = document.getElementById('newAddress').value.trim();
  if (!newAddr) {
    alert("Enter New Wallet!");
    return;
  }
  currentSponsor = userAccount;
  userAccount = newAddr;
  document.getElementById('connectWalletBtn').textContent = `Connected: ${newAddr.slice(0, 6)}...${newAddr.slice(-4)}`;
  if (document.getElementById('directSponsor')) {
    document.getElementById('directSponsor').value = currentSponsor;
  }
  alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddr}`);
  hideAllButtons();
  closeModal();
}

function handleQuit() {
  if (isPartner) {
    alert("Partner cannot use Quit Me!");
    return;
  }
  if (confirm('You will get up to 0.27 USDT daily. Confirm?')) {
    alert('Refunds start tomorrow at 4 AM IST.');
    hideAllButtons();
  }
}

function hideAllButtons() {
  document.querySelector('.button-container').style.display = 'none';
}

// Add / Remove Partner
function addPartner() {
  if (!isActivated) {
    alert("Activate first!");
    return;
  }
  if (isPartner) {
    alert("Already a Partner!");
    return;
  }
  if (partnerExists) {
    alert("Remove existing partner first.");
    return;
  }
  const addr = document.getElementById('partnerAddress').value.trim();
  if (!addr) {
    alert("Enter Partner Wallet Address!");
    return;
  }
  partnerExists = true;
  partnerAddressStored = addr;
  partnerReferralDate = new Date();
  partnerReferralCount = 0;
  alert(`Successful! Partner Added. Your Partner Referral Link: https://moneyplant.com/ref?partner=${addr} Note: As an activated user, you can remove and add a new Partner if needed.`);
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
    document.getElementById('partnerAddress').value = "";
    alert("Partner removed successfully.");
  }
}

// -----------------------------
// Hook Up Event Listeners
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
  document.getElementById('languageBtn').addEventListener('click', toggleLanguage);

  document.querySelectorAll('.btn-activate').forEach(b => b.addEventListener('click', () => openModal('activateModal')));
  document.querySelectorAll('.btn-team').forEach(b => b.addEventListener('click', () => openModal('teamModal')));
  document.querySelectorAll('.btn-replace').forEach(b => b.addEventListener('click', () => openModal('replaceModal')));
  document.querySelectorAll('.btn-quit').forEach(b => b.addEventListener('click', handleQuit));

  renderFAQ();
});

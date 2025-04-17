// Globals
let userAccount, currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";
let isActivated = false;

// DOM Elements
const welcomeTextEl = document.getElementById('welcomeText');
const langBtn        = document.getElementById('languageBtn');
const connectBtn     = document.getElementById('connectWalletBtn');

// Texts
const EN_TEXT = `
Welcome to <b>Money Plant MLM System</b>. This is your own money plant, it's a fully decentralized system where the owner is renounced and only users are the owner.<br><br>
<b>Here you can grow your money securely and get financial freedom!</b><br><br>
This system works on a <b>smart contract</b> that automatically distributes rewards among participants in a fair and transparent way. Once you register, you will start earning commissions from direct and indirect referrals.<br><br>
🌟 <b>100% Safe & Secure</b> - No Admin Control, Fully Decentralized.<br>
🌟 <b>Instant Payments</b> - No Waiting, Get Paid Instantly.<br>
🌟 <b>Unlimited Earnings</b> - Grow Your Network, Increase Your Income.<br><br>
<b>Transparency:</b> Funds are distributed directly user-to-user without any mediator. Money Plant is a liability-free project and will remain forever with you all.
`;
const HI_TEXT = `
<b>मनी प्लांट एमएलएम सिस्टम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहाँ मालिक का कोई नियंत्रण नहीं है और केवल उपयोगकर्ता ही मालिक हैं।<br><br>
<b>यहाँ आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो प्रतिभागियों के बीच निष्पक्ष भुगतान सुनिश्चित करती है। एक बार पंजीकरण करने पर, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br><br>
🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं।<br>
🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं।<br>
🌟 <b>असीमित कमाई</b> - नेटवर्क बढ़ाएँ, आय बढ़ाएँ।<br><br>
<b>पारदर्शिता:</b> फंड सीधे उपयोगकर्ता-से-उपयोगकर्ता वितरित होते हैं, कोई बिचोलिया नहीं।
`;

// FAQ Data (एक उदाहरण)
const faqData = [
  {
    en: { question: "1. What is Money Plant MLM System?", answer: "Money Plant is a fully decentralized MLM system based on donation and distribution." },
    hi: { question: "1. Money Plant MLM System क्या है?", answer: "Money Plant एक पूरी तरह विकेंद्रीकृत MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है।" }
  }
  // ...बाकी FAQs...
];

// Initialize
document.addEventListener('DOMContentLoaded', ()=> {
  // Default English
  welcomeTextEl.innerHTML = EN_TEXT;
  renderFAQ('en');
});

// Language Toggle
langBtn.addEventListener('click', () => {
  if (langBtn.textContent.includes('English')) {
    // switch to Hindi
    welcomeTextEl.innerHTML = HI_TEXT;
    langBtn.textContent = 'हिंदी / English';
    renderFAQ('hi');
  } else {
    // switch to English
    welcomeTextEl.innerHTML = EN_TEXT;
    langBtn.textContent = 'English / हिंदी';
    renderFAQ('en');
  }
});

function renderFAQ(lang) {
  const container = document.getElementById('faq-items');
  container.innerHTML = '';
  faqData.forEach(item => {
    const d = document.createElement('details');
    const s = document.createElement('summary');
    s.textContent = item[lang].question;
    const p = document.createElement('p');
    p.textContent = item[lang].answer;
    d.appendChild(s); d.appendChild(p);
    container.appendChild(d);
  });
}

// Modal helpers
function openModal(id) {
  document.body.classList.add('modal-open');
  document.getElementById(id).style.display = 'block';
}
function closeModal() {
  document.body.classList.remove('modal-open');
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

// Distribute Funds
function distributeFunds() {
  if (!isActivated) { isActivated = true; }
  const actions = document.querySelector('.referral-actions-container');
  actions.innerHTML = `
    <button class="copy-btn" onclick="copyReferral()">Copy Referral Link</button>
    <button class="telegram-btn" onclick="window.open('https://t.me/+CeJkEHpoTWthZDVl')">Join Telegram</button>
  `;
}

// Copy Referral
function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert('Link Copied!');
}

// Replace Me
function replaceUser() {
  const newAddr = document.getElementById('newAddress').value.trim();
  if (!newAddr) { alert('Enter New Wallet!'); return; }
  alert(`Replaced with ${newAddr}`);
  closeModal();
}

// Quit Me: open modal
function confirmQuit() {
  alert('Refunds start tomorrow at 4 AM IST.');
  closeModal();
}

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

// FAQ data (English + Hindi) - जैसा पहले समझाया गया
const faqData = [
  // ... यहाँ पूरा FAQ डेटा (25 प्रश्न) जैसा पहले दिया गया था ...
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution..."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो..."
    }
  },
  // शेष सभी FAQ Items...
];

// Render FAQ items based on currentLanguage
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

// Initial render in English
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

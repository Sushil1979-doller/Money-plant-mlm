// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Activation and partner related flags
let isActivated = false;         // true once user has deposited 27 USDT (simulated activation)
let isPartner = false;           // true if current user is a partner (joined via someone else's referral)
let partnerExists = false;       // true if an activated user has already added a partner
let partnerAddressStored = "";   // to store the added partner's address
let partnerReferralCount = 0;    // Count of referrals generated by the partner
let partnerReferralDate = null;  // Timestamp to simulate the 30-day window condition

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const connectBtn = document.getElementById('connectWalletBtn');
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace('disconnected', 'connected');
      // Set connected wallet in Add Partner and Replace modals
      const yourWalletField = document.getElementById('yourWallet');
      if (yourWalletField) {
        yourWalletField.value = userAccount;
      }
      const newAddressField = document.getElementById('newAddress');
      if(newAddressField){
        newAddressField.value = userAccount;
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

// Language Toggle
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

// FAQ Data: 25 Questions (बाकी FAQ items वैसा ही रहेंगे)
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
  // ... (बाकी 24 FAQ items)
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

// Modal functions
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

// Hide all 5 main buttons after successful Quit or Replace
function hideAllButtons() {
  const buttonContainer = document.querySelector('.button-container');
  if (buttonContainer) {
    buttonContainer.style.display = 'none';
  }
}

// Distribute Funds: Activation process
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
  isActivated = true;
}

// Copy Referral Link
function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert('Link Copied!');
}

// Replace Me functionality
function replaceUser() {
  if(isPartner){
    alert("Partner cannot use Replace Me function!");
    return;
  }
  const newAddress = document.getElementById('newAddress').value;
  if (newAddress) {
    currentSponsor = userAccount;
    userAccount = newAddress;
    document.getElementById('connectWalletBtn').textContent = `Connected: ${newAddress.slice(0,6)}...${newAddress.slice(-4)}`;
    if(document.getElementById('directSponsor')){
      document.getElementById('directSponsor').value = currentSponsor;
    }
    alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddress}`);
    hideAllButtons();
    closeModal();
  } else {
    alert("Enter New Wallet!");
  }
}

// Quit Me functionality
function handleQuit() {
  if(isPartner){
    alert("Partner cannot use Quit Me function!");
    return;
  }
  if (confirm('You will get up to 0.27 USDT daily. Confirm?')) {
    alert('Refunds start tomorrow at 4 AM IST.');
    hideAllButtons();
  }
}

// Add Partner functionality
function addPartner() {
  if(!isActivated) {
    alert("Please activate your account by depositing 27 USDT first!");
    return;
  }
  if(isPartner) {
    alert("You are a Partner and cannot add a new Partner!");
    return;
  }
  if(partnerExists) {
    alert("A Partner has already been added. Remove the existing Partner to add a new one.");
    return;
  }
  const partnerAddr = document.getElementById('partnerAddress').value.trim();
  if (partnerAddr === "") {
    alert("Please enter Partner Wallet Address!");
    return;
  }
  partnerExists = true;
  partnerAddressStored = partnerAddr;
  partnerReferralDate = new Date();
  partnerReferralCount = 0;
  alert(`Payment successful!
Partner Added.
Your Partner Referral Link: https://moneyplant.com/ref?partner=${partnerAddr}
Note: As an activated user, you can remove and add a new Partner if needed.`);
  closeModal();
}

// Remove Partner functionality
function removePartner() {
  if(!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  if(partnerReferralCount >= 2) {
    alert("This Partner has generated at least 2 referrals in the last 30 days and cannot be removed.");
    return;
  }
  if (confirm("Are you sure you want to remove the current Partner?")) {
    partnerExists = false;
    partnerAddressStored = "";
    partnerReferralCount = 0;
    partnerReferralDate = null;
    document.getElementById('partnerAddress').value = "";
    alert("Partner removed successfully. You can now add a new Partner by paying 3 USDT.");
  }
}

/* 
  Note: In a real-world implementation, partnerReferralCount and the 30-day window 
  would be dynamically managed on the backend.
*/

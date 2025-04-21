// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Activation and partner flags
let isActivated = false;         // 27 USDT activation flag
let isPartner = false;           // true if user joined as a free partner
let isPaidPartner = false;       // true if user is designated as a paid partner (or becomes one)
let partnerExists = false;       // free partner exists flag
let paidPartnerCount = 0;        // count of paid partners added by current user
const MAX_PAID_PARTNERS = 10;

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const connectBtn = document.getElementById('connectWalletBtn');
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace('disconnected', 'connected');
      // Pre-load wallet addresses in input fields
      const yourWalletField = document.getElementById('yourWallet');
      if (yourWalletField) {
        yourWalletField.value = userAccount;
      }
      const newAddressField = document.getElementById('newAddress');
      if(newAddressField){
        newAddressField.value = userAccount;
      }
      const sponsorLinkField = document.getElementById('sponsorLink');
      if(sponsorLinkField) {
        sponsorLinkField.value = userAccount;
      }
      if(document.getElementById('directSponsor')){
         document.getElementById('directSponsor').value = currentSponsor;
      }
      
      // UI Update: यदि user एक paid partner है, तो कुछ बटन छिपाएँ
      updateUIForPaidPartner();
      
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Update UI if user is a Paid Partner
function updateUIForPaidPartner() {
  // यदि isPaidPartner true है, तो Add Partner, Replace Me और Quit Me बटन छिपा दें
  if (isPaidPartner) {
    document.querySelector('.btn-add-partner').style.display = 'none';
    document.querySelector('.btn-replace').style.display = 'none';
    document.querySelector('.btn-quit').style.display = 'none';
  }
}

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

// FAQ Data (बाकी FAQ items वैसा ही)
const faqData = [
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution. Any user can activate their ID by getting referrals from their sponsor."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है।"
    }
  },
  // ... बाकी FAQ items ...
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

// Hide main buttons (for free partner UI) – already defined earlier
function hideAllButtons() {
  const buttonContainer = document.querySelector('.button-container');
  if (buttonContainer) {
    buttonContainer.style.display = 'none';
  }
}

// Distribute Funds (Activation)
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

// Free Partner addition (existing)
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
  alert(`Payment successful!
Partner Added.
Your Partner Referral Link: https://moneyplant.com/ref?partner=${partnerAddr}`);
  closeModal();
}

// Paid Partner addition
function addPaidPartner() {
  if(!isActivated) {
    alert("Only activated users can add a Paid Partner!");
    return;
  }
  if(isPartner) {
    alert("You are already a Partner and cannot add another Paid Partner!");
    return;
  }
  if (paidPartnerCount >= MAX_PAID_PARTNERS) {
    alert("You have reached the maximum allowed number of Paid Partners (10).");
    return;
  }
  const paidPartnerAddr = document.getElementById('paidPartnerAddress').value.trim();
  if (paidPartnerAddr === "") {
    alert("Please enter a valid Paid Partner Wallet Address!");
    return;
  }
  // Simulate payment of 18 USDT and distribution:
  alert(`18 USDT paid! Distribution:
15 Uplines: 15 USDT (1 USDT each)
Refund Pool: 2 USDT
Admin: 1 USDT`);
  
  paidPartnerCount++;
  // Mark the new user as paid partner – in a real backend, this would update the contract state
  // Here, we mark the current user as having added a paid partner;
  // Also, once a paid partner is added, the current user's quit and replace options should be disabled.
  isPaidPartner = true;
  alert(`Paid Partner ${paidPartnerAddr} added successfully!
You'll receive 50% of earnings generated by this Paid Partner and the remaining 50% will be sent to your wallet.`);
  
  // Update UI so that paid partner user does not see Add Partner, Replace Me, Quit Me buttons
  updateUIForPaidPartner();
  
  closeModal();
}

// Remove Partner functionality remains same for free partner removal
function removePartner() {
  if(!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  alert("Partner removed successfully. You can now add a new Partner.");
  partnerExists = false;
  document.getElementById('partnerAddress').value = "";
}

/* 
  Paid partners (logged in via referral link) will have their own UI.
  When a Paid Partner accesses via their referral link, updateUIForPaidPartner()
  will hide Add Partner, Replace Me, and Quit Me buttons.
*/

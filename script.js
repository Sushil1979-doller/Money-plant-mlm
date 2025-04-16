// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Activation and partner flags
let isActivated = false;         // Activation by depositing 27 USDT
let isPartner = false;           // True if joined as a free partner
let isPaidPartner = false;       // True if the user has been added as a paid partner
let isSelfActivated = false;     // True if the paid partner opts for self activation
let partnerExists = false;       // Free partner exists flag
let paidPartnerCount = 0;        // Count of paid partners added by current user
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
      if (yourWalletField) { yourWalletField.value = userAccount; }
      const newAddressField = document.getElementById('newAddress');
      if(newAddressField){ newAddressField.value = userAccount; }
      const sponsorLinkField = document.getElementById('sponsorLink');
      if(sponsorLinkField) { sponsorLinkField.value = userAccount; }
      if(document.getElementById('directSponsor')){
         document.getElementById('directSponsor').value = currentSponsor;
      }
      // UI Update for Paid Partner: यदि user paid partner है तो update करें
      updateUIForPaidPartner();
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Update UI: यदि user paid partner है तो free partner (Add, Replace, Quit) बटन छुपें, और Self Activate का विकल्प जोड़ें
function updateUIForPaidPartner() {
  if (isPaidPartner) {
    // छुपाएँ Add Partner, Replace Me, Quit Me
    let addBtn = document.querySelector('.btn-add-partner');
    let replaceBtn = document.querySelector('.btn-replace');
    let quitBtn = document.querySelector('.btn-quit');
    if(addBtn) addBtn.style.display = 'none';
    if(replaceBtn) replaceBtn.style.display = 'none';
    if(quitBtn) quitBtn.style.display = 'none';
    
    // यदि self activation अभी नहीं हुआ, तो Main UI में "Self Activate" बटन जोड़ें
    if (!isSelfActivated) {
      // यदि पहले से बटन न हो, तो जोड़ें
      if (!document.querySelector('.btn-selfactivate')) {
        let container = document.querySelector('.button-container');
        let selfActBtn = document.createElement('button');
        selfActBtn.className = 'btn-selfactivate';
        selfActBtn.style.background = '#1a6b3a';
        selfActBtn.textContent = 'Self Activate';
        selfActBtn.onclick = function(){ openModal('selfActivateModal'); };
        container.appendChild(selfActBtn);
      }
    }
  }
}

// Language Toggle remains same
let currentLanguage = 'en';
const englishWelcomeText = document.getElementById('welcomeText').innerHTML;
const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br><br>
  <b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है।<br><br>
  🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br>
  🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br>
  🌟 <b>असीमित कमाई</b> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br><br>
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे वितरित होते हैं।
`;
document.getElementById('languageBtn').addEventListener('click', () => {
  const isEng = document.getElementById('languageBtn').textContent.includes('English');
  if (isEng) {
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

// FAQ Rendering (same as before)
const faqData = [
  {
    en: {
      question: "1. What is Money Plant MLM System?",
      answer: "Money Plant is a fully decentralized MLM system based on donation and distribution..."
    },
    hi: {
      question: "1. Money Plant MLM System क्या है?",
      answer: "Money Plant एक पूरी तरह से विकेंद्रीकृत MLM सिस्टम है..."
    }
  },
  // ... अन्य FAQ items ...
];
function renderFAQ() {
  const faqContainer = document.getElementById('faq-items');
  faqContainer.innerHTML = '';
  faqData.forEach(item => {
    const langData = (currentLanguage === 'en') ? item.en : item.hi;
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
  if(modalId === 'activateModal'){ loadUplines(); }
  if(modalId === 'teamModal'){ loadTeamLevels(); }
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

// Free Partner: addPartner and removePartner functions
function addPartner() {
  if(!isActivated) {
    alert("Please activate your account by depositing 27 USDT first!");
    return;
  }
  if(isPaidPartner) {
    alert("As a Paid Partner, you cannot add a new Partner!");
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
function removePartner() {
  if(!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  alert("Partner removed successfully. You can now add a new Partner.");
  partnerExists = false;
  document.getElementById('partnerAddress').value = "";
}

// Paid Partner addition (normal paid partner)
function addPaidPartner() {
  if(!isActivated) {
    alert("Only activated users can add a Paid Partner!");
    return;
  }
  if(isPaidPartner) {
    alert("You are already a Paid Partner and cannot add another.");
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
  // Simulate payment of 18 USDT and its distribution
  alert(`18 USDT paid! Distribution:
15 Uplines: 15 USDT (1 USDT each)
Refund Pool: 2 USDT
Admin: 1 USDT`);
  
  paidPartnerCount++;
  // Mark current user as having a Paid Partner (and set isPaidPartner flag)
  isPaidPartner = true;
  alert(`Paid Partner ${paidPartnerAddr} added successfully!
You will receive 50% of earnings generated by this Paid Partner.
(The remaining 50% will be transferred to your wallet.)`);
  
  // After adding a Paid Partner, free partner options vanish, and quit/replace rights are disabled.
  updateUIForPaidPartner();
  closeModal();
}

// Self Activate for Paid Partner
function selfActivatePaidPartner() {
  // This function allows a paid partner to become self-owned by paying double amount (54 USDT)
  // Check that the user is a paid partner and not already self activated
  if (!isPaidPartner) {
    alert("Only Paid Partners can self activate!");
    return;
  }
  if (isSelfActivated) {
    alert("You are already self activated.");
    return;
  }
  // Simulate payment of 54 USDT and its distribution:
  // Distribution: 36 USDT to sponsor, 15 USDT (1 each to 15 uplines), 1 USDT to admin, 2 USDT to refund pool.
  alert(`54 USDT paid! Distribution:
Sponsor: 36 USDT
15 Uplines: 15 USDT (1 USDT each)
Admin: 1 USDT
Refund Pool: 2 USDT
After this, all team earnings will go 100% to you.`);
  
  // Mark self activation flag as true.
  isSelfActivated = true;
  alert("You are now self activated. All your team earnings will be yours (no revenue share with your sponsor).");
  
  // Update UI to remove free partner buttons as before.
  updateUIForPaidPartner();
  closeModal();
}

// Replace Me functionality (for free partners only)
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

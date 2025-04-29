// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Activation & partner flags
let isActivated = false;
let isPartner = false;
let partnerExists = false;
let partnerAddressStored = "";
let partnerReferralCount = 0;
let partnerReferralDate = null;

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const btn = document.getElementById('connectWalletBtn');
      btn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      btn.classList.replace('disconnected','connected');
      [ 'yourWallet', 'newAddress', 'sponsorLink' ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = userAccount;
      });
      if(document.getElementById('directSponsor')) {
        document.getElementById('directSponsor').value = currentSponsor;
      }
    } catch (e) {
      alert('Approve in MetaMask!');
    }
  } else alert('Install MetaMask!');
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Language Toggle & FAQ (omitted for brevity)

// Modal Controls
function openModal(id) { document.body.classList.add('modal-open'); document.getElementById(id).style.display = 'block'; }
function closeModal(){ document.body.classList.remove('modal-open'); document.querySelectorAll('.modal').forEach(m=>m.style.display='none'); }

// Distribute Funds
function distributeFunds(){
  document.querySelector('.distribute-btn').style.display='none';
  document.querySelector('.referral-actions-container').innerHTML = `
    <h3>🎉 Activation Successful!</h3>
    <button onclick="copyReferral()">Copy Referral Link</button>
    <button onclick="window.open('https://t.me/+CeJkEHpoTWthZDVl')">Join Telegram</button>
  `;
  isActivated = true;
}

// Replace & Quit (omitted)

// Add Partner – no payment
function addPartner() {
  if (!isActivated) {
    alert('Please activate your account first!');
    return;
  }
  if (isPartner) {
    alert('Partners cannot add another partner.');
    return;
  }
  if (partnerExists) {
    alert('You already have a partner. Remove them to add new.');
    return;
  }
  const addr = document.getElementById('partnerAddress').value.trim();
  if (!addr) { alert('Enter partner wallet address!'); return; }
  partnerExists = true;
  partnerAddressStored = addr;
  partnerReferralDate = new Date();
  partnerReferralCount = 0;
  alert(`Partner added successfully! Referral Link: https://moneyplant.com/ref?partner=${addr}`);
  closeModal();
}

// Remove Partner – updated text
function removePartner() {
  if (!partnerExists) { alert('No partner to remove!'); return; }
  if (partnerReferralCount >= 2) {
    alert('This partner has ≥2 referrals in 30 days and cannot be removed.');
    return;
  }
  if (confirm('Remove current partner?')) {
    partnerExists = false;
    partnerAddressStored = '';
    partnerReferralCount = 0;
    partnerReferralDate = null;
    document.getElementById('partnerAddress').value = '';
    alert('Partner removed successfully. You can now add a new partner.');
  }
}

// …सारा आपका पुराना JS कोड जस का तस रहेगा…

// Add Partner functionality
function addPartner() {
  if (!isActivated) {
    alert("Please activate your account by depositing 27 USDT first!");
    return;
  }
  if (isPartner) {
    alert("You are a Partner and cannot add a new Partner!");
    return;
  }
  if (partnerExists) {
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
  // सिर्फ मैसेज अपडेट, पेमेंट लॉजिक हटा दिया गया
  alert(`Partner Added Successfully!\nYour Partner Referral Link: https://moneyplant.com/ref?partner=${partnerAddr}`);
  closeModal();
}

// Remove Partner functionality
function removePartner() {
  if (!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  if (partnerReferralCount >= 2) {
    alert("This Partner has generated at least 2 referrals in the last 30 days and cannot be removed.");
    return;
  }
  if (confirm("Are you sure you want to remove the current Partner?")) {
    partnerExists = false;
    partnerAddressStored = "";
    partnerReferralCount = 0;
    partnerReferralDate = null;
    document.getElementById('partnerAddress').value = "";
    alert("Partner removed successfully. You can now add a new Partner for free.");
  }
}

// …बाकी भी कोई परिवर्तन नहीं हुआ…

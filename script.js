document.addEventListener("DOMContentLoaded", function () {
    let userWallet = null;
    let isActivated = false;

    // भाषा बदलने का फंक्शन
    function changeLanguage(lang) {
        if (lang === "hi") {
            document.body.innerHTML = document.body.innerHTML.replace(/Money Plant/g, "मनी प्लांट")
                .replace(/Welcome/g, "स्वागत है")
                .replace(/Connect Wallet/g, "वॉलेट कनेक्ट करें")
                .replace(/Distribute Your Fund Now/g, "अपने फंड को वितरित करें")
                .replace(/Congratulations 🎉 You Are Activated/g, "बधाई हो 🎉 आप सक्रिय हो गए हैं")
                .replace(/Join Telegram/g, "टेलीग्राम से जुड़ें")
                .replace(/Copy Referral Link/g, "रेफरल लिंक कॉपी करें")
                .replace(/Income History/g, "आय इतिहास")
                .replace(/Refund History/g, "रिफंड इतिहास");
        } else {
            location.reload(); // अंग्रेज़ी के लिए पेज रीलोड करें
        }
    }

    // वॉलेट कनेक्शन फ़ंक्शन
    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                userWallet = accounts[0];
                document.querySelector(".connect-wallet").textContent = userWallet;
            } catch (error) {
                alert("Wallet connection failed!");
            }
        } else {
            alert("Please install MetaMask!");
        }
    }

    // फंड डिस्ट्रीब्यूशन फ़ंक्शन
    async function distributeFunds() {
        if (!userWallet) {
            alert("Please connect your wallet first!");
            return;
        }

        // यहाँ Web3.js या ethers.js का उपयोग करके 27 USDT ट्रांसफर करना होगा
        // फिलहाल हम इसे टेस्ट मोड में रख रहे हैं।
        let transactionSuccess = true; // इसे Smart Contract के रिस्पॉन्स से रिप्लेस करें

        if (transactionSuccess) {
            isActivated = true;
            document.querySelector(".distribute").style.display = "none";
            document.querySelector(".beneficiary").innerHTML += `<h3>Congratulations 🎉 You Are Activated</h3>`;
            document.querySelector(".beneficiary").innerHTML += `<button class="join-telegram">Join Telegram</button>`;

            document.querySelector(".join-telegram").addEventListener("click", function () {
                window.open("https://t.me/+CeJkEHpoTWthZDVl", "_blank");
            });

            document.querySelector(".beneficiary").innerHTML += `<button class="copy-referral">Copy Referral Link</button>`;
            document.querySelector(".copy-referral").addEventListener("click", function () {
                let referralLink = `https://moneyplant.io/?ref=${userWallet}`;
                navigator.clipboard.writeText(referralLink);
                alert("Referral Link Copied!");
            });
        }
    }

    // इनकम हिस्ट्री फ़ंक्शन
    function showIncomeHistory() {
        let incomeHistory = ["5 USDT", "7 USDT", "12 USDT", "8 USDT"]; // इसे Backend API से लाना होगा
        alert("Last 100 Income Transactions:\n" + incomeHistory.join("\n"));
    }

    // रिफंड हिस्ट्री फ़ंक्शन
    function showRefundHistory() {
        let refundHistory = ["2 USDT", "3 USDT", "1 USDT", "5 USDT"];
        let totalRefund = refundHistory.reduce((acc, val) => acc + parseFloat(val), 0);
        alert("Last 100 Refund Transactions:\n" + refundHistory.join("\n") + `\n\nYour Total Refund: ${totalRefund} USDT`);
    }

    // इवेंट लिसनर जोड़ें
    document.querySelector(".connect-wallet").addEventListener("click", connectWallet);
    document.querySelector(".distribute").addEventListener("click", distributeFunds);
    document.querySelector(".history-button:nth-child(1)").addEventListener("click", showIncomeHistory);
    document.querySelector(".history-button:nth-child(2)").addEventListener("click", showRefundHistory);
    document.querySelector(".language-buttons span:nth-child(1)").addEventListener("click", function () { changeLanguage('hi'); });
    document.querySelector(".language-buttons span:nth-child(2)").addEventListener("click", function () { changeLanguage('en'); });
});

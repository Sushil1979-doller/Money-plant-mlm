const translations = {
    en: {
        welcome: "Welcome to Money Plant MLM system, this is your own money plant. It's a fully decentralized system where ownership is renounced, and only users are the real owners. Money Plant is a scam-free project, designed for hard-working networkers who lost money in past scam projects. The developer felt their pain and decided to bring Money Plant into existence to set an example that MLM can be scam-free. Thanks to your sponsor! Start your financial freedom journey from here. Grow your Money Plant, build your team without fear, and get financial freedom.",
    },
    hi: {
        welcome: "मनी प्लांट एमएलएम सिस्टम में आपका स्वागत है, यह आपका खुद का मनी प्लांट है। यह एक पूरी तरह से विकेंद्रीकृत प्रणाली है जहां स्वामित्व त्याग दिया गया है, और केवल उपयोगकर्ता ही असली मालिक हैं। मनी प्लांट एक घोटाला-मुक्त परियोजना है, जिसे उन मेहनती नेटवर्करों के लिए डिज़ाइन किया गया है जिन्होंने अतीत में घोटाले वाली परियोजनाओं में पैसा खो दिया। डेवलपर ने उनकी पीड़ा को महसूस किया और यह दिखाने के लिए मनी प्लांट को अस्तित्व में लाने का फैसला किया कि एमएलएम उद्योग भी घोटाला मुक्त हो सकता है। आपके प्रायोजक को धन्यवाद! यहां से अपनी वित्तीय स्वतंत्रता यात्रा शुरू करें। अपने मनी प्लांट को बढ़ाएं, बिना किसी डर के अपनी टीम बनाएं और वित्तीय स्वतंत्रता प्राप्त करें।",
    }
};

function changeLanguage(lang) {
    document.getElementById("welcome-text").innerText = translations[lang].welcome;
}

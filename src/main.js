const getdata = () => {
  const jsonScript = document.getElementById("tData");

  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('name');
  const userWishText = urlParams.get('wishText');
  const userOutroText = urlParams.get('outroText');
  const userImagePath = urlParams.get('imagePath');

  if (!jsonScript || !jsonScript.textContent) {
    animationTimeline();
    return;
  }

  const data = JSON.parse(jsonScript.textContent);
  const dataArr = Object.keys(data);

  if (userName) data.name = userName;
  if (userWishText) data.wishText = userWishText;
  if (userOutroText) data.outroText = userOutroText;
  if (userImagePath) data.imagePath = userImagePath;
  if (data.text4 && data.text4Adjective) {
    const cleanText = data.text4.replace(/\.$/, '');
    const replacedText = cleanText.replace(
      /(,?\s*)(bir\s+şeyler)/i,
      `$1<strong>${data.text4Adjective}</strong> $2`
    );
    data.text4 = replacedText;
    data.text4Adjective = '';
  }

  const adjectiveEl = document.querySelector('[data-node-name="text4Adjective"]');
  if (adjectiveEl) adjectiveEl.remove();

  dataArr.forEach((customData, index) => {
    if (data[customData] !== "" && data[customData] !== null) {
      const selector = `[data-node-name*="${customData.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1')}"]`;
      const el = document.querySelector(selector);
      if (el) {
        if (customData === "imagePath" || el.nodeName === 'IMG') {
          el.setAttribute("src", data[customData]);
        } else {
          el.innerHTML = data[customData];
        }
      }
    }

    if (index === dataArr.length - 1) {
      animationTimeline();
    }
  });
};

const animationTimeline = () => {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");
  animationend = false

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const fadeIn = { autoAlpha: 0 };
  const fadeOut = { autoAlpha: 0 };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.6, {
      visibility: "visible",
      autoAlpha: 1
    })
    .from(".one", 0.7, { autoAlpha: 0, y: 0 })
    .from(".two", 0.4, { autoAlpha: 0, y: 0 })
    .to(".one", 0.7, { autoAlpha: 0, y: 0 }, "+=2.5")
    .to(".two", 0.7, { autoAlpha: 0, y: 0 }, "-=1")
    .from(".three", 0.7, { autoAlpha: 0, y: 0 })
    .to(".three", 0.7, { autoAlpha: 0, y: 0 }, "+=2")
    .from(".four", 0.7, { ...fadeIn })
    .from(".fake-btn", 0.3, { ...fadeIn })
    .staggerTo(".hbd-chatbox span", 0.05, { autoAlpha: 1 }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", 0.5, { ...fadeOut }, "+=1")
    .from(".idea-1", 0.7, { ...fadeIn })
    .to(".idea-1", 0.7, { ...fadeOut }, "+=1.5")
    .from(".idea-2", 0.7, { ...fadeIn })
    .to(".idea-2", 0.7, { ...fadeOut }, "+=1.5")
    .from(".idea-3", 1.9, { ...fadeIn })
    .to(".idea-3 strong", 0.7, {
      backgroundColor: "rgb(255, 29, 29)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, { ...fadeOut }, "+=1.5")
    .from(".idea-4", 0.7, { ...fadeIn })
    .to(".idea-4", 0.7, { ...fadeOut }, "+=1.5")
    .from(".idea-5", 0.7, { ...fadeIn }, "+=0.5")
    .to(".idea-5", 0.7, { ...fadeOut }, "+=2")
    .call(startConfetti)
    .staggerFrom(".idea-6 span", 10, { ...fadeIn }, 7)
    .staggerTo(".idea-6 span", 2.5, { ...fadeOut }, 3, "+=1")
    .from(".lydia-dp", 0.5, { ...fadeIn }, "-=2")
    .from(".hat", 0.5, { ...fadeIn })
    .staggerFrom(".wish-hbd span", 0.7, { ...fadeIn }, 0.1)
    .staggerTo(".wish-hbd span", 0.7, { color: "#ff69b4" }, 0.1, "party")
    .from(".wish h5", 0.5, { ...fadeIn }, "party")
    .staggerFromTo(".eight svg", 0.4,
      { autoAlpha: 0 },
      { autoAlpha: 1, repeat: 5, yoyo: true, repeatDelay: 0.2 },
      0.2
    )
    .to(".six", 0.5, { autoAlpha: 0, y: 0, zIndex: "-1" })
    .staggerFrom(".nine p", 1, { ...fadeIn });
};

getdata();

function startConfetti() {
  const script = document.createElement('script');
  script.src = "./src/confetti.js";
  document.body.appendChild(script);
}

/* =========================
   ELEMENTS
========================= */

const storyButton = document.getElementById("storyButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const questionBox = document.getElementById("questionBox");
const questionMessage = document.getElementById("questionMessage");

const openLetter = document.getElementById("openLetter");

const musicButton = document.getElementById("musicButton");
const loveSong = document.getElementById("loveSong");

const reasonButton = document.getElementById("reasonButton");
const reasonText = document.getElementById("reasonText");

const secretButton = document.getElementById("secretButton");

const finalSurpriseButton =
  document.getElementById("finalSurpriseButton");

const finalSurprise =
  document.getElementById("finalSurprise");

const closeFinalSurprise =
  document.getElementById("closeFinalSurprise");

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


let noClicks = 0;
let currentReason = 0;



/* =========================
   LIVE COUNTER
========================= */

const relationshipStart =
  new Date("2026-02-12T00:00:00+04:00");


function updateCounter() {

  const now = new Date();

  let difference =
    now - relationshipStart;


  if (difference < 0) {
    difference = 0;
  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  if (daysElement) {
    daysElement.textContent = days;
  }


  if (hoursElement) {
    hoursElement.textContent =
      String(hours).padStart(2, "0");
  }


  if (minutesElement) {
    minutesElement.textContent =
      String(minutes).padStart(2, "0");
  }


  if (secondsElement) {
    secondsElement.textContent =
      String(seconds).padStart(2, "0");
  }

}


updateCounter();

setInterval(
  updateCounter,
  1000
);



/* =========================
   SMOOTH SCROLL
========================= */

if (storyButton) {

  storyButton.addEventListener(
    "click",
    () => {

      document
        .getElementById("counter")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}



/* =========================
   MUSIC
========================= */

let musicPrepared = false;


function prepareMusic() {

  if (
    !loveSong ||
    musicPrepared
  ) {
    return;
  }


  musicPrepared = true;

  loveSong.preload = "auto";

  loveSong.load();

}


/*
  ჯერ საიტი იტვირთება,
  შემდეგ მუსიკა ფონურად მზადდება.
*/

window.addEventListener(
  "load",
  prepareMusic,
  {
    once: true
  }
);


/*
  ტელეფონზე თითის შეხებისთანავე
  მუსიკას მომზადება ეწყება.
*/

if (musicButton) {

  musicButton.addEventListener(
    "pointerdown",
    prepareMusic,
    {
      passive: true
    }
  );


  musicButton.addEventListener(
    "click",
    async () => {

      if (!loveSong) {
        return;
      }


      if (!loveSong.paused) {

        loveSong.pause();


        musicButton
          .classList
          .remove("playing");


        musicButton
          .setAttribute(
            "aria-label",
            "მუსიკის ჩართვა"
          );


        return;
      }


      prepareMusic();


      try {

        await loveSong.play();


        musicButton
          .classList
          .add("playing");


        musicButton
          .setAttribute(
            "aria-label",
            "მუსიკის გამორთვა"
          );

      }

      catch (error) {

        console.log(
          "Audio could not start:",
          error
        );

      }

    }
  );

}


if (loveSong) {

  loveSong.addEventListener(
    "ended",
    () => {

      musicButton
        ?.classList
        .remove("playing");


      musicButton
        ?.setAttribute(
          "aria-label",
          "მუსიკის ჩართვა"
        );

    }
  );

}



/* =========================
   RANDOM LOVE REASONS
========================= */

const reasons = [

  "შენი თვალები.",

  "შენი გიჟი ხასიათი.",

  "როგორ იცინი.",

  "როგორ მიყურებ.",

  "შენი ღიმილი.",

  "ის, რომ შენთან საკუთარი თავი ვარ.",

  "შენი სიჯიუტეც კი.",

  "როგორ შეგიძლია ჩვეულებრივი დღე განსაკუთრებული გახადო.",

  "შენი ხმა.",

  "შენთან ყოფნის სიმშვიდე.",

  "ის, რომ ამდენი წლის შემდეგაც ისევ ისე მიყვარხარ.",

  "უბრალოდ შენ — მთლიანად."

];


if (
  reasonButton &&
  reasonText
) {

  reasonButton.addEventListener(
    "click",
    () => {

      let next;


      do {

        next =
          Math.floor(
            Math.random() *
            reasons.length
          );

      }

      while (
        next === currentReason
      );


      currentReason = next;


      reasonText
        .classList
        .add("change");


      setTimeout(
        () => {

          reasonText.textContent =
            reasons[currentReason];


          reasonText
            .classList
            .remove("change");

        },
        180
      );

    }
  );

}



/* =========================
   SCRATCH CARD
========================= */

const scratchCanvas =
  document.getElementById(
    "scratchCanvas"
  );

const scratchCard =
  document.getElementById(
    "scratchCard"
  );

const scratchHint =
  document.getElementById(
    "scratchHint"
  );


if (
  scratchCanvas &&
  scratchCard
) {

  const scratchContext =
    scratchCanvas.getContext(
      "2d",
      {
        willReadFrequently: true
      }
    );


  let scratching = false;

  let scratchFinished = false;

  let lastPoint = null;

  let cssWidth = 0;

  let cssHeight = 0;

  let checkTimeout = null;



  /* =========================
     HEART ON COVER
  ========================= */

  function drawCoverHeart(
    x,
    y,
    size
  ) {

    scratchContext.save();

    scratchContext.beginPath();


    scratchContext.moveTo(
      x,
      y + size * 0.8
    );


    scratchContext.bezierCurveTo(

      x - size * 1.6,
      y - size * 0.2,

      x - size,
      y - size * 1.45,

      x,
      y - size * 0.55

    );


    scratchContext.bezierCurveTo(

      x + size,
      y - size * 1.45,

      x + size * 1.6,
      y - size * 0.2,

      x,
      y + size * 0.8

    );


    scratchContext.strokeStyle =
      "rgba(255,255,255,.94)";


    scratchContext.lineWidth = 2;

    scratchContext.stroke();

    scratchContext.restore();

  }



  /* =========================
     BUILD SCRATCH COVER
  ========================= */

  function buildScratchCover() {

    if (scratchFinished) {
      return;
    }


    const rect =
      scratchCard
        .getBoundingClientRect();


    cssWidth = rect.width;

    cssHeight = rect.height;


    const ratio =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );


    scratchCanvas.width =
      Math.round(
        cssWidth * ratio
      );


    scratchCanvas.height =
      Math.round(
        cssHeight * ratio
      );


    scratchContext.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );


    scratchContext.clearRect(
      0,
      0,
      cssWidth,
      cssHeight
    );



    /* COVER GRADIENT */

    const gradient =
      scratchContext
        .createLinearGradient(
          0,
          0,
          cssWidth,
          cssHeight
        );


    gradient.addColorStop(
      0,
      "#f4b4c6"
    );


    gradient.addColorStop(
      0.48,
      "#e98da7"
    );


    gradient.addColorStop(
      1,
      "#d86c8e"
    );


    scratchContext.fillStyle =
      gradient;


    scratchContext.fillRect(
      0,
      0,
      cssWidth,
      cssHeight
    );



    /* =========================
       LIGHT TEXTURE
    ========================= */

    scratchContext.save();


    scratchContext.globalAlpha =
      0.12;


    scratchContext.strokeStyle =
      "#ffffff";


    scratchContext.lineWidth = 1;


    for (
      let x = -cssHeight;
      x < cssWidth + cssHeight;
      x += 38
    ) {

      scratchContext.beginPath();


      scratchContext.moveTo(
        x,
        0
      );


      scratchContext.lineTo(
        x + cssHeight,
        cssHeight
      );


      scratchContext.stroke();

    }


    scratchContext.restore();



    /* =========================
       SOFT GLOW
    ========================= */

    const radial =
      scratchContext
        .createRadialGradient(

          cssWidth / 2,
          cssHeight / 2,
          5,

          cssWidth / 2,
          cssHeight / 2,

          Math.max(
            cssWidth,
            cssHeight
          ) * 0.55

        );


    radial.addColorStop(
      0,
      "rgba(255,255,255,.16)"
    );


    radial.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );


    scratchContext.fillStyle =
      radial;


    scratchContext.fillRect(
      0,
      0,
      cssWidth,
      cssHeight
    );



    /* HEART */

    drawCoverHeart(
      cssWidth / 2,
      cssHeight / 2 - 41,
      19
    );



    /* =========================
       SCRATCH TEXT
    ========================= */

    scratchContext.fillStyle =
      "rgba(255,255,255,.97)";


    scratchContext.textAlign =
      "center";


    scratchContext.textBaseline =
      "middle";


    const mobile =
      cssWidth <= 480;


    scratchContext.font =
      mobile
        ? '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial'
        : '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';


    scratchContext.fillText(
      "გაფხიკე აქ",
      cssWidth / 2,
      cssHeight / 2 + 15
    );


    scratchContext.fillStyle =
      "rgba(255,255,255,.72)";


    scratchContext.font =
      mobile
        ? '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial'
        : '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial';


    scratchContext.fillText(
      "პატარა სიურპრიზი გელოდება",
      cssWidth / 2,
      cssHeight / 2 + 44
    );

  }



  /* =========================
     POINTER POSITION
  ========================= */

  function pointerPosition(
    event
  ) {

    const rect =
      scratchCanvas
        .getBoundingClientRect();


    return {

      x:
        (
          event.clientX -
          rect.left
        )
        *
        (
          cssWidth /
          rect.width
        ),

      y:
        (
          event.clientY -
          rect.top
        )
        *
        (
          cssHeight /
          rect.height
        )

    };

  }



  /* =========================
     ERASE LINE
  ========================= */

  function eraseLine(
    from,
    to
  ) {

    scratchContext.save();


    scratchContext
      .globalCompositeOperation =
        "destination-out";


    scratchContext.lineCap =
      "round";


    scratchContext.lineJoin =
      "round";


    scratchContext.lineWidth =
      window.innerWidth <= 600
        ? 44
        : 55;


    scratchContext.beginPath();


    scratchContext.moveTo(
      from.x,
      from.y
    );


    scratchContext.lineTo(
      to.x,
      to.y
    );


    scratchContext.stroke();



    /* ROUND CLEARING POINT */

    scratchContext.beginPath();


    scratchContext.arc(
      to.x,
      to.y,
      scratchContext.lineWidth / 2,
      0,
      Math.PI * 2
    );


    scratchContext.fill();

    scratchContext.restore();

  }



  /* =========================
     SCRATCH PROGRESS
  ========================= */

  function checkScratchProgress() {

    if (scratchFinished) {
      return;
    }


    const image =
      scratchContext
        .getImageData(
          0,
          0,
          scratchCanvas.width,
          scratchCanvas.height
        );


    const pixels =
      image.data;


    let clear = 0;

    let checked = 0;


    /*
      Sampling makes this
      much lighter on phones.
    */

    const skip = 32;


    for (
      let index = 3;
      index < pixels.length;
      index += skip
    ) {

      checked++;


      if (
        pixels[index] < 40
      ) {

        clear++;

      }

    }


    const ratio =
      clear / checked;


    if (
      ratio >= 0.38
    ) {

      revealScratch();

    }

  }



  function scheduleProgressCheck() {

    clearTimeout(
      checkTimeout
    );


    checkTimeout =
      setTimeout(
        checkScratchProgress,
        80
      );

  }



  /* =========================
     REVEAL SCRATCH
  ========================= */

  function revealScratch() {

    if (scratchFinished) {
      return;
    }


    scratchFinished = true;

    scratching = false;


    scratchCard
      .classList
      .add("revealed");


    scratchHint
      ?.classList
      .add("hidden");


    if (
      typeof createCelebration
      ===
      "function"
    ) {

      createCelebration(
        12
      );

    }

  }



  /* =========================
     POINTER DOWN
  ========================= */

  scratchCanvas.addEventListener(
    "pointerdown",
    event => {

      if (scratchFinished) {
        return;
      }


      scratching = true;


      lastPoint =
        pointerPosition(
          event
        );


      try {

        scratchCanvas
          .setPointerCapture(
            event.pointerId
          );

      }

      catch (error) {

        /*
          Some browsers can already
          capture the pointer.
        */

      }


      eraseLine(
        lastPoint,
        {
          x:
            lastPoint.x + 0.1,

          y:
            lastPoint.y + 0.1
        }
      );

    }
  );



  /* =========================
     POINTER MOVE
  ========================= */

  scratchCanvas.addEventListener(
    "pointermove",
    event => {

      if (
        !scratching ||
        scratchFinished
      ) {
        return;
      }


      const current =
        pointerPosition(
          event
        );


      eraseLine(
        lastPoint || current,
        current
      );


      lastPoint =
        current;


      scheduleProgressCheck();

    }
  );



  /* =========================
     POINTER UP
  ========================= */

  function finishScratch(
    event
  ) {

    if (!scratching) {
      return;
    }


    scratching = false;

    lastPoint = null;


    try {

      scratchCanvas
        .releasePointerCapture(
          event.pointerId
        );

    }

    catch (error) {

      /*
        Browser may already
        release the pointer.
      */

    }


    checkScratchProgress();

  }


  scratchCanvas.addEventListener(
    "pointerup",
    finishScratch
  );


  scratchCanvas.addEventListener(
    "pointercancel",
    finishScratch
  );


  scratchCanvas.addEventListener(
    "lostpointercapture",
    () => {

      scratching = false;

      lastPoint = null;

    }
  );



  /* =========================
     RESPONSIVE CANVAS
  ========================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      if (scratchFinished) {
        return;
      }


      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          buildScratchCover,
          180
        );

    }
  );


  buildScratchCover();

}



/* =========================
   YES / NO
========================= */

function getMaxYesGrowth() {

  if (
    window.innerWidth <= 350
  ) {

    return 1.25;

  }


  if (
    window.innerWidth <= 420
  ) {

    return 1.32;

  }


  if (
    window.innerWidth <= 600
  ) {

    return 1.42;

  }


  if (
    window.innerWidth <= 768
  ) {

    return 1.65;

  }


  return 2.05;

}


if (
  noButton &&
  yesButton &&
  questionBox &&
  questionMessage
) {

  noButton.addEventListener(
    "click",
    () => {

      noClicks++;


      /*
        VIBRATION
      */

      if (
        "vibrate" in navigator
      ) {

        navigator.vibrate(
          [
            70,
            35,
            90
          ]
        );

      }



      noButton
        .classList
        .remove("wrong");


      questionBox
        .classList
        .remove("wrong");


      /*
        Restart animation.
      */

      void noButton.offsetWidth;


      noButton
        .classList
        .add("wrong");


      questionBox
        .classList
        .add("wrong");



      /*
        YES BUTTON GROWTH
      */

      const maxGrowth =
        getMaxYesGrowth();


      const growth =
        Math.min(
          1 +
          noClicks * 0.18,
          maxGrowth
        );


      yesButton
        .style
        .setProperty(
          "--yes-size",
          growth
        );



      const messages = [

        "ჰმ... მგონი ეს პასუხი არასწორია.",

        "კიდევ ერთხელ დაფიქრდი.",

        "„კი“ რატომღაც უფრო სწორად გამოიყურება.",

        "მე მაინც სხვა პასუხს ველოდები.",

        "პასუხი მგონი ორივემ ვიცით.",

        "კარგი... ახლა არჩევანი უკვე საკმაოდ მარტივია."

      ];


      questionMessage.textContent =
        messages[
          Math.min(
            noClicks - 1,
            messages.length - 1
          )
        ];


      setTimeout(
        () => {

          noButton
            .classList
            .remove("wrong");


          questionBox
            .classList
            .remove("wrong");

        },
        450
      );

    }
  );



  yesButton.addEventListener(
    "click",
    () => {

      noButton
        .parentElement
        .style
        .display =
          "none";


      yesButton
        .style
        .setProperty(
          "--yes-size",
          1
        );


      yesButton.innerHTML = `

        <svg viewBox="0 0 24 24">

          <path
            d="
              M12 20
              S4 15.3 4 9.5
              C4 6.5 6 5 8.3 5
              c1.7 0 3 1 3.7 2.1
              C12.7 6 14 5 15.7 5
              C18 5 20 6.5 20 9.5
              C20 15.3 12 20 12 20Z
            "
          />

        </svg>

        <span>
          მეც მუდამ ვიქნები
        </span>

      `;


      questionMessage.textContent =
        "შენს გვერდით. ყოველთვის.";


      createCelebration();

    }
  );

}



/* =========================
   GENERIC MODAL FUNCTIONS
========================= */

function openModal(
  modal
) {

  if (!modal) {
    return;
  }


  modal
    .classList
    .add("show");


  document.body
    .classList
    .add("modal-open");

}



function closeModal(
  modal
) {

  if (!modal) {
    return;
  }


  modal
    .classList
    .remove("show");


  const stillOpen =
    document.querySelector(
      ".modal.show"
    );


  if (!stillOpen) {

    document.body
      .classList
      .remove("modal-open");

  }

}



/* =========================
   MODAL CLOSE BUTTONS
========================= */

document
  .querySelectorAll(
    ".modal-close"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const modal =
            button.closest(
              ".modal"
            );


          closeModal(
            modal
          );

        }
      );

    }
  );



/* =========================
   BACKDROP CLOSE
========================= */

document
  .querySelectorAll(
    ".modal-overlay"
  )
  .forEach(
    overlay => {

      overlay.addEventListener(
        "click",
        () => {

          const modal =
            overlay.closest(
              ".modal"
            );


          closeModal(
            modal
          );

        }
      );

    }
  );



/* =========================
   ESC CLOSE
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {

      return;

    }


    document
      .querySelectorAll(
        ".modal.show"
      )
      .forEach(
        modal => {

          closeModal(
            modal
          );

        }
      );


    finalSurprise
      ?.classList
      .remove("show");


    document.body
      .classList
      .remove("modal-open");

  }
);



/* =========================
   PHOTO MODAL
========================= */

const photoModal =
  document.getElementById(
    "photoModal"
  );


const modalPhoto =
  document.getElementById(
    "modalPhoto"
  );


const modalPhotoTitle =
  document.getElementById(
    "modalPhotoTitle"
  );


const modalPhotoStory =
  document.getElementById(
    "modalPhotoStory"
  );


document
  .querySelectorAll(
    ".photo-card"
  )
  .forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          const image =
            card.querySelector(
              "img"
            );


          if (
            !image ||
            !modalPhoto
          ) {

            return;

          }


          modalPhoto.src =
            image.src;


          modalPhoto.alt =
            image.alt;


          if (
            modalPhotoTitle
          ) {

            modalPhotoTitle.textContent =
              card.dataset.title || "";

          }


          if (
            modalPhotoStory
          ) {

            modalPhotoStory.textContent =
              card.dataset.story || "";

          }


          openModal(
            photoModal
          );

        }
      );

    }
  );



/* =========================
   OPEN WHEN
========================= */

const openWhenModal =
  document.getElementById(
    "openWhenModal"
  );


const openWhenTitle =
  document.getElementById(
    "openWhenTitle"
  );


const openWhenText =
  document.getElementById(
    "openWhenText"
  );


document
  .querySelectorAll(
    ".open-when-card"
  )
  .forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          if (
            openWhenTitle
          ) {

            openWhenTitle.textContent =
              card.dataset.title || "";

          }


          if (
            openWhenText
          ) {

            openWhenText.textContent =
              card.dataset.text || "";

          }


          openModal(
            openWhenModal
          );

        }
      );

    }
  );



/* =========================
   SECRET HEART
========================= */

const secretModal =
  document.getElementById(
    "secretModal"
  );


if (
  secretButton
) {

  secretButton.addEventListener(
    "click",
    () => {

      openModal(
        secretModal
      );

    }
  );

}



/* =========================
   LETTER
========================= */

const letterModal =
  document.getElementById(
    "letterModal"
  );


if (
  openLetter
) {

  openLetter.addEventListener(
    "click",
    () => {

      openModal(
        letterModal
      );

    }
  );

}



/* =========================
   FINAL SURPRISE
========================= */

if (
  finalSurpriseButton
) {

  finalSurpriseButton
    .addEventListener(
      "click",
      () => {

        finalSurprise
          ?.classList
          .add("show");


        document.body
          .classList
          .add("modal-open");


        createCelebration(
          35
        );

      }
    );

}


if (
  closeFinalSurprise
) {

  closeFinalSurprise
    .addEventListener(
      "click",
      () => {

        finalSurprise
          ?.classList
          .remove("show");


        document.body
          .classList
          .remove("modal-open");

      }
    );

}



/* =========================
   CELEBRATION HEARTS
========================= */

function createCelebration(
  amount = 18
) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    setTimeout(
      createFloatingHeart,
      i * 75
    );

  }

}



function createFloatingHeart() {

  const heart =
    document.createElement(
      "div"
    );


  heart.className =
    "celebration-heart";


  heart.innerHTML = `

    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
    >

      <path
        d="
          M12 20
          S4 15.3 4 9.5
          C4 6.5 6 5 8.3 5
          c1.7 0 3 1 3.7 2.1
          C12.7 6 14 5 15.7 5
          C18 5 20 6.5 20 9.5
          C20 15.3 12 20 12 20Z
        "
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      />

    </svg>

  `;


  heart.style.left =
    Math.random()
    * 100
    + "vw";


  heart.style.bottom =
    "-40px";


  heart.style.opacity =
    ".85";


  document.body
    .appendChild(
      heart
    );


  requestAnimationFrame(
    () => {

      const rotation =
        Math.random()
        * 80
        - 40;


      heart.style.transform =
        `
          translateY(-110vh)
          rotate(${rotation}deg)
        `;


      heart.style.opacity =
        "0";

    }
  );


  setTimeout(
    () => {

      heart.remove();

    },
    5200
  );

}
const storyButton =
  document.getElementById("storyButton");

const yesButton =
  document.getElementById("yesButton");

const noButton =
  document.getElementById("noButton");

const questionBox =
  document.getElementById("questionBox");

const questionMessage =
  document.getElementById("questionMessage");

const openLetter =
  document.getElementById("openLetter");

const musicButton =
  document.getElementById("musicButton");

const loveSong =
  document.getElementById("loveSong");

const reasonButton =
  document.getElementById("reasonButton");

const reasonText =
  document.getElementById("reasonText");

const secretButton =
  document.getElementById("secretButton");

const finalSurpriseButton =
  document.getElementById("finalSurpriseButton");

const finalSurprise =
  document.getElementById("finalSurprise");

const closeFinalSurprise =
  document.getElementById("closeFinalSurprise");


let noClicks = 0;

let currentReason = 0;



/* =========================
   LIVE COUNTER
========================= */

/*
  12 February 2026
  Georgian timezone UTC +04:00
*/

const relationshipStart =
  new Date(
    "2026-02-12T00:00:00+04:00"
  );


function updateCounter() {

  const now =
    new Date();


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
      (totalSeconds % 86400)
      / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600)
      / 60
    );


  const seconds =
    totalSeconds % 60;


  document
    .getElementById("days")
    .textContent =
      days;


  document
    .getElementById("hours")
    .textContent =
      String(hours)
        .padStart(2, "0");


  document
    .getElementById("minutes")
    .textContent =
      String(minutes)
        .padStart(2, "0");


  document
    .getElementById("seconds")
    .textContent =
      String(seconds)
        .padStart(2, "0");

}


updateCounter();

setInterval(
  updateCounter,
  1000
);



/* =========================
   SMOOTH SCROLL
========================= */

storyButton.addEventListener(
  "click",
  () => {

    document
      .getElementById("counter")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);



/* =========================
   MUSIC
========================= */

musicButton.addEventListener(
  "click",
  async () => {

    if (loveSong.paused) {

      try {

        await loveSong.play();

        musicButton
          .classList
          .add("playing");

      }

      catch (error) {

        console.log(
          "Audio could not start:",
          error
        );

      }

    }

    else {

      loveSong.pause();

      musicButton
        .classList
        .remove("playing");

    }

  }
);



loveSong.addEventListener(
  "ended",
  () => {

    musicButton
      .classList
      .remove("playing");

  }
);



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


reasonButton.addEventListener(
  "click",
  () => {

    let next;


    do {

      next =
        Math.floor(
          Math.random()
          * reasons.length
        );

    }

    while (
      next === currentReason
    );


    currentReason =
      next;


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



/* =========================
   YES / NO
========================= */

noButton.addEventListener(
  "click",
  () => {

    noClicks++;


    /*
      Phone vibration where supported.
    */

    if (
      "vibrate"
      in navigator
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


    void noButton.offsetWidth;


    noButton
      .classList
      .add("wrong");


    questionBox
      .classList
      .add("wrong");


    /*
      YES gets larger every time.
    */

    const maxGrowth =
      window.innerWidth <= 600
        ? 1.55
        : 2.15;


    const growth =
      Math.min(
        1 + noClicks * 0.18,
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


    yesButton.style
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



/* =========================
   GENERIC MODAL FUNCTIONS
========================= */

function openModal(
  modal
) {

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



/* Close modal buttons */

document
  .querySelectorAll(
    ".modal-close"
  )
  .forEach(
    button => {

      button
        .addEventListener(
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


/* Click backdrop */

document
  .querySelectorAll(
    ".modal-overlay"
  )
  .forEach(
    overlay => {

      overlay
        .addEventListener(
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



/* ESC */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key
      !==
      "Escape"
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
      .classList
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

      card
        .addEventListener(
          "click",
          () => {

            const image =
              card.querySelector(
                "img"
              );


            modalPhoto.src =
              image.src;


            modalPhoto.alt =
              image.alt;


            modalPhotoTitle
              .textContent =
                card.dataset.title;


            modalPhotoStory
              .textContent =
                card.dataset.story;


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

      card
        .addEventListener(
          "click",
          () => {

            openWhenTitle
              .textContent =
                card.dataset.title;


            openWhenText
              .textContent =
                card.dataset.text;


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


secretButton.addEventListener(
  "click",
  () => {

    openModal(
      secretModal
    );

  }
);



/* =========================
   LETTER
========================= */

const letterModal =
  document.getElementById(
    "letterModal"
  );


openLetter.addEventListener(
  "click",
  () => {

    openModal(
      letterModal
    );

  }
);



/* =========================
   FINAL SURPRISE
========================= */

finalSurpriseButton
  .addEventListener(
    "click",
    () => {

      finalSurprise
        .classList
        .add("show");


      document.body
        .classList
        .add("modal-open");


      createCelebration(
        35
      );

    }
  );


closeFinalSurprise
  .addEventListener(
    "click",
    () => {

      finalSurprise
        .classList
        .remove("show");


      document.body
        .classList
        .remove("modal-open");

    }
  );



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
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

const closeLetter =
  document.getElementById("closeLetter");

const letterModal =
  document.getElementById("letterModal");

const modalOverlay =
  document.querySelector(".modal-overlay");


let noClicks = 0;


/* =========================
   SMOOTH SCROLL
========================= */

storyButton.addEventListener(
  "click",
  () => {

    document
      .getElementById("story")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  }
);



/* =========================
   "არა" BUTTON
========================= */

noButton.addEventListener(
  "click",
  () => {

    noClicks++;


    /*
      რეალური vibration
      მხარდაჭერილ Android ბრაუზერებზე.
    */

    if ("vibrate" in navigator) {

      navigator.vibrate([
        80,
        40,
        90
      ]);

    }


    /*
      ვიზუალური shake
    */

    noButton.classList.remove("wrong");
    questionBox.classList.remove("wrong");


    void noButton.offsetWidth;


    noButton.classList.add("wrong");
    questionBox.classList.add("wrong");


    /*
      "კი" იზრდება.
      მობილურზე უფრო მცირე ლიმიტი აქვს,
      რომ "არა"-ს არ გადაეფაროს.
    */

    const maxGrowth =
      window.innerWidth <= 600
        ? 1.50
        : 1.90;


    const growth =
      Math.min(
        1 + noClicks * 0.17,
        maxGrowth
      );


    yesButton.style.setProperty(
      "--yes-size",
      growth
    );


    /*
      შეტყობინებები
    */

    const messages = [

      "ჰმ... მგონი ეს პასუხი არასწორია.",

      "კიდევ ერთხელ დაფიქრდი.",

      "რატომღაც „კი“ უფრო სწორად გამოიყურება.",

      "მე მაინც სხვა პასუხს ველოდები.",

      "მგონი პასუხი ორივემ ვიცით.",

      "კარგი... არჩევანი ნელ-ნელა მარტივდება."

    ];


    questionMessage.textContent =
      messages[
        Math.min(
          noClicks - 1,
          messages.length - 1
        )
      ];


    /*
      shake კლასების მოხსნა
    */

    setTimeout(
      () => {

        noButton.classList.remove("wrong");
        questionBox.classList.remove("wrong");

      },
      450
    );

  }
);



/* =========================
   "კი" BUTTON
========================= */

yesButton.addEventListener(
  "click",
  () => {

    questionBox.classList.add(
      "success"
    );


    /*
      არა ქრება
    */

    noButton.parentElement.style.display =
      "none";


    /*
      კი ნორმალურ ზომაზე ბრუნდება
    */

    yesButton.style.setProperty(
      "--yes-size",
      1
    );


    /*
      ტექსტის შეცვლა
    */

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
        მეც მუდამ შენთან ვიქნები
      </span>

    `;


    questionMessage.textContent =
      "შენს გვერდით. ყოველთვის.";


    createCelebration();

  }
);



/* =========================
   LETTER MODAL
========================= */

openLetter.addEventListener(
  "click",
  () => {

    letterModal.classList.add(
      "show"
    );


    document.body.style.overflow =
      "hidden";

  }
);


closeLetter.addEventListener(
  "click",
  closeModal
);


modalOverlay.addEventListener(
  "click",
  closeModal
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


function closeModal() {

  letterModal.classList.remove(
    "show"
  );


  document.body.style.overflow =
    "";

}



/* =========================
   CELEBRATION
========================= */

function createCelebration() {

  for (
    let i = 0;
    i < 18;
    i++
  ) {

    setTimeout(
      createFloatingHeart,
      i * 80
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
      width="24"
      height="24"
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
    Math.random() * 100
    + "vw";


  heart.style.bottom =
    "-35px";


  const size =
    18 +
    Math.random() * 18;


  heart.style.transform =
    `scale(${size / 24})`;


  document.body.appendChild(
    heart
  );


  requestAnimationFrame(
    () => {

      const rotation =
        Math.random() * 80 - 40;


      heart.style.transform =
        `
          translateY(-110vh)
          rotate(${rotation}deg)
          scale(${size / 24})
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
/* =====================================================
   THE MCO TIMES
   ISSUE DATABASE

   ADD NEW ISSUES HERE
===================================================== */


const issues = [

  /*
  ================================================
  ISSUE 01
  ================================================
  */

  {
    title: "Issue 01 — Launch Edition",

    date: "2026-09-25",

    displayDate: "25 September 2026",

    description:
      "The launch edition of The MCO Times.",

    /*
      Paste your Google Drive sharing link here.

      Example:

      https://drive.google.com/file/d/123456789/view?usp=sharing

      Make sure:
      Share → Anyone with the link → Viewer
    */

    pdf:
      "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",

    /*
      Put your newspaper cover inside /assets/

      Example:
      assets/issue-01.jpg
    */

    cover:
      "assets/issue-01.jpg"
  },


  /*
  =================================================
  ADD FUTURE ISSUES BELOW
  =================================================

  Example:

  {
    title: "Issue 02 — October Edition",

    date: "2026-10-20",

    displayDate: "20 October 2026",

    description:
      "October edition of The MCO Times.",

    pdf:
      "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",

    cover:
      "assets/issue-02.jpg"
  }

  =================================================
  */

];



/* =====================================================
   GOOGLE DRIVE URL CONVERTER
===================================================== */


function getDriveID(url) {

  if (!url) return null;

  const match =
    url.match(/\/file\/d\/([^/]+)/);

  if (match) {

    return match[1];

  }

  return null;

}



function getViewerURL(url) {

  const id =
    getDriveID(url);

  if (id) {

    return:
      `https://drive.google.com/file/d/${id}/preview`;

  }

  return url;

}



function getDownloadURL(url) {

  const id =
    getDriveID(url);

  if (id) {

    return:
      `https://drive.google.com/uc?export=download&id=${id}`;

  }

  return url;

}



/* =====================================================
   SORT ISSUES
===================================================== */


function sortIssues(order = "newest") {

  const sorted =
    [...issues];

  sorted.sort(
    (a, b) => {

      const dateA =
        new Date(a.date);

      const dateB =
        new Date(b.date);

      if (order === "newest") {

        return dateB - dateA;

      }

      return dateA - dateB;

    }
  );

  return sorted;

}



/* =====================================================
   FALLBACK COVER
===================================================== */


function fallbackCover(issue) {

  return `

    <div class="cover-fallback">

      <div class="cover-fallback-logo">
        THE MCO TIMES
      </div>

      <hr>

      <div class="date">
        ${issue.displayDate}
      </div>

      <h3>
        ${issue.title}
      </h3>

      <strong>
        REAL STORIES.<br>
        YOUNG VOICES.<br>
        BIGGER DREAMS.
      </strong>

    </div>

  `;

}



/* =====================================================
   LATEST ISSUE
===================================================== */


function renderLatest() {

  const container =
    document.getElementById(
      "latestIssue"
    );

  const sorted =
    sortIssues("newest");


  document.getElementById(
    "issueCount"
  ).textContent =
    `${issues.length} ${
      issues.length === 1
        ? "ISSUE"
        : "ISSUES"
    }`;


  if (!sorted.length) {

    container.innerHTML = `

      <div class="latest-card">

        <div class="latest-info">

          <div class="eyebrow">
            THE MCO TIMES
          </div>

          <h3>
            Launching Soon
          </h3>

          <p>
            The first edition of The MCO Times
            is currently being prepared.
          </p>

        </div>

      </div>

    `;

    return;

  }


  const issue =
    sorted[0];


  container.innerHTML = `

    <div class="latest-card">


      <div class="cover">

        ${
          issue.cover

            ?

          `<img
            src="${issue.cover}"
            alt="${issue.title}"
            onerror="this.style.display='none'; this.parentElement.innerHTML += fallbackCover(${JSON.stringify(issue)})"
          >`

            :

          fallbackCover(issue)
        }

      </div>


      <div class="latest-info">

        <div class="date">
          ${issue.displayDate}
        </div>

        <h3>
          ${issue.title}
        </h3>

        <p>
          ${issue.description}
        </p>

        <button
          class="read"
          onclick='openReader(${JSON.stringify(issue)})'
        >
          READ LIKE A BOOK →
        </button>

      </div>

    </div>

  `;

}



/* =====================================================
   ARCHIVE
===================================================== */


function renderArchive() {

  const order =
    document.getElementById(
      "sort"
    ).value;


  const sorted =
    sortIssues(order);


  const container =
    document.getElementById(
      "archiveList"
    );


  if (!sorted.length) {

    container.innerHTML = `

      <p>
        No editions published yet.
      </p>

    `;

    return;

  }


  container.innerHTML =
    sorted.map(issue => `

      <article class="archive-item">


        <div class="archive-cover">

          ${
            issue.cover

              ?

            `<img
              src="${issue.cover}"
              alt="${issue.title}"
            >`

              :

            fallbackCover(issue)
          }

        </div>


        <div class="archive-info">

          <div class="archive-date">
            ${issue.displayDate}
          </div>

          <h3>
            ${issue.title}
          </h3>

          <p>
            ${issue.description}
          </p>

        </div>


        <button
          class="read"
          onclick='openReader(${JSON.stringify(issue)})'
        >
          READ ISSUE →
        </button>


      </article>

    `).join("");

}



/* =====================================================
   OPEN PDF READER
===================================================== */


function openReader(issue) {

  const reader =
    document.getElementById(
      "reader"
    );


  const viewer =
    document.getElementById(
      "pdfViewer"
    );


  const title =
    document.getElementById(
      "readerTitle"
    );


  const date =
    document.getElementById(
      "readerDate"
    );


  const download =
    document.getElementById(
      "downloadPDF"
    );


  title.textContent =
    issue.title;


  date.textContent =
    issue.displayDate;


  viewer.src =
    getViewerURL(issue.pdf);


  download.href =
    getDownloadURL(issue.pdf);


  reader.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";

}



/* =====================================================
   CLOSE READER
===================================================== */


function closeReader() {

  const reader =
    document.getElementById(
      "reader"
    );


  const viewer =
    document.getElementById(
      "pdfViewer"
    );


  reader.classList.remove(
    "active"
  );


  viewer.src = "";


  document.body.style.overflow =
    "";

}



/* =====================================================
   EVENTS
===================================================== */


document
  .getElementById("closeReader")
  .addEventListener(
    "click",
    closeReader
  );


document
  .querySelector(".reader-overlay")
  .addEventListener(
    "click",
    closeReader
  );


document
  .getElementById("sort")
  .addEventListener(
    "change",
    renderArchive
  );


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeReader();

    }

  }
);



/* =====================================================
   START WEBSITE
===================================================== */


renderLatest();

renderArchive();

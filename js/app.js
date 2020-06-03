const url = "../docs/pdf-sample.pdf";

let pdfDoc = null,
  pageNum = 1;

const scale = 1.5,
  canvas = document.querySelector("#pdf-render");
ctxt = canvas.getContext("2d");

const renderPage = (num) => {
  pdfDoc.getPage(num).then((page) => {
    //   set scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtxt = {
      canvasContext: ctxt,
      viewport: viewport,
    };

    page.render(renderCtxt);

    document.querySelector("#page-num").textContent = num;
  });
};

const showPrevPage = () => {
  if (pageNum < 2) {
    return;
  }
  pageNum--;
  renderPage(pageNum);
};

const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  renderPage(pageNum);
};

//    get doc

pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  console.log(pdfDoc);

  document.querySelector("#page-count").textContent = pdfDoc.numPages;

  //   call doc render
  renderPage(pageNum);
});

//  buttons

document.querySelector("#prev-page").addEventListener("click", showPrevPage);
document.querySelector("#next-page").addEventListener("click", showNextPage);

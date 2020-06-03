const url = "../docs/pdf-sample.pdf";

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.5,
  canvas = document.querySelector("#pdf-render");
ctxt = canvas.getContext("2d");

const renderPage = (num) => {
  pageIsRendering = true;

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
  });
};

//    get doc

pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  console.log(pdfDoc);

  document.querySelector("#page-count").textContent = pdfDoc.numPages;

  //   call doc render
  renderPage(pageNum);
});

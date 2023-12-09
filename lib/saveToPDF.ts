import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export const SaveAsPDFHandler = (elementId: string, invoiceNumber: string) => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }

  // Convert the content of the specified element to PNG
  toPng(element)
    .then((dataUrl) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = dataUrl;

      img.onload = () => {
        // Initialize the PDF
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: [5.5, 8.5],
        });

        const imgProps = pdf.getImageProperties(img);
        const imageType = imgProps.fileType;
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pxFullHeight = imgProps.height;
        const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
        const nPages = Math.ceil(pxFullHeight / pxPageHeight);

        let pageHeight = pdf.internal.pageSize.getHeight();

        // Create a canvas for each page
        for (let page = 0; page < nPages; page++) {
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");

          if (!pageCtx) {
            console.error("Could not get 2D context for canvas");
            return;
          }

          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
            // Trim the final page
            pageCanvas.height = pxFullHeight % pxPageHeight;
            pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
          }

          // Draw the image on the canvas
          pageCtx.fillStyle = "white";
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageCtx.drawImage(
            img,
            0,
            page * pxPageHeight,
            pageCanvas.width,
            pageCanvas.height,
            0,
            0,
            pageCanvas.width,
            pageCanvas.height
          );

          // Add the page to the PDF
          if (page) pdf.addPage();

          const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
          pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
        }

        // Save the PDF
        pdf.save(`invoice-${invoiceNumber}.pdf`);
      };
    })
    .catch((error) => {
      console.error("Oops, something went wrong!", error);
    });
};

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateInvoice({
  invoiceNumber,
  customerName,
  customerEmail,
  plan,
  baseAmount,
  date,
}) {
  const doc = new jsPDF();

  const CGST = baseAmount * 0.09;
  const SGST = baseAmount * 0.09;
  const total = baseAmount + CGST + SGST;

  doc.setFontSize(16);
  doc.text("INVOICE", 14, 22);
  doc.setFontSize(10);
  doc.text(`Invoice #: ${invoiceNumber}`, 14, 30);
  doc.text(`Date: ${date}`, 14, 36);

  doc.text("From:", 14, 46);
  doc.text("QuantumShift Consulting", 14, 51);
  doc.text("GSTIN: 29AXOPK5503B1ZK", 14, 56);
  doc.text(
    "9068, Tower 9, Prestige Tranquility, Budigere Cross Rd, Bengaluru, Karnataka 560049",
    14,
    61,
    { maxWidth: 180 }
  );

  doc.text("To:", 14, 76);
  doc.text(customerName, 14, 81);
  doc.text(customerEmail, 14, 86);

  autoTable(doc, {
    startY: 96,
    head: [["Description", "Amount (INR)"]],
    body: [
      [plan, `₹${baseAmount.toFixed(2)}`],
      ["CGST @ 9%", `₹${CGST.toFixed(2)}`],
      ["SGST @ 9%", `₹${SGST.toFixed(2)}`],
      ["Total", `₹${total.toFixed(2)}`],
    ],
    styles: { fontSize: 10 },
  });

  doc.setFontSize(9);
  doc.text("This is a computer-generated invoice.", 14, doc.lastAutoTable.finalY + 10);

  doc.save(`invoice-${invoiceNumber}.pdf`);
} 

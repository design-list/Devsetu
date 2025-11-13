import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import models from "@/models/index.js";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { safeParse } from "../../../../../utils/localstorage";

const { cart, CartAddOn, CartPackage, UserDetails } = models;

// WINDOWS LOCAL MACHINE CHROME PATH
const LOCAL_CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Convert file to base64 if exists

function fileToBase64IfExists(relPath) {
  try {
    const abs = path.join(process.cwd(), "public", relPath);
    if (!fs.existsSync(abs)) return null;
    const data = fs.readFileSync(abs);
    const ext = path.extname(abs).slice(1);

    if (ext === "svg") {
      return `data:image/svg+xml;base64,${data.toString("base64")}`;
    }

    return `data:image/${ext};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

// function fileToBase64IfExists(relPath) {
//   try {
//     const abs = path.join(process.cwd(), "public", relPath);
//     if (!fs.existsSync(abs)) return null;
//     const data = fs.readFileSync(abs);
//     const ext = path.extname(abs).slice(1);
//     return `data:image/${ext};base64,${data.toString("base64")}`;
//   } catch {
//     return null;
//   }
// }

// UNIVERSAL BROWSER (Windows + Vercel)
async function launchBrowser() {
  const isDev = process.env.NODE_ENV === "development";

  const executablePath = isDev
    ? LOCAL_CHROME_PATH
    : await chromium.executablePath();

  return puppeteer.launch({
    executablePath,
    headless: isDev ? true : chromium.headless,
    args: isDev ? [] : chromium.args,
    defaultViewport: chromium.defaultViewport,
    ignoreHTTPSErrors: true,
  });
}

export async function GET(request, { params }) {
  try {
    const orderId = params.id;

    // === Fetch order ===
    const order = await cart.findOne({
      where: { id: orderId },
      include: [
        { model: CartPackage, as: "package" },
        { model: CartAddOn, as: "add_ons" },
        { model: UserDetails, as: "user_details" },
      ],
    });

    if (!order) throw new Error("Order not found");

    // === Data ===
    const user = order.user_details || {};
    const pkg = order.package || {};
    const addons = order.add_ons || [];
    const total = Number(order.grandTotal || 0);

    // Parse Other Charges
    let otherCharges = {};
    try {
      otherCharges = safeParse(order.otherCharges);
    } catch {
      otherCharges = {};
    }

    const subtotal =
      Number(pkg.price) +
      addons.reduce((sum, a) => sum + a.price * a.quantity, 0);

    // === Images ===
    const logoLeft =
      fileToBase64IfExists("logo-left.png") ||
      fileToBase64IfExists("logo.png");

    const logoRight =
      fileToBase64IfExists("logo-right.png") ||
      fileToBase64IfExists("logo-small.png");

    const devsetuLogo = fileToBase64IfExists("icons/devsetu-horizontal.svg");

    // === HTML + Hybrid Layout (Your header + Devasetu invoice body) ===
    const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    @page { size: A4 landscape; margin: 4mm 10mm; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 11px; margin: 0; color:#111; }

    .header { display:flex; justify-content:space-between; align-items:center; padding: 0 0 10px 0; }
    .brand img { height:34px; }
    .title-right img { height:48px; }
    .hr-muted { height:10px; background:#ddd; margin:10px 0; }

    .boxes { border:1px solid #333; display:flex; margin-top:12px; }
    .box-left { width:70%; border-right:1px solid #333; padding:10px; }
    .box-right { width:30%; padding:10px; }
    .small { font-size:9px; }

    .section-title {
      margin-top:14px;
      background:#ddd;
      padding:6px;
      font-weight:700;
      text-align:center;
      font-size:12px;
      border-radius:2px;
    }

    table.invoice-table {
      width:100%;
      border-collapse: collapse;
      margin-top:14px;
      font-size:10.5px;
    }
    table.invoice-table th {
      background:#f5f5f5;
      font-weight:700;
      text-align:center;
      border:1px solid #333;
      padding:6px;
    }
    table.invoice-table td {
      border:1px solid #333;
      padding:6px;
    }
    td.center { text-align:center; }
    td.desc { text-align:left; }

    tr.empty td {
      height:14px;
      border-color:#ccc;
    }

    .footer-note { margin-top:14px; font-size:10px; }
    .eoe { text-align:right; margin-top:5px; font-size:11px; }

  </style>
</head>

<body>

  <div class="header">
    <div class="brand">
      ${logoLeft ? `<img src="${logoLeft}" />` : `<b>Devasetu</b>`}
    </div>
   <div class="title-right" style="display:flex;align-items:center;gap:10px;">
      ${devsetuLogo ? `<img src="${devsetuLogo}" style="height:100px;" />` : `<b style="font-size:16px;">Devasetu</b>`}
    </div>

  </div>

  <div class="hr-muted"></div>

  <div style="margin-top:10px">
    <div style="float:left; width:60%">
      <div><strong>Invoice Date:</strong> ${new Date(order.paidAt).toLocaleDateString("en-GB")}</div>
      <div><strong>Invoice Number:</strong> ${order.id}</div>
    </div>
    <div style="clear:both;"></div>
  </div>

  <div class="boxes">
    <div class="box-left">
      <strong>Bill From:</strong><br/>
      <div class="small">
        <strong>Name:</strong> Firstprinciple AppsforBharat Private Limited<br/>
        <strong>Address:</strong> #435, First Floor, 17th Cross, 19th Main Rd, Above Axis Bank, Sector 4, HSR Layout, Bengaluru, Karnataka.<br/>
        <strong>Pincode:</strong> 560102<br/>
        <strong>GSTIN:</strong> 29AAECF3454C1ZT<br/>
        <strong>PAN:</strong> AAECF3454C
      </div>
    </div>

    <div class="box-right">
      <strong>Bill To:</strong><br/>
      <div class="small">
        <strong>Name:</strong> ${user.name}<br/>
        <strong>Address:</strong> ${user.address}<br/>
        <strong>GSTIN:</strong> ${user.gstin || "URD"}<br/>
        <strong>PAN:</strong> ${user.pan || "NA"}
      </div>
    </div>
  </div>

  <div class="place-supply" style="border:1px solid #333; border-top:none; padding:8px 10px; display:flex; justify-content:space-between;">
    <div><strong>Place of Supply</strong></div>
    <div><strong>${user.state || "—"}</strong></div>
  </div>

  <div class="section-title">INVOICE SUMMARY</div>

  <table class="invoice-table">
    <thead>
      <tr>
        <th style="width:40px;">Sl No.</th>
        <th style="width:420px;">Description</th>
        <th style="width:80px;">HSN</th>
        <th style="width:60px;">Qty</th>
        <th style="width:80px;">GST Rate</th>
        <th style="width:80px;">Rate*</th>
        <th style="width:100px;">Amount* (Rs)</th>
      </tr>
    </thead>

    <tbody>

      <!-- MAIN PACKAGE -->
      ${ pkg?.name && 
      `<tr>
        <td class="center">1</td>
        <td class="desc">${pkg?.name}</td>
        <td class="center">${pkg?.hsnCode || "—"}</td>
        <td class="center">${pkg?.quantity}</td>
        <td class="center">0%</td>
        <td class="center">${pkg?.price?.toFixed(2)}</td>
        <td class="center">${pkg?.price?.toFixed(2)}</td>
      </tr>`}

      <!-- ADDONS -->
      ${addons
        .map((a, i) => {
          const amt = a.price * a.quantity;
          return `
          <tr>
            <td class="center">${i + 2}</td>
            <td class="desc">${a.name}</td>
            <td class="center">${a.hsnCode || "—"}</td>
            <td class="center">${a.quantity}</td>
            <td class="center">0%</td>
            <td class="center">${a.price.toFixed(2)}</td>
            <td class="center">${amt.toFixed(2)}</td>
          </tr>`;
        })
        .join("")}

      <!-- EMPTY ROWS -->
      ${Array.from({ length: 2 })
        .map(
          () => `
        <tr class="empty">
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>`
        )
        .join("")}

      <!-- SUBTOTAL -->
      <tr>
        <td colspan="6" style="text-align:center; font-weight:700;">
          Subtotal
        </td>
        <td class="center" style="font-weight:700;">
          ${subtotal.toFixed(2)}
        </td>
      </tr>

      <!-- EXISTING TOTAL ROWS (R1 = always show) -->

      ${order.tipAmount > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Tip Amount</td>
        <td class="center">${order.tipAmount}</td></tr>` : ""}

        ${otherCharges?.service_charge > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Service Charge</td>
        <td class="center">${otherCharges.service_charge}</td></tr>` : ""}

        ${otherCharges?.pandit_charge > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Pandit Dakshina</td>
        <td class="center">${otherCharges.pandit_charge}</td></tr>` : ""}

        ${otherCharges?.media_handling_charge > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Media Handling Charge</td>
        <td class="center">${otherCharges.media_handling_charge}</td></tr>` : ""}

        ${order.deliveryCharge > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Delivery Charge</td>
        <td class="center">${order.deliveryCharge}</td></tr>` : ""}

        ${order.convenienceFee > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Convenience Fee</td>
        <td class="center">${order.convenienceFee}</td></tr>` : ""}

        ${order.discount > 0 ? `
        <tr><td colspan="6" style="text-align:center;">Discount</td>
        <td class="center">${order.discount}</td></tr>` : ""}

        ${order.igst > 0 ? `
        <tr><td colspan="6" style="text-align:center;">IGST</td>
        <td class="center">${order.igst}</td></tr>` : ""}

        ${order.cgst > 0 ? `
        <tr><td colspan="6" style="text-align:center;">CGST</td>
        <td class="center">${order.cgst}</td></tr>` : ""}

        ${order.sgst > 0 ? `
        <tr><td colspan="6" style="text-align:center;">SGST</td>
        <td class="center">${order.sgst}</td></tr>` : ""}

      <!-- TOTAL -->
      <tr>
        <td colspan="6" style="text-align:center; font-weight:700;">Total Amount</td>
        <td class="center" style="font-weight:700;">${total.toFixed(2)}</td>
      </tr>

    </tbody>
  </table>

  <div class="eoe">E. & O.E</div>

  <div class="footer-note">
    <div><em>* excludes GST</em></div>
    <div style="margin-top:8px;"><strong>Amount Chargeable (in words)</strong><br/>${numberToWords(
          total
        )} only</div>
    <div style="margin-top:10px;" class="small"><strong>Note:</strong> This is a system generated invoice and doesn't require to be signed</div>
    <div style="margin-top:12px; font-size:9px; color:#333;">
      <strong>Registered Office Address:</strong><br/>
      #435, First Floor, 17th Cross, 19th Main Rd, Above Axis Bank, Sector 4, HSR Layout, Bengaluru, Karnataka, Pin: 560102
    </div>
  </div>

</body>
</html>
`;

    // === Generate PDF ===
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="invoice-${orderId}.pdf"`,
      },
    });
  } catch (err) {
    console.error("❌ PDF Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Helper: Convert number to words
function numberToWords(num) {
  const a = [
    "", "one", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
  ];
  const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if ((num = num.toString()).length > 9) return "overflow";
  const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return "";
  let str = "";
  str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " crore " : "";
  str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " lakh " : "";
  str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " thousand " : "";
  str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " hundred " : "";
  str += n[5] != 0 ? (str != "" ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + " " : "";
  return str.trim();
}

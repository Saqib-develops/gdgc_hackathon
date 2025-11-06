const QRCode = require("qrcode");

const restaurantURL = "http://localhost:5173/chat";

QRCode.toFile("qr-foodie.png", restaurantURL, function (err) {
  if (err) throw err;
  console.log("✅ QR saved as qr-foodie.png");
});

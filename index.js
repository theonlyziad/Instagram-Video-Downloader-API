const express = require("express");
const app = express();
const snapsave = require("./snapsave-downloader/src/index");

// استخدم PORT من Vercel (أو 3000 لو محلي)
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Instagram Downloader API ✅ - جاهز للاستخدام" });
});

app.get("/igdl", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing" });
    }

    const downloadedURL = await snapsave(url);
    
    res.json({ 
      success: true, 
      url: downloadedURL 
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error",
      message: err.message 
    });
  }
});

// مهم جداً لـ Vercel (Serverless)
module.exports = app;

// فقط لو تبي تشغله محلياً (اختياري)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}

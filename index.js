// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const streamerDB = path.join(__dirname, "Streamer", "Controller", "Databases", "streamers.json");
const botPath = path.join(__dirname, "KapBilly7581");
const streamerPath = path.join(__dirname, "Streamer");

let streamerProcess = null; 
let botProcess = null;     

function startBot() {
  if (!fs.existsSync(botPath)) {
    return console.log("❌ KapBilly7581 klasörü bulunamadı.");
  }

  console.log("\n🔹 Bot klasöründe işlem başlatılıyor...");
  console.log("▶️ Bot başlatılıyor...");

  botProcess = spawn("node", ["."], {
    cwd: botPath,
    stdio: "inherit"
  });

  botProcess.on("exit", (code) => {
    console.log(`❗ Bot kapandı. Kod: ${code}. 5 saniye sonra yeniden başlatılıyor...`);
    setTimeout(startBot, 5000);
  });
}

startBot();

function hasTokens() {
  try {
    const db = JSON.parse(fs.readFileSync(streamerDB, "utf8"));
    return Object.values(db).some(user => user.tokens && user.tokens.length > 0);
  } catch {
    return false;
  }
}

function startStreamer() {
  if (!fs.existsSync(streamerPath)) {
    return console.log("❌ Streamer klasörü bulunamadı.");
  }

  // token yoksa çalıştırma
  if (!hasTokens()) {
    console.log("ℹ Streamer başlatılmadı (database boş).");
    return;
  }

  console.log("▶️ Streamer başlatılıyor...");

  streamerProcess = spawn("npm", ["start"], {
    cwd: streamerPath,
    shell: true,
    stdio: "inherit"
  });

  streamerProcess.on("exit", () => {
    console.log("⚠ Streamer kapandı. Token varsa tekrar çalışacak...");
  });
}

function stopStreamer() {
  if (streamerProcess) {
    streamerProcess.kill("SIGKILL");
    streamerProcess = null;
    console.log("⛔ Streamer durduruldu (database boş).");
  }
}

function cleanInvalidTokens() {
  try {
    const db = JSON.parse(fs.readFileSync(streamerDB, "utf8"));
    let modified = false;

    for (const userId in db) {
      db[userId].tokens = db[userId].tokens.filter(t => {
        const valid =
          t.token && typeof t.token === "string" &&
          t.voice && typeof t.voice === "string";

        if (!valid) modified = true;
        return valid;
      });

      if (db[userId].tokens.length === 0) {
        delete db[userId];
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(streamerDB, JSON.stringify(db, null, 2));
      console.log("🧹 Hatalı veri bulundu ve database temizlendi.");
    }
  } catch (e) {
    console.log("⚠ Database okunamadı:", e.message);
  }
}

cleanInvalidTokens();
startStreamer();

fs.watch(streamerDB, (event) => {
  if (event !== "change") return;

  console.log("\n🔄 Database değişti, yeniden kontrol ediliyor...");

  cleanInvalidTokens();

  if (hasTokens()) {
    if (!streamerProcess) startStreamer();
  } else {
    stopStreamer();
  }
});
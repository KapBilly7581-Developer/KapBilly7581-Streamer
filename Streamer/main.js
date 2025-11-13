// Streamer By Wraiths (KapBilly7581)
// KapBilly7581 sadece projeyi geliştirmiştir.

require('./polyfill.js');
const { Client } = require("discord.js-selfbot-v13");
const { DiscordStreamClient } = require("discord-stream-client");
const fs = require("fs");
const path = require("path");
const play = require("play-dl");

const videoList = JSON.parse(fs.readFileSync('./videos.json', 'utf8')).videoUrls;
const dbPath = path.join(__dirname, "Controller", "Databases", "streamers.json");

const activeClients = new Map();

function loginToken(userId, tokenData) {
  const client = new Client({ checkUpdate: false });
  const StreamClient = new DiscordStreamClient(client);

  StreamClient.setResolution("720p");
  StreamClient.setVideoCodec("H264");

  client.streamClient = StreamClient;
  client.voiceChannelId = tokenData.voice;

  client.login(tokenData.token).catch(err => {
    if (err.message.includes("TOKEN_INVALID")) {
      console.log(`❌ Geçersiz token bulundu: ${tokenData.token.slice(0, 20)}...`);
      return;
    }
    console.log("❗ Login hatası:", err.message);
  });

  client.on("ready", async () => {
    console.log(`✅ Selfbot ${client.user.tag} hazır!`);
    const voiceChannel = client.channels.cache.get(tokenData.voice);
    if (!voiceChannel) return;

    const voiceConnection = await StreamClient.joinVoiceChannel(voiceChannel, {
      selfDeaf: false,
      selfMute: false,
      selfVideo: tokenData.cameraOnly,
    });

    if (!tokenData.streamEnabled) return;

    const videoSource = videoList[Math.floor(Math.random() * videoList.length)];
    const streamConnection = await voiceConnection.createStream(false);
    const player = StreamClient.createPlayer(videoSource, streamConnection.udp);

    player.play();
    player.on("start", () => console.log(`▶️ Started playing in ${voiceChannel.name}`));
    player.on("finish", () => {
      console.log(`⏹ Stopped in ${voiceChannel.name}`);
      setTimeout(() => player.play(), 1000);
    });
    player.on("error", (err) => console.error(err));

    if (!activeClients.has(userId)) activeClients.set(userId, []);
    activeClients.get(userId).push({ client, tokenData, player, voiceConnection });
  });
}

function loadDatabase() {
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (err) {
    console.error("❗ Database okunamadı:", err.message);
    return;
  }

  for (const userId in db) {
    for (const tokenData of db[userId].tokens) {
      const alreadyActive = activeClients.get(userId)?.some(c => c.tokenData.token === tokenData.token);
      if (!alreadyActive) loginToken(userId, tokenData);
    }
  }
}

fs.watch(dbPath, (event) => {
  if (event === "change") {
    console.log("🔄 Database güncellendi, yeni tokenlar kontrol ediliyor...");
    loadDatabase();
  }
});

loadDatabase();
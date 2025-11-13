// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js");
const fs = require("fs");
const path = require("path");
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const allowedUserIds = ["1333709062423969853"];
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
module.exports = {
  Isim: "kapbillymi-dedi-birisi-ayol-kasiste-yilan-gibiyim-wow",
  Komut: ["kapbillymi-dedi-birisi-ayol-kasiste-yilan-gibiyim-wow"],
  Kullanim: "kapbillymi-dedi-birisi-ayol-kasiste-yilan-gibiyim-wow",
  Aciklama: "Streamer Token ekleme, düzenleme veya kaldırma menüsü",
  Kategori: "genel",
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
  onRequest: async function (client, message, args) {
    if (!allowedUserIds.includes(message.author.id))
      return message.reply("❌ Bu komutu kullanma yetkin yok.");
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    const user = message.member;
    const userId = user.id;

// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    const roleLimits = {
      "1438134366462021692": 5,
      "1438134556317192192": 10,
      "1438134684453437441": 15,
      "1438134828787699743": 20,
      "1438134978931195974": 25,  // aşko şimdi burayı kendine göre dolduruyorsun tamammı aşko
      "1438135139870707712": 30,  // sonra bak id ler rol id si kendi sunucundaki roleri ayarla cano istedin kadar rol ekleye bilir 
      "1438135323388543016": 35,  // veya kaldıra bilirsin tammamı bak aşko mavi sayılar var yanlarinda 5 , 10 gibi gördünmü
      "1438135527328190494": 45,  // işte aşko onlar haklar hangi rolere ne kadar hak vereceğini ayarla işte örn. üye rolüne sahipler 2 hak vb vb 
      "1438135670140047511": 50. // Bunları yazarken ellerim yorulda aşko github deposuna yıldız vere bilirmisin tamam teşşekürler ayol - KapBilly7581
    };
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    let userLimit = 0;
    for (const [role, limit] of Object.entries(roleLimits)) {
      if (user.roles.cache.has(role)) userLimit = limit;
    }
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    if (userLimit === 0)
      return message.reply("❌ Herhangi bir üyelik rolün olmadığı için token ekleyemezsin.");
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const dbDir = path.join(__dirname, "..", "..", "Streamer", "Controller", "Databases");
const dbPath = path.join(dbDir, "streamers.json");

console.log(`[KapBilly7581] Hedef DB dizini: ${dbDir}`);
console.log(`[KapBilly7581] Hedef DB dosyası: ${dbPath}`);

// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`[KapBilly7581] Oluşturuldu: ${dbDir}`);
}

// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "{}", "utf8");
  console.log(`[KapBilly7581] Oluşturuldu: ${dbPath}`);
}

// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    if (!db[userId]) db[userId] = { tokens: [] };
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    if (db[userId].tokens.length >= userLimit)
      return message.reply(`⚠️ Token ekleme limitine ulaştın. (Limit: ${userLimit})`);
      
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    const embed = new EmbedBuilder()
  .setColor("#800080")
  .setTitle("🚀 KapBilly7581 • Live , Cam And Voice Self Bot System")
  .setDescription(
    '🌌 **Özel Ses Afk Bot Streamer Sistemimiz ile Tanışın!**\n\n' +
    'Bu sistem, Discord hesaplarınızda 7/24 belirlenen ses kanalında **dura bilen**, tamamen gelişmiş ve kullanıcı dostu bir bottur. Ayrıca yayın vrya kamera açabilir.\n\n' +
    '───────────────────────────────\n\n' +
    '❓️ **Ne İşe Yarar:**\n' +
    '🎧 **Ses Aktifliği Kazanırsınız**\n' +
    '💪 Yetkiniz Güçlenir!\n' +
    '🛡️ Afk Kalarak Aktif Gözükürsünüz\n\n' +
    '🎧 Afk Kalarak Sanal Kamera Veya Ekran Aça Bilirsiniz\n\n' +
    '❓️ **Hesap Tokenimi Nasıl Alırım:**\n' +
    '1️⃣ Discord\'u Tarayıcıda Aç (Chrome/Firefox)\n' +
    '2️⃣ **F12** Tuşuna Bas ve **Network** Sekmesine Gel\n' +
    '3️⃣ Herhangi Bir Kanala Mesaj Yaz\n' +
    '4️⃣ **Authorization** Header\'ında Token\'ini Göreceksin\n\n' +
    '───────────────────────────────\n\n' +
    '**KapBilly7581 Fiyat Listesi** \n\n' +
    '# Paket / Rol                  | Fiyat / Boost | Haklar\n' +
    '─────────────────────────────────────────────\n' +
    '1. Pack  - <@&1438134366462021692> | 20  TL     | 5  Hesap\n' +
    '2. Pack  - <@&1438134556317192192> | 40  TL     | 10 Hesap\n' +
    '3. Pack  - <@&1438134684453437441> | 60  TL     | 15 Hesap\n' +
    '4. Pack  - <@&1438134828787699743> | 80  TL     | 20 Hesap\n' +
    '5. Pack  - <@&1438134978931195974> | 90 TL      | 25 Hesap\n' +
    '6. Pack  - <@&1438135139870707712> | 100 TL     | 30 Hesap\n' +
    '7. Pack  - <@&1438135323388543016> | 120 TL     | 35 Hesap\n' +
    '8. Pack  - <@&1438135527328190494> | 140 TL     | 45 Hesap\n' +
    '9. Pack  - <@&1438135670140047511> | 160 TL     | 50 Hesap\n' +
    '───────────────────────────────\n\n' +
    '✨ Daha fazla bilgi ve destek için geliştirici <@1333709062423969853> ile iletişime geçebilirsiniz.\n' +
    '[Destek Sunucumuz](https://discord.com/invite/jypfxtWvgT) ✨\n\n' +
    '© Developed by KapBilly7581 2026'
  );
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("add_token")
        .setLabel("1 Token Ekle")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("add_multi")
        .setLabel("5+ Token Ekle")
        .setStyle(ButtonStyle.Secondary)
    );
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    const msg = await message.channel.send({ embeds: [embed], components: [row] });
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    const filter = (i) => i.user.id === userId;
    const collector = msg.createMessageComponentCollector({ filter, time: 300000 });
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    collector.on("collect", async (interaction) => {
      const modal = new ModalBuilder()
        .setCustomId(interaction.customId === "add_multi" ? "multi_token_modal" : "single_token_modal")
        .setTitle("Yeni Token Ekle");
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      const tokenInput = new TextInputBuilder()
        .setCustomId("token")
        .setLabel("Token Giriniz")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      const voiceInput = new TextInputBuilder()
        .setCustomId("voice")
        .setLabel("Ses Kanal ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      const modeInput = new TextInputBuilder()
        .setCustomId("mode")
        .setLabel("Mod Seçiniz (camera / stream)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      const row1 = new ActionRowBuilder().addComponents(tokenInput);
      const row2 = new ActionRowBuilder().addComponents(voiceInput);
      const row3 = new ActionRowBuilder().addComponents(modeInput);
      modal.addComponents(row1, row2, row3);
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      await interaction.showModal(modal);
    });
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
    client.on("interactionCreate", async (i) => {
      if (!i.isModalSubmit()) return;
      const customId = i.customId;
      if (!["single_token_modal", "multi_token_modal"].includes(customId)) return;
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      const token = i.fields.getTextInputValue("token");
      const voice = i.fields.getTextInputValue("voice");
      const mode = i.fields.getTextInputValue("mode").toLowerCase();
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      if (!["camera", "stream"].includes(mode))
        return i.reply({ content: "Geçersiz mod! `camera` veya `stream` yazmalısın.", ephemeral: true });
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      db[userId].tokens.push({
        token,
        voice,
        streamEnabled: mode === "stream",
        cameraOnly: mode === "camera"
      });
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      await i.reply({ content: `✅ Token başarıyla eklendi ve kaydedildi!`, ephemeral: true });
    });
  }
};
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const { Client, GatewayIntentBits } = require("discord.js");
const { token, prefix, owners } = require("./config.js");
const fs = require("fs");
const path = require("path");
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
const KapBilly7581_Kodlar = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "KapBilly7581_Kodlar")).filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const cmd = require(`./KapBilly7581_Kodlar/${file}`);
  KapBilly7581_Kodlar.set(cmd.Isim, cmd);
}
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
client.on("ready", () => {
  console.log(`${client.user.tag} hazır!`);
});
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
client.on("messageCreate", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = KapBilly7581_Kodlar.get(commandName);
  if (!command) return;
  if (!owners.includes(message.author.id)) return;
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
  try {
    await command.onRequest(client, message, args);
  } catch (err) {
    console.error(err);
  }
});
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
client.login(token);
// Developed By KapBilly7581 https://github.com/KapBilly7581-Developer
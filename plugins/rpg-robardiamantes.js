const ro = 30;
const handler = async (m, {conn, usedPrefix, command}) => {
  const time = global.db.data.users[m.sender].lastrob2 + 7200000;
  if (new Date - global.db.data.users[m.sender].lastrob2 < 7200000) {
  conn.reply(m.chat, `*⏰ Debes esperar \`${msToTime(time - new Date())}\` para volver a robar.*`, m);
  return;
  }
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  if (!who) {
  conn.reply(m.chat, `*${xrpg} Etiqueta a alguien para robar sus diamantes*`, m)
  return;
    };
  if (!(who in global.db.data.users)) { 
  conn.reply(m.chat, `*⚠️ El usuario no se encuentra en mi base de datos.*`, m)
return;
  }
  const users = global.db.data.users[who];
  const rob = Math.floor(Math.random() * ro);
  if (users.diamantes < rob) return conn.reply(m.chat, `🌿 *@${who.split`@`[0]}* *no tiene suficientes diamantes fuera del banco como para que valga la pena intentar robar.*`, m, {mentions: [who]});
  global.db.data.users[m.sender].diamantes += rob;
  global.db.data.users[who].diamantes -= rob;
  conn.reply(m.chat, `*💎 Le robaste \`${rob} Diamantes\` a* *@${who.split`@`[0]}*`, m, {mentions: [who]});
  global.db.data.users[m.sender].lastrob2 = new Date * 1;
};
handler.help = ['robar2'];
handler.tags = ['rpg'];
handler.command = ['robar2', 'steal2', 'rob2', 'robardiamantes'];
handler.group = true
export default handler;
function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return hours + ' Hora(s) ' + minutes + ' Minuto(s)';
}
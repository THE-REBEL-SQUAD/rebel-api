const axios = require("axios");
global.keys = {};

async function loadKeys() {
  if (Object.keys(global.keys).length) return;

  const { data } = await axios.get(
    "https://raw.githubusercontent.com/THE-REBEL-A4IF-V4U/Rebel/main/key.json"
  );
  global.keys = data.apikey;
  console.log("✅ Keys Loaded");
}

module.exports = { loadKeys };

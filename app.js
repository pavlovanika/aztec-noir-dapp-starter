---

### ⚙️ `app.js`
```javascript
// app.js — Minimal Aztec.js example for Noir dApp

import { createPXEClient, getSandboxAccount, deployContract } from "@aztec/aztec.js";
import fs from "fs";
import path from "path";

async function main() {
  // 1️⃣ Подключение к локальному Aztec Sandbox
  const pxe = createPXEClient("http://localhost:8080");
  const account = await getSandboxAccount(pxe, 0);
  console.log("✅ Connected as:", account.address.toString());

  // 2️⃣ Загрузка скомпилированного артефакта
  const artifact = JSON.parse(fs.readFileSync(path.resolve("./target/main.json"), "utf-8"));

  // 3️⃣ Деплой контракта
  console.log("🚀 Deploying contract...");
  const contract = await deployContract(account, artifact, [123n]); // initial = 123
  console.log("📜 Contract deployed at:", contract.address.toString());

  // 4️⃣ Вызов функции set_value(42)
  await contract.methods.set_value(42n).send().wait();
  console.log("✏️  Value updated to 42");

  // 5️⃣ Чтение get_value()
  const value = await contract.methods.get_value().view();
  console.log("📖 Read value:", value.toString());
}

main().catch((err) => {
  console.error("❌ Error:", err);
});


const form = document.getElementById("form-inscricao");
const msg = document.getElementById("msg");
const nomesWrapper = document.getElementById("nomes-wrapper");
const addBtn = document.getElementById("adicionar-nome");
const categoria = document.getElementById("categoria");

let nomeCount = 1;

categoria.addEventListener("change", () => {
  const catValue = categoria.value.toLowerCase();

  while (nomesWrapper.children.length > 1) {
    nomesWrapper.removeChild(nomesWrapper.lastChild);
  }
  nomeCount = 1;

  if (catValue.startsWith("familia")) {
    addBtn.style.display = "inline-block";
  } else {
    addBtn.style.display = "none";
  }
});

addBtn.addEventListener("click", () => {
  if (nomeCount >= 4) return;

  nomeCount++;
  const input = document.createElement("input");
  input.type = "text";
  input.name = `nome${nomeCount}`;
  input.placeholder = `Nome ${nomeCount}`;
  input.required = true;

  nomesWrapper.appendChild(input);
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    telefone: form.telefone.value,
    email: form.email.value,
    congregacao: form.congregacao.value,
    categoria: form.categoria.value,
    nome1: form.nome1.value || "",
    nome2: form.nome2 ? form.nome2.value : "",
    nome3: form.nome3 ? form.nome3.value : "",
    nome4: form.nome4 ? form.nome4.value : ""
  };

  try {
    const response = await fetch(CONFIG.SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();

    if (result.success) {
      form.reset();
      msg.innerHTML = `✅ Inscrição realizada com sucesso!<br>📎 Envie o comprovante de pagamento para o WhatsApp: <strong>${CONFIG.WHATSAPP}</strong>.`;
      msg.style.color = "green";
    } else {
      msg.textContent = "❌ Erro ao enviar os dados. Tente novamente.";
      msg.style.color = "red";
    }
  } catch (err) {
    console.error("Erro:", err);
    msg.textContent = "❌ Erro de conexão. Verifique sua internet.";
    msg.style.color = "red";
  }
});

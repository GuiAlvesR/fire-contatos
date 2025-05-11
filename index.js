import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2X5eKZJKg0JgTuPdzF-5g0ky1xtwgYEs",
  authDomain: "fir-808f5.firebaseapp.com",
  projectId: "fir-808f5",
  storageBucket: "fir-808f5.firebasestorage.app",
  messagingSenderId: "970576233249",
  appId: "1:970576233249:web:d51cd2c01928cb40083460",
  measurementId: "G-HSTSHYJZY0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("formCadastro");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const dataNascimento = document.getElementById("data-nascimento").value;

    try {
      await addDoc(collection(db, "contatos"), {
        nome,
        email,
        telefone,
        endereco,
        dataNascimento,
        criadoEm: new Date(),
      });

      const toastEl = document.getElementById("toastMsg");
      toastEl.classList.remove("bg-danger");
      toastEl.classList.add("bg-success");
      toastEl.querySelector(".toast-body").textContent =
        "Contato cadastrado com sucesso!";
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
      form.reset();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      const toastEl = document.getElementById("toastMsg");
      toastEl.classList.remove("bg-success");
      toastEl.classList.add("bg-danger");
      toastEl.querySelector(".toast-body").textContent =
        "Erro ao cadastrar o contato.";
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  });
}

const tabela = document.getElementById("tabela-contatos");

if (tabela) {
  const q = query(collection(db, "contatos"), orderBy("criadoEm", "desc"));

  getDocs(q)
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const contato = doc.data();
        const linha = `
          <tr>
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>${contato.endereco}</td>
            <td>${contato.dataNascimento}</td>
            <td>${new Date(contato.criadoEm.toDate()).toLocaleString()}</td>
          </tr>
        `;
        tabela.innerHTML += linha;
      });
    })
    .catch((erro) => {
      console.error("Erro ao listar contatos:", erro);
    });
}

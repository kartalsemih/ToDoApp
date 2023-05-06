// Değişkenleri tanımla
const gorevEkleButonu = document.querySelector("#gorev-ekle-butonu");
const kapatButonu = document.querySelector("#close-button");
const temizleButonu = document.getElementById("komple-temizlik");
const input = document.querySelector("#recipient-name");

// Enter tuşuna basıldığında görev ekleme işlevini çağır
input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    gorevEkle();
  }
});

// Modal açıldığında input alanına odaklan
document.querySelector('#exampleModal').addEventListener('shown.bs.modal', function () {
  input.focus();
});

// Değişkenleri tanımla
const gorevEkleButonu = document.querySelector("#gorev-ekle-butonu");
const kapatButonu = document.querySelector("#close-button");
const temizleButonu = document.getElementById("komple-temizlik");
let aktifGorevler = [];
let tamamlananGorevler = [];

// Sayfa yüklendiğinde localStorage'dan görevleri al ve listele
window.onload = function() {
  aktifGorevler = JSON.parse(localStorage.getItem("gorevListesi")) || [];
  const taskList1 = document.querySelector("#task-list");
  if (aktifGorevler !== null) {
    aktifGorevler.forEach(function(gorev) {
      const yeniLi = document.createElement("li");
      yeniLi.classList.add("form-check-label", "mb-2", "clearfix");
      yeniLi.innerHTML = `<i class="fa-solid fa-thumbtack"></i> ${gorev} <button type="button" class="btn btn-light btn-sm share-icon"><i class="fa-solid fa-share"></i></button>`;
      taskList1.appendChild(yeniLi);
      goreviTamamla();
      sorgulama();
      sorgu2();
    });
  }
}

// Butonlara tıklama olayları ekle
gorevEkleButonu.addEventListener("click", gorevEkle);
kapatButonu.addEventListener("click", kapatButonu);
temizleButonu.addEventListener("click", temizle);


// Tamamlanan görevleri localStorage'dan al ve listele
const tamamlananGorevler = JSON.parse(localStorage.getItem("tamamlananListe")) || [];
const taskList2 = document.querySelector("#tamamlanan-liste");
if (tamamlananGorevler !== null) {
  tamamlananGorevler.forEach(function(gorev) {
    const yeniLi = document.createElement("li");
    yeniLi.classList.add("form-check-label", "mb-2", "clearfix");
    yeniLi.innerHTML = `<i class="fa-solid fa-thumbtack"></i> ${gorev} <button type="button" class="btn btn-light btn-sm share-icon"><i class="fa-solid fa-share"></i></button>`;
    yeniLi.style.textDecoration = "line-through";
    taskList2.appendChild(yeniLi);
    goreviTamamla();
    sorgulama();
    sorgu2();
    tekTekSilme();
  });
}


// Büyük harf dönüştürme işlevi
function buyukHarf(cumle) {
  return cumle.toLowerCase().replace(/(^|\s)\S/g, function(kelime) {
    return kelime.toUpperCase();
  });
}

// Görev ekleme işlevi
function gorevEkle() {
  const input = document.querySelector("#recipient-name");
  const yeniLi = document.createElement("li");
  const cumle = buyukHarf(input.value);
  yeniLi.classList.add("form-check-label", "mb-2", "clearfix");
  yeniLi.innerHTML = `<i class="fa-solid fa-thumbtack"></i> ${cumle} <button type="button" class="btn btn-light btn-sm share-icon"><i class="fa-solid fa-share"></i></button>`;
  
  if (input.value !== "") {
    aktifGorevler = JSON.parse(localStorage.getItem("gorevListesi")) || [];
    aktifGorevler.push(cumle);
    localStorage.setItem("gorevListesi", JSON.stringify(aktifGorevler));
    document.querySelector("#task-list").appendChild(yeniLi);
    input.value = "";
    const myModalEl = document.getElementById('exampleModal');
    const modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

  goreviTamamla();
  sorgulama();
  sorgu2();
}

// Kapatma butonu işlevi
function kapatButonu() {
  const input = document.querySelector("#recipient-name");
  input.value = "";
}


// Görev tamamlama işlevi
function goreviTamamla() {
  const tasks = document.getElementById("task-list").getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].querySelector("button").addEventListener("click", function() {
      const setChild = this.parentNode;
      document.getElementById("tamamlanan-liste").appendChild(setChild);
      setChild.style.textDecoration = "line-through";

      aktifGorevler = JSON.parse(localStorage.getItem("gorevListesi")) || [];

      aktifGorevler.forEach(function(gorev, index) {
        if (gorev == setChild.textContent.trim()) {
          aktifGorevler.splice(index, 1);
          localStorage.setItem("gorevListesi", JSON.stringify(aktifGorevler));

          tamamlananGorevler = JSON.parse(localStorage.getItem("tamamlananListe")) || [];

          // Tamamlanan görevleri ekle
          tamamlananGorevler.push(gorev);
          localStorage.setItem("tamamlananListe", JSON.stringify(tamamlananGorevler));
        }
      });

      sorgulama();
      sorgu2();
      tekTekSilme();
    }); 
  }
}

// Görev listesi sorgulama işlevi
function sorgulama() {
  const ulElement = document.getElementById("task-list");
  const liElements = ulElement.getElementsByTagName("li");
  const numberOfLiElements = liElements.length;
  if (numberOfLiElements > 0) {
    document.querySelector("._9").style.display = "none";
  } else {
    document.querySelector("._9").style.display = "flex";
  }
}

// Tamamlanan görev listesi sorgulama işlevi
function sorgu2() {
  const ulElement = document.getElementById("tamamlanan-liste");
  const liElements = ulElement.getElementsByTagName("li");
  const numberOfLiElements = liElements.length;
  if (numberOfLiElements > 0) {
    document.querySelector("._10").style.display = "none";
  } else {
    document.querySelector("._10").style.display = "flex";
  }
}

// Tek tek görev silme işlevi
function tekTekSilme() {
  const tasks = document.getElementById("tamamlanan-liste").getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].querySelector("button").addEventListener("click", function() {
      const clickedTask = this.parentNode;

      tamamlananGorevler = JSON.parse(localStorage.getItem("tamamlananListe")) || [];

      tamamlananGorevler.forEach(function(gorev, index) {
        if (gorev == clickedTask.textContent.trim()) {
          tamamlananGorevler.splice(index, 1);
          localStorage.setItem("tamamlananListe", JSON.stringify(tamamlananGorevler));
        }
      });

      clickedTask.remove();
      sorgulama();
      sorgu2();
    });
  }
}

// Tamamlanan görevleri temizleme işlevi
function temizle() {
  const tamamlananListesi = document.getElementById("tamamlanan-liste");
  const tamamlananElemanlar = tamamlananListesi.getElementsByTagName("li");
  for (let i = tamamlananElemanlar.length - 1; i >= 0; i--) {
    tamamlananElemanlar[i].remove();

    tamamlananGorevler = JSON.parse(localStorage.getItem("tamamlananListe")) || [];

    tamamlananGorevler.splice(0, tamamlananGorevler.length);

    localStorage.setItem("tamamlananListe", JSON.stringify(tamamlananGorevler));
  }
  sorgu2();
}

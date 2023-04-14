let gorevEkleButonu = document.querySelector("#gorev-ekle-butonu");
kapat_butonu=document.querySelector("#close-button");
const temizleButonu = document.getElementById("komple-temizlik");
let input = document.querySelector("#recipient-name");
input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    gorevEkle();
  }
});
gorevEkleButonu.addEventListener("click",gorevEkle);
kapat_butonu.addEventListener("click",kapatButonu);
temizleButonu.addEventListener("click", temizle);
document.querySelector('#exampleModal').addEventListener('shown.bs.modal', function () {
  input.focus();
})


function buyukHarf(cumle) {
  return cumle.toLowerCase().replace(/(^|\s)\S/g, function(kelime) {
    return kelime.toUpperCase();
  });
};
function gorevEkle(){
  let input = document.querySelector("#recipient-name");
  let yeniLi = document.createElement("li");
  let cumle=buyukHarf(input.value);
  yeniLi.classList.add("form-check-label", "mb-2", "clearfix");
  yeniLi.innerHTML = `<i class="fa-solid fa-thumbtack"></i> ${cumle} <button type="button" class="btn btn-light btn-sm share-icon"><i class="fa-solid fa-share"></i></button>`;
  
  if(input.value!=""){
    document.querySelector("#task-list").appendChild(yeniLi);
    input.value="";
    let myModalEl = document.getElementById('exampleModal');
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  };

  goreviTamamla();
  sorgulama();
  sorgu2();
  
};
function kapatButonu(){
  let input = document.querySelector("#recipient-name");
  input.value="";
};
function goreviTamamla(){

var tasks = document.getElementById("task-list").getElementsByTagName("li");
for (var i = 0; i < tasks.length; i++) {
  tasks[i].querySelector("button").addEventListener("click",  function(){
    let setChild = this.parentNode
    document.getElementById("tamamlanan-liste").appendChild(setChild);
    setChild.style.textDecoration="line-through";
    sorgulama();
    sorgu2();
    tekTekSilme()
  } ); }
  
};
function sorgulama(){
  var ulElement = document.getElementById("task-list");
  var liElements = ulElement.getElementsByTagName("li");
  var numberOfLiElements = liElements.length;
  if(numberOfLiElements > 0) {
    document.querySelector("._9").style.display="none";
  } else {
    document.querySelector("._9").style.display="flex";
  }
};
function sorgu2(){
  var ulElement = document.getElementById("tamamlanan-liste");
  var liElements = ulElement.getElementsByTagName("li");
  var numberOfLiElements = liElements.length;
  if(numberOfLiElements > 0) {
    document.querySelector("._10").style.display="none";
  } else {
    document.querySelector("._10").style.display="flex";
  }
};
function tekTekSilme(){
  var tasks = document.getElementById("tamamlanan-liste").getElementsByTagName("li");
  for (var i = 0; i < tasks.length; i++) {
    tasks[i].querySelector("button").addEventListener("click", function() {
      var clickedTask = this.parentNode;
      clickedTask.remove();
      sorgulama();
      sorgu2();

    });
    }

};
function temizle() {
  const tamamlananListesi = document.getElementById("tamamlanan-liste");
  const tamamlananElemanlar = tamamlananListesi.getElementsByTagName("li");
  for (let i = tamamlananElemanlar.length - 1; i >= 0; i--) {
    tamamlananElemanlar[i].remove();

  }
  sorgu2();
  
};




























    


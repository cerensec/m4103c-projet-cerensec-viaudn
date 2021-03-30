monLocalStorage = localStorage;
var longeur = 0;

function init(){
    let ul = document.getElementById("liste-favoris");
    for(i = 1; i<monLocalStorage.length+1; i++){
        createFavorite(monLocalStorage.getItem("fav"+i));
        // let li = document.createElement("li");
        // let span = document.createElement("span");
        // let img = document.createElement("img");
        // span.innerHTML = monLocalStorage.getItem("fav"+i);
        // span.setAttribute("onclick","searchFav(this)");
        // img.setAttribute("src", "images/croix.svg");
        // img.setAttribute("width", 15);
        // img.setAttribute("title", "cliquer pour supprimer le favori");
        // img.setAttribute("onclick", "deleteFav(this)");
        // img.setAttribute("id", span.innerHTML);
        // li.appendChild(span);
        // li.appendChild(img);
        // ul.appendChild(li);
        // console.log(monLocalStorage.getItem("fav"+i));
    }
}

async function setLyrics(){

    reinitHTML(longeur);
    var search = document.getElementById("input-recherche").value;

    
    
    //Bouton favori 
    if(search != ""){
        $("#btn-favoris").attr("src", "images/images/etoile-vide.svg");
        $("#btn-favoris").attr("disabled", false);
        $("#btn-favoris").css("background-color", "rgb(26, 188, 156)");
    }
    if(estDansLS(search)){
        $("#img-etoile").attr("src", "images/etoile-pleine.svg");
        console.log("yes");
    }else if(!estDansLS(search)){
        $("#img-etoile").attr("src", "images/etoile-vide.svg");
    }
    //console.log(monLocalStorage.length);

    //console.log(estDansLS(search));

    var url ="https://api.lyrics.ovh/v1/";              

    const apiRes = url+search;

    var json_lyrics = await getLyrics(apiRes);
    //console.log(json_lyrics);
    var lyrics = JSON.stringify(json_lyrics);
    var lyricsSP;

    lyrics = lyrics.split("\\r\\n");
    for (let i = 0; i < lyrics.length; i++) {
        lyricsSP = lyrics[i].split("\\n");       
    }
    affichage(lyricsSP);
    //console.log(lyricsSP);
}

async function getLyrics(search){
    try{
        const response = await fetch(search);
        const lyrics = await response.json();
        return lyrics;
    } catch (error){
        console.error(error);
    }
}

function affichage(array){
    longeur = array.length;
    for (let i = 0; i < array.length; i++) {
        $("#bloc-resultats").append($(document.createElement('p')).attr('class',"lyrics").text(array[i]));  
    }
}

function reinitHTML(num){
    for (let i = 0; i < num; i++) {
        $(".lyrics").remove();
    }
}

function addFavourite(){
    let i = monLocalStorage.length+1;

    let search = document.getElementById("input-recherche").value;
    
    if(!estDansLS(search) && (search != null)){
        monLocalStorage.setItem('fav'+i, search);
        createFavorite(search);
    }

}

function estDansLS(recherche){
    let bool = false;
    for (let i = 1; i < monLocalStorage.length+1; i++) {
        let local = monLocalStorage.getItem("fav"+i);
        if(local == recherche){
            bool = true;
            console.log("passe");
        }
    }
    return bool;
}

function searchFav(elmt){
    $("#input-recherche").val(elmt.innerHTML);
    console.log(elmt.innerHTML);
}

function deleteFav(elmt){
    console.log(elmt.id);

}

function createFavorite(res){
    let ul = document.getElementById("liste-favoris");
    let li = document.createElement("li");
    let span = document.createElement("span");
    let img = document.createElement("img");
    span.innerHTML = res;
    span.setAttribute("onclick","searchFav(this)");
    img.setAttribute("src", "images/croix.svg");
    img.setAttribute("width", 15);
    img.setAttribute("title", "cliquer pour supprimer le favori");
    img.setAttribute("onclick", "deleteFav(this)");
    img.setAttribute("id", span.innerHTML);
    li.appendChild(span);
    li.appendChild(img);
    ul.appendChild(li);
}

monLocalStorage = localStorage;
var longeur = 0;
async function setLyrics(){

    reinitHTML(longeur);
    var search = document.getElementById("input-recherche").value;
    //Bouton favori 
    if(search != ""){
        $("#btn-favoris").attr("src", "images/images/etoile-vide.svg");
        $("#btn-favoris").attr("disabled", false);
        $("#btn-favoris").css("background-color", "rgb(26, 188, 156)");
    }
    if(estDansLS(search) == true){
        $("#img-etoile").attr("src", "images/etoile-pleine.svg");
        console.log("yes")
    }else if(estDansLS(search) == false){
        $("#img-etoile").attr("src", "images/etoile-vide.svg");
    }
    console.log(monLocalStorage.length);

    console.log(estDansLS(search));

    var url ="https://api.lyrics.ovh/v1/";

    const apiRes = url+search;

    var json_lyrics = await getLyrics(apiRes);
    console.log(json_lyrics);
    var lyrics = JSON.stringify(json_lyrics);
    var lyricsSP;

    lyrics = lyrics.split("\\r\\n");
    for (let i = 0; i < lyrics.length; i++) {
        lyricsSP = lyrics[i].split("\\n");       
    }
    affichage(lyricsSP);
    console.log(lyricsSP);
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
    var i = monLocalStorage.length+1;
    monLocalStorage.setItem('fav'+i,$("#input-recherche").val());

}

function estDansLS(recherche){
    var bool = false;
    for (let i = 1; i < monLocalStorage.length; i++) {
        var local = monLocalStorage.getItem("fav"+i);
        if(local == recherche){
            bool = true;
        }
    }
    return bool;
}

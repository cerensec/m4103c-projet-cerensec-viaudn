monLocalStorage = localStorage;
var longeur = 0;

function init(){
    displayFav();
}

async function setLyrics(){

    $("#bloc-resultats").empty();
    let search = document.getElementById("input-recherche").value;

    

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


    // Appel de l'API
    const url ="https://api.lyrics.ovh/v1/";              
    let apiRes = url+search;
    let json_lyrics = await getLyrics(apiRes);

    //Adaptation pour le format HTML
    str = json_lyrics.lyrics.replace(new RegExp('\r?\n','g'), '<br />');

    affichage(str);
    
}


// Récuperation des lyrics
async function getLyrics(search){
    try{
        const response = await fetch(search);
        const lyrics = await response.json();
        return lyrics;
    } catch (error){
        console.error(error);
    }
}

function affichage(str){
    $("#bloc-resultats").empty();
    $("#bloc-resultats").append("<p>"+str+"</p>");
}


function addFavourite(){
    $("#img-etoile").attr("src", "images/etoile-pleine.svg");

    let search = document.getElementById("input-recherche").value;

    document.getElementById("favoris-vide").style.visibility = "hidden";

     //Attribution de la clé du favoris
    if(!estDansLS(search) && (search != null)){
        if(monLocalStorage.length >0){
            let prevKey = monLocalStorage.key(monLocalStorage.length-1);
            let index = parseInt(prevKey.split(" ")[1])+1;
            monLocalStorage.setItem("fav "+index, search); //Création du l'objet dans localStorage
        } else{
            monLocalStorage.setItem("fav 1", search);
        }
        createFavorite(search);
    }
}

//Vérifacation de la présence de recherche dans localStorage
function estDansLS(recherche){
    for (let i = 0; i < monLocalStorage.length; i++) {
        let key = monLocalStorage.key(i);
        let local = monLocalStorage.getItem(key);
        if(local == recherche){
            console.log("passe");
            return true;
        }
    }
    return false;
}

// Lancement de la recherche lors du clic dans la barre des favoris
function searchFav(elmt){
    $("#input-recherche").val(elmt.innerHTML);
    setLyrics();
}


function deleteFav(elmt){
    //Recherche du la clé du favoris pour la suppression
    for(i =0;i<monLocalStorage.length;i++){
        let key = monLocalStorage.key(i);
        if(monLocalStorage.getItem(key) == elmt.id){
            monLocalStorage.removeItem(key);
        }
    }

    //Enlever l'étoile pleine si la recherche actuelle etait la favorite supprimée
    if($("#input-recherche").val() == elmt.id){
        $("#img-etoile").attr("src", "images/etoile-vide.svg");
    }
    displayFav();

}

//Création de l'objet graphique favoris dans la barre des favoris
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


// Affichage des favoris
function displayFav(){
    $("#liste-favoris").empty();

    //Recuperation des éléments de localStorage pour créer les favoris
    if(monLocalStorage.length > 0){
        document.getElementById("favoris-vide").style.visibility = "hidden";
        for(i = 0; i<monLocalStorage.length; i++){
            let key = monLocalStorage.key(i);
            if(key!= undefined){
                createFavorite(monLocalStorage[key]);
            }
        }
    } else{
        document.getElementById("favoris-vide").style.visibility = "visible"; //Affichage de "∅ Aucune recherche enregistrée"
    }
    

}

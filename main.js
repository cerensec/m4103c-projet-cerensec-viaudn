monLocalStorage = localStorage;
var longeur = 0;

function init(){
    displayFav();
}

async function setLyrics(){

    //reinitHTML(longeur);
    $("#bloc-resultats").empty();
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
    // var lyrics = JSON.stringify(json_lyrics);
    // var lyricsSP;

    // lyrics = lyrics.split("\\r\\n");
    // for (let i = 0; i < lyrics.length; i++) {
    //     lyricsSP = lyrics[i].split("\\n");       
    // }
    str = json_lyrics.lyrics.replace(new RegExp('\r?\n','g'), '<br />');
    affichage(str);
    
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

function affichage(str){
    // longeur = array.length;
    // for (let i = 0; i < array.length; i++) {
    //     $("#bloc-resultats").append($(document.createElement('p')).attr('class',"lyrics").text(array[i]));  
    // }
    $("#bloc-resultats").empty();
    $("#bloc-resultats").append("<p>"+str+"</p>");
}

function reinitHTML(num){
    for (let i = 0; i < num; i++) {
        $(".lyrics").remove();
    }
}

function addFavourite(){
    $("#img-etoile").attr("src", "images/etoile-pleine.svg");
    //let i = monLocalStorage.length+1;
    let search = document.getElementById("input-recherche").value;
    document.getElementById("favoris-vide").style.visibility = "hidden";
    if(!estDansLS(search) && (search != null)){
        if(monLocalStorage.length >0){
            console.log("fav index");
            let prevKey = monLocalStorage.key(monLocalStorage.length-1);
            let index = parseInt(prevKey.split(" ")[1])+1;
            monLocalStorage.setItem("fav "+index, search);
        } else{
            console.log("fav 1");
            monLocalStorage.setItem("fav 1", search);
        }
        createFavorite(search);
    }
    
    // if(!estDansLS(search) && (search != null)){
    //     monLocalStorage.setItem("fav "+i, search);
    //     createFavorite(search);
    // }

}

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

function searchFav(elmt){
    $("#input-recherche").val(elmt.innerHTML);
    setLyrics();
    console.log(elmt.innerHTML);
}

function deleteFav(elmt){
    console.log(elmt.id);
    for(i =0;i<monLocalStorage.length;i++){
        let key = monLocalStorage.key(i);
        if(monLocalStorage.getItem(key) == elmt.id){
            monLocalStorage.removeItem(key);
        }
    }
    if($("#input-recherche").val() == elmt.id){
        $("#img-etoile").attr("src", "images/etoile-vide.svg");
    }
    displayFav();

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

function displayFav(){
    $("#liste-favoris").empty();
    if(monLocalStorage.length > 0){
        document.getElementById("favoris-vide").style.visibility = "hidden";
        for(i = 0; i<monLocalStorage.length; i++){
            let key = monLocalStorage.key(i);
            if(key!= undefined){
                createFavorite(monLocalStorage[key]);
            }
        }
    } else{
        document.getElementById("favoris-vide").style.visibility = "visible";
    }
    

}

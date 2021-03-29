var longeur = 0;
async function test(){

    reinitHTML(longeur);
    var search = document.getElementById("input").value;

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


function test(){

    var search = document.getElementById("input").value;

    var url ="https://api.lyrics.ovh/v1/";

    const apiRes = url+search;

    console.log(apiRes);
}

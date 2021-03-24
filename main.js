
function test(){
    
    var search = $("#input").val();

    var url ="https://api.lyrics.ovh/v1/";

    const apiRes = url+search;

    console.log(apiRes);
}

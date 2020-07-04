//add application interface for indian statewise results
var myArr;
var state_name=document.getElementById("state_name");
function requestData(){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","https://api.rootnet.in/covid19-in/stats/latest");
    xmlhttp.send();
    xmlhttp.onload=function(){
        myArr=JSON.parse(xmlhttp.responseText);
        console.log(myArr);
        requestRegional(myArr.data.regional)
        console.log(myArr.data.regional);
    }
}
function requestRegional(stateData){
    for(var i=0; i<stateData.length; i++) {
        var option=document.createElement("option");
        option.innerHTML=stateData[i].loc;
        option.value=stateData[i].loc;
        if(stateData[i].loc==="Jharkhand"){
            option.selected=true;


            displayData(stateData[i]);
        }
        state_name.appendChild(option); 
    }
}
function displayData(obj){
    document.getElementById("confirmed").innerHTML=obj.totalConfirmed;
    document.getElementById("recovered").innerHTML=obj.discharged;
    document.getElementById("deaths").innerHTML=obj.deaths
}
state_name.addEventListener("change",function(event){
    for(var i=0; i<myArr.data.regional.length; i++){
        if(myArr.data.regional[i].loc ==event.target.value){

            displayData(myArr.data.regional[i]);
        }
    }
})
requestData();
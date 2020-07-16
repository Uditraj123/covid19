//add application interface for indian statewise results
var myArr;
var state_name=document.getElementById("state_name");
//chart k liye kaam hai
var state=[];
        var confirmed=[];
        var recovered=[];
        var deaths=[]; 
function requestData(){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","https://api.rootnet.in/covid19-in/stats/latest");
    xmlhttp.send();
    xmlhttp.onload=function(){
        myArr=JSON.parse(xmlhttp.responseText);
        console.log(myArr);
        requestRegional(myArr.data.regional)
        console.log(myArr.data.regional);

        //chart k liye kaam hai
        var confirmedCasesIndian,deaths,discharged,active;
        discharged=myArr.data.summary.discharged;
        deaths=myArr.data.summary.deaths;
        confirmedCasesIndian=myArr.data.summary.confirmedCasesIndian;
        active=myArr.data.summary.confirmedCasesIndian-myArr.data.summary.discharged;
        console.log(discharged);
        console.log(active);
        //..........

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
        //chart k liye kaam hai
        state.push(stateData[i].loc);
        deaths.push(stateData[i].deaths);
        recovered.push(stateData[i].discharged);
        confirmed.push(stateData[i].totalConfirmed);
//chart formation and initialization
        var myChart=document.getElementById("myChart").getContext('2d');
        var Char=document.getElementById("Chart").getContext('2d');
        var mychat=document.getElementById("myChat").getContext('2d');

        var chart=new Chart(Char,{
            type:'line',
            backgroundColor:"#f5deb3",
            data:{
                labels:state,
                datasets:[
                    {
                        label:"recovered cases",
                        data:recovered,
                        backgroundColor:"#2ecc71",
                        minBarLength:5,
                    },
                ],
            },
            options:{}
        });


    
    var chart=new Chart(myChat,{
        type:'line',
        backgroundColor:"#f5deb3",
        data:{
            labels:state,
            datasets:[
                {
                    label:"deaths cases",
                    data:deaths,
                    backgroundColor:"#e74c3c",
                    minBarLength:5,
                },
            ],
        },
        options:{}
    });

        var chart=new Chart(myChart,{
            type:'line',
            backgroundColor:"#f5deb3",
            data:{
                fontColor:'white',
                labels:state,
                datasets:[
                    {
                        label:"confirmed cases",
                        data:confirmed,
                        backgroundColor:"#f1c40f",
                        minBarLength:5,
                        
                    
                    },
                ],
            },
            options:{}
            
        });
    }
    console.log(state);
}
//..............

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
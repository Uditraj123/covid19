var commArr;
var country_name=document.getElementById("country_name");
function fetchAllData(){
    var request= new XMLHttpRequest();
    request.open("GET","https://api.covid19api.com/summary");
    request.send();
    request.onload=function(){
        commArr=JSON.parse(request.responseText);
        console.log(JSON.parse(request.responseText));
        fetchCountries(commArr.Countries);
    }
}

function fetchCountries(countryData){
    for(var i=0; i<countryData.length; i++){
        var option=document.createElement("option");
        option.innerHTML=countryData[i].Country;
        option.value=countryData[i].Country;
        if(countryData[i].Country==="India"){
            option.selected=true;

            displayResults(countryData[i]);
            
        }
        country_name.appendChild(option);
        
    }
}

function displayResults(obj){
    console.log(obj);
    document.getElementById("confirmed_case").innerHTML=obj.TotalConfirmed;
    document.getElementById("new_confirmed").innerHTML=obj.NewConfirmed;
    document.getElementById("total_death").innerHTML=obj.TotalDeaths;
    document.getElementById("new_death").innerHTML=obj.NewDeaths;
    document.getElementById("total_recovered").innerHTML=obj.TotalRecovered;
    document.getElementById("new_recovered").innerHTML=obj.NewRecovered;
}


country_name.addEventListener("change",function(event){
  //  console.log(event.target.value);
  for(var i=0; i<commArr.Countries.length; i++){
      if(commArr.Countries[i].Country==event.target.value){
    displayResults(commArr.Countries[i]);
      }
  }
})
fetchAllData();



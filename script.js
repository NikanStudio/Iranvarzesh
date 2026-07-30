const params = new URLSearchParams(window.location.search);

const leagueId = params.get("id");

if(leagueId){

let title="لیگ";

if(leagueId=="4328") title="🇬🇧 لیگ برتر انگلیس";
if(leagueId=="4335") title="🇪🇸 لالیگا";
if(leagueId=="4332") title="🇮🇹 سری آ";
if(leagueId=="4331") title="🇩🇪 بوندس لیگا";
if(leagueId=="4334") title="🇫🇷 لیگ فرانسه";


document.getElementById("leagueTitle").innerText = title;


fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=${leagueId}`)

.then(res=>res.json())

.then(data=>{

let html="";


data.events.slice(0,5).forEach(match=>{


html+=`

<div class="card">

<h3>
${match.strHomeTeam}
🆚
${match.strAwayTeam}
</h3>

<p>
📅 ${match.dateEvent}
</p>

<p>
🕒 ${match.strTime}
</p>

</div>

`;

});


document.getElementById("matches").innerHTML=html;


});


}// ---------- آخرین نتیجه ----------

fetch(`https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=${leagueId}`)

.then(res=>res.json())

.then(data=>{

if(data.events && data.events.length>0){

let match=data.events[0];

document.getElementById("lastMatch").innerHTML=`

<div class="card">

<h3>
${match.strHomeTeam}
${match.intHomeScore}
-
${match.intAwayScore}
${match.strAwayTeam}
</h3>

<p>📅 ${match.dateEvent}</p>

</div>

`;

}

});// ---------- جدول لیگ ----------

fetch(`https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${leagueId}`)

.then(res=>res.json())

.then(data=>{

let html=`

<table class="matches-table">

<tr>
<th>رتبه</th>
<th>تیم</th>
<th>امتیاز</th>
</tr>

`;


data.table.slice(0,10).forEach(team=>{

html+=`

<tr>

<td>${team.intRank}</td>

<td>
<img src="${team.strBadge}" width="30">
${team.strTeam}
</td>

<td>${team.intPoints}</td>

</tr>

`;

});


html+="</table>";


document.getElementById("leagueTable").innerHTML=html;


});// ---------- نتایج واقعی صفحه اصلی ----------

const resultsBox = document.getElementById("realResults");

if(resultsBox){

fetch("https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=4328")

.then(res=>res.json())

.then(data=>{

let html="";

data.events.slice(0,5).forEach(match=>{

html+=`

<div class="card">

<h3>
${match.strHomeTeam}
${match.intHomeScore ?? "-"}
-
${match.intAwayScore ?? "-"}
${match.strAwayTeam}
</h3>

<p>📅 ${match.dateEvent}</p>

<p>🏆 ${match.strLeague}</p>

</div>

`;

});


resultsBox.innerHTML=html;


});

}// ---------- مسابقات امروز ----------

const todayBox = document.getElementById("todayMatches");

if(todayBox){

fetch("https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=2026-07-29&s=Soccer")

.then(res=>res.json())

.then(data=>{

let html="";


if(data.events){

data.events.slice(0,10).forEach(match=>{


html+=`

<div class="card">

<h3>
${match.strHomeTeam}
🆚
${match.strAwayTeam}
</h3>


<p>🕒 ${match.strTime || "نامشخص"}</p>

<p>🏆 ${match.strLeague}</p>

<p>🏟️ ${match.strVenue || "نامشخص"}</p>


</div>

`;


});

}


todayBox.innerHTML = html;


});


}function toggleTheme(){
    document.body.classList.toggle("dark");
}const searchBox = document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("keyup", function(){

let filter = this.value.toLowerCase();

document.querySelectorAll(".league-item").forEach(item=>{

item.style.display =
item.innerText.toLowerCase().includes(filter)
? "block"
: "none";

});

});

}
const params = new URLSearchParams(window.location.search);
const teamId = params.get("id");

if(teamId){

fetch(`https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=${teamId}`)

.then(res=>res.json())

.then(data=>{

const team = data.teams[0];

document.getElementById("teamName").innerText = team.strTeam;

document.getElementById("teamInfo").innerHTML = `

<div class="card">

<img src="${team.strBadge}" width="120">

<p>🏟️ ورزشگاه: ${team.strStadium}</p>

<p>📅 سال تأسیس: ${team.intFormedYear}</p>

<p>🌍 کشور: ${team.strCountry}</p>

<p>🏆 لیگ: ${team.strLeague}</p>

</div>

`;

});

}
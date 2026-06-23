const select = document.getElementById("agamaSelect");
const container = document.getElementById("tableContainer");

loadList();

async function loadList(){

    const response = await fetch("data/agamas.json");
    const agamas = await response.json();

    select.innerHTML="";

    agamas.forEach((agama,index)=>{

        const option=document.createElement("option");
        option.value=agama.file;
        option.textContent=agama.name;

        select.appendChild(option);

        if(index===0){
            loadTSV(agama.file);
        }

    });

}

select.addEventListener("change",()=>{
    loadTSV(select.value);
});


async function loadTSV(filename){

    const response=await fetch("data/"+filename);

    const text=await response.text();

    const rows=text.trim().split("\n").map(r=>r.split("\t"));

    displayTable(rows);

}

function displayTable(rows){

    let html="<table>";

    html+="<thead><tr>";

    rows[0].forEach(col=>{
        html+=`<th>${escapeHTML(col)}</th>`;
    });

    html+="</tr></thead>";

    html+="<tbody>";

    for(let i=1;i<rows.length;i++){

        html+="<tr>";

        rows[i].forEach(cell=>{
            html+=`<td>${escapeHTML(cell)}</td>`;
        });

        html+="</tr>";
    }

    html+="</tbody></table>";

    container.innerHTML=html;

}

function escapeHTML(str){

    return str
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;");
}
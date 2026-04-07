
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase,
    ref,
    push,
    onValue,remove
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
  const firebaseConfig = {
   databaseURL:"https://leads-tracker-b07fe-default-rtdb.firebaseio.com/"
  }
  const app = initializeApp(firebaseConfig);
  const database=getDatabase(app);
  const refdb=ref(database,"lead tracker")

const inputbtn=document.querySelector("#input-btn");
const inputel=document.querySelector("#input-el");
const ulel=document.getElementById("ul-el"); 
const del=document.getElementById("delete_btn");

del.addEventListener('dblclick',function(){
    remove(refdb)
    ulel.innerHTML=""
});
onValue(refdb,function(snapshot)
{
    const snap=snapshot.exists()
    if(snap)
    {const leads=snapshot.val()
    const l1=Object.values(leads)
    render(l1)}
})
inputbtn.addEventListener("click",function(){

       push(refdb,inputel.value)
        inputel.value=""; 
       
})
function render(leads)
{
    let listitems="<li>List items are:</li>"
    for(let i=0;i<leads.length;i++)
    { 
        listitems+=`<li>
                <a href='${leads[i]} ' target="_blank">
                    ${ leads[i]}
                </a>
        </li>`
    }
    ulel.innerHTML=listitems
  }
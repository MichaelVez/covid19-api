//* get continent data from country API
import { setInit } from "./chart.js";

export let myContObj = { World: [] };

export async function getContObj() {
  let fetchReq = await fetch("https://restcountries.com/v3.1/all");
  let data = await fetchReq.json();
  for (let i = 0; i < data.length; i++) {
    if (myContObj[data[i].continents[0]] === undefined) {
      myContObj[data[i].continents[0]] = [{ country: data[i].cca2 }];
      myContObj["World"].push({ country: data[i].cca2 });
    } else {
      myContObj[data[i].continents[0]].push({ country: data[i].cca2 });
      myContObj["World"].push({ country: data[i].cca2 });
    }
  }
  coronaAPI();
}
function initSel(toWhat) {
  let sel = document.querySelector("#select");
  sel.innerHTML = "";
  for (let item of getContArr(toWhat)) {
    let name = document.createElement("option");
    name.textContent = item.name;
    sel.appendChild(name);
  }
}
function getStats(str) {
  let myArr = [];
  for (let item in myCoronaObj) {
    if (str === myCoronaObj[item].name) {
      myArr.push(myCoronaObj[item].stats.confirmed);
      myArr.push(myCoronaObj[item].stats.critical);
      myArr.push(myCoronaObj[item].stats.recovered);
      myArr.push(myCoronaObj[item].stats.deaths);

      myArr.push(
        myCoronaObj[item].stats.calculated.cases_per_million_population
      );
      if (myCoronaObj[item].stats.calculated.death_rate)
        myArr.push(
          myCoronaObj[item].stats.calculated.death_rate.toString().slice(0, 5)
        );
      if (myCoronaObj[item].stats.calculated.recovery_rate)
        myArr.push(
          myCoronaObj[item].stats.calculated.recovery_rate
            .toString()
            .slice(0, 5)
        );
    }
  }
  return myArr;
}
export function changeFun(e) {
  let top = document.querySelector(".top");
  let h1 = document.querySelector("h1");
  if (h1) h1.style.display = "none";
  let statArr = getStats(e.target.value);
  let spans = document.querySelectorAll("span");
  let av = document.querySelectorAll(".av");
  for (let i = 0; i < spans.length; i++) {
    spans[i].textContent = statArr[i];
    av[i].style.display = "inline-block";
  }
}
let myCoronaObj = {};
let myCoronaArr = [];
export async function coronaAPI() {
  let fetchReq = await fetch("https://corona-api.com/countries");
  let data = await fetchReq.json();
  for (let i = 0; i < data.data.length; i++) {
    myCoronaArr.push(data.data[i].name);
    myCoronaObj[data.data[i].code] = {
      name: data.data[i].name,
      stats: data.data[i].latest_data,
    };
  }
  //gets "death_rate" "recovery_rate" "recovered_vs_death_ratio"
  //"cases_per_million_population" "confirmed"  "critical deaths"  "recovered "
  initSel("World");
  setInit(myCoronaObj);
}
import { getLabelsFromObj, getDataFromObj, drawChart } from "./chart.js";
export function btnClick(e) {
  let av = document.querySelectorAll(".av");
  av.forEach((e) => (e.style.display = "none"));
  let h1 = document.querySelector("h1");
  h1.style.display = "block";

  let res = getContArr(e.target.textContent);
  initSel(e.target.textContent);
  let getSomeArrLabel = getLabelsFromObj(res);
  const ctx = document.getElementById("myChart");
  ctx.remove();
  let cont = document.querySelector(".onemore");
  cont.style.width = `${getSomeArrLabel.length * 70}px`;
  let newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", "myChart");
  cont.appendChild(newCanvas);
  let myArr = [
    getDataFromObj(res, "confirmed"),
    getDataFromObj(res, "critical"),
    getDataFromObj(res, "deaths"),
    getDataFromObj(res, "recovered"),
  ];
  drawChart(getSomeArrLabel, myArr);
}
function getContArr(continent) {
  let myArr = [];

  for (let item of myContObj[continent]) {
    if (myCoronaObj[item.country]) myArr.push(myCoronaObj[item.country]);
  }
  return myArr;
}

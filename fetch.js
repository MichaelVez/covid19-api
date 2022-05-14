//* get continent data from country API
let myContObj = {};
export async function getContObj() {
  let fetchReq = await fetch("https://restcountries.com/v3.1/all");
  let data = await fetchReq.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (myContObj[data[i].continents[0]] === undefined)
      myContObj[data[i].continents[0]] = [{ country: data[i].cca2 }];
    else myContObj[data[i].continents[0]].push({ country: data[i].cca2 });
  }
  console.log("myobj");
  console.log(myContObj);
  coronaAPI();
}
let myCoronaObj = {};
let myCoronaArr = [];
export async function coronaAPI() {
  console.log("coronaAPI----------------");
  let fetchReq = await fetch("https://corona-api.com/countries");
  let data = await fetchReq.json();
  console.log(data.data);
  for (let i = 0; i < data.data.length; i++) {
    myCoronaArr.push(data.data[i].name);
    myCoronaObj[data.data[i].code] = {
      name: data.data[i].name,
      stats: data.data[i].latest_data,
    };
  }
  //gets "death_rate" "recovery_rate" "recovered_vs_death_ratio"
  //"cases_per_million_population" "confirmed"  "critical deaths"  "recovered "
  giveArray("confirmed");
  console.log(myCoronaObj);
  console.log(myCoronaArr);
}
console.log("coronaAPI----------------");

function giveArray(ofWhat) {
  let arr = [];
  console.log(myCoronaObj);
  for (let cont in myCoronaObj) {
    arr.push(myCoronaObj[cont].stats[ofWhat]);
  }
  console.log(arr);
  return arr;
}

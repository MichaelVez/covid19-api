// import { getCoronaObj } from "./fetch.js";
export function setInit(myCoronaObj) {
  let labels = getLabelsFromObj(myCoronaObj);
  let myArr = [
    getDataFromObj(myCoronaObj, "confirmed"),
    getDataFromObj(myCoronaObj, "critical"),
    getDataFromObj(myCoronaObj, "deaths"),
    getDataFromObj(myCoronaObj, "recovered"),
  ];
  drawChart(labels, myArr);
}

export function drawChart(label, myArr) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: "# of confirmed",
          data: myArr[0],
          backgroundColor: ["blue"],
        },
        {
          label: "# of critical",
          data: myArr[1],
          backgroundColor: ["yellow"],
          hidden: true,
        },
        {
          label: "# of deaths",
          data: myArr[2],
          backgroundColor: ["red"],
          hidden: true,
        },
        {
          label: "# of recovered",
          data: myArr[3],
          backgroundColor: ["green"],
          hidden: true,
        },
      ],
    },
    options: {
      animation: {},
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}

export function getLabelsFromObj(arr) {
  let array = [];

  for (let item in arr) {
    array.push(arr[item].name);
  }
  return array;
}
export function getDataFromObj(arr, type = "confirmed") {
  let array = [];
  for (let item in arr) {
    array.push(arr[item].stats[type]);
  }
  return array;
}

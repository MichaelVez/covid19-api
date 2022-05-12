async function fetchs() {
  let fetchReq = await fetch("https://restcountries.herokuapp.com/api/v1");
  let data = await fetchReq.json();
  console.log(data);
}
fetchs();

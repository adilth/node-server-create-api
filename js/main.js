document.getElementById("clickMe").addEventListener("click", makeRequest);

async function makeRequest() {
  const userName = document.getElementById("userName").value;
  const res = await fetch(`/api?student=${userName}`);
  const data = await res.json();
  console.log(data);
  document.getElementById("personName").textContent = data.name;
  document.getElementById("personStatus").textContent = data.status;
  document.getElementById("personOccupation").textContent =
    data.currentOccupation;
}

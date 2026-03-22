async function loadLayout(pageFile) {
  const layout = await fetch('layout.html').then(res => res.text());
  document.body.innerHTML = layout;

  const page = await fetch(pageFile).then(res => res.text());
  document.getElementById('pageContent').innerHTML = page;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

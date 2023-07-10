document.getElementById("sampleFile").addEventListener("change", function(event) {
    const fileName = event.target.files[0].name;
    document.getElementById("file-name").textContent = fileName;
  });
  
function toggleSidebar() {
    var sidebar = document.querySelector('.dynamic-sidebar');
    sidebar.style.width = sidebar.style.width === '200px' ? '0' : '200px';
}

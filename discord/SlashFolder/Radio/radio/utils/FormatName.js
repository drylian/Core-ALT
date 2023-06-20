// Repara nomes
function removeFileExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
  }
module.exports = { removeFileExtension };
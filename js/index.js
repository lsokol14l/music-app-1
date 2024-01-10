let container = document.querySelector(`.albums`);

for (let i = 0; i < albums.length; i++) {
    let album = albums[i]
    container.innerHTML += `<div class="col-xl-3 col-lg-6 col-md-12 mb-4">
          <!--card-->
          <div class="card">
            <img src="${album.img}" alt="album-cover" class="card-image-top" />
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <a href="album.html?i=${i}">
                  <p class="card-text album-title">${album.title}</p>
                </a>
                <span class="e-mark">🅴</span>
              </div>
              <p class="author">${album.author}</p>
              <p class="year">${album.year}</p>
            </div>
          </div>
        </div>`;
}
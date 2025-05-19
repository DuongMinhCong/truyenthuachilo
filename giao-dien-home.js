(function () {
  const sheetID_BTV = "17xADXiY5FoXNgLkYajWSf455fKwZWiXf2oZOt-58w80";
  const itemsPerPage = 6;
  let dataBTV = [];
  let currentPage = 1;

  // Hàm fetch sheet theo tên
  function fetchSheet(sheetName, callback) {
    const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID_BTV}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    fetch(apiURL)
      .then(res => res.text())
      .then(rep => {
        const json = JSON.parse(rep.substr(47).slice(0, -2));
        const rows = json.table.rows;
        const data = rows.map(row => ({
          label: row.c[0]?.v || "",
          category: row.c[1]?.v || "",
          title: row.c[2]?.v || "",
          url: row.c[3]?.v || "#",
          views: row.c[4]?.v || "0",
          image: row.c[5]?.v || "",
          author: row.c[6]?.v || "",
          desc: row.c[7]?.v || "",
        }));
        callback(data.reverse());
      });
  }

  // ==== BTV Đề Cử ====
  function renderBTV(data) {
    dataBTV = data;
    renderPage(currentPage);
    renderPagination();
  }

  function renderPage(page) {
    const container = document.getElementById("grid-container");
    if (!container) return;
    container.innerHTML = '<h3>BTV ĐỀ CỬ</h3><div class="de-cu-grid"></div>';
    const grid = container.querySelector(".de-cu-grid");
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const items = dataBTV.slice(start, end);

    items.forEach(item => {
      const descShort = item.desc.length > 90 ? item.desc.substring(0, 90) + "..." : item.desc;
      grid.innerHTML += `
        <div class="truyen-item">
          <img src="${item.image}" alt="${item.title}" class="truyen-thumb" />
          <div class="truyen-info">
            <h4 class="truyen-title"><a href="${item.url}">${item.title}</a></h4>
            <p class="truyen-desc">${descShort}</p>
            <div class="truyen-meta">
              <span class="truyen-author">${item.author}</span>
              <span class="truyen-tag">${item.category}</span>
            </div>
          </div>
        </div>
      `;
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(dataBTV.length / itemsPerPage);
    const pagination = document.getElementById("pagination");
    if (!pagination) return;
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `<button onclick="changePage(${i})" ${i === currentPage ? 'style="font-weight:bold;"' : ''}>${i}</button>`;
    }
  }

  window.changePage = function (page) {
    currentPage = page;
    renderPage(page);
    renderPagination();
  };

  // ==== Truyện Đã Hoàn Thành ====
  function renderTruyenFull(data) {
    const container = document.getElementById("full-container");
    if (!container) return;
    container.innerHTML = '<h3>TRUYỆN ĐÃ HOÀN THÀNH</h3><div class="full-grid"></div>';
    const grid = container.querySelector(".full-grid");

    const items = data.slice(0, 16); // Giới hạn 16 truyện

    items.forEach(item => {
      grid.innerHTML += `
        <div class="full-item">
          <a href="${item.url}">
            <img src="${item.image}" alt="${item.title}" class="full-thumb"/>
            <div class="full-title">${item.title}</div>
          </a>
        </div>
      `;
    });
  }

  // ==== Truyện Hot ====
  function renderTruyenHot(data) {
    const container = document.getElementById("hot-container");
    if (!container) return;
    container.innerHTML = '<h3>TRUYỆN HOT</h3><div class="hot-grid"></div>';
    const grid = container.querySelector(".hot-grid");

    const items = data.slice(0, 8); // Lấy 8 truyện

    items.forEach(item => {
      grid.innerHTML += `
        <div class="hot-item">
          <a href="${item.url}">
            <img src="${item.image}" alt="${item.title}" class="full-thumb"/>
            <div class="full-title">${item.title}</div>
          </a>
        </div>
      `;
    });
  }

  // ==== Bắt đầu gọi 2 sheet ====
  fetchSheet("Truyện", renderBTV);
  fetchSheet("Full", renderTruyenFull);
  fetchSheet("Hot", renderTruyenHot);
})();

(function () {
  const MAX_ITEMS = 30;
  const ITEMS_PER_PAGE = 3;

  function getRecentReads() {
    return JSON.parse(localStorage.getItem('recentReads') || '{}');
  }

  function setRecentReads(data) {
    localStorage.setItem('recentReads', JSON.stringify(data));
  }

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
    return past.toLocaleDateString();
  }

  function hasVietnamese(text) {
    return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text);
  }

  function saveRecentRead(label, title, url) {
    if (!label || !title || !url) return;
    if (hasVietnamese(label)) return;

    const reads = getRecentReads();
    reads[label] = {
      label,
      title,
      url,
      time: new Date().toISOString()
    };

    const entries = Object.entries(reads)
      .sort((a, b) => new Date(b[1].time) - new Date(a[1].time))
      .slice(0, MAX_ITEMS);

    const newData = Object.fromEntries(entries);
    setRecentReads(newData);
  }

  function renderRecentReads(page = 1) {
    const labelMap = {
      "XSHTTKHPHHCPN": "Xuyên Sách, Hành Trình Tìm Kiếm Hạnh Phúc Hoàn Hảo Của Nữ Phụ",
      "LDTYMTHKGCN": "Lưu Đày Thần Y Mang Theo Không Gian Chạy Nạn",
      "TN70SLLG": "Thập Niên 70: Sống Lại Làm Giàu",
      "truyen-tranh-hay": "Truyện Tranh Hay"
    };

    const container = document.getElementById('recent-reads');
    const list = document.getElementById('recent-stories-list');
    const pagination = document.getElementById('pagination-controls');

    if (!container || !list || !pagination) return;

    const reads = Object.values(getRecentReads())
      .sort((a, b) => new Date(b.time) - new Date(a.time));

    if (!reads.length) {
      container.style.display = 'none';
      return;
    } else {
      container.style.display = 'block';
    }

    const totalPages = Math.ceil(reads.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const visible = reads.slice(start, start + ITEMS_PER_PAGE);

    list.innerHTML = '';
    visible.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'recent-story-item';
      li.innerHTML = `
        <div class="story-info">
          <div class="story-label">${labelMap[item.label] || item.label}</div>
          <a class="story-title" href="${item.url}">${item.title}</a>
          <div class="story-time">${timeAgo(item.time)}</div>
        </div>
        <button class="remove-button" data-label="${item.label}">x</button>
      `;
      list.appendChild(li);
    });

    list.querySelectorAll('.remove-button').forEach(btn => {
      btn.addEventListener('click', function () {
        const label = this.getAttribute('data-label');
        const data = getRecentReads();
        delete data[label];
        setRecentReads(data);
        renderRecentReads(page);
      });
    });

    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (i === page ? ' active' : '');
      btn.textContent = i;
      btn.addEventListener('click', () => renderRecentReads(i));
      pagination.appendChild(btn);
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    const labelElements = document.querySelectorAll('a[rel="tag"]');
    const labels = Array.from(labelElements).map(el => el.textContent.trim());
    const title = document.querySelector('h1, h2')?.innerText?.trim();
    const url = window.location.href;

    if (labels.length && title && url) {
      labels.forEach(label => {
        saveRecentRead(label, title, url);
      });
    }

    renderRecentReads();
  });
})();

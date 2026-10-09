document.addEventListener('DOMContentLoaded', () => {
  const partBtns = document.querySelectorAll('.part-btn');
  const detailModal = document.getElementById('detail-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImg = document.getElementById('modal-img'); // ★追加

  let activeBtn = null;

  // モーダルを開く
  function openModal(btn) {
    const title = btn.getAttribute('data-title');
    const desc = btn.getAttribute('data-description');
    const imgSrc = btn.getAttribute('data-image'); // ★追加

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    // ★追加：画像が指定されている場合は表示、無ければ非表示にする
    if (imgSrc) {
      modalImg.src = imgSrc;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
      modalImg.src = '';
    }

    if (activeBtn) {
      activeBtn.classList.remove('active');
    }
    
    btn.classList.add('active');
    activeBtn = btn;

    detailModal.setAttribute('aria-hidden', 'false');
    detailModal.classList.add('is-visible');
  }

  // モーダルを閉じる
  function closeModal() {
    if (activeBtn) {
      activeBtn.classList.remove('active');
      activeBtn = null;
    }
    detailModal.setAttribute('aria-hidden', 'true');
    detailModal.classList.remove('is-visible');
  }

  // 各部位ボタンのクリックイベント
  partBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeBtn === btn && detailModal.classList.contains('is-visible')) {
        closeModal();
      } else {
        openModal(btn);
      }
    });
  });

  // モーダル自体をクリックしたときは閉じる
  detailModal.addEventListener('click', () => {
    closeModal();
  });

  // 背景画面をクリックしたら閉じる
  document.addEventListener('click', (e) => {
    if (detailModal.classList.contains('is-visible') && !detailModal.contains(e.target)) {
      closeModal();
    }
  });

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    if (mobileMenuBtn && mobileNavMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNavMenu.classList.toggle('hidden');
      });
    }
    function updateTreeImpact(val) {
      const count = parseInt(val, 10);
      document.getElementById('slider-tree-count').textContent = count + ' Pohon';
      const co2 = (count * 28.5).toFixed(1);
      const motor = count * 228;
      const oxygen = count * 2;
      const cost = count * 25000;
      document.getElementById('impact-co2').textContent = co2 + ' kg';
      document.getElementById('impact-motor').textContent = motor.toLocaleString('id-ID') + ' km';
      document.getElementById('impact-ox').textContent = oxygen + ' Orang';
      document.getElementById('impact-cost').textContent = 'Rp ' + cost.toLocaleString('id-ID');
    }
    function setTreeFilter(btn, category) {
      document.querySelectorAll('.cat-filter-btn').forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
      const cards = document.querySelectorAll('.tree-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat') || '';
        if (category === 'all' || cardCat.includes(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }
    function filterCatalog() {
      const query = document.getElementById('catalog-search').value.toLowerCase();
      const cards = document.querySelectorAll('.tree-card');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }
    const adoptModal = document.getElementById('adoptModal');
    let currentAdoptionCost = 25000;
    function openAdoptionModal(treeName, count, cost) {
      document.getElementById('modal-tree-name').textContent = treeName + (count > 1 ? ' (' + count + ' Pohon)' : '');
      document.getElementById('modal-tree-cost').textContent = 'Rp ' + cost.toLocaleString('id-ID');
      currentAdoptionCost = cost;
      adoptModal.classList.remove('hidden');
      setTimeout(() => {
        adoptModal.classList.remove('opacity-0');
        adoptModal.querySelector('div').classList.remove('scale-95');
      }, 10);
    }
    function closeAdoptionModal() {
      adoptModal.classList.add('opacity-0');
      adoptModal.querySelector('div').classList.add('scale-95');
      setTimeout(() => {
        adoptModal.classList.add('hidden');
      }, 300);
    }
    function confirmAdoption() {
      const name = document.getElementById('adopter-name').value;
      const tree = document.getElementById('modal-tree-name').textContent;
      closeAdoptionModal();
      alert('🎉 SELAMAT! Adopsi ' + tree + ' atas nama ' + name + ' berhasil tercatat.\n\nSertifikat digital telah diterbitkan dan barcode monitoring pohon telah dikirimkan ke dashboard Anda!');
    }

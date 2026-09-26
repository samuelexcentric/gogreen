    let userPoints = 1420;
    let carbonKg = 42.5;
    let treeGrowth = 68;
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    if (mobileMenuBtn && mobileNavMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNavMenu.classList.toggle('hidden');
      });
    }
    const logModal = document.getElementById('logActionModal');
    const openLogBtn = document.getElementById('openLogModalBtn');
    const closeLogBtn = document.getElementById('closeLogModalBtn');
    const cancelLogBtn = document.getElementById('cancelLogModalBtn');
    const lessonModal = document.getElementById('lessonModal');
    const activeNodeBtn = document.getElementById('activeNodeBtn');
    const closeLessonBtn = document.getElementById('closeLessonModalBtn');
    const waterBtn = document.getElementById('waterTreeBtn');
    function openModal(modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    function closeModal(modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    if (openLogBtn && logModal) openLogBtn.addEventListener('click', () => openModal(logModal));
    if (closeLogBtn && logModal) closeLogBtn.addEventListener('click', () => closeModal(logModal));
    if (cancelLogBtn && logModal) cancelLogBtn.addEventListener('click', () => closeModal(logModal));
    if (activeNodeBtn && lessonModal) activeNodeBtn.addEventListener('click', () => openModal(lessonModal));
    if (closeLessonBtn && lessonModal) closeLessonBtn.addEventListener('click', () => closeModal(lessonModal));
    function handleActionLogged() {
      closeModal(logModal);
      userPoints += 25;
      carbonKg = +(carbonKg + 0.8).toFixed(1);
      document.getElementById('stat-points').textContent = userPoints.toLocaleString('id-ID');
      document.getElementById('nav-points').textContent = userPoints.toLocaleString('id-ID') + ' Poin';
      document.getElementById('leaderboard-user-points').textContent = userPoints.toLocaleString('id-ID') + ' XP';
      document.getElementById('stat-carbon').textContent = carbonKg;
      const carbonPct = Math.min(100, Math.round((carbonKg / 50) * 100));
      document.getElementById('carbon-percent').textContent = carbonPct + '%';
      document.getElementById('carbon-bar').style.width = carbonPct + '%';
      alert('🎉 Luar biasa! Aksi hijau Anda tercatat: +25 Daun Emas dan 0.8 kg reduksi CO₂ berhasil ditambahkan.');
    }
    function handlePhotoUpload(input) {
      if (input.files && input.files[0]) {
        userPoints += 35;
        document.getElementById('stat-points').textContent = userPoints.toLocaleString('id-ID');
        document.getElementById('nav-points').textContent = userPoints.toLocaleString('id-ID') + ' Poin';
        document.getElementById('leaderboard-user-points').textContent = userPoints.toLocaleString('id-ID') + ' XP';
        document.getElementById('quest2-icon').textContent = '✓';
        document.getElementById('quest2-icon').classList.remove('bg-surface-container-high', 'text-on-surface-variant');
        document.getElementById('quest2-icon').classList.add('bg-primary', 'text-on-primary');
        document.getElementById('quest2-bar').style.width = '100%';
        document.getElementById('quest2-progress-label').textContent = 'Progres: 1/1 Selesai';
        const actionRow = document.getElementById('quest2-action-row');
        actionRow.innerHTML = '<span class="text-[11px] font-body-sm text-primary font-bold">Progres: 1/1 Foto Terverifikasi AI</span><span class="px-2 py-0.5 rounded-md bg-secondary-container/40 text-on-secondary-container font-label-sm text-[11px] font-bold">Telah Diklaim</span>';
        alert('📸 Bukti foto berhasil diverifikasi oleh AI EcoSmart! +35 XP dan Daun Emas ditambahkan ke saldo.');
      }
    }
    function startInteractiveLesson() {
      closeModal(lessonModal);
      userPoints += 60;
      document.getElementById('stat-points').textContent = userPoints.toLocaleString('id-ID');
      document.getElementById('nav-points').textContent = userPoints.toLocaleString('id-ID') + ' Poin';
      document.getElementById('leaderboard-user-points').textContent = userPoints.toLocaleString('id-ID') + ' XP';
      alert('🌱 Modul Selesai! Panduan Tanam Bibit Sayur Mandiri telah tuntas. Selamat, Anda meraih +60 Daun Emas!');
    }
    if (waterBtn) {
      waterBtn.addEventListener('click', () => {
        waterBtn.classList.add('scale-95');
        setTimeout(() => waterBtn.classList.remove('scale-95'), 150);
        if (treeGrowth < 100) {
          treeGrowth = Math.min(100, treeGrowth + 5);
          document.getElementById('tree-growth-bar').style.width = treeGrowth + '%';
          document.getElementById('tree-growth-label').textContent = 'Tumbuh ' + treeGrowth + '%';
          document.getElementById('tree-growth-status').textContent = 'Tumbuh Sehat (' + treeGrowth + '%)';
          const remPct = 100 - treeGrowth;
          const remLeaves = Math.round((remPct / 100) * 500);
          document.getElementById('tree-remaining-pct').textContent = 'Sisa ' + remPct + '% menuju penanaman nyata';
          document.getElementById('tree-leaves-count').textContent = 'Tersisa ' + remLeaves + ' Daun';
          alert('💧 Pohon Mangrove #08 telah disiram! Pertumbuhan meningkat menjadi ' + treeGrowth + '%. Terus rawat setiap hari!');
        } else {
          alert('🌳 Selamat! Pohon Mangrove #08 telah mencapai 100% dan siap dialokasikan ke program reboisasi nyata di Teluk Jakarta.');
        }
      });
    }

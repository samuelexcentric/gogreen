let userPoints = 1420;
      let carbonKg = 42.5;
      let treeGrowth = 68;
      let currentUnitId = null;
      let currentQuizIndex = 0;
      let quizScore = 0;
      const unitData = () => window.units || {};
      function openUnitModal(unitId) {
       const units = window.units || {};
       const unit = units[unitId];
       if (!unit) return;
       currentUnitId = unitId;
       currentQuizIndex = 0;
       quizScore = 0;
       const modal = document.getElementById('unitContentModal');
       const title = modal.querySelector('#unitModalTitle');
       const desc = modal.querySelector('#unitModalDesc');
       const progress = modal.querySelector('#unitModalProgress');
       const modules = modal.querySelector('#unitModalModules');
       const quiz = modal.querySelector('#unitModalQuiz');
       title.textContent = unit.title;
       desc.textContent = unit.description;
       progress.style.width = unit.progress + '%';
       modules.innerHTML = unit.modules.map(m => `
         <div class="p-3 rounded-lg bg-surface-container-low flex items-center gap-3">
           <span class="material-symbols-outlined text-primary text-[24px]">${m.icon}</span>
           <div class="flex-1">
             <div class="font-label-md text-on-surface">${m.name}</div>
             <div class="text-[12px] text-on-surface-variant">${m.score}/100</div>
           </div>
           <span class="text-tertiary font-bold">★ ${m.score > 0 ? 3 : 0}/3</span>
         </div>
       `).join('');
       if (unit.quiz && unit.quiz.length > 0) {
         quiz.style.display = 'block';
         showQuizQuestion();
       } else {
         quiz.style.display = 'none';
       }
       modal.classList.remove('hidden');
       modal.classList.add('flex');
     }
     function closeUnitModal() {
       const modal = document.getElementById('unitContentModal');
       modal.classList.add('hidden');
       modal.classList.remove('flex');
     }
     function showQuizQuestion() {
       const units = window.units || {};
       const unit = units[currentUnitId];
       if (!unit || !unit.quiz || currentQuizIndex >= unit.quiz.length) {
         endQuiz();
         return;
       }
       const q = unit.quiz[currentQuizIndex];
       const container = document.getElementById('unitQuizContainer');
       container.innerHTML = `
         <div class="space-y-4">
           <div>
             <div class="text-sm text-on-surface-variant mb-2">Soal ${currentQuizIndex + 1}/${unit.quiz.length}</div>
             <h4 class="font-label-md text-on-surface mb-3">${q.q}</h4>
           </div>
           <div class="space-y-2">
             ${q.opts.map((opt, i) => `
               <label class="flex items-center p-3 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                 <input type="radio" name="quiz-option" value="${i}" class="peer hidden"/>
                 <div class="peer-checked:text-primary peer-checked:font-bold text-on-surface flex-1">${opt}</div>
                 <div class="w-5 h-5 rounded-full border-2 border-on-surface-variant peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary flex items-center justify-center text-[12px]">
                   <span class="peer-checked:block hidden">✓</span>
                 </div>
               </label>
             `).join('')}
           </div>
           <button onclick="submitAnswer()" class="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md hover:bg-on-primary-fixed-variant transition-all">
             Lanjut
           </button>
         </div>
       `;
     }
     function submitAnswer() {
       const selected = document.querySelector('input[name="quiz-option"]:checked');
       if (!selected) {
         alert('Pilih jawaban terlebih dahulu!');
         return;
       }
       const units = window.units || {};
       const unit = units[currentUnitId];
       const answer = parseInt(selected.value);
       if (answer === unit.quiz[currentQuizIndex].ans) {
         quizScore++;
       }
       currentQuizIndex++;
       showQuizQuestion();
     }
     function endQuiz() {
       const units = window.units || {};
       const unit = units[currentUnitId];
       const totalQ = unit.quiz.length;
       const points = Math.round((quizScore / totalQ) * 100);
       userPoints += points;
       document.getElementById('stat-points').textContent = userPoints.toLocaleString('id-ID');
       document.getElementById('nav-points').textContent = userPoints.toLocaleString('id-ID') + ' Poin';
       document.getElementById('leaderboard-user-points').textContent = userPoints.toLocaleString('id-ID') + ' XP';
       const container = document.getElementById('unitQuizContainer');
       container.innerHTML = `
         <div class="text-center py-6">
           <div class="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
             <span class="material-symbols-outlined text-[32px]">verified</span>
           </div>
           <h4 class="font-title-md text-on-surface mb-2">Kuis Selesai!</h4>
           <p class="text-on-surface-variant mb-4">Skor: ${quizScore}/${totalQ} (${Math.round((quizScore/totalQ)*100)}%)</p>
           <div class="px-3 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-bold text-sm mb-4">
             +${points} Daun Emas
           </div>
           <button onclick="closeUnitModal()" class="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md">Tutup</button>
         </div>
       `;
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

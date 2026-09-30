function toggleRegPassword() {
      const input = document.getElementById('regPassword');
      const icon = document.getElementById('regPassIcon');
      if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility';
      } else {
        input.type = 'password';
        icon.textContent = 'visibility_off';
      }
    }
    function checkStrength(val) {
      const bar = document.getElementById('strengthBar');
      const txt = document.getElementById('strengthText');
      if (!bar || !txt) return;
      if (val.length < 6) {
        bar.style.width = '25%';
        bar.className = 'h-full bg-error transition-all duration-300';
        txt.textContent = 'Lemah';
        txt.className = 'font-label-sm text-[11px] text-error';
      } else if (val.length < 10) {
        bar.style.width = '60%';
        bar.className = 'h-full bg-tertiary-fixed-dim transition-all duration-300';
        txt.textContent = 'Sedang';
        txt.className = 'font-label-sm text-[11px] text-tertiary';
      } else {
        bar.style.width = '100%';
        bar.className = 'h-full bg-primary transition-all duration-300';
        txt.textContent = 'Kuat & Aman';
        txt.className = 'font-label-sm text-[11px] text-primary font-bold';
      }
    }
    function simulateSocialRegister(provider) {
      alert(`🎉 Pendaftaran instan via ${provider} sukses!\nSelamat datang di EcoSmart. Bonus +100 Daun Emas telah ditambahkan ke akunmu.`);
      window.location.href = 'misi-harian.html';
    }
    function handleRegister() {
      const btn = document.getElementById('regSubmitBtn');
      const name = document.getElementById('regName').value;
      if (!btn) return;
      btn.disabled = true;
      btn.innerHTML = `
        <span class="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
        <span>Mendaftarkan Relawan...</span>
      `;
      setTimeout(() => {
        btn.innerHTML = `
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Akun Berhasil Dibuat!</span>
        `;
        btn.classList.remove('bg-primary');
        btn.classList.add('bg-tertiary-container');
        alert(`🎉 Selamat Bergabung, ${name}!\n\nAkun relawan EcoSmart kamu telah aktif.\n+100 Daun Emas (Poin Hijau) berhasil diklaim dan pohon virtual perdanamu siap dirawat di EcoTracker.`);
        setTimeout(() => {
          window.location.href = 'misi-harian.html';
        }, 800);
      }, 1200);
    }

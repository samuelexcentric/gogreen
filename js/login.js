function togglePasswordVisibility() {
      const passwordInput = document.getElementById('password');
      const passwordIcon = document.getElementById('passwordIcon');
      if (!passwordInput || !passwordIcon) return;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.textContent = 'visibility';
      } else {
        passwordInput.type = 'password';
        passwordIcon.textContent = 'visibility_off';
      }
    }
    function simulateSocialLogin(provider) {
      alert(`🔐 Masuk dengan ${provider}: Autentikasi berhasil! Mengarahkan ke EcoTracker...`);
      window.location.href = 'misi-harian.html';
    }
    function handleLogin() {
      const btn = document.getElementById('submitBtn');
      if (!btn) return;
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `
        <span class="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
        <span>Memverifikasi Akun...</span>
      `;
      setTimeout(() => {
        btn.innerHTML = `
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Berhasil Masuk!</span>
        `;
        btn.classList.remove('bg-primary');
        btn.classList.add('bg-tertiary-container');
        setTimeout(() => {
          window.location.href = 'misi-harian.html';
        }, 1000);
      }, 1200);
    }

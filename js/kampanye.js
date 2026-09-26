    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    if (mobileMenuBtn && mobileNavMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNavMenu.classList.toggle('hidden');
      });
    }
    function openVolunteerModal(campaignTitle, campaignDate) {
      const modal = document.getElementById('volunteer-modal');
      const titleEl = document.getElementById('modal-campaign-name');
      const dateEl = document.getElementById('modal-campaign-date');
      if (titleEl) titleEl.textContent = campaignTitle;
      if (dateEl) dateEl.innerHTML = '<span class="material-symbols-outlined text-[16px]">calendar_today</span> ' + campaignDate;
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
      }, 10);
    }
    function closeVolunteerModal() {
      const modal = document.getElementById('volunteer-modal');
      modal.classList.add('opacity-0');
      modal.querySelector('div').classList.add('scale-95');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    }
    function confirmVolunteerRegistration() {
      closeVolunteerModal();
      showToast('Pendaftaran relawan berhasil! Barcode verifikasi telah terkirim via WhatsApp & tersimpan di profilmu.');
    }
    function handleCampaignSubmit(e) {
      e.preventDefault();
      e.target.reset();
      showToast('Proposal kampanye sukses dikirim! Tim kurator EcoSmart akan menghubungi Anda dalam 1x24 jam.');
    }
    let toastTimer = null;
    function showToast(msg) {
      const toast = document.getElementById('toast-notification');
      const toastMsg = document.getElementById('toast-message');
      if (toastMsg) toastMsg.textContent = msg;
      if (toastTimer) clearTimeout(toastTimer);
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.remove('opacity-0');
      }, 10);
      toastTimer = setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
          toast.classList.add('hidden');
        }, 300);
      }, 4500);
    }

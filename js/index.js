    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    if (mobileMenuBtn && mobileNavMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNavMenu.classList.toggle('hidden');
      });
    }
    function setActiveFilter(btn, filterCategory) {
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
      const cards = document.querySelectorAll('.diy-card');
      let visibleCount = 0;
      cards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      const countLabel = document.getElementById('active-count-label');
      if (countLabel) {
        countLabel.textContent = 'Menampilkan ' + visibleCount + ' Modul Siap Pakai';
      }
    }
    function searchDIYCards() {
      const query = document.getElementById('diy-search-input').value.toLowerCase();
      const cards = document.querySelectorAll('.diy-card');
      let visibleCount = 0;
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      const countLabel = document.getElementById('active-count-label');
      if (countLabel) {
        countLabel.textContent = 'Menampilkan ' + visibleCount + ' Modul Terkait';
      }
    }
    function filterByBudget() {
      const budgetBtn = document.querySelector('[data-filter="budget-0"]');
      if (budgetBtn) {
        setActiveFilter(budgetBtn, 'budget-0');
      }
    }
    function toggleBookmark(button) {
      const icon = button.querySelector('.material-symbols-outlined');
      if (icon.innerText === 'bookmark_border') {
        icon.innerText = 'bookmark';
        icon.style.fontVariationSettings = "'FILL' 1";
        button.classList.add('text-primary');
        showToast('Tersimpan', 'Modul panduan disimpan ke bookmark Anda.', 'bookmark');
      } else {
        icon.innerText = 'bookmark_border';
        icon.style.fontVariationSettings = "'FILL' 0";
        button.classList.remove('text-primary');
      }
    }
    function playEcoChime(type = 'water') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'water') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); 
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); 
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        } else {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); 
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); 
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        }
      } catch (e) {
      }
    }
    function showToast(title, message, icon = 'check_circle', isSuccess = true) {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `p-4 rounded-xl shadow-xl flex items-start gap-3 text-on-surface transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto border ${
        isSuccess ? 'bg-surface-container-lowest border-primary/30' : 'bg-surface-container-lowest border-amber-500/30'
      }`;
      toast.innerHTML = `
        <span class="material-symbols-outlined text-[24px] ${isSuccess ? 'text-primary' : 'text-amber-600'} shrink-0">${icon}</span>
        <div class="flex-1">
          <h4 class="font-title-md text-sm font-bold text-on-surface leading-snug">${title}</h4>
          <p class="font-body-sm text-xs text-on-surface-variant mt-0.5">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="text-on-surface-variant hover:text-on-surface p-1">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
      }, 10);
      setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 4500);
    }
    let currentUserPoints = parseInt(localStorage.getItem('ecosmart_points') || '1420', 10);
    function addPoints(amount, reason = '') {
      currentUserPoints += amount;
      localStorage.setItem('ecosmart_points', currentUserPoints);
      const badge = document.getElementById('headerPointsDisplay');
      if (badge) {
        badge.textContent = currentUserPoints.toLocaleString('id-ID') + ' Poin';
        badge.classList.add('scale-110', 'text-primary');
        setTimeout(() => {
          badge.classList.remove('scale-110', 'text-primary');
        }, 500);
      }
    }
    const initialBadge = document.getElementById('headerPointsDisplay');
    if (initialBadge) {
      initialBadge.textContent = currentUserPoints.toLocaleString('id-ID') + ' Poin';
    }
    const cityDatabase = {
      'Jakarta': { temp: '32°C', humidity: '65% RH', condition: 'Sangat Terik', evap: 'Cepat (1.4x)', advice: 'Cuaca terik siang hari mempercepat pengeringan media botol. Direkomendasikan menyiram saat teduh pagi & sore.', dose: '150 ml / botol', next: 'Sore pk 17:15 WIB' },
      'Surabaya': { temp: '34°C', humidity: '58% RH', condition: 'Ekstrem Panas', evap: 'Sangat Cepat (1.6x)', advice: 'Suhu tinggi memicu dehidrasi akar cepat. Pastikan siram 2x sehari dan basahi permukaan botol.', dose: '180 ml / botol', next: 'Sore pk 17:00 WIB' },
      'Bandung': { temp: '24°C', humidity: '78% RH', condition: 'Sejuk Berawan', evap: 'Sedang (0.9x)', advice: 'Penguapan relatif rendah karena udara sejuk pegunungan. Siram 1x sehari di pagi hari sudah cukup.', dose: '120 ml / botol', next: 'Besok pk 06:30 WIB' },
      'Medan': { temp: '31°C', humidity: '74% RH', condition: 'Cerah Lembap', evap: 'Sedang (1.1x)', advice: 'Udara lembap tropis. Waspadai genangan berlebih di dasar botol gantung.', dose: '140 ml / botol', next: 'Sore pk 17:15 WIB' },
      'Denpasar': { temp: '30°C', humidity: '70% RH', condition: 'Cerah Tropis', evap: 'Cepat (1.3x)', advice: 'Angin pesisir dan terik matahari sedang. Jadwal pagi pk 06:30 dan sore pk 17:30 paling pas.', dose: '160 ml / botol', next: 'Sore pk 17:30 WIB' },
      'Yogyakarta': { temp: '29°C', humidity: '72% RH', condition: 'Cerah Hangat', evap: 'Sedang (1.1x)', advice: 'Kondisi hangat optimal untuk tunas kangkung & sayur daun bertunas subur.', dose: '140 ml / botol', next: 'Sore pk 17:15 WIB' }
    };
    function updateQuickWeather(city) {
      const data = cityDatabase[city] || cityDatabase['Jakarta'];
      document.getElementById('quickTemp').textContent = data.temp;
      document.getElementById('quickHumidity').textContent = data.humidity;
      document.getElementById('quickCondition').textContent = data.condition;
      document.getElementById('quickDose').textContent = data.dose;
      document.getElementById('quickNextSchedule').textContent = data.next;
      const modalSelect = document.getElementById('modalCitySelect');
      if (modalSelect && modalSelect.value !== city) {
        modalSelect.value = city;
        syncModalWeather(city);
      }
    }
    function syncModalWeather(city) {
      const data = cityDatabase[city] || cityDatabase['Jakarta'];
      document.getElementById('modalTemp').textContent = data.temp;
      document.getElementById('modalHumidity').textContent = data.humidity;
      document.getElementById('modalEvap').textContent = data.evap;
      document.getElementById('modalWeatherAdvice').textContent = data.advice;
      const quickSelect = document.getElementById('quickCitySelect');
      if (quickSelect && quickSelect.value !== city) {
        quickSelect.value = city;
        updateQuickWeather(city);
      }
      recalcWateringPlan();
    }
    function detectGPSLocation() {
      const gpsLabel = document.getElementById('gpsLabel');
      const gpsIcon = document.getElementById('gpsIcon');
      gpsLabel.textContent = 'Mendeteksi...';
      gpsIcon.classList.add('animate-spin');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            gpsLabel.textContent = 'GPS Terkunci';
            gpsIcon.classList.remove('animate-spin');
            syncModalWeather('Jakarta');
            showToast('Lokasi Terdeteksi', `Koordinat (${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}) disinkronkan ke stasiun cuaca terdekat.`, 'my_location');
          },
          (err) => {
            gpsLabel.textContent = 'GPS Manual';
            gpsIcon.classList.remove('animate-spin');
            syncModalWeather('Jakarta');
            showToast('Sensor Cuaca Lokal', 'Menggunakan sensor mikroklimat default Jakarta (32°C, 65% RH).', 'info');
          },
          { timeout: 4000 }
        );
      } else {
        gpsLabel.textContent = 'GPS Tidak Didukung';
        gpsIcon.classList.remove('animate-spin');
      }
    }
    function recalcWateringPlan() {
      const plantTypeEl = document.querySelector('input[name="plantType"]:checked');
      const plantType = plantTypeEl ? plantTypeEl.value : 'vertikultur';
      const media = document.getElementById('modalMediaSelect').value;
      const sun = document.getElementById('modalSunSelect').value;
      let baseDose = 150;
      let scheduleText = 'Pagi pk 06:30 & Sore pk 17:15';
      let tip = 'Hindari menyiram jam 11:00-14:00 untuk mencegah daun layu terbakar uap panas.';
      if (plantType === 'microgreens') {
        baseDose = 50;
        scheduleText = 'Semprot Kabut Halus 2x Sehari (Pagi & Malam)';
        tip = 'Gunakan sprayer halus agar bibit muda tidak roboh terkena tekanan air.';
      } else if (plantType === 'sayurbuah') {
        baseDose = 350;
        scheduleText = '1x Sehari (Pagi pk 06:30)';
        tip = 'Pastikan air meresap ke akar dalam tanpa menggenangi batang utama.';
      } else if (plantType === 'stekhias') {
        baseDose = 100;
        scheduleText = '1x Setiap 2-3 Hari';
        tip = 'Biarkan tanah agak kering sebelum penyiraman berikutnya agar nodus tidak membusuk.';
      }
      if (media === 'botol') baseDose += 20;
      if (sun === 'terik') baseDose += 30;
      const doseBadge = document.getElementById('modalDoseBadge');
      if (doseBadge) doseBadge.textContent = baseDose + ' ml / wadah';
      const scheduleTip = document.getElementById('modalScheduleTip');
      if (scheduleTip) scheduleTip.textContent = tip;
    }
    function openWateringModal() {
      const modal = document.getElementById('modalWateringAI');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }
    function closeWateringModal() {
      const modal = document.getElementById('modalWateringAI');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
    function triggerQuickWatering() {
      playEcoChime('water');
      addPoints(15, 'Siram Tanaman');
      const quickBar = document.getElementById('quickMoistureBar');
      const quickLabel = document.getElementById('quickMoistureLabel');
      if (quickBar && quickLabel) {
        quickBar.style.width = '100%';
        quickBar.className = 'bg-secondary h-full rounded-full transition-all duration-700';
        quickLabel.textContent = '100% (Lembap Optimal - Baru Disiram!)';
        quickLabel.className = 'text-secondary font-bold';
      }
      const modalBar = document.getElementById('modalMoistureBar');
      const modalStatus = document.getElementById('modalMoistureStatus');
      const modalAdvice = document.getElementById('modalActionAdvice');
      if (modalBar && modalStatus) {
        modalBar.style.width = '100%';
        modalBar.className = 'bg-secondary h-full rounded-full transition-all duration-700';
        modalStatus.textContent = '100% (Optimal)';
        modalStatus.className = 'text-secondary font-bold';
        if (modalAdvice) modalAdvice.textContent = '✅ Tanaman segar dan berhidrasi optimal untuk 12 jam ke depan!';
      }
      showToast('Penyiraman Berhasil! 💧', '+15 Poin Hijau berhasil diklaim. Tanah tanaman kini lembap optimal.', 'water_drop');
    }
    function requestBrowserNotification() {
      if (!('Notification' in window)) {
        showToast('Peramban Tidak Mendukung', 'Web Notification API tidak didukung pada peramban ini.', 'warning', false);
        return;
      }
      Notification.requestPermission().then(permission => {
        const badge = document.getElementById('notifStatusBadge');
        if (permission === 'granted') {
          if (badge) {
            badge.textContent = 'Aktif & Terhubung';
            badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold';
          }
          new Notification('🌿 EcoSmart Watering AI', {
            body: 'Notifikasi aktif! Kami akan mengingatkan Anda saat kelembapan botol turun di bawah 40%.',
            icon: 'https://lh3.googleusercontent.com/aida/AEtjO1VxnTWcVeBO48LyD2YOdYj6Zkq7S2xj4yOcODQ6aLW-WCrXOuVxUuB7M2O-aU8p0ttdZ4ikQ32bQnTo2FdrMi_1QAMliJTTudpzfWqjEDDFvosE7AxlaIWjtlOs4F-QKn7catXdGLLl9ySII3gKkFrq7Lzxv3hEl7aaLzh19-ZwxS7uh7BrBev5BvygbJyL3ghekbNDSaaQqR_VKZIHKWIEiaRob9Uyp-_S0OnwvJjMv_WRN6CXwQ5uV-J4'
          });
          showToast('Notifikasi Aktif', 'Peringatan siram otomatis akan tampil di desktop/ponsel Anda.', 'notifications_active');
        } else {
          showToast('Izin Ditolak', 'Izin notifikasi tidak diberikan. Anda tetap dapat melihat jadwal di halaman ini.', 'info', false);
        }
      });
    }
    function testNotificationChime() {
      playEcoChime('celebrate');
      showToast('Uji Alarm Suara', 'Nada notifikasi lembut berhasil diputar.', 'volume_up');
    }
    function saveWateringSchedule() {
      showToast('Jadwal Disimpan', 'Jadwal siram adaptif berhasil disinkronkan ke profil EcoSmart Anda.', 'task_alt');
      closeWateringModal();
    }
    function downloadCalendarICS() {
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EcoSmart Nusantara//Watering Reminder AI//ID
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:🌿 EcoSmart: Waktunya Siram Tanaman Vertikultur DIY
DESCRIPTION:Jadwal siram adaptif tanaman DIY botol bekas Anda (Dosis 150ml). Jaga kelembapan optimal akar sebelum terik matahari!
RRULE:FREQ=DAILY;BYHOUR=6,17;BYMINUTE=30
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'jadwal_siram_ecosmart.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Unduhan Dimulai', 'File kalender jadwal_siram_ecosmart.ics berhasil diunduh.', 'download');
    }
    function updateQuickCarbon() {
      const bottles = parseInt(document.getElementById('quickBottleRange').value, 10);
      const compost = parseInt(document.getElementById('quickCompostRange').value, 10);
      document.getElementById('quickBottleVal').textContent = bottles;
      document.getElementById('quickCompostVal').textContent = compost;
      const totalWeekly = (bottles * 0.15) + (compost * 0.62);
      const motorKm = (totalWeekly / 0.103); 
      document.getElementById('quickCarbonTotal').textContent = totalWeekly.toFixed(2);
      document.getElementById('quickCarbonMotor').textContent = `Setara ${motorKm.toFixed(1)} km motor dihemat`;
      const modalBottle = document.getElementById('auditBottleSlider');
      const modalCompost = document.getElementById('auditCompostSlider');
      if (modalBottle) modalBottle.value = bottles;
      if (modalCompost) modalCompost.value = compost;
    }
    function openCarbonModal() {
      const modal = document.getElementById('modalCarbonCalculator');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        recalculateFullAudit();
      }
    }
    function closeCarbonModal() {
      const modal = document.getElementById('modalCarbonCalculator');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
    function setAuditPreset(sliderId, value) {
      const slider = document.getElementById(sliderId);
      if (slider) {
        slider.value = value;
        recalculateFullAudit();
      }
    }
    function recalculateFullAudit() {
      const bottles = parseInt(document.getElementById('auditBottleSlider').value, 10);
      const compost = parseInt(document.getElementById('auditCompostSlider').value, 10);
      const veg = parseInt(document.getElementById('auditVegSlider').value, 10);
      const biopori = parseInt(document.getElementById('auditBioporiSlider').value, 10);
      document.getElementById('auditBottleVal').textContent = bottles;
      document.getElementById('auditCompostVal').textContent = compost;
      document.getElementById('auditVegVal').textContent = veg;
      document.getElementById('auditBioporiVal').textContent = biopori;
      const subBottle = bottles * 0.15;
      const subCompost = compost * 0.62;
      const subVeg = veg * 0.35;
      const subBiopori = biopori * 1.0;
      document.getElementById('subtotalBottle').textContent = subBottle.toFixed(2);
      document.getElementById('subtotalCompost').textContent = subCompost.toFixed(2);
      document.getElementById('subtotalVeg').textContent = subVeg.toFixed(2);
      document.getElementById('subtotalBiopori').textContent = subBiopori.toFixed(2);
      const totalWeekly = subBottle + subCompost + subVeg + subBiopori;
      const totalMonthly = totalWeekly * 4.3;
      const totalAnnual = totalWeekly * 52;
      document.getElementById('auditTotalWeekly').textContent = totalWeekly.toFixed(2);
      document.getElementById('auditTotalMonthly').textContent = totalMonthly.toFixed(1) + ' kg';
      document.getElementById('auditTotalAnnual').textContent = totalAnnual.toFixed(1) + ' kg';
      const motorKm = totalWeekly / 0.103; 
      const trees = totalAnnual / 20.0; 
      const bulbHours = Math.round(totalWeekly * 120); 
      document.getElementById('auditEquivMotor').textContent = motorKm.toFixed(1) + ' km';
      document.getElementById('auditEquivTree').textContent = trees.toFixed(1) + ' Pohon/thn';
      document.getElementById('auditEquivBulb').textContent = bulbHours + ' Jam LED';
      const tierBadge = document.getElementById('auditTierBadge');
      if (totalMonthly < 10) {
        tierBadge.innerHTML = '<span>🌱</span><span>Tunas Muda Hijau</span>';
      } else if (totalMonthly < 25) {
        tierBadge.innerHTML = '<span>🌿</span><span>Penjaga Iklim Rumah Tangga</span>';
      } else if (totalMonthly < 50) {
        tierBadge.innerHTML = '<span>🏆</span><span>Pahlawan Zero Waste Nusantara</span>';
      } else {
        tierBadge.innerHTML = '<span>👑</span><span>Net-Zero Nusantara Champion</span>';
      }
      const quickB = document.getElementById('quickBottleRange');
      const quickC = document.getElementById('quickCompostRange');
      if (quickB) quickB.value = Math.min(bottles, 30);
      if (quickC) quickC.value = Math.min(compost, 15);
      const qValB = document.getElementById('quickBottleVal');
      const qValC = document.getElementById('quickCompostVal');
      if (qValB) qValB.textContent = quickB ? quickB.value : bottles;
      if (qValC) qValC.textContent = quickC ? quickC.value : compost;
    }
    function claimQuickCarbonAudit() {
      playEcoChime('celebrate');
      addPoints(100, 'Audit Karbon Mandiri');
      showToast('Audit Karbon Berhasil Diklaim! 🎉', '+100 Daun Emas ditambahkan ke profil Anda. Terus tingkatkan daur ulang!', 'workspace_premium');
    }
    function claimFullCarbonAudit() {
      playEcoChime('celebrate');
      addPoints(100, 'Audit Karbon Mandiri Lengkap');
      showToast('Sertifikat Audit Terbit! 🏆', '+100 Daun Emas ditambahkan ke saldo EcoTracker Anda.', 'verified');
      closeCarbonModal();
    }
    function downloadCarbonAuditReport() {
      const weekly = document.getElementById('auditTotalWeekly').textContent;
      const monthly = document.getElementById('auditTotalMonthly').textContent;
      const annual = document.getElementById('auditTotalAnnual').textContent;
      const motor = document.getElementById('auditEquivMotor').textContent;
      const trees = document.getElementById('auditEquivTree').textContent;
      const bottles = document.getElementById('auditBottleVal').textContent;
      const compost = document.getElementById('auditCompostVal').textContent;
      const veg = document.getElementById('auditVegVal').textContent;
      const biopori = document.getElementById('auditBioporiVal').textContent;
      const report = `==========================================================
ECOSMART NUSANTARA - SERTIFIKAT AUDIT JEJAK KARBON MANDIRI
Metodologi: Standar IPCC 2024 & KLHK Republik Indonesia
Tanggal Audit: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
==========================================================
DATA KONTRIBUSI RUMAH TANGGA:
1. Daur Ulang Botol PET Bekas : ${bottles} botol/pekan
2. Kompos Sampah Dapur       : ${compost} kg/pekan
3. Panen Sayur Mandiri       : ${veg} porsi/pekan
4. Resapan Lubang Biopori    : ${biopori} lubang aktif
TOTAL EMISI CO2e YANG BERHASIL DIHINDARKAN DARI ATMOSFER:
- Per Pekan  : ${weekly} kg CO2e
- Per Bulan  : ${monthly}
- Per Tahun  : ${annual}
EKUIVALEN DAMPAK NYATA TERHADAP LINGKUNGAN:
- Perjalanan motor konvensional yang dieliminasi : ${motor}
- Setara daya serap pohon mangrove dewasa       : ${trees}
- Hemat energi listrik penerangan rumah tangga   : ${document.getElementById('auditEquivBulb').textContent}
Terima kasih atas dedikasi nyata Anda dalam menjaga kelestarian bumi nusantara!
EcoSmart - Digital Green Solutions
https://ecosmart.nusantara.id
==========================================================`;
      const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `sertifikat_audit_karbon_ecosmart_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Laporan Diunduh', 'Sertifikat audit karbon mandiri berhasil disimpan ke perangkat.', 'file_download');
    }
    function shareCarbonAuditWhatsApp() {
      const weekly = document.getElementById('auditTotalWeekly').textContent;
      const motor = document.getElementById('auditEquivMotor').textContent;
      const text = encodeURIComponent(
        `🌿 Saya baru saja mengaudit jejak karbon mandiri di EcoSmart! Dengan daur ulang botol dan komposting di rumah, saya berhasil mencegah ${weekly} kg CO₂e per pekan (setara mematikan emisi motor sejauh ${motor})! Yuk hitung jejak karbonmu di EcoSmart Nusantara.`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
     const units = {
       'unit-1': {
         title: 'Fondasi Rumah Ramah Lingkungan',
         description: 'Menguasai pemilahan dasar, komposting mandiri, dan penataan sudut hijau rumah.',
         status: 'completed',
         progress: 100,
         modules: [
           { name: 'Pisah Sampah Organik', icon: 'delete_sweep', score: 100 },
           { name: 'Kompos Takakura Pertama', icon: 'compost', score: 100 },
           { name: 'Pojok Hijau Hunian', icon: 'yard', score: 100 }
         ],
         quiz: [
           { q: 'Berapa lama sampah organik dapat terurai alami?', opts: ['2 minggu', '1-3 bulan', '6 bulan', '1 tahun'], ans: 1 },
           { q: 'Apa bahan utama untuk media kompos?', opts: ['Plastik', 'Daun kering & sampah dapur', 'Pasir', 'Batu'], ans: 1 },
           { q: 'Keuntungan pojok hijau untuk rumah?', opts: ['Estetika saja', 'Penyejuk alami & pemurni udara', 'Hanya hiasan', 'Tidak ada'], ans: 1 }
         ]
       },
       'unit-2': {
         title: 'Kebun Mandiri & Hemat Sumber Daya',
         description: 'Langkah nyata memproduksi pangan segar perkotaan dan efisiensi air.',
         status: 'active',
         progress: 25,
         modules: [
           { name: 'Tanam Bibit Sayur', icon: 'psychiatry', score: 60 },
           { name: 'Irigasi Daur Ulang', icon: 'opacity', score: 0 },
           { name: 'Panen & Nutrisi', icon: 'eco', score: 0 },
           { name: 'Uji Pengetahuan: Nol Sampah', icon: 'military_tech', score: 0 }
         ],
         quiz: [
           { q: 'Berapa hari sayuran daun dapat dipanen?', opts: ['7 hari', '14 hari', '30-45 hari', '60 hari'], ans: 2 },
           { q: 'Metode irigasi hemat air terbaik?', opts: ['Penyiraman manual', 'Sistem tetes otomatis', 'Penyemprot selang', 'Rendam total'], ans: 1 },
           { q: 'Sayuran mana yang paling cepat panen?', opts: ['Tomat', 'Microgreens (7-10 hari)', 'Timun', 'Wortel'], ans: 1 }
         ]
       },
       'unit-3': {
         title: 'Duta Hijau Lingkungan RT/RW',
         description: 'Sosialisasi warga, bank sampah komunal, dan audit emisi perumahan.',
         status: 'locked',
         progress: 0,
         modules: [
           { name: 'Sosialisasi Warga', icon: 'groups', score: 0 },
           { name: 'Bank Sampah Komunal', icon: 'inventory_2', score: 0 },
           { name: 'Audit Emisi Perumahan', icon: 'assessment', score: 0 }
         ],
         quiz: [
           { q: 'Apa itu bank sampah?', opts: ['Tempat sampah biasa', 'Sistem pemilahan sampah & tukar nilai', 'Tempat buang sampah', 'Gudang sampah'], ans: 1 },
           { q: 'Berapa target daur ulang nasional?', opts: ['30%', '50%', '70%', '100%'], ans: 1 }
         ]
       },
       'unit-4': {
         title: 'Teknologi Smart Monitoring Rumah Hijau',
         description: 'Sensor IoT sederhana untuk monitoring suhu, kelembapan, dan cahaya tanaman.',
         status: 'locked',
         progress: 0,
         modules: [
           { name: 'Setup Sensor Suhu', icon: 'thermostat', score: 0 },
           { name: 'Monitoring Dashboard', icon: 'dashboard', score: 0 }
         ],
         quiz: [
           { q: 'Suhu ideal untuk mayoritas tanaman?', opts: ['15-20°C', '20-25°C', '25-35°C', '35-40°C'], ans: 1 }
         ]
       },
       'unit-5': {
         title: 'Kolaborasi Ekowisata Perkotaan',
         description: 'Buat pengalaman edukasi hijau untuk komunitas lokal dan panen bersama.',
         status: 'locked',
         progress: 0,
         modules: [
           { name: 'Perencanaan Ekowisata', icon: 'public', score: 0 },
           { name: 'Edukasi Pengunjung', icon: 'school', score: 0 }
         ],
         quiz: [
           { q: 'Manfaat ekowisata bagi lingkungan?', opts: ['Hanya bisnis', 'Edukasi & konservasi', 'Hiburan saja', 'Tidak ada'], ans: 1 }
         ]
       },
       'unit-6': {
         title: 'Sertifikasi Eco-Champion Nusantara',
         description: 'Capai standar nasional sebagai praktisi sustainable living bersertifikat.',
         status: 'locked',
         progress: 0,
         modules: [
           { name: 'Ujian Komprehensif', icon: 'verified_user', score: 0 },
           { name: 'Presentasi Proyek', icon: 'slideshow', score: 0 },
           { name: 'Sertifikat Digital', icon: 'card_membership', score: 0 }
         ],
         quiz: [
           { q: 'Siapa saja bisa menjadi Eco-Champion?', opts: ['Hanya profesional', 'Siapa saja yang kompeten', 'Hanya kaya', 'Hanya tertentu'], ans: 1 }
         ]
       }
     };
     window.units = units;
     const diyGuides = {
      vertikultur: {
        title: 'Vertikultur Dinding dari Botol Bekas Air Mineral',
        icon: 'psychology',
        difficulty: 'Mudah',
        time: '45 Menit',
        content: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 class="font-semibold text-on-surface mb-2">Deskripsi</h4>
            <p class="text-sm text-on-surface-variant">Metode rekayasa taman gantung hemat ruang memanfaatkan limbah galon dan botol 1.5L dengan media kompos sisa dapur. Hemat air hingga 80% dibanding tanam langsung di tanah.</p>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Langkah-Langkah</h4>
            <ol class="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
              <li><strong>Potong botol:</strong> Potong botol plastik 1.5L menjadi 2 bagian, bagian atas jadi pot gantung</li>
              <li><strong>Buat lubang drainase:</strong> Lubangi bagian bawah dengan paku panas untuk drainase air</li>
              <li><strong>Ikat dengan tali:</strong> Gunakan tali plastik atau rafia untuk menggantung botol di dinding</li>
              <li><strong>Isi media:</strong> Masukkan kompos atau tanah campur pupuk ke dalam botol</li>
              <li><strong>Tanam bibit:</strong> Tanam bibit sayuran daun (kangkung, bayam, sawi) ke dalam botol</li>
              <li><strong>Siram berkala:</strong> Siram 1-2 kali sehari tergantung cuaca, air akan menetes ke botol di bawahnya</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Bahan & Alat</h4>
            <ul class="text-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Botol plastik bekas (minimal 8-10 botol)</li>
              <li>Tali plastik atau rafia</li>
              <li>Kompos atau tanah + pupuk</li>
              <li>Bibit sayuran daun</li>
              <li>Gunting, paku panas, kayu untuk penyangga</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h4 class="font-semibold text-on-surface mb-2">Manfaat</h4>
            <p class="text-sm text-on-surface-variant">Hemat 80% air, bisa disusun vertical di dinding sempit, hasil panen lebih cepat (30-45 hari), pupuk kompos alami, daur ulang limbah botol plastik.</p>
          </div>
        </div>`
      },
      takakura: {
        title: 'Komposter Ember Takakura Skala Rumah Tangga',
        icon: 'compost',
        difficulty: 'Mudah',
        time: '30 Menit',
        content: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 class="font-semibold text-on-surface mb-2">Deskripsi</h4>
            <p class="text-sm text-on-surface-variant">Metode fermentasi higienis tanpa bau menyengat untuk menyulap sisa sayur dan buah menjadi humus hitam kaya hara dalam 2-3 bulan. Cocok untuk rumah tangga dengan lahan terbatas.</p>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Langkah-Langkah</h4>
            <ol class="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
              <li><strong>Siapkan ember:</strong> Gunakan ember plastik berkapasitas 10-20 liter berlubang di bagian bawah</li>
              <li><strong>Buat bantalan:</strong> Letakkan sekam padi atau dedak di dasar ember (5 cm) sebagai bantalan</li>
              <li><strong>Tambah starter:</strong> Taburkan mikroba starter (EM4, PROMI) atau tanah subur di atas bantalan</li>
              <li><strong>Masukkan sampah:</strong> Masukkan sisa sayur/buah yang sudah dipotong halus (bukan daging/ikan)</li>
              <li><strong>Taburkan sekam:</strong> Tutup sampah dengan lapisan sekam/dedak tipis</li>
              <li><strong>Tutup rapat:</strong> Tutup ember dengan kain atau tas plastik untuk menjaga kelembaban</li>
              <li><strong>Tunggu matang:</strong> Dalam 2-3 bulan kompos siap, berwarna hitam legam dan berbau tanah</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Bahan & Alat</h4>
            <ul class="text-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Ember plastik berkapasitas 10-20L dengan lubang drain</li>
              <li>Sekam padi atau dedak sebagai bantalan</li>
              <li>Starter mikroba (EM4, PROMI, atau tanah subur)</li>
              <li>Sisa sayur/buah dari dapur</li>
              <li>Kain atau tas plastik untuk penutup</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h4 class="font-semibold text-on-surface mb-2">Manfaat</h4>
            <p class="text-sm text-on-surface-variant">Bebas bau meskipun di rumah, hemat limbah dapur, menghasilkan kompos berkualitas tinggi, proses cepat (2-3 bulan), bisa digunakan langsung untuk tanaman hias dan sayuran.</p>
          </div>
        </div>`
      },
      microgreens: {
        title: 'Kebun Microgreens Jendela Dapur Super Nutrisi',
        icon: 'eco',
        difficulty: 'Mudah',
        time: '10 Menit Setup',
        content: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 class="font-semibold text-on-surface mb-2">Deskripsi</h4>
            <p class="text-sm text-on-surface-variant">Budidaya sayuran mini padat nutrisi di kusen jendela hanya dengan media kapas basah dan wadah mika sisa katering. Panen dalam 7-10 hari, cocok untuk balkon atau jendela sempit.</p>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Langkah-Langkah</h4>
            <ol class="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
              <li><strong>Rendam benih:</strong> Rendam benih (brokoli, lobak, selada) dalam air 8 jam sebelum ditanam</li>
              <li><strong>Tebar di media:</strong> Tebar benih di atas kapas basah atau tissue lembab dalam wadah mika</li>
              <li><strong>Tutup gelap:</strong> Tutup dengan kain gelap 3-5 hari untuk merangsang pertumbuhan tunas</li>
              <li><strong>Buka tutup:</strong> Buka tutup saat tunas mulai muncul, letakkan di jendela yang terang</li>
              <li><strong>Semprot berkala:</strong> Semprot dengan air halus 2 kali sehari, jangan biarkan media mengering</li>
              <li><strong>Panen:</strong> Setelah 7-10 hari daun muncul sempurna, potong dengan gunting tepat di atas media</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Bahan & Alat</h4>
            <ul class="text-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Benih microgreens (brokoli, lobak, selada, atau basil)</li>
              <li>Kapas atau tissue lembab</li>
              <li>Wadah mika/plastik transparan bekas katering</li>
              <li>Air dalam botol spray</li>
              <li>Kain gelap atau kardus untuk penutup</li>
              <li>Gunting untuk panen</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h4 class="font-semibold text-on-surface mb-2">Manfaat</h4>
            <p class="text-sm text-on-surface-variant">Panen tercepat (7-10 hari), nutrisi tinggi (5x lebih kaya vitamin), media daur ulang, cocok untuk ruang kecil, hasil melimpah dalam wadah mika kecil.</p>
          </div>
        </div>`
      },
      biopori: {
        title: 'Lubang Biopori Sederhana Pipa PVC Bekas',
        icon: 'water_drop',
        difficulty: 'Sedang',
        time: '2 Jam',
        content: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 class="font-semibold text-on-surface mb-2">Deskripsi</h4>
            <p class="text-sm text-on-surface-variant">Tingkatkan laju serapan air tanah pekarangan sekaligus wadah alami pengurai dedaunan kering menjadi humus penyubur tanah. Mengurangi risiko genangan air dan meningkatkan kesehatan tanah.</p>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Langkah-Langkah</h4>
            <ol class="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
              <li><strong>Bor lubang:</strong> Bor tanah sedalam 100 cm dengan diameter 10 cm di area pekarangan</li>
              <li><strong>Pasang pipa:</strong> Masukkan pipa PVC berlubang (perforasi) ke dalam lubang bor</li>
              <li><strong>Isi mulsa organik:</strong> Isi pipa dengan sampah organik (daun kering, ranting halus, sisa sayur)</li>
              <li><strong>Taburkan starter:</strong> Setiap lapisan sambil isi, taburkan tanah subur atau EM4</li>
              <li><strong>Tutup pipa:</strong> Tutup pipa dengan tutup berlubang atau keramik berpori</li>
              <li><strong>Rawat berkala:</strong> Tambahkan sampah organik setiap minggu, hujan akan menyiram dari atas</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Bahan & Alat</h4>
            <ul class="text-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Pipa PVC bekas berlubang (perforasi) diameter 10 cm, panjang 100 cm</li>
              <li>Bor tanah atau sekop</li>
              <li>Sampah organik (daun, ranting, sisa sayur)</li>
              <li>Tanah subur atau EM4</li>
              <li>Tutup pipa plastik atau keramik berpori</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h4 class="font-semibold text-on-surface mb-2">Manfaat</h4>
            <p class="text-sm text-on-surface-variant">Menyerap air hujan 40x lebih banyak dari tanah biasa, mengurangi genangan dan banjir lokal, mengubah limbah jadi humus, meningkatkan kesuburan tanah jangka panjang.</p>
          </div>
        </div>`
      },
      'irigasi-tetes': {
        title: 'Sistem Irigasi Tetes Otomatis Botol Infus',
        icon: 'opacity',
        difficulty: 'Mudah',
        time: '20 Menit',
        content: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 class="font-semibold text-on-surface mb-2">Deskripsi</h4>
            <p class="text-sm text-on-surface-variant">Jaga kelembapan optimal tanaman pot saat bepergian dengan pengatur debit tetes presisi tanpa pompa listrik. Hemat air hingga 70% dan cocok untuk pabrik DIY yang dipindah-pindah.</p>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Langkah-Langkah</h4>
            <ol class="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
              <li><strong>Siapkan botol:</strong> Gunakan botol bekas 1.5L atau infus medis yang transparan</li>
              <li><strong>Buat lubang kecil:</strong> Buat lubang kecil (jarum) di dekat dasar botol untuk regulasi tetes</li>
              <li><strong>Pasang selang:</strong> Masukkan selang plastik kecil atau jarum infus ke dalam botol</li>
              <li><strong>Atur debit:</strong> Posisikan selang tepat di atas tanah pot, atur kencang-kendor untuk debit tetes</li>
              <li><strong>Isi air:</strong> Isi botol dengan air, air akan tetes perlahan ke pot di bawahnya</li>
              <li><strong>Monitor 1-2 hari:</strong> Sesuaikan debit tetes agar tanah tetap lembab tapi tidak banjir</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Bahan & Alat</h4>
            <ul class="text-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Botol plastik 1.5L atau infus bekas</li>
              <li>Selang plastik kecil atau jarum infus medis</li>
              <li>Jarum atau paku kecil untuk membuat lubang</li>
              <li>Air</li>
              <li>Penyangga atau papan untuk menyeimbangkan botol</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h4 class="font-semibold text-on-surface mb-2">Manfaat</h4>
            <p class="text-sm text-on-surface-variant">Hemat 70% air, kelembapan stabil, cocok saat bepergian (sistem hidup 7-10 hari), tanpa listrik, daur ulang botol plastik, debit bisa diatur sesuai kebutuhan.</p>
          </div>
        </div>`
      },
      'stek-bonsai': {
        title: 'Bonsai Tanaman Lokal & Stek Batang Gratis',
        icon: 'spa',
        difficulty: 'Mudah',
        time: '15 Menit Setup',
        content: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 class="font-semibold text-on-surface mb-2">Deskripsi</h4>
            <p class="text-sm text-on-surface-variant">Perbanyak tanaman hias pemurni udara kamar tidur dengan teknik potong nodus batang tanpa mengeluarkan biaya sepeser pun. Cocok untuk sirih gading, sansevieria, dan tanaman lokal lainnya.</p>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Langkah-Langkah</h4>
            <ol class="text-sm text-on-surface-variant space-y-2 list-decimal list-inside">
              <li><strong>Pilih batang sehat:</strong> Ambil batang dari tanaman induk yang sehat dan tidak sedang berbuah</li>
              <li><strong>Potong di bawah nodus:</strong> Potong tepat di bawah buku/nodus batang dengan pisau bersih (panjang 5-10 cm)</li>
              <li><strong>Buang daun bawah:</strong> Buang daun di bagian bawah stek, sisakan 2-3 daun di atas</li>
              <li><strong>Rendam di air:</strong> Rendam stek dalam gelas air bersih, letakkan di tempat terang tidak kena sinar matahari langsung</li>
              <li><strong>Tunggu akar tumbuh:</strong> Dalam 7-14 hari akar akan tumbuh dari nodus yang tercelup air</li>
              <li><strong>Pindah ke tanah:</strong> Setelah akar tumbuh 1-2 cm, pindahkan ke pot dengan tanah subur dan rawat seperti tanaman normal</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-surface-container-low">
            <h4 class="font-semibold text-on-surface mb-2">Bahan & Alat</h4>
            <ul class="text-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Batang tanaman sehat (sirih gading, sansevieria, atau tanaman hias lokal)</li>
              <li>Pisau atau gunting bersih</li>
              <li>Gelas atau botol air bening</li>
              <li>Air bersih</li>
              <li>Pot dan tanah subur (untuk setelah akar tumbuh)</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h4 class="font-semibold text-on-surface mb-2">Manfaat</h4>
            <p class="text-sm text-on-surface-variant">Gratis, tanpa biaya bibit, tanaman hias penuh koleksi pribadi, proses cepat (7-14 hari akar tumbuh), hasil berkualitas sama dengan induk, hemat ruang di rumah.</p>
          </div>
        </div>`
      }
    };
    function openDIYGuide(type) {
      const guide = diyGuides[type];
      if (!guide) return;
      document.getElementById('diyTitle').textContent = guide.title;
      document.getElementById('diyIcon').textContent = guide.icon;
      document.getElementById('diyDifficulty').textContent = guide.difficulty;
      document.getElementById('diyTime').textContent = guide.time;
      document.getElementById('diyContent').innerHTML = guide.content;
      document.getElementById('modalDIYGuide').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('modalDIYGuide').classList.remove('opacity-0');
        document.getElementById('modalDIYGuide').querySelector('div').classList.remove('scale-95');
      }, 10);
    }
    function closeDIYGuide() {
      const modal = document.getElementById('modalDIYGuide');
      modal.classList.add('opacity-0');
      modal.querySelector('div').classList.add('scale-95');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    }
    function claimDIYPoints() {
      showToast('Poin Berhasil Diklaim!', '+150 Daun Emas ditambahkan ke akun Anda.', 'verified');
      addPoints(150, 'Menyelesaikan tutorial DIY');
      closeDIYGuide();
    }
    document.addEventListener('DOMContentLoaded', () => {
      updateQuickWeather('Jakarta');
      updateQuickCarbon();
    });

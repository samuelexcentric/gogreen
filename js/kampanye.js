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

  let ecoMap = null;
  let ecoMarkers = [];

  const ecoMarkerData = [
    {
      region: 'jakarta',
      lat: -6.1157,
      lng: 106.8451,
      icon: 'park',
      color: '#005d42',
      title: 'Muara Gembong (85%)',
      aksi: 'Gerakan Tanam 1.000 Mangrove Pesisir Muara Gembong',
      tanggal: 'Sabtu, 26 September 2026'
    },
    {
      region: 'jakarta',
      lat: -6.2607,
      lng: 106.8136,
      icon: 'water_drop',
      color: '#006c49',
      title: 'Bantaran Ciliwung',
      aksi: 'Aksi Bersih Sungai & Urban Farming Bantaran Ciliwung',
      tanggal: 'Minggu, 4 Oktober 2026'
    },
    {
      region: 'bandung',
      lat: -6.9175,
      lng: 107.6191,
      icon: 'compost',
      color: '#375a00',
      title: 'Biopori Sukamaju',
      aksi: 'Workshop Pembuatan Kompos & Biopori Kelurahan Sukamaju',
      tanggal: 'Sabtu, 10 Oktober 2026'
    },
    {
      region: 'yogyakarta',
      lat: -7.7956,
      lng: 110.3695,
      icon: 'park',
      color: '#005d42',
      title: 'Langstrokiate Ngabelen',
      aksi: 'Penanaman Pohon Kalemyar di Kebun Langstrokiate Ngabelen',
      tanggal: 'Minggu, 18 Oktober 2026'
    },
    {
      region: 'surabaya',
      lat: -7.2575,
      lng: 112.7521,
      icon: 'water_drop',
      color: '#006c49',
      title: 'Koridor Timur Surabaya',
      aksi: 'Aksi Tanam Pohon Koridor Timur & Bersih Saluran Air',
      tanggal: 'Sabtu, 25 Oktober 2026'
    },
    {
      region: 'denpasar',
      lat: -8.6705,
      lng: 115.2126,
      icon: 'forest',
      color: '#375a00',
      title: 'Taman SariASET konservasi',
      aksi: 'Rehabilitasi Taman Kota & Konservasi Mangrove Denpasar',
      tanggal: 'Minggu, 8 November 2026'
    },
    {
      region: 'jakarta',
      lat: -6.2088,
      lng: 106.8456,
      icon: 'forest',
      color: '#005d42',
      title: 'Tamanminutesbike preservation',
      aksi: 'Pelestarian Tamanminutesbike Sawah Besar & Bird Sanctuary',
      tanggal: 'Sabtu, 7 November 2026'
    }
  ];

  const ecoRegionView = {
    all: { center: [-2.5, 118], zoom: 5 },
    jakarta: { center: [-6.2088, 106.8456], zoom: 11 },
    bandung: { center: [-6.9175, 107.6191], zoom: 12 },
    yogyakarta: { center: [-7.7956, 110.3695], zoom: 11 },
    surabaya: { center: [-7.2575, 112.7521], zoom: 11 },
    denpasar: { center: [-8.6705, 115.2126], zoom: 11 }
  };

  function ecoMarkerIcon(data) {
    return L.divIcon({
      className: 'custom-eco-marker',
      html: `<div style="width:28px;height:28px;border-radius:50%;background:${data.color};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff;">
        <span class="material-symbols-outlined" style="font-size:16px;color:#fff;">${data.icon}</span>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });
  }

  function initEcoMap() {
    const el = document.getElementById('map');
    if (!el || typeof L === 'undefined') return;

    ecoMap = L.map('map', { zoomControl: true, attributionControl: true })
      .setView(ecoRegionView.all.center, ecoRegionView.all.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18
    }).addTo(ecoMap);

    ecoMarkerData.forEach(function (m) {
      const marker = L.marker([m.lat, m.lng], { icon: ecoMarkerIcon(m) });
      marker.bindPopup(
        `<div style="min-width:180px;">
          <strong style="display:block;font-size:13px;margin-bottom:4px;">${m.title}</strong>
          <p style="margin:0 0 6px;font-size:12px;line-height:1.4;">${m.aksi}</p>
          <p style="margin:0 0 8px;font-size:11px;opacity:0.75;">${m.tanggal}</p>
          <button onclick="openVolunteerModal('${m.aksi.replace(/'/g, "\'")}', '${m.tanggal}')" style="width:100%;padding:6px 10px;border:none;border-radius:6px;background:#005d42;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Daftar Sekarang</button>
        </div>`,
        { closeButton: true }
      );
      marker._ecoRegion = m.region;
      marker.addTo(ecoMap);
      ecoMarkers.push(marker);
    });

    ecoApplyRegion('all');
  }

  function ecoApplyRegion(region) {
    if (!ecoMap) return;
    const view = ecoRegionView[region] || ecoRegionView.all;

    ecoMap.flyTo(view.center, view.zoom, { duration: 0.8 });

    ecoMarkers.forEach(function (marker) {
      if (region === 'all') {
        marker.addTo(ecoMap);
      } else if (marker._ecoRegion === region) {
        marker.addTo(ecoMap);
      } else {
        ecoMap.removeLayer(marker);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initEcoMap();

    const regionSelect = document.getElementById('filter-region');
    if (regionSelect) {
      regionSelect.addEventListener('change', function () {
        ecoApplyRegion(this.value);
      });
    }
  });

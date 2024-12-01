const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas agar mencakup seluruh layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update ukuran canvas saat layar diubah
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Properti bintang
const stars = [];
const starCount = 150;

// Fungsi untuk membuat bintang baru
function createStar() {
  return {
    x: Math.random() * canvas.width, // Posisi awal acak (x)
    y: Math.random() * canvas.height, // Posisi awal acak (y)
    size: Math.random() * 2 + 1, // Ukuran bintang (1-3 piksel)
    opacity: Math.random(), // Transparansi awal
    fadeSpeed: Math.random() * 0.02 + 0.005, // Kecepatan pudar
    isFading: Math.random() > 0.5, // Status memudar atau menyala
  };
}

// Tambahkan bintang ke array
for (let i = 0; i < starCount; i++) {
  stars.push(createStar());
}

// Fungsi menggambar bintang
function drawStar(star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); // Bentuk lingkaran
  ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // Warna putih dengan transparansi
  ctx.fill();
}

// Fungsi memperbarui status bintang
function updateStar(star) {
  if (star.isFading) {
    star.opacity -= star.fadeSpeed; // Memudar
    if (star.opacity <= 0) {
      star.isFading = false; // Berubah jadi menyala
    }
  } else {
    star.opacity += star.fadeSpeed; // Menyala
    if (star.opacity >= 1) {
      star.isFading = true; // Berubah jadi memudar
    }
  }
}

// Fungsi animasi
function animate() {
  // Bersihkan canvas dengan latar transparan
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    drawStar(star); // Gambar bintang
    updateStar(star); // Perbarui status bintang
  });

  requestAnimationFrame(animate); // Jalankan animasi terus-menerus
}

// Jalankan animasi
animate();

// JavaScript untuk menampilkan dan menyembunyikan pop-up
document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.social-icon');

  icons.forEach(icon => {
      const popupText = icon.getAttribute('data-popup');
      const popup = document.createElement('div');
      popup.className = 'popup';
      popup.textContent = popupText;

      icon.appendChild(popup);

      icon.addEventListener('mouseover', () => {
          popup.style.display = 'block';
          popup.style.top = `${icon.offsetHeight + 5}px`;
          popup.style.left = '0';
      });

      icon.addEventListener('mouseout', () => {
          popup.style.display = 'none';
      });
  });
});


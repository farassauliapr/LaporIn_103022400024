// Array object berisi data dummy laporan
const dataLaporan = [
    {
        id: 1,
        foto: 'images/pengaduan ac.jpg',
        lokasi: 'Ruang Kelas A - Gedung F',
        status: 'Diproses', //
        link: 'detail1.html'
    },
    {
        id: 2,
        foto: 'images/pengaduan proyektor.jpg',
        lokasi: 'Laboratorium Komputer 2',
        status: 'Telah Selesai',
        link: 'detail2.html'
    },
];

// Fungsi merender tabel dan menghitung total statistik
function renderDashboard() {
    const tbody = document.getElementById('tabel-laporan');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    let totalProses = 0;
    let totalSelesai = 0;

    // Iterasi data laporan untuk hitung statistik dan buat baris tabel
    dataLaporan.forEach((laporan, index) => {
        if (laporan.status === 'Sedang Diperbaiki' || laporan.status === 'Dilaporkan') {
            totalProses++;
        } else if (laporan.status === 'Telah Selesai') {
            totalSelesai++;
        }

        // Penentuan warna badge berdasarkan status
        let badgeColor = '';
        if (laporan.status === 'Diproses') {
            badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        } else if (laporan.status === 'Telah Selesai') {
            badgeColor = 'bg-green-100 text-green-800 border-green-200';
        }

        // Template baris tabel
        const rowHTML = `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">${index + 1}</td>
                <td class="px-6 py-4">
                    <img src="${laporan.foto}" alt="Foto Bukti" class="w-20 h-14 object-cover rounded shadow-sm">
                </td>
                <td class="px-6 py-4 font-medium text-slate-900">${laporan.lokasi}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${badgeColor}">
                        ${laporan.status}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <a href="${laporan.link}" class="text-telkom-500 hover:text-telkom-700 font-semibold transition-colors">Lihat Detail &rarr;</a>
                </td>
            </tr>
        `;
        tbody.innerHTML += rowHTML;
    });

    // Update elemen counter statistik
    document.getElementById('total-laporan').innerText = dataLaporan.length;
    document.getElementById('total-proses').innerText = totalProses;
    document.getElementById('total-selesai').innerText = totalSelesai;
}

// Inisialisasi event listener jQuery setelah DOM siap
$(document).ready(function() {
    renderDashboard();

    // Toggle sembunyikan/tampilkan kartu ringkasan dengan efek slide
    $('#btn-toggle-ringkasan').on('click', function() {
        $('#summary-cards').slideToggle(400, function() {
            if ($('#summary-cards').is(':visible')) {
                $('#btn-toggle-ringkasan').text('Sembunyikan Ringkasan');
            } else {
                $('#btn-toggle-ringkasan').text('Tampilkan Ringkasan');
            }
        });
    });

    // Validasi input dan penanganan submit form
    $('#form-laporan').on('submit', function(e) {
        e.preventDefault();

        const nama = $('#nama_pelapor').val().trim();
        const lokasi = $('#lokasi').val().trim();
        const deskripsi = $('#deskripsi').val().trim();

        // Pengecekan field kosong
        if (nama === '' || lokasi === '' || deskripsi === '') {
            $('#notif-pesan')
                .removeClass('bg-green-100 text-green-700 border-green-200')
                .addClass('bg-red-100 text-red-700 border border-red-200')
                .text('Gagal! Harap lengkapi semua bidang isian.')
                .hide().fadeIn(300).delay(5000).fadeOut(500);;
        } else {
            $('#notif-pesan')
                .removeClass('bg-red-100 text-red-700 border-red-200')
                .addClass('bg-green-100 text-green-700 border border-green-200')
                .text('Berhasil! Laporan Anda telah terkirim.')
                .hide().fadeIn(300).delay(5000).fadeOut(500);;
            
            $('#form-laporan')[0].reset();
        }
        $('html, body').animate({
            scrollTop: $('#notif-pesan').offset().top - 100
        }, 500);
    });
});
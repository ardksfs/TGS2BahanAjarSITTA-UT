const { createApp } = Vue;


createApp({
    data() {
        return {
            upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
            kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
            stok: [
                { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024, cetak ulang</em>" },
                { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
                { kode: "BIOL4201", judul: "Biologi Umum (Praktikum)", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh <u>pendingin</u> untuk kit basah" },
                { kode: "FISIP4001", judul: "Dasar-Dasar Sosiologi", kategori: "MK Pilihan", upbjj: "Makassar", lokasiRak: "R2-C1", harga: 55000, qty: 2, safety: 8, catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder" }
            ],
            filters: { upbjj: '', kategori: '', critical: false },
            sortBy: 'judul',
            editIdx: null,
            form: { judul: '', upbjj: 'Jakarta', qty: 0, safety: 0, kategori: 'MK Wajib' }
        }
    },
    computed: {
        filteredStok() {
            let res = [...this.stok];
            if (this.filters.upbjj) res = res.filter(i => i.upbjj === this.filters.upbjj);
            if (this.filters.upbjj && this.filters.kategori) res = res.filter(i => i.kategori === this.filters.kategori);
            if (this.filters.critical) res = res.filter(i => i.qty < i.safety || i.qty === 0);

            res.sort((a, b) => {
                if (this.sortBy === 'judul') return a.judul.localeCompare(b.judul);
                return a[this.sortBy] - b[this.sortBy];
            });
            return res;
        }
    },
    methods: {
        getStatusText(i) {
            if (i.qty === 0) return 'Kosong';
            return i.qty < i.safety ? 'Menipis' : 'Aman';
        },
        getStatusClass(i) {
            if (i.qty === 0) return 'bg-kosong';
            return i.qty < i.safety ? 'bg-menipis' : 'bg-aman';
        },
        getStatusIcon(i) {
            if (i.qty === 0) return 'bx bx-error';
            return i.qty < i.safety ? 'bx bx-info-circle' : 'bx bx-check-shield';
        },
        tambahStok() {

            if (!this.form.judul || this.form.qty < 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Data Belum Lengkap',
                    text: 'Silakan isi semua field',
                    confirmButtonColor: '#ffcc00'
                });
                return;
            }

            this.stok.unshift({

                kode: this.form.kode,

                judul: this.form.judul,

                kategori: this.form.kategori,

                upbjj: this.form.upbjj,

                lokasiRak: this.form.lokasiRak,

                harga: 50000,

                qty: this.form.qty,

                safety: this.form.safety,

                catatanHTML: 'Stok baru ditambahkan'

            });

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Stok berhasil ditambahkan',
                confirmButtonColor: '#003b8e'
            });

            this.form = {

                kode: '',
                judul: '',
                upbjj: 'Jakarta',
                lokasiRak: '',
                qty: 0,
                safety: 0,
                kategori: 'MK Wajib'

            };
        },
        resetFilter() { this.filters = { upbjj: '', kategori: '', critical: false }; }
    }
}).mount('#app');

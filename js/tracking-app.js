const { createApp } = Vue;

createApp({
    data() {
        return {

            pengirimanList: [
                { kode: "REG", nama: "JNE Reguler (3-5 hari)" },
                { kode: "EXP", nama: "JNE Express (1-2 hari)" },
                { kode: "SMD", nama: "Same Day Delivery" }
            ],

            paket: [
                {
                    kode: "PAKET-UT-001",
                    nama: "PAKET IPS Dasar",
                    isi: ["EKMA4116", "EKMA4115"],
                    harga: 120000
                },
                {
                    kode: "PAKET-UT-002",
                    nama: "PAKET IPA Dasar",
                    isi: ["BIOL4201", "FISIP4001"],
                    harga: 140000
                }
            ],

            trackingList: {

                "DO2025-001": {
                    nim: "123456789",
                    nama: "Rina Wulandari",
                    status: "Dalam Perjalanan",
                    ekspedisi: "Reguler (3-5 hari)",
                    tanggalKirim: "2025-08-25",
                    total: 120000,

                    perjalanan: [
                        {
                            waktu: "2025-08-25 10:12:20",
                            keterangan: "Penerimaan di Loket: TANGSEL"
                        },
                        {
                            waktu: "2025-08-26 08:44:01",
                            keterangan: "Diteruskan ke Kantor Tujuan"
                        }
                    ]
                }

            },

            form: {
                nim: '',
                nama: '',
                ekspedisi: 'Reguler (3-5 hari)',
                paketKode: '',
                tanggal: new Date().toISOString().slice(0, 10)
            }

        }
    },

    computed: {

        nextDONumber() {
            const count = Object.keys(this.trackingList).length + 1;
            return `DO2025-${String(count).padStart(3, '0')}`;
        },

        selectedPaket() {
            return this.paket.find(
                p => p.kode === this.form.paketKode
            );
        }

    },

    methods: {

        submitDO() {

            if (!this.selectedPaket) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Pilih Paket',
                    text: 'Silakan pilih paket bahan ajar',
                    confirmButtonColor: '#ffcc00'
                });
                return;
            }

            const newNo = this.nextDONumber;

            this.trackingList[newNo] = {

                nim: this.form.nim,
                nama: this.form.nama,
                status: "Dalam Proses",
                ekspedisi: this.form.ekspedisi,
                tanggalKirim: this.form.tanggal,
                total: this.selectedPaket.harga,

                perjalanan: [
                    {
                        waktu: new Date().toLocaleString('id-ID'),
                        keterangan: "Pesanan berhasil dibuat"
                    }
                ]
            };

            Swal.fire({
                icon: 'success',
                title: 'Delivery Order Berhasil',
                html: `
        <b>${newNo}</b><br>
        Pengiriman berhasil dibuat
    `,
                confirmButtonColor: '#003b8e'
            });

            this.form = {
                nim: '',
                nama: '',
                ekspedisi: 'Reguler (3-5 hari)',
                paketKode: '',
                tanggal: new Date().toISOString().slice(0, 10)
            };

        }

    }

}).mount('#app');
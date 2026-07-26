import { useState, useEffect, useRef } from "react";
import {
  Sprout, Truck, Tag, Headphones, Search, Phone, Mail, Clock, MapPin,
  ChevronUp, MessageCircle, X, Menu, Star, TreePine, Award, Package,
  Wallet, BadgeCheck, Wrench, Citrus,
} from "lucide-react";

const WA = "628997993909".slice(0, 13) === "628997993909" ? "628997993909" : "628997993909";
const WA_NUMBER = "628997993909".replace("628997993909", "628997993909");
// nomor WhatsApp resmi
const PHONE = "628997993909";

const waLink = (pesan) => `https://wa.me/${PHONE}?text=${encodeURIComponent(pesan)}`;

const produkAwal = [
  { id: 1, nama: "Durian", kategori: "buah", ket: "Varietas: Musang King, Bawor, Super Tembaga, Monthong, dll.", harga: "Harga mulai dari Rp. XX.000", badge: "Terlaris" },
  { id: 2, nama: "Mangga", kategori: "buah", ket: "Varietas: Harum Manis, Gedong Gincu, Manalagi, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 3, nama: "Alpukat", kategori: "buah", ket: "Varietas: Aligator, Miki, Wina, Kendil, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 4, nama: "Jeruk", kategori: "buah", ket: "Varietas: Keprok, Nipis, Purut, Lemon, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 5, nama: "Jambu Biji", kategori: "buah", ket: "Varietas: Kristal, Merah Getas, Sukun, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 5, nama: "Jambu Air", kategori: "buah", ket: "Varietas: Citra, Dalhari, Madu Deli, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 6, nama: "Nangka", kategori: "buah", ket: "Varietas: Nangka Mini, Nangka Merah, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 7, nama: "Kelengkeng", kategori: "buah", ket: "Varietas: Itoh, Diamond River, Pingpong, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 8, nama: "Anggur", kategori: "buah", ket: "Varietas: Ninel, Jupiter, Transfiguration, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 9, nama: "Petai", kategori: "buah", ket: "Varietas: Petai Lokal, Petai Malaysia, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 10, nama: "Manggis", kategori: "buah", ket: "Varietas: Manggis Lokal Unggul, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 11, nama: "Sawo", kategori: "buah", ket: "Varietas: Sawo Manila, Sawo Kecik, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 12, nama: "Jengkol", kategori: "buah", ket: "Varietas: Jengkol Lokal Unggul, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 13, nama: "Duku", kategori: "buah", ket: "Varietas: Duku Palembang, Duku Condet, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 14, nama: "Apel", kategori: "buah", ket: "Varietas: Anna, Manalagi, Rome Beauty, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 15, nama: "Sirsak", kategori: "buah", ket: "Varietas: Sirsak Ratu, Sirsak Bangkok, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 16, nama: "Belimbing", kategori: "buah", ket: "Varietas: Dewi, Demak, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 17, nama: "Mahoni", kategori: "penghijauan", ket: "Bibit pohon pelindung berkualitas.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 18, nama: "Trembesi", kategori: "penghijauan", ket: "Cocok untuk proyek penghijauan.", harga: "Harga mulai dari Rp. XX.000", badge: "Baru" },
  { id: 19, nama: "Jati", kategori: "perkebunan", ket: "Investasi jangka panjang.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 20, nama: "Ketapang Kencana", kategori: "penghijauan", ket: "Cocok untuk peneduh dan penghijauan jalan.", harga: "Harga mulai dari Rp. XX.000" },
];

const filterList = [
  { key: "all", label: "Semua" },
  { key: "buah", label: "Bibit Buah" },
  { key: "perkebunan", label: "Perkebunan" },
  { key: "penghijauan", label: "Penghijauan" },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const num = parseInt(String(target).replace(/\D/g, "")) || 0;
            const speed = Math.max(1, Math.ceil(num / 60));
            let c = 0;
            const tick = () => {
              c += speed;
              if (c >= num) {
                setCount(num);
              } else {
                setCount(c);
                requestAnimationFrame(tick);
              }
            };
            tick();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  const suffix = String(target).replace(/[0-9]/g, "");

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-md p-7 text-center hover:-translate-y-1 transition">
      <h3 className="text-4xl font-bold text-slate-900 mb-1">{count}{suffix}</h3>
      <span className="text-slate-500 text-sm">{label}</span>
    </div>
  );
}

function IconStat({ icon: Icon, label }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-7 text-center hover:-translate-y-1 transition flex flex-col items-center justify-center">
      <Icon className="w-9 h-9 text-lime-600 mb-3" />
      <span className="text-slate-600 text-sm font-medium">{label}</span>
    </div>
  );
}

export default function PerseaAgroTani() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [lightboxImg, setLightboxImg] = useState(null);

  const produk = produkAwal.filter((p) => {
    const matchFilter = filter === "all" || p.kategori === filter;
    const matchQuery =
      p.nama.toLowerCase().includes(query.toLowerCase()) ||
      p.ket.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="font-sans text-slate-800 bg-white scroll-smooth">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors ${
          scrollY > 80 ? "bg-slate-900 shadow-lg" : "bg-slate-900/80 backdrop-blur"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="data:image/png;base64,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"
              alt="Logo Persea Agro Tani"
              className="w-11 h-11 rounded-full object-cover"
            />
            <span className="text-white text-xl font-semibold tracking-wide">Persea Agro Tani</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
            {[
              ["#home", "Home"],
              ["#about", "Tentang Kami"],
              ["#produk", "Katalog Produk"],
              ["#galeri", "Galeri"],
              ["#kontak", "Kontak Kami"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="relative hover:text-yellow-400 transition">
                {label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-white flex items-center gap-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-slate-900 px-6 py-5 flex flex-col items-center gap-4 text-white font-medium text-center">
            {[
              ["#home", "Home"],
              ["#about", "Tentang Kami"],
              ["#produk", "Katalog Produk"],
              ["#galeri", "Galeri"],
              ["#kontak", "Kontak Kami"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,.92), rgba(15,23,42,.75)), radial-gradient(circle at 30% 20%, #14532d55, transparent 60%)",
        }}
      >
        <div className="max-w-3xl px-6 py-32">
          <span className="inline-block bg-orange-500/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            JUAL BIBIT TANAMAN BUAH OKULASI BERKUALITAS
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Persea Agro Tani</h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10">
            Penangkar dan penyedia bibit tanaman buah okulasi &amp; kayu berkualitas dengan varietas unggul, bersertifikat
            dan label, siap tanam dan siap dikirim ke seluruh Indonesia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#produk" className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-semibold px-8 py-4 rounded-full transition">
              Katalog Produk
            </a>
            <a href="#about" className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-semibold px-8 py-4 rounded-full transition">
              Tentang Kami
            </a>
            <a href="#kontak" className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-semibold px-8 py-4 rounded-full transition">
              Kontak
            </a>
            <a
              href={waLink("Halo, saya ingin bertanya tentang bibit tanaman.")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Tentang Persea Agro Tani</h2>
            <p className="text-slate-500">Penyedia bibit tanaman buah okulasi dan pohon pelindung, dipercaya lebih dari 10 tahun.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-lime-50 aspect-video flex items-center justify-center shadow-md">
              <TreePine className="w-20 h-20 text-slate-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Berpengalaman &amp; Terpercaya</h3>
              <p className="text-slate-600 mb-4">
                Persea Agro Tani telah menekuni bidang penangkaran dan penjualan bibit tanaman selama lebih dari 10 tahun,
                melayani pembeli dari berbagai kalangan di seluruh Indonesia.
              </p>
              <p className="text-slate-600 mb-4">
                Kami menyediakan bibit tanaman buah-buahan dan bibit kayu unggul — sehat, siap tanam, dan dikirim
                dengan kemasan khusus agar tetap terjaga kualitasnya selama perjalanan.
              </p>
              <p className="text-slate-600">
                Melayani kebutuhan untuk hobi, koleksi halaman rumah atau taman, investasi perkebunan, usaha perkebunan, hingga
                proyek penghijauan / reboisasi dan kelompok tani.
                </p>
                <p> Kami melayani pembelian retail maupun partai besar dengan harga yang di sesuaikan dengan kebutuhan.
                  </p>
                  <p>namun harga bibit tanaman  kami tetap murah dan bersahabat namun tidak mengurangi kualitas tanaman .
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <Counter target="10+" label="Tahun Pengalaman" />
            <Counter target="100%" label="Bibit Berkualitas" />
            <IconStat icon={Truck} label="Pengiriman Aman" />
            <IconStat icon={Clock} label="Perawatan Berkala" />
            <IconStat icon={Wallet} label="Harga Terjangkau" />
            <IconStat icon={Tag} label="Bibit Berlabel" />
            <IconStat icon={BadgeCheck} label="Varietas Asli" />
            <IconStat icon={Wrench} label="Jasa Penanaman dan Perawatan" />
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-slate-500">Persea Agro Tani mengutamakan kualitas bibit dan kepuasan pelanggan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              [Sprout, "Bibit Berkualitas", "Sehat, siap tanam, berasal dari indukan unggul."],
              [Truck, "Pengiriman Aman", "Packing khusus ke seluruh Indonesia."],
              [Tag, "Harga Terbaik", "Bersaing untuk retail maupun partai besar."],
              [Headphones, "Konsultasi Gratis", "Bantu pilih bibit sesuai kebutuhan Anda."],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-1 transition">
                <Icon className="w-10 h-10 text-lime-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section id="produk" className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Katalog Produk</h2>
            <p className="text-slate-500">Bibit tanaman buah unggulan, tanaman keras, dan tanaman penghijauan berkualitas.</p>
          </div>

          <div className="max-w-md mx-auto relative mb-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full border-2 border-slate-200 focus:border-lime-500 rounded-full px-6 py-3.5 pr-12 outline-none text-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterList.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                  filter === f.key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {produk.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1.5 transition">
                <div className="h-56 bg-gradient-to-br from-slate-100 to-lime-50 flex items-center justify-center">
                  {p.kategori === "buah" ? (
                    <Sprout className="w-14 h-14 text-lime-600" />
                  ) : (
                    <TreePine className="w-14 h-14 text-slate-500" />
                  )}
                </div>
                <div className="p-6 relative">
                  {p.badge && (
                    <span
                      className={`absolute -top-4 right-5 text-xs font-bold text-white px-3 py-1 rounded-full ${
                        p.badge === "Baru" ? "bg-lime-600" : "bg-orange-500"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-semibold text-slate-900 mb-1.5">{p.nama}</h3>
                  <p className="text-sm text-slate-500 mb-4">{p.ket}</p>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{p.harga}</h4>
                  <a
                    href={waLink(`Halo, saya ingin memesan ${p.nama}.`)}
                    className="block text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            ))}
            {produk.length === 0 && (
              <p className="col-span-full text-center text-slate-400 py-10">Produk tidak ditemukan.</p>
            )}
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Layanan Kami</h2>
            <p className="text-slate-500">Melayani kebutuhan bibit tanaman untuk perorangan, instansi, hingga proyek skala besar.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              [Sprout, "Penjualan Eceran", "Melayani pembelian bibit satuan dengan kualitas terbaik."],
              [Package, "Penjualan Grosir", "Harga khusus untuk pembelian dalam jumlah besar."],
              [Truck, "Pengiriman Nasional", "Pengiriman ke seluruh Indonesia dengan packing aman."],
              [TreePine, "Proyek Penghijauan", "Melayani proyek pemerintah, perusahaan, dan swasta."],
              [Wrench, "Jasa Penanaman dan Perawatan", "Penanaman untuk komplek perumahan, taman, halaman, perkebunan dan peneduh jalan."],
              [Headphones, "Konsultasi Gratis", "Konsultasi pemilihan bibit sesuai kebutuhan Anda."],
              [Award, "Kualitas Terjamin", "Bibit sehat, unggul, dan siap tanam."],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-1 transition">
                <Icon className="w-10 h-10 text-slate-800 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section id="galeri" className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Galeri Persea Agro Tani</h2>
            <p className="text-slate-500">Dokumentasi bibit unggulan dan kegiatan di lokasi penangkaran.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* GANTI: setiap kotak ini nanti diisi foto asli bibit/lokasi kamu */}
            {Array.from({ length: 4 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setLightboxImg(i)}
                className="h-56 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 shadow-sm hover:border-lime-400 transition flex items-center justify-center"
              >
                <Citrus className="w-12 h-12 text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxImg !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-8"
          onClick={() => setLightboxImg(null)}
        >
          <button className="absolute top-8 right-8 text-white text-4xl" onClick={() => setLightboxImg(null)}>
            &times;
          </button>
          <div className="bg-slate-800 rounded-2xl w-full max-w-2xl aspect-video flex items-center justify-center">
            <Sprout className="w-20 h-20 text-slate-500" />
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 px-6 text-center text-white" style={{ background: "linear-gradient(135deg,#0f172a,#166534)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-5">Butuh Bibit Berkualitas?</h2>
          <p className="text-slate-200 mb-8">
            Hubungi Persea Agro Tani sekarang juga dan dapatkan bibit terbaik dengan harga bersaing.
          </p>
          <a
            href={waLink("Halo, saya butuh bibit tanaman berkualitas.")}
            className="inline-block bg-orange-500 hover:bg-orange-600 font-semibold px-8 py-4 rounded-full transition"
          >
            Hubungi WhatsApp
          </a>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Testimoni Pelanggan</h2>
            <p className="text-slate-500">Kepuasan pelanggan adalah prioritas utama Persea Agro Tani.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Bibit sampai dengan baik, pengemasan baik. Pengiriman via udara lebih cepat dan efisien waktu.", "Bonar", "Manokwari, Papua"],
              ["Terima kasih, bibit sudah sampai. Bibit sebanyak ini muat dalam 1 truk tronton dan sampai dalam kondisi baik. Untuk pengiriman selanjutnya menunggu penanaman selesai.", "Yohanes", "Bengkayang, Kalimantan"],
              ["Terima kasih, bibitnya bagus, alhamdulillah. Nanti saya pesan lagi untuk sebagian kebun saya.", "H. Yopi", "Garut, Jawa Barat"],
              ["Terima kasih, bibit sudah sampai dan sesuai pesanan. Terima kasih juga bonus tanaman buahnya. Semoga bisa berjumpa lagi di pengiriman selanjutnya.", "Drs. H. Nana", "Lembang, Bandung, Jawa Barat"],
              ["Terima kasih, bibit sudah diantar sampai kebun. Maaf tidak sempat bertemu, tapi bibit pesanan sudah sesuai dan baik. Terima kasih bonus bibitnya untuk percobaan di lahan baru saya.", "H. Hadi", "Cicalengka, Bandung, Jawa Barat"],
            ].map(([text, name, city]) => (
              <div key={name} className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-1 transition">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-5 italic">&ldquo;{text}&rdquo;</p>
                <h4 className="font-semibold text-slate-900">{name}</h4>
                <span className="text-sm text-slate-400">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900">Pertanyaan Yang Sering Ditanyakan</h2>
          </div>
          {[
            ["Apakah melayani pengiriman ke luar Jawa?", "Ya, kami melayani pengiriman ke seluruh wilayah Indonesia, seperti Papua, Sulawesi, Kalimantan, Sumatera, Bali, Lombok, dan lainnya."],
            ["Apakah stok selalu tersedia?", "Stok bisa berubah sewaktu-waktu tergantung musim dan permintaan. Silakan konfirmasi ketersediaan lewat WhatsApp sebelum memesan."],
            ["Apakah varietas memiliki label dan sertifikat?", "Bibit yang kami sediakan berlabel sesuai varietasnya. Untuk kebutuhan sertifikat resmi, silakan tanyakan langsung ke kami sesuai jenis bibit yang diinginkan."],
            ["Ada bibit ukuran berapa saja?", "Tersedia beberapa pilihan ukuran bibit. Silakan tanyakan jenis dan ukuran yang tersedia untuk memastikan keakuratan dan spesifikasi kebutuhan chat via WhatsApp."],
            ["Apakah bibit siap tanam?", "Ya, seluruh bibit Persea Agro Tani sudah siap tanam."],
            ["Apakah bisa sekalian jasa tanam?", "Bisa. Kami menyediakan jasa penanaman selain penjualan bibit."],
            ["Apakah ada jasa perawatan dan penanaman?", "Ya, kami menyediakan jasa penanaman maupun perawatan berkala."],
            ["Apakah melayani pembelian untuk kegiatan proyek?", "Ya, kami melayani pembelian dalam jumlah besar untuk proyek perkebunan maupun penghijauan."],
            ["Bagaimana cara pemesanan?", "Silakan hubungi WhatsApp kami melalui tombol yang tersedia di halaman ini."],
            ["Apakah ada bibit dongkelan?", "Ya, tersedia bibit dongkelan (cabutan langsung dari tanah) yang telah melalui masa karantina dan sudah sehat siap kirim, selain bibit dalam polybag dan planterbag."],
          ].map(([q, a]) => (
            <details key={q} className="bg-slate-50 rounded-2xl shadow-sm p-5 mb-4">
              <summary className="font-semibold text-slate-900 cursor-pointer">{q}</summary>
              <p className="text-slate-600 mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Kontak &amp; Lokasi</h2>
            <p className="text-slate-500">Kami siap membantu kebutuhan bibit tanaman Anda.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <Phone className="w-10 h-10 text-slate-800 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-600 text-sm">0899-7993-909</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <Clock className="w-10 h-10 text-slate-800 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Jam Operasional</h3>
              <p className="text-slate-600 text-sm">07.00 - 20.00 WIB</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <MapPin className="w-10 h-10 text-slate-800 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Lokasi</h3>
              <p className="text-slate-600 text-sm">
                Jl. Rajagaluh-Pajajar, Kec. Rajagaluh,<br />
                Kab. Majalengka, Jawa Barat 45472
              </p>
              <p className="text-slate-500 text-xs mt-2">Untuk keakuratan arah dan maps, hubungi WhatsApp kami</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Persea Agro Tani</h3>
            <p className="text-sm">Penangkar &amp; penyedia bibit tanaman buah dan kayu, siap tanam dan siap kirim.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Menu</h3>
            <ul className="space-y-2 text-sm">
              {[["#home", "Home"], ["#about", "Tentang Kami"], ["#produk", "Katalog Produk"], ["#galeri", "Galeri"], ["#kontak", "Kontak Kami"]].map(
                ([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-white">{label}</a></li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Hubungi Kami</h3>
            <p className="text-sm mb-1">WhatsApp</p>
            <p className="text-sm">0899-7993-909</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Media Sosial</h3>
            <p className="text-sm mb-1">Facebook</p>
            <p className="text-sm mb-1">Instagram</p>
            <p className="text-sm mb-1">TikTok</p>
            <p className="text-sm">YouTube</p>
          </div>
        </div>
        <hr className="border-slate-700 my-8" />
        <p className="text-center text-xs text-slate-500">© {new Date().getFullYear()} Persea Agro Tani. Semua hak cipta dilindungi.</p>
      </footer>

      {/* FLOATING WA */}
      <a
        href={waLink("Halo, saya ingin bertanya.")}
        target="_blank"
        rel="noreferrer"
        className="fixed right-6 bottom-6 w-16 h-16 rounded-full bg-green-500 hover:scale-110 transition flex items-center justify-center shadow-xl z-50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </a>

      {/* BACK TO TOP */}
      {scrollY > 400 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 bottom-28 w-13 h-13 p-3.5 rounded-full bg-slate-900 hover:bg-slate-700 transition shadow-lg z-50"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  Sprout, Truck, Tag, Headphones, Search, Phone, Mail, Clock, MapPin,
  ChevronUp, MessageCircle, X, Menu, Star, TreePine, Award, Package,
  Wallet, BadgeCheck, Wrench, Citrus,
} from "lucide-react";

const PHONE = "628997993909";

const waLink = (pesan) => `https://wa.me/${PHONE}?text=${encodeURIComponent(pesan)}`;

const produkAwal = [
  { id: 1, nama: "Durian", kategori: "buah", ket: "Varietas: Musang King, Bawor, Super Tembaga, Monthong, dll.", harga: "Harga mulai dari Rp. XX.000", badge: "Terlaris" },
  { id: 2, nama: "Mangga", kategori: "buah", ket: "Varietas: Harum Manis, Gedong Gincu, Manalagi, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 3, nama: "Alpukat", kategori: "buah", ket: "Varietas: Aligator, Miki, Wina, Kendil, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 4, nama: "Jeruk", kategori: "buah", ket: "Varietas: Keprok, Nipis, Purut, Lemon, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 5, nama: "Jambu Biji", kategori: "buah", ket: "Varietas: Kristal, Merah Getas, Sukun, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 6, nama: "Jambu Air", kategori: "buah", ket: "Varietas: Citra, Dalhari, Madu Deli, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 7, nama: "Nangka", kategori: "buah", ket: "Varietas: Nangka Mini, Nangka Merah, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 8, nama: "Kelengkeng", kategori: "buah", ket: "Varietas: Itoh, Diamond River, Pingpong, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 9, nama: "Anggur", kategori: "buah", ket: "Varietas: Ninel, Jupiter, Transfiguration, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 10, nama: "Petai", kategori: "buah", ket: "Varietas: Petai Lokal, Petai Malaysia, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 11, nama: "Manggis", kategori: "buah", ket: "Varietas: Manggis Lokal Unggul, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 12, nama: "Sawo", kategori: "buah", ket: "Varietas: Sawo Manila, Sawo Kecik, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 13, nama: "Jengkol", kategori: "buah", ket: "Varietas: Jengkol Lokal Unggul, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 14, nama: "Duku", kategori: "buah", ket: "Varietas: Duku Palembang, Duku Condet, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 15, nama: "Apel", kategori: "buah", ket: "Varietas: Anna, Manalagi, Rome Beauty, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 16, nama: "Sirsak", kategori: "buah", ket: "Varietas: Sirsak Ratu, Sirsak Bangkok, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 17, nama: "Belimbing", kategori: "buah", ket: "Varietas: Dewi, Demak, dll.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 18, nama: "Mahoni", kategori: "penghijauan", ket: "Bibit pohon pelindung berkualitas.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 19, nama: "Trembesi", kategori: "penghijauan", ket: "Cocok untuk proyek penghijauan.", harga: "Harga mulai dari Rp. XX.000", badge: "Baru" },
  { id: 20, nama: "Jati", kategori: "perkebunan", ket: "Investasi jangka panjang.", harga: "Harga mulai dari Rp. XX.000" },
  { id: 21, nama: "Ketapang Kencana", kategori: "penghijauan", ket: "Cocok untuk peneduh dan penghijauan jalan.", harga: "Harga mulai dari Rp. XX.000" },
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
            <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden">
              <Sprout className="w-6 h-6 text-slate-900" />
            </div>
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
              <p className="text-slate-600 mt-4">
                Kami melayani pembelian retail maupun partai besar dengan harga yang disesuaikan dengan kebutuhan.
              </p>
              <p className="text-slate-600 mt-4">
                Namun harga bibit tanaman kami tetap murah dan bersahabat namun tidak mengurangi kualitas tanaman.
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

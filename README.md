# Frontend Content App

## Teknoloji

- **React 18** - Hook'lar ile modern React
- **TypeScript** - Tip güvenli JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - API istekleri için HTTP istemcisi
- **date-fns** - Tarih manipülasyon kütüphanesi

## Gereksinimler

Bu uygulamayı çalıştırmadan önce aşağıdakilerin yüklü olduğundan emin olun:

- **Node.js** (16 veya daha yüksek sürüm)
- **npm** (Node.js ile birlikte gelir)
- `http://localhost:8000` adresinde çalışan **Backend API** (veya kendi konfigürasyonunuzu yapın)

## Başlangıç

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Ortam Konfigürasyonu

Kök dizinde `.env` dosyası oluşturun:

```bash
# .env
REACT_APP_API_BASE_URL=http://localhost:8000
```

Backend API URL'niz farklıysa `http://localhost:8000`'i değiştirin.

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm start
```

Uygulama tarayıcınızda `http://localhost:3000` adresinde açılacaktır.

## Mevcut Komutlar

Proje dizininde şunları çalıştırabilirsiniz:

### `npm start`

Uygulamayı geliştirme modunda çalıştırır. Tarayıcıda görüntülemek için [http://localhost:3000](http://localhost:3000) adresini açın.

### `npm run build`

Uygulamayı üretim için `build` klasörüne derler. React'ı üretim modunda doğru şekilde paketler ve en iyi performans için derlemeyi optimize eder.

### `npm test`

Test çalıştırıcısını izleme modunda başlatır.

### `npm run eject`

**Not: bu tek yönlü bir işlemdir. Bir kez eject yaptıktan sonra geri dönemezsiniz!**
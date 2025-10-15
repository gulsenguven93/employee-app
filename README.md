# Employee Management App

React ve TypeScript kullanılarak geliştirilmiş, **Redux Toolkit** tabanlı bir **çalışan yönetim uygulaması**.  
Kullanıcılar çalışan ekleme, düzenleme, silme işlemleri yapabilir; liste ve kart görünümleri arasında geçiş yapabilir.  
Ayrıca arama, sayfalama (pagination), tema (dark/light) ve çoklu dil desteği (i18n) özellikleriyle modern bir yönetim paneli deneyimi sunar.

---

## Özellikler

- **Redux Toolkit** ile global state yönetimi
- **Redux Persist** ile localStorage'da veri saklama
- **CRUD işlemleri (Ekleme, Görüntüleme, Güncelleme, Silme)**
- **Gerçek zamanlı arama / filtreleme sistemi** (firstName, lastName, email, department, position)
- **List ve Card görünüm modları**
- **Karanlık / Aydınlık tema desteği** (Context API ile)
- **Çoklu dil desteği (i18n)**
- **Pagination (sayfalama) sistemi**
- **Silme işlemleri için Modal onayı**
- **Select All** checkbox functionality

---

## Kullanılan Teknolojiler

- **React 18**
- **TypeScript**
- **Redux Toolkit**
- **Redux Persist**
- **Context API** (Theme için)
- **React Router**
- **i18next**
- **Custom CSS**
- **Create React App**

---

## Kurulum ve Çalıştırma

### 1. Projeyi klonlayın

```bash
git clone https://github.com/gulsenguven93/employee-app.git
cd employee-app
```

### 2. Bağımlılıkları yükle

```bash
npm install
```

### 3. Uygulamayı çalıştır

```bash
npm start
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

---

## Proje Yapısı

```
src/
├── components/          # React component'leri
│   ├── EmployeeCard.tsx
│   ├── EmployeeForm.tsx
│   ├── EmployeeList.tsx
│   ├── Header.tsx
│   ├── LanguageSelector.tsx
│   └── ModalDelete.tsx
├── context/            # Context API (Theme)
│   └── ThemeContext.tsx
├── store/              # Redux store
│   ├── store.ts
│   └── employeeSlice.ts
├── pages/              # Sayfa component'leri
│   ├── Home.tsx
│   ├── AddEmployee.tsx
│   └── EditEmployee.tsx
├── hooks/              # Custom hooks
│   └── usePagination.ts
├── styles/             # CSS dosyaları
├── locales/            # i18n çeviri dosyaları
└── data/               # Mock data
    └── employees.ts
```

---

## Özellik Detayları

### Arama Sistemi

- **Gerçek zamanlı arama**: Yazdıkça sonuçlar filtrelenir
- **Çoklu alan araması**: firstName, lastName, email, department, position alanlarında arama
- **Case-insensitive**: Büyük/küçük harf duyarsız

### Tema Sistemi

- **Dark/Light mode**: Header'daki buton ile geçiş
- **Context API**: Global tema yönetimi
- **Premium görünüm**: Gradient'lar ve animasyonlar

### State Management

- **Redux Toolkit**: Modern Redux kullanımı
- **Redux Persist**: Sayfa yenilendiğinde veri korunur
- **TypeScript**: Tip güvenliği

### Çoklu Dil Desteği

- **i18next**: Profesyonel i18n çözümü
- **Türkçe/İngilizce**: Dil seçici ile geçiş
- **Dinamik çeviri**: Tüm metinler çevrilebilir

export const restaurants = [
    {
        id: 1, name: 'Nərgiz Restoran', category: 'Azərbaycan', rating: 4.8,
        reviews: 342, deliveryTime: '20-30 dəq', deliveryFee: 1.5,
        minOrder: 10, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
        isOpen: true, tags: ['Milli', 'Ət', 'Plov'],
        menu: [
            { id: 101, name: 'Qutab', price: 3.5, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80', desc: 'Ənənəvi Azərbaycan qutabı', category: 'Qaynar' },
            { id: 102, name: 'Plov', price: 7.0, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&q=80', desc: 'Düyü, ət, gavalı', category: 'Əsas' },
            { id: 103, name: 'Dolma', price: 6.5, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80', desc: 'Üzüm yarpağında dolma', category: 'Əsas' },
            { id: 104, name: 'Baklava', price: 4.0, image: 'https://images.unsplash.com/photo-1571167366136-b57e97c04fe0?w=200&q=80', desc: 'Şirniyyat', category: 'Desert' },
        ]
    },
    {
        id: 2, name: 'Pizza House', category: 'İtalyan', rating: 4.6,
        reviews: 218, deliveryTime: '25-40 dəq', deliveryFee: 2.0,
        minOrder: 8, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
        isOpen: true, tags: ['Pizza', 'Pasta', 'Fast Food'],
        menu: [
            { id: 201, name: 'Margherita', price: 9.5, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80', desc: 'Tomat, mozzarella', category: 'Pizza' },
            { id: 202, name: 'Pepperoni', price: 11.0, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&q=80', desc: 'Pepperoni, pendir', category: 'Pizza' },
            { id: 203, name: 'Caesar Salatası', price: 7.5, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&q=80', desc: 'Toyuq, parmezar, kruton', category: 'Salat' },
        ]
    },
    {
        id: 3, name: 'Burger King Baku', category: 'Fast Food', rating: 4.3,
        reviews: 521, deliveryTime: '15-25 dəq', deliveryFee: 1.0,
        minOrder: 5, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
        isOpen: true, tags: ['Burger', 'Fast Food', 'Kartof'],
        menu: [
            { id: 301, name: 'Whopper', price: 8.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80', desc: 'Böyük burger, salat, tomat', category: 'Burger' },
            { id: 302, name: 'Chicken Crispy', price: 7.0, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&q=80', desc: 'Crispy toyuq burger', category: 'Burger' },
            { id: 303, name: 'Qızardılmış Kartof', price: 3.0, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80', desc: 'Böyük ölçü', category: 'Qoşma' },
        ]
    },
    {
        id: 4, name: 'Sushi Time', category: 'Yapon', rating: 4.7,
        reviews: 189, deliveryTime: '30-45 dəq', deliveryFee: 2.5,
        minOrder: 15, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
        isOpen: false, tags: ['Sushi', 'Yapon', 'Ramen'],
        menu: [
            { id: 401, name: 'Philadelphia Roll', price: 12.0, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=200&q=80', desc: '8 ədəd, krem pendir, somon', category: 'Rolls' },
            { id: 402, name: 'Dragon Roll', price: 14.5, image: 'https://images.unsplash.com/photo-1617196034199-be4ef9ef9fe5?w=200&q=80', desc: 'Avokado, somon, ton balığı', category: 'Rolls' },
        ]
    },
]

export const marketCategories = [
    { id: 1, name: 'Meyvə & Tərəvəz', icon: '🥦', color: '#10b981' },
    { id: 2, name: 'Ət & Quş', icon: '🥩', color: '#ef4444' },
    { id: 3, name: 'Süd Məhsulları', icon: '🥛', color: '#3b82f6' },
    { id: 4, name: 'Çörək', icon: '🍞', color: '#f59e0b' },
    { id: 5, name: 'İçki', icon: '🥤', color: '#8b5cf6' },
    { id: 6, name: 'Konfet', icon: '🍬', color: '#ec4899' },
]

export const marketProducts = [
    { id: 'p1', name: 'Alma (1 kq)', price: 2.5, category: 1, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&q=80', unit: 'kq', stock: true },
    { id: 'p3', name: 'Banan (1 kq)', price: 2.0, category: 1, image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=200&q=80', unit: 'kq', stock: true },
    { id: 'p4', name: 'Toyuq filesi (1 kq)', price: 8.5, category: 2, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=80', unit: 'kq', stock: true },
    { id: 'p5', name: 'Süd (1L)', price: 1.8, category: 3, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80', unit: 'L', stock: true },
    { id: 'p6', name: 'Yumurta (10 ədəd)', price: 3.5, category: 3, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80', unit: 'ədəd', stock: false },
    { id: 'p7', name: 'Pendir (200q)', price: 4.2, category: 3, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&q=80', unit: 'q', stock: true },
    { id: 'p8', name: 'Çörək', price: 0.8, category: 4, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80', unit: 'ədəd', stock: true },
    { id: 'p9', name: 'Su (1.5L)', price: 0.9, category: 5, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&q=80', unit: 'L', stock: true },
    { id: 'p10', name: 'Kola (0.5L)', price: 1.5, category: 5, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&q=80', unit: 'L', stock: true },
    { id: 'p12', name: 'Şokolad', price: 2.8, category: 6, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&q=80', unit: 'ədəd', stock: true },
]

export const rideTypes = {
    'GetGəl': { base: 1.5, perKm: 0.7, icon: 'car', desc: '4 nəfərə qədər', eta: '3-5' },
    'Priority': { base: 3.0, perKm: 1.1, icon: 'rocket', desc: 'Sürətli', eta: '2-3' },
    'XL': { base: 4.0, perKm: 1.5, icon: 'users', desc: '6 nəfərə qədər', eta: '5-8' },
    'Eco': { base: 1.8, perKm: 0.75, icon: 'leaf', desc: 'Qənaətcil', eta: '5-10' },
}

export const tripHistory = [
    { id: 1, pickup: 'Şonqar qəsəbəsi', dest: 'Səməd Vurğun bağı', price: '12.00', date: '21.12.2025', type: 'GetGəl' },
    { id: 2, pickup: 'Heydər Əliyev Hava Limanı', dest: 'Port Baku Mall', price: '15.50', date: '20.12.2025', type: 'Priority' },
    { id: 3, pickup: 'İçərişəhər m/st', dest: 'Alov Qüllələri', price: '3.40', date: '19.12.2025', type: 'Eco' },
    { id: 4, pickup: 'Gənclik Mall', dest: 'Bakı Kristal Zalı', price: '6.20', date: '18.12.2025', type: 'GetGəl' },
]

export const promos = [
    { code: 'GETGEL20', discount: 20, desc: '%20 endirim - bütün sifarişlər', expires: '31.01.2026' },
    { code: 'YENI10', discount: 10, desc: '%10 endirim - ilk sifariş', expires: '28.02.2026' },
    { code: 'FOOD15', discount: 15, desc: '%15 endirim - yemək sifarişi', expires: '15.01.2026' },
]
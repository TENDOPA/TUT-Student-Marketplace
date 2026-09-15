import {
  Laptop, BookOpen, Armchair, Shirt, Home, Gamepad2,
  UtensilsCrossed, Wrench, Car, Sparkles, Palette, GraduationCap,
  Code2, Camera, Scissors, Cake, Brush, Printer, Truck, Bot,
  Smartphone, Tablet, Calculator, Watch, Headphones, Bike, Megaphone
} from "lucide-react";

export const CAMPUSES = [
  "Pretoria", "Soshanguve", "Ga-Rankuwa", "eMalahleni", "Polokwane", "Mbombela"
];

export const FACULTIES = [
  "Engineering", "Information & Communication Technology", "Science",
  "Arts & Design", "Economics & Finance", "Humanities", "Management Sciences"
];

export const CONDITIONS = ["New", "Like New", "Good", "Fair", "Refurbished"];

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: Headphones, color: "from-blue-500 to-cyan-400" },
  { id: "phones", name: "Phones", icon: Smartphone, color: "from-indigo-500 to-violet-400" },
  { id: "laptops", name: "Laptops", icon: Laptop, color: "from-sky-500 to-blue-400" },
  { id: "tablets", name: "Tablets", icon: Tablet, color: "from-cyan-500 to-teal-400" },
  { id: "textbooks", name: "Textbooks", icon: BookOpen, color: "from-indigo-500 to-purple-400" },
  { id: "calculators", name: "Calculators", icon: Calculator, color: "from-emerald-500 to-green-400" },
  { id: "gaming", name: "IT Accessories", icon: Gamepad2, color: "from-violet-500 to-fuchsia-400" },
  { id: "furniture", name: "Study Furniture", icon: Armchair, color: "from-amber-500 to-orange-400" },
  { id: "accommodation", name: "Accommodation", icon: Home, color: "from-emerald-500 to-teal-400" },
  { id: "accessories", name: "Accessories", icon: Watch, color: "from-rose-500 to-pink-400" },
  { id: "services", name: "Services", icon: Wrench, color: "from-sky-500 to-blue-400" },
  { id: "other", name: "University Merch", icon: Sparkles, color: "from-purple-500 to-indigo-400" },
];

/* Homepage featured category tiles (curated subset) */
export const FEATURED_CATEGORIES = [
  { id: "textbooks", name: "Textbooks", icon: BookOpen, color: "from-indigo-500 to-purple-400" },
  { id: "phones", name: "Phones", icon: Smartphone, color: "from-indigo-500 to-violet-400" },
  { id: "laptops", name: "Laptops", icon: Laptop, color: "from-sky-500 to-blue-400" },
  { id: "electronics", name: "Electronics", icon: Headphones, color: "from-blue-500 to-cyan-400" },
  { id: "accommodation", name: "Accommodation", icon: Home, color: "from-emerald-500 to-teal-400" },
  { id: "calculators", name: "Calculators", icon: Calculator, color: "from-emerald-500 to-green-400" },
  { id: "furniture", name: "Study Furniture", icon: Armchair, color: "from-amber-500 to-orange-400" },
  { id: "gaming", name: "IT Accessories", icon: Gamepad2, color: "from-violet-500 to-fuchsia-400" },
  { id: "accessories", name: "Accessories", icon: Watch, color: "from-rose-500 to-pink-400" },
  { id: "services", name: "Services", icon: Wrench, color: "from-sky-500 to-blue-400" },
];

export const BUSINESS_CATEGORIES = [
  { id: "design", name: "Graphic Design", icon: Palette },
  { id: "tutoring", name: "Tutoring", icon: GraduationCap },
  { id: "programming", name: "Programming", icon: Code2 },
  { id: "photography", name: "Photography", icon: Camera },
  { id: "haircuts", name: "Haircuts", icon: Scissors },
  { id: "baking", name: "Baking", icon: Cake },
  { id: "cleaning", name: "Cleaning", icon: Brush },
  { id: "printing", name: "Printing", icon: Printer },
  { id: "delivery", name: "Delivery", icon: Truck },
  { id: "repairs", name: "Repairs", icon: Wrench },
];

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const AVATARS = [
  img("photo-1500648767791-00dcc994a43e"),
  img("photo-1438761681033-6461ffad8d80"),
  img("photo-1506794778202-cad84cf45f1d"),
  img("photo-1544005313-94ddf0286df2"),
  img("photo-1507003211169-0a1dd7228f2d"),
  img("photo-1502685104226-ee32379fefbe"),
  img("photo-1531123897727-8f129e1688ce"),
  img("photo-1559548331-f9cb980014e0"),
  img("photo-1607990281513-2c110a25bd8c"),
  img("photo-1546961329-78bef0414d7c"),
  img("photo-1494790108377-be9c29b37343"),
  img("photo-1599566150163-2916d0f5f1d9"),
];
const NAMES = ["Thabo M.","Lerato D.","Sipho N.","Aisha P.","Kabelo S.","Naledi K.","Mandla Z.","Zanele M.","Johan B.","Bongani M.","Precious N.","Daniel K."];
const FACS = ["Engineering","Information & Communication Technology","Science","Arts & Design","Economics & Finance","Humanities","Management Sciences"];

/* Realistic SA retail (new) prices in Rand — keyed by listing title.
   Items without a retail equivalent (services, rentals, student notes)
   fall back to the selling price (no discount). */
const RETAIL = {
  "Samsung Galaxy S23 Ultra 256GB": 25999, "iPhone 13 128GB Midnight": 15999,
  "Huawei P40 Pro 256GB": 13999, "Xiaomi Redmi Note 12 128GB": 4499,
  "Google Pixel 7 128GB": 11999, "iPhone 12 64GB Blue": 11999,
  "Samsung Galaxy A54 5G 128GB": 6999, "iPhone 14 Plus 256GB Starlight": 19999,
  "Huawei Nova Y90 128GB": 4499, "Xiaomi 13 Lite 256GB": 6499,
  "Samsung Galaxy S22 128GB": 21999, "iPhone SE (2022) 64GB": 9999,
  "Google Pixel 6a 128GB": 8499, "Samsung Galaxy A14 64GB": 3299, "iPhone 11 64GB Black": 12999,
  "MacBook Air M2 (2023) 256GB": 27999, "HP Pavilion 15 i5 8GB 512GB": 12999,
  "Dell Inspiron 14 i7 16GB": 15999, "Lenovo IdeaPad 3 Ryzen 5": 9999,
  "ASUS VivoBook 15 i5": 11999, "MacBook Pro 13 M1 256GB": 23999,
  "Acer Aspire 5 i5 8GB": 8999, "MSI Modern 14 i7 16GB": 15999,
  "HP EliteBook 840 G7 i5": 14999, "Dell XPS 13 i7 16GB": 24999, "Lenovo ThinkPad T14 i5": 16999,
  "iPad Air 5th Gen 64GB": 12999, "Samsung Galaxy Tab S8 128GB": 13999,
  "iPad 9th Gen 64GB Wi-Fi": 7999, "Lenovo Tab P11 128GB": 5999,
  "Samsung Galaxy Tab A8 64GB": 4499, "iPad Pro 11 (2022) 256GB": 19999,
  "Engineering Mathematics (7th Ed)": 950, "Introduction to Programming (Python) Notes": 250,
  "Calculus: Early Transcendentals": 850, "Principles of Economics (Mankiw)": 750,
  "University Physics (Young & Freedman)": 1100, "Data Structures & Algorithms in Python": 900,
  "Financial Accounting (IFRS ed)": 850, "Organic Chemistry (Clayden)": 950,
  "Discrete Mathematics & Applications": 720, "Marketing Management (Kotler)": 920,
  "Casio fx-991ES PLUS Scientific": 380, "Casio fx-82ZA PLUS II": 250,
  "Texas Instruments TI-84 Plus": 2200, "Sharp EL-W531 Scientific": 350, "Casio fx-991EX ClassWiz": 520,
  "Logitech MX Master 3S Mouse": 1899, "Sony WH-CH720N Headphones": 2299,
  "JBL Flip 6 Bluetooth Speaker": 2299, "Apple AirPods Pro 2": 4499,
  "Canon Pixma Printer + Ink": 1799, "Logitech G435 Gaming Headset": 1299,
  "Anker PowerCore 20000mAh": 899, "Samsung T7 1TB Portable SSD": 2899,
  "Logitech K380 Keyboard": 899, "Sony EXTRA BASS Earbuds": 599,
  "Anker 65W USB-C Charger": 599, "Logitech C920 HD Webcam": 1499,
  "PS5 Slim Disc + 2 Controllers": 11999, "Xbox Series S 512GB": 6999,
  "Nintendo Switch OLED 64GB": 6999, "DualSense Edge Controller": 3299,
  "Razer DeathAdder V2 Mouse": 1299, "Logitech G502 Hero": 1399,
  "FIFA 24 (PS5)": 999, "PS4 Pro 1TB + 5 Games": 5999,
  "Gaming Chair (Red/Black)": 2999, "Xbox Wireless Controller": 1199,
  "Student Desk & Ergonomic Chair Combo": 1999, "Mini Fridge 90L - Res Ready": 2199,
  "Single Bed & Mattress": 2999, "Bookshelf 4-Tier Wooden": 999,
  "Study Lamp LED Dimmable": 349, "2-Seater Couch Grey": 3499,
  "Folding Chair Set of 2": 599, "Wardrobe 2-Door": 1499,
  "Bean Bag Lounge Chair": 699, "Coffee Table Round Glass": 999,
  "Mountain Bike 29er Commuter": 8999, "Electric Scooter 350W": 7999,
  "City Bike 26-inch": 2499, "Skateboard Cruiser": 899,
  "Helmet + Bike Lights Set": 599, "Bike Lock Chain Heavy Duty": 449,
  "Apple Watch SE 44mm": 5999, "Leather Laptop Backpack": 999,
  "USB-C Hub 7-in-1": 799, "Wireless Charger Pad": 349,
  "Sunglasses Polarised": 499, "Phone Ring Holder + Stand": 129,
  "Mechanical Keyboard RGB": 1999, "Laptop Sleeve 14-inch": 349,
  "Smartwatch Band Set (3)": 299, "TUT T-Shirt (Pretoria Campus) - Size M": 250,
};

let _seq = 0;
const mk = (title, price, category, photo, cond, campus, sellerName, desc, opts = {}) => {
  _seq += 1;
  const si = NAMES.indexOf(sellerName);
  const avatar = AVATARS[si >= 0 ? si : (_seq % AVATARS.length)];
  const newPrice = RETAIL[title] ?? price;
  const marketValue = Math.round((price + newPrice) / 2);
  const discount = newPrice > price ? Math.round((1 - price / newPrice) * 100) : 0;
  const savings = newPrice - price;
  return {
    id: `p${_seq + 12}`,
    title, price, newPrice, marketValue, discount, savings, category,
    university: "Tshwane University of Technology",
    images: [img(photo)],
    description: desc,
    seller: {
      name: sellerName, avatar,
      rating: opts.rating ?? (4.3 + ((_seq % 7) * 0.1)),
      verified: opts.verified ?? (_seq % 4 !== 0),
      faculty: opts.faculty ?? FACS[_seq % FACS.length],
      campus, sales: opts.sales ?? (8 + (_seq % 40)),
    },
    campus,
    faculty: opts.faculty ?? FACS[_seq % FACS.length],
    condition: cond,
    rating: opts.rating ?? (4.3 + ((_seq % 7) * 0.1)),
    reviews: opts.reviews ?? (3 + (_seq % 20)),
    negotiable: opts.neg ?? (_seq % 3 !== 0),
    featured: opts.featured ?? false,
    trending: opts.trending ?? false,
    tags: opts.tags ?? [],
  };
};

export const PRODUCTS = [
  /* ===== Phones ===== */
  mk("Samsung Galaxy S23 Ultra 256GB", 9200, "phones", "photo-1610945265064-0e34e5519bbf", "Good", "eMalahleni", "Kabelo S.", "Phantom black, S-Pen included, screen protector since day one. Open to swap for iPhone 14 Pro + cash.", { trending: true, tags: ["samsung","android"] }),
  mk("iPhone 13 128GB Midnight", 10500, "phones", "photo-1663499488973-a05496074129", "Like New", "Pretoria", "Naledi K.", "Battery health 92%, no scratches, includes box and cable. Perfect for students.", { verified: true, trending: true, tags: ["apple","iphone"] }),
  mk("Huawei P40 Pro 256GB", 6800, "phones", "photo-1592286927505-1def25115558", "Good", "Soshanguve", "Lerato D.", "Great camera phone, includes original case. No Google services — ideal if you use AppGallery.", { tags: ["huawei"] }),
  mk("Xiaomi Redmi Note 12 128GB", 3200, "phones", "photo-1567533617676-0539604d4b7e", "New", "Ga-Rankuwa", "Sipho N.", "Brand new sealed in box. 50MP camera, 5000mAh battery. Great budget phone.", { tags: ["xiaomi"] }),
  mk("Google Pixel 7 128GB", 6200, "phones", "photo-1598327105666-5b89d5121854", "Like New", "Polokwane", "Mandla Z.", "Clean Pixel 7 with the best Android camera. Tensor G2 chip, smooth performance.", { tags: ["pixel","google"] }),
  mk("iPhone 12 64GB Blue", 7400, "phones", "photo-1511707171634-5f897ff02aa9", "Good", "Pretoria", "Aisha P.", "Minor scuffs on frame, screen perfect. Battery health 88%. Charger included.", { verified: false, tags: ["apple"] }),
  mk("Samsung Galaxy A54 5G 128GB", 4900, "phones", "photo-1610945265064-0e34e5519bbf", "New", "Mbombela", "Zanele M.", "Sealed in box, 5G ready, 2-year warranty from takealot receipt.", { tags: ["samsung"] }),
  mk("iPhone 14 Plus 256GB Starlight", 13500, "phones", "photo-1663923961229-a84c79a1d56f", "Like New", "Pretoria", "Naledi K.", "3 months old, AppleCare eligible. Large screen, great battery.", { verified: true, trending: true, tags: ["apple"] }),
  mk("Huawei Nova Y90 128GB", 2600, "phones", "photo-1556656793-599d3a8d1b58", "Good", "Soshanguve", "Bongani M.", "Big screen budget phone, works perfectly. Includes clear case.", { tags: ["huawei"] }),
  mk("Xiaomi 13 Lite 256GB", 3800, "phones", "photo-1592750475338-74b7b22b8b89", "New", "Ga-Rankuwa", "Sipho N.", "Sealed, dual selfie camera, Snapdragon 778G. Excellent value.", { tags: ["xiaomi"] }),
  mk("Samsung Galaxy S22 128GB", 6900, "phones", "photo-1565849904461-04a58ad377e0", "Good", "eMalahleni", "Kabelo S.", "Compact flagship, no scratches. Reasonable offers considered.", { trending: true, tags: ["samsung"] }),
  mk("iPhone SE (2022) 64GB", 5200, "phones", "photo-1592286927505-1def25115558", "Like New", "Polokwane", "Mandla Z.", "Latest SE with A15 chip. Compact and fast. Box included.", { tags: ["apple"] }),
  mk("Google Pixel 6a 128GB", 4100, "phones", "photo-1598327105666-5b89d5121854", "Good", "Pretoria", "Daniel K.", "Clean Pixel, great for photography students. Magic Eraser works great.", { tags: ["pixel"] }),
  mk("Samsung Galaxy A14 64GB", 2300, "phones", "photo-1610945265064-0e34e5519bbf", "New", "Mbombela", "Zanele M.", "Budget-friendly, big battery. Sealed in box.", { tags: ["samsung"] }),
  mk("iPhone 11 64GB Black", 5900, "phones", "photo-1511707171634-5f897ff02aa9", "Good", "Pretoria", "Aisha P.", "Solid daily phone, battery health 85%. Comes with silicone case.", { tags: ["apple"] }),

  /* ===== Laptops ===== */
  mk("MacBook Air M2 (2023) 256GB", 14500, "laptops", "photo-1517336714731-489689fd1ca8", "Like New", "Pretoria", "Thabo M.", "Barely used MacBook Air M2 for design work. No scratches, battery cycles under 30. Includes original charger and box.", { verified: true, featured: true, trending: true, tags: ["apple","laptop"] }),
  mk("HP Pavilion 15 i5 8GB 512GB", 7200, "laptops", "photo-1496181133206-80ce9b88a853", "Good", "Soshanguve", "Lerato D.", "Reliable study laptop, 15.6\" FHD. Windows 11, Office installed. Great for assignments.", { trending: true, tags: ["hp","laptop"] }),
  mk("Dell Inspiron 14 i7 16GB", 8900, "laptops", "photo-1593642632823-8f785ba67e45", "Like New", "Pretoria", "Naledi K.", "Powerful for coding and design. SSD upgraded to 1TB. Excellent condition.", { verified: true, tags: ["dell","laptop"] }),
  mk("Lenovo IdeaPad 3 Ryzen 5", 5400, "laptops", "photo-1611186871348-b1ce696e52c9", "Good", "Ga-Rankuwa", "Sipho N.", "Budget laptop for everyday study. Good battery, light and portable.", { tags: ["lenovo","laptop"] }),
  mk("ASUS VivoBook 15 i5", 6700, "laptops", "photo-1525542718441-95381c7e8125", "Good", "eMalahleni", "Kabelo S.", "Slim design, backlit keyboard. Perfect for ICT students.", { tags: ["asus","laptop"] }),
  mk("MacBook Pro 13 M1 256GB", 12500, "laptops", "photo-1517336714731-489689fd1ca8", "Like New", "Pretoria", "Thabo M.", "M1 chip, blazing fast. Used lightly for notes. Battery lasts all day.", { verified: true, featured: true, tags: ["apple","laptop"] }),
  mk("Acer Aspire 5 i5 8GB", 4900, "laptops", "photo-1496181133206-80ce9b88a853", "Fair", "Polokwane", "Mandla Z.", "Works well, minor cosmetic marks. Great value starter laptop.", { tags: ["acer","laptop"] }),
  mk("MSI Modern 14 i7 16GB", 8200, "laptops", "photo-1593642632823-8f785ba67e45", "Like New", "Pretoria", "Naledi K.", "Lightweight powerhouse for engineering students. Handles CAD well.", { verified: true, tags: ["msi","laptop"] }),
  mk("HP EliteBook 840 G7 i5", 6800, "laptops", "photo-1496181133206-80ce9b88a853", "Good", "Soshanguve", "Lerato D.", "Business-grade durability, 16GB RAM. Includes docking station.", { tags: ["hp","laptop"] }),
  mk("Dell XPS 13 i7 16GB", 11500, "laptops", "photo-1593642632823-8f785ba67e45", "Like New", "Pretoria", "Daniel K.", "Premium ultrabook, stunning display. Perfect for design and dev work.", { trending: true, tags: ["dell","laptop"] }),
  mk("Lenovo ThinkPad T14 i5", 7400, "laptops", "photo-1611186871348-b1ce696e52c9", "Good", "Ga-Rankuwa", "Sipho N.", "Legendary keyboard, built for productivity. SSD 512GB.", { tags: ["lenovo","laptop"] }),

  /* ===== Tablets ===== */
  mk("iPad Air 5th Gen 64GB", 7800, "tablets", "photo-1544244015-0c3a5a6c1e21", "Like New", "Pretoria", "Naledi K.", "Apple M1 chip, works with Apple Pencil 2. Great for note-taking and design.", { verified: true, trending: true, tags: ["apple","ipad"] }),
  mk("Samsung Galaxy Tab S8 128GB", 6900, "tablets", "photo-1561154464-82e9adf32764", "Like New", "Soshanguve", "Lerato D.", "S-Pen included, great for drawing. Keyboard cover optional R600.", { tags: ["samsung","tablet"] }),
  mk("iPad 9th Gen 64GB Wi-Fi", 5200, "tablets", "photo-1544244015-0c3a5a6c1e21", "Good", "Ga-Rankuwa", "Sipho N.", "Student-favourite iPad. Light scuffs on back, screen perfect.", { tags: ["apple","ipad"] }),
  mk("Lenovo Tab P11 128GB", 3400, "tablets", "photo-1542751378-ad79d274a4c5", "Good", "eMalahleni", "Kabelo S.", "Bundled keyboard, great for study notes. Android 12.", { tags: ["lenovo","tablet"] }),
  mk("Samsung Galaxy Tab A8 64GB", 2600, "tablets", "photo-1561154464-82e9adf32764", "New", "Polokwane", "Mandla Z.", "Sealed budget tablet, big screen for lectures and movies.", { tags: ["samsung","tablet"] }),
  mk("iPad Pro 11 (2022) 256GB", 12000, "tablets", "photo-1544244015-0c3a5a6c1e21", "Like New", "Pretoria", "Thabo M.", "M2 chip, liquid retina. Apple Pencil included. Barely used.", { verified: true, featured: true, tags: ["apple","ipad"] }),

  /* ===== Textbooks ===== */
  mk("Engineering Mathematics (7th Ed)", 320, "textbooks", "photo-1532012197267-da84d127e765", "Good", "Soshanguve", "Lerato D.", "K.A. Stroud. No highlighting. Required text for 1st/2nd year Engineering.", { trending: true, tags: ["textbook","engineering"] }),
  mk("Introduction to Programming (Python) Notes", 80, "textbooks", "photo-1517842645767-c639042777db", "Good", "Pretoria", "Naledi K.", "PRG511S notes + past papers with worked solutions. Got me a distinction!", { verified: true, tags: ["notes","python"] }),
  mk("Calculus: Early Transcendentals", 280, "textbooks", "photo-1497633762265-9d179a990aa6", "Good", "Pretoria", "Thabo M.", "James Stewart. Essential for maths and physics. Light wear.", { tags: ["textbook","maths"] }),
  mk("Principles of Economics (Mankiw)", 240, "textbooks", "photo-1456513080510-7bf3a84b82f8", "Like New", "eMalahleni", "Kabelo S.", "Clean copy, no marks. Required for Economics & Finance students.", { tags: ["textbook","economics"] }),
  mk("University Physics (Young & Freedman)", 350, "textbooks", "photo-1481627834876-b7833e8f5570", "Good", "Ga-Rankuwa", "Sipho N.", "Complete physics reference. Spine intact, some notes in margins.", { tags: ["textbook","physics"] }),
  mk("Data Structures & Algorithms in Python", 300, "textbooks", "photo-1517842645767-c639042777db", "Like New", "Pretoria", "Naledi K.", "Best for ICT students. Clean, barely used.", { verified: true, tags: ["textbook","python"] }),
  mk("Financial Accounting (IFRS ed)", 290, "textbooks", "photo-1532012197267-da84d127e765", "Good", "Mbombela", "Zanele M.", "Up-to-date with IFRS. Needed for Accounting 1 & 2.", { tags: ["textbook","accounting"] }),
  mk("Organic Chemistry (Clayden)", 260, "textbooks", "photo-1497633762265-9d179a990aa6", "Good", "Polokwane", "Mandla Z.", "Classic organic chem text. Some highlighting in early chapters.", { tags: ["textbook","chemistry"] }),
  mk("Discrete Mathematics & Applications", 220, "textbooks", "photo-1481627834876-b7833e8f5570", "Good", "Soshanguve", "Lerato D.", "Essential for Computer Science. Clean condition.", { tags: ["textbook","maths"] }),
  mk("Marketing Management (Kotler)", 310, "textbooks", "photo-1456513080510-7bf3a84b82f8", "Like New", "Pretoria", "Daniel K.", "Latest SA edition. Excellent for Management Sciences.", { tags: ["textbook","marketing"] }),

  /* ===== Calculators ===== */
  mk("Casio fx-991ES PLUS Scientific", 180, "calculators", "photo-1564466809058-bf4114d55352", "Good", "Pretoria", "Thabo M.", "Allowed in exams. Works perfectly, includes cover.", { tags: ["casio","calculator"] }),
  mk("Casio fx-82ZA PLUS II", 120, "calculators", "photo-1564466809058-bf4114d55352", "Like New", "Soshanguve", "Lerato D.", "Standard TUT-approved calculator. Barely used.", { tags: ["casio"] }),
  mk("Texas Instruments TI-84 Plus", 950, "calculators", "photo-1509225252375-8dead2b0b314", "Like New", "Ga-Rankuwa", "Sipho N.", "Graphing calculator, perfect for stats and engineering. Includes cable.", { tags: ["ti","calculator"] }),
  mk("Sharp EL-W531 Scientific", 140, "calculators", "photo-1564466809058-bf4114d55352", "Good", "eMalahleni", "Kabelo S.", "WriteView scientific calculator. Good condition.", { tags: ["sharp"] }),
  mk("Casio fx-991EX ClassWiz", 220, "calculators", "photo-1564466809058-bf4114d55352", "New", "Pretoria", "Naledi K.", "High-resolution scientific calc, exam-approved. Sealed.", { verified: true, tags: ["casio"] }),

  /* ===== Electronics ===== */
  mk("Logitech MX Master 3S Mouse", 850, "electronics", "photo-1527864550417-7fd91fc51a46", "Like New", "Pretoria", "Naledi K.", "Productivity mouse for coding and design. USB-C charging, 2 months old.", { verified: true, tags: ["mouse","logitech"] }),
  mk("Sony WH-CH720N Headphones", 1100, "electronics", "photo-1505740420928-5e560c06d30e", "New", "Pretoria", "Thabo M.", "Noise-cancelling, great for library study sessions. Sealed.", { trending: true, tags: ["sony","audio"] }),
  mk("JBL Flip 6 Bluetooth Speaker", 1200, "electronics", "photo-1608043152269-423dbba4e7ad", "Like New", "Soshanguve", "Lerato D.", "Loud, waterproof. Perfect for res gatherings. Box included.", { tags: ["jbl","speaker"] }),
  mk("Apple AirPods Pro 2", 2400, "electronics", "photo-1606220588913-b3aacb4d2f46", "Like New", "Pretoria", "Naledi K.", "Noise cancellation, USB-C case. 3 months old, perfect condition.", { verified: true, trending: true, tags: ["apple","audio"] }),
  mk("Canon Pixma Printer + Ink", 900, "electronics", "photo-1612815154858-8aa9d7a4fa2b", "Good", "Ga-Rankuwa", "Sipho N.", "Compact printer for assignments. Comes with 2 extra ink cartridges.", { tags: ["canon","printer"] }),
  mk("Logitech G435 Gaming Headset", 700, "electronics", "photo-1505740420928-5e560c06d30e", "Good", "eMalahleni", "Kabelo S.", "Wireless, light, great mic. Works on PC and PS5.", { tags: ["logitech","gaming"] }),
  mk("Anker PowerCore 20000mAh", 450, "electronics", "photo-1583863788434-e58a36330cf0", "New", "Pretoria", "Aisha P.", "Fast-charging power bank for long campus days. Sealed.", { tags: ["anker","charger"] }),
  mk("Samsung T7 1TB Portable SSD", 1800, "electronics", "photo-1597852074816-d933c7d6d2b8", "Like New", "Polokwane", "Mandla Z.", "USB 3.2, rugged. Perfect for backing up projects.", { tags: ["samsung","storage"] }),
  mk("Logitech K380 Keyboard", 550, "electronics", "photo-1541140532151-b54b6f1a1d2c", "New", "Soshanguve", "Lerato D.", "Multi-device Bluetooth keyboard. Great for tablet setups.", { tags: ["logitech","keyboard"] }),
  mk("Sony EXTRA BASS Earbuds", 380, "electronics", "photo-1590658268037-6bf12165a8df", "Good", "Mbombela", "Zanele M.", "Wired earbuds with mic, deep bass. Works on all phones.", { tags: ["sony","audio"] }),
  mk("Anker 65W USB-C Charger", 320, "electronics", "photo-1583863788434-e58a36330cf0", "New", "Pretoria", "Thabo M.", "GaN charger, charges laptop and phone fast. Sealed.", { tags: ["anker","charger"] }),
  mk("Logitech C920 HD Webcam", 700, "electronics", "photo-1541140532151-b54b6f1a1d2c", "Like New", "Pretoria", "Daniel K.", "1080p webcam for online lectures and meetings. Clip-on.", { tags: ["logitech","webcam"] }),

  /* ===== IT Accessories (peripherals) ===== */
  mk("Razer DeathAdder V2 Mouse", 650, "gaming", "photo-1592841200368-3b4b6b1d3c4f", "Good", "eMalahleni", "Kabelo S.", "Lightweight gaming mouse, perfect for FPS. RGB lighting.", { tags: ["razer","mouse"] }),
  mk("Logitech G502 Hero", 700, "gaming", "photo-1615663249855-08d6d2b86e7e", "Like New", "Pretoria", "Daniel K.", "Customisable weights, 11 buttons. Great for MOBA and FPS.", { tags: ["logitech","mouse"] }),

  /* ===== Furniture ===== */
  mk("Student Desk & Ergonomic Chair Combo", 950, "furniture", "photo-1518455027359-f3f8164ba6bd", "Good", "Pretoria", "Aisha P.", "Compact study desk with adjustable chair. Perfect for res rooms. 1 year old.", { tags: ["desk","chair"] }),
  mk("Mini Fridge 90L - Res Ready", 1100, "furniture", "photo-1571175443880-49e1d25b2bc5", "Good", "Pretoria", "Thabo M.", "Compact 90L fridge, cold and quiet. Selling — moving to bigger commune.", { tags: ["fridge","appliance"] }),
  mk("Single Bed & Mattress", 1400, "furniture", "photo-1505693416388-ac5ce068fe85", "Good", "Soshanguve", "Lerato D.", "Sturdy single bed with comfortable mattress. Disassembled for transport.", { tags: ["bed"] }),
  mk("Bookshelf 4-Tier Wooden", 480, "furniture", "photo-1594620252201-5f6e3a6b3c8f", "Good", "Ga-Rankuwa", "Sipho N.", "Solid wood bookshelf, holds textbooks and supplies easily.", { tags: ["shelf"] }),
  mk("Study Lamp LED Dimmable", 180, "furniture", "photo-1507473885765-e6ed057f782c", "New", "Pretoria", "Naledi K.", "USB-powered LED lamp, 3 brightness levels. Eye-care friendly.", { verified: true, tags: ["lamp","light"] }),
  mk("Folding Chair Set of 2", 320, "furniture", "photo-1592078615290-033ee584e267", "New", "Polokwane", "Mandla Z.", "Brand new folding chairs, great for extra seating in res.", { tags: ["chair"] }),
  mk("Wardrobe 2-Door", 700, "furniture", "photo-1538688525198-9b88f6f53126", "Good", "Pretoria", "Daniel K.", "Tall 2-door wardrobe, lots of hanging space. Mirror on door.", { tags: ["wardrobe"] }),

  /* ===== Accommodation ===== */
  mk("Furnished Room near TUT Pretoria", 2800, "accommodation", "photo-1502672260266-1c1ef2d93688", "New", "Pretoria", "Johan B.", "Furnished room in secure commune, 5 min walk to campus. WiFi, water & electricity included. Deposit R1400. Available now.", { featured: true, tags: ["room","rent","commune"] }),
  mk("Bachelor Flat - Arcadia", 4500, "accommodation", "photo-1502672260266-1c1ef2d93688", "New", "Pretoria", "Johan B.", "Self-contained bachelor flat near TUT. WiFi and water included. Parking available.", { verified: true, tags: ["flat","rent"] }),
  mk("Shared Room in Commune - Soshanguve", 1800, "accommodation", "photo-1505873242700-f289a29e1e0f", "New", "Soshanguve", "Lerato D.", "Own room in shared house, close to campus and taxi rank. Includes WiFi.", { tags: ["room","commune"] }),
  mk("2-Bedroom Apartment - Ga-Rankuwa", 5200, "accommodation", "photo-1493809842364-78817add7a3e", "New", "Ga-Rankuwa", "Sipho N.", "Secure complex with parking. Split with a friend and save.", { tags: ["flat","rent"] }),
  mk("Room in Student Yard - Polokwane", 2200, "accommodation", "photo-1522708323590-d24dbb6b0267", "New", "Polokwane", "Mandla Z.", "Quiet yard, own room with desk. Walking distance to campus.", { tags: ["room","rent"] }),
  mk("Commune Room - eMalahleni", 2500, "accommodation", "photo-1505873242700-f289a29e1e0f", "New", "eMalahleni", "Kabelo S.", "Furnished room, shared kitchen and bathroom. All inclusive.", { tags: ["room","commune"] }),
  mk("Studio Flat - Mbombela", 4200, "accommodation", "photo-1493809842364-78817add7a3e", "New", "Mbombela", "Zanele M.", "Modern studio, prepaid electricity, secure parking. Great for couples.", { tags: ["flat","rent"] }),
  mk("Room Share (2 students) - Pretoria", 1600, "accommodation", "photo-1502672260266-1c1ef2d93688", "New", "Pretoria", "Aisha P.", "Shared room for two friends, budget-friendly. Includes WiFi and water.", { tags: ["room","share"] }),

  /* ===== Services ===== */
  mk("Logo & Poster Design", 250, "services", "photo-1626785774573-4b799315345d", "New", "Pretoria", "Aisha P.", "Custom logo, posters and social media designs for student businesses. 2-day turnaround.", { featured: true, tags: ["design","graphics"] }),
  mk("Programming Assignment Help", 300, "services", "photo-1551434678-e076c223a692", "New", "Pretoria", "Naledi K.", "Python, Java, web dev mentoring. Concept explanation + project guidance.", { verified: true, trending: true, tags: ["programming","tutoring"] }),
  mk("Graduation Photography", 500, "services", "photo-1509909756405-be0199881695", "New", "Ga-Rankuwa", "Sipho N.", "Professional graduation and portrait shoots on campus. Edited photos in 3 days.", { tags: ["photography"] }),
  mk("Sharp Fades Haircuts", 50, "services", "photo-1503951914875-452162b0f3f1", "New", "Polokwane", "Mandla Z.", "Clean fades and styles for TUT gentlemen. Walk-ins welcome on campus.", { tags: ["haircut"] }),
  mk("Custom Cakes & Treats", 350, "services", "photo-1486427944299-d1955d23e34d", "New", "Soshanguve", "Zanele M.", "Custom birthday and event cakes, cupcakes and treats. Order 3 days ahead.", { verified: true, tags: ["baking"] }),
  mk("Maths & Physics Tutoring", 120, "services", "photo-1522202176988-66273c2fd55f", "New", "Soshanguve", "Lerato D.", "1-on-1 tutoring for engineering maths and physics. Pass guaranteed.", { tags: ["tutoring"] }),
  mk("Res Cleaning Service", 200, "services", "photo-1581578731548-c64695cc6952", "New", "Pretoria", "Zanele M.", "Deep clean of your res room or commune. Eco-friendly products.", { tags: ["cleaning"] }),
  mk("Assignment Printing & Binding", 30, "services", "photo-1612815154858-8aa9d7a4fa2b", "New", "Pretoria", "Thabo M.", "Print and bind assignments on campus. Same-day collection.", { tags: ["printing"] }),
  mk("Campus Delivery Service", 30, "services", "photo-1558981806-ec5c2ad2b1b8", "New", "Pretoria", "Daniel K.", "Pick up and deliver items between campuses or nearby shops. Fast and cheap.", { tags: ["delivery"] }),
  mk("Phone & Laptop Repairs", 100, "services", "photo-1605901309584-818e25960a8f", "New", "Ga-Rankuwa", "Sipho N.", "Screen replacements, battery swaps and software fixes. Same-day on most jobs.", { tags: ["repairs"] }),

  /* ===== Accessories ===== */
  mk("Apple Watch SE 44mm", 3200, "accessories", "photo-1523275335684-37898b6baf30", "Like New", "Pretoria", "Naledi K.", "Barely used, includes band and charger. Great for fitness tracking.", { verified: true, tags: ["apple","watch"] }),
  mk("Leather Laptop Backpack", 450, "accessories", "photo-1553062407-98eeb64c6a62", "New", "Soshanguve", "Lerato D.", "Water-resistant backpack with laptop sleeve. Sealed, premium feel.", { tags: ["bag","backpack"] }),
  mk("USB-C Hub 7-in-1", 380, "accessories", "photo-1620336655055-08de55d2b1b8", "New", "Pretoria", "Thabo M.", "HDMI, USB 3.0, SD card reader. Essential for modern laptops.", { tags: ["adapter","usb"] }),
  mk("Wireless Charger Pad", 180, "accessories", "photo-1583863788434-e58a36330cf0", "New", "Ga-Rankuwa", "Sipho N.", "Qi wireless charger, works with most phones. Fast charging.", { tags: ["charger"] }),
  mk("Sunglasses Polarised", 220, "accessories", "photo-1572635196237-34b6b1c3b0d3", "New", "eMalahleni", "Kabelo S.", "UV400 polarised sunglasses, unisex. Comes with case.", { tags: ["sunglasses"] }),
  mk("Phone Ring Holder + Stand", 60, "accessories", "photo-1511707171634-5f897ff02aa9", "New", "Polokwane", "Mandla Z.", "Universal ring grip with kickstand. Multiple colours available.", { tags: ["holder"] }),
  mk("Mechanical Keyboard RGB", 950, "accessories", "photo-1541140532151-b54b6f1a1d2c", "Like New", "Pretoria", "Daniel K.", "Hot-swappable switches, RGB. Great for typing and gaming.", { tags: ["keyboard"] }),
  mk("Laptop Sleeve 14-inch", 150, "accessories", "photo-1553062407-98eeb64c6a62", "New", "Mbombela", "Zanele M.", "Padded waterproof sleeve, fits most 14\" laptops. Sealed.", { tags: ["sleeve","bag"] }),
  mk("Screen Protector Fitting", 50, "accessories", "photo-1511707171634-5f897ff02aa9", "New", "Soshanguve", "Lerato D.", "Tempered glass fitted on your phone, all models. Bubble-free guarantee.", { tags: ["protector"] }),
  mk("Smartwatch Band Set (3)", 120, "accessories", "photo-1523275335684-37898b6baf30", "New", "Pretoria", "Aisha P.", "Three interchangeable bands for Apple Watch / Samsung Watch.", { tags: ["band","watch"] }),

  /* ===== University Merchandise ===== */
  mk("TUT T-Shirt (Pretoria Campus) - Size M", 120, "other", "photo-1521572163474-6864f9cf17ab", "Like New", "Pretoria", "Aisha P.", "Official TUT branded t-shirt, size medium. Worn twice, excellent condition.", { newPrice: 250, tags: ["tshirt","tut","merch"] }),
];

export const BUSINESSES = [
  { id: "b1", name: "Pixel Forge Studio", category: "design", owner: "Aisha Patel", campus: "Pretoria", rating: 4.9, reviews: 64, tagline: "Logos, posters & social media designs for student entrepreneurs", image: img("photo-1626785774573-4b799315345d"), verified: true, sponsored: true },
  { id: "b2", name: "CodeMentor TUT", category: "programming", owner: "Naledi Khumalo", campus: "Pretoria", rating: 5.0, reviews: 92, tagline: "Assignment help, project mentoring & web development", image: img("photo-1551434678-e076c223a692"), verified: true, sponsored: true },
  { id: "b3", name: "Lens & Light Photography", category: "photography", owner: "Sipho Nkosi", campus: "Ga-Rankuwa", rating: 4.8, reviews: 38, tagline: "Graduation, events & portrait photography on campus", image: img("photo-1509909756405-be0199881695"), verified: true, sponsored: false },
  { id: "b4", name: "Fresh Cuts Barbershop", category: "haircuts", owner: "Mandla Zwane", campus: "Polokwane", rating: 4.7, reviews: 121, tagline: "Sharp fades & styles for TUT gentlemen, walk-ins welcome", image: img("photo-1503951914875-452162b0f3f1"), verified: false, sponsored: false },
  { id: "b5", name: "Sweet Treats by Zanele", category: "baking", owner: "Zanele Mahlangu", campus: "Soshanguve", rating: 4.9, reviews: 77, tagline: "Custom cakes, cupcakes & treats for campus events", image: img("photo-1486427944299-d1955d23e34d"), verified: true, sponsored: false },
  { id: "b6", name: "TutMate Tutoring", category: "tutoring", owner: "Lerato Dlamini", campus: "Soshanguve", rating: 4.8, reviews: 54, tagline: "Maths, physics & engineering tutoring — pass guaranteed", image: img("photo-1522202176988-66273c2fd55f"), verified: true, sponsored: false },
];

export const FEATURED_SELLERS = [
  { id: "s1", name: "Naledi Khumalo", faculty: "Information & Communication Technology", campus: "Pretoria", rating: 5.0, sales: 33, avatar: img("photo-1544005313-94ddf0286df2"), verified: true },
  { id: "s2", name: "Lerato Dlamini", faculty: "Engineering", campus: "Soshanguve", rating: 4.7, sales: 41, avatar: img("photo-1438761681033-6461ffad8d80"), verified: true },
  { id: "s3", name: "Thabo Mokoena", faculty: "Information & Communication Technology", campus: "Pretoria", rating: 4.9, sales: 23, avatar: img("photo-1500648767791-00dcc994a43e"), verified: true },
  { id: "s4", name: "Sipho Nkosi", faculty: "Science", campus: "Ga-Rankuwa", rating: 4.8, sales: 12, avatar: img("photo-1506794778202-cad84cf45f1d"), verified: true },
];

export const TESTIMONIALS = [
  { id: "t1", name: "Bongani M.", role: "3rd Year Engineering, Soshanguve", text: "Sold my old textbooks within two days. The TUT-only verification makes it feel safe dealing with other students.", rating: 5, avatar: img("photo-1607990281513-2c110a25bd8c") },
  { id: "t2", name: "Precious N.", role: "2nd Year ICT, Pretoria", text: "Found a MacBook for almost half the store price. The AI price suggestion helped me negotiate fairly.", rating: 5, avatar: img("photo-1546961329-78bef0414d7c") },
  { id: "t3", name: "Daniel K.", role: "Student Entrepreneur, Ga-Rankuwa", text: "My graphic design business got featured and I landed three campus clients in a week. Game changer.", rating: 5, avatar: img("photo-1500648767791-00dcc994a43e") },
  { id: "t4", name: "Aisha P.", role: "1st Year Design, Pretoria", text: "The campus pickup points make meeting buyers safe and easy. Got my iPad cheaper than anywhere.", rating: 5, avatar: img("photo-1438761681033-6461ffad8d80") },
  { id: "t5", name: "Mandla Z.", role: "2nd Year Finance, Polokwane", text: "Listed my old bike in the morning, sold by lunchtime. The chat preview makes negotiations quick.", rating: 4, avatar: img("photo-1502685104226-ee32379fefbe") },
  { id: "t6", name: "Zanele M.", role: "3rd Year Humanities, Mbombela", text: "As a small baking business, the featured listings got me real student customers. Love this platform.", rating: 5, avatar: img("photo-1559548331-f9cb980014e0") },
];

export const FAQS = [
  { q: "Who can use EduTrade?", a: "Any verified student or lecturer from a recognised South African public university or TVET college, using their official institutional email (e.g. @tut4life.ac.za, @uj.ac.za, @up.ac.za). Verification keeps the community safe and trusted." },
  { q: "How do I verify my student status?", a: "When you sign up with your university email, we automatically detect your institution and send a one-time code to confirm it. Once verified, you get a Verified Student badge on your profile and listings." },
  { q: "Is it safe to buy and sell here?", a: "We recommend meeting buyers and sellers at verified campus pickup points. Our AI scam detection also flags risky listings before you message a seller." },
  { q: "How much does it cost to list an item?", a: "Listing is completely free. EduTrade only takes a small 3–5% service fee on completed sales — you keep the vast majority of your money." },
  { q: "Can I list a service or business?", a: "Yes! You can list education-related services like tutoring, printing and repairs, or apply to feature your student-run business in the directory." },
  { q: "Which universities are supported?", a: "All major SA public universities (TUT, UJ, UP, Wits, Stellenbosch, UKZN, UNISA and more) plus selected public TVET colleges. New institutions are added regularly." },
];

export const ANNOUNCEMENTS = [
  { id: "an1", title: "New campus pickup points launched", date: "15 July", body: "Meet safely at verified pickup zones at all six TUT campuses.", tone: "primary" },
  { id: "an2", title: "AI Scam Detection now live", date: "10 July", body: "Our AI now flags risky listings before you message a seller.", tone: "accent" },
  { id: "an3", title: "Back-to-class textbook sale", date: "5 July", body: "Save up to 60% on second-hand textbooks from verified students.", tone: "emerald" },
];

export const STATS = [
  { label: "Verified Students", value: 50000, suffix: "+", display: "50,000+" },
  { label: "Products Listed", value: 5000, suffix: "+", display: "5,000+" },
  { label: "Campuses Covered", value: 100, suffix: "+", display: "100+" },
  { label: "Student Satisfaction", value: 99, suffix: "%", display: "99%" },
];

export const REVIEWS_SAMPLE = [
  { id: "r1", name: "Karabo M.", rating: 5, date: "2 weeks ago", text: "Smooth transaction, item exactly as described. Seller was responsive on chat." },
  { id: "r2", name: "Refilwe T.", rating: 4, date: "1 month ago", text: "Good communication and fair price. Pickup at campus was convenient." },
  { id: "r3", name: "Tshepo L.", rating: 5, date: "1 month ago", text: "Highly recommend this seller. Quick replies and very professional." },
];

export const AI_SUGGESTIONS = {
  description: "This barely-used item is in excellent condition, ideal for a fellow TUT student. It has been well maintained with no scratches or faults. Perfect for campus life — reliable, portable and study-ready. Collection available at TUT campus, or delivery can be arranged. Price is slightly negotiable for verified students.",
  priceNote: "Based on similar listings, a fair market price is between R8,200 and R9,500. Listed price of R9,200 is in the upper range — consider marking as negotiable to attract faster offers.",
  category: "electronics",
};
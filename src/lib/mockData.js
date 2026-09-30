// Local demo data. The app runs entirely on this when Base44 is not
// configured (the default) so the site is always fully functional out of
// the box for the JGA presentation.

export const CAMPUSES = [
  'Pretoria (Main)', 'Soshanguve North', 'Soshanguve South', 'Arcadia', 'eMalahleni', 'Polokwane',
];

export const CATEGORIES = [
  { id: 'laptops', name: 'Laptops', icon: '💻', count: 42 },
  { id: 'phones', name: 'Phones', icon: '📱', count: 31 },
  { id: 'tablets', name: 'Tablets', icon: '📲', count: 18 },
  { id: 'textbooks', name: 'Textbooks', icon: '📚', count: 96 },
  { id: 'study-materials', name: 'Study Materials', icon: '📝', count: 54 },
  { id: 'calculators', name: 'Calculators', icon: '🧮', count: 27 },
  { id: 'electronics', name: 'Electronics & Accessories', icon: '🔌', count: 39 },
  { id: 'other', name: 'Other Academic Tech', icon: '🎒', count: 15 },
];

export const LISTINGS = [
  { id: 1, title: 'Dell Latitude 5410 — i5, 8GB RAM', category: 'laptops', price: 4200, condition: 'Used – Good', campus: 'Soshanguve North', seller: 'Katekani S.', verified: true, rating: 4.9, desc: 'Reliable laptop for coding and coursework. Battery holds ~3 hours, comes with charger.', image: '/images/laptop-dell-01.jpg' },
  { id: 2, title: 'Engineering Mathematics N4 Textbook', category: 'textbooks', price: 180, condition: 'Good', campus: 'Pretoria (Main)', seller: 'Lindiwe M.', verified: true, rating: 4.8, desc: 'Barely used, no torn pages. Covers the full N4 syllabus.', image: '/images/textbook-math-01.jpg' },
  { id: 3, title: 'Samsung Galaxy Tab A8', category: 'tablets', price: 2600, condition: 'Like New', campus: 'Arcadia', seller: 'Tumi N.', verified: true, rating: 4.7, desc: 'Great for note-taking and reading PDFs, includes stylus.', image: '/images/tablet-samsung-01.jpg' },
  { id: 4, title: 'Casio FX-991ZA PLUS Calculator', category: 'calculators', price: 220, condition: 'Like New', campus: 'Soshanguve North', seller: 'Blessing S.', verified: true, rating: 4.9, desc: 'Used one semester only, comes with manual and box.', image: '/images/calculator-casio-01.jpg' },
  { id: 5, title: 'iPhone 12 — 64GB', category: 'phones', price: 5400, condition: 'Used – Good', campus: 'Pretoria (Main)', seller: 'Ayanda P.', verified: false, rating: 4.5, desc: 'Small crack on back glass, screen and battery in great shape.', image: '/images/phone-iphone-01.jpg' },
  { id: 6, title: 'Data Structures & Algorithms Textbook', category: 'textbooks', price: 250, condition: 'Good', campus: 'Soshanguve South', seller: 'Rethabile M.', verified: true, rating: 4.7, desc: 'Covers CGAF05 syllabus fully, minor highlighting inside.', image: '/images/textbook-dsa-01.jpg' },
  { id: 7, title: '27" Monitor — 75Hz, HDMI', category: 'electronics', price: 1900, condition: 'Good', campus: 'Pretoria (Main)', seller: 'Nomsa T.', verified: true, rating: 4.6, desc: 'Crisp display, ideal for a dual-monitor coding setup.', image: '/images/monitor-27-01.jpg' },
  { id: 8, title: 'Full Semester Handwritten Study Notes — IT1114', category: 'study-materials', price: 90, condition: 'Digital + Print', campus: 'Soshanguve North', seller: 'Mpho D.', verified: true, rating: 4.8, desc: 'Detailed notes that carried me to a distinction — includes past exam breakdowns.', image: '/images/notes-study-01.jpg' },
];

export const FAQS = [
  { q: 'Who can use EduTrade?', a: 'Any currently registered TUT student or lecturer. Accounts are verified against a TUT email address (@tut4life.ac.za or @tut.ac.za) in the demo flow.' },
  { q: 'What can I sell?', a: 'Academic and student-related technology only — laptops, phones, tablets, textbooks, study materials, calculators, and study electronics/accessories. General or unrelated items aren\u2019t permitted.' },
  { q: 'How do I create a listing?', a: 'Go to "Sell an Item", fill in the product details, condition, price and campus, add photos, and submit. Your listing appears in Marketplace once published.' },
  { q: 'How do I contact a seller?', a: 'Open any listing and use "Message Seller" to start a conversation in the Messages tab — no phone numbers are shared until you choose to.' },
  { q: 'How are users verified?', a: 'In the full version, sign-up requires a TUT student or staff email. This demo simulates that check without a live mail server.' },
  { q: 'How do I report a listing?', a: 'Every product page has a "Report Listing" link. Reports go to the Admin dashboard for review.' },
];

export const STATS = { activeStudents: 3482, listings: 812, successfulConnections: 1204, verifiedSellers: 640 };

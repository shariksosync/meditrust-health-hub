export const company = {
  name: "MEDITRUST LIFE SCIENCE PVT LTD",
  phone: "+91 7276048377",
  email: "office@meditrusts.life",
  address: "Morya Colony, Matoshree Nagar, Sector No. 32, Chinchwad, Pimpri-Chinchwad, Maharashtra 411033, India",
  directors: ["Ajay Kumar Pathri", "Omkar Sanjay Telangi"],
};

export const categories = [
  { name: "Prescription medicines", slug: "prescription-medicines", icon: "rx", tint: "mint", description: "Prescription-only demonstration products." },
  { name: "OTC medicines", slug: "otc-medicines", icon: "bottle", tint: "blue", description: "Everyday over-the-counter essentials." },
  { name: "Vitamins & supplements", slug: "vitamins-supplements", icon: "sun", tint: "yellow", description: "Everyday nutrition and wellness." },
  { name: "Diabetes care", slug: "diabetes-care", icon: "drop", tint: "rose", description: "Monitoring and daily care essentials." },
  { name: "Women's health", slug: "womens-health", icon: "flower", tint: "pink", description: "Thoughtful everyday wellness." },
  { name: "Baby care", slug: "baby-care", icon: "heart", tint: "peach", description: "Gentle essentials for little ones." },
  { name: "Personal care", slug: "personal-care", icon: "sparkle", tint: "lavender", description: "Care for skin, hair and more." },
  { name: "Medical devices", slug: "medical-devices", icon: "monitor", tint: "blue", description: "At-home health monitoring devices." },
  { name: "Nutrition & wellness", slug: "nutrition-wellness", icon: "leaf", tint: "mint", description: "Wellness for everyday routines." },
  { name: "First aid", slug: "first-aid", icon: "plus", tint: "rose", description: "Useful first-response supplies." },
];

const productSeed = [
  ["Daily multivitamin tablets", "Vitamins & supplements", "WellSpring", "30 tablets", 249],
  ["Vitamin C chewable tablets", "Vitamins & supplements", "NutriDay", "20 tablets", 179],
  ["Vitamin D3 softgel capsules", "Vitamins & supplements", "VitaLeaf", "15 capsules", 199],
  ["Omega 3 fish oil capsules", "Vitamins & supplements", "WellSpring", "30 capsules", 399],
  ["Electrolyte drink powder", "OTC medicines", "HydraCare", "5 sachets", 99],
  ["Digital thermometer", "Medical devices", "CareSense", "1 unit", 199],
  ["Automatic blood pressure monitor", "Medical devices", "CareSense", "1 unit", 1499],
  ["Finger pulse oximeter", "Medical devices", "CareSense", "1 unit", 899],
  ["Reusable hot water bag", "First aid", "ComfortPlus", "1 unit", 299],
  ["Sterile gauze dressing pads", "First aid", "MediBasics", "10 pads", 119],
  ["Adhesive bandage strips", "First aid", "MediBasics", "20 strips", 89],
  ["Antiseptic solution", "First aid", "CleanCare", "100 ml", 110],
  ["Gentle moisturizing lotion", "Personal care", "DermaDaily", "200 ml", 285],
  ["Daily sunscreen SPF 30", "Personal care", "SunKind", "50 g", 349],
  ["Mild cleansing face wash", "Personal care", "PureSkin", "100 ml", 225],
  ["Nourishing shampoo", "Personal care", "RootKind", "180 ml", 240],
  ["Baby gentle wash", "Baby care", "LittleLeaf", "200 ml", 259],
  ["Baby moisturizing cream", "Baby care", "LittleLeaf", "100 g", 199],
  ["Cotton baby diapers", "Baby care", "SoftNest", "Pack of 20", 499],
  ["Reusable menstrual heat patch", "Women's health", "ComfortPlus", "2 patches", 149],
  ["Digital weighing scale", "Medical devices", "CareSense", "1 unit", 799],
  ["Glucometer starter kit", "Diabetes care", "CareSense", "1 kit", 999],
  ["Glucose test strips", "Diabetes care", "CareSense", "25 strips", 449],
  ["Insulated water bottle", "Nutrition & wellness", "EveryDay", "750 ml", 399],
  ["Protein nutrition powder", "Nutrition & wellness", "NutriDay", "500 g", 699],
  ["Herbal green tea", "Nutrition & wellness", "Leaf & Cup", "25 bags", 225],
  ["Saline nasal spray", "OTC medicines", "BreatheWell", "20 ml", 125],
  ["Soothing throat lozenges", "OTC medicines", "BreatheWell", "10 lozenges", 65],
  ["Prescription medicine sample A", "Prescription medicines", "Demo Pharma", "10 tablets", 120],
  ["Prescription medicine sample B", "Prescription medicines", "Demo Pharma", "15 capsules", 185],
];

export const products = productSeed.map(([name, category, brand, pack, price], index) => ({
  id: `MT-${String(index + 101).padStart(4, "0")}`,
  name,
  category,
  brand,
  pack,
  price,
  mrp: Math.round(price * (index % 3 === 0 ? 1.24 : 1.14)),
  image: ["photo-1584308666744-24d5c474f2ae", "photo-1607619056574-7b8d3ee536b2", "photo-1556229010-6c3f2c9ca5f8", "photo-1576091160399-112ba8d25d1d"][index % 4],
  prescription: category === "Prescription medicines",
  featured: index < 8,
  visible: true,
  stock: 12 + ((index * 7) % 46),
  description: "A demonstration product listing. Product information is illustrative and not medical advice.",
}));

export const labTests = [
  { id: "cbc", name: "Complete Blood Count", category: "Wellness", price: 399, sample: "Blood sample", prep: "No special preparation is listed in this demonstration.", description: "A sample diagnostic service listing for general wellness." },
  { id: "thyroid-profile", name: "Thyroid Profile", category: "Hormones", price: 599, sample: "Blood sample", prep: "Preparation guidance varies; confirm with a real provider.", description: "A demonstration thyroid panel listing." },
  { id: "diabetes-screening", name: "Diabetes Screening", category: "Metabolic health", price: 499, sample: "Blood sample", prep: "Preparation guidance varies; confirm with a real provider.", description: "A demonstration screening package listing." },
  { id: "vitamin-profile", name: "Vitamin Profile", category: "Nutrition", price: 1099, sample: "Blood sample", prep: "Preparation guidance varies; confirm with a real provider.", description: "A sample vitamin-level panel listing." },
  { id: "wellness-checkup", name: "General Wellness Checkup", category: "Wellness", price: 1499, sample: "Blood and urine samples", prep: "Preparation guidance varies; confirm with a real provider.", description: "A demonstration multi-test wellness package listing." },
  { id: "lipid-profile", name: "Lipid Profile", category: "Heart health", price: 549, sample: "Blood sample", prep: "Preparation guidance varies; confirm with a real provider.", description: "A sample lipid panel listing." },
  { id: "liver-panel", name: "Liver Function Panel", category: "Wellness", price: 699, sample: "Blood sample", prep: "Preparation guidance varies; confirm with a real provider.", description: "A demonstration liver panel listing." },
  { id: "kidney-panel", name: "Kidney Function Panel", category: "Wellness", price: 649, sample: "Blood sample", prep: "Preparation guidance varies; confirm with a real provider.", description: "A demonstration kidney panel listing." },
];

export const specialties = ["General Physician", "Dermatology", "Pediatrics", "Gynecology", "Orthopedics", "Mental Wellness"];
export const doctors = specialties.map((specialty, index) => ({
  id: `demo-doctor-${index + 1}`,
  name: `Demo Physician ${String(index + 1).padStart(2, "0")}`,
  specialty,
  mode: index % 2 ? "Video" : "Phone",
  fee: 199 + index * 50,
  slots: ["10:30 AM", "12:00 PM", "4:30 PM"],
  description: "Example profile only. This is not a verified healthcare professional or available consultation.",
}));

export const articles = [
  ["Building a balanced everyday wellness routine", "Everyday health", "5 min"],
  ["Understanding the basics of preventive health checks", "Prevention", "6 min"],
  ["A practical guide to reading product labels", "Wellness", "4 min"],
  ["Simple habits that support good sleep hygiene", "Lifestyle", "5 min"],
  ["Everyday hydration: small habits that help", "Lifestyle", "3 min"],
  ["Getting ready for a routine health appointment", "Prevention", "4 min"],
  ["Creating a calm personal-care routine", "Personal care", "4 min"],
  ["Preparing questions for a healthcare professional", "Everyday health", "5 min"],
  ["Keeping a useful home first-aid kit", "Wellness", "3 min"],
  ["How to organize your family's health documents", "Everyday health", "4 min"],
].map(([title, category, readingTime], index) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  title, category, readingTime,
  author: "MEDITRUST Editorial (demonstration)",
  excerpt: "General educational information to help you have more informed conversations about your health.",
  image: ["photo-1505751172876-fa1923c5c528", "photo-1490645935967-10de6ba17061", "photo-1512621776951-a57141f2eefd"][index % 3],
  body: "This general information is provided for educational purposes only. Every person's needs are different. Speak with a qualified healthcare professional for individual advice. This demonstration website does not provide medical diagnosis or treatment.",
}));

export const offers = [
  { code: "WELCOME10", label: "A little welcome", description: "10% off demonstration product totals over ₹499", type: "percent", value: 10, minimum: 499, active: true },
  { code: "CARE50", label: "Everyday care", description: "₹50 off a demonstration cart over ₹799", type: "fixed", value: 50, minimum: 799, active: true },
  { code: "WELLNESS15", label: "Wellness essentials", description: "15% off a demonstration cart over ₹999", type: "percent", value: 15, minimum: 999, active: true },
  { code: "MINT5", label: "A fresh start", description: "5% off a demonstration cart over ₹299", type: "percent", value: 5, minimum: 299, active: true },
  { code: "DEMO100", label: "Demo savings", description: "₹100 off demonstration items over ₹1,499", type: "fixed", value: 100, minimum: 1499, active: true },
];

export const faqs = [
  ["Is MEDITRUST accepting real medicine orders?", "No. This is a frontend demonstration. It does not dispense or fulfill medicines."],
  ["Are the lab tests bookable?", "No. Lab listings and booking steps are examples only. No laboratory integration is connected."],
  ["Can I speak with a doctor here?", "No. Doctor profiles and appointment slots are clearly labeled demonstrations."],
  ["Are payments processed?", "No. Checkout is a simulated flow; no payment is collected."],
  ["Is my account secure?", "Sign-in is a local prototype only and is not production authentication. Do not use a real password."],
  ["How are demo prices determined?", "All listed product, test and consultation prices are illustrative and are not an offer for sale."],
];

export const defaultSettings = {
  announcement: "Your Health, Our Priority — Explore Convenient Healthcare Services",
  announcementVisible: true,
  heroTitle: "Healthcare made simple, safe & accessible",
  heroSubtitle: "Medicines, diagnostics, wellness essentials and healthcare services — designed around your needs.",
  heroPrimaryText: "Explore medicines",
  heroSecondaryText: "Book lab tests",
  heroImage: "",
  companyName: company.name,
  phone: company.phone,
  email: company.email,
  address: company.address,
};

export const adminSections = [
  ["Overview", "/admin/dashboard"], ["Products", "/admin/products"], ["Categories", "/admin/categories"],
  ["Orders", "/admin/orders"], ["Lab tests", "/admin/lab-tests"], ["Doctors", "/admin/doctors"],
  ["Appointments", "/admin/appointments"], ["Articles", "/admin/articles"], ["Banners", "/admin/banners"],
  ["Offers", "/admin/offers"], ["Customers", "/admin/customers"], ["FAQs", "/admin/faqs"],
  ["Pages", "/admin/pages"], ["Navigation", "/admin/navigation"], ["Contact settings", "/admin/contact-settings"], ["Site settings", "/admin/site-settings"],
];
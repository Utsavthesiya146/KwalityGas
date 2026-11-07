import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Kwality Gas Database Seeding ---');

  // 1. Admin User
  const adminEmail = 'admin@kwalitygas.com';
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('KwalityAdmin@2026', 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Kwality Superadmin',
        role: 'SUPERADMIN',
      },
    });
    console.log('Created Superadmin user: admin@kwalitygas.com');
  }

  // 2. Product Categories
  const categoriesData = [
    { name: 'LPG Cylinders', slug: 'cylinders', description: 'Domestic, Commercial and Industrial LPG Cylinders in varied capacities.', displayOrder: 1 },
    { name: 'Gas Geysers & Heaters', slug: 'water-heaters', description: 'High-efficiency eco-friendly LPG Gas Water Heaters.', displayOrder: 2 },
    { name: 'Accessories & Safety Devices', slug: 'accessories', description: 'Certified ISI Regulators, high-pressure tubing, and gas-saving devices.', displayOrder: 3 },
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    const c = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = c.id;
  }
  console.log('Created Product Categories');

  // 3. Products
  const products = [
    {
      name: 'Kwality Gas Water Heater (Gas Geyser)',
      slug: 'kwality-gas-water-heater',
      categoryId: categoryMap['water-heaters'],
      capacity: '6L / 7L / 10L Instantaneous',
      shortDesc: 'Initially we have launched "Kwality Gas Water Heater" which again is an eco friendly product.',
      description: 'The Kwality Gas Water Heater is engineered for high energy efficiency, instant heating, and utmost household safety. Designed to operate smoothly even under low water pressure.',
      imageUrl: '/images/original/gas.jpg',
      isDomestic: true,
      isCommercial: true,
      isIndustrial: false,
      features: JSON.stringify([
        'Low water pressure starting',
        'Double ignition pin, automatic electrical pulse ignition device',
        'Over water pressure protection device',
        'Flame failure safety device',
        'Anti-dry combustion protection device',
        'Winter-Summer switch option for gas saving',
        '20-Minute safety timer',
        '12 Months comprehensive warranty'
      ]),
      specifications: JSON.stringify({
        'Ignition Type': 'Automatic Electrical Pulse Ignition (Double Pin)',
        'Water Pressure': 'Low Water Pressure Starting Capability',
        'Safety Devices': 'Flame Failure, Over Water Pressure, Anti-Dry Combustion',
        'Energy Control': 'Winter-Summer Gas Regulating Switch',
        'Auto Cut-Off': '20-Minute Built-in Safety Timer',
        'Warranty': '12 Months Comprehensive Warranty'
      }),
      displayOrder: 1,
    },
    {
      name: '33.0 Kgs Industrial LPG Cylinder',
      slug: '33kg-industrial-lpg-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '33.0 Kgs',
      shortDesc: 'Heavy-duty industrial LPG cylinder designed for factories, furnaces, manufacturing plants, and high-volume commercial kitchens.',
      description: 'Our flagship industrial fuel container offers maximum capacity and extended runtime, significantly reducing cylinder changeover downtime and optimizing production output.',
      imageUrl: '/images/original/1433.png',
      isDomestic: false,
      isCommercial: true,
      isIndustrial: true,
      features: JSON.stringify([
        'High discharge rate for intense heat applications',
        'Reduces frequency of cylinder replacements in high-demand environments',
        'Supported by Kwality manifold bank engineering support',
        '100% verified pure blue flame with zero soot deposits'
      ]),
      specifications: JSON.stringify({
        'Capacity': '33.0 Kgs Net LPG',
        'Recommended For': 'Furnaces, Powder Coating, Heavy Food Catering, Large Hotels',
        'Valve Type': 'Compact High-Flow Regulated Industrial Valve',
        'Test Pressure': 'As per IS 3196 standards',
        'Refill Tariff': '₹5,037.00 (Karnataka WEF 06-10-2026)'
      }),
      displayOrder: 2,
    },
    {
      name: '21.0 Kgs Commercial LPG Cylinder',
      slug: '21kg-commercial-lpg-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '21.0 Kgs',
      shortDesc: 'Engineered specifically for commercial kitchens, mid-size restaurants, and bakeries requiring continuous high heat.',
      description: 'A dedicated commercial cooking cylinder engineered to deliver superior thermal efficiency and quick burner ignition, lowering operating expenses for food businesses.',
      imageUrl: '/images/original/dars2.png',
      isDomestic: false,
      isCommercial: true,
      isIndustrial: false,
      features: JSON.stringify([
        'Optimized for commercial multi-burner cooking ranges',
        'Faster working temperature achievement',
        'Less heat dissipation, keeping busy kitchens cooler'
      ]),
      specifications: JSON.stringify({
        'Capacity': '21.0 Kgs Net LPG',
        'Target Segment': 'Commercial Establishments, Restaurants, Sweet Stalls',
        'GST Rate': '18% Commercial GST applicable'
      }),
      displayOrder: 3,
    },
    {
      name: '17.0 Kgs Commercial LPG Cylinder',
      slug: '17kg-commercial-lpg-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '17.0 Kgs',
      shortDesc: 'The versatile commercial workhorse for hotels, restaurants, caterers (HORECA) and poultry farms.',
      description: 'Widely preferred across Karnataka and Tamil Nadu for reliable and cost-effective heating and cooking.',
      imageUrl: '/images/original/dar17.png',
      isDomestic: false,
      isCommercial: true,
      isIndustrial: false,
      features: JSON.stringify([
        'High calorific efficiency with clean burn',
        'Easy mobility and ergonomic safety valve guard',
        'Prompt doorstep supply accessible 7 days a week'
      ]),
      specifications: JSON.stringify({
        'Capacity': '17.0 Kgs Net LPG',
        'Target Segment': 'HORECA (Hotels, Restaurants, Catering), Poultry Heating',
        'Refill Tariff': '₹2,595.00 (Karnataka WEF 06-10-2026)'
      }),
      displayOrder: 4,
    },
    {
      name: '15.0 Kgs Dual Commercial & Domestic Cylinder',
      slug: '15kg-lpg-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '15.0 Kgs',
      shortDesc: 'Popular mid-weight cylinder versatile for high-consumption households and commercial canteens.',
      description: 'Provides generous cooking hours with robust safety standards.',
      imageUrl: '/images/original/dom1.png',
      isDomestic: true,
      isCommercial: true,
      isIndustrial: false,
      features: JSON.stringify([
        'High capacity for large households or fast-paced domestic kitchens',
        'Eco-friendly and non-polluting fuel alternative to traditional firewood/kerosene'
      ]),
      specifications: JSON.stringify({
        'Capacity': '15.0 Kgs Net LPG',
        'Application': 'Domestic Large Families & Small Commercial Outlets'
      }),
      displayOrder: 5,
    },
    {
      name: '12.0 Kgs Domestic LPG Cylinder',
      slug: '12kg-domestic-lpg-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '12.0 Kgs',
      shortDesc: 'Kwality Gas flagship household connection cylinder for every domestic family.',
      description: 'Kwality Gas was conceived to provide every household with a dependable, clean cooking gas connection. Clean blue flame leaves cookware soot-free and cooks food faster.',
      imageUrl: '/images/original/dom2.png',
      isDomestic: true,
      isCommercial: false,
      isIndustrial: false,
      features: JSON.stringify([
        'Eco-friendly and non-polluting fuel',
        'Cost-effective and highly efficient',
        'Rapid burner working temperature saves cooking time',
        'Kitchen remains cooler, utensils remain cleaner',
        'Doorstep delivery backed by friendly marketing service'
      ]),
      specifications: JSON.stringify({
        'Capacity': '12.0 Kgs Net LPG',
        'Target Segment': 'Domestic Household Consumers',
        'GST Rate': '5% Domestic GST',
        'Refill Tariff': '₹1,702.00 (Karnataka WEF 06-10-2026)'
      }),
      displayOrder: 6,
    },
    {
      name: '5.5 Kgs Domestic Cylinder for Small Families',
      slug: '5-5kg-domestic-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '5.5 Kgs',
      shortDesc: 'Compact, safe, and convenient cylinder designed for small families, bachelors, and compact urban kitchens.',
      description: 'Lightweight and easy to carry, ideal for space-constrained households.',
      imageUrl: '/images/original/dom3.png',
      isDomestic: true,
      isCommercial: false,
      isIndustrial: false,
      features: JSON.stringify([
        'Ultra-portable and easy to connect',
        'Perfect for nuclear families, students, and single professionals',
        'Same high-purity blue flame standard'
      ]),
      specifications: JSON.stringify({
        'Capacity': '5.5 Kgs Net LPG',
        'Segment': 'Small Families & Single Households'
      }),
      displayOrder: 7,
    },
    {
      name: '4.0 Kgs Cook & Light Domestic Cylinder',
      slug: '4kg-cook-and-light-cylinder',
      categoryId: categoryMap['cylinders'],
      capacity: '4.0 Kgs',
      shortDesc: 'Multi-purpose portable cylinder for cooking, domestic lighting fixtures, and outdoor emergency fuel backup.',
      description: 'Convenient size offering immediate fuel for rural kitchens, domestic light burners, and secondary household connections.',
      imageUrl: '/images/original/k5.jpg',
      isDomestic: true,
      isCommercial: false,
      isIndustrial: false,
      features: JSON.stringify([
        'Dual utility: Cooking burner & lighting burner compatible',
        'Economical refill price point (₹617.00)',
        'Compact vertical footprint'
      ]),
      specifications: JSON.stringify({
        'Capacity': '4.0 Kgs Net LPG',
        'Refill Tariff': '₹617.00 (Karnataka WEF 06-10-2026)',
        'Utility': 'Cooking & Light'
      }),
      displayOrder: 8,
    },
    {
      name: 'Certified Domestic LPG Pressure Regulator',
      slug: 'domestic-lpg-pressure-regulator',
      categoryId: categoryMap['accessories'],
      capacity: 'Standard 25.6mm Valve Collar',
      shortDesc: 'ISI marked precision pressure reduction regulator with high-security auto-locking bush collar.',
      description: 'Engineered to maintain strict low-pressure domestic gas flow to cooking stoves, with visual ON/OFF locking knob.',
      imageUrl: '/images/original/g2.jpg',
      isDomestic: true,
      isCommercial: false,
      isIndustrial: false,
      features: JSON.stringify([
        'Approved ISI Quality standard certification',
        'Audible click locking bush mechanism',
        'Heavy-duty brass valve pin for leak-free seal'
      ]),
      specifications: JSON.stringify({
        'Inlet Diameter': '25.6mm Standard Domestic',
        'Outlet Pressure': '28 - 30 mbar',
        'Standard': 'IS 9798 Certified'
      }),
      displayOrder: 9,
    },
    {
      name: 'Reinforced Safety Gas Tubing & Valves',
      slug: 'safety-gas-tubing-accessories',
      categoryId: categoryMap['accessories'],
      capacity: '1.5m Standard Length',
      shortDesc: 'Flame-retardant, rat-proof steel-wire reinforced rubber tubing with ISI mark.',
      description: 'Recommended replacement every 2 years as per safety regulations. Heat-resistant and leak-tested.',
      imageUrl: '/images/original/g3.jpg',
      isDomestic: true,
      isCommercial: true,
      isIndustrial: false,
      features: JSON.stringify([
        'Mandatory ISI Mark certification',
        'Max 1.5m optimal safety length',
        'Abrasion and heat resistant outer layer'
      ]),
      specifications: JSON.stringify({
        'Length': '1.5 Metres Maximum Safety Length',
        'Material': 'Reinforced Synthetic Rubber with Wire Mesh',
        'Safety Standard': 'IS 9573'
      }),
      displayOrder: 10,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Seeded ${products.length} Products`);

  // 4. Price Lists
  const karnatakaNotes = `1. Delivery charges as applicable based on the location & distance from Dealer shop.\n2. GST : For Domestic Cylinders- 5% and for others (17 Kgs, 15 Kgs, 5.5Kgs, 4 Kgs) 18%. Using Domestic Cylinders for commercial use will be penalized as per law.\n3. Applicable price for the product will be based on prevailing price of LPG as per international market and as decided by the company from time to time.\n4. The price indicated is subject to change from time to time. Hence, the price as applicable at the time of the dispatch would be charged.\n5. The above price is inclusive of all tax.`;

  const stateKA = await prisma.priceListState.upsert({
    where: { stateCode: 'KA' },
    update: {
      stateName: 'Karnataka',
      effectiveDate: 'October, 2026',
      wefNotice: 'WEF 06-10-2026',
      notes: karnatakaNotes,
      displayOrder: 1,
    },
    create: {
      stateCode: 'KA',
      stateName: 'Karnataka',
      effectiveDate: 'October, 2026',
      wefNotice: 'WEF 06-10-2026',
      notes: karnatakaNotes,
      displayOrder: 1,
    },
  });

  const stateTN = await prisma.priceListState.upsert({
    where: { stateCode: 'TN' },
    update: {
      stateName: 'Tamilnadu',
      effectiveDate: 'February, 2026',
      wefNotice: 'WEF 03-02-2026',
      notes: karnatakaNotes,
      displayOrder: 2,
    },
    create: {
      stateCode: 'TN',
      stateName: 'Tamilnadu',
      effectiveDate: 'February, 2026',
      wefNotice: 'WEF 03-02-2026',
      notes: karnatakaNotes,
      displayOrder: 2,
    },
  });

  // KA Items
  const kaItems = [
    { capacity: '33.0 Kgs Refill', amount: 5037.00, isRefill: true, isDomestic: false, displayOrder: 1 },
    { capacity: '21.0 Kgs Refill', amount: 3205.00, isRefill: true, isDomestic: false, displayOrder: 2 },
    { capacity: '17.0 Kgs Refill', amount: 2595.00, isRefill: true, isDomestic: false, displayOrder: 3 },
    { capacity: '15.0 Kgs Refill', amount: null, isRefill: true, isDomestic: false, notes: 'Quote on request', displayOrder: 4 },
    { capacity: '12.0 Kgs Refill (Domestic)', amount: 1702.00, isRefill: true, isDomestic: true, displayOrder: 5 },
    { capacity: '5.5 Kgs Refill', amount: null, isRefill: true, isDomestic: true, notes: 'Quote on request', displayOrder: 6 },
    { capacity: '4.0 Kgs Refill', amount: 617.00, isRefill: true, isDomestic: true, displayOrder: 7 },
  ];

  // KA Items
  const kaCount = await prisma.priceListItem.count({ where: { stateId: stateKA.id } });
  if (kaCount === 0) {
    for (const it of kaItems) {
      await prisma.priceListItem.create({
        data: { ...it, stateId: stateKA.id },
      });
    }
  }

  // TN Items
  const tnCount = await prisma.priceListItem.count({ where: { stateId: stateTN.id } });
  if (tnCount === 0) {
    for (const it of tnItems) {
      await prisma.priceListItem.create({
        data: { ...it, stateId: stateTN.id },
      });
    }
  }
  console.log('Seeded / Verified State Price Lists (Karnataka & Tamil Nadu)');

  // 5. Testimonials (All 8 verified customer statements - non-destructive)
  const existingTestiCount = await prisma.testimonial.count();
  if (existingTestiCount === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`Seeded ${testimonials.length} Testimonials`);
  } else {
    console.log(`Preserved ${existingTestiCount} existing Testimonials`);
  }

  // 6. Awards (non-destructive)
  const existingAwardCount = await prisma.award.count();
  if (existingAwardCount === 0) {
    await prisma.award.create({
      data: {
        title: 'Business Excellence & Achievement Awards 2015',
        year: '2015',
        issuingBody: 'Business Excellence Forum & National LPG Industry Association',
        certificateImg: '/images/original/kwality-gas-certificate.jpg',
        trophyImg: '/images/original/kwality-gas-award.jpg',
        description: 'Awarded to Kwality Gas Bottlers Private Limited in recognition of outstanding quality standards, continuous infrastructure growth, prompt customer service, and Grade 1 credit rating.',
        displayOrder: 1,
      },
    });
    console.log('Seeded Awards');
  } else {
    console.log(`Preserved ${existingAwardCount} existing Awards`);
  }
  console.log('Seeded Awards');

  // 7. Services (4 Audited Pillars)
  const services = [
    {
      title: 'Service & Prompt Doorstep Delivery',
      slug: 'service-and-delivery',
      shortDesc: 'Delivering products to customers on time everytime, wherever they may be located.',
      fullContent: 'The main force that drives Kwality Gas is its emphasis on quality product, quality service. It means delivering products to customers on time everytime, wherever they may be located, training manpower to always perform beyond expectations and maintaining an unmatched delivery network.',
      imageUrl: '/images/original/service_style_11.jpg',
      icon: 'Truck',
      displayOrder: 1,
    },
    {
      title: 'Service With No Compromise',
      slug: 'service-no-compromise',
      shortDesc: 'Workforce well trained in every aspect of LPG distribution, safety, and customer care.',
      fullContent: 'The company’s workforce is well trained in every aspect of LPG distribution, maintenance and safety. They are also kept abreast of international trends in the market and oriented to be receptive to the customer’s needs.',
      imageUrl: '/images/original/service_style_12.jpg',
      icon: 'ShieldCheck',
      displayOrder: 2,
    },
    {
      title: 'Committed to the Environment',
      slug: 'committed-to-environment',
      shortDesc: 'Expanding rural LPG adoption to reduce deforestation and air pollution.',
      fullContent: 'Making LPG available in rural areas and in the process reducing deforestation and pollution. Creating and implementing indirect employment opportunities thereby contributing directly & indirectly to the welfare of the society.',
      imageUrl: '/images/original/BBOQ8.png',
      icon: 'Leaf',
      displayOrder: 3,
    },
    {
      title: 'The Future Fuelled with Promise',
      slug: 'future-fuelled-with-promise',
      shortDesc: 'Replacing dirty legacy fuels with cleaner, superior, highly efficient LPG.',
      fullContent: 'The end result being to replace traditional fuels like wood, furnace oil, kerosene, and LDO/HDO with a definitely superior alternative: pure blue-flame Kwality LPG.',
      imageUrl: '/images/original/service_style_16.jpg',
      icon: 'Flame',
      displayOrder: 4,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded ${services.length} Services`);

  // 8. Gallery Categories & Images
  const galleryCats = [
    { name: 'Regulators & Safety Devices', slug: 'regulators' },
    { name: 'Water Heaters & Geysers', slug: 'heaters' },
    { name: 'LPG Cylinders Range', slug: 'cylinders' },
    { name: 'Bottling Plants & Fleet', slug: 'plants' },
  ];

  const galleryCatMap = {};
  for (const gc of galleryCats) {
    const c = await prisma.galleryCategory.upsert({
      where: { slug: gc.slug },
      update: gc,
      create: gc,
    });
    galleryCatMap[gc.slug] = c.id;
  }

  const galleryImages = [
    { title: 'Domestic LPG Regulator', imageUrl: '/images/original/g2.jpg', categoryId: galleryCatMap['regulators'], isFeatured: true, displayOrder: 1 },
    { title: 'Safety Accessories & Hoses', imageUrl: '/images/original/g3.jpg', categoryId: galleryCatMap['regulators'], isFeatured: true, displayOrder: 2 },
    { title: 'Kwality Gas Water Heater Unit', imageUrl: '/images/original/gas.jpg', categoryId: galleryCatMap['heaters'], isFeatured: true, displayOrder: 3 },
    { title: '33 Kgs Industrial Cylinders', imageUrl: '/images/original/1433.png', categoryId: galleryCatMap['cylinders'], isFeatured: true, displayOrder: 4 },
    { title: '21 Kgs Commercial Cylinder', imageUrl: '/images/original/dars2.png', categoryId: galleryCatMap['cylinders'], isFeatured: true, displayOrder: 5 },
    { title: '17 Kgs Restaurant Cylinder', imageUrl: '/images/original/dar17.png', categoryId: galleryCatMap['cylinders'], isFeatured: true, displayOrder: 6 },
    { title: 'Domestic Cylinders Line', imageUrl: '/images/original/dom1.png', categoryId: galleryCatMap['cylinders'], isFeatured: true, displayOrder: 7 },
    { title: 'Kwality Bottling Operations', imageUrl: '/images/original/kwalit.jpg', categoryId: galleryCatMap['plants'], isFeatured: true, displayOrder: 8 },
  ];

  const existingGalleryCount = await prisma.galleryImage.count();
  if (existingGalleryCount === 0) {
    for (const gi of galleryImages) {
      await prisma.galleryImage.create({ data: gi });
    }
    console.log(`Seeded ${galleryImages.length} Gallery Images`);
  } else {
    console.log(`Preserved ${existingGalleryCount} existing Gallery Images`);
  }

  // 9. Core Pages & SEO Settings
  const pagesData = [
    {
      slug: 'home',
      title: 'Kwality Gas | Leading LPG Bottlers & Distributors in South India',
      description: 'Kwality Gas Bottlers Private Limited – Grade 1 Rated LPG Bottling & Distribution Company with 3 plants in Hosur, Chennai, and Dharwad. 30,000 MTPA storage capacity.',
      metaKeywords: 'Kwality Gas, LPG gas Bangalore, domestic LPG cylinder, commercial LPG cylinder, industrial gas cylinders, gas water heater, Grade 1 LPG company',
    },
    {
      slug: 'about',
      title: 'About Kwality Gas | Corporate Profile & Infrastructure',
      description: 'Learn about Kwality Gas Bottlers Pvt Ltd, established in 2005 backed by an industrial group with 35+ years of legacy. 3 plants across Karnataka and Tamil Nadu.',
      metaKeywords: 'About Kwality Gas, LPG bottling plant Dharwad, Hosur LPG plant, Chennai LPG plant, Bangalore LPG company',
    },
    {
      slug: 'products',
      title: 'Products | Kwality Gas Cylinders, Gas Geysers & Accessories',
      description: 'Explore Kwality Gas full range: 4kg, 5.5kg, 12kg domestic, 17kg, 21kg commercial, 33kg industrial cylinders, and Kwality Gas Water Heaters.',
      metaKeywords: 'Kwality gas products, LPG cylinder sizes, domestic LPG, commercial LPG, 33kg gas cylinder, gas water heater features',
    },
    {
      slug: 'cylinders',
      title: 'LPG Cylinders Range | Domestic, Commercial & Industrial',
      description: 'Complete capacity range of Kwality Gas cylinders: 33kg, 21kg, 17kg, 15kg, 12kg, 5.5kg and 4kg Cook & Light.',
      metaKeywords: 'LPG cylinders, 33kg cylinder refill, 17kg gas, 12kg domestic cylinder, Kwality cylinders Bangalore',
    },
    {
      slug: 'domestic',
      title: 'LPG for Domestic Use | Household Cooking Gas Connections',
      description: 'Kwality Gas domestic LPG for households: clean blue flame, soot-free utensils, fast heating, and prompt doorstep delivery.',
      metaKeywords: 'domestic gas connection, home LPG Bangalore, 12kg cylinder refill, cooking gas booking',
    },
    {
      slug: 'commercial',
      title: 'LPG for Commercial | Hotels, Restaurants & Catering (HORECA)',
      description: 'Dependable commercial LPG for restaurants, hotels, canteens, and bakeries. 17kg & 21kg cylinders with uninterrupted doorstep refills.',
      metaKeywords: 'commercial LPG cylinder, restaurant gas supply, HORECA gas Bangalore, 17kg commercial cylinder',
    },
    {
      slug: 'industrial',
      title: 'LPG for Industrial | Manufacturing, Furnaces & Bulk Gas Banks',
      description: 'Industrial LPG solutions with 33kg heavy-duty cylinders and cylinder bank manifold setups for metal heat treatment, powder coating, and factories.',
      metaKeywords: 'industrial LPG, 33kg cylinder, furnace gas supplier Bangalore, industrial cylinder bank',
    },
    {
      slug: 'services',
      title: 'Services | Dedicated Delivery Network & Technical Support',
      description: 'Unmatched LPG delivery network, 24/7 technical assistance, manifold design, safety training, and environmental initiatives.',
      metaKeywords: 'LPG delivery service, industrial gas pipeline setup, LPG technical support Bangalore',
    },
    {
      slug: 'price-list',
      title: 'Kwality Gas Price List | Karnataka & Tamil Nadu Refill Rates',
      description: 'Official Kwality Gas price list for Karnataka and Tamil Nadu. Check refill prices for 33kg, 21kg, 17kg, 12kg, 4kg cylinders with tax rules.',
      metaKeywords: 'Kwality gas price list, LPG cylinder price Karnataka, 12kg domestic gas price, 33kg industrial gas price Bangalore',
    },
    {
      slug: 'safety-features',
      title: 'Safety Features & Guidelines | Handling LPG Cylinders',
      description: 'Essential LPG safety instructions: mounting regulator, rubber hose inspection, gas leak prevention, and emergency Fire 101 protocol.',
      metaKeywords: 'LPG safety tips, gas cylinder leak emergency, mounting LPG regulator, gas safety rules',
    },
    {
      slug: 'testimonials',
      title: 'Client Testimonials & Reviews | Kwality Gas Partners',
      description: 'Read real reviews from restaurants, laboratories, industrial manufacturers, distributors, and domestic customers who trust Kwality Gas.',
      metaKeywords: 'Kwality gas reviews, client testimonials, LPG distributor experience Bangalore',
    },
    {
      slug: 'group-company',
      title: 'Group Company | The Bangalore Tin Works',
      description: 'Learn about The Bangalore Tin Works, our sister company manufacturing premium quality tin containers in Rajajinagar, Bangalore.',
      metaKeywords: 'The Bangalore Tin Works, tin container manufacturers Bangalore, Kwality group company',
    },
    {
      slug: 'gallery',
      title: 'Photo Gallery | Kwality Gas Products, Plants & Accessories',
      description: 'Browse photos of Kwality Gas cylinders, bottling plant operations, ISI regulators, and gas water heaters.',
      metaKeywords: 'Kwality gas gallery, LPG cylinder photos, bottling plant Bangalore',
    },
    {
      slug: 'contact',
      title: 'Contact Us | Kwality Gas Head Office & Enquiry Booking',
      description: 'Get in touch with Kwality Gas Bottlers Pvt Ltd at Rajajinagar, Bangalore. Book domestic connections or commercial/industrial LPG supplies.',
      metaKeywords: 'Kwality gas contact, Rajajinagar office phone, LPG booking Bangalore, customer care number',
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy | Kwality Gas Bottlers Pvt Ltd',
      description: 'Our data protection principles and privacy policy outlining how customer information is handled securely.',
      metaKeywords: 'privacy policy Kwality gas, data protection',
    },
  ];

  for (const p of pagesData) {
    const page = await prisma.page.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        description: p.description,
      },
      create: {
        slug: p.slug,
        title: p.title,
        description: p.description,
      },
    });

    await prisma.sEOSettings.upsert({
      where: { pageSlug: p.slug },
      update: {
        pageId: page.id,
        metaTitle: p.title,
        metaDescription: p.description,
        metaKeywords: p.metaKeywords,
        ogTitle: p.title,
        ogDescription: p.description,
        canonicalUrl: `https://kwalitygas.com/${p.slug === 'home' ? '' : p.slug}`,
      },
      create: {
        pageId: page.id,
        pageSlug: p.slug,
        metaTitle: p.title,
        metaDescription: p.description,
        metaKeywords: p.metaKeywords,
        ogTitle: p.title,
        ogDescription: p.description,
        canonicalUrl: `https://kwalitygas.com/${p.slug === 'home' ? '' : p.slug}`,
      },
    });
  }
  console.log(`Seeded ${pagesData.length} Pages & SEO configurations`);

  console.log('--- Database Seeding Finished Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


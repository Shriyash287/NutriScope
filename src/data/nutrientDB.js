/**
 * NutriScope Extended Nutrient Knowledge Base
 * 
 * Sources: ICMR-NIN 2020, WHO Asia-Pacific, IFCT 2017 (approximate values).
 * dietaryRiskMultiplier values: 'low' | 'moderate' | 'high' | 'severe'
 * 
 * IMPORTANT: Numeric food values are approximate/illustrative.
 * Verify against IFCT 2017 before hardcoding into production copy.
 */

export const NUTRIENT_DB = [
  {
    id: 'vitB12',
    name: 'Vitamin B12',
    rda: '2.5 mcg/d (Adults)',
    importance: 'Nervous system, Brain, DNA, Red blood cells',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'moderate',
      vegetarian: 'high',
      vegan: 'severe'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Fish (mackerel, sardines)', 'Chicken', 'Eggs', 'Mutton liver'],
      eggetarian: ['Eggs (strongest source)', 'Fortified cereal', 'Fortified plant milk'],
      vegetarian: ['Curd/yogurt', 'Milk', 'Paneer', 'Fortified foods'],
      vegan: ['Fortified plant milk', 'Nutritional yeast', 'B12 supplement (confirm with doctor)']
    },
    whyRiskyForThisPattern: 'B12 occurs naturally only in animal-derived foods; plant foods contain none.',
    pairingRules: {
      enhances: ['Folate (works with B12 for red blood cell formation)'],
      inhibits: ['Excess alcohol', 'High-dose fiber supplements taken simultaneously']
    },
    allergyTags: []
  },
  {
    id: 'iron',
    name: 'Iron',
    rda: '19mg/d (both sexes, adult)',
    importance: 'Oxygen transport, Energy, Brain function',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'moderate',
      vegetarian: 'high',
      vegan: 'high'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Red meat', 'Chicken liver', 'Fish — heme iron, absorbed far more efficiently'],
      eggetarian: ['Eggs', 'Lentils/dal', 'Spinach', 'Jaggery', 'Fortified cereals'],
      vegetarian: ['Lentils/dal', 'Chickpeas', 'Spinach & leafy greens', 'Jaggery', 'Dried apricots', 'Fortified cereals'],
      vegan: ['Lentils/dal', 'Chickpeas', 'Tofu', 'Spinach & leafy greens', 'Dried apricots', 'Jaggery']
    },
    whyRiskyForThisPattern: 'Plant-based (non-heme) iron is absorbed far less efficiently than heme iron from animal sources.',
    pairingRules: {
      enhances: ['Vitamin C (citrus, tomato, amla) in the same meal boosts non-heme iron absorption', 'Cast-iron cookware boosts iron content in acidic/tomato dishes', 'Soaking, sprouting, or fermenting grains/legumes reduces phytates'],
      inhibits: ['Tea & coffee (tannins) — keep ~1hr away from iron-rich meals', 'Calcium-rich foods eaten with the iron-rich meal']
    },
    allergyTags: ['soy']
  },
  {
    id: 'omega3',
    name: 'Omega-3 (ALA/EPA/DHA)',
    rda: '1.1–1.6 g/d',
    importance: 'Brain, Heart, Eyes, Reduce inflammation',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'moderate',
      vegetarian: 'high',
      vegan: 'severe'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Fatty fish — mackerel (bangda), sardines, salmon (2–3 servings/week)', 'Walnuts', 'Flaxseed'],
      eggetarian: ['Omega-3 enriched eggs', 'Walnuts', 'Ground flaxseed', 'Chia seeds'],
      vegetarian: ['Ground flaxseed', 'Chia seeds', 'Walnuts', 'Hemp seeds'],
      vegan: ['Ground flaxseed', 'Chia seeds', 'Walnuts', 'Hemp seeds', 'Algae-oil supplement (only vegan source of direct DHA)']
    },
    whyRiskyForThisPattern: 'The body converts only a small fraction (under 15%) of plant ALA into the EPA/DHA your brain and heart use. Flax/walnuts are healthy but don\'t fully substitute for EPA/DHA.',
    pairingRules: {
      enhances: ['Consume with a healthy fat source for absorption'],
      inhibits: ['Excessive omega-6 intake may compete with omega-3 conversion']
    },
    allergyTags: ['nuts']
  },
  {
    id: 'calcium',
    name: 'Calcium',
    rda: '1000 mg/d (both sexes, adult)',
    importance: 'Bones, Teeth, Muscles, Nerves',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'moderate',
      eggetarian: 'moderate',
      vegetarian: 'moderate',
      vegan: 'high'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Dairy (milk, curd, paneer)', 'Sesame seeds/til', 'Ragi', 'Fish with bones'],
      eggetarian: ['Dairy (milk, curd, paneer)', 'Sesame seeds/til', 'Ragi', 'Eggs'],
      vegetarian: ['Dairy (milk, curd, paneer)', 'Sesame seeds/til', 'Ragi (finger millet)', 'Drumstick leaves (moringa)', 'Fortified soy milk'],
      vegan: ['Ragi (finger millet — very high calcium)', 'Sesame seeds/til', 'Fortified soy/plant milk', 'Calcium-set tofu', 'Drumstick leaves (moringa)', 'Methi (fenugreek) leaves']
    },
    whyRiskyForThisPattern: 'Dairy is the most concentrated and bioavailable common calcium source. Without it, hitting ~1000mg/day requires intentional food choices.',
    pairingRules: {
      enhances: ['Vitamin D (essential for calcium absorption — pair with sun exposure or supplementation)'],
      inhibits: ['Spinach/palak — commonly assumed to be a strong calcium source, but its oxalates block much of the calcium. Don\'t rely on it as a primary source.', 'Excess salt increases calcium excretion']
    },
    allergyTags: ['lactose']
  },
  {
    id: 'vitD',
    name: 'Vitamin D',
    rda: '800 IU/d (both sexes)',
    importance: 'Bone strength, Immunity, Mood, Hormones',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'high',
      eggetarian: 'high',
      vegetarian: 'high',
      vegan: 'severe'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Sunlight (10–30 min midday)', 'Fatty fish', 'Egg yolk', 'Fortified milk'],
      eggetarian: ['Sunlight (10–30 min midday)', 'Egg yolk', 'Fortified milk'],
      vegetarian: ['Sunlight (10–30 min midday)', 'Fortified milk', 'Fortified dairy'],
      vegan: ['Sunlight (10–30 min midday)', 'Fortified plant milk', 'UV-exposed mushrooms', 'Vitamin D supplement (confirm with doctor)']
    },
    whyRiskyForThisPattern: 'Despite abundant sunlight in India, deficiency is very common — driven by indoor hours, skin covering, air pollution, and sunscreen. Food sources are comparatively minor contributors.',
    pairingRules: {
      enhances: ['Fat-containing meals (Vitamin D is fat-soluble)', 'Calcium absorption is dependent on adequate Vitamin D'],
      inhibits: []
    },
    allergyTags: []
  },
  {
    id: 'protein',
    name: 'Protein',
    rda: '0.83 g/kg/d (sedentary minimum, ICMR-NIN 2020)',
    importance: 'Muscle repair, Immunity, Hormones, Hair, Skin',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'moderate',
      vegan: 'moderate'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Chicken breast', 'Fish', 'Eggs', 'Mutton', 'Paneer', 'Dal'],
      eggetarian: ['Eggs', 'Paneer', 'Greek yogurt', 'Dal', 'Soy chunks', 'Chickpeas'],
      vegetarian: ['Paneer', 'Greek yogurt', 'Dal', 'Soy chunks', 'Chickpeas', 'Rajma', 'Sprouts', 'Milk'],
      vegan: ['Tofu', 'Soy chunks', 'Lentils/dal', 'Chickpeas', 'Rajma', 'Peanuts', 'Quinoa', 'Sprouts']
    },
    whyRiskyForThisPattern: 'Eat a variety of protein sources across the day — same-meal combining isn\'t required. Soy is the one common plant protein that\'s complete on its own.',
    pairingRules: {
      enhances: ['Spread protein across meals for better utilization', 'Soy is a complete plant protein'],
      inhibits: []
    },
    allergyTags: ['soy', 'nuts', 'lactose', 'gluten']
  },
  {
    id: 'zinc',
    name: 'Zinc',
    rda: 'Men 17mg/d, Women 13.2mg/d',
    importance: 'Immunity, Skin, Testosterone, Healing',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'moderate',
      vegetarian: 'moderate',
      vegan: 'high'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Red meat', 'Shellfish (notably high)', 'Eggs', 'Chicken'],
      eggetarian: ['Eggs', 'Pumpkin seeds', 'Sesame seeds', 'Cashews'],
      vegetarian: ['Pumpkin seeds', 'Sesame seeds', 'Chickpeas', 'Cashews', 'Whole grains', 'Dairy'],
      vegan: ['Pumpkin seeds', 'Sesame seeds', 'Chickpeas', 'Cashews', 'Whole grains', 'Fortified cereals']
    },
    whyRiskyForThisPattern: 'Plant zinc has lower bioavailability due to phytates. Soaking/sprouting grains helps.',
    pairingRules: {
      enhances: ['Soaking & sprouting legumes/grains reduces phytates'],
      inhibits: ['High phytate meals, excess calcium supplements taken simultaneously']
    },
    allergyTags: ['nuts']
  },
  {
    id: 'folate',
    name: 'Folate (Vitamin B9)',
    rda: 'Adult Men 300µg/d, Adult Women 200µg/d',
    importance: 'Cell growth, Pregnancy, DNA',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Spinach', 'Lentils', 'Beans', 'Liver', 'Citrus fruits'],
      eggetarian: ['Spinach', 'Lentils', 'Beans', 'Eggs', 'Citrus fruits'],
      vegetarian: ['Spinach', 'Lentils', 'Beans', 'Citrus fruits', 'Fortified cereals'],
      vegan: ['Spinach', 'Lentils', 'Beans', 'Citrus fruits', 'Fortified cereals']
    },
    whyRiskyForThisPattern: 'Generally adequate in most Indian diets rich in dal and leafy greens.',
    pairingRules: {
      enhances: ['Vitamin B12 (works together for red blood cell formation)'],
      inhibits: ['Excessive alcohol', 'Certain medications (consult doctor)']
    },
    allergyTags: []
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    rda: '340mg/d (Adult Men), 310mg/d (Adult Women)',
    importance: 'Sleep, Muscle recovery, Heart, Energy',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'moderate',
      eggetarian: 'moderate',
      vegetarian: 'moderate',
      vegan: 'moderate'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Pumpkin seeds', 'Almonds', 'Cashews', 'Dark chocolate', 'Spinach', 'Fish'],
      eggetarian: ['Pumpkin seeds', 'Almonds', 'Cashews', 'Dark chocolate', 'Spinach'],
      vegetarian: ['Pumpkin seeds', 'Almonds', 'Cashews', 'Dark chocolate', 'Spinach', 'Whole grains'],
      vegan: ['Pumpkin seeds', 'Almonds', 'Cashews', 'Dark chocolate', 'Spinach', 'Whole grains', 'Bananas']
    },
    whyRiskyForThisPattern: 'Moderate risk across all diets due to soil depletion and processed-food consumption.',
    pairingRules: {
      enhances: ['Vitamin D helps magnesium absorption', 'Take magnesium-rich meal at dinner (supports sleep)'],
      inhibits: ['Excess calcium supplements', 'Excess alcohol']
    },
    allergyTags: ['nuts']
  },
  {
    id: 'vitC',
    name: 'Vitamin C',
    rda: 'Adult Men 80mg/d, Adult Women 65mg/d',
    importance: 'Immunity, Collagen, Iron absorption',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Amla', 'Orange', 'Lemon', 'Guava', 'Kiwi', 'Bell peppers'],
      eggetarian: ['Amla', 'Orange', 'Lemon', 'Guava', 'Kiwi', 'Bell peppers'],
      vegetarian: ['Amla', 'Orange', 'Lemon', 'Guava', 'Kiwi', 'Bell peppers'],
      vegan: ['Amla', 'Orange', 'Lemon', 'Guava', 'Kiwi', 'Bell peppers']
    },
    whyRiskyForThisPattern: 'Generally well-covered in Indian diets with citrus and seasonal fruits.',
    pairingRules: {
      enhances: ['Pair with iron-rich meals to boost absorption'],
      inhibits: ['Heat destroys Vitamin C — prefer raw or lightly cooked sources']
    },
    allergyTags: []
  },
  {
    id: 'vitA',
    name: 'Vitamin A',
    rda: '1000 µg/d (Adult Men), 840 µg/d (Adult Women)',
    importance: 'Vision, Skin, Immunity',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Liver', 'Eggs', 'Carrots', 'Sweet potato', 'Mango'],
      eggetarian: ['Eggs', 'Carrots', 'Sweet potato', 'Mango', 'Dairy'],
      vegetarian: ['Carrots', 'Sweet potato', 'Mango', 'Pumpkin', 'Dairy', 'Dark leafy greens'],
      vegan: ['Carrots', 'Sweet potato', 'Mango', 'Pumpkin', 'Dark leafy greens']
    },
    whyRiskyForThisPattern: 'Well-covered in diets rich in colorful fruits/vegetables.',
    pairingRules: {
      enhances: ['Fat-containing meals (Vitamin A is fat-soluble)'],
      inhibits: []
    },
    allergyTags: []
  },
  {
    id: 'vitE',
    name: 'Vitamin E',
    rda: '10 mg/d (Adult Men), 7.5 mg/d (Adult Women)',
    importance: 'Skin, Antioxidant, Hair',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Almonds', 'Sunflower seeds', 'Avocado', 'Eggs'],
      eggetarian: ['Almonds', 'Sunflower seeds', 'Avocado', 'Eggs'],
      vegetarian: ['Almonds', 'Sunflower seeds', 'Avocado', 'Peanut butter'],
      vegan: ['Almonds', 'Sunflower seeds', 'Avocado', 'Peanut butter']
    },
    whyRiskyForThisPattern: 'Generally adequate in diets that include nuts and seeds.',
    pairingRules: {
      enhances: ['Fat-containing meals (Vitamin E is fat-soluble)'],
      inhibits: []
    },
    allergyTags: ['nuts', 'peanut']
  },
  {
    id: 'vitK',
    name: 'Vitamin K',
    rda: '55 µg/d (Adults)',
    importance: 'Blood clotting, Bone health',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Spinach', 'Kale', 'Broccoli', 'Egg yolk'],
      eggetarian: ['Spinach', 'Kale', 'Broccoli', 'Egg yolk'],
      vegetarian: ['Spinach', 'Kale', 'Broccoli', 'Fermented foods'],
      vegan: ['Spinach', 'Kale', 'Broccoli', 'Fermented foods']
    },
    whyRiskyForThisPattern: 'Abundant in leafy greens — rarely deficient in Indian diets.',
    pairingRules: {
      enhances: ['Fat-containing meals'],
      inhibits: []
    },
    allergyTags: []
  },
  {
    id: 'potassium',
    name: 'Potassium',
    rda: '3500 mg/d (Adults)',
    importance: 'Heart, Blood pressure, Muscle contractions',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'moderate',
      eggetarian: 'moderate',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Banana', 'Coconut water', 'Potato', 'Fish', 'Chicken'],
      eggetarian: ['Banana', 'Coconut water', 'Potato', 'Sweet potato', 'Beans'],
      vegetarian: ['Banana', 'Coconut water', 'Potato', 'Sweet potato', 'Beans', 'Yogurt'],
      vegan: ['Banana', 'Coconut water', 'Potato', 'Sweet potato', 'Beans', 'Spinach']
    },
    whyRiskyForThisPattern: 'Vegetarian diets rich in fruits/vegetables tend to provide adequate potassium.',
    pairingRules: {
      enhances: [],
      inhibits: ['Excess sodium increases potassium needs']
    },
    allergyTags: []
  },
  {
    id: 'selenium',
    name: 'Selenium',
    rda: '40 µg/d (Adults)',
    importance: 'Thyroid, Immunity',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Eggs', 'Seafood', 'Chicken', 'Whole grains'],
      eggetarian: ['Eggs', 'Whole grains', 'Mushrooms'],
      vegetarian: ['Whole grains', 'Mushrooms', 'Dairy'],
      vegan: ['Whole grains', 'Mushrooms', 'Sunflower seeds', 'Brazil nuts']
    },
    whyRiskyForThisPattern: 'Generally adequate in mixed diets.',
    pairingRules: {
      enhances: [],
      inhibits: []
    },
    allergyTags: ['nuts']
  },
  {
    id: 'iodine',
    name: 'Iodine',
    rda: '150 mcg/d (Adults)',
    importance: 'Thyroid hormones, Metabolism',
    dietaryRiskMultiplier: {
      'non-vegetarian': 'low',
      eggetarian: 'low',
      vegetarian: 'low',
      vegan: 'low'
    },
    foodSourcesByPreference: {
      'non-vegetarian': ['Iodized salt', 'Seafood', 'Dairy', 'Eggs'],
      eggetarian: ['Iodized salt', 'Dairy', 'Eggs'],
      vegetarian: ['Iodized salt', 'Dairy'],
      vegan: ['Iodized salt', 'Seaweed (nori)']
    },
    whyRiskyForThisPattern: 'Deficiency is lower in India due to successful iodized salt programs.',
    pairingRules: {
      enhances: [],
      inhibits: ['Excess cruciferous vegetables when iodine is low (goitrogens)']
    },
    allergyTags: []
  }
];

/**
 * Regional Indian meal suggestions indexed by region.
 */
export const REGIONAL_MEALS = {
  north: {
    label: 'North India',
    breakfast: ['Paratha with curd', 'Poha', 'Oats with milk', 'Stuffed roti', 'Lassi', 'Eggs / Omelette'],
    lunch: ['Dal + Roti + Sabzi', 'Rajma Chawal', 'Chole + Rice', 'Paneer / Chicken curry', 'Raita'],
    dinner: ['Khichdi', 'Chapati + Dal', 'Paneer Bhurji', 'Soup + Roti', 'Mixed veg curry'],
    snacks: ['Roasted chana', 'Makhana', 'Lassi', 'Fruit chaat', 'Nuts & seeds']
  },
  south: {
    label: 'South India',
    breakfast: ['Idli + Sambar', 'Dosa + Chutney', 'Ragi dosa / Ragi porridge', 'Upma', 'Pongal', 'Appam with stew'],
    lunch: ['Sambar rice', 'Rasam rice', 'Curd rice', 'Fish curry + Rice (coastal)', 'Vegetable kootu', 'Thoran'],
    dinner: ['Chapati + Dal', 'Idli + Sambar', 'Set dosa', 'Vegetable kurma + Roti'],
    snacks: ['Sundal (boiled legumes)', 'Murukku (moderation)', 'Banana', 'Buttermilk', 'Coconut water']
  },
  east: {
    label: 'East India',
    breakfast: ['Chira (poha) + Jaggery', 'Sattu drink', 'Luchi + Aloo dum (moderation)', 'Eggs + Toast', 'Muri (puffed rice) mix'],
    lunch: ['Fish curry + Rice (Bengal)', 'Dal + Rice + Sabzi', 'Machher jhol', 'Shukto (mixed veg)', 'Masor tenga (Assam fish)'],
    dinner: ['Khichdi', 'Chapati + Chana dal', 'Mixed veg', 'Lentil soup + Rice'],
    snacks: ['Sattu shake', 'Muri mix', 'Fruits', 'Chana jor garam', 'Peanuts']
  },
  west: {
    label: 'West India',
    breakfast: ['Poha', 'Thepla + Curd', 'Upma', 'Dhokla', 'Misal pav (moderation)', 'Eggs / Omelette'],
    lunch: ['Dal + Rice + Roti + Sabzi', 'Undhiyu + Roti (Gujarat)', 'Varan Bhaat (Maharashtra)', 'Fish curry + Rice (Goa/coastal)'],
    dinner: ['Bhakri + Sabzi', 'Roti + Dal', 'Khichdi', 'Pav bhaji (moderation)'],
    snacks: ['Roasted chana', 'Khandvi', 'Fruit', 'Nuts', 'Buttermilk / Chaas']
  },
  'pan-indian': {
    label: 'Pan-Indian / Mixed',
    breakfast: ['Poha', 'Upma', 'Oats', 'Idli', 'Dosa', 'Eggs', 'Milk + Fruits'],
    lunch: ['Dal', 'Rice / Roti', 'Paneer / Chicken / Fish', 'Vegetables', 'Curd / Raita'],
    dinner: ['Khichdi', 'Chapati + Dal', 'Paneer / Fish', 'Soup', 'Vegetables'],
    snacks: ['Fruit', 'Roasted chana', 'Makhana', 'Sprouts', 'Nuts', 'Buttermilk', 'Greek yogurt']
  }
};

/**
 * Health-flags driven general lifestyle notes.
 * These are NOT prescriptive medical advice — purely directional, general, well-established guidance.
 */
export const HEALTH_FLAG_NOTES = {
  'diabetes': {
    label: 'Diabetes / Prediabetes',
    foodsToLimitExtra: 'Added sugars, refined flour (maida), white rice in excess, sugary drinks, fruit juices, sweets, processed breakfast cereals.',
    generalGuidance: 'Prefer lower-glycemic-index carbs (whole grains, millets, oats, legumes). Include protein and fiber in every meal to slow blood sugar rise. Portion control on carbs matters more than eliminating them.',
    disclaimer: true
  },
  'hypertension': {
    label: 'Hypertension',
    foodsToLimitExtra: 'Excess salt, pickles, papad, packaged snacks, processed cheese, instant noodles, canned foods.',
    generalGuidance: 'Aim for potassium-rich foods (banana, coconut water, potato). The DASH-style approach emphasizes fruits, vegetables, whole grains, and low-fat dairy. Cook with less salt — use herbs, lemon, spices for flavor.',
    disclaimer: true
  },
  'thyroid': {
    label: 'Thyroid',
    foodsToLimitExtra: '',
    generalGuidance: 'Ensure adequate iodine (iodized salt) and selenium. If hypothyroid, moderate raw cruciferous vegetables (cabbage, cauliflower) — cooking reduces goitrogens. Discuss soy intake with your doctor.',
    disclaimer: true
  },
  'pcos': {
    label: 'PCOS / PCOD',
    foodsToLimitExtra: 'Refined carbs, added sugars, processed foods.',
    generalGuidance: 'Anti-inflammatory focus: whole grains, healthy fats, lean protein. Regular physical activity and maintaining healthy body weight are strongly linked to symptom improvement.',
    disclaimer: true
  },
  'cholesterol': {
    label: 'High Cholesterol',
    foodsToLimitExtra: 'Trans fats (vanaspati, bakery items), deep-fried foods, excess saturated fat.',
    generalGuidance: 'Increase soluble fiber (oats, barley, beans). Include omega-3 sources. Choose healthy cooking oils (mustard, olive). Limit fried snacks and processed foods.',
    disclaimer: true
  }
};

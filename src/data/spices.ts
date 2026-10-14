export interface SpiceItem {
  id: string;
  name: string;
  marathiName: string;
  region: string;
  flavorProfile: string;
  keyIngredients: string[];
  signatureDishes: string[];
  historicalContext: string;
}

export const MAHARASHTRIAN_SPICES: SpiceItem[] = [
  {
    id: 'goda-masala',
    name: 'Goda Masala',
    marathiName: 'गोडा मसाला',
    region: 'Pune & Desh (Western Maharashtra)',
    flavorProfile: 'Aromatic, warm, sweet-scented with woody and nutty undertones without burning heat.',
    keyIngredients: ['Dagad Phool (Stone Flower)', 'Dry Coconut (Khobra)', 'White Sesame (Til)', 'Cinnamon (Dalchini)', 'Coriander Seeds', 'Cloves (Lavang)'],
    signatureDishes: ['Katachi Amti', 'Matki chi Usal', 'Bharli Vangi (Stuffed Brinjal)', 'Masale Bhaat'],
    historicalContext: 'Developed in Brahmin and agrarian households of Pune, Satara, and Sangli, Goda Masala celebrates sweet spices and stone flower roasted in ghee.'
  },
  {
    id: 'malvani-masala',
    name: 'Malvani Masala',
    marathiName: 'मालवणी मसाला',
    region: 'Konkan & Malvan Coast',
    flavorProfile: 'Vibrant crimson, deeply pungent, citrusy, and tailored for fresh seafood and poultry.',
    keyIngredients: ['Byadgi & Sankeshwari Chillies', 'Tirphal (Teppal)', 'Black Stone Flower', 'Star Anise (Badalful)', 'Mace (Javitri)', 'Coriander Seeds'],
    signatureDishes: ['Malvani Surmai Curry', 'Kombadi Vade', 'Tisrya Masala (Clams)', 'Kolambi Bhat'],
    historicalContext: 'Crafted along the Konkan coast to neutralize strong fish oils while complementing sweet coconut milk and sour kokum.'
  },
  {
    id: 'saoji-masala',
    name: 'Saoji Masala',
    marathiName: 'सावजी मसाला',
    region: 'Vidarbha (Nagpur & Eastern Maharashtra)',
    flavorProfile: 'Complex, lingering, intensely fiery with earthy, medicinal, and peppery nuances.',
    keyIngredients: ['24 Whole Spices', 'Dagad Phool', 'Nagkeshar (Cobra Saffron)', 'Poppy Seeds (Khus Khus)', 'Black Cardamom', 'Wild Peppercorns'],
    signatureDishes: ['Saoji Mutton Rassa', 'Saoji Kombadi', 'Saoji Patodi Rassa', 'Saoji Egg Curry'],
    historicalContext: 'Pioneered by the Halba Koshti handloom weaving community in Nagpur to provide stamina and thermoregulation during hard industrial labor.'
  },
  {
    id: 'khandeshi-kala-masala',
    name: 'Khandeshi Kala Masala',
    marathiName: 'खानदेशी काळा मसाला',
    region: 'Khandesh (Jalgaon, Dhule, Nandurbar)',
    flavorProfile: 'Smoky, bittersweet, charcoal-roasted with deep umami notes and striking dark color.',
    keyIngredients: ['Cast-iron roasted dry coconut slices', 'Charred Coriander Seeds', 'Black Sesame', 'Stone Flower', 'Cloves', 'Shahjeera'],
    signatureDishes: ['Khandeshi Shev Bhaji', 'Jalgaon Vangyache Bharit', 'Dubuk Vade', 'Khandeshi Mutton'],
    historicalContext: 'Created in the Tapi river basin, this spice is intentionally roasted over iron pans until midnight black without imparting bitterness.'
  },
  {
    id: 'kanda-lasun-masala',
    name: 'Kolhapuri Kanda Lasun Masala',
    marathiName: 'कोल्हापुरी कांदा लसूण मसाला',
    region: 'Kolhapur & Southern Maharashtra',
    flavorProfile: 'Rich, savory, pungent with intense garlic warmth and vibrant red chili fire.',
    keyIngredients: ['Lavangi & Sankeshwari Chillies', 'Caramelized Red Onions', 'Crushed Purple Garlic', 'Sesame Seeds', 'Turmeric', 'Cumin'],
    signatureDishes: ['Tambda Rassa', 'Kolhapuri Misal', 'Mutton Sukka', 'Batata Rassa'],
    historicalContext: 'Born from the royal and martial wrestling culture of Kolhapur, designed to create instantaneous stamina and rich bone-marrow gravies.'
  },
  {
    id: 'kokum-aamsul',
    name: 'Kokum (Aamsul / Ratambi)',
    marathiName: 'कोकम / आमसूल',
    region: 'Konkan Coast & Sahyadri Hills',
    flavorProfile: 'Fruity, clean, intense tartness without vinegar harshness, cooling and digestive.',
    keyIngredients: ['Sun-cured Garcinia indica fruit rinds soaked in rock salt'],
    signatureDishes: ['Solkadhi', 'Fish Curry', 'Dal Amti', 'Kokum Sharbat'],
    historicalContext: 'An ancient indigenous fruit revered in Konkani medicine for cooling Pitta dosha and preventing acidity after eating spicy curries.'
  }
];

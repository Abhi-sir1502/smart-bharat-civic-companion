export const schemes = [
  {
    id: "pm-awas",
    name: "PM Awas Yojana",
    nameHi: "प्रधानमंत्री आवास योजना",
    category: "Housing",
    description: "Financial assistance for building or buying a house for economically weaker sections.",
    descriptionHi: "आर्थिक रूप से कमजोर वर्गों के लिए घर बनाने या खरीदने हेतु वित्तीय सहायता।",
    eligibility: ["Annual family income under 18 lakh", "No pucca house owned by family", "Indian citizen"],
    documents: ["Aadhaar Card", "Income Certificate", "Bank Account Passbook", "Passport size photo", "Land/property documents (if any)"]
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PM-JAY)",
    nameHi: "आयुष्मान भारत",
    category: "Health",
    description: "Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.",
    descriptionHi: "द्वितीयक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य बीमा कवर।",
    eligibility: ["Listed in SECC 2011 database", "Economically vulnerable families", "No existing health insurance required"],
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate", "Family ID"]
  },
  {
    id: "scholarship",
    name: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    category: "Education",
    description: "Scholarships for students from pre-matric to post-graduation based on merit and need.",
    descriptionHi: "मेधावी और जरूरतमंद छात्रों के लिए प्री-मैट्रिक से पोस्ट-ग्रेजुएशन तक छात्रवृत्ति।",
    eligibility: ["Enrolled in recognized institution", "Family income below prescribed limit", "Minimum academic percentage as per scheme"],
    documents: ["Aadhaar Card", "Bonafide Certificate", "Income Certificate", "Bank Account details", "Previous year marksheet"]
  },
  {
    id: "pension",
    name: "National Social Assistance Programme (Pension)",
    nameHi: "राष्ट्रीय सामाजिक सहायता कार्यक्रम (पेंशन)",
    category: "Social Security",
    description: "Monthly pension for elderly, widows, and persons with disability from economically weaker sections.",
    descriptionHi: "आर्थिक रूप से कमजोर वर्ग के बुजुर्गों, विधवाओं और दिव्यांगों के लिए मासिक पेंशन।",
    eligibility: ["Age 60+ (old age pension)", "Below Poverty Line household", "Valid identity proof"],
    documents: ["Aadhaar Card", "Age Proof", "BPL Certificate", "Bank Account Passbook", "Passport size photo"]
  }
];

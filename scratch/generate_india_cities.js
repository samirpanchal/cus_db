import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const states = {
  "maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Navi Mumbai", "Kolhapur", "Akola", "Panvel", "Bhiwandi", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalgaon", "Nanded", "Sangli", "Malegaon", "Jalna", "Bhusawal", "Satara", "Beed", "Yavatmal", "Kamptee", "Gondia", "Barshi", "Achalpur", "Osmanabad", "Nandurbar", "Wardha", "Udgir", "Hinganghat", "Parli", "Karad", "Chiplun", "Ratnagiri", "Palghar", "Bhusawal", "Shirpur", "Khamgaon", "Malkapur"],
  "gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Bharuch", "Anand", "Porbandar", "Godhra", "Navsari", "Dahod", "Botad", "Amreli", "Deesa", "Jetpur", "Morbi", "Vapi", "Ankleshwar", "Bhuj", "Gandhidham", "Veraval", "Surendranagar", "Valsad", "Palanpur", "Mehsana", "Patan", "Dhoraji", "Keshod", "Wadhwan", "Sidhpur", "Mahuva", "Mangrol", "Modasa", "Unjha", "Visnagar", "Kalol", "Kadi", "Savarkundla", "Gondal"],
  "tamil-nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Ooty", "Hosur", "Kanchipuram", "Cuddalore", "Nagercoil", "Kumbakonam", "Rajapalayam", "Pudukkottai", "Ambur", "Karaikudi", "Neyveli", "Nagapattinam", "Viluppuram", "Tiruvannamalai", "Pollachi", "Gudiyatham", "Vaniyambadi", "Theni", "Arakkonam", "Mettupalayam", "Arcot", "Tenkasi", "Kovilpatti", "Chidambaram", "Bodhan", "Namakkal"],
  "karnataka": ["Bangalore", "Mysore", "Hubli", "Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Hassan", "Gadag", "Udupi", "Robertson Pet", "Bhadravati", "Chitradurga", "Kolar", "Mandya", "Chikmagalur", "Gangavati", "Bagalkot", "Ranebennur", "Karwar", "Sirsi", "Tiptur", "Gokak", "Nipani", "Puttur", "Basavakalyan", "Athni"],
  "uttar-pradesh": ["Kanpur", "Lucknow", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad", "Maunath Bhanjan", "Hapur", "Faizabad", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Mughalsarai", "Barabanki", "Gonda", "Mainpuri", "Lalitpur", "Deoria", "Ghazipur"],
  "punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Kapurthala", "Rajpura", "Muktsar", "Firozpur", "Faridkot", "Sunam", "Mansa", "Gurdaspur", "Tarn Taran", "Zira", "Rupnagar", "Nabha"],
  "haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal", "Fatehabad", "Gohana", "Tohana", "Narwana", "Charkhi Dadri"],
  "rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Kishangarh", "Baran", "Beawar", "Tonk", "Hanumangarh", "Makrana", "Gangapur City", "Hindaun", "Sujangarh", "Mandalgarh", "Bhiwadi", "Chittorgarh", "Banswara", "Nagaur", "Jhunjhunu"],
  "madhya-pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda"],
  "west-bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "English Bazar", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Haldia", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Jangipur", "Bangaon", "Cooch Behar", "Suri", "Katwa", "Raiganj", "Tamluk"],
  "telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", "Nirmal", "Kamareddy", "Kothagudem", "Bodhan", "Palwancha", "Mandamarri", "Koratla", "Sircilla", "Tandur", "Siddipet", "Wanaparthy"],
  "andhra-pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Chittoor", "Hindupur", "Proddatur", "Bhimavaram", "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Srikakulam", "Narasaraopet", "Tadipatri", "Tadepalligudem", "Chilakaluripet"],
  "kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Kannur", "Alappuzha", "Kottayam", "Palakkad", "Manjeri", "Thalassery", "Ponnani", "Vatakara", "Kanhangad", "Payyanur", "Koyilandy", "Parappanangadi", "Kalamassery", "Kodungallur", "Neyyattinkara", "Tirur", "Malappuram", "Kayamkulam", "Punalur", "Kasaragod", "Changanassery", "Muvattupuzha"],
  "bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa", "Hajipur", "Sasaram", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj", "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad"],
  "assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "Dhubri", "North Lakhimpur", "Karimganj", "Sivasagar", "Goalpara", "Barpeta"],
  "odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Bargarh", "Rayagada", "Dhenkanal", "Koraput", "Balangir", "Paradip", "Jeypore"],
  "chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund", "Bhatapara", "Chirmiri"],
  "uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Ramnagar", "Pithoragarh", "Manglaur", "Nainital"]
};

let jsContent = "export const indiaLocations = {\n";
let count = 0;

for (const [stateSlug, cityList] of Object.entries(states)) {
  const stateName = stateSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  for (const city of cityList) {
    const citySlug = city.toLowerCase().replace(/[\s&]+/g, '-').replace(/^-|-$/g, '');
    const locationSlug = `${citySlug}-${stateSlug}`;
    const locationName = `${city}, ${stateName}`;
    
    jsContent += `  "${locationSlug}": "${locationName}",\n`;
    count++;
  }
}

jsContent += "};\n";

const targetPath = path.join(__dirname, '..', 'src', 'data', 'indiaLocations.js');
fs.writeFileSync(targetPath, jsContent);

console.log(`✅ Successfully generated src/data/indiaLocations.js with ${count} Indian cities!`);

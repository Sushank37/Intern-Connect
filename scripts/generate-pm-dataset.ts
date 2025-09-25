import { type Company, type Internship } from '../shared/schema.js';

// 24 PM Internship Scheme Sectors
export const PM_SECTORS = [
  'Information Technology',
  'Banking & Financial Services', 
  'Healthcare & Life Sciences',
  'Manufacturing',
  'Automotive',
  'Telecommunications',
  'Oil & Energy',
  'Retail & Consumer Goods',
  'Real Estate & Construction',
  'Transportation & Logistics',
  'Media & Entertainment',
  'Education & Training',
  'Agriculture & Food Processing',
  'Chemical',
  'Textiles & Apparel',
  'Electronics & Electrical',
  'Aerospace & Defense',
  'Mining & Metals',
  'Pharmaceuticals',
  'Renewable Energy',
  'Hospitality & Tourism',
  'Government & Public Sector',
  'Consulting & Professional Services',
  'Biotechnology'
] as const;

// Company data by sector (6-7 companies per sector = 150+ total)
const COMPANY_DATABASE = {
  'Information Technology': [
    { name: 'Tata Consultancy Services', description: 'Leading global IT services, consulting and business solutions company', website: 'https://www.tcs.com', location: 'Mumbai' },
    { name: 'Infosys', description: 'Global leader in next-generation digital services and consulting', website: 'https://www.infosys.com', location: 'Bangalore' },
    { name: 'Wipro', description: 'Leading technology services and consulting company', website: 'https://www.wipro.com', location: 'Bangalore' },
    { name: 'HCL Technologies', description: 'Global technology company offering digital transformation services', website: 'https://www.hcltech.com', location: 'Noida' },
    { name: 'Tech Mahindra', description: 'Digital transformation and consulting company', website: 'https://www.techmahindra.com', location: 'Pune' },
    { name: 'Mindtree', description: 'Digital transformation and cloud services company', website: 'https://www.mindtree.com', location: 'Bangalore' },
    { name: 'Cognizant India', description: 'Professional services company with digital engineering focus', website: 'https://www.cognizant.com', location: 'Chennai' }
  ],
  'Banking & Financial Services': [
    { name: 'State Bank of India', description: 'India\'s largest public sector bank', website: 'https://www.sbi.co.in', location: 'Mumbai' },
    { name: 'HDFC Bank', description: 'Leading private sector bank in India', website: 'https://www.hdfcbank.com', location: 'Mumbai' },
    { name: 'ICICI Bank', description: 'Leading private sector bank with digital banking focus', website: 'https://www.icicibank.com', location: 'Mumbai' },
    { name: 'Axis Bank', description: 'Major private sector bank offering comprehensive financial services', website: 'https://www.axisbank.com', location: 'Mumbai' },
    { name: 'Kotak Mahindra Bank', description: 'Indian private sector bank with innovative banking solutions', website: 'https://www.kotak.com', location: 'Mumbai' },
    { name: 'Punjab National Bank', description: 'One of India\'s oldest and largest public sector banks', website: 'https://www.pnbindia.in', location: 'New Delhi' },
    { name: 'HDFC Life Insurance', description: 'Leading life insurance company in India', website: 'https://www.hdfclife.com', location: 'Mumbai' }
  ],
  'Healthcare & Life Sciences': [
    { name: 'Apollo Hospitals', description: 'Leading healthcare provider in India', website: 'https://www.apollohospitals.com', location: 'Chennai' },
    { name: 'Fortis Healthcare', description: 'Leading integrated healthcare delivery service provider', website: 'https://www.fortishealthcare.com', location: 'Gurgaon' },
    { name: 'Max Healthcare', description: 'Leading healthcare provider with advanced medical services', website: 'https://www.maxhealthcare.in', location: 'New Delhi' },
    { name: 'Manipal Hospitals', description: 'Multi-specialty healthcare group', website: 'https://www.manipalhospitals.com', location: 'Bangalore' },
    { name: 'Narayana Health', description: 'Leading healthcare group offering affordable cardiac care', website: 'https://www.narayanahealth.org', location: 'Bangalore' },
    { name: 'Medanta', description: 'Multi-super specialty hospital', website: 'https://www.medanta.org', location: 'Gurgaon' },
    { name: 'Biocon', description: 'Biopharmaceutical company focused on diabetes and oncology', website: 'https://www.biocon.com', location: 'Bangalore' }
  ],
  'Manufacturing': [
    { name: 'Larsen & Toubro', description: 'Leading technology, engineering, construction and manufacturing company', website: 'https://www.larsentoubro.com', location: 'Mumbai' },
    { name: 'Bajaj Auto', description: 'Leading two-wheeler and three-wheeler manufacturer', website: 'https://www.bajajauto.com', location: 'Pune' },
    { name: 'Mahindra & Mahindra', description: 'Leading automobile manufacturer and farm equipment company', website: 'https://www.mahindra.com', location: 'Mumbai' },
    { name: 'Godrej Group', description: 'Diversified conglomerate with consumer goods and industrial products', website: 'https://www.godrej.com', location: 'Mumbai' },
    { name: 'Tata Steel', description: 'Leading steel manufacturing company', website: 'https://www.tatasteel.com', location: 'Jamshedpur' },
    { name: 'Jindal Steel & Power', description: 'Leading steel and power company', website: 'https://www.jindalsteel.com', location: 'New Delhi' },
    { name: 'Crompton Greaves', description: 'Leading electrical equipment manufacturer', website: 'https://www.cgglobal.com', location: 'Mumbai' }
  ],
  'Automotive': [
    { name: 'Tata Motors', description: 'Leading automobile manufacturer in India', website: 'https://www.tatamotors.com', location: 'Mumbai' },
    { name: 'Maruti Suzuki', description: 'Leading passenger car manufacturer in India', website: 'https://www.marutisuzuki.com', location: 'Gurgaon' },
    { name: 'Hyundai Motor India', description: 'Leading car manufacturer with modern vehicle lineup', website: 'https://www.hyundai.com/in', location: 'Chennai' },
    { name: 'Hero MotoCorp', description: 'World\'s largest manufacturer of motorcycles and scooters', website: 'https://www.heromotocorp.com', location: 'New Delhi' },
    { name: 'TVS Motor Company', description: 'Leading two-wheeler manufacturer', website: 'https://www.tvsmotor.com', location: 'Chennai' },
    { name: 'Ashok Leyland', description: 'Leading commercial vehicle manufacturer', website: 'https://www.ashokleyland.com', location: 'Chennai' },
    { name: 'Eicher Motors', description: 'Leading automotive company with Royal Enfield motorcycles', website: 'https://www.eichermotors.com', location: 'Chennai' }
  ],
  'Telecommunications': [
    { name: 'Bharti Airtel', description: 'Leading telecommunications services provider', website: 'https://www.airtel.com', location: 'New Delhi' },
    { name: 'Reliance Jio', description: 'Leading digital services company with 4G/5G network', website: 'https://www.jio.com', location: 'Mumbai' },
    { name: 'Vodafone Idea', description: 'Major telecommunications service provider', website: 'https://www.vodafoneidea.com', location: 'Mumbai' },
    { name: 'BSNL', description: 'State-owned telecommunications company', website: 'https://www.bsnl.co.in', location: 'New Delhi' },
    { name: 'Railtel', description: 'Railway telecom infrastructure provider', website: 'https://www.railtelindia.com', location: 'Gurgaon' },
    { name: 'Tata Communications', description: 'Global digital infrastructure provider', website: 'https://www.tatacommunications.com', location: 'Mumbai' },
    { name: 'Bharti Infratel', description: 'Leading tower infrastructure provider', website: 'https://www.bharti-infratel.com', location: 'Gurgaon' }
  ],
  'Oil & Energy': [
    { name: 'Reliance Industries', description: 'Leading petrochemicals, oil & gas, and retail conglomerate', website: 'https://www.ril.com', location: 'Mumbai' },
    { name: 'Indian Oil Corporation', description: 'Leading oil refining and marketing company', website: 'https://www.iocl.com', location: 'New Delhi' },
    { name: 'Oil and Natural Gas Corporation', description: 'Leading oil and gas exploration company', website: 'https://www.ongcindia.com', location: 'New Delhi' },
    { name: 'Bharat Petroleum', description: 'Leading oil refining and fuel retail company', website: 'https://www.bharatpetroleum.in', location: 'Mumbai' },
    { name: 'Hindustan Petroleum', description: 'Major oil refining and marketing company', website: 'https://www.hindustanpetroleum.com', location: 'Mumbai' },
    { name: 'Adani Green Energy', description: 'Leading renewable energy company', website: 'https://www.adanigreenenergy.com', location: 'Ahmedabad' },
    { name: 'NTPC', description: 'Largest power generation company in India', website: 'https://www.ntpc.co.in', location: 'New Delhi' }
  ],
  'Retail & Consumer Goods': [
    { name: 'ITC Limited', description: 'Leading FMCG and consumer goods company', website: 'https://www.itcportal.com', location: 'Kolkata' },
    { name: 'Hindustan Unilever', description: 'Leading consumer goods company', website: 'https://www.hul.co.in', location: 'Mumbai' },
    { name: 'Nestle India', description: 'Leading food and beverages company', website: 'https://www.nestle.in', location: 'Gurgaon' },
    { name: 'Britannia Industries', description: 'Leading food products company', website: 'https://www.britannia.co.in', location: 'Kolkata' },
    { name: 'Dabur India', description: 'Leading consumer care and food products company', website: 'https://www.dabur.com', location: 'Ghaziabad' },
    { name: 'Marico', description: 'Leading consumer products company in beauty and wellness', website: 'https://www.marico.com', location: 'Mumbai' },
    { name: 'Godrej Consumer Products', description: 'Leading consumer goods company', website: 'https://www.godrejcp.com', location: 'Mumbai' }
  ],
  'Real Estate & Construction': [
    { name: 'DLF Limited', description: 'Leading real estate developer in India', website: 'https://www.dlf.in', location: 'Gurgaon' },
    { name: 'Godrej Properties', description: 'Leading real estate developer', website: 'https://www.godrejproperties.com', location: 'Mumbai' },
    { name: 'Oberoi Realty', description: 'Premium real estate developer', website: 'https://www.oberoirealty.com', location: 'Mumbai' },
    { name: 'Prestige Estates Projects', description: 'Leading real estate developer in South India', website: 'https://www.prestigeconstructions.com', location: 'Bangalore' },
    { name: 'Brigade Enterprises', description: 'Leading property developer', website: 'https://www.brigadegroup.com', location: 'Bangalore' },
    { name: 'Sobha Limited', description: 'Real estate developer with focus on residential projects', website: 'https://www.sobha.com', location: 'Bangalore' },
    { name: 'UltraTech Cement', description: 'India\'s largest cement manufacturer', website: 'https://www.ultratechcement.com', location: 'Mumbai' }
  ],
  'Transportation & Logistics': [
    { name: 'Indian Railways', description: 'National railway system of India', website: 'https://www.indianrailways.gov.in', location: 'New Delhi' },
    { name: 'Blue Dart Express', description: 'Leading express air and integrated transportation company', website: 'https://www.bluedart.com', location: 'Mumbai' },
    { name: 'Gati Limited', description: 'Express distribution and supply chain solutions company', website: 'https://www.gati.com', location: 'Hyderabad' },
    { name: 'VRL Logistics', description: 'Leading logistics and transportation company', website: 'https://www.vrlgroup.in', location: 'Hubli' },
    { name: 'Container Corporation of India', description: 'Leading container train operator', website: 'https://www.concorindia.co.in', location: 'New Delhi' },
    { name: 'Transport Corporation of India', description: 'Leading logistics and supply chain company', website: 'https://www.tcil.com', location: 'Gurgaon' },
    { name: 'SpiceJet', description: 'Leading low-cost airline in India', website: 'https://www.spicejet.com', location: 'Gurgaon' }
  ],
  'Media & Entertainment': [
    { name: 'Zee Entertainment', description: 'Leading media and entertainment company', website: 'https://www.zeeentertainment.com', location: 'Mumbai' },
    { name: 'Star India', description: 'Leading media and entertainment network', website: 'https://www.startv.com', location: 'Mumbai' },
    { name: 'Sony Pictures Networks India', description: 'Leading entertainment network', website: 'https://www.sonypicturesnetworks.com', location: 'Mumbai' },
    { name: 'Viacom18', description: 'Leading entertainment network', website: 'https://www.viacom18.com', location: 'Mumbai' },
    { name: 'Sun TV Network', description: 'Leading regional entertainment network', website: 'https://www.suntv.in', location: 'Chennai' },
    { name: 'Times Network', description: 'Leading news and entertainment network', website: 'https://www.timesnetwork.in', location: 'Mumbai' },
    { name: 'Balaji Telefilms', description: 'Leading content production company', website: 'https://www.balajitelefilms.com', location: 'Mumbai' }
  ],
  'Education & Training': [
    { name: 'BYJU\'S', description: 'Leading educational technology company', website: 'https://www.byjus.com', location: 'Bangalore' },
    { name: 'Unacademy', description: 'Online learning platform', website: 'https://www.unacademy.com', location: 'Bangalore' },
    { name: 'Vedantu', description: 'Live online tutoring platform', website: 'https://www.vedantu.com', location: 'Bangalore' },
    { name: 'WhiteHat Jr', description: 'Online coding platform for kids', website: 'https://www.whitehatjr.com', location: 'Mumbai' },
    { name: 'Toppr', description: 'Online learning platform for K-12 students', website: 'https://www.toppr.com', location: 'Mumbai' },
    { name: 'NIIT', description: 'Leading skills and talent development company', website: 'https://www.niit.com', location: 'Gurgaon' },
    { name: 'Pearson India', description: 'Educational publishing and assessment company', website: 'https://www.pearson.com/en-in', location: 'New Delhi' }
  ],
  'Agriculture & Food Processing': [
    { name: 'ITC Agri Business', description: 'Leading agribusiness division of ITC', website: 'https://www.itcportal.com', location: 'Hyderabad' },
    { name: 'Adani Agri Fresh', description: 'Integrated agri-fresh business', website: 'https://www.adaniwilmar.com', location: 'Ahmedabad' },
    { name: 'Future Consumer', description: 'Food and FMCG manufacturing company', website: 'https://www.futureconsumer.in', location: 'Mumbai' },
    { name: 'Haldiram\'s', description: 'Leading snacks and sweets manufacturer', website: 'https://www.haldirams.com', location: 'New Delhi' },
    { name: 'Amul', description: 'Leading dairy cooperative', website: 'https://www.amul.com', location: 'Anand' },
    { name: 'Mother Dairy', description: 'Leading dairy products company', website: 'https://www.motherdairy.com', location: 'New Delhi' },
    { name: 'Patanjali Ayurved', description: 'FMCG and food products company', website: 'https://www.patanjaliayurved.net', location: 'Haridwar' }
  ],
  'Chemical': [
    { name: 'Asian Paints', description: 'India\'s largest paint company', website: 'https://www.asianpaints.com', location: 'Mumbai' },
    { name: 'Berger Paints', description: 'Leading paint and coating company', website: 'https://www.bergerpaints.com', location: 'Kolkata' },
    { name: 'UPL Limited', description: 'Leading provider of sustainable agriculture solutions', website: 'https://www.upl-ltd.com', location: 'Mumbai' },
    { name: 'Pidilite Industries', description: 'Leading manufacturer of adhesives and industrial chemicals', website: 'https://www.pidilite.com', location: 'Mumbai' },
    { name: 'Aarti Industries', description: 'Leading specialty chemicals manufacturer', website: 'https://www.aarti-industries.com', location: 'Mumbai' },
    { name: 'SRF Limited', description: 'Multi-business chemical company', website: 'https://www.srf.com', location: 'Gurgaon' },
    { name: 'Jubilant FoodWorks', description: 'Food service company with chemical heritage', website: 'https://www.jubilantfoodworks.com', location: 'Noida' }
  ],
  'Textiles & Apparel': [
    { name: 'Arvind Limited', description: 'Leading textile and apparel manufacturer', website: 'https://www.arvind.com', location: 'Ahmedabad' },
    { name: 'Raymond Limited', description: 'Leading textile and apparel company', website: 'https://www.raymond.in', location: 'Mumbai' },
    { name: 'Aditya Birla Fashion and Retail', description: 'Leading fashion and lifestyle company', website: 'https://www.abfrl.com', location: 'Mumbai' },
    { name: 'Welspun India', description: 'Leading home textile manufacturer', website: 'https://www.welspunindia.com', location: 'Mumbai' },
    { name: 'Trident Limited', description: 'Leading textile and paper manufacturer', website: 'https://www.tridentindia.com', location: 'Ludhiana' },
    { name: 'Vardhman Textiles', description: 'Leading textile manufacturer', website: 'https://www.vardhman.com', location: 'Ludhiana' },
    { name: 'Alok Industries', description: 'Textile manufacturing company', website: 'https://www.alokind.com', location: 'Mumbai' }
  ],
  'Electronics & Electrical': [
    { name: 'Havells India', description: 'Leading electrical equipment company', website: 'https://www.havells.com', location: 'Noida' },
    { name: 'Bajaj Electricals', description: 'Leading electrical appliances company', website: 'https://www.bajajelectricals.com', location: 'Mumbai' },
    { name: 'V-Guard Industries', description: 'Leading electrical appliances manufacturer', website: 'https://www.vguard.in', location: 'Kochi' },
    { name: 'Crompton Greaves Consumer Electricals', description: 'Leading electrical consumer durables company', website: 'https://www.crompton.co.in', location: 'Mumbai' },
    { name: 'Polycab India', description: 'Leading manufacturer of cables and wires', website: 'https://www.polycab.com', location: 'Mumbai' },
    { name: 'KEI Industries', description: 'Leading cable and wire manufacturer', website: 'https://www.kei-ind.com', location: 'New Delhi' },
    { name: 'Blue Star', description: 'Leading air conditioning and commercial refrigeration company', website: 'https://www.bluestarindia.com', location: 'Chennai' }
  ],
  'Aerospace & Defense': [
    { name: 'Hindustan Aeronautics Limited', description: 'Leading aerospace and defense company', website: 'https://www.hal-india.co.in', location: 'Bangalore' },
    { name: 'Bharat Electronics Limited', description: 'Leading defense electronics company', website: 'https://www.bel-india.in', location: 'Bangalore' },
    { name: 'DRDO', description: 'Defense Research and Development Organisation', website: 'https://www.drdo.gov.in', location: 'New Delhi' },
    { name: 'Larsen & Toubro Defense', description: 'Defense manufacturing division of L&T', website: 'https://www.larsentoubro.com', location: 'Chennai' },
    { name: 'Bharat Dynamics Limited', description: 'Leading missile manufacturer', website: 'https://www.bharatdynamics.in', location: 'Hyderabad' },
    { name: 'Mazagon Dock Shipbuilders', description: 'Leading shipbuilding company', website: 'https://www.mazagondock.in', location: 'Mumbai' },
    { name: 'Cochin Shipyard Limited', description: 'Leading shipbuilding and ship repair company', website: 'https://www.cochinshipyard.com', location: 'Kochi' }
  ],
  'Mining & Metals': [
    { name: 'Coal India Limited', description: 'World\'s largest coal mining company', website: 'https://www.coalindia.in', location: 'Kolkata' },
    { name: 'NMDC Limited', description: 'Leading iron ore mining company', website: 'https://www.nmdc.co.in', location: 'Hyderabad' },
    { name: 'Hindalco Industries', description: 'Leading aluminum and copper producer', website: 'https://www.hindalco.com', location: 'Mumbai' },
    { name: 'Vedanta Limited', description: 'Diversified natural resources company', website: 'https://www.vedantalimited.com', location: 'Mumbai' },
    { name: 'SAIL', description: 'Steel Authority of India Limited', website: 'https://www.sail.co.in', location: 'New Delhi' },
    { name: 'National Aluminium Company', description: 'Leading aluminum producer', website: 'https://www.nalcoindia.com', location: 'Bhubaneswar' },
    { name: 'Hindustan Zinc', description: 'Leading integrated zinc producer', website: 'https://www.hzlindia.com', location: 'Udaipur' }
  ],
  'Pharmaceuticals': [
    { name: 'Sun Pharmaceutical Industries', description: 'Leading pharmaceutical company', website: 'https://www.sunpharma.com', location: 'Mumbai' },
    { name: 'Dr. Reddy\'s Laboratories', description: 'Leading pharmaceutical company', website: 'https://www.drreddys.com', location: 'Hyderabad' },
    { name: 'Cipla', description: 'Global pharmaceutical company', website: 'https://www.cipla.com', location: 'Mumbai' },
    { name: 'Lupin Limited', description: 'Leading pharmaceutical company', website: 'https://www.lupin.com', location: 'Mumbai' },
    { name: 'Aurobindo Pharma', description: 'Leading generic pharmaceutical company', website: 'https://www.aurobindo.com', location: 'Hyderabad' },
    { name: 'Cadila Healthcare', description: 'Leading pharmaceutical company', website: 'https://www.cadilahealthcare.com', location: 'Ahmedabad' },
    { name: 'Torrent Pharmaceuticals', description: 'Leading pharmaceutical company', website: 'https://www.torrentpharma.com', location: 'Ahmedabad' }
  ],
  'Renewable Energy': [
    { name: 'Adani Green Energy', description: 'India\'s largest renewable energy company', website: 'https://www.adanigreenenergy.com', location: 'Ahmedabad' },
    { name: 'Tata Power Solar Systems', description: 'Leading solar energy solutions provider', website: 'https://www.tatapower.com', location: 'Mumbai' },
    { name: 'ReNew Power', description: 'Leading renewable energy company', website: 'https://www.renewpower.in', location: 'Gurgaon' },
    { name: 'Azure Power', description: 'Leading solar power producer', website: 'https://www.azurepower.com', location: 'New Delhi' },
    { name: 'Hero Future Energies', description: 'Renewable energy company', website: 'https://www.herofutureenergies.com', location: 'New Delhi' },
    { name: 'Greenko Group', description: 'Leading clean energy company', website: 'https://www.greenko.com', location: 'Hyderabad' },
    { name: 'JSW Energy', description: 'Leading power generation company', website: 'https://www.jsw.in', location: 'Mumbai' }
  ],
  'Hospitality & Tourism': [
    { name: 'Indian Hotels Company', description: 'Leading hospitality group with Taj brand', website: 'https://www.tajhotels.com', location: 'Mumbai' },
    { name: 'ITC Hotels', description: 'Luxury hotels division of ITC', website: 'https://www.itchotels.com', location: 'Kolkata' },
    { name: 'Oberoi Group', description: 'Luxury hotel group', website: 'https://www.oberoihotels.com', location: 'New Delhi' },
    { name: 'Lemon Tree Hotels', description: 'Leading mid-priced hotel chain', website: 'https://www.lemontreehotels.com', location: 'Gurgaon' },
    { name: 'OYO Hotels & Homes', description: 'Leading hospitality company', website: 'https://www.oyorooms.com', location: 'Gurgaon' },
    { name: 'MakeMyTrip', description: 'Leading online travel company', website: 'https://www.makemytrip.com', location: 'Gurgaon' },
    { name: 'Cleartrip', description: 'Online travel and tourism company', website: 'https://www.cleartrip.com', location: 'Mumbai' }
  ],
  'Government & Public Sector': [
    { name: 'Indian Administrative Service', description: 'Civil service of the Government of India', website: 'https://www.upsc.gov.in', location: 'New Delhi' },
    { name: 'Indian Railways', description: 'National railway system and largest employer', website: 'https://www.indianrailways.gov.in', location: 'New Delhi' },
    { name: 'Life Insurance Corporation', description: 'Largest life insurance company in India', website: 'https://www.licindia.in', location: 'Mumbai' },
    { name: 'Food Corporation of India', description: 'Government agency for food security', website: 'https://www.fci.gov.in', location: 'New Delhi' },
    { name: 'ISRO', description: 'Indian Space Research Organisation', website: 'https://www.isro.gov.in', location: 'Bangalore' },
    { name: 'All India Institute of Medical Sciences', description: 'Leading medical education and research institute', website: 'https://www.aiims.edu', location: 'New Delhi' },
    { name: 'Indian Institute of Technology', description: 'Premier engineering and technology institutes', website: 'https://www.iitb.ac.in', location: 'Mumbai' }
  ],
  'Consulting & Professional Services': [
    { name: 'McKinsey & Company India', description: 'Global management consulting firm', website: 'https://www.mckinsey.com', location: 'Mumbai' },
    { name: 'Boston Consulting Group India', description: 'Global management consulting firm', website: 'https://www.bcg.com', location: 'Mumbai' },
    { name: 'Bain & Company India', description: 'Global management consulting firm', website: 'https://www.bain.com', location: 'Mumbai' },
    { name: 'Deloitte India', description: 'Professional services network', website: 'https://www.deloitte.com', location: 'Mumbai' },
    { name: 'PwC India', description: 'Professional services network', website: 'https://www.pwc.in', location: 'Mumbai' },
    { name: 'KPMG India', description: 'Professional services company', website: 'https://www.kpmg.com/in', location: 'Mumbai' },
    { name: 'EY India', description: 'Professional services organization', website: 'https://www.ey.com/en_in', location: 'Mumbai' }
  ],
  'Biotechnology': [
    { name: 'Biocon', description: 'Leading biopharmaceutical company', website: 'https://www.biocon.com', location: 'Bangalore' },
    { name: 'Serum Institute of India', description: 'World\'s largest vaccine manufacturer', website: 'https://www.seruminstitute.com', location: 'Pune' },
    { name: 'Bharat Biotech', description: 'Leading biotechnology company', website: 'https://www.bharatbiotech.com', location: 'Hyderabad' },
    { name: 'Panacea Biotec', description: 'Biotechnology and pharmaceutical company', website: 'https://www.panaceabiotec.com', location: 'New Delhi' },
    { name: 'Indian Immunologicals', description: 'Leading vaccine manufacturer', website: 'https://www.indimmune.com', location: 'Hyderabad' },
    { name: 'Hester Biosciences', description: 'Animal healthcare company', website: 'https://www.hester.in', location: 'Ahmedabad' },
    { name: 'Strand Life Sciences', description: 'Genomics and precision medicine company', website: 'https://www.strandls.com', location: 'Bangalore' }
  ]
} as const;

// Skills taxonomy for PM internships
export const PM_SKILLS_BY_SECTOR = {
  'Information Technology': ['Software Development', 'Programming', 'Java', 'Python', 'JavaScript', 'Data Analytics', 'Cloud Computing', 'Machine Learning', 'Agile', 'DevOps'],
  'Banking & Financial Services': ['Financial Analysis', 'Banking Operations', 'Risk Management', 'Compliance', 'Digital Banking', 'Fintech', 'Investment Banking', 'Credit Analysis'],
  'Healthcare & Life Sciences': ['Healthcare Management', 'Clinical Research', 'Medical Devices', 'Regulatory Affairs', 'Healthcare Analytics', 'Patient Care', 'Pharmaceutical Research'],
  'Manufacturing': ['Production Management', 'Quality Control', 'Lean Manufacturing', 'Supply Chain', 'Industrial Engineering', 'Process Optimization', 'Operations Management'],
  'Automotive': ['Automotive Engineering', 'Supply Chain Management', 'Quality Assurance', 'Production Planning', 'Electric Vehicles', 'Automotive Design', 'Manufacturing'],
  'Telecommunications': ['Network Engineering', 'Telecom Infrastructure', '5G Technology', 'Network Operations', 'Telecommunications', 'Digital Communications', 'Wireless Technology'],
  'Oil & Energy': ['Energy Management', 'Oil & Gas Operations', 'Renewable Energy', 'Power Generation', 'Energy Analytics', 'Petroleum Engineering', 'Sustainability'],
  'Retail & Consumer Goods': ['Retail Management', 'Brand Management', 'Consumer Insights', 'Supply Chain', 'E-commerce', 'Digital Marketing', 'Category Management'],
  'Real Estate & Construction': ['Project Management', 'Real Estate Development', 'Construction Management', 'Property Management', 'Urban Planning', 'Architecture', 'Civil Engineering'],
  'Transportation & Logistics': ['Logistics Management', 'Supply Chain', 'Transportation Planning', 'Fleet Management', 'Warehouse Operations', 'Distribution', 'Operations Research'],
  'Media & Entertainment': ['Content Creation', 'Digital Media', 'Broadcasting', 'Entertainment Marketing', 'Content Strategy', 'Media Production', 'Creative Writing'],
  'Education & Training': ['Educational Technology', 'Curriculum Development', 'Training & Development', 'E-learning', 'Educational Content', 'Learning Analytics', 'Instructional Design'],
  'Agriculture & Food Processing': ['Agricultural Technology', 'Food Processing', 'Supply Chain Management', 'Agricultural Sciences', 'Food Safety', 'Agribusiness', 'Rural Development'],
  'Chemical': ['Chemical Engineering', 'Process Engineering', 'Quality Control', 'Research & Development', 'Chemical Safety', 'Manufacturing', 'Laboratory Analysis'],
  'Textiles & Apparel': ['Textile Technology', 'Fashion Design', 'Apparel Manufacturing', 'Quality Control', 'Supply Chain', 'Retail Management', 'Fashion Marketing'],
  'Electronics & Electrical': ['Electronics Engineering', 'Electrical Engineering', 'Circuit Design', 'Product Development', 'Quality Assurance', 'Manufacturing', 'Technical Support'],
  'Aerospace & Defense': ['Aerospace Engineering', 'Defense Technology', 'Systems Engineering', 'Project Management', 'Quality Assurance', 'Research & Development', 'Manufacturing'],
  'Mining & Metals': ['Mining Engineering', 'Metallurgy', 'Mineral Processing', 'Operations Management', 'Safety Management', 'Environmental Engineering', 'Resource Planning'],
  'Pharmaceuticals': ['Pharmaceutical Sciences', 'Drug Development', 'Clinical Research', 'Regulatory Affairs', 'Quality Assurance', 'Manufacturing', 'Medical Writing'],
  'Renewable Energy': ['Renewable Energy', 'Solar Technology', 'Wind Energy', 'Energy Storage', 'Project Management', 'Sustainability', 'Environmental Engineering'],
  'Hospitality & Tourism': ['Hospitality Management', 'Tourism Management', 'Customer Service', 'Event Management', 'Hotel Operations', 'Travel Planning', 'Guest Relations'],
  'Government & Public Sector': ['Public Administration', 'Policy Analysis', 'Government Operations', 'Public Service', 'Governance', 'Social Development', 'Administrative Services'],
  'Consulting & Professional Services': ['Management Consulting', 'Strategy Consulting', 'Business Analysis', 'Problem Solving', 'Client Management', 'Research & Analysis', 'Presentation Skills'],
  'Biotechnology': ['Biotechnology', 'Biomedical Engineering', 'Molecular Biology', 'Research & Development', 'Laboratory Analysis', 'Bioinformatics', 'Regulatory Affairs']
} as const;

// Education levels for proper matching
export const EDUCATION_LEVELS = [
  'Bachelor\'s Degree',
  'Master\'s Degree', 
  'PhD',
  'Diploma',
  'Professional Certification'
] as const;

export function generateCompanies(): Omit<Company, 'id' | 'createdAt'>[] {
  const companies: Omit<Company, 'id' | 'createdAt'>[] = [];
  
  for (const [sector, sectorCompanies] of Object.entries(COMPANY_DATABASE)) {
    for (const company of sectorCompanies) {
      companies.push({
        name: company.name,
        description: company.description,
        website: company.website,
        industry: sector,
        size: getSizeForSector(sector),
        logo: null,
        location: company.location
      });
    }
  }
  
  return companies;
}

function getSizeForSector(sector: string): string {
  // Most sectors have large companies in PM scheme
  const largeSectors = ['Information Technology', 'Banking & Financial Services', 'Oil & Energy', 'Telecommunications'];
  const mediumSectors = ['Education & Training', 'Biotechnology', 'Renewable Energy'];
  
  if (largeSectors.includes(sector)) {
    return 'Large (10000+ employees)';
  } else if (mediumSectors.includes(sector)) {
    return 'Medium (100-1000 employees)';
  } else {
    return 'Large (1000-10000 employees)';
  }
}

export function generateInternships(companies: (Omit<Company, 'id' | 'createdAt'> & {id: number})[]): any[] {
  const internships: any[] = [];
  
  // Generate 2-3 internships per company to reach 300-400+ total
  for (const company of companies) {
    const sector = company.industry!;
    const sectorSkills = PM_SKILLS_BY_SECTOR[sector as keyof typeof PM_SKILLS_BY_SECTOR] || ['General Business Skills'];
    
    // Generate 2-3 internships per company
    const internshipCount = Math.floor(Math.random() * 2) + 2; // 2-3 internships
    
    for (let i = 0; i < internshipCount; i++) {
      const internship = generateInternshipForCompany(company, sectorSkills, i);
      internships.push(internship);
    }
  }
  
  return internships;
}

function generateInternshipForCompany(
  company: Omit<Company, 'id' | 'createdAt'> & {id: number}, 
  sectorSkills: readonly string[], 
  index: number
): Omit<Internship, 'id' | 'createdAt' | 'postedAt' | 'company'> {
  
  const titles = [
    'Product Management Intern',
    'Business Analyst Intern', 
    'Strategy Intern',
    'Operations Intern',
    'Digital Product Intern',
    'Market Research Intern',
    'Business Development Intern',
    'Product Development Intern'
  ];
  
  const locations = ['Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Gurgaon', 'Kolkata'];
  const durations = ['3 months', '6 months', '12 months'];
  const stipends = ['15000', '20000', '25000', '30000', '35000', '40000'];
  
  // Select skills from sector + some general PM skills
  const selectedSkills = [...sectorSkills.slice(0, 4), 'Product Management', 'Market Research', 'Analytics'];
  
  const title = titles[index % titles.length];
  const isRemote = Math.random() > 0.6; // 40% remote
  const stipend = stipends[Math.floor(Math.random() * stipends.length)];
  const duration = durations[Math.floor(Math.random() * durations.length)];
  const location = isRemote ? 'Remote' : (company.location || locations[Math.floor(Math.random() * locations.length)]);
  
  // Generate realistic dates
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() + Math.floor(Math.random() * 4) + 1); // 1-4 months from now
  
  const deadline = new Date(startDate);
  deadline.setMonth(deadline.getMonth() - 1); // 1 month before start
  
  return {
    companyId: company.id,
    title: title,
    description: generateDescription(title, company.name, company.industry!),
    requirements: generateRequirements(selectedSkills),
    benefits: generateBenefits(company.industry!),
    location: location,
    remote: isRemote,
    duration: duration,
    stipend: stipend,
    skills: JSON.stringify(selectedSkills),
    startDate: startDate,
    applicationDeadline: deadline,
    isActive: true
  };
}

function generateDescription(title: string, companyName: string, sector: string): string {
  const descriptions = {
    'Product Management Intern': `Join ${companyName} as a Product Management Intern and work on innovative ${sector.toLowerCase()} solutions. You'll collaborate with cross-functional teams to develop product strategies, conduct market research, and support product launches. This role offers hands-on experience in product lifecycle management and strategic decision-making.`,
    'Business Analyst Intern': `Work as a Business Analyst Intern at ${companyName} and contribute to strategic initiatives in the ${sector.toLowerCase()} industry. You'll analyze business processes, gather requirements, and support data-driven decision making. Gain experience in process improvement and business optimization.`,
    'Strategy Intern': `Join the strategy team at ${companyName} and work on high-impact projects in the ${sector.toLowerCase()} sector. You'll conduct market analysis, support strategic planning, and contribute to business growth initiatives. Perfect opportunity to learn strategic thinking and industry dynamics.`,
    'Operations Intern': `Gain operational excellence experience as an Operations Intern at ${companyName}. Work on process optimization, supply chain management, and operational efficiency projects in the ${sector.toLowerCase()} industry. Learn lean methodologies and operational best practices.`,
    'Digital Product Intern': `Join ${companyName}'s digital transformation journey as a Digital Product Intern. Work on digital products and platforms in the ${sector.toLowerCase()} space. Collaborate with tech teams and learn about user experience design, digital strategy, and product analytics.`,
    'Market Research Intern': `Conduct market research and competitive analysis as a Market Research Intern at ${companyName}. Support business development and product strategy with insights about the ${sector.toLowerCase()} market. Learn research methodologies and market intelligence.`,
    'Business Development Intern': `Support business growth initiatives as a Business Development Intern at ${companyName}. Work on partnership development, market expansion, and customer acquisition in the ${sector.toLowerCase()} industry. Gain experience in sales strategy and relationship management.`,
    'Product Development Intern': `Contribute to product innovation as a Product Development Intern at ${companyName}. Work on new product development processes and support R&D initiatives in the ${sector.toLowerCase()} sector. Learn about innovation management and product design.`
  };
  
  return descriptions[title as keyof typeof descriptions] || `Exciting internship opportunity at ${companyName} in the ${sector.toLowerCase()} industry.`;
}

function generateRequirements(skills: string[]): string {
  const educationReqs = ['Bachelor\'s or Master\'s degree in Engineering, Business, or related field', 'Current student in final year or recent graduate', 'MBA students or Engineering students preferred'];
  const skillReqs = skills.slice(0, 3).map(skill => skill.toLowerCase());
  
  return `${educationReqs[Math.floor(Math.random() * educationReqs.length)]}. Strong interest in ${skillReqs.join(', ')}. Excellent analytical and communication skills. Team player with proactive attitude.`;
}

function generateBenefits(sector: string): string {
  const generalBenefits = ['Mentorship program', 'Industry exposure', 'Networking opportunities', 'Certificate of completion', 'Potential full-time offer'];
  const sectorSpecific = {
    'Information Technology': 'Technical training and certification',
    'Banking & Financial Services': 'Financial services training',
    'Healthcare & Life Sciences': 'Healthcare industry exposure',
    'default': 'Professional development'
  };
  
  const specific = sectorSpecific[sector as keyof typeof sectorSpecific] || sectorSpecific.default;
  const selected = generalBenefits.slice(0, 3);
  selected.push(specific);
  
  return selected.join(', ');
}
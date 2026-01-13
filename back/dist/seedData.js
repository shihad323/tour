"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Define schemas directly for seeding
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    phone: String,
    picture: String,
    address: String,
    isDeleted: { type: Boolean, default: false },
    isActive: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    isVerified: { type: Boolean, default: false },
    auths: [String],
}, { timestamps: true });
const tourTypeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: String,
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const tourSchema = new mongoose_1.default.Schema({
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    location: { type: String, required: true },
    costFrom: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tourType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'TourType', required: true },
    included: [String],
    excluded: [String],
    amenities: [String],
    tourPlan: [String],
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
const TourType = mongoose_1.default.model('TourType', tourTypeSchema);
const Tour = mongoose_1.default.model('Tour', tourSchema);
async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI not found in .env file');
        }
        console.log('🔄 Connecting to MongoDB...');
        await mongoose_1.default.connect(mongoUri);
        console.log('✅ Connected to MongoDB');
        // Hash passwords
        const hashedPassword1 = await bcryptjs_1.default.hash('password123', 10);
        const hashedPassword2 = await bcryptjs_1.default.hash('password456', 10);
        // Clear existing data (optional - comment out to keep data)
        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await Tour.deleteMany({});
        await TourType.deleteMany({});
        // 1. Insert Tour Types
        console.log('📝 Inserting tour types...');
        const tourTypes = await TourType.insertMany([
            {
                name: 'Beach Resort',
                description: 'Relaxing beach vacation tours with water activities',
            },
            {
                name: 'Mountain Trek',
                description: 'Adventure mountain climbing and hiking tours',
            },
            {
                name: 'City Tour',
                description: 'Cultural and historical city exploration tours',
            },
            {
                name: 'Adventure Sports',
                description: 'Extreme sports and adventure tours',
            },
        ]);
        console.log(`✅ Inserted ${tourTypes.length} tour types`);
        // 2. Insert Dummy Users
        console.log('📝 Inserting dummy users...');
        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword1,
                role: 'User',
                phone: '01912345678',
                address: '123 Main Street, Dhaka',
                isActive: 'Active',
                isVerified: true,
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword2,
                role: 'User',
                phone: '01987654321',
                address: '456 Park Lane, Dhaka',
                isActive: 'Active',
                isVerified: true,
            },
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword1,
                role: 'Admin',
                phone: '01945678901',
                address: '789 Admin Road, Dhaka',
                isActive: 'Active',
                isVerified: true,
            },
        ]);
        console.log(`✅ Inserted ${users.length} users`);
        // 3. Insert Dummy Tours
        console.log('📝 Inserting dummy tours...');
        const tours = await Tour.insertMany([
            {
                slug: 'paris-city-tour-2024',
                title: 'Paris City Tour',
                description: 'Explore the beautiful city of Paris with our guided tour. Visit the Eiffel Tower, Louvre Museum, Arc de Triomphe, and enjoy French cuisine. Perfect for history and art lovers.',
                images: ['paris1.jpg', 'paris2.jpg', 'paris3.jpg'],
                location: 'Paris, France',
                costFrom: 1500,
                startDate: new Date('2025-06-01'),
                endDate: new Date('2025-06-07'),
                tourType: tourTypes[2]._id, // City Tour
                included: ['Hotel 4-star', 'All transports', 'Breakfast daily', 'Guided tours', 'Eiffel Tower entry'],
                excluded: ['Dinner', 'Personal shopping', 'Travel insurance'],
                amenities: ['WiFi', 'AC', 'Swimming pool', 'Restaurant'],
                tourPlan: [
                    'Day 1: Arrival in Paris, hotel check-in, evening city walk',
                    'Day 2: Eiffel Tower and Seine river cruise',
                    'Day 3: Louvre Museum and Arc de Triomphe',
                    'Day 4: Versailles Palace full-day tour',
                    'Day 5: French cuisine cooking class',
                    'Day 6: Free day for shopping and exploration',
                    'Day 7: Departure',
                ],
            },
            {
                slug: 'maldives-beach-resort-2024',
                title: 'Maldives Beach Resort',
                description: 'Experience paradise in the Maldives with overwater bungalows, snorkeling, and water sports. Crystal clear waters and white sandy beaches await you.',
                images: ['maldives1.jpg', 'maldives2.jpg'],
                location: 'Maldives',
                costFrom: 2000,
                startDate: new Date('2025-07-10'),
                endDate: new Date('2025-07-17'),
                tourType: tourTypes[0]._id, // Beach Resort
                included: ['Overwater bungalow', 'All meals', 'Snorkeling', 'Island hopping'],
                excluded: ['Spa treatments', 'Water sports rentals'],
                amenities: ['Private beach', 'Diving center', 'Spa', 'Water sports'],
                tourPlan: [
                    'Day 1: Arrival and resort check-in',
                    'Day 2-4: Beach relaxation and snorkeling',
                    'Day 5: Island hopping and fishing',
                    'Day 6: Spa day',
                    'Day 7: Departure',
                ],
            },
            {
                slug: 'swiss-mountain-trek-2024',
                title: 'Swiss Mountain Trek',
                description: 'Challenge yourself with an epic mountain trek through the Swiss Alps. Experience breathtaking views of glaciers, alpine meadows, and pristine lakes.',
                images: ['swiss1.jpg', 'swiss2.jpg'],
                location: 'Swiss Alps, Switzerland',
                costFrom: 1800,
                startDate: new Date('2025-08-01'),
                endDate: new Date('2025-08-10'),
                tourType: tourTypes[1]._id, // Mountain Trek
                included: ['Mountain lodge accommodation', 'All meals', 'Expert guides', 'Equipment rental'],
                excluded: ['Personal climbing insurance'],
                amenities: ['Mountain lodges', 'Training sessions', 'Medical support'],
                tourPlan: [
                    'Day 1: Arrival and acclimatization',
                    'Day 2-3: Base camp setup and training',
                    'Day 4-8: Summit expedition',
                    'Day 9: Descent and celebration',
                    'Day 10: Departure',
                ],
            },
            {
                slug: 'thailand-adventure-2024',
                title: 'Thailand Adventure',
                description: 'Discover the vibrant culture of Thailand. Visit ancient temples, explore bustling night markets, and experience authentic Thai cuisine.',
                images: ['thailand1.jpg', 'thailand2.jpg'],
                location: 'Bangkok & Phuket, Thailand',
                costFrom: 900,
                startDate: new Date('2025-09-15'),
                endDate: new Date('2025-09-22'),
                tourType: tourTypes[2]._id, // City Tour
                included: ['Hotel 3-star', 'Daily breakfast', 'Local guide', 'Temple visits'],
                excluded: ['Dinner and lunch', 'Entertainment'],
                amenities: ['WiFi', 'AC', 'Local cuisine restaurant'],
                tourPlan: [
                    'Day 1: Arrival in Bangkok',
                    'Day 2: Grand Palace and Temple of the Emerald Buddha',
                    'Day 3: Night bazaar and local markets',
                    'Day 4: Travel to Phuket',
                    'Day 5: Beach day and water sports',
                    'Day 6: Island hopping',
                    'Day 7: Departure',
                ],
            },
            {
                slug: 'bungee-jumping-new-zealand-2024',
                title: 'Bungee Jumping New Zealand',
                description: 'Get your adrenaline rushing with extreme bungee jumping at the Kawarau Bridge. Experience the ultimate thrill with professional guides.',
                images: ['nz1.jpg', 'nz2.jpg'],
                location: 'Queenstown, New Zealand',
                costFrom: 600,
                startDate: new Date('2025-10-01'),
                endDate: new Date('2025-10-05'),
                tourType: tourTypes[3]._id, // Adventure Sports
                included: ['Bungee jump', 'Safety equipment', 'Professional guides', 'Video recording'],
                excluded: ['Travel insurance'],
                amenities: ['Adventure gear', 'Medical support', 'Photo services'],
                tourPlan: [
                    'Day 1: Arrival and orientation',
                    'Day 2-3: Bungee jumping sessions',
                    'Day 4: Scenic tours and sightseeing',
                    'Day 5: Departure',
                ],
            },
        ]);
        console.log(`✅ Inserted ${tours.length} tours`);
        // Print summary
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n📊 Data Summary:');
        console.log(`   • Users: ${users.length}`);
        console.log(`   • Tour Types: ${tourTypes.length}`);
        console.log(`   • Tours: ${tours.length}`);
        console.log('\n🔐 Test Credentials:');
        console.log('   User 1:');
        console.log('   Email: john@example.com');
        console.log('   Password: password123');
        console.log('\n   User 2:');
        console.log('   Email: jane@example.com');
        console.log('   Password: password456');
        console.log('\n   Admin:');
        console.log('   Email: admin@example.com');
        console.log('   Password: password123');
        console.log('\n═══════════════════════════════════════════════════════\n');
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

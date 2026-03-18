// Enhanced CORS-free SMS and communication system
class CommunicationManager {
    constructor() {
        this.fallbackMethods = ['whatsapp', 'gmail', 'sms_link'];
        this.currentMethod = 0;
    }

    async sendSMS(phoneNumber, message) {
        console.log('Attempting to send SMS via multiple methods...');
        const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${phoneNumber}@sms.gateway&su=Rituals%20Booking&body=${encodeURIComponent(message)}`;
        
        const methods = [
            { name: 'SMS Link', link: smsLink },
            { name: 'WhatsApp', link: whatsappLink },
            { name: 'Gmail SMS', link: gmailLink }
        ];
        
        for (let method of methods) {
            try {
                console.log(`Trying ${method.name}...`);
                const success = await this.tryCommunicationMethod(method.link);
                if (success) {
                    console.log(`${method.name} successful!`);
                    return true;
                }
            } catch (error) {
                console.log(`${method.name} failed, trying next method...`);
                continue;
            }
        }
        this.showManualSMSInstructions(phoneNumber, message);
        return false;
    }

    tryCommunicationMethod(link) {
        return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(false), 2000);
            const newWindow = window.open(link, '_blank');
            if (newWindow) {
                setTimeout(() => {
                    clearTimeout(timeout);
                    resolve(true);
                }, 1000);
            } else {
                clearTimeout(timeout);
                resolve(false);
            }
        });
    }

    showManualSMSInstructions(phoneNumber, message) {
        alert('Manual SMS Instructions:\n\n1. Open messaging app\n2. Create new message to: ' + phoneNumber + '\n3. Copy and paste:\n\n' + message + '\n\n4. Send');
    }

    async sendOrderConfirmations(orderSummary, userAddress, currentFaith) {
        const phoneNumber = this.getPhoneNumber(currentFaith);
        const smsMessage = this.createSMSMessage(orderSummary, userAddress);
        const whatsappMessage = this.createWhatsAppMessage(orderSummary, userAddress);
        const emailMessage = this.createEmailMessage(orderSummary, userAddress);
        
        await this.sendSMS(phoneNumber, smsMessage);
        this.sendToWhatsApp(phoneNumber, whatsappMessage);
        this.sendToGmail(emailMessage, userAddress);
        
        showNotification("Booking confirmed! Notifications sent via multiple channels");
    }

    getPhoneNumber(faith) {
        return faith === 'hindu' ? '+919248868387' : '+919866193066';
    }

    createSMSMessage(orderSummary, userAddress) {
        return `Rituals Booking: ${userAddress.fullName} - ${orderSummary.totalAmount}. Date: ${userAddress.ceremonyDate}. Check email for details.`;
    }

    createWhatsAppMessage(orderSummary, userAddress) {
        return `*Rituals Booking Confirmation*\n\n${orderSummary.details}\n\n*Customer:* ${userAddress.fullName}\n*Phone:* ${userAddress.phoneNumber}\n*Date:* ${userAddress.ceremonyDate}\n\nPlease confirm this booking.`;
    }

    createEmailMessage(orderSummary, userAddress) {
        return `Rituals Booking Details:\n\n${orderSummary.fullDetails}\n\nCustomer Information:\nName: ${userAddress.fullName}\nPhone: ${userAddress.phoneNumber}\nAddress: ${userAddress.addressLine1}, ${userAddress.city}\nCeremony Date: ${userAddress.ceremonyDate}`;
    }

    sendToWhatsApp(phoneNumber, message) {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }

    sendToGmail(message, userAddress) {
        const subject = `Rituals Booking - ${userAddress.fullName}`;
        const body = message;
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=chanakyasahni8@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
}

const commManager = new CommunicationManager();

// Comprehensive Multi-Faith Calendar Data 2024-2026 (same as original)
const multiFaithCalendar = {
    2024: {
        hindu: {
            January: [
                { date: "14", name: "Makar Sankranti" },
                { date: "15", name: "Pongal" },
                { date: "26", name: "Republic Day" }
            ],
            February: [
                { date: "14", name: "Basant Panchami" },
                { date: "19", name: "Shivaji Jayanti" }
            ],
            March: [
                { date: "8", name: "Maha Shivratri" },
                { date: "10", name: "Holi" },
                { date: "25", name: "Ram Navami" }
            ],
            April: [
                { date: "6", name: "Hanuman Jayanti" },
                { date: "14", name: "Ambedkar Jayanti" },
                { date: "17", name: "Ram Navami" }
            ],
            May: [
                { date: "10", name: "Akshaya Tritiya" },
                { date: "23", name: "Buddha Purnima" }
            ],
            June: [
                { date: "21", name: "International Yoga Day" }
            ],
            July: [
                { date: "7", name: "Rath Yatra" },
                { date: "21", name: "Guru Purnima" }
            ],
            August: [
                { date: "15", name: "Independence Day" },
                { date: "19", name: "Raksha Bandhan" },
                { date: "26", name: "Janmashtami" }
            ],
            September: [
                { date: "6", name: "Ganesh Chaturthi" },
                { date: "17", name: "Vishwakarma Puja" }
            ],
            October: [
                { date: "2", name: "Gandhi Jayanti" },
                { date: "3-12", name: "Navratri" },
                { date: "12", name: "Dussehra" },
                { date: "17", name: "Valmiki Jayanti" },
                { date: "31", name: "Deepawali" }
            ],
            November: [
                { date: "1", name: "Govardhan Puja" },
                { date: "2", name: "Bhai Dooj" },
                { date: "15", name: "Chhath Puja" }
            ],
            December: [
                { date: "25", name: "Christmas" }
            ]
        },
        muslim: {
            January: [{ date: "10", name: "Mawlid al-Nabi" }],
            March: [{ date: "11", name: "Ramadan Begins" }],
            April: [{ date: "10", name: "Eid al-Fitr" }],
            June: [{ date: "16", name: "Eid al-Adha" }],
            July: [{ date: "7", name: "Islamic New Year" }, { date: "17", name: "Muharram" }],
            September: [{ date: "16", name: "Milad un-Nabi" }]
        },
        sikh: {
            January: [{ date: "5", name: "Guru Gobind Singh Jayanti" }],
            February: [{ date: "24", name: "Guru Ravidas Jayanti" }],
            April: [{ date: "13", name: "Vaisakhi" }],
            June: [{ date: "16", name: "Guru Arjan Dev Martyrdom" }],
            November: [{ date: "15", name: "Guru Nanak Jayanti" }, { date: "24", name: "Guru Tegh Bahadur Martyrdom" }]
        },
        christian: {
            March: [{ date: "29", name: "Good Friday" }, { date: "31", name: "Easter Sunday" }],
            May: [{ date: "19", name: "Pentecost" }],
            December: [{ date: "25", name: "Christmas" }]
        },
        jain: {
            January: [{ date: "17", name: "Shattila Ekadashi" }],
            February: [{ date: "25", name: "Vijaya Ekadashi" }],
            March: [{ date: "10", name: "Amalaki Ekadashi" }],
            April: [{ date: "21", name: "Mahavir Jayanti" }, { date: "24", name: "Papmochani Ekadashi" }],
            May: [{ date: "9", name: "Varuthini Ekadashi" }],
            June: [{ date: "23", name: "Mohini Ekadashi" }],
            July: [{ date: "7", name: "Apara Ekadashi" }],
            August: [{ date: "6", name: "Padmini Ekadashi" }],
            September: [{ date: "2-9", name: "Paryushan Parva" }, { date: "9", name: "Samvatsari" }, { date: "20", name: "Parama Ekadashi" }],
            October: [{ date: "20", name: "Indira Ekadashi" }],
            November: [{ date: "4", name: "Papankusha Ekadashi" }],
            December: [{ date: "19", name: "Mokshada Ekadashi" }]
        }
    },
    2025: {
        hindu: {
            January: [{ date: "14", name: "Makar Sankranti" }, { date: "15", name: "Pongal" }, { date: "26", name: "Republic Day" }],
            February: [{ date: "3", name: "Basant Panchami" }, { date: "19", name: "Shivaji Jayanti" }],
            March: [{ date: "1", name: "Maha Shivratri" }, { date: "14", name: "Holi" }],
            April: [{ date: "6", name: "Hanuman Jayanti" }, { date: "14", name: "Ambedkar Jayanti" }, { date: "17", name: "Ram Navami" }],
            May: [{ date: "1", name: "Akshaya Tritiya" }, { date: "12", name: "Buddha Purnima" }],
            June: [{ date: "21", name: "International Yoga Day" }],
            July: [{ date: "17", name: "Rath Yatra" }, { date: "31", name: "Guru Purnima" }],
            August: [{ date: "15", name: "Independence Day" }, { date: "9", name: "Raksha Bandhan" }, { date: "16", name: "Janmashtami" }],
            September: [{ date: "26", name: "Ganesh Chaturthi" }, { date: "17", name: "Vishwakarma Puja" }],
            October: [{ date: "2", name: "Gandhi Jayanti" }, { date: "22-31", name: "Navratri" }, { date: "31", name: "Dussehra" }],
            November: [{ date: "1", name: "Deepawali" }, { date: "2", name: "Govardhan Puja" }, { date: "3", name: "Bhai Dooj" }, { date: "15", name: "Chhath Puja" }],
            December: [{ date: "25", name: "Christmas" }]
        },
        muslim: {
            March: [{ date: "1", name: "Ramadan Begins" }],
            April: [{ date: "30", name: "Eid al-Fitr" }],
            June: [{ date: "6", name: "Eid al-Adha" }],
            July: [{ date: "26", name: "Islamic New Year" }],
            August: [{ date: "5", name: "Muharram" }],
            September: [{ date: "5", name: "Milad un-Nabi" }]
        },
        sikh: {
            January: [{ date: "13", name: "Guru Gobind Singh Jayanti" }],
            February: [{ date: "12", name: "Guru Ravidas Jayanti" }],
            April: [{ date: "14", name: "Vaisakhi" }],
            June: [{ date: "5", name: "Guru Arjan Dev Martyrdom" }],
            November: [{ date: "5", name: "Guru Nanak Jayanti" }, { date: "14", name: "Guru Tegh Bahadur Martyrdom" }]
        },
        christian: {
            April: [{ date: "18", name: "Good Friday" }, { date: "20", name: "Easter Sunday" }],
            June: [{ date: "8", name: "Pentecost" }],
            December: [{ date: "25", name: "Christmas" }]
        },
        jain: {
            January: [{ date: "6", name: "Shattila Ekadashi" }],
            February: [{ date: "20", name: "Vijaya Ekadashi" }],
            March: [{ date: "6", name: "Amalaki Ekadashi" }],
            April: [{ date: "5", name: "Papmochani Ekadashi" }, { date: "10", name: "Mahavir Jayanti" }],
            May: [{ date: "4", name: "Varuthini Ekadashi" }],
            June: [{ date: "3", name: "Mohini Ekadashi" }],
            July: [{ date: "2", name: "Apara Ekadashi" }, { date: "31", name: "Padmini Ekadashi" }],
            August: [{ date: "30", name: "Parama Ekadashi" }],
            September: [{ date: "14", name: "Indira Ekadashi" }, { date: "22-29", name: "Paryushan Parva" }, { date: "29", name: "Samvatsari" }],
            October: [{ date: "13", name: "Papankusha Ekadashi" }],
            November: [{ date: "12", name: "Mokshada Ekadashi" }],
            December: [{ date: "12", name: "Saphala Ekadashi" }]
        }
    },
    2026: {
        hindu: {
            January: [{ date: "14", name: "Makar Sankranti" }, { date: "15", name: "Pongal" }, { date: "26", name: "Republic Day" }],
            February: [{ date: "23", name: "Basant Panchami" }, { date: "19", name: "Shivaji Jayanti" }],
            March: [{ date: "20", name: "Maha Shivratri" }, { date: "3", name: "Holi" }],
            April: [{ date: "14", name: "Ambedkar Jayanti" }, { date: "26", name: "Hanuman Jayanti" }],
            May: [{ date: "20", name: "Akshaya Tritiya" }, { date: "2", name: "Buddha Purnima" }],
            June: [{ date: "21", name: "International Yoga Day" }],
            July: [{ date: "6", name: "Rath Yatra" }, { date: "20", name: "Guru Purnima" }],
            August: [{ date: "15", name: "Independence Day" }, { date: "29", name: "Raksha Bandhan" }, { date: "5", name: "Janmashtami" }],
            September: [{ date: "15", name: "Ganesh Chaturthi" }, { date: "17", name: "Vishwakarma Puja" }],
            October: [{ date: "2", name: "Gandhi Jayanti" }, { date: "11-20", name: "Navratri" }, { date: "20", name: "Dussehra" }],
            November: [{ date: "8", name: "Deepawali" }, { date: "9", name: "Govardhan Puja" }, { date: "10", name: "Bhai Dooj" }, { date: "15", name: "Chhath Puja" }],
            December: [{ date: "25", name: "Christmas" }]
        },
        muslim: {
            February: [{ date: "18", name: "Ramadan Begins" }],
            March: [{ date: "20", name: "Eid al-Fitr" }],
            May: [{ date: "27", name: "Eid al-Adha" }],
            July: [{ date: "16", name: "Islamic New Year" }],
            August: [{ date: "25", name: "Muharram" }],
            September: [{ date: "24", name: "Milad un-Nabi" }]
        },
        sikh: {
            January: [{ date: "3", name: "Guru Gobind Singh Jayanti" }],
            February: [{ date: "2", name: "Guru Ravidas Jayanti" }],
            April: [{ date: "14", name: "Vaisakhi" }],
            May: [{ date: "25", name: "Guru Arjan Dev Martyrdom" }],
            November: [{ date: "24", name: "Guru Nanak Jayanti" }, { date: "3", name: "Guru Tegh Bahadur Martyrdom" }]
        },
        christian: {
            April: [{ date: "3", name: "Good Friday" }, { date: "5", name: "Easter Sunday" }],
            May: [{ date: "24", name: "Pentecost" }],
            December: [{ date: "25", name: "Christmas" }]
        },
        jain: {
            January: [{ date: "26", name: "Shattila Ekadashi" }],
            February: [{ date: "9", name: "Vijaya Ekadashi" }],
            March: [{ date: "10", name: "Amalaki Ekadashi" }],
            April: [{ date: "9", name: "Papmochani Ekadashi" }, { date: "14", name: "Mahavir Jayanti" }],
            May: [{ date: "8", name: "Varuthini Ekadashi" }],
            June: [{ date: "7", name: "Mohini Ekadashi" }],
            July: [{ date: "6", name: "Apara Ekadashi" }],
            August: [{ date: "5", name: "Padmini Ekadashi" }],
            September: [{ date: "3", name: "Parama Ekadashi" }, { date: "11-18", name: "Paryushan Parva" }, { date: "18", name: "Samvatsari" }],
            October: [{ date: "3", name: "Indira Ekadashi" }],
            November: [{ date: "2", name: "Papankusha Ekadashi" }],
            December: [{ date: "1", name: "Mokshada Ekadashi" }, { date: "31", name: "Saphala Ekadashi" }]
        }
    }
};

// Global variables
let currentFaith = "";
let currentEvent = null;
let cart = {
    event: null,
    items: [],
    service: null
};
let userAddress = {};

const { jsPDF } = window.jspdf;

// PDF Contents (with Rituals branding)
const pdfContents = {
    'starter-guide': {
        title: 'Rituals Starter Guide',
        filename: 'Rituals-Starter-Guide.pdf',
        sections: [
            {
                title: 'Welcome to Rituals',
                content: 'Rituals is India\'s premier multi-faith platform connecting you with authentic religious services across Hindu, Muslim, Sikh, Christian, and Jain traditions. Our mission is to preserve religious traditions while embracing modern technology.'
            },
            {
                title: 'Platform Features',
                content: '• Multi-Faith Services: Access ceremonies across 5 major religions\n• Verified Providers: All service providers are thoroughly vetted\n• Easy Booking: Simple 5-step booking process\n• Secure Payments: UPI and QR code payment options\n• Comprehensive Resources: Guides, calendars, and educational materials'
            },
            {
                title: 'Getting Started',
                content: '1. Select your faith tradition from the Services page\n2. Choose your desired ceremony from available options\n3. Add necessary religious items to your cart\n4. Select a verified service provider\n5. Complete payment and verification process\n\nOur platform supports ceremonies for all major life events including weddings, house blessings, naming ceremonies, and festival celebrations.'
            },
            {
                title: 'Support & Contact',
                content: 'Email: support@rituals.com\nPhone: +91 98765 43210\nGmail: chanakyasahni8@gmail.com\n\nOperating Hours: 7:00 AM - 10:00 PM (All days)\n\nWe are committed to providing authentic religious services while maintaining the highest standards of quality and tradition.'
            }
        ]
    },
    'prayer-collection': {
        title: 'Multi-Faith Prayer Collection',
        filename: 'Rituals-Prayer-Collection.pdf',
        sections: [
            {
                title: 'Universal Prayer Collection',
                content: 'This comprehensive collection brings together sacred prayers, mantras, hymns, and devotional texts from all five major faith traditions practiced in India. Each prayer is presented with translations and explanations to enhance understanding and spiritual practice.'
            },
            {
                title: 'Hindu Prayers & Mantras',
                content: 'Gayatri Mantra: Om Bhur Bhuvah Swah...\nMaha Mrityunjaya Mantra: Om Tryambakam Yajamahe...\nShanti Mantra: Om Sarveshaam Svastir Bhavatu...\n\nThese Vedic mantras are chanted for spiritual enlightenment, protection, and peace. Regular recitation brings mental clarity and divine connection.'
            },
            {
                title: 'Islamic Prayers & Duas',
                content: 'Daily Salah: Five obligatory prayers\nBismillah: In the name of Allah\nAyatul Kursi: Throne verse for protection\nSurah Al-Fatihah: The opening chapter\n\nIslamic prayers emphasize submission to Allah and seeking guidance. Duas (supplications) are personal prayers for various needs and occasions.'
            },
            {
                title: 'Sikh Prayers & Shabads',
                content: 'Japji Sahib: Morning prayer by Guru Nanak\nSukhmani Sahib: Prayer for peace and comfort\nRehras Sahib: Evening prayer\nKirtan Sohila: Night prayer\n\nGurbani (Guru\'s word) forms the core of Sikh prayers, emphasizing remembrance of God and service to humanity.'
            },
            {
                title: 'Christian Prayers & Hymns',
                content: 'The Lord\'s Prayer: Our Father who art in heaven...\nApostles\' Creed: Statement of Christian faith\nHail Mary: Prayer to Virgin Mary\nAmazing Grace: Popular Christian hymn\n\nChristian prayers focus on relationship with God through Jesus Christ, emphasizing love, forgiveness, and salvation.'
            },
            {
                title: 'Jain Prayers & Stotras',
                content: 'Namokar Mantra: Salutation to the five revered beings\nBhaktamar Stotra: Ancient devotional hymn\nUvasaggaharam Stotra: Prayer for removing obstacles\nLogassa Sutra: Prayer for universal well-being\n\nJain prayers emphasize non-violence, spiritual purification, and reverence for all living beings.'
            }
        ]
    },
    'dietary-guide': {
        title: 'Religious Dietary Guide',
        filename: 'Rituals-Dietary-Guide.pdf',
        sections: [
            {
                title: 'Multi-Faith Dietary Practices',
                content: 'This guide explores the diverse dietary practices, food restrictions, and culinary traditions across Hindu, Muslim, Sikh, Christian, and Jain faiths. Understanding these practices is essential for respectful interfaith interactions and proper ceremony preparations.'
            },
            {
                title: 'Hindu Dietary Principles',
                content: 'Satvik Diet: Pure, wholesome foods promoting spirituality\nFoods: Fresh fruits, vegetables, grains, dairy (no onions/garlic)\nRestrictions: Generally vegetarian, no beef\nFestival Foods: Prasad (blessed food), sweets, traditional dishes\n\nMany Hindus follow lacto-vegetarian diets emphasizing purity and non-violence.'
            },
            {
                title: 'Islamic Dietary Laws',
                content: 'Halal: Permitted foods according to Islamic law\nRequirements: Proper slaughter method, prayer invocation\nProhibited: Pork, alcohol, carnivorous animals\nRamadan: Fasting from dawn to sunset during holy month\n\nHalal certification ensures food meets Islamic dietary requirements.'
            },
            {
                title: 'Sikh Food Traditions',
                content: 'Langar: Community kitchen serving free meals to all\nDiet: Generally vegetarian in Gurdwaras\nRestrictions: No tobacco, alcohol (Kurehats)\nKarah Parshad: Sacred sweet offering\n\nSikhism emphasizes equality and service through community feeding.'
            },
            {
                title: 'Christian Dietary Practices',
                content: 'Communion: Bread and wine representing Christ\nFasting: Lenten season, Good Friday\nVariations: Different practices among denominations\nFestival Foods: Christmas feasts, Easter meals\n\nChristian dietary practices vary widely among different traditions and cultures.'
            },
            {
                title: 'Jain Vegetarianism',
                content: 'Strict Vegetarianism: No meat, fish, eggs, or root vegetables\nPrinciples: Ahimsa (non-violence) towards all life forms\nRestrictions: No potatoes, onions, garlic (root vegetables)\nFasting: Regular fasting for spiritual purification\n\nJain diet is one of the most restrictive, emphasizing minimal harm to microorganisms.'
            }
        ]
    },
    'interfaith-guide': {
        title: 'Interfaith Harmony Guide',
        filename: 'Rituals-Interfaith-Guide.pdf',
        sections: [
            {
                title: 'Building Interfaith Understanding',
                content: 'This guide promotes mutual respect, understanding, and harmony among different religious traditions. Learn how to navigate interfaith interactions with sensitivity and build bridges between communities while honoring diverse beliefs and practices.'
            },
            {
                title: 'Common Values Across Religions',
                content: '• Compassion and kindness towards all beings\n• Truthfulness and honesty in all dealings\n• Service to humanity and community welfare\n• Respect for elders and family values\n• Pursuit of peace and non-violence\n• Importance of prayer and spiritual practice\n\nDespite different beliefs, all major religions share fundamental ethical principles that promote human welfare and social harmony.'
            },
            {
                title: 'Interfaith Etiquette Guidelines',
                content: 'DRESS: Modest attire covering shoulders and knees\nGREETINGS: Use appropriate religious greetings\nGIFTS: Avoid religiously prohibited items\nFOOD: Respect dietary restrictions when hosting\nPRAYER: Participate respectfully or observe quietly\nCONVERSATION: Avoid theological debates, focus on shared values\nSPACES: Remove shoes when required, follow seating arrangements'
            },
            {
                title: 'Celebrating Religious Diversity',
                content: '• Attend interfaith events and celebrations\n• Learn about different festival traditions\n• Share your own traditions with others\n• Participate in community service projects\n• Support interfaith dialogue initiatives\n• Create inclusive spaces for all beliefs\n\nCelebrating diversity strengthens community bonds and promotes mutual understanding.'
            },
            {
                title: 'Building Interfaith Communities',
                content: 'START SMALL: Begin with neighborhood gatherings\nEDUCATE: Organize learning sessions about different faiths\nSERVE TOGETHER: Collaborate on community service projects\nCELEBRATE: Host multi-faith festival celebrations\nCOMMUNICATE: Create safe spaces for open dialogue\nRESPECT: Honor differences while finding common ground\n\nStrong interfaith communities are built on trust, respect, and shared humanitarian values.'
            }
        ]
    },
    'symbols-guide': {
        title: 'Sacred Symbols & Meanings',
        filename: 'Rituals-Sacred-Symbols.pdf',
        sections: [
            {
                title: 'Understanding Sacred Symbols',
                content: 'Sacred symbols represent profound spiritual truths and serve as visual reminders of divine principles across religious traditions. This guide explores the meanings and significance of major symbols from Hindu, Muslim, Sikh, Christian, and Jain faiths.'
            },
            {
                title: 'Hindu Sacred Symbols',
                content: 'OM (AUM): Primordial sound of creation, represents ultimate reality\nSWASTIKA: Ancient symbol of good fortune and prosperity\nLOTUS: Purity, spiritual awakening, and divine beauty\nTRISHUL: Trinity of creation, preservation, and destruction\nSHRI YANTRA: Complex geometric pattern representing cosmic order\n\nHindu symbols often represent cosmic principles and divine energies.'
            },
            {
                title: 'Islamic Sacred Symbols',
                content: 'STAR AND CRESCENT: Faith, divine guidance, and Islamic identity\nALLAH: Arabic calligraphy representing God\'s name\nKAABA: Holiest site in Islam, unity of Muslims worldwide\nMISBAHA: Prayer beads for dhikr (remembrance of God)\nISLAMIC GEOMETRY: Complex patterns representing infinite nature of creation\n\nIslamic art emphasizes geometric patterns and calligraphy, avoiding figurative representation.'
            },
            {
                title: 'Sikh Sacred Symbols',
                content: 'KHANDA: Central symbol representing God\'s unity and divine power\nIK ONKAR: Symbol of one supreme reality, foundation of Sikh theology\nNISHAN SAHIB: Sikh flag representing sovereignty and identity\nFIVE Ks: Articles of faith representing spiritual commitment\nEK ONKAR MURAL: Artistic representation of divine oneness\n\nSikh symbols emphasize monotheism, equality, and spiritual discipline.'
            },
            {
                title: 'Christian Sacred Symbols',
                content: 'CROSS: Central symbol of Christianity, represents sacrifice and salvation\nFISH (ICHTHYS): Early Christian symbol of faith and abundance\nDOVE: Holy Spirit, peace, and divine inspiration\nALPHA & OMEGA: First and last letters of Greek alphabet, representing Christ\'s eternity\nCHI RHO: Monogram of Christ, used since Roman times\n\nChristian symbols focus on Christ\'s life, sacrifice, and theological concepts.'
            },
            {
                title: 'Jain Sacred Symbols',
                content: 'AHIMSA HAND: Symbol of non-violence, central Jain principle\nSWASTIKA: Four states of existence and cycle of rebirth\nJAIN EMBLEM: Universal symbol representing cosmology and ideals\nSIDDHASHILA: Abode of liberated souls\nTHREE DOTS: Three jewels of right faith, knowledge, and conduct\n\nJain symbols emphasize spiritual liberation through non-violence and ascetic practices.'
            }
        ]
    }
};

// PDF creation function
function createPDF(content, filename) {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(74, 20, 140);
    doc.text(content.title, 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Rituals Resource - Downloaded on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    let yPosition = 50;
    content.sections.forEach(section => {
        doc.setFontSize(12);
        doc.setTextColor(74, 20, 140);
        doc.text(section.title, 20, yPosition);
        yPosition += 10;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(section.content, 170);
        doc.text(lines, 20, yPosition);
        yPosition += (lines.length * 7) + 10;
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
    });
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('© 2025 Rituals. All Rights Reserved. Connecting You to Divine Services.', 105, 285, { align: 'center' });
    doc.save(filename);
}

// Download resource function
function downloadResource(resourceType, buttonElement) {
    const progressId = resourceType + '-progress';
    const progressBar = document.getElementById(progressId);
    const progressBarInner = document.getElementById(progressId + '-bar');
    if (progressBar && progressBarInner) {
        progressBar.style.display = 'block';
        progressBarInner.style.width = '0%';
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                setTimeout(() => { progressBar.style.display = 'none'; }, 500);
            }
            progressBarInner.style.width = progress + '%';
        }, 100);
    }
    if (buttonElement) {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        buttonElement.disabled = true;
        setTimeout(() => {
            const pdfContent = pdfContents[resourceType];
            if (pdfContent) createPDF(pdfContent, pdfContent.filename);
            buttonElement.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            buttonElement.classList.add('success');
            setTimeout(() => {
                buttonElement.innerHTML = originalHTML;
                buttonElement.classList.remove('success');
                buttonElement.disabled = false;
            }, 2000);
        }, 1500);
    }
    showNotification('PDF downloaded successfully!', 'success');
}

// Calendar functions
function showYearCalendar(year) {
    document.querySelectorAll('.year-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.calendar-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`calendar-${year}`).classList.add('active');
    populateCalendar(year);
}

function populateCalendar(year) {
    const calendarContent = document.getElementById(`calendar-${year}`);
    const yearData = multiFaithCalendar[year];
    let calendarHTML = '';
    const faiths = [
        { id: 'hindu', name: 'Sanātan Dharm', icon: 'fas fa-om' },
        { id: 'muslim', name: 'Islam', icon: 'fas fa-mosque' },
        { id: 'sikh', name: 'Sikhism', icon: 'fas fa-khanda' },
        { id: 'christian', name: 'Christianity', icon: 'fas fa-cross' },
        { id: 'jain', name: 'Jainism', icon: 'fas fa-dharmachakra' }
    ];
    faiths.forEach(faith => {
        const faithData = yearData[faith.id];
        calendarHTML += `<div class="faith-calendar"><div class="faith-header ${faith.id}"><div class="faith-icon"><i class="${faith.icon}"></i></div><h2 class="faith-title">${faith.name} Festivals ${year}</h2></div><div class="months-grid">`;
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        months.forEach(month => {
            const festivals = faithData[month] || [];
            calendarHTML += `<div class="month-section"><h3 class="month-title">${month}</h3><div class="festivals-list">`;
            if (festivals.length > 0) {
                festivals.forEach(festival => {
                    calendarHTML += `<div class="festival-item ${faith.id}"><div class="festival-date">${festival.date}</div><div class="festival-name">${festival.name}</div></div>`;
                });
            } else {
                calendarHTML += `<div class="no-festivals">No major festivals this month</div>`;
            }
            calendarHTML += `</div></div>`;
        });
        calendarHTML += `</div></div>`;
    });
    calendarContent.innerHTML = calendarHTML;
}

function showCalendarDetailPage() {
    showPage('calendar-detail');
    populateCalendar(2024);
}

function showDownloadCalendarPage() {
    showPage('download-calendar');
}

function goBackToResources() {
    showPage('resources');
}

function goBackToCalendarDetail() {
    showPage('calendar-detail');
}

function downloadCalendar(year) {
    let calendarText = `Rituals Multi-Faith Calendar ${year}\nDownloaded on: ${new Date().toLocaleDateString()}\n\n`;
    const yearData = multiFaithCalendar[year];
    const faiths = ['Sanātan Dharm', 'Islam', 'Sikhism', 'Christianity', 'Jainism'];
    faiths.forEach(faith => {
        calendarText += `${faith} Festivals ${year}\n` + '='.repeat(50) + '\n';
        const faithData = yearData[faith.toLowerCase().split(' ')[0]];
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        months.forEach(month => {
            const festivals = faithData[month] || [];
            if (festivals.length > 0) {
                calendarText += `${month}:\n`;
                festivals.forEach(festival => {
                    calendarText += `  ${festival.date} - ${festival.name}\n`;
                });
                calendarText += '\n';
            }
        });
        calendarText += '\n';
    });
    const blob = new Blob([calendarText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rituals-Calendar-${year}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    showNotification(`Calendar ${year} downloaded successfully!`, 'success');
}

// Order summary
function createOrderSummary() {
    let total = calculateTotal();
    let summary = { totalAmount: `₹${total}`, details: '', fullDetails: '' };
    let details = `Rituals Order Confirmation\n\nORDER DETAILS:\n==============\n\n`;
    if (currentEvent) {
        details += `CEREMONY:\n• ${currentEvent.name}\n• ${currentEvent.description}\n• Price: ${currentEvent.price}\n\n`;
    }
    if (cart.items.length > 0) {
        details += `ITEMS KIT:\n`;
        cart.items.forEach(item => {
            details += `• ${item.name}\n• Type: ${item.type === 'complete' ? 'Complete Kit' : 'Basic Kit'}\n• Price: ${item.price}\n\n`;
        });
    }
    if (cart.service) {
        details += `SERVICE PROVIDER:\n• ${cart.service.name}\n• Price: ${cart.service.price}\n\n`;
    }
    summary.details = details;
    let fullDetails = details;
    fullDetails += `DELIVERY ADDRESS:\n• Name: ${userAddress.fullName}\n• Phone: ${userAddress.phoneNumber}\n• Address: ${userAddress.addressLine1}, ${userAddress.addressLine2}\n• Landmark: ${userAddress.landmark}\n• City: ${userAddress.city}\n• State: ${userAddress.state}\n• PIN: ${userAddress.pincode}\n• Ceremony Date: ${userAddress.ceremonyDate}\n• Ceremony Time: ${userAddress.ceremonyTime}\n`;
    if (currentFaith === 'hindu' && userAddress.rashi) fullDetails += `• Rashi: ${userAddress.rashi}\n`;
    if (userAddress.specialInstructions) fullDetails += `• Special Instructions: ${userAddress.specialInstructions}\n`;
    fullDetails += `\nTOTAL AMOUNT: ₹${total}\n\nBOOKING INFORMATION:\n• Booking ID: R${Date.now()}\n• Booking Time: ${new Date().toLocaleString()}\n• Faith: ${currentFaith.charAt(0).toUpperCase() + currentFaith.slice(1)}\n\nThank you for choosing Rituals!\nFor queries: +91 9394792417 | chanakyasahni8@gmail.com\n`;
    summary.fullDetails = fullDetails;
    return summary;
}

function sendOrderConfirmations() {
    const orderSummary = createOrderSummary();
    commManager.sendOrderConfirmations(orderSummary, userAddress, currentFaith);
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageId}-page`).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
    window.scrollTo(0, 0);
}

// Faith selection and booking flow
function selectFaith(faith) {
    currentFaith = faith;
    const rashiField = document.getElementById('rashi-field');
    if (faith === 'hindu') rashiField.style.display = 'flex';
    else rashiField.style.display = 'none';
    document.querySelector('.faith-selection').style.display = 'none';
    document.getElementById('events-title').style.display = 'block';
    document.querySelectorAll('.events-container').forEach(container => container.style.display = 'none');
    document.getElementById(`${faith}-events`).style.display = 'block';
    populateEvents(faith);
}

function populateEvents(faith) {
    const eventsContainer = document.getElementById(`${faith}-events`);
    const eventsGrid = eventsContainer.querySelector('.events-grid');
    eventsGrid.innerHTML = '';
    const eventsData = {
        hindu: [
            { name: "Deepawali Puja", description: "Lakshmi Puja for prosperity", price: "₹1,800" },
            { name: "Satyanarayan Puja", description: "Monthly worship of Lord Vishnu", price: "₹1,500" },
            { name: "Griha Pravesh", description: "New home inauguration ceremony", price: "₹3,000" },
            { name: "Mundan Ceremony", description: "First hair cutting ceremony for child", price: "₹2,000" },
            { name: "Vivah (Wedding)", description: "Complete wedding ceremony arrangements", price: "₹15,000" },
            { name: "Namkaran", description: "Baby naming ceremony", price: "₹1,200" },
            { name: "Annaprashan", description: "First rice feeding ceremony", price: "₹1,500" },
            { name: "Upanayanam", description: "Sacred thread ceremony", price: "₹3,500" },
            { name: "Shraddha", description: "Ancestral rites ceremony", price: "₹2,800" },
            { name: "Ganesh Chaturthi Puja", description: "Ganesh worship ceremony", price: "₹2,200" },
            { name: "Navratri Puja", description: "Nine nights of Goddess worship", price: "₹4,000" },
            { name: "Maha Shivratri Puja", description: "Night of Shiva worship", price: "₹2,500" },
            { name: "Janmashtami Puja", description: "Krishna birthday celebration", price: "₹2,300" },
            { name: "Raksha Bandhan", description: "Brother-sister bonding ceremony", price: "₹1,000" },
            { name: "Holi Puja", description: "Festival of colors ceremony", price: "₹1,800" },
            { name: "Durga Puja", description: "Goddess Durga worship", price: "₹3,500" },
            { name: "Saraswati Puja", description: "Goddess of knowledge worship", price: "₹1,800" }
        ],
        muslim: [
            { name: "Nikah (Marriage)", description: "Islamic wedding ceremony", price: "₹5,000" },
            { name: "Aqiqah", description: "Birth ceremony for newborn", price: "₹3,000" },
            { name: "Eid Prayers", description: "Special Eid congregation prayers", price: "₹1,500" },
            { name: "Milad-un-Nabi", description: "Prophet Muhammad's birthday celebration", price: "₹2,000" },
            { name: "Khatam Quran", description: "Quran completion ceremony", price: "₹2,500" },
            { name: "Bismillah", description: "Child's first Quran reading", price: "₹1,800" },
            { name: "Walima", description: "Post-wedding reception feast", price: "₹4,000" },
            { name: "Arz-e-Quran", description: "Quran recitation ceremony", price: "₹2,200" },
            { name: "Shab-e-Barat", description: "Night of forgiveness prayers", price: "₹1,500" },
            { name: "Shab-e-Qadr", description: "Night of power prayers", price: "₹1,500" },
            { name: "Eid-ul-Fitr", description: "Festival of breaking fast", price: "₹2,000" },
            { name: "Eid-ul-Adha", description: "Festival of sacrifice", price: "₹3,000" },
            { name: "Jumu'ah Prayers", description: "Friday congregational prayers", price: "₹1,000" },
            { name: "Tahneek", description: "Newborn blessing ceremony", price: "₹1,200" },
            { name: "Aqeeqah", description: "Sacrifice for newborn", price: "₹2,500" },
            { name: "Hajj Ceremony", description: "Pilgrimage rituals", price: "₹8,000" },
            { name: "Umrah", description: "Minor pilgrimage", price: "₹5,000" },
            { name: "Janazah", description: "Funeral prayers", price: "₹2,000" }
        ],
        sikh: [
            { name: "Akhand Path", description: "Continuous reading of Guru Granth Sahib", price: "₹5,000" },
            { name: "Anand Karaj", description: "Sikh wedding ceremony", price: "₹8,000" },
            { name: "Naam Karan", description: "Naming ceremony for newborn", price: "₹2,000" },
            { name: "Amrit Sanchar", description: "Sikh initiation ceremony", price: "₹3,500" },
            { name: "Antam Sanskar", description: "Last rites ceremony", price: "₹4,000" },
            { name: "Gurpurab", description: "Guru's birthday celebration", price: "₹3,000" },
            { name: "Sukhmani Sahib Path", description: "Prayer for peace and comfort", price: "₹2,500" },
            { name: "Japji Sahib Path", description: "Morning prayer ceremony", price: "₹1,800" },
            { name: "Rehras Sahib", description: "Evening prayer ceremony", price: "₹1,800" },
            { name: "Kirtan Sohila", description: "Night prayer ceremony", price: "₹1,500" },
            { name: "Dastar Bandi", description: "Turban tying ceremony", price: "₹2,000" },
            { name: "Bhog Ceremony", description: "Completion of religious reading", price: "₹2,500" },
            { name: "Sadharan Path", description: "Regular reading of Guru Granth Sahib", price: "₹3,000" },
            { name: "Sampat Path", description: "Prosperity prayer ceremony", price: "₹2,800" },
            { name: "Sunder Gutka", description: "Prayer book reading ceremony", price: "₹2,200" },
            { name: "Gurmat Gian", description: "Sikh religious education ceremony", price: "₹3,500" },
            { name: "Nagar Kirtan", description: "Religious procession", price: "₹6,000" },
            { name: "Langar Seva", description: "Community kitchen service", price: "₹4,000" }
        ],
        christian: [
            { name: "Baptism", description: "Infant or adult baptism ceremony", price: "₹2,500" },
            { name: "Wedding", description: "Christian wedding ceremony", price: "₹10,000" },
            { name: "Christmas Service", description: "Special Christmas mass", price: "₹2,000" },
            { name: "Easter Service", description: "Easter Sunday celebration", price: "₹2,000" },
            { name: "First Communion", description: "First holy communion ceremony", price: "₹3,000" },
            { name: "Confirmation", description: "Confirmation of faith ceremony", price: "₹2,800" },
            { name: "Funeral Service", description: "Christian last rites", price: "₹4,000" },
            { name: "House Blessing", description: "Home dedication ceremony", price: "₹2,500" },
            { name: "Thanksgiving Service", description: "Thanksgiving prayer service", price: "₹1,800" },
            { name: "Baby Dedication", description: "Child dedication ceremony", price: "₹1,500" },
            { name: "Anniversary Service", description: "Wedding anniversary blessing", price: "₹2,000" },
            { name: "Healing Service", description: "Prayer for healing ceremony", price: "₹2,200" },
            { name: "Good Friday Service", description: "Commemoration of crucifixion", price: "₹1,800" },
            { name: "Pentecost Service", description: "Holy Spirit celebration", price: "₹2,000" },
            { name: "Advent Service", description: "Christmas preparation services", price: "₹2,500" },
            { name: "Lent Service", description: "Pre-Easter observance", price: "₹2,800" },
            { name: "Marriage Blessing", description: "Renewal of vows", price: "₹3,000" },
            { name: "Memorial Service", description: "Remembrance ceremony", price: "₹2,500" }
        ],
        jain: [
            { name: "Pratishtha", description: "Idol installation ceremony", price: "₹4,000" },
            { name: "Paryushan", description: "8-day festival of forgiveness", price: "₹6,000" },
            { name: "Snatra Puja", description: "Ritual bathing of idols", price: "₹2,500" },
            { name: "Antyesti", description: "Last rites ceremony", price: "₹5,000" },
            { name: "Namokar Mantra Jaap", description: "Recitation of primary mantra", price: "₹1,800" },
            { name: "Panch Kalyanak Puja", description: "Five auspicious events celebration", price: "₹3,500" },
            { name: "Mahamastakabhisheka", description: "Grand head anointing ceremony", price: "₹8,000" },
            { name: "Oli Puja", description: "Twice-yearly worship ceremony", price: "₹2,800" },
            { name: "Rohini Vrat", description: "Fasting and prayer ceremony", price: "₹2,200" },
            { name: "Poshadh Vrat", description: "Semi-fasting observance", price: "₹2,000" },
            { name: "Ayambil Oli", description: "Special dietary observance", price: "₹2,500" },
            { name: "Santhara", description: "Ritual fasting until death", price: "₹7,000" },
            { name: "Diksha", description: "Monastic initiation ceremony", price: "₹10,000" },
            { name: "Gyan Panchami", description: "Knowledge day celebration", price: "₹2,000" },
            { name: "Varshi Tapa", description: "Annual fasting completion", price: "₹3,000" },
            { name: "Maun Ekadashi", description: "Silent observance ceremony", price: "₹2,200" },
            { name: "Navpad Oli", description: "Nine elements worship", price: "₹3,500" },
            { name: "Rath Yatra", description: "Chariot procession ceremony", price: "₹5,000" }
        ]
    };
    eventsData[faith].forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `<h4>${event.name}</h4><p>${event.description}</p><div class="event-price">${event.price}</div>`;
        eventCard.addEventListener('click', () => selectEvent(event, faith));
        eventsGrid.appendChild(eventCard);
    });
}

function selectEvent(event, faith) {
    currentEvent = event;
    document.querySelectorAll('.events-container').forEach(container => container.style.display = 'none');
    document.getElementById('events-title').style.display = 'none';
    document.getElementById('items-title').style.display = 'block';
    document.getElementById('items-container').style.display = 'block';
    populateItems(faith, event);
}

function populateItems(faith, event) {
    const itemsContainer = document.getElementById('items-container');
    const itemsGrid = itemsContainer.querySelector('.items-grid');
    itemsGrid.innerHTML = '';
    const itemsData = {
        hindu: {
            complete: {
                name: "Complete Puja Kit",
                price: "₹5,000",
                description: "Everything needed for a complete Hindu ceremony",
                includes: [
                    "Puja Thali with all essentials",
                    "Premium Incense Sticks & Dhoop",
                    "Brass Diya Set with Ghee",
                    "Fresh Flower Garland & Petals",
                    "Assorted Sweets Prasad",
                    "Coconut & Fruits",
                    "Sandalwood Paste & Kumkum",
                    "Haldi & Chandan",
                    "Akshata (Rice)",
                    "Betel Leaves & Nuts",
                    "Camphor & Matchbox",
                    "Ganga Jal",
                    "Bell & Conch Shell",
                    "Sacred Thread",
                    "Priest Offering Envelope"
                ]
            }
        },
        muslim: {
            complete: {
                name: "Complete Islamic Ceremony Kit",
                price: "₹6,000",
                description: "Complete set for Islamic ceremonies and prayers",
                includes: [
                    "Premium Prayer Mat & Rug",
                    "Quality Dates & Fruits",
                    "Attar & Oudh Set",
                    "Decorative Quran Stand",
                    "Tasbih (Prayer Beads)",
                    "Islamic Calligraphy Art",
                    "Miswak & Henna",
                    "Rose Water & Bakhoor",
                    "Kufi Caps (Set of 5)",
                    "Islamic Books Collection",
                    "Ramadan Calendar",
                    "Halal Certification Kit",
                    "Ceremony Decoration Set",
                    "Guest Seating Arrangement"
                ]
            }
        },
        sikh: {
            complete: {
                name: "Complete Gurdwara Kit",
                price: "₹7,000",
                description: "Complete set for Sikh ceremonies and prayers",
                includes: [
                    "Premium Rumala Sahib",
                    "Fresh Karah Parshad Ingredients",
                    "Sikh Flag & Nishan Sahib",
                    "Kirpan in Decorative Case",
                    "Complete 5Ks Set",
                    "Dastar (Turbans) - Multiple",
                    "Gutka Sahib Collection",
                    "Kirtan Harmonium & Tabla",
                    "Langar Utensils Set",
                    "Sikh Art & Calendar",
                    "Guru Granth Sahib Stand",
                    "Community Seating",
                    "Prasad Distribution Set",
                    "Ceremony Documentation"
                ]
            }
        },
        christian: {
            complete: {
                name: "Complete Church Ceremony Kit",
                price: "₹8,000",
                description: "Complete set for Christian ceremonies and services",
                includes: [
                    "Premium Communion Set",
                    "Leather Bound Bible",
                    "Decorative Cross & Candles",
                    "Rosary & Holy Water",
                    "Chalice & Censer Set",
                    "Priest Vestments Set",
                    "Christian Art Collection",
                    "Hymnal Books (Multiple)",
                    "Advent Wreath & Decor",
                    "Nativity Set Display",
                    "Easter Lily Arrangement",
                    "Baptism Font Setup",
                    "Wedding Arch & Decor",
                    "Sound System Setup"
                ]
            }
        },
        jain: {
            complete: {
                name: "Complete Jain Puja Kit",
                price: "₹6,500",
                description: "Complete set for Jain ceremonies and rituals",
                includes: [
                    "Ashtaprakari Puja Full Set",
                    "Premium Rice & Grains",
                    "Decorative Kalash Set",
                    "Pure Saffron & Spices",
                    "Jain Flag & Symbols",
                    "Prayer Books Collection",
                    "Incense & Diya Set",
                    "Fresh Flowers & Fruits",
                    "Sweets & Dry Fruits",
                    "Jain Calendar & Art",
                    "Muhapatti & Ogho Set",
                    "Meditation Mat & Cushions",
                    "Scriptures Collection",
                    "Ritual Documentation"
                ]
            }
        }
    };
    const faithItems = itemsData[faith];
    const completeCard = document.createElement('div');
    completeCard.className = 'item-card';
    completeCard.innerHTML = `
        <div class="kit-badge complete">COMPLETE KIT</div>
        <h4>${faithItems.complete.name}</h4>
        <div class="item-price">${faithItems.complete.price}</div>
        <div class="item-description">${faithItems.complete.description}</div>
        <div class="item-includes"><h5>Includes:</h5><ul>${faithItems.complete.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}</ul></div>
        <button class="add-to-cart" onclick="addItemToCart('${faithItems.complete.name}', '${faithItems.complete.price}', 'complete')">Select Complete Kit</button>
    `;
    itemsGrid.appendChild(completeCard);
}

function addItemToCart(name, price, type) {
    cart.items = [];
    cart.items.push({ name, price, type });
    showNotification(`${name} added to cart!`, 'success');
    setTimeout(() => showServiceOptions(), 1500);
}

function goBackToFaiths() {
    document.querySelector('.faith-selection').style.display = 'grid';
    document.querySelectorAll('.events-container, .items-container, .pandit-container, .priest-container, .granthi-container, .imam-container, .jain-pandit-container, .cart-container, .payment-container, .address-container').forEach(container => container.style.display = 'none');
    document.getElementById('events-title').style.display = 'none';
    document.getElementById('items-title').style.display = 'none';
    document.getElementById('services-title').style.display = 'none';
    document.getElementById('address-title').style.display = 'none';
}

function goBackToEvents() {
    document.getElementById(`${currentFaith}-events`).style.display = 'block';
    document.getElementById('events-title').style.display = 'block';
    document.getElementById('items-container').style.display = 'none';
    document.getElementById('items-title').style.display = 'none';
}

function goBackToItems() {
    document.getElementById('items-container').style.display = 'block';
    document.getElementById('items-title').style.display = 'block';
    document.querySelectorAll('.pandit-container').forEach(container => container.style.display = 'none');
    document.getElementById('services-title').style.display = 'none';
}

function showServiceOptions() {
    document.getElementById('items-container').style.display = 'none';
    document.getElementById('items-title').style.display = 'none';
    document.getElementById('services-title').style.display = 'block';
    const serviceContainers = { hindu: 'pandit-container', muslim: 'imam-container', sikh: 'granthi-container', christian: 'priest-container', jain: 'jain-pandit-container' };
    const containerId = serviceContainers[currentFaith];
    if (containerId) {
        document.getElementById(containerId).style.display = 'block';
        populateServiceOptions(currentFaith);
    }
}

function populateServiceOptions(faith) {
    let serviceContainer;
    let containerElement;
    switch(faith) {
        case 'hindu':
            containerElement = document.getElementById('pandit-container');
            serviceContainer = containerElement.querySelector('.pandit-options');
            break;
        case 'muslim':
            containerElement = document.getElementById('imam-container');
            serviceContainer = containerElement.querySelector('.imam-options');
            break;
        case 'sikh':
            containerElement = document.getElementById('granthi-container');
            serviceContainer = containerElement.querySelector('.granthi-options');
            break;
        case 'christian':
            containerElement = document.getElementById('priest-container');
            serviceContainer = containerElement.querySelector('.priest-options');
            break;
        case 'jain':
            containerElement = document.getElementById('jain-pandit-container');
            serviceContainer = containerElement.querySelector('.jain-pandit-options');
            break;
    }
    if (!serviceContainer) return;
    serviceContainer.innerHTML = '';
    const serviceData = {
        hindu: [
            { name: "North Indian Vedic Scholar", price: "₹2,800" },
            { name: "South Indian Temple Priest", price: "₹3,200" },
            { name: "East Indian Traditional Pandit", price: "₹2,500" },
            { name: "West Indian Ritual Specialist", price: "₹2,900" },
            { name: "Sanskrit Scholar & Priest", price: "₹3,500" }
        ],
        muslim: [
            { name: "North Indian Islamic Scholar", price: "₹2,800" },
            { name: "South Indian Mosque Imam", price: "₹2,400" },
            { name: "Arabic Language Specialist", price: "₹3,200" },
            { name: "Islamic Jurisprudence Expert", price: "₹3,500" }
        ],
        sikh: [
            { name: "Punjabi Granthi Scholar", price: "₹2,800" },
            { name: "Sikh History Specialist", price: "₹2,400" },
            { name: "Ragi & Kirtan Expert", price: "₹3,000" },
            { name: "Sikh Ceremonies Coordinator", price: "₹3,200" }
        ],
        christian: [
            { name: "North Indian Church Pastor", price: "₹2,800" },
            { name: "South Indian Christian Priest", price: "₹2,600" },
            { name: "Biblical Studies Scholar", price: "₹3,200" },
            { name: "Christian Community Leader", price: "₹2,900" }
        ],
        jain: [
            { name: "Digambar Jain Scholar", price: "₹2,800" },
            { name: "Shwetambar Ritual Expert", price: "₹3,000" },
            { name: "Jain Philosophy Teacher", price: "₹3,500" },
            { name: "Jain Ceremonies Coordinator", price: "₹2,900" }
        ]
    };
    serviceData[faith].forEach(service => {
        const serviceOption = document.createElement('div');
        serviceOption.className = 'service-option';
        serviceOption.innerHTML = `<h4>${service.name}</h4><div class="service-price">${service.price}</div><button class="add-to-cart" onclick="selectService(${JSON.stringify(service).replace(/"/g, '&quot;')}, '${faith}')">Select Provider</button>`;
        serviceContainer.appendChild(serviceOption);
    });
}

function selectService(service, faith) {
    cart.service = service;
    showNotification(`Selected ${service.name} as your service provider!`, 'success');
    setTimeout(() => showAddressSection(), 1000);
}

function showAddressSection() {
    document.querySelectorAll('.pandit-container, .priest-container, .granthi-container, .imam-container, .jain-pandit-container').forEach(container => container.style.display = 'none');
    document.getElementById('services-title').style.display = 'none';
    document.getElementById('address-title').style.display = 'block';
    document.getElementById('address-container').style.display = 'block';
}

function goBackToServices() {
    document.getElementById('address-container').style.display = 'none';
    document.getElementById('address-title').style.display = 'none';
    showServiceOptions();
}

function goBackToAddress() {
    document.getElementById('cart-container').style.display = 'none';
    showAddressSection();
}

function saveAddressAndProceed() {
    const addressData = {
        fullName: document.getElementById('full-name').value,
        phoneNumber: document.getElementById('phone-number').value,
        addressLine1: document.getElementById('address-line1').value,
        addressLine2: document.getElementById('address-line2').value,
        landmark: document.getElementById('landmark').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        ceremonyDate: document.getElementById('ceremony-date').value,
        ceremonyTime: document.getElementById('ceremony-time').value,
        specialInstructions: document.getElementById('special-instructions').value
    };
    if (currentFaith === 'hindu') {
        addressData.rashi = document.getElementById('rashi').value;
    }
    if (!addressData.fullName || !addressData.phoneNumber || !addressData.addressLine1 || !addressData.addressLine2 || !addressData.landmark || !addressData.city || !addressData.state || !addressData.pincode || !addressData.ceremonyDate || !addressData.ceremonyTime) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    userAddress = addressData;
    showCart();
}

function showCart() {
    document.getElementById('address-container').style.display = 'none';
    document.getElementById('address-title').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    if (currentEvent) {
        const eventItem = document.createElement('div');
        eventItem.className = 'cart-item';
        eventItem.innerHTML = `<div><strong>${currentEvent.name}</strong><div style="font-size: 0.9rem; color: #666;">${currentEvent.description}</div></div><div>${currentEvent.price}</div>`;
        cartItems.appendChild(eventItem);
    }
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `<div><strong>${item.name}</strong><div style="font-size: 0.9rem; color: #666;">${item.type === 'complete' ? 'Complete Kit' : 'Basic Kit'}</div></div><div>${item.price}</div>`;
        cartItems.appendChild(itemElement);
    });
    if (cart.service) {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'cart-item';
        serviceItem.innerHTML = `<div><strong>${cart.service.name}</strong><div style="font-size: 0.9rem; color: #666;">Religious Service Provider</div></div><div>${cart.service.price}</div>`;
        cartItems.appendChild(serviceItem);
    }
    if (userAddress.fullName) {
        const addressItem = document.createElement('div');
        addressItem.className = 'cart-item';
        addressItem.innerHTML = `<div><strong>Delivery Address</strong><div style="font-size: 0.9rem; color: #666;">${userAddress.fullName} | ${userAddress.phoneNumber}<br>${userAddress.addressLine1}, ${userAddress.addressLine2}<br>${userAddress.landmark}, ${userAddress.city}<br>${userAddress.state} - ${userAddress.pincode}<br>Date: ${userAddress.ceremonyDate}<br>Time: ${userAddress.ceremonyTime}${currentFaith === 'hindu' && userAddress.rashi ? `<br>Rashi: ${userAddress.rashi}` : ''}</div></div><div>Included</div>`;
        cartItems.appendChild(addressItem);
    }
    let total = 0;
    if (currentEvent) total += parseInt(currentEvent.price.replace('₹', '').replace(',', ''));
    cart.items.forEach(item => total += parseInt(item.price.replace('₹', '').replace(',', '')));
    if (cart.service) total += parseInt(cart.service.price.replace('₹', '').replace(',', ''));
    document.getElementById('cart-total').textContent = `Total: ₹${total}`;
    document.getElementById('payment-total').textContent = `₹${total}`;
}

function showPayment() {
    document.getElementById('cart-container').style.display = 'none';
    document.getElementById('payment-container').style.display = 'block';
}

function goBackToCart() {
    document.getElementById('payment-container').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';
}

function verifyPayment() {
    const screenshotUploaded = document.getElementById('preview-container').style.display !== 'none';
    const resultDiv = document.getElementById('verification-result');
    if (!screenshotUploaded) {
        resultDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please upload payment screenshot';
        resultDiv.className = 'verification-result verification-error';
        resultDiv.style.display = 'block';
        return;
    }
    resultDiv.innerHTML = `<i class="fas fa-check-circle"></i> Payment Verified! Sending order confirmations...`;
    resultDiv.className = 'verification-result verification-success';
    resultDiv.style.display = 'block';
    sendOrderConfirmations();
    setTimeout(() => {
        goBackToFaiths();
        document.getElementById('verification-result').style.display = 'none';
        document.getElementById('preview-container').style.display = 'none';
        document.getElementById('screenshot-upload').value = '';
        document.getElementById('verify-btn').disabled = true;
    }, 5000);
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
}

function calculateTotal() {
    let total = 0;
    if (currentEvent) total += parseInt(currentEvent.price.replace('₹', '').replace(',', ''));
    cart.items.forEach(item => total += parseInt(item.price.replace('₹', '').replace(',', '')));
    if (cart.service) total += parseInt(cart.service.price.replace('₹', '').replace(',', ''));
    return total;
}

// Chatbot functions
document.getElementById('chatbotIcon').addEventListener('click', function() {
    document.getElementById('chatbotContainer').classList.add('open');
});
document.getElementById('chatbotToggle').addEventListener('click', function() {
    document.getElementById('chatbotContainer').classList.remove('open');
});
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('chatbotInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    if (message) {
        addMessage(message, "user");
        input.value = "";
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message';
        typingIndicator.innerHTML = '<i>Rituals Assistant is typing...</i>';
        document.getElementById('chatbotMessages').appendChild(typingIndicator);
        setTimeout(() => {
            document.getElementById('chatbotMessages').removeChild(typingIndicator);
            const response = generateChatbotResponse(message);
            addMessage(response, "bot");
        }, 1000);
    }
}

function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm your Rituals assistant. How can I help you with your religious ceremony today?";
    }
    if (lowerMessage.includes('calendar') || lowerMessage.includes('festival')) {
        return "You can view our comprehensive multi-faith calendar for 2024-2026 in the Resources section. It includes all major festivals for Hindu, Muslim, Sikh, Christian, and Jain traditions.";
    }
    if (lowerMessage.includes('book') || lowerMessage.includes('ceremony')) {
        return "To book a ceremony, go to the Services page and select your faith. You can then choose from various ceremonies, add necessary items, select a service provider, and complete payment.";
    }
    return "I can help you with information about religious ceremonies, festival calendars, booking processes, and more. Feel free to ask me anything about Rituals services!";
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Footer functions
function handleContactClick(type) {
    if (type === 'phone') window.open('tel:+919866193066', '_self');
    else if (type === 'email') window.open('mailto:chanakyasahni8@gmail.com', '_self');
}

function handleServiceClick(faith) {
    showPage('services');
    setTimeout(() => { if (faith !== 'interfaith') selectFaith(faith); }, 100);
}

function handleSocialClick(platform) {
    const urls = { facebook: 'https://facebook.com/Rituals', instagram: 'https://instagram.com/Rituals', twitter: 'https://twitter.com/Rituals', youtube: 'https://youtube.com/c/Rituals' };
    if (urls[platform]) window.open(urls[platform], '_blank');
}

function showPolicy(policyType) {
    const modalId = `${policyType}-policy-modal`;
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link, .cta-button, .faith-card[data-page], .footer-section a[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) showPage(pageId);
        });
    });

    document.getElementById('screenshot-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-container').style.display = 'block';
                document.getElementById('preview-image').src = e.target.result;
                document.getElementById('verify-btn').disabled = false;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        if (!name || !phone || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        showNotification('Opening Gmail with your message...', 'success');
        const subject = `Rituals Inquiry from ${name}`;
        const body = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}\n\nThis message was sent from Rituals website.`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chanakyasahni8@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setTimeout(() => {
            window.open(gmailUrl, '_blank');
            document.getElementById('contactForm').reset();
        }, 1000);
    });

    window.addEventListener('click', function(event) {
        document.querySelectorAll('.policy-modal').forEach(modal => {
            if (event.target === modal) closeModal(modal.id);
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.policy-modal').forEach(modal => {
                if (modal.style.display === 'block') closeModal(modal.id);
            });
        }
    });
});

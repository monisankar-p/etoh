import { useLanguageStore } from '../stores/useLanguageStore';

const aiTranslations: Record<string, Record<string, string>> = {
  en: {
    greeting: "Hello! I am etoh AI, your medical copilot. How can I assist you today?",
    vitals: "Looking at the real-time telemetry, Heart Rate is stable at 72 bpm, SpO2 is 98%, and BP is 118/78. No immediate anomalies detected.",
    report: "I've processed the report. The key findings include: \n\n1. Elevated WBC count.\n2. Normal hemoglobin levels.\n\nRecommendation: Monitor for potential infection.",
    genetic: "High diabetes risk detected across 3 generations on the maternal side. Recommending early HbA1c screening.",
    default: "Based on the patient's recent vitals, I recommend reviewing the latest data. There appears to be a slight irregularity in the recent trends."
  },
  hi: {
    greeting: "नमस्ते! मैं etoh AI हूँ, आपका मेडिकल कोपायलट। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    vitals: "रीयल-टाइम टेलीमेट्री को देखते हुए, हार्ट रेट 72 bpm पर स्थिर है, SpO2 98% है, और BP 118/78 है। कोई तत्काल विसंगतियां नहीं पाई गईं।",
    report: "मैंने रिपोर्ट को प्रोसेस कर लिया है। प्रमुख निष्कर्षों में शामिल हैं: \n\n1. बढ़ा हुआ WBC काउंट।\n2. सामान्य हीमोग्लोबिन स्तर।\n\nसिफारिश: संभावित संक्रमण के लिए निगरानी करें।",
    genetic: "मातृ पक्ष पर 3 पीढ़ियों में उच्च मधुमेह जोखिम पाया गया। प्रारंभिक HbA1c स्क्रीनिंग की सिफारिश।",
    default: "मरीज के हालिया वाइटल्स के आधार पर, मैं नवीनतम डेटा की समीक्षा करने की सलाह देता हूं।"
  },
  bn: { greeting: "নমস্কার! আমি etoh AI, আপনার চিকিৎসা সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?", default: "রোগীর সাম্প্রতিক ভাইটালগুলির উপর ভিত্তি করে, আমি সর্বশেষ ডেটা পর্যালোচনা করার পরামর্শ দিই।" },
  or: { greeting: "ନମସ୍କାର! ମୁଁ etoh AI, ଆପଣଙ୍କ ଚିକିତ୍ସା ସହକାରୀ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?", default: "ରୋଗୀଙ୍କ ସାମ୍ପ୍ରତିକ ଭାଇଟାଲ୍ ଉପରେ ଆଧାର କରି, ମୁଁ ସର୍ବଶେଷ ତଥ୍ୟ ସମୀକ୍ଷା କରିବାକୁ ପରାମର୍ଶ ଦେଉଛି।" },
  ta: { greeting: "வணக்கம்! நான் etoh AI, உங்கள் மருத்துவ உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?", default: "நோயாளியின் சமீபத்திய உயிரணுக்களின் அடிப்படையில், சமீபத்திய தரவை மதிப்பாய்வு செய்ய பரிந்துரைக்கிறேன்." },
  te: { greeting: "నమస్కారం! నేను etoh AI, మీ వైద్య సహాయకుడు. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?", default: "రోగి ఇటీవలి ప్రాణాధారాల ఆధారంగా, తాజా డేటాను సమీక్షించమని నేను సిఫార్సు చేస్తున్నాను." },
  mr: { greeting: "नमस्कार! मी etoh AI, तुमचा वैद्यकीय सहाय्यक. आज मी तुम्हाला कशी मदत करू शकतो?", default: "रुग्णाच्या अलीकडील लक्षणांवर आधारित, मी नवीनतम डेटाचे पुनरावलोकन करण्याची शिफारस करतो." },
};

export class MockAIService {
  static async *streamResponse(prompt: string, delayMs: number = 30): AsyncGenerator<string, void, unknown> {
    const lang = useLanguageStore.getState().language;
    const tMap = aiTranslations[lang] || aiTranslations.en;
    const enMap = aiTranslations.en;

    let responseText = tMap.default || enMap.default;
    
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi') || prompt.toLowerCase().includes('नमस्ते')) {
      responseText = tMap.greeting || enMap.greeting;
    } else if (prompt.toLowerCase().includes('vitals') || prompt.toLowerCase().includes('वाइटल्स')) {
      responseText = tMap.vitals || enMap.vitals;
    } else if (prompt.toLowerCase().includes('report') || prompt.toLowerCase().includes('रिपोर्ट')) {
      responseText = tMap.report || enMap.report;
    } else if (prompt.toLowerCase().includes('genetic') || prompt.toLowerCase().includes('family') || prompt.toLowerCase().includes('परिवार')) {
      responseText = tMap.genetic || enMap.genetic;
    }

    const chunks = responseText.split(/(?<=\s)/); // Split by words keeping spaces

    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, delayMs + (Math.random() * 20))); // simulate variable network/generation speed
      yield chunk;
    }
  }
}

export class MockAIService {
  private static mockResponses = [
    "Based on the patient's recent vitals, I recommend reviewing the latest ECG. There appears to be a slight irregularity in the PR interval.",
    "The prescribed dosage of Metoprolol should be carefully monitored, given the patient's reported history of bradycardia.",
    "Here is a summary of the uploaded report: The MRI indicates mild degenerative changes in the L4-L5 vertebrae, consistent with the patient's lower back pain symptoms.",
    "Would you like me to draft a follow-up consultation note for this patient?",
    "I have analyzed the current symptom progression. The urgency score is 3/10 (Low). Suggesting routine OPD follow-up.",
    "I notice a potential drug-drug interaction between the newly prescribed Warfarin and the patient's existing Ibuprofen regimen. This significantly increases bleeding risk. Please review."
  ];

  static async *streamResponse(prompt: string, delayMs: number = 30): AsyncGenerator<string, void, unknown> {
    // Select a random response or one based on keywords
    let responseText = this.mockResponses[Math.floor(Math.random() * this.mockResponses.length)];
    
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
      responseText = "Hello! I am etoh AI, your medical copilot. How can I assist you today?";
    } else if (prompt.toLowerCase().includes('vitals')) {
      responseText = "Looking at the real-time telemetry, Heart Rate is stable at 72 bpm, SpO2 is 98%, and BP is 118/78. No immediate anomalies detected.";
    } else if (prompt.toLowerCase().includes('report')) {
      responseText = "I've processed the report. The key findings include: \n\n1. Elevated WBC count.\n2. Normal hemoglobin levels.\n\nRecommendation: Monitor for potential infection.";
    }

    const chunks = responseText.split(/(?<=\s)/); // Split by words keeping spaces

    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, delayMs + (Math.random() * 20))); // simulate variable network/generation speed
      yield chunk;
    }
  }
}

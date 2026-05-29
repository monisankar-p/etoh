export interface ExtractedSymptoms {
  primarySymptom: string;
  location: string;
  duration: string;
  intensity: string;
  originalText: string;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  options?: string[]; // Quick reply options
}

export interface AssessmentResult {
  score: number;
  level: 1 | 2 | 3 | 4;
  classification: 'Mild' | 'Moderate' | 'High' | 'Critical';
  reasoning: string[];
  recommendedAction: string;
}

// 1. Symptom Extraction Engine (Mock NLP)
export const extractSymptoms = async (text: string): Promise<ExtractedSymptoms> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowerText = text.toLowerCase();
  
  let primarySymptom = 'Unknown';
  let location = 'Unknown';
  let duration = 'Recent';
  let intensity = 'Unknown';

  // Keyword matching for Primary Symptom
  if (lowerText.includes('chest pain') || lowerText.includes('heart hurts')) primarySymptom = 'Chest Pain';
  else if (lowerText.includes('headache') || lowerText.includes('head hurts') || lowerText.includes('migraine')) primarySymptom = 'Headache';
  else if (lowerText.includes('fever') || lowerText.includes('temperature')) primarySymptom = 'Fever';
  else if (lowerText.includes('stomach') || lowerText.includes('abdominal')) primarySymptom = 'Abdominal Pain';
  else if (lowerText.includes('dizzy') || lowerText.includes('dizziness')) primarySymptom = 'Dizziness';
  else if (lowerText.includes('cough')) primarySymptom = 'Cough';
  else primarySymptom = 'General Malaise';

  // Keyword matching for Location
  if (lowerText.includes('left side') || lowerText.includes('left')) location = 'Left side';
  else if (lowerText.includes('right side') || lowerText.includes('right')) location = 'Right side';
  else if (lowerText.includes('chest')) location = 'Chest';
  else if (lowerText.includes('head')) location = 'Head';
  else if (lowerText.includes('stomach')) location = 'Abdomen';
  else if (primarySymptom === 'Chest Pain') location = 'Chest';

  // Keyword matching for Duration
  if (lowerText.includes('morning') || lowerText.includes('since morning')) duration = 'Since morning';
  else if (lowerText.includes('days') || lowerText.includes('two days')) duration = 'Multiple days';
  else if (lowerText.includes('hours')) duration = 'Few hours';
  else if (lowerText.includes('just started') || lowerText.includes('sudden')) duration = 'Sudden onset';

  // Keyword matching for Intensity
  if (lowerText.includes('severe') || lowerText.includes('terrible') || lowerText.includes('very bad')) intensity = 'Severe';
  else if (lowerText.includes('mild') || lowerText.includes('little bit')) intensity = 'Mild';
  else if (lowerText.includes('moderate')) intensity = 'Moderate';

  return {
    primarySymptom,
    location,
    duration,
    intensity,
    originalText: text,
  };
};

// 2. Conversational Follow-Up Engine
// Returns the next question based on current state, or null if triage is complete.
export const getNextQuestion = (
  symptoms: ExtractedSymptoms,
  previousAnswers: Record<string, string>
): FollowUpQuestion | null => {
  const ansCount = Object.keys(previousAnswers).length;

  // General Questions to start if we didn't extract enough info initially
  if (!previousAnswers['onset'] && symptoms.duration === 'Recent') {
    return {
      id: 'onset',
      question: 'When exactly did you first notice these symptoms?',
      options: ['Just now', 'A few hours ago', 'Since yesterday', 'A few days ago'],
    };
  }

  if (!previousAnswers['severity'] && symptoms.intensity === 'Unknown') {
    return {
      id: 'severity',
      question: 'On a scale of 1 to 10, how severe is the pain/discomfort?',
      options: ['1-3 (Mild)', '4-6 (Moderate)', '7-8 (Severe)', '9-10 (Unbearable)'],
    };
  }

  // Symptom-specific decision trees
  if (symptoms.primarySymptom === 'Chest Pain') {
    if (!previousAnswers['radiation']) {
      return {
        id: 'radiation',
        question: 'Does the pain spread to your left arm, neck, or jaw?',
        options: ['Yes', 'No', 'Not sure'],
      };
    }
    if (!previousAnswers['shortnessOfBreath']) {
      return {
        id: 'shortnessOfBreath',
        question: 'Are you experiencing any shortness of breath?',
        options: ['Yes', 'No'],
      };
    }
  } else if (symptoms.primarySymptom === 'Headache') {
     if (!previousAnswers['vision']) {
       return {
         id: 'vision',
         question: 'Have you noticed any vision changes or sensitivity to light?',
         options: ['Yes', 'No'],
       };
     }
  } else if (symptoms.primarySymptom === 'Fever') {
     if (!previousAnswers['chills']) {
       return {
         id: 'chills',
         question: 'Are you also experiencing chills or body aches?',
         options: ['Yes', 'No'],
       };
     }
  }

  // Fallback generic questions to ensure we ask at least 2 questions
  if (ansCount < 2) {
      if (!previousAnswers['medications']) {
        return {
            id: 'medications',
            question: 'Have you taken any medications for this so far?',
            options: ['Yes', 'No'],
        }
      }
  }

  // End of questions
  return null;
};

// 3. Severity Assessment Engine
export const calculateSeverity = (
  symptoms: ExtractedSymptoms,
  answers: Record<string, string>
): AssessmentResult => {
  let score = 0;
  const reasoning: string[] = [];

  // Base score from primary symptom
  if (symptoms.primarySymptom === 'Chest Pain') {
    score += 40;
    reasoning.push('Chest pain is a potentially high-risk symptom.');
  } else if (symptoms.primarySymptom === 'Dizziness') {
    score += 20;
    reasoning.push('Dizziness indicates potential neurological or cardiovascular issues.');
  } else if (symptoms.primarySymptom === 'Headache') {
    score += 15;
    reasoning.push('Reported headache.');
  } else {
    score += 10;
    reasoning.push(`Reported ${symptoms.primarySymptom.toLowerCase()}.`);
  }

  // Intensity modifier
  if (symptoms.intensity === 'Severe' || answers['severity']?.includes('Severe') || answers['severity']?.includes('Unbearable')) {
    score += 30;
    reasoning.push('Symptom intensity is reported as high/severe.');
  } else if (answers['severity']?.includes('Moderate')) {
      score += 15;
  }

  // Question-specific modifiers
  if (answers['radiation']?.toLowerCase().includes('yes')) {
    score += 30;
    reasoning.push('Pain radiating to arm/neck/jaw significantly increases risk of cardiac event.');
  }
  
  if (answers['shortnessOfBreath']?.toLowerCase().includes('yes')) {
    score += 25;
    reasoning.push('Shortness of breath combined with primary symptoms requires immediate evaluation.');
  }

  if (answers['vision']?.toLowerCase().includes('yes')) {
      score += 20;
      reasoning.push('Vision changes with headache may indicate severe migraine or neurological event.');
  }

  if (symptoms.duration === 'Sudden onset') {
      score += 10;
      reasoning.push('Sudden onset of symptoms is a risk factor.');
  }

  // Cap score at 100
  score = Math.min(score, 100);

  // Classification Logic
  let level: 1 | 2 | 3 | 4 = 1;
  let classification: 'Mild' | 'Moderate' | 'High' | 'Critical' = 'Mild';
  let recommendedAction = 'Self-care advice and home monitoring.';

  if (score >= 80) {
    level = 4;
    classification = 'Critical';
    recommendedAction = 'Immediate emergency escalation. Call 911 or visit the nearest ER.';
  } else if (score >= 50) {
    level = 3;
    classification = 'High';
    recommendedAction = 'Urgent physician review. Please visit an urgent care center.';
  } else if (score >= 30) {
    level = 2;
    classification = 'Moderate';
    recommendedAction = 'Schedule a doctor consultation within 24-48 hours.';
  }

  return {
    score,
    level,
    classification,
    reasoning,
    recommendedAction,
  };
};

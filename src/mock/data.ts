import { faker } from '@faker-js/faker';

// Seed faker for consistent data across renders during dev
faker.seed(123);

export const generatePatients = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 90 }),
    gender: faker.person.sex(),
    status: faker.helpers.arrayElement(['Stable', 'Critical', 'Observation', 'Discharged']),
    department: faker.helpers.arrayElement(['Cardiology', 'Neurology', 'Oncology', 'General']),
    admissionDate: faker.date.recent({ days: 10 }).toISOString(),
    room: `Room ${faker.number.int({ min: 100, max: 500 })}`,
  }));
};

export const mockPatients = generatePatients(20);

export const generateVitalsTimeline = () => {
  return Array.from({ length: 24 }).map((_, i) => ({
    time: `${i}:00`,
    heartRate: faker.number.int({ min: 60, max: 100 }),
    bloodPressure: faker.number.int({ min: 110, max: 140 }),
    spo2: faker.number.int({ min: 94, max: 100 }),
  }));
};

// Family health longitudinal tracking
export const familyVitalsTimeline = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  patientSystolic: faker.number.int({ min: 120, max: 135 }), // You
  patientDiastolic: faker.number.int({ min: 80, max: 88 }),
  patientHbA1c: faker.number.float({ min: 5.4, max: 6.2, fractionDigits: 1 }),
  patientCholesterol: faker.number.int({ min: 180, max: 210 }),
  
  fatherSystolic: faker.number.int({ min: 135, max: 155 }), // Father
  fatherDiastolic: faker.number.int({ min: 88, max: 98 }),
  fatherHbA1c: faker.number.float({ min: 6.5, max: 7.8, fractionDigits: 1 }),
  fatherCholesterol: faker.number.int({ min: 220, max: 260 }),

  grandfatherSystolic: faker.number.int({ min: 145, max: 170 }), // Paternal GF
  grandfatherDiastolic: faker.number.int({ min: 90, max: 105 }),
  grandfatherHbA1c: faker.number.float({ min: 7.2, max: 8.5, fractionDigits: 1 }),
  grandfatherCholesterol: faker.number.int({ min: 240, max: 290 }),

  motherSystolic: faker.number.int({ min: 115, max: 125 }), // Mother
  motherDiastolic: faker.number.int({ min: 75, max: 82 }),
  motherHbA1c: faker.number.float({ min: 6.8, max: 8.2, fractionDigits: 1 }),
  motherCholesterol: faker.number.int({ min: 190, max: 230 }),
}));


// --- New Analytics Generators for Patient Dashboards ---

export const generateVitalsHistory = (days: number = 30) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Create a slight upward trend in BP to trigger AI warnings
    const trendFactor = i / days;
    
    return {
      date: date.toISOString().split('T')[0],
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      heartRate: faker.number.int({ min: 62, max: 85 }),
      systolic: faker.number.int({ min: 115 + (trendFactor * 10), max: 125 + (trendFactor * 15) }),
      diastolic: faker.number.int({ min: 75 + (trendFactor * 5), max: 82 + (trendFactor * 8) }),
      spo2: faker.number.int({ min: 96, max: 100 }),
      temperature: faker.number.float({ min: 97.8, max: 99.1, fractionDigits: 1 }),
      sleepHours: faker.number.float({ min: 5.5, max: 8.5, fractionDigits: 1 }),
    };
  });
};

export const generateMedicationAdherence = (days: number = 30) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    return {
      date: date.toISOString().split('T')[0],
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      taken: faker.number.int({ min: 1, max: 3 }),
      prescribed: 3,
      // Boolean true 85% of the time
      isCompliant: faker.number.int({ min: 1, max: 100 }) > 15,
    };
  });
};

export const generateLabHistory = (months: number = 6) => {
  return Array.from({ length: months }).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i));
    return {
      date: date.toISOString().split('T')[0],
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      hba1c: faker.number.float({ min: 5.4, max: 6.8, fractionDigits: 1 }),
      ldl: faker.number.int({ min: 90, max: 140 }),
      hdl: faker.number.int({ min: 40, max: 60 }),
      triglycerides: faker.number.int({ min: 100, max: 180 }),
      creatinine: faker.number.float({ min: 0.8, max: 1.3, fractionDigits: 1 }),
      bun: faker.number.int({ min: 10, max: 20 }),
    };
  });
};

export const generateAppointmentHistory = () => {
  const specialties = ['Cardiology', 'Primary Care', 'Neurology', 'Endocrinology'];
  const doctors = ['Dr. Chen', 'Dr. Smith', 'Dr. Patel', 'Dr. Rodriguez'];
  const statuses = ['Completed', 'Completed', 'Completed', 'Missed', 'Cancelled'];
  
  return Array.from({ length: 10 }).map((_, i) => {
    const date = faker.date.past({ years: 1 });
    const isFuture = i < 2; // Make first two upcoming
    const apptDate = isFuture ? faker.date.soon({ days: 30 }) : date;
    
    return {
      id: faker.string.uuid(),
      date: apptDate.toISOString(),
      displayDate: apptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: `${faker.number.int({ min: 9, max: 16 })}:00 ${faker.helpers.arrayElement(['AM', 'PM'])}`,
      doctor: faker.helpers.arrayElement(doctors),
      specialty: faker.helpers.arrayElement(specialties),
      status: isFuture ? 'Confirmed' : faker.helpers.arrayElement(statuses),
      location: faker.helpers.arrayElement(['Main Campus', 'West Wing Clinic', 'Telehealth']),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateSymptomHistory = () => {
  const symptoms = ['Headache', 'Lower Back Pain', 'Fatigue', 'Dizziness', 'Chest Tightness', 'Nausea'];
  const regions = ['Head', 'Back', 'General', 'Head', 'Chest', 'Abdomen'];
  
  return Array.from({ length: 15 }).map(() => {
    const date = faker.date.past({ years: 0.5 });
    const symptomIndex = faker.number.int({ min: 0, max: 5 });
    
    return {
      id: faker.string.uuid(),
      date: date.toISOString(),
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      name: symptoms[symptomIndex],
      region: regions[symptomIndex],
      severity: faker.helpers.arrayElement(['Mild', 'Moderate', 'Severe']),
      notes: faker.lorem.sentence(),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

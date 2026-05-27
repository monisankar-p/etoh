import { faker } from '@faker-js/faker';

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


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

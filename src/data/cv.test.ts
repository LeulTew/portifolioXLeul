import { describe, it, expect } from 'vitest';
import { cvData } from './cv';

describe('cvData', () => {
  it('has about section with required fields', () => {
    expect(cvData.about).toHaveProperty('title');
    expect(cvData.about).toHaveProperty('description');
    expect(cvData.about).toHaveProperty('stats');
  });

  it('has at least one stat', () => {
    expect(cvData.about.stats.length).toBeGreaterThan(0);
  });

  it('has education section', () => {
    expect(cvData.education.length).toBeGreaterThan(0);
    cvData.education.forEach((edu) => {
      expect(edu).toHaveProperty('school');
      expect(edu).toHaveProperty('degree');
      expect(edu).toHaveProperty('period');
    });
  });

  it('has certifications section', () => {
    expect(cvData.certifications.length).toBeGreaterThan(0);
    cvData.certifications.forEach((cert) => {
      expect(cert).toHaveProperty('issuer');
      expect(cert).toHaveProperty('year');
      expect(cert).toHaveProperty('items');
    });
  });

  it('has experience section', () => {
    expect(cvData.experience.length).toBeGreaterThan(0);
    cvData.experience.forEach((exp) => {
      expect(exp).toHaveProperty('role');
      expect(exp).toHaveProperty('company');
      expect(exp).toHaveProperty('period');
    });
  });

  it('has skills section', () => {
    expect(cvData.skills.length).toBeGreaterThan(0);
    cvData.skills.forEach((skill) => {
      expect(skill).toHaveProperty('title');
      expect(skill).toHaveProperty('items');
      expect(skill.items.length).toBeGreaterThan(0);
    });
  });

  it('has contact information', () => {
    expect(cvData.contact).toHaveProperty('email');
    expect(cvData.contact).toHaveProperty('phone');
    expect(cvData.contact.social).toHaveProperty('github');
    expect(cvData.contact.social).toHaveProperty('linkedin');
  });
});

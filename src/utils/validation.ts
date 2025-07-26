import type { Property } from '../types/property';

export const validatePropertyId = (id: string): boolean => {
  const propertyIdRegex = /^[A-Z]{3}-\d{6}$/;
  return propertyIdRegex.test(id);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePropertyData = (property: Partial<Property>): ValidationResult => {
  const errors: string[] = [];

  if (!property.id || !validatePropertyId(property.id)) {
    errors.push('Invalid property ID format');
  }

  if (!property.location || property.location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (typeof property.newValue !== 'number' || property.newValue <= 0) {
    errors.push('New value must be a positive number');
  }

  if (typeof property.previousValue !== 'number' || property.previousValue <= 0) {
    errors.push('Previous value must be a positive number');
  }

  // Safe check for coordinates since it might be optional in Partial<Property>
  if (property.coordinates !== undefined) {
    const { lat, lng } = property.coordinates;
    if (!validateCoordinates(lat, lng)) {
      errors.push('Invalid coordinates');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation for complete Property object (not Partial)
export const validateCompleteProperty = (property: Property): ValidationResult => {
  const errors: string[] = [];

  if (!validatePropertyId(property.id)) {
    errors.push('Invalid property ID format');
  }

  if (!property.location || property.location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (property.newValue <= 0) {
    errors.push('New value must be a positive number');
  }

  if (property.previousValue <= 0) {
    errors.push('Previous value must be a positive number');
  }

  // coordinates is required in complete Property, so we can access it directly
  const { lat, lng } = property.coordinates;
  if (!validateCoordinates(lat, lng)) {
    errors.push('Invalid coordinates');
  }

  if (!property.lastUpdated) {
    errors.push('Last updated date is required');
  }

  const validStatuses: Property['status'][] = ['Completed', 'Pending', 'Review'];
  if (!validStatuses.includes(property.status)) {
    errors.push('Invalid property status');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
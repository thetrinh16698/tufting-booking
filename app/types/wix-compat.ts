// Type definitions to maintain compatibility with Wix types
// This allows existing components to work without major refactoring

export namespace availabilityCalendar {
  export interface SlotAvailability {
    bookable: boolean;
    bookingPolicyViolations?: {
      tooLateToBook?: boolean;
      tooEarlyToBook?: boolean;
    };
    slot?: {
      location?: {
        name: string;
      };
      resource?: {
        name: string;
      };
      startDate?: string;
    };
  }
}

export namespace extendedBookings {
  export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELED',
    COMPLETED = 'COMPLETED',
  }

  export interface Booking {
    _id: string;
    revision: string;
    status: BookingStatus;
  }

  export interface AllowedActions {
    cancel?: boolean;
  }
}

export namespace orders {
  export interface Order {
    _id: string;
  }
}

export namespace plans {
  export enum PeriodUnit {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
    UNDEFINED = 'UNDEFINED',
  }

  export interface Duration {
    count?: number;
    unit: PeriodUnit;
  }

  export interface Recurrence {
    cycleDuration?: Duration;
  }

  export interface Pricing {
    price?: {
      value: number;
      currency: string;
    };
    singlePaymentUnlimited?: boolean;
    singlePaymentForDuration?: Duration;
    subscription?: Recurrence;
  }

  export interface Plan {
    _id: string;
    name: string;
    description?: string;
    pricing?: Pricing;
    perks?: {
      values: string[];
    };
  }
}

export namespace availabilityCalendar {
  export interface DayAvailability {
    date: string;
    slots: SlotAvailability[];
  }

  export interface CalendarAvailability {
    calendar: {
      availability: DayAvailability[];
    };
  }
}

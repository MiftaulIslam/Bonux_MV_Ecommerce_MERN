
export const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (localPart.length > 2) {
      const maskedLocalPart = localPart.slice(0, 2) + "*".repeat(localPart.length - 2);
      return `${maskedLocalPart}@${domain}`;
    }
    return email; 
  };
  
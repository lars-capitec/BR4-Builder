// Simple database service for business and campaign data
// In production, this would connect to a real database like PostgreSQL, MongoDB, etc.

export interface BusinessInfo {
  id: string;
  shopName: string;
  industry: string;
  address: string;
  openTime: string;
  closeTime: string;
  busyTimes: boolean;
  peakHoursFrom: string;
  peakHoursTo: string;
  busyDays: string[];
  logoFile: string | null; // Base64 encoded
  marketingImageFile: string | null; // Base64 encoded
  createdAt: string;
  updatedAt: string;
}

export interface CampaignInfo {
  id: string;
  businessId: string;
  type: 'instant_reward' | 'loyalty_card' | 'triggered_reward';
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'approved' | 'scheduled';
  startDate: string;
  endDate: string;
  rewardValue: number;
  conditions: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Database operations
class SimpleDatabase {
  private businessKey = 'businessDatabase';
  private campaignKey = 'campaignDatabase';

  // Business Info operations
  async saveBusinessInfo(businessData: Omit<BusinessInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<BusinessInfo> {
    const now = new Date().toISOString();
    const id = this.generateId();
    
    const businessInfo: BusinessInfo = {
      ...businessData,
      id,
      createdAt: now,
      updatedAt: now
    };

    const existing = this.getAllBusinessInfo();
    existing.push(businessInfo);
    localStorage.setItem(this.businessKey, JSON.stringify(existing));
    
    console.log('Business info saved:', businessInfo);
    return businessInfo;
  }

  getAllBusinessInfo(): BusinessInfo[] {
    const data = localStorage.getItem(this.businessKey);
    return data ? JSON.parse(data) : [];
  }

  getBusinessInfoById(id: string): BusinessInfo | null {
    const businesses = this.getAllBusinessInfo();
    return businesses.find(b => b.id === id) || null;
  }

  updateBusinessInfo(id: string, updates: Partial<BusinessInfo>): BusinessInfo | null {
    const businesses = this.getAllBusinessInfo();
    const index = businesses.findIndex(b => b.id === id);
    
    if (index === -1) return null;
    
    businesses[index] = {
      ...businesses[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(this.businessKey, JSON.stringify(businesses));
    return businesses[index];
  }

  deleteBusinessInfo(id: string): boolean {
    const businesses = this.getAllBusinessInfo();
    const filtered = businesses.filter(b => b.id !== id);
    
    if (filtered.length === businesses.length) return false;
    
    localStorage.setItem(this.businessKey, JSON.stringify(filtered));
    return true;
  }

  // Campaign operations
  async saveCampaignInfo(campaignData: Omit<CampaignInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<CampaignInfo> {
    const now = new Date().toISOString();
    const id = this.generateId();
    
    const campaignInfo: CampaignInfo = {
      ...campaignData,
      id,
      createdAt: now,
      updatedAt: now
    };

    const existing = this.getAllCampaigns();
    existing.push(campaignInfo);
    localStorage.setItem(this.campaignKey, JSON.stringify(existing));
    
    console.log('Campaign info saved:', campaignInfo);
    return campaignInfo;
  }

  getAllCampaigns(): CampaignInfo[] {
    const data = localStorage.getItem(this.campaignKey);
    return data ? JSON.parse(data) : [];
  }

  getCampaignById(id: string): CampaignInfo | null {
    const campaigns = this.getAllCampaigns();
    return campaigns.find(c => c.id === id) || null;
  }

  getCampaignsByBusinessId(businessId: string): CampaignInfo[] {
    const campaigns = this.getAllCampaigns();
    return campaigns.filter(c => c.businessId === businessId);
  }

  updateCampaign(id: string, updates: Partial<CampaignInfo>): CampaignInfo | null {
    const campaigns = this.getAllCampaigns();
    const index = campaigns.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    campaigns[index] = {
      ...campaigns[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(this.campaignKey, JSON.stringify(campaigns));
    return campaigns[index];
  }

  deleteCampaign(id: string): boolean {
    const campaigns = this.getAllCampaigns();
    const filtered = campaigns.filter(c => c.id !== id);
    
    if (filtered.length === campaigns.length) return false;
    
    localStorage.setItem(this.campaignKey, JSON.stringify(filtered));
    return true;
  }

  // Utility functions
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Clear all data (for testing/development)
  clearAllData(): void {
    localStorage.removeItem(this.businessKey);
    localStorage.removeItem(this.campaignKey);
    console.log('All database data cleared');
  }

  // Export data (for backup/migration)
  exportData(): { businesses: BusinessInfo[]; campaigns: CampaignInfo[] } {
    return {
      businesses: this.getAllBusinessInfo(),
      campaigns: this.getAllCampaigns()
    };
  }

  // Import data (for backup/migration)
  importData(data: { businesses: BusinessInfo[]; campaigns: CampaignInfo[] }): void {
    localStorage.setItem(this.businessKey, JSON.stringify(data.businesses));
    localStorage.setItem(this.campaignKey, JSON.stringify(data.campaigns));
    console.log('Data imported successfully');
  }
}

// File utility functions
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Create and export database instance
export const database = new SimpleDatabase();

// Export types
export type { BusinessInfo, CampaignInfo };

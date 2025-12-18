// API service for business and campaign data operations
import { database, type BusinessInfo, type CampaignInfo } from './database';

// Business API endpoints
export const businessAPI = {
  // Get all businesses
  async getAll(): Promise<BusinessInfo[]> {
    return database.getAllBusinessInfo();
  },

  // Get business by ID
  async getById(id: string): Promise<BusinessInfo | null> {
    return database.getBusinessInfoById(id);
  },

  // Get current business (from session)
  async getCurrent(): Promise<BusinessInfo | null> {
    const currentBusinessId = sessionStorage.getItem('currentBusinessId');
    if (!currentBusinessId) return null;
    return database.getBusinessInfoById(currentBusinessId);
  },

  // Create new business
  async create(businessData: Omit<BusinessInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<BusinessInfo> {
    return database.saveBusinessInfo(businessData);
  },

  // Update business
  async update(id: string, updates: Partial<BusinessInfo>): Promise<BusinessInfo | null> {
    return database.updateBusinessInfo(id, updates);
  },

  // Delete business
  async delete(id: string): Promise<boolean> {
    return database.deleteBusinessInfo(id);
  }
};

// Campaign API endpoints
export const campaignAPI = {
  // Get all campaigns
  async getAll(): Promise<CampaignInfo[]> {
    return database.getAllCampaigns();
  },

  // Get campaigns for current business
  async getCurrentBusinessCampaigns(): Promise<CampaignInfo[]> {
    const currentBusinessId = sessionStorage.getItem('currentBusinessId');
    if (!currentBusinessId) return [];
    return database.getCampaignsByBusinessId(currentBusinessId);
  },

  // Get campaign by ID
  async getById(id: string): Promise<CampaignInfo | null> {
    return database.getCampaignById(id);
  },

  // Get campaigns by business ID
  async getByBusinessId(businessId: string): Promise<CampaignInfo[]> {
    return database.getCampaignsByBusinessId(businessId);
  },

  // Create new campaign
  async create(campaignData: Omit<CampaignInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<CampaignInfo> {
    return database.saveCampaignInfo(campaignData);
  },

  // Update campaign
  async update(id: string, updates: Partial<CampaignInfo>): Promise<CampaignInfo | null> {
    return database.updateCampaign(id, updates);
  },

  // Delete campaign
  async delete(id: string): Promise<boolean> {
    return database.deleteCampaign(id);
  },

  // Get campaigns by status
  async getByStatus(status: CampaignInfo['status']): Promise<CampaignInfo[]> {
    const campaigns = database.getAllCampaigns();
    return campaigns.filter(campaign => campaign.status === status);
  },

  // Get active campaigns for current business
  async getActiveCampaigns(): Promise<CampaignInfo[]> {
    const currentBusinessId = sessionStorage.getItem('currentBusinessId');
    if (!currentBusinessId) return [];
    
    const campaigns = database.getCampaignsByBusinessId(currentBusinessId);
    return campaigns.filter(campaign => campaign.status === 'active');
  }
};

// Analytics and reporting
export const analyticsAPI = {
  // Get business summary stats
  async getBusinessSummary(businessId?: string): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    totalRedemptions: number;
  }> {
    const targetBusinessId = businessId || sessionStorage.getItem('currentBusinessId');
    if (!targetBusinessId) {
      return { totalCampaigns: 0, activeCampaigns: 0, completedCampaigns: 0, totalRedemptions: 0 };
    }

    const campaigns = database.getCampaignsByBusinessId(targetBusinessId);
    
    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
      totalRedemptions: campaigns.reduce((sum, campaign) => {
        // In a real app, this would come from redemption data
        return sum + Math.floor(Math.random() * 100);
      }, 0)
    };
  },

  // Get campaign performance data
  async getCampaignPerformance(campaignId: string): Promise<{
    impressions: number;
    clicks: number;
    redemptions: number;
    conversionRate: number;
  }> {
    // In a real app, this would fetch actual analytics data
    return {
      impressions: Math.floor(Math.random() * 10000) + 1000,
      clicks: Math.floor(Math.random() * 1000) + 100,
      redemptions: Math.floor(Math.random() * 100) + 10,
      conversionRate: Math.random() * 0.1 + 0.05 // 5-15%
    };
  }
};

// Utility functions
export const utilsAPI = {
  // Export all data
  exportData() {
    return database.exportData();
  },

  // Import data
  importData(data: { businesses: BusinessInfo[]; campaigns: CampaignInfo[] }) {
    database.importData(data);
  },

  // Clear all data
  clearData() {
    database.clearAllData();
    sessionStorage.removeItem('currentBusinessId');
  },

  // Get current business ID
  getCurrentBusinessId(): string | null {
    return sessionStorage.getItem('currentBusinessId');
  },

  // Set current business ID
  setCurrentBusinessId(id: string) {
    sessionStorage.setItem('currentBusinessId', id);
  }
};

// Data validation helpers
export const validation = {
  validateBusinessData(data: Partial<BusinessInfo>): string[] {
    const errors: string[] = [];
    
    if (!data.shopName?.trim()) {
      errors.push('Shop name is required');
    }
    
    if (!data.industry?.trim()) {
      errors.push('Industry is required');
    }
    
    if (!data.address?.trim()) {
      errors.push('Address is required');
    }
    
    if (data.busyTimes && (!data.peakHoursFrom || !data.peakHoursTo)) {
      errors.push('Peak hours must be specified when busy times is enabled');
    }
    
    return errors;
  },

  validateCampaignData(data: Partial<CampaignInfo>): string[] {
    const errors: string[] = [];
    
    if (!data.name?.trim()) {
      errors.push('Campaign name is required');
    }
    
    if (!data.type) {
      errors.push('Campaign type is required');
    }
    
    if (!data.businessId) {
      errors.push('Business ID is required');
    }
    
    if (data.rewardValue !== undefined && data.rewardValue <= 0) {
      errors.push('Reward value must be greater than 0');
    }
    
    return errors;
  }
};

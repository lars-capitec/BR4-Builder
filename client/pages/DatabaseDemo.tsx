import { useState, useEffect } from "react";
import { businessAPI, campaignAPI, analyticsAPI, utilsAPI } from "@/lib/api";
import { type BusinessInfo, type CampaignInfo } from "@/lib/database";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TonalButton } from "@/components/ui/tonal-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DatabaseDemo() {
  const [businesses, setBusinesses] = useState<BusinessInfo[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignInfo[]>([]);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessInfo | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [businessData, campaignData, currentBusinessData, summaryData] = await Promise.all([
        businessAPI.getAll(),
        campaignAPI.getAll(),
        businessAPI.getCurrent(),
        analyticsAPI.getBusinessSummary()
      ]);
      
      setBusinesses(businessData);
      setCampaigns(campaignData);
      setCurrentBusiness(currentBusinessData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const createSampleCampaign = async () => {
    if (!currentBusiness) {
      alert('Please complete business setup first!');
      return;
    }

    try {
      const sampleCampaign: Omit<CampaignInfo, 'id' | 'createdAt' | 'updatedAt'> = {
        businessId: currentBusiness.id,
        type: 'instant_reward',
        name: 'Welcome Offer - 20% Off',
        description: 'Get 20% off your first purchase at our store',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        rewardValue: 20,
        conditions: {
          minimumPurchase: 50,
          maxRedemptions: 100,
          newCustomersOnly: true
        }
      };

      await campaignAPI.create(sampleCampaign);
      loadData(); // Refresh data
      alert('Sample campaign created!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign');
    }
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      utilsAPI.clearData();
      loadData();
      alert('All data cleared!');
    }
  };

  const exportData = () => {
    const data = utilsAPI.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F70EF] mx-auto mb-4"></div>
          <p className="text-[#4A535C]">Loading database data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F272E] mb-2">Database Demo</h1>
          <p className="text-[#4A535C]">
            This page demonstrates the business and campaign data storage functionality.
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Database Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton onClick={createSampleCampaign}>
                Create Sample Campaign
              </PrimaryButton>
              <TonalButton onClick={exportData}>
                Export Data
              </TonalButton>
              <TonalButton onClick={loadData}>
                Refresh Data
              </TonalButton>
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Current Business Info */}
        {currentBusiness && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Business</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-[#1F272E]">{currentBusiness.shopName}</h3>
                  <p className="text-[#4A535C]">{currentBusiness.industry}</p>
                  <p className="text-sm text-[#6D7885]">{currentBusiness.address}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4A535C]">
                    <strong>Hours:</strong> {currentBusiness.openTime} - {currentBusiness.closeTime}
                  </p>
                  {currentBusiness.busyDays.length > 0 && (
                    <p className="text-sm text-[#4A535C]">
                      <strong>Busy Days:</strong> {currentBusiness.busyDays.join(', ')}
                    </p>
                  )}
                  {currentBusiness.busyTimes && (
                    <p className="text-sm text-[#4A535C]">
                      <strong>Peak Hours:</strong> {currentBusiness.peakHoursFrom} - {currentBusiness.peakHoursTo}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        {summary && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Business Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2F70EF]">{summary.totalCampaigns}</div>
                  <div className="text-sm text-[#4A535C]">Total Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{summary.activeCampaigns}</div>
                  <div className="text-sm text-[#4A535C]">Active Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{summary.completedCampaigns}</div>
                  <div className="text-sm text-[#4A535C]">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{summary.totalRedemptions}</div>
                  <div className="text-sm text-[#4A535C]">Redemptions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Businesses */}
          <Card>
            <CardHeader>
              <CardTitle>All Businesses ({businesses.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {businesses.length === 0 ? (
                <p className="text-[#4A535C] text-center py-8">
                  No businesses found. Complete the business setup form to create one.
                </p>
              ) : (
                <div className="space-y-4">
                  {businesses.map((business) => (
                    <div key={business.id} className="border border-[#CFD5E0] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#1F272E]">{business.shopName}</h3>
                        {business.id === currentBusiness?.id && (
                          <Badge className="bg-[#2F70EF] text-white">Current</Badge>
                        )}
                      </div>
                      <p className="text-[#4A535C] text-sm">{business.industry}</p>
                      <p className="text-[#6D7885] text-xs">{business.address}</p>
                      {business.busyDays.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-[#6D7885] mb-1">Busy Days:</p>
                          <div className="flex flex-wrap gap-1">
                            {business.busyDays.map((day) => (
                              <span key={day} className="text-xs bg-[#E8EDFF] text-[#1655D1] px-2 py-1 rounded">
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-[#6D7885] mt-2">
                        Created: {new Date(business.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns ({campaigns.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <p className="text-[#4A535C] text-center py-8">
                  No campaigns found. Create a sample campaign to see how data is stored.
                </p>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border border-[#CFD5E0] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#1F272E]">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-[#4A535C] text-sm mb-2">{campaign.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#6D7885]">
                        <span>Type: {campaign.type.replace('_', ' ')}</span>
                        <span>Value: R{campaign.rewardValue}</span>
                      </div>
                      <p className="text-xs text-[#6D7885] mt-2">
                        Created: {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Database Schema Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Database Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-[#1F272E] mb-3">BusinessInfo</h4>
                <div className="text-sm text-[#4A535C] space-y-1">
                  <p>• id, shopName, industry, address</p>
                  <p>• openTime, closeTime, busyTimes</p>
                  <p>• peakHoursFrom, peakHoursTo</p>
                  <p>• busyDays (array of selected days)</p>
                  <p>• logoFile, marketingImageFile (base64)</p>
                  <p>• createdAt, updatedAt</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1F272E] mb-3">CampaignInfo</h4>
                <div className="text-sm text-[#4A535C] space-y-1">
                  <p>• id, businessId, type, name</p>
                  <p>• description, status, startDate, endDate</p>
                  <p>• rewardValue, conditions</p>
                  <p>• createdAt, updatedAt</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

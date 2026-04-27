import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  MessageSquare,
  Briefcase,
  LogOut,
  AlertCircle,
} from 'lucide-react';

interface DashboardFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const LawyerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect to login if not a lawyer
  if (!user || user.role !== 'lawyer') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('lawyerDashboard.notFindLawyer')}
            </p>
            <Button
              className="w-full"
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const features: DashboardFeature[] = [
    {
      id: 'legal-assistant',
      title: t('lawyerDashboard.legalAssistant'),
      description: 'Access legal research tools and BNS information',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-blue-50',
    },
    {
      id: 'document-summarization',
      title: t('lawyerDashboard.documentSummarization'),
      description: 'Quickly summarize legal documents in multiple languages',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-green-50',
    },
    // {
    //   id: 'chatbot',
    //   title: t('lawyerDashboard.chatbot'),
    //   description: 'AI-powered chatbot for client consultations',
    //   icon: <MessageSquare className="w-8 h-8" />,
    //   color: 'bg-purple-50',
    // },
  ];

  const handleFeatureClick = (featureId: string) => {
    switch (featureId) {
      case 'legal-assistant':
        navigate('/chat');
        break;
      case 'document-summarization':
        // Navigate to document summarization page
        navigate('/');
        break;
      case 'chatbot':
        navigate('/chat');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Header */}
        <div className="w-full flex flex-col">
          <div className="bg-white border-b shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-legal-blue">
                    {t('lawyerDashboard.title')}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Welcome back, {user.name}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t('auth.logout')}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="container mx-auto px-6 py-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="overview">{t('common.home')}</TabsTrigger>
                  {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t('lawyerDashboard.title')}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Choose a feature to get started with your legal practice
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature) => (
                      <Card
                        key={feature.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                        onClick={() => handleFeatureClick(feature.id)}
                      >
                        <CardHeader>
                          <div className={`${feature.color} rounded-lg p-3 w-fit mb-4`}>
                            <div className="text-legal-blue">{feature.icon}</div>
                          </div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            className="w-full bg-legal-blue hover:bg-legal-blue/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFeatureClick(feature.id);
                            }}
                          >
                            Access
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Settings Tab
                <TabsContent value="settings" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Name</label>
                          <p className="mt-1">{user.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p className="mt-1">{user.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Role</label>
                          <p className="mt-1 capitalize">{user.role}</p>
                        </div>
                        {user.application_status && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Status</label>
                            <p className="mt-1 capitalize">{user.application_status}</p>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent> */}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LawyerDashboard;

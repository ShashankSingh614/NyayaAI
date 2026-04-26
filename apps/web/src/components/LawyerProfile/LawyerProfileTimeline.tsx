
import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lawyer } from "@/data/lawyers";

interface LawyerProfileTimelineProps {
  lawyer: Lawyer;
}

export const LawyerProfileTimeline: React.FC<LawyerProfileTimelineProps> = ({ lawyer }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="experience">Work Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="experience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {lawyer.jobProfiles.map((job, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{job.position}</h3>
                            <p className="text-primary font-medium">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        {job.current && (
                          <Badge variant="outline" className="text-green-700 border-green-300">
                            Current Position
                          </Badge>
                        )}
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {lawyer.education.map((edu, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                            <p className="text-blue-600 font-medium">{edu.institution}</p>
                            <p className="text-gray-600">{edu.field}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.startYear} - {edu.endYear}</span>
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Bar Admissions</h4>
            <div className="flex flex-wrap gap-2">
              {lawyer.barAdmissions.map((bar, index) => (
                <Badge key={index} variant="outline">{bar}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {lawyer.languages.map((language, index) => (
                <Badge key={index} variant="secondary">{language}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

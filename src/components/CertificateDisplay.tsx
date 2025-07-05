import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Certificate } from '@/types/certificate';
import {
    CheckCircle,
    Calendar,
    User,
    Book,
    Star,
    ArrowLeft,
    Download,
    Share2,
} from 'lucide-react';
import { getCertificateTypeIcon, getCertificateTypeLabel, formatCertificateDate } from '@/utils/certificateHelpers';

// Props
interface CertificateDisplayProps {
    certificate: Certificate;
    onReset: () => void;
}

// Main Component
export const CertificateDisplay: React.FC<CertificateDisplayProps> = ({ certificate, onReset }) => {
    return (
        <section className="space-y-6 sm:space-y-8 max-w-4xl mx-auto px-4">
            {/* Verification Status */}
            <section>
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                        <header className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 flex-shrink-0" />
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">Certificate Verified ✓</h2>
                                <p className="text-green-600 text-sm sm:text-base lg:text-lg">This certificate is authentic and valid</p>
                            </div>
                        </header>
                    </CardContent>
                </Card>
            </section>

            {/* Certificate Details */}
            <article>
                <Card className="bg-white shadow-2xl border-0">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6">
                        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                {getCertificateTypeIcon(certificate.certificateType, "h-6 w-6")}
                                <div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold"> {getCertificateTypeLabel(certificate.certificateType)} Certificate </h3>
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm sm:text-base lg:text-lg px-3 py-1 sm:px-4 sm:py-2 self-start sm:self-auto">
                                ID: {certificate.id}
                            </Badge>
                        </header>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                            <div className="space-y-6 sm:space-y-8">
                                <div>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                            <User className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                            <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">Recipient</label>
                                        </div>
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words pl-0 m-0">{certificate.recipientName}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                            <Book className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                            <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">{certificate.certificateType === 'course' ? 'Course' : 'Program'}</label>
                                        </div>
                                        <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 break-words pl-0 m-0">{certificate.certificateTitle}</p>
                                    </div>
                                </div>

                                {certificate.grade && (
                                    <div>
                                        <div className="flex flex-col items-start">
                                            <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                                <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">Grade</label>
                                            </div>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 pl-0 m-0">{certificate.grade}</p>
                                        </div>
                                    </div>
                                )}

                                {certificate.duration && (
                                    <div>
                                        <div className="flex flex-col items-start">
                                            <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                                <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">Duration</label>
                                            </div>
                                            <p className="text-base sm:text-lg font-semibold text-gray-800 pl-0 m-0">{certificate.duration}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6 sm:space-y-8">
                                <div>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                            <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">Issue Date</label>
                                        </div>
                                        <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 pl-0 m-0">{formatCertificateDate(certificate.issueDate, 'long')}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                            <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">Expiry Date</label>
                                        </div>
                                        <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 pl-0 m-0">{formatCertificateDate(certificate.expiryDate || "", 'long')}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                                            <User className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                            <label className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">Instructor</label>
                                        </div>
                                        <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 break-words pl-0 m-0">{certificate.instructorName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <section className="mt-8 sm:mt-12">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                                Skills Acquired
                            </h4>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {(certificate.skills ?? []).map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1">
                                        <Star className="inline h-3 w-3 mr-1 text-orange-400" />
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <footer className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-gray-200">
                            <Button onClick={onReset} variant="outline" className="flex items-center justify-center space-x-2 sm:space-x-3 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Verify Another</span>
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center space-x-2 sm:space-x-3 border-2 border-gray-300 hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Download PDF</span>
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center space-x-2 sm:space-x-3 border-2 border-gray-300 hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Share</span>
                            </Button>
                        </footer>
                    </CardContent>
                </Card>
            </article>
        </section>
    );
};

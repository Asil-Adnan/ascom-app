'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, Check, Loader2, ShieldAlert, ScanLine } from 'lucide-react';
import { submitBusVisaApplication } from '@/app/actions/submit-application';

export default function DocumentUploadPage() {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [isExtracted, setIsExtracted] = useState(false);
    const [passportData, setPassportData] = useState({
        name: '',
        passportNumber: '',
        nationality: '',
        expiryDate: ''
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                setIsExtracted(true);
                setPassportData({
                    name: 'Ahmed Al-Farsi',
                    passportNumber: 'A12345678',
                    nationality: 'India',
                    expiryDate: '2028-05-20'
                });
            }, 2000);
        }
    };

    const isEligible = () => {
        if (!passportData.expiryDate) return true;
        const expiry = new Date(passportData.expiryDate);
        const today = new Date();
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(today.getMonth() + 6);
        return expiry > sixMonthsFromNow;
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <button onClick={() => router.back()} className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                    <ArrowLeft size={22} strokeWidth={2.5} />
                </button>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Upload Passport</h1>
                    <p className="text-gray-500 font-medium">Verify your identity and eligibility.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload / Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Upload Area */}
                    <NeoCard className="p-10 relative overflow-hidden group cursor-pointer border-2 border-dashed border-gray-300 hover:border-red-500 transition-all">
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                            onChange={handleFileUpload}
                        />

                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                                {isUploading ? <Loader2 className="animate-spin" size={40} /> : <Upload size={40} strokeWidth={1.5} />}
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">Tap to Upload Passport</h3>
                            <p className="text-gray-400 mt-2">Supports JPG, PNG, PDF (Max 5MB)</p>
                        </div>
                    </NeoCard>

                    {/* Extracted Data Form */}
                    {isExtracted && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <NeoCard className="p-8">
                                <div className="flex items-center gap-3 text-green-600 mb-8 p-3 bg-green-50 rounded-xl w-fit">
                                    <Check size={20} strokeWidth={3} />
                                    <span className="font-bold">Scanned Successfully</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                        <NeoInput
                                            value={passportData.name}
                                            onChange={e => setPassportData({ ...passportData, name: e.target.value })}
                                            className="font-bold text-lg"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Passport Number</label>
                                        <NeoInput
                                            value={passportData.passportNumber}
                                            onChange={e => setPassportData({ ...passportData, passportNumber: e.target.value })}
                                            className="font-bold text-lg"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Nationality</label>
                                        <NeoInput
                                            value={passportData.nationality}
                                            onChange={e => setPassportData({ ...passportData, nationality: e.target.value })}
                                            className="font-bold text-lg"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Expiry Date</label>
                                        <NeoInput
                                            type="date"
                                            value={passportData.expiryDate}
                                            onChange={e => setPassportData({ ...passportData, expiryDate: e.target.value })}
                                            className={`font-bold text-lg ${!isEligible() ? 'text-red-500 border-red-500 focus:ring-red-500' : ''}`}
                                        />
                                    </div>
                                </div>
                            </NeoCard>

                            <div className="mt-8">
                                {!isEligible() ? (
                                    <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
                                        <ShieldAlert className="text-red-500 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-bold text-red-800">Passport Expiry Alert</h4>
                                            <p className="text-sm text-red-600 mt-1">
                                                Your passport expires in less than 6 months. International travel regulations require at least 6 months validity.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <NeoButton
                                        className="w-full h-16 text-lg font-bold"
                                        size="lg"
                                        onClick={async () => {
                                            const result = await submitBusVisaApplication({
                                                passportData,
                                                documents: ['passport.jpg'] // Mock file for now
                                            });

                                            if (result.success) {
                                                alert('Application submitted successfully!');
                                                router.push('/admin/dashboard'); // Redirect to admin to show proof
                                            } else {
                                                alert('Failed to submit application');
                                            }
                                        }}
                                    >
                                        Confirm & Submit Application
                                    </NeoButton>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Instructions (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full">
                        <div className="flex items-center gap-4 mb-8">
                            <NeoIcon icon={ScanLine} size={24} variant="inset" className="text-gray-500" />
                            <h3 className="text-xl font-bold text-gray-700">Scanning Tips</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: 'No Glare', desc: 'Avoid flash reflections on the data page.' },
                                { title: 'Full Page', desc: 'Ensure all 4 corners are visible.' },
                                { title: 'Clear Text', desc: 'Text should be sharp and readable.' }
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-white/60">
                                    <div className="w-8 h-8 rounded-full neo-inset flex items-center justify-center text-gray-400 font-bold shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{tip.title}</h4>
                                        <p className="text-sm text-gray-500">{tip.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-400 font-medium">
                                Your data is encrypted and processed securely.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

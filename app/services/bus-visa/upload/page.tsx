'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, Upload, Check, Loader2, ShieldAlert, FileText, Calendar, User, Phone, CheckCircle } from 'lucide-react';
import { submitBusVisaApplication } from '@/app/actions/submit-application';
import { toast } from 'sonner';

interface DocumentFile {
    type: string;
    file: File | null;
    preview: string | null;
    label: string;
}

export default function DocumentUploadPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const busId = searchParams.get('busId');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Section 1: Documents
    const [documents, setDocuments] = useState<DocumentFile[]>([
        { type: 'passport_first', label: 'Passport First Page', file: null, preview: null },
        { type: 'passport_second', label: 'Passport Second Page', file: null, preview: null },
        { type: 'passport_cover', label: 'Passport Cover Page', file: null, preview: null },
        { type: 'photo', label: 'Photo', file: null, preview: null },
        { type: 'current_visa', label: 'Current Visit Visa', file: null, preview: null },
        { type: 'cancellation_paper', label: 'Cancellation Paper', file: null, preview: null },
    ]);

    // Section 2: Personal Info
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        age: '',
        phone: '',
        whatsapp: ''
    });

    // Section 3: Important Dates
    const [dates, setDates] = useState({
        passportExpiry: '',
        visaExpiry: ''
    });

    const [agreed, setAgreed] = useState(false);

    const handleFileUpload = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);
            setDocuments(prev => prev.map(doc =>
                doc.type === type ? { ...doc, file, preview } : doc
            ));
        }
    };

    const validateForm = () => {
        // Doc Validation
        const hasPassport = documents.some(d => d.type.startsWith('passport') && d.file !== null);
        const hasPhoto = documents.find(d => d.type === 'photo')?.file !== null;
        const hasVisa = documents.find(d => d.type === 'current_visa')?.file !== null;

        if (!hasPassport) { toast.error('Please upload at least one Passport page.'); return false; }
        if (!hasPhoto) { toast.error('Please upload a Photo.'); return false; }
        if (!hasVisa) { toast.error('Please upload Current Visit Visa.'); return false; }

        // Personal Info Validation
        if (!personalInfo.name || !personalInfo.age || !personalInfo.phone || !personalInfo.whatsapp) {
            toast.error('Please fill in all Personal Information fields.');
            return false;
        }

        // Dates Validation
        if (!dates.passportExpiry || !dates.visaExpiry) {
            toast.error('Please fill in all Important Dates.');
            return false;
        }

        if (!agreed) {
            toast.error('You must agree to the Terms & Conditions.');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Serialize documents for mock submission
            const serializedDocs = documents.filter(d => d.file).map(d => ({
                type: d.type,
                name: d.file?.name,
                // In a real app, we'd upload to S3 here and get a URL
                mockUrl: d.preview
            }));

            const result = await submitBusVisaApplication({
                busId,
                personalInfo,
                importantDates: dates,
                documents: serializedDocs,
                passportData: {} // Empty as we aren't mocking extraction anymore
            });

            if (result.success) {
                toast.success('Application submitted successfully!');
                // Temporary: Redirect to home or admin dashboard until User Apps page is ready
                // User requested redirect to "Applications (User Side)", assuming route /user/applications
                router.push('/user/applications');
            } else {
                toast.error('Failed to submit application.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-4 animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <Link href="/services/bus-visa">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Complete Application</h1>
                    <p className="text-gray-500 font-medium">Upload documents and provide details.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* 1. Required Documents */}
                <NeoCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="text-red-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">1. Required Documents</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc) => (
                            <div key={doc.type} className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">{doc.label}</label>
                                <div className={`relative h-40 rounded-xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 group ${doc.file ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        onChange={(e) => handleFileUpload(doc.type, e)}
                                    />

                                    {doc.preview ? (
                                        <div className="absolute inset-0 z-0">
                                            <img src={doc.preview} alt="preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                                                    <Upload size={20} />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-md z-20">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center p-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 mx-auto mb-2 shadow-sm group-hover:text-red-500 group-hover:scale-110 transition-all">
                                                <Upload size={18} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-400 group-hover:text-red-500 transition-colors">Tap to Upload</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </NeoCard>

                {/* 2. Personal Information */}
                <NeoCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">2. Personal Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-500 ml-1">Full Name</label>
                            <NeoInput
                                placeholder="As on Passport"
                                value={personalInfo.name}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-500 ml-1">Age</label>
                            <NeoInput
                                type="number"
                                placeholder="e.g. 29"
                                value={personalInfo.age}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-500 ml-1">Phone No</label>
                            <NeoInput
                                type="tel"
                                placeholder="+971 50 123 4567"
                                value={personalInfo.phone}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-500 ml-1">WhatsApp No</label>
                            <NeoInput
                                type="tel"
                                placeholder="+971 50 123 4567"
                                value={personalInfo.whatsapp}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, whatsapp: e.target.value })}
                            />
                        </div>
                    </div>
                </NeoCard>

                {/* 3. Important Dates */}
                <NeoCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="text-orange-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">3. Important Dates</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-500 ml-1">Passport Expiry Date</label>
                            <NeoInput
                                type="date"
                                value={dates.passportExpiry}
                                onChange={(e) => setDates({ ...dates, passportExpiry: e.target.value })}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-500 ml-1">Visa Expiry Date</label>
                                <a
                                    href="https://smartservices.icp.gov.ae/echannels/web/client/default.html#/fileValidity"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                                >
                                    Check Visa Expiry <ArrowLeft className="rotate-135" size={10} />
                                </a>
                            </div>
                            <NeoInput
                                type="date"
                                value={dates.visaExpiry}
                                onChange={(e) => setDates({ ...dates, visaExpiry: e.target.value })}
                            />
                        </div>
                    </div>
                </NeoCard>

                {/* Submission */}
                <div className="pt-6">
                    <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl border border-transparent hover:bg-gray-50 transition-colors">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-red-400'}`}>
                            {agreed && <Check size={14} strokeWidth={3} />}
                        </div>
                        <input type="checkbox" className="hidden" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                        <span className="text-sm text-gray-500 leading-relaxed font-medium">
                            I agree to the <a href="#" className="font-bold text-black hover:underline">Terms & Conditions</a> and <a href="#" className="font-bold text-black hover:underline">Privacy Policy</a>. I confirm that all uploaded documents are valid and the information provided is accurate.
                        </span>
                    </label>

                    <NeoButton
                        size="lg"
                        className="w-full h-16 mt-8 text-lg font-bold shadow-xl shadow-red-500/20"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Application'}
                    </NeoButton>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';

export default function WorldwideVisaApplyPage() {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        passportNumber: '',
        expiryDate: '',
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                // Mock Auto-fill
                setFormData({
                    name: 'John Doe',
                    passportNumber: 'N123456789',
                    expiryDate: '2030-01-01'
                });
            }, 1500);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard'); // Go back to dashboard after sub
        // In real app, show success screen
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <header className="flex items-center gap-4 mb-6">
                <Link href="/services/worldwide-visa/selection">
                    <button className="p-2 rounded-xl neo-shadow active:neo-inset text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                </Link>
                <h1 className="text-xl font-bold text-foreground">Application Details</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Document Upload */}
                <NeoCard className="p-6">
                    <h3 className="font-semibold mb-4">1. Upload Passport</h3>
                    <div className="relative border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer group">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileUpload} />
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            {isUploading ? <Loader2 className="animate-spin text-primary" size={24} /> : <Upload size={24} className="group-hover:text-primary transition-colors" />}
                            <span className="text-xs">Tap to upload passport front</span>
                        </div>
                    </div>
                </NeoCard>

                {/* Personal Details */}
                <NeoCard className="p-6">
                    <h3 className="font-semibold mb-4">2. Applicant Details</h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground ml-1">Full Name</label>
                            <NeoInput
                                required
                                placeholder="As per passport"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground ml-1">Passport Number</label>
                            <NeoInput
                                required
                                placeholder="N1234567"
                                value={formData.passportNumber}
                                onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground ml-1">Expiry Date</label>
                            <NeoInput
                                type="date"
                                required
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>
                    </div>
                </NeoCard>

                <NeoButton size="lg" className="w-full">
                    Submit Application
                </NeoButton>
            </form>
        </div>
    );
}

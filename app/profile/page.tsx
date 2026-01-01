'use client';

import { useAuth } from '@/lib/auth-context';
import { NeumorphicCard } from '@/components/ui/NeumorphicCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { useState } from 'react';
import { User, FileText, Globe, Calendar, CreditCard, Heart, MapPin, Phone, Mail, Camera, QrCode } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    // In a real app, we would fetch the profile data via server action
    // Mocking state for now
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        gender: '',
        dob: '',
        nationality: '',
        maritalStatus: '',
        city: '',
        mobile: user?.phone || '',
        email: user?.email || '',
        passportNumber: '',
        passportExpiry: '',
        passportCountry: ''
    });

    const [secondaryPhone, setSecondaryPhone] = useState('');
    const [showSecondaryPhone, setShowSecondaryPhone] = useState(false);

    // Mock OCR Function
    const handleScanPassport = () => {
        // Simulate scanning delay
        const btn = document.getElementById('scan-btn');
        if (btn) btn.innerText = 'Scanning...';

        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                firstName: 'Ahmed',
                lastName: 'Al-Fulan',
                gender: 'Male',
                dob: '1985-04-12',
                nationality: 'United Arab Emirates',
                passportNumber: 'N12345678',
                passportExpiry: '2030-01-01',
                passportCountry: 'United Arab Emirates'
            }));
            if (btn) btn.innerText = 'Scan Passport';
            alert('Passport Scanned Successfully!');
        }, 1500);
    };

    return (
        <div className="w-full max-w-5xl mx-auto pt-8 pb-32 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-700 mb-2">My Profile</h1>
                    <p className="text-slate-500">Complete your profile to automate application forms.</p>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                        <User size={16} />
                        <span>Profile Completion: 45%</span>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left: ID Card / Photo */}
                <div className="col-span-1 md:col-span-4 space-y-6">
                    <NeumorphicCard className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-slate-800 to-slate-900 opacity-10"></div>

                        <div className="relative mb-4 group cursor-pointer">
                            <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-slate-300 overflow-hidden">
                                {user?.name ? (
                                    <div className="text-4xl font-bold text-slate-400">{user.name.charAt(0)}</div>
                                ) : (
                                    <User size={48} />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-md group-hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </div>
                        </div>

                        <h2 className="font-bold text-slate-800 text-xl">{formData.firstName} {formData.lastName}</h2>
                        <p className="text-slate-500 text-sm mb-6 font-mono">{user?.id ? `ID: ${user.id.substring(0, 8).toUpperCase()}` : 'ID: UNKNOWN'}</p>

                        <div className="w-full space-y-3">
                            <NeoButton onClick={handleScanPassport} id="scan-btn" className="w-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center gap-2">
                                <QrCode size={18} /> Scan Passport
                            </NeoButton>
                            <p className="text-[10px] text-slate-400">
                                Upload or camera scan to autofill details
                            </p>
                        </div>
                    </NeumorphicCard>

                    {/* Contact Info */}
                    <NeumorphicCard className="p-6">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400">Mobile Number</label>
                                <div className="relative">
                                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <NeoInput value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="pl-9 h-10 text-sm" />
                                </div>
                            </div>

                            {showSecondaryPhone ? (
                                <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-xs font-bold text-slate-400">Secondary Mobile</label>
                                    <div className="relative">
                                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <NeoInput value={secondaryPhone} onChange={e => setSecondaryPhone(e.target.value)} className="pl-9 h-10 text-sm" placeholder="050..." />
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setShowSecondaryPhone(true)} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1">
                                    + Add Secondary Number
                                </button>
                            )}

                            <div className="space-y-1 pt-2">
                                <label className="text-xs font-bold text-slate-400">Email Address</label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <NeoInput value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="pl-9 h-10 text-sm" />
                                </div>
                            </div>
                        </div>
                    </NeumorphicCard>
                </div>

                {/* Right: Details Form */}
                <div className="col-span-1 md:col-span-8">
                    <NeumorphicCard className="p-8 h-full">
                        <form className="space-y-8">

                            {/* Personal Details Section */}
                            <div>
                                <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <FileText size={20} className="text-red-500" /> Personal Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                                        <NeoInput value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                                        <NeoInput value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Gender</label>
                                        <div className="relative">
                                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <select
                                                className="w-full h-12 rounded-xl bg-[#EFE6E6] border-none text-slate-700 font-bold px-4 pl-10 shadow-[inset_2px_2px_5px_#d1c5c5,inset_-2px_-2px_5px_#ffffff] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all appearance-none"
                                                value={formData.gender}
                                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Date of Birth</label>
                                        <div className="relative">
                                            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <NeoInput type="date" className="pl-10" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Nationality</label>
                                        <div className="relative">
                                            <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <NeoInput className="pl-10" value={formData.nationality} onChange={e => setFormData({ ...formData, nationality: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Marital Status</label>
                                        <div className="relative">
                                            <Heart size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <select
                                                className="w-full h-12 rounded-xl bg-[#EFE6E6] border-none text-slate-700 font-bold px-4 pl-10 shadow-[inset_2px_2px_5px_#d1c5c5,inset_-2px_-2px_5px_#ffffff] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all appearance-none"
                                                value={formData.maritalStatus}
                                                onChange={e => setFormData({ ...formData, maritalStatus: e.target.value })}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">City of Residence</label>
                                        <div className="relative">
                                            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <NeoInput className="pl-10" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="e.g. Dubai" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Passport Details Section */}
                            <div>
                                <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <CreditCard size={20} className="text-red-500" /> Passport Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Passport Number</label>
                                        <NeoInput value={formData.passportNumber} onChange={e => setFormData({ ...formData, passportNumber: e.target.value })} placeholder="A12345678" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Expiry Date</label>
                                        <div className="relative">
                                            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <NeoInput type="date" className="pl-10" value={formData.passportExpiry} onChange={e => setFormData({ ...formData, passportExpiry: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Issuing Country</label>
                                        <div className="relative">
                                            <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <NeoInput className="pl-10" value={formData.passportCountry} onChange={e => setFormData({ ...formData, passportCountry: e.target.value })} placeholder="United Arab Emirates" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <NeoButton className="px-8 bg-slate-800 text-white hover:bg-slate-700 h-12 w-40">
                                    Save Profile
                                </NeoButton>
                            </div>
                        </form>
                    </NeumorphicCard>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoButton } from '@/components/ui/NeoButton';
import { User, Lock, ArrowRight, ShieldCheck, Phone, Mail, CheckCircle, ChevronRight } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';

type Step = 'contact' | 'password' | 'otp' | 'signup';

export default function SmartLoginPage() {
    const { checkUserStatus, smartLogin, smartRegister } = useAuth();

    // State
    const [step, setStep] = useState<Step>('contact');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Data
    const [identifier, setIdentifier] = useState(''); // Email or Mobile
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    // Signup Data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signupPassword, setSignupPassword] = useState(''); // Optional
    const [showPasswordSet, setShowPasswordSet] = useState(false);

    // Meta
    const [maskedEmail, setMaskedEmail] = useState('');

    const handleCheckUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const status = await checkUserStatus(identifier);

            if (status.status === 'new') {
                setStep('signup');
            } else if (status.status === 'password') {
                setStep('password');
            } else if (status.status === 'otp') {
                setMaskedEmail(status.maskedEmail || identifier);
                setStep('otp');
            } else {
                setError(status.error || 'System Error');
            }
        } catch (err) {
            setError('Connection failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Determine type
        const type = step === 'password' ? 'password' : 'otp';
        const secret = step === 'password' ? password : otp;

        const result = await smartLogin(identifier, secret, type);

        if (!result.success) {
            setError(result.error || 'Login Failed');
            setLoading(false);
        }
        // Success redirects in context
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setError('Name is required');
            return;
        }

        setLoading(true);
        // Infer mobile vs email (rough check)
        const isEmail = identifier.includes('@');

        const data = {
            firstName,
            lastName,
            email: isEmail ? identifier : '', // Prompt for email if mobile used? Req says "all 3 are must".
            mobile: !isEmail ? identifier : '',
            password: signupPassword
        };

        // If identifier was email, we need mobile. If mobile, we need email.
        // For simplicity in this flow, we might need to ask the missing one.
        // Let's check user request: "Only 3 things needed for signup, name ... mobile ... email ... all 3 are must."
        // So checking stage is just "Identifier". Signup stage must allow entering the missing ones.

        // This logic will be handled in the render phase for Signup.
    };

    // Extended Signup Handler (Actual Submission)
    const handleFinalSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            firstName,
            lastName,
            email: identifier.includes('@') ? identifier : (document.getElementById('signup-email') as HTMLInputElement)?.value,
            mobile: !identifier.includes('@') ? identifier : (document.getElementById('signup-mobile') as HTMLInputElement)?.value,
            password: signupPassword
        };

        const result = await smartRegister(data);
        if (!result.success) {
            setError(result.error || 'Signup Failed');
            setLoading(false);
        } else if (result.requiresOtp) {
            // New Flow: Force OTP Verification
            setIdentifier(result.email); // Ensure email is set
            setMaskedEmail(result.email);
            setStep('otp');
            setError(''); // Clear errors
            setLoading(false);
            // Optional: Show a toast or header says "Account created. Please verify."
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 bg-background animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-transparent">

                {/* Left: Branding & Visual */}
                <div className="hidden md:flex flex-col justify-center space-y-8 p-8">
                    <div>
                        <h1 className="mb-8">
                            <img src="/brand/logo-full.png" alt="AllSupport" className="w-[280px] h-auto" />
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            One account for all your government, travel, and business needs.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="neo-raised px-6 py-4 flex items-center gap-3 w-fit rounded-xl">
                            <ShieldCheck className="text-green-500" size={24} />
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Secure Access</p>
                                <p className="font-bold text-gray-700">Bank-Grade Security</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Login Form */}
                <NeoCard className="p-10 md:p-12 w-full max-w-lg mx-auto md:ml-auto transition-all duration-300">

                    {step === 'contact' && (
                        <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h2>
                                <p className="text-gray-500 font-medium">Enter your mobile or email to continue.</p>
                            </div>
                            <form onSubmit={handleCheckUser} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Mobile or Email</label>
                                    <div className="relative group">
                                        {identifier.includes('@') ? <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /> : <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
                                        <NeoInput
                                            type="text"
                                            placeholder="050 123 4567 or email@example.com"
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            required
                                            autoFocus
                                            className="pl-12 h-14 font-medium text-lg"
                                        />
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

                                <NeoButton type="submit" disabled={loading} className="w-full h-14 text-lg font-bold group">
                                    {loading ? 'Checking...' : 'Continue'} <ChevronRight size={20} className="ml-2" />
                                </NeoButton>
                            </form>
                        </div>
                    )}

                    {step === 'password' && (
                        <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                                <p className="text-gray-500 font-medium">Please enter your password.</p>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <NeoInput
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoFocus
                                            className="pl-12 h-14 font-medium text-lg"
                                        />
                                    </div>
                                    <button type="button" onClick={() => { setStep('otp'); setError(''); }} className="text-xs font-bold text-gray-400 hover:text-red-500 text-right w-full block mt-1">
                                        Forgot Password? Login with OTP
                                    </button>
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

                                <NeoButton type="submit" disabled={loading} className="w-full h-14 text-lg font-bold">
                                    {loading ? 'Verifying...' : 'Login'}
                                </NeoButton>
                                <button type="button" onClick={() => setStep('contact')} className="w-full text-center text-sm font-bold text-gray-400 mt-4 hover:text-gray-600">Back</button>
                            </form>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Identity</h2>
                                <p className="text-gray-500 font-medium">
                                    We sent a code to <span className="text-gray-800 font-bold">{maskedEmail || identifier}</span>
                                </p>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">One-Time Password</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <NeoInput
                                            type="text"
                                            placeholder="• • • •"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength={4}
                                            required
                                            autoFocus
                                            className="pl-12 h-14 font-bold text-2xl tracking-[0.5em] text-center"
                                        />
                                    </div>
                                    <p className="text-xs text-center text-gray-400">Magic Code: 1234</p>
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

                                <NeoButton type="submit" disabled={loading} className="w-full h-14 text-lg font-bold">
                                    {loading ? 'Verifying...' : 'Verify & Login'}
                                </NeoButton>
                                <button type="button" onClick={() => setStep('contact')} className="w-full text-center text-sm font-bold text-gray-400 mt-4 hover:text-gray-600">Back</button>
                            </form>
                        </div>
                    )}

                    {step === 'signup' && (
                        <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                                <p className="text-gray-500 font-medium text-sm">Join AllSupport to manage everything in one place.</p>
                            </div>
                            <form onSubmit={handleFinalSignup} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">First Name</label>
                                        <NeoInput value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Last Name</label>
                                        <NeoInput value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Doe" />
                                    </div>
                                </div>

                                {/* Identifier Field (Disabled/Readonly mainly) */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                                        {identifier.includes('@') ? 'Email' : 'Mobile'} (Verified)
                                    </label>
                                    <NeoInput value={identifier} readOnly className="bg-gray-50 text-gray-500" />
                                </div>

                                {/* Missing Field Prompt */}
                                {identifier.includes('@') ? (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Mobile Number</label>
                                        <NeoInput id="signup-mobile" required placeholder="050 123 4567" />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                                        <NeoInput id="signup-email" required placeholder="name@example.com" />
                                    </div>
                                )}

                                {/* Optional Password */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordSet(!showPasswordSet)}
                                        className="text-sm font-bold text-red-500 flex items-center gap-2 mb-2"
                                    >
                                        {showPasswordSet ? 'Remove Password' : '+ Set a Password (Optional)'}
                                    </button>

                                    {showPasswordSet && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                            <NeoInput
                                                type="password"
                                                placeholder="Create a password"
                                                value={signupPassword}
                                                onChange={e => setSignupPassword(e.target.value)}
                                            />
                                            <p className="text-xs text-gray-400 ml-1">We recommend setting a password for easier access.</p>
                                        </div>
                                    )}
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

                                <NeoButton type="submit" disabled={loading} className="w-full h-14 text-lg font-bold mt-4">
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </NeoButton>
                            </form>
                        </div>
                    )}

                </NeoCard>
            </div>
        </main>
    );
}

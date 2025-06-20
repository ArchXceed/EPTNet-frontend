"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import Alert, { AlertHandle } from "@/components/alert";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { gifts, Gift } from "@/globals"
import { Input } from "@/components/ui/input"
import { JSX } from "react"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function GeneralForm(): JSX.Element {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })


    // TODO: Submit form data + Verify response
    const alertRef = useRef<AlertHandle>(null);
    const handleClick = (data: any) => {
        console.log(data);

        alertRef.current?.showAlert();
    };

    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleClick)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="hatsunemiku" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Alert
            ref={alertRef}
            alertTitle="Form Submitted"
            alertDescription="The form data has been sended."
        />
    </>
    )
}

export function EmailNotificationPreferences(): JSX.Element {
    const form = useForm({
        defaultValues: {
            receiveNotifications: false,
            receiveSecurityInfo: false,
        },
    })

    // TODO: Submit form data + Verify response
    const alertRef = useRef<AlertHandle>(null);
    const handleClick = (data: any) => {
        console.log(data);

        alertRef.current?.showAlert();
    };
    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleClick)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="receiveNotifications"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Receive Notifications</FormLabel>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="receiveSecurityInfo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Receive Security Information</FormLabel>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Alert
            ref={alertRef}
            alertTitle="Form Submitted"
            alertDescription="The form data has been sended."
        />
    </>
    )
}

export function ChangePasswordForm(): JSX.Element {
    const form = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })
    // TODO: Submit form data + Verify response
    const alertRef = useRef<AlertHandle>(null);
    const handleClick = (data: any) => {
        console.log(data);

        alertRef.current?.showAlert();
    };

    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleClick)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Alert
            ref={alertRef}
            alertTitle="Form Submitted"
            alertDescription="The form data has been sended."
        />
    </>
    )
}

export function Activate2FAForm(): JSX.Element {
    const form = useForm({
        defaultValues: {
            twoFactorAuth: false,
        },
    })

    // TODO: Submit form data + Verify response
    const alertRef = useRef<AlertHandle>(null);
    const handleClick = (data: any) => {
        console.log(data);

        alertRef.current?.showAlert();
    };
    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleClick)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="twoFactorAuth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Two-Factor Authentication</FormLabel>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Alert
            ref={alertRef}
            alertTitle="Form Submitted"
            alertDescription="The form data has been sended."
        />
    </>
    )
}

export function DeleteAccountForm(): JSX.Element {
    const form = useForm({
        defaultValues: {
            confirmDelete: false,
            confirmDeleteAgain: false,
            confirmDeleteFinal: false,
            confirmDeleteWord: "",
            password: "",
        },
    })

    const alertRef = useRef<AlertHandle>(null);
    const handleClick = (data: any) => {
        console.log(data);
        if (data.confirmDeleteWord !== "ILOVEMIKU") {
            alert("You must enter the correct word.");
            return;
        }
        alertRef.current?.showAlert();
    };

    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleClick)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="confirmDelete"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmez</FormLabel>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.watch("confirmDelete") && (
                    <FormField
                        control={form.control}
                        name="confirmDeleteAgain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Êtes vous sûr?</FormLabel>
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("confirmDelete") && form.watch("confirmDeleteAgain") && (
                    <FormField
                        control={form.control}
                        name="confirmDeleteFinal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>VRAIMENT?</FormLabel>
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} ref={field.ref} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("confirmDelete") && form.watch("confirmDeleteAgain") && form.watch("confirmDeleteFinal") && (
                    <FormField
                        control={form.control}
                        name="confirmDeleteWord"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Entrez "ILOVEMIKU"</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("confirmDelete") && form.watch("confirmDeleteAgain") && form.watch("confirmDeleteFinal") && form.watch("confirmDeleteWord") === "ILOVEMIKU" && (
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Alert
            ref={alertRef}
            alertTitle="Form Submitted"
            alertDescription="The form data has been sended."
        />
    </>
    )
}

export function Logout(): JSX.Element {
    return (
        <div>
            <Button onClick={() => {
                console.log("Logout");
                // TODO: logout
            }
            }>Logout</Button>
        </div>
    );
}

export function GetAIPoints(): number {
    return 3; // Hardcoded for now
}
export function GetAccountCard(props: { username?: string; points?: number; rank?: number; role?: string } = { username: "hatsunemiku", points: 50, rank: 5.0, role: "User" }): JSX.Element {
    const username = props.username || "No Username";
    const points = props.points || 0;
    const rank = props.rank || 0;
    const role = props.role || "User";

    return (
        <div className="relative w-full max-w-sm rounded-2xl border border-blue-500 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-blue-500/50">
            <div className="absolute right-4 top-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                {role}
            </div>
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0f172a] text-xl font-bold text-white">
                        {username[0].toUpperCase()}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">{username}</h2>
                    <p className="text-sm text-blue-400">Rank: {rank.toFixed(1)}</p>
                </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-white">
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold">{points}</span>
                    <span className="text-blue-400">Points</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold">Level {Math.floor(rank)}</span>
                    <span className="text-blue-400">Tier</span>
                </div>
            </div>
        </div>
    );
}


export function Roulette(): JSX.Element {
    const giftWinnedId = 1; // Hardcoded for now
    const [spinning, setSpinning] = useState(false);
    const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
    const rouletteRef = useRef<HTMLDivElement>(null);

    const handleSpin = () => {
        if (spinning) return;
        setSpinning(true);
        const selected = gifts.find(g => g.id === giftWinnedId);
        setSelectedGift(selected || null);

        if (rouletteRef.current) {
            rouletteRef.current.style.transition = "transform 3s ease-out";
            const rotations = 5; // Full spins before stopping
            const anglePerItem = 360 / gifts.length;
            const stopAngle = (gifts.findIndex(g => g.id === giftWinnedId) * anglePerItem) + (anglePerItem / 2);
            const totalRotation = (rotations * 360) + stopAngle;
            rouletteRef.current.style.transform = `rotate(${totalRotation}deg)`;

            setTimeout(() => {
                setSpinning(false);
            }, 3000);
        }
    };



    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-64 h-64 border-4 border-muted rounded-full overflow-visible">
                <div ref={rouletteRef} className="absolute w-full h-full transition-transform">
                    {gifts.map((gift, index) => {
                        const angle = (360 / gifts.length) * index;
                        return (
                            <div
                                key={gift.id}
                                className="absolute w-1/2 h-1/2 origin-bottom top-0 text-xs text-center"
                                style={{ transform: `rotate(${angle}deg) translateX(-50%)`, left: "25%" }}
                            >
                                <img src={gift.image} alt={gift.title} className="w-8 h-8 mx-auto rounded-full" />
                                <span>{gift.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                onClick={handleSpin}
                disabled={spinning}
                className="px-4 py-2 rounded disabled:opacity-50"
            >
                {spinning ? "Spinning..." : "Spin Roulette"}
            </button>

            {selectedGift && !spinning && (
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold">Vous avez gagné: {selectedGift.title}!</h2>
                    <p>{selectedGift.description}</p>
                    <img src={selectedGift.image} alt={selectedGift.title} className="w-24 h-24 mx-auto mt-2 rounded" />
                </div>
            )}
        </div>
    );
}

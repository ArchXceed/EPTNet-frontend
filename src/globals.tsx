import { JSX } from "react";
import { ChangePasswordForm, GeneralForm, EmailNotificationPreferences, Activate2FAForm, DeleteAccountForm, Logout, GetAIPoints, GetAccountCard, Roulette } from "@/components/dashboard-forms";

export type Gift = {
    title: string;
    description: string;
    image: string;
    id: number;
};

export const gifts: Gift[] = [
    {
        title: "Publicité Gratuite",
        description: "Une publicité gratuite à afficher sur la page d'accueil du site.",
        image: "/megaphone.png",
        id: 1
    },
    {
        title: "Scrollcode en avant",
        description: "Mettez en avant un scrollcode sur le site pour plus de visibilité.",
        image: "/code.jpg",
        id: 3
    },
    {
        title: "Rien",
        description: "Pas de cadeau cette fois... Peut-être la prochaine !",
        image: "/question_mark.jpg",
        id: 4
    },
];

type Page = {
    href: string;
    title: string;
    description: string;
};

type Pages = {
    userPages: Page[];
    adminPages: Page[];
    visitorsPages: Page[];
    networkPages: Page[];
};

export const pages: Pages = {
    userPages: [
        { href: "/dashboard", title: "Profil", description: "Regarder/Éditer votre profil." },
        { href: "/badges", title: "Badges", description: "Gérer les badges." },
        { href: "/emoji", title: "Gérer les Emojis", description: "Gérer les emojis." },
        { href: "/follow", title: "Aboonés/Abonnements", description: "Gérer vos abonnés/abonnements." },
        { href: "/messages", title: "Messages", description: "Envoyer et recevoir des messages." },
    ],
    adminPages: [
        { href: "/admin/roles", title: "Gérer les rôles", description: "Gérer les rôles d'utilisateurs." },
        { href: "/admin/accounts", title: "Gérer les comptes", description: "Gérer les comptes utilisateurs." },
    ],
    visitorsPages: [
        { href: "/login", title: "Connexion", description: "Accéder à votre compte." },
        { href: "/register", title: "Inscription", description: "Créez un compte." },
        { href: "/password-recovery", title: "Mot de passe oublié", description: "Récupérez votre compte." },
    ],
    networkPages: [
        { href: "/scrollcode", title: "Scrollcode", description: "ScrollCode." },
        { href: "/jokescroll", title: "Jokescroll", description: "Parcourir Jokescroll." },
        { href: "/homework", title: "Partage de devoirs", description: "Trouvez les devoirs de votre cours." },
        { href: "/post/", title: "Poster", description: "Poster quelque chose." },
    ],
};

export type SidebarItem = {
    title: string;
    renderedContent: JSX.Element;
    icon: JSX.Element;
};

export type SidebarCategory = {
    title: string;
    items: SidebarItem[];
};

export type SidebarItems = SidebarCategory[];

export const sidebarItems: SidebarItems = [
    {
        title: "Paramètre du compte",
        items: [
            {
                title: "Informations Générales",
                renderedContent: <GeneralForm />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
            {
                title: "Préférences d'Email",
                renderedContent: <EmailNotificationPreferences />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
            {
                title: "Mot de passe",
                renderedContent: <ChangePasswordForm />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
        ]
    },
    {
        title: "Sécurité et Confidentialité",
        items: [
            {
                title: "Sécurité",
                renderedContent: <Activate2FAForm />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
            {
                title: "Confidentialité",
                renderedContent: <div><a className="underline" href="/ldp">LPD PDF Document</a></div>,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
        ]
    },
    {
        title: "Account Management",
        items: [
            {
                title: "Supprimez votre compte",
                renderedContent: <DeleteAccountForm />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
            {
                title: "Logout",
                renderedContent: <Logout />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            }
        ]
    },
    {
        title: "Usage",
        items: [
            {
                title: "Points AI",
                renderedContent: <div>Points AI restant: {GetAIPoints()}</div>,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
        ]
    },
    {
        title: "Rank et Points",
        items: [
            {
                title: "Carte du compte",
                renderedContent: <div>Carte de votre compte: <GetAccountCard /></div>,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
            {
                title: "Roullete",
                renderedContent: <Roulette />,
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>,
            },
        ]
    }
];
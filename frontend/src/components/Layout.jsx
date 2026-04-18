import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import InquirySheet from "./InquirySheet";
import { Toaster } from "sonner";

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-parchment">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
            <InquirySheet />
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#120F0E",
                        color: "#F9F6F0",
                        border: "1px solid #ECA81D",
                    },
                }}
            />
        </div>
    );
};

export default Layout;

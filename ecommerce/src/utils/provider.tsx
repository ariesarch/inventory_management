'use client'
import { FC, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@/contexts/modal.context";
import ManagedModal from "@/components/molecules/modals/managed-modal";
import { UIProvider } from "@/contexts/ui.context";
import { CartProvider } from "@/contexts/cart.context";
interface ClientProviderProps {
    children: ReactNode;
}

const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
    const [client] = useState<QueryClient>(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            <UIProvider>
                <CartProvider>
                    <ModalProvider>
                        <ManagedModal />
                        {children}
                    </ModalProvider>
                </CartProvider>
            </UIProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default ClientProvider;
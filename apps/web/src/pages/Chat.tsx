
import { Sidebar } from "@/components/ui/sidebar";
import ChatArea from "@/components/Chat/ChatArea";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export default function Chat() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          {/* Sidebar Header */}
          <Link to="/">
            <div className="flex h-14 items-center border-b ml-8 mt-1 px-4 cursor-pointer hover:bg-muted transition-colors rounded-md">
              <h2 className="text-lg font-semibold">Nyaya.Ai</h2>
            </div>
          </Link>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto p-4">
            {/* Add your sidebar content here */}
            {/* <div className="space-y-2">
              <div className="rounded-md bg-muted p-2">Recent Chats</div>
              <div className="rounded-md bg-muted p-2">Settings</div>
            </div> */}
          </div>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <div className="text-sm text-muted-foreground">©2026 Nyaya.Ai</div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <main className="relative flex-1 w-full">
          <div className="absolute top-4 left-4 z-10">
            <SidebarTrigger />
          </div>
          <ChatArea />
        </main>
      </div>
    </SidebarProvider>
  );
}

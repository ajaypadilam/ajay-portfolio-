"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/Card";
import { ArrowDown, Database, Layout, Settings, Layers, Zap, WifiOff, RefreshCw, Cloud } from "lucide-react";

export function Architecture() {
  return (
    <section id="architecture" className="py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Architecture & Technical Expertise" 
          description="My preferred approach to building robust, scalable, and offline-capable Android applications."
        />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">MVVM & MVI Architecture Flow</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              I specialize in implementing robust MVVM and MVI architectures, providing a unidirectional data flow that makes state management predictable and applications easier to test and debug.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 mt-1">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Predictable State</h4>
                  <p className="text-muted-foreground">UI state is immutable and represents the single source of truth for the View at any given time.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 mt-1">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Unidirectional Data Flow</h4>
                  <p className="text-muted-foreground">User intents flow in one direction, producing a new state, eliminating race conditions.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 mt-1">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">MVVM Separation</h4>
                  <p className="text-muted-foreground">Cleanly separate business logic (ViewModel) from UI logic (View) using StateFlow, enabling highly testable and robust code.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Card className="border-2 border-primary/20 shadow-xl bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-sm p-4 bg-primary/10 border border-primary/30 rounded-xl text-center shadow-sm">
                    <span className="font-bold text-lg flex items-center justify-center gap-2">
                      <Layout className="w-5 h-5" /> User Action
                    </span>
                  </div>
                  <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
                  <div className="w-full max-w-sm p-4 bg-secondary border border-secondary-foreground/20 rounded-xl text-center shadow-sm">
                    <span className="font-semibold">Intent</span>
                  </div>
                  <ArrowDown className="w-6 h-6 text-muted-foreground" />
                  <div className="w-full max-w-sm p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center shadow-sm">
                    <span className="font-bold text-lg flex items-center justify-center gap-2">
                      <Settings className="w-5 h-5" /> ViewModel / State Handler
                    </span>
                  </div>
                  <ArrowDown className="w-6 h-6 text-muted-foreground" />
                  <div className="w-full max-w-sm p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center shadow-sm">
                    <span className="font-bold text-lg">State</span>
                  </div>
                  <ArrowDown className="w-6 h-6 text-primary" />
                  <div className="w-full max-w-sm p-4 bg-primary text-primary-foreground rounded-xl text-center shadow-md">
                    <span className="font-bold text-lg flex items-center justify-center gap-2">
                      <Layout className="w-5 h-5" /> Compose UI
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Offline-First Strategy Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <Card className="border-2 border-primary/20 shadow-xl bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex w-full justify-between items-center bg-secondary/50 p-4 rounded-xl border border-border">
                    <div className="flex items-center gap-2 font-semibold">
                      <Layout className="w-5 h-5 text-primary" /> UI Layer
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">Observes Flow</div>
                  </div>
                  <ArrowDown className="w-6 h-6 text-muted-foreground" />
                  <div className="w-full p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center shadow-sm">
                    <span className="font-bold flex items-center justify-center gap-2">
                      <Database className="w-5 h-5" /> Room DB (Local Source of Truth)
                    </span>
                  </div>
                  <div className="flex w-full justify-center gap-4 py-2">
                    <ArrowDown className="w-6 h-6 text-muted-foreground" />
                    <ArrowDown className="w-6 h-6 text-muted-foreground rotate-180" />
                  </div>
                  <div className="w-full p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center shadow-sm flex flex-col items-center">
                    <span className="font-bold flex items-center justify-center gap-2 mb-2">
                      <RefreshCw className="w-5 h-5" /> WorkManager Sync Service
                    </span>
                    <span className="text-xs text-muted-foreground">Handles background sync & conflict resolution</span>
                  </div>
                  <div className="flex w-full justify-center gap-4 py-2">
                    <ArrowDown className="w-6 h-6 text-muted-foreground" />
                    <ArrowDown className="w-6 h-6 text-muted-foreground rotate-180" />
                  </div>
                  <div className="w-full p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center shadow-sm">
                    <span className="font-bold flex items-center justify-center gap-2">
                      <Cloud className="w-5 h-5" /> Remote API / Backend
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl font-bold mb-6">Offline-First Sync Strategy</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              For complex POS and field-force applications, network reliability is not guaranteed. I design architectures that treat local storage as the single source of truth, ensuring the app remains 100% functional without an internet connection.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 mt-1">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Zero-Downtime Operations</h4>
                  <p className="text-muted-foreground">Cashiers and field agents can continue processing transactions and printing receipts via ESC/POS completely offline.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 mt-1">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Local Source of Truth (Room DB)</h4>
                  <p className="text-muted-foreground">All UI interactions read directly from and write to a local Room database, ensuring instant responsiveness via Kotlin Flow.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4 mt-1">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Background Sync (WorkManager)</h4>
                  <p className="text-muted-foreground">WorkManager silently synchronizes local changes with the backend APIs in the background, handling retries and data conflict resolution automatically.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

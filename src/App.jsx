import React, { useState, useEffect } from "react";
import {
  Play,
  Code,
  Globe,
  Database,
  ArrowRight,
  Shield,
  Lock,
} from "lucide-react";
import "./App.css";

import { OverviewSection } from "./components/Overview.jsx";
import { CreationSection } from "./components/APICreation.jsx";
import { IntegrationSection } from "./components/Integration.jsx";
import { CorsSection } from "./components/CORSandAuth.jsx";
import { SecuritySection } from "./components/JWTandSecurity.jsx";
import { PracticeSection } from "./components/APITesting.jsx";
import CodeBlock from "./components/CodeBlock.jsx";

const APILearningHub = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Database className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">
              API Learning Hub
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <TabButton id="overview" label="Overview" icon={Globe} />
          <TabButton id="creation" label="API Creation" icon={Code} />
          <TabButton id="integration" label="Integration" icon={ArrowRight} />
          <TabButton id="security" label="JWT & Security" icon={Shield} />
          <TabButton id="cors" label="CORS & Auth" icon={Lock} />
          <TabButton id="practice" label="API Testing" icon={Play} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "creation" && <CreationSection />}
          {activeTab === "integration" && <IntegrationSection />}
          {activeTab === "security" && <SecuritySection />}
          {activeTab === "cors" && <CorsSection />}
          {activeTab === "practice" && <PracticeSection />}
        </div>
      </div>
    </div>
  );
};

export default APILearningHub;

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  LogOut,
  Users,
  Eye as PageViewsIcon,
  Globe,
  Compass,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  MapPin,
  Laptop,
} from "lucide-react";

interface VisitorLogItem {
  id: string;
  ip_address: string;
  country: string | null;
  city: string | null;
  timezone: string | null;
  user_agent: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  path_visited: string;
  visit_count: number;
  first_visited_at: string;
  last_visited_at: string;
}

interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  topCountries: { country: string; count: number }[];
  topPaths: { path: string; count: number }[];
}

export default function AdminVisitorsPage() {
  // Auth state
  const [authStatus, setAuthStatus] = useState<"loading" | "unauthenticated" | "authenticated">("loading");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Data state
  const [visitors, setVisitors] = useState<VisitorLogItem[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    topCountries: [],
    topPaths: [],
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  // Filters & sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"last_visited_at" | "visit_count">("last_visited_at");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Check initial session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthStatus("authenticated");
            fetchData();
            return;
          }
        }
      } catch {
        // Unauthenticated fallback
      }
      setAuthStatus("unauthenticated");
    }
    checkAuth();
  }, []);

  // Fetch visitor data
  const fetchData = useCallback(async () => {
    setDataLoading(true);
    try {
      const res = await fetch(`/api/admin/visitors?sortBy=${sortBy}&sortOrder=${sortOrder}`, {
        cache: "no-store",
      });

      if (res.status === 401) {
        setAuthStatus("unauthenticated");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setVisitors(data.visitors || []);
          setStats(data.stats || {
            totalVisits: 0,
            uniqueVisitors: 0,
            topCountries: [],
            topPaths: [],
          });
          setLastRefreshed(new Date());
        }
      }
    } catch (err) {
      console.error("Failed to load visitor logs:", err);
    } finally {
      setDataLoading(false);
    }
  }, [sortBy, sortOrder]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setLoginError("Please enter the password");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAuthStatus("authenticated");
        setPassword("");
        fetchData();
      } else {
        setLoginError(data.error || "Incorrect password. Please try again.");
      }
    } catch {
      setLoginError("Connection failed. Please check network and try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // Ignore error
    }
    setAuthStatus("unauthenticated");
    setVisitors([]);
  };

  // Filter and sort visitors
  const filteredVisitors = useMemo(() => {
    return visitors.filter((item) => {
      // Device filter
      if (selectedDevice !== "ALL") {
        if ((item.device_type || "").toLowerCase() !== selectedDevice.toLowerCase()) {
          return false;
        }
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const ip = (item.ip_address || "").toLowerCase();
      const country = (item.country || "").toLowerCase();
      const city = (item.city || "").toLowerCase();
      const path = (item.path_visited || "").toLowerCase();
      const browser = (item.browser || "").toLowerCase();
      const os = (item.os || "").toLowerCase();

      return (
        ip.includes(q) ||
        country.includes(q) ||
        city.includes(q) ||
        path.includes(q) ||
        browser.includes(q) ||
        os.includes(q)
      );
    });
  }, [visitors, selectedDevice, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredVisitors.length === 0) return;

    const headers = [
      "IP Address",
      "Country",
      "City",
      "Timezone",
      "Device",
      "OS",
      "Browser",
      "Page Visited",
      "Visit Count",
      "First Visited",
      "Last Visited",
    ];

    const rows = filteredVisitors.map((v) => [
      `"${v.ip_address}"`,
      `"${v.country || "Unknown"}"`,
      `"${v.city || "Unknown"}"`,
      `"${v.timezone || "Unknown"}"`,
      `"${v.device_type || "Desktop"}"`,
      `"${v.os || "Unknown"}"`,
      `"${v.browser || "Unknown"}"`,
      `"${v.path_visited}"`,
      v.visit_count,
      `"${new Date(v.first_visited_at).toLocaleString()}"`,
      `"${new Date(v.last_visited_at).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `taj_al_rahmah_visitors_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHours = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSec < 30) return "Just now";
      if (diffSec < 60) return `${diffSec}s ago`;
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 30) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  // Device icon helper
  const getDeviceIcon = (deviceType: string | null) => {
    const d = (deviceType || "").toLowerCase();
    if (d === "mobile") return <Smartphone className="w-4 h-4 text-emerald-400" />;
    if (d === "tablet") return <Tablet className="w-4 h-4 text-amber-400" />;
    return <Monitor className="w-4 h-4 text-sky-400" />;
  };

  // 1. Loading Initial Screen
  if (authStatus === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium tracking-wide">Initializing secure session...</p>
      </div>
    );
  }

  // 2. Lockscreen Modal (Unauthenticated)
  if (authStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-sm text-slate-400 mt-1">
              Enter dashboard key to view visitor analytics
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Dashboard Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError("");
                  }}
                  placeholder="••••••••••••"
                  autoFocus
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <div className="flex items-center gap-2 mt-2 text-rose-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 rounded-xl transition duration-200 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Key...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Server-Side Session Auth</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard UI
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                TA
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Visitor Intelligence
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Tracking
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Taj Al Rahmah • Traffic analytics & visitor breakdown
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {lastRefreshed && (
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Updated {lastRefreshed.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={() => fetchData()}
              disabled={dataLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition border border-slate-700/60 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? "animate-spin text-emerald-400" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleExportCSV}
              disabled={filteredVisitors.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition shadow-sm shadow-emerald-600/30 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition border border-rose-500/20 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </header>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Visits */}
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Visits
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <PageViewsIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {stats.totalVisits.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-400 font-medium">Hits Recorded</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Aggregated page loads across all routes</p>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Unique Visitors
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {stats.uniqueVisitors.toLocaleString()}
              </span>
              <span className="text-xs text-sky-400 font-medium">Distinct IPs</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {stats.totalVisits > 0 && stats.uniqueVisitors > 0
                ? `${(stats.totalVisits / stats.uniqueVisitors).toFixed(1)} avg visits per user`
                : "Awaiting visitor hits"}
            </p>
          </div>

          {/* Card 3: Top Countries */}
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Top Countries
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {stats.topCountries.length > 0 ? (
                stats.topCountries.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate max-w-[130px]">
                      {item.country || "Unknown"}
                    </span>
                    <span className="text-amber-400 font-semibold">{item.count} hits</span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-slate-500">No geo data yet</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {stats.topCountries.length} territories identified
            </p>
          </div>

          {/* Card 4: Most Visited Paths */}
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Top Visited Paths
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {stats.topPaths.length > 0 ? (
                stats.topPaths.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-mono truncate max-w-[130px]">
                      {item.path}
                    </span>
                    <span className="text-purple-400 font-semibold">{item.count} visits</span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-slate-500">No paths yet</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {stats.topPaths.length} active routes tracked
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IP, Country, City, or Path..."
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Controls: Device Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Device tabs */}
            <div className="inline-flex rounded-xl bg-slate-950/80 p-1 border border-slate-800 text-xs">
              {(["ALL", "Desktop", "Mobile", "Tablet"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDevice(d)}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                    selectedDevice === d
                      ? "bg-emerald-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "last_visited_at" | "visit_count")}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="last_visited_at">Last Visited</option>
                <option value="visit_count">Visit Count</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
                title={`Order: ${sortOrder.toUpperCase()}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Visitors Table Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">Active Visitor Log</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {filteredVisitors.length} of {visitors.length} entries
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Visitor / IP</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Device & Browser</th>
                  <th className="py-3.5 px-4">Timezone</th>
                  <th className="py-3.5 px-4">Last Visited Path</th>
                  <th className="py-3.5 px-4 text-center">Visits</th>
                  <th className="py-3.5 px-4">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-slate-800/30 transition-colors duration-150 group"
                    >
                      {/* IP Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-400 font-medium">
                            {v.ip_address}
                          </span>
                          {v.country === "Local Network" && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                              Local
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Location Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-medium text-white">{v.country || "Unknown"}</span>
                          {v.city && v.city !== "Unknown" && (
                            <span className="text-slate-500">({v.city})</span>
                          )}
                        </div>
                      </td>

                      {/* Device & Browser Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(v.device_type)}
                          <div className="flex flex-col">
                            <span className="text-white font-medium">
                              {v.os || "Unknown"} • {v.browser || "Unknown"}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {v.device_type || "Desktop"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Timezone */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {v.timezone || "Unknown"}
                      </td>

                      {/* Last Visited Path */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 font-mono text-emerald-300 text-[11px] border border-slate-800 group-hover:border-slate-700 transition">
                          {v.path_visited}
                        </span>
                      </td>

                      {/* Visit Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            v.visit_count > 10
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : v.visit_count > 3
                              ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {v.visit_count}
                        </span>
                      </td>

                      {/* Last Seen */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {formatRelativeTime(v.last_visited_at)}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(v.last_visited_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="w-8 h-8 text-slate-600" />
                        <p className="text-sm font-medium">No visitor logs found</p>
                        <p className="text-xs text-slate-600">
                          {searchQuery
                            ? "Try refining your search filter criteria"
                            : "New visits to the website will automatically appear here"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info note */}
        <footer className="text-center text-xs text-slate-600 pt-4 pb-8">
          Taj Al Rahmah • Protected Visitor Intelligence Portal • All rights reserved
        </footer>
      </div>
    </div>
  );
}

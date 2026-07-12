"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SchoolCharts({ data }) {
  const percentile = data?.percentile || [];
  const quota = data?.quota || [];
  if (!percentile.length && !quota.length) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[#042352]">
        <span>📊</span> Yıllara Göre Grafikler
      </h2>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {percentile.length > 0 && (
          <div className="rounded-xl border border-[#D6DFEC] bg-[#F2F4F9] p-4">
            <p className="mb-3 text-center text-xs font-medium text-gray-700">
              Yüzdelik Dilim
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={percentile}>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2B6FD6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2B6FD6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2B6FD6"
                  strokeWidth={2.5}
                  fill="url(#blueGradient)"
                  dot={{ fill: "#2B6FD6", r: 4, strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {quota.length > 0 && (
          <div className="rounded-xl border border-[#D6DFEC] bg-[#F2F4F9] p-4">
            <p className="mb-3 text-center text-xs font-medium text-gray-700">
              Kontenjan
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={quota}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                <Bar dataKey="value" fill="#2B6FD6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

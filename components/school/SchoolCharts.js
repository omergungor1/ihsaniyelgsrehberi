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
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[#1b6e3f]">
        <span>📊</span> Yıllara Göre Grafikler
      </h2>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#e8efe9] bg-[#f7fbf9] p-4">
          <p className="mb-3 text-center text-xs font-medium text-gray-700">
            Yüzdelik Dilim (2020-2025)
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={data.percentile}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d8e6c" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2d8e6c" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2d8e6c"
                strokeWidth={2.5}
                fill="url(#greenGradient)"
                dot={{ fill: "#2d8e6c", r: 4, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-[#e8efe9] bg-[#f7fbf9] p-4">
          <p className="mb-3 text-center text-xs font-medium text-gray-700">
            Kontenjan (2020-2025)
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={data.quota}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#2d8e6c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#e8efe9] bg-[#f7fbf9] p-4">
        <p className="mb-3 text-center text-xs font-medium text-gray-700">
          Yurttan Gönderdiğimiz Öğrenci Adedi
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data.students}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

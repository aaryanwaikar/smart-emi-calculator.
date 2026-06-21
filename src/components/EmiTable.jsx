import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CalendarRange, Table2 } from 'lucide-react';

export default function EmiTable({ schedule }) {
  const [viewMode, setViewMode] = useState('yearly'); // 'yearly' | 'monthly'
  const [expandedYear, setExpandedYear] = useState(null);

  // Currency Formatter (Indian Rupees)
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  if (!schedule || schedule.length === 0) return null;

  // Aggregate monthly schedule into yearly data
  const yearlySchedule = [];
  let currentYear = 1;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let yearStartBalance = schedule[0].beginningBalance;
  let yearMonths = [];

  schedule.forEach((month, index) => {
    yearPrincipal += month.principalPaid;
    yearInterest += month.interestPaid;
    yearMonths.push(month);

    // Push year summary every 12 months or at the end of the schedule
    if ((index + 1) % 12 === 0 || index === schedule.length - 1) {
      yearlySchedule.push({
        year: currentYear,
        beginningBalance: yearStartBalance,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        endingBalance: month.endingBalance,
        months: [...yearMonths]
      });

      // Reset for next year
      currentYear += 1;
      yearPrincipal = 0;
      yearInterest = 0;
      if (index < schedule.length - 1) {
        yearStartBalance = schedule[index + 1].beginningBalance;
      }
      yearMonths = [];
    }
  });

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] mt-8 animate-slide-up select-none">
      
      {/* HEADER SECTION WITH MODE TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Table2 className="w-5 h-5 text-indigo-400" />
            Amortization Schedule
          </h2>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">
            Detailed breakdown of principal and interest payments over the loan tenure
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-slate-950/80 p-0.5 rounded-lg border border-slate-800/80 self-start sm:self-center">
          <button
            onClick={() => setViewMode('yearly')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 cursor-pointer ${
              viewMode === 'yearly'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarRange className="w-3.5 h-3.5" />
            Yearly view
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 cursor-pointer ${
              viewMode === 'monthly'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table2 className="w-3.5 h-3.5" />
            Monthly view
          </button>
        </div>
      </div>

      {/* TABLE ELEMENT */}
      <div className="overflow-hidden border border-slate-800/80 rounded-xl bg-slate-950/20">
        
        {/* YEARLY VIEW */}
        {viewMode === 'yearly' && (
          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-slate-950/60 border-b border-slate-850 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right select-none">
              <span className="text-left">Year</span>
              <span>Beg. Balance</span>
              <span>Principal</span>
              <span>Interest</span>
              <span>End. Balance</span>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-800/60 max-h-[500px] overflow-y-auto">
              {yearlySchedule.map((yearItem) => (
                <div key={yearItem.year} className="flex flex-col">
                  {/* Parent Row */}
                  <div
                    onClick={() => toggleYear(yearItem.year)}
                    className={`grid grid-cols-5 px-4 py-3.5 text-xs font-semibold text-right text-slate-300 hover:bg-slate-800/20 active:bg-slate-850/10 cursor-pointer transition-colors duration-150 items-center ${
                      expandedYear === yearItem.year ? 'bg-indigo-950/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-left text-slate-100 font-bold">
                      {expandedYear === yearItem.year ? (
                        <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span>Year {yearItem.year}</span>
                    </div>
                    <span>{formatINR(yearItem.beginningBalance)}</span>
                    <span className="text-indigo-400">{formatINR(yearItem.principalPaid)}</span>
                    <span className="text-violet-400">{formatINR(yearItem.interestPaid)}</span>
                    <span className="text-slate-100 font-bold">{formatINR(yearItem.endingBalance)}</span>
                  </div>

                  {/* Child Accordion (Months inside this year) */}
                  {expandedYear === yearItem.year && (
                    <div className="bg-slate-950/40 border-y border-slate-800/80 px-4 py-2 transition-all duration-300">
                      <div className="grid grid-cols-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right pb-1.5 pt-1 border-b border-slate-900">
                        <span className="text-left pl-6">Month</span>
                        <span>Beg. Balance</span>
                        <span>Principal</span>
                        <span>Interest</span>
                        <span>End. Balance</span>
                      </div>
                      <div className="divide-y divide-slate-900/40">
                        {yearItem.months.map((month) => (
                          <div
                            key={month.month}
                            className="grid grid-cols-5 py-2.5 text-[11px] font-medium text-right text-slate-400 items-center hover:bg-slate-900/20"
                          >
                            <span className="text-left pl-6 font-bold text-slate-300">Month {month.month}</span>
                            <span>{formatINR(month.beginningBalance)}</span>
                            <span>{formatINR(month.principalPaid)}</span>
                            <span>{formatINR(month.interestPaid)}</span>
                            <span className="text-slate-300 font-semibold">{formatINR(month.endingBalance)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MONTHLY VIEW (SCROLLABLE LIST) */}
        {viewMode === 'monthly' && (
          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-slate-950/60 border-b border-slate-850 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">
              <span className="text-left">Month</span>
              <span>Beg. Balance</span>
              <span>Principal</span>
              <span>Interest</span>
              <span>End. Balance</span>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-800/60 max-h-[500px] overflow-y-auto">
              {schedule.map((month) => (
                <div
                  key={month.month}
                  className="grid grid-cols-5 px-4 py-3 text-xs font-semibold text-right text-slate-300 hover:bg-slate-800/10 transition-colors"
                >
                  <span className="text-left text-slate-100 font-bold">Month {month.month}</span>
                  <span>{formatINR(month.beginningBalance)}</span>
                  <span className="text-indigo-400">{formatINR(month.principalPaid)}</span>
                  <span className="text-violet-400">{formatINR(month.interestPaid)}</span>
                  <span className="text-slate-100 font-bold">{formatINR(month.endingBalance)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

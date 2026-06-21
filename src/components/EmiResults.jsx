import { PiggyBank, Receipt, Wallet } from 'lucide-react';
export default function EmiResults({
  loanAmount,
  emi,
  totalInterest,
  totalAmount
}) {
  // Safe calculations for percentages
  const safeTotalAmount = totalAmount || 1;
  const principalPercentage = Math.round((loanAmount / safeTotalAmount) * 100) || 0;
  const interestPercentage = 100 - principalPercentage;

  // SVG Donut Chart Configuration
  const radius = 36;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // ~226.19
  
  // The interest slice is drawn on top of the principal base circle
  const interestStrokeOffset = circumference - (interestPercentage / 100) * circumference;

  // Currency Formatter (Indian Rupees)
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col gap-8 animate-slide-up">
      
      {/* SECTION HEADER */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">Loan Summary</h2>
        <p className="text-slate-400 text-xs mt-0.5 font-medium">Detailed financial breakups and visualization</p>
      </div>

      {/* MONTHLY EMI DISPLAY CARD (HERO CARD) */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(99,102,241,0.15)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.25)] transition-all duration-300">
        
        {/* Ambient background glow */}
        <div className="absolute -inset-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Monthly EMI</span>
        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {formatINR(emi)}
        </div>
        <p className="text-slate-400 text-[10px] mt-2 font-medium">Equated Monthly Installment payable</p>
      </div>

      {/* DETAILED STATS (2x2 GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Total Interest Card */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 flex items-start gap-3">
          <div className="p-2.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-lg">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-0.5">Total Interest</span>
            <span className="text-base font-bold text-slate-100">{formatINR(totalInterest)}</span>
            <span className="text-[10px] text-violet-400 font-bold block mt-1">{interestPercentage}% of total</span>
          </div>
        </div>

        {/* Total Principal Card */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 flex items-start gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-0.5">Total Principal</span>
            <span className="text-base font-bold text-slate-100">{formatINR(loanAmount)}</span>
            <span className="text-[10px] text-indigo-400 font-bold block mt-1">{principalPercentage}% of total</span>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 sm:col-span-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-0.5">Total Amount Payable</span>
              <span className="text-[10px] text-slate-500 font-medium">Principal + Interest</span>
            </div>
          </div>
          <span className="text-lg font-bold text-emerald-400">{formatINR(totalAmount)}</span>
        </div>

      </div>

      {/* SVG DONUT CHART VISUALIZATION */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-slate-950/30 border border-slate-800/40 rounded-2xl p-6">
        
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background / Principal Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-indigo-500"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Foreground / Interest Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-violet-500 transition-all duration-500 ease-out"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={interestStrokeOffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Percentage */}
          <div className="absolute flex flex-col items-center justify-center text-center select-none">
            <span className="text-2xl font-extrabold text-white">{interestPercentage}%</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Interest</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
            <div>
              <span className="text-xs font-semibold text-slate-300 block leading-none">Principal Amount</span>
              <span className="text-[10px] text-slate-500 mt-1 block font-bold uppercase">{principalPercentage}% • {formatINR(loanAmount)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded bg-violet-500 shadow-[0_0_8px_rgba(167,139,250,0.5)]"></div>
            <div>
              <span className="text-xs font-semibold text-slate-300 block leading-none">Interest Payable</span>
              <span className="text-[10px] text-slate-500 mt-1 block font-bold uppercase">{interestPercentage}% • {formatINR(totalInterest)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

import { IndianRupee, RefreshCw } from 'lucide-react';
export default function EmiForm({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  loanTenure,
  setLoanTenure,
  tenureType,
  setTenureType,
  onReset
}) {
  
  // Custom range constraints
  const constraints = {
    amount: { min: 10000, max: 100000000, step: 10000, default: 2500000 },
    rate: { min: 1, max: 30, step: 0.1, default: 8.5 },
    tenureYears: { min: 1, max: 30, step: 1, default: 15 },
    tenureMonths: { min: 12, max: 360, step: 1, default: 180 },
  };

  const handleAmountChange = (val) => {
    const numVal = Math.min(Math.max(Number(val) || 0, 0), constraints.amount.max);
    setLoanAmount(numVal);
  };

  const handleRateChange = (val) => {
    const numVal = Math.min(Math.max(Number(val) || 0, 0), constraints.rate.max);
    setInterestRate(numVal);
  };

  const handleTenureChange = (val) => {
    const maxVal = tenureType === 'years' ? constraints.tenureYears.max : constraints.tenureMonths.max;
    const numVal = Math.min(Math.max(Number(val) || 0, 0), maxVal);
    setLoanTenure(numVal);
  };

  const toggleTenureType = (type) => {
    if (type === tenureType) return;
    
    if (type === 'years') {
      // Months to Years (rounded)
      const years = Math.max(1, Math.min(30, Math.round(loanTenure / 12)));
      setTenureType('years');
      setLoanTenure(years);
    } else {
      // Years to Months
      const months = Math.max(12, Math.min(360, loanTenure * 12));
      setTenureType('months');
      setLoanTenure(months);
    }
  };

  // Pre-formatted helper for display
  const formatIndianCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col gap-6 select-none animate-slide-up">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Loan Parameters</h2>
          <p className="text-slate-400 text-xs mt-0.5">Adjust sliders or type values directly</p>
        </div>
        <button
          id="reset-btn"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* LOAN AMOUNT INPUT */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-300">Loan Amount</label>
          <div className="relative flex items-center bg-slate-950/60 border border-slate-800 rounded-lg focus-within:border-indigo-500 transition-colors">
            <span className="absolute left-2.5 text-slate-400 text-xs">₹</span>
            <input
              id="loan-amount-input"
              type="number"
              value={loanAmount || ''}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-32 bg-transparent text-right pr-3 pl-6 py-1.5 text-sm font-semibold text-indigo-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        
        <input
          id="loan-amount-slider"
          type="range"
          min={constraints.amount.min}
          max={constraints.amount.max}
          step={constraints.amount.step}
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full h-1.5 my-2"
        />
        
        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
          <span>₹10,000</span>
          <span>₹50 Lakhs</span>
          <span>₹10 Crores</span>
        </div>
      </div>

      {/* INTEREST RATE INPUT */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-300">Interest Rate (% p.a.)</label>
          <div className="relative flex items-center bg-slate-950/60 border border-slate-800 rounded-lg focus-within:border-indigo-500 transition-colors">
            <input
              id="interest-rate-input"
              type="number"
              step="0.05"
              value={interestRate || ''}
              onChange={(e) => handleRateChange(e.target.value)}
              className="w-20 bg-transparent text-right pr-6 pl-2 py-1.5 text-sm font-semibold text-indigo-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-2 text-slate-400 text-xs">%</span>
          </div>
        </div>
        
        <input
          id="interest-rate-slider"
          type="range"
          min={constraints.rate.min}
          max={constraints.rate.max}
          step={constraints.rate.step}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-1.5 my-2"
        />
        
        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
          <span>1%</span>
          <span>15%</span>
          <span>30%</span>
        </div>
      </div>

      {/* LOAN TENURE INPUT */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-300">Loan Tenure</label>
            {/* Tenure type switches */}
            <div className="flex bg-slate-950/80 p-0.5 rounded-lg border border-slate-800/80 mt-1 w-fit">
              <button
                id="tenure-years-btn"
                type="button"
                onClick={() => toggleTenureType('years')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all duration-200 cursor-pointer ${
                  tenureType === 'years'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Years
              </button>
              <button
                id="tenure-months-btn"
                type="button"
                onClick={() => toggleTenureType('months')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all duration-200 cursor-pointer ${
                  tenureType === 'months'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Months
              </button>
            </div>
          </div>
          
          <div className="relative flex items-center bg-slate-950/60 border border-slate-800 rounded-lg focus-within:border-indigo-500 transition-colors">
            <input
              id="loan-tenure-input"
              type="number"
              value={loanTenure || ''}
              onChange={(e) => handleTenureChange(e.target.value)}
              className="w-20 bg-transparent text-right pr-12 pl-2 py-1.5 text-sm font-semibold text-indigo-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-2 text-slate-400 text-[10px] font-bold uppercase pointer-events-none">
              {tenureType}
            </span>
          </div>
        </div>
        
        <input
          id="loan-tenure-slider"
          type="range"
          min={tenureType === 'years' ? constraints.tenureYears.min : constraints.tenureMonths.min}
          max={tenureType === 'years' ? constraints.tenureYears.max : constraints.tenureMonths.max}
          step={1}
          value={loanTenure}
          onChange={(e) => setLoanTenure(Number(e.target.value))}
          className="w-full h-1.5 my-2"
        />
        
        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
          <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
          <span>{tenureType === 'years' ? '15 Years' : '180 Months'}</span>
          <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
        </div>
      </div>

      {/* QUICK SUMMARY PREVIEW IN FORM */}
      <div className="mt-2 p-4 bg-indigo-950/20 border border-indigo-900/30 rounded-xl flex items-center justify-between text-xs text-indigo-300">
        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-indigo-400" />
          <span>Principal Amount:</span>
        </div>
        <span className="font-bold text-indigo-200">₹{formatIndianCurrency(loanAmount)}</span>
      </div>

    </div>
  );
}

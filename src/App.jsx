import { useState, useMemo } from 'react';
import EmiForm from './components/EmiForm';
import EmiResults from './components/EmiResults';
import EmiTable from './components/EmiTable';
import Footer from './components/Footer';
import { Landmark, Compass } from 'lucide-react';

const DEFAULT_AMOUNT = 2500000; // ₹25 Lakhs
const DEFAULT_RATE = 8.5; // 8.5%
const DEFAULT_TENURE = 15; // 15 Years
const DEFAULT_TENURE_TYPE = 'years';

export default function App() {
  const [loanAmount, setLoanAmount] = useState(DEFAULT_AMOUNT);
  const [interestRate, setInterestRate] = useState(DEFAULT_RATE);
  const [loanTenure, setLoanTenure] = useState(DEFAULT_TENURE);
  const [tenureType, setTenureType] = useState(DEFAULT_TENURE_TYPE);

  // Dynamic Calculation of EMI, Interest, and Schedule
  const calculatedValues = useMemo(() => {
    const n = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const r = (interestRate / 12) / 100;
    
    let emi = 0;
    let totalInterest = 0;
    let totalAmount = 0;
    const schedule = [];

    if (n > 0 && loanAmount > 0) {
      if (r === 0) {
        emi = loanAmount / n;
      } else {
        emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      let balance = loanAmount;
      for (let i = 1; i <= n; i++) {
        const interest = r === 0 ? 0 : balance * r;
        let principal = emi - interest;
        const beginningBalance = balance;

        if (i === n || balance - principal < 0) {
          principal = balance;
          balance = 0;
        } else {
          balance = balance - principal;
        }

        schedule.push({
          month: i,
          beginningBalance: parseFloat(beginningBalance.toFixed(2)),
          principalPaid: parseFloat(principal.toFixed(2)),
          interestPaid: parseFloat(interest.toFixed(2)),
          endingBalance: parseFloat(balance.toFixed(2))
        });
      }

      totalInterest = schedule.reduce((sum, item) => sum + item.interestPaid, 0);
      totalAmount = loanAmount + totalInterest;
    }

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      schedule
    };
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const handleReset = () => {
    setLoanAmount(DEFAULT_AMOUNT);
    setInterestRate(DEFAULT_RATE);
    setLoanTenure(DEFAULT_TENURE);
    setTenureType(DEFAULT_TENURE_TYPE);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* HEADER SECTION */}
      <header className="w-full border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Landmark className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-white tracking-wider flex items-center gap-1.5 leading-none">
                FinHero <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-1.5 py-0.5 rounded">Pro</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-1">Real-Time Financial Analytics</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-semibold bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Secure Client-Side Calculator</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 md:py-12 flex-grow">
        
        {/* Intro Hero */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight leading-none mb-4">
            Smart EMI Calculator
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Plan your home, car, or personal loan easily. Get instant monthly installment amounts, visual breakdown charts, and full amortization schedules.
          </p>
        </div>

        {/* CALCULATOR LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-5 w-full">
            <EmiForm
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              loanTenure={loanTenure}
              setLoanTenure={setLoanTenure}
              tenureType={tenureType}
              setTenureType={setTenureType}
              onReset={handleReset}
            />
          </div>

          {/* Results Summary & Visualization */}
          <div className="lg:col-span-7 w-full">
            <EmiResults
              loanAmount={loanAmount}
              emi={calculatedValues.emi}
              totalInterest={calculatedValues.totalInterest}
              totalAmount={calculatedValues.totalAmount}
            />
          </div>
        </div>

        {/* Amortization Table */}
        <div className="w-full">
          <EmiTable schedule={calculatedValues.schedule} />
        </div>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
